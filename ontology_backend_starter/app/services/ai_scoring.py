"""
AI scoring layer: given rule-detected candidates, ask the LLM for a
suggested action, rationale, and confidence. Caches results so the same
candidate isn't re-sent to OpenAI on every detect call.
"""
import json
import os
import re
from typing import Any, Dict, Optional

from app.services.llm_client import call_llm
from app.services.prompts import get_prompt
from app.store import _get_supabase

_CACHE: Dict[str, Dict[str, Any]] = {}
_CACHE_PRIMED = False


def prime_cache(force: bool = False) -> None:
    """Load the entire ai_scores table into memory in ONE query, so each
    candidate node doesn't hit Supabase individually (the root cause of the
    N+1 / Server disconnected problem). Runs only once."""
    global _CACHE_PRIMED
    if _CACHE_PRIMED and not force:
        return
    sb = _get_supabase()
    if sb is None:
        _CACHE_PRIMED = True
        return
    try:
        # Supabase caps a single select at 1000 rows; page through everything
        # so cached scores (incl. the full misplacement scan) survive restarts.
        total = 0
        page_size = 1000
        offset = 0
        while True:
            batch = (
                sb.table("ai_scores")
                .select("cache_key,result")
                .range(offset, offset + page_size - 1)
                .execute()
            )
            data = batch.data or []
            for row in data:
                _CACHE[row["cache_key"]] = row["result"]
            total += len(data)
            if len(data) < page_size:
                break
            offset += page_size
        print(f"[ai_scoring] primed cache with {total} rows")
    except Exception as e:
        print(f"[ai_scoring] prime_cache failed: {e}")
    _CACHE_PRIMED = True


def _strip_json_fences(txt: str) -> str:
    txt = txt.strip()
    if txt.startswith("```"):
        txt = re.sub(r"^```(?:json)?\s*", "", txt)
        txt = re.sub(r"\s*```$", "", txt)
    return txt.strip()

_ACTION_ALIASES = {
    "keep": "accept",
    "keep_separate": "rename",
    "keep_separate_rename": "rename",
    "relabel": "rename",
}

def _normalize_result(result: Dict[str, Any]) -> Dict[str, Any]:
    """Map legacy/invalid action values (from old cache) to valid ones."""
    if isinstance(result, dict):
        a = str(result.get("suggested_action", "")).strip().lower()
        if a in _ACTION_ALIASES:
            result = {**result, "suggested_action": _ACTION_ALIASES[a]}
    return result

_ACTION_ALIASES = {
    "keep": "accept",
    "keep_separate": "rename",
    "keep_separate_rename": "rename",
    "relabel": "rename",
}


def _normalize_result(result: Dict[str, Any]) -> Dict[str, Any]:
    """Map legacy/invalid action values (from old cached results) to valid ones,
    e.g. 'keep' -> 'accept', 'keep_separate_rename' -> 'rename'."""
    if isinstance(result, dict):
        a = str(result.get("suggested_action", "")).strip().lower()
        if a in _ACTION_ALIASES:
            result = {**result, "suggested_action": _ACTION_ALIASES[a]}
    return result

def _parse_llm_json(raw: str) -> Optional[Dict[str, Any]]:
    try:
        data = json.loads(_strip_json_fences(raw))
    except json.JSONDecodeError:
        return None
    if "suggested_action" not in data:
        return None
    try:
        conf = float(data.get("confidence", 0.5))
    except (TypeError, ValueError):
        conf = 0.5
    data["confidence"] = max(0.0, min(1.0, conf))
    data["rationale"] = str(data.get("rationale", "")).strip()
    # Preserve structured action parameters (merge_into / new_label /
    # target_parent / additional_parent ...) so suggestions are executable.
    params = data.get("action_params")
    data["action_params"] = params if isinstance(params, dict) else {}
    # Normalize legacy/invalid action values left in old cached results
    # (e.g. "keep" -> "accept", "keep_separate_rename" -> "rename").
    _ALIASES = {
        "keep": "accept",
        "keep_separate": "rename",
        "keep_separate_rename": "rename",
        "relabel": "rename",
    }
    action = str(data.get("suggested_action", "")).strip().lower()
    data["suggested_action"] = _ALIASES.get(action, action)
    return data


def score_candidate(
    edit_type: str,
    cache_key: str,
    candidate_text: str,
    fallback: Dict[str, Any],
    force: bool = False,
    model: str | None = None,
) -> Dict[str, Any]:
    """Score one candidate. Reads ONLY from the in-memory cache (primed once
    via prime_cache). Never queries Supabase per-key, so it can't trigger
    the N+1 connection storm."""
    prime_cache()

    # 1. In-memory cache hit -> return directly (unless force re-run)
    if not force and cache_key in _CACHE:
        return _normalize_result(_CACHE[cache_key])

    # 2. Kill switch: when SKIP_LLM is on, a cache miss returns the
    #    rule-based fallback instead of calling OpenAI (unless force re-run)
    if not force and os.getenv("SKIP_LLM", "").lower() in ("1", "true", "yes"):
        return _normalize_result(dict(fallback))

    # 3. Cache miss -> call OpenAI
    sb = _get_supabase()
    used_fallback = False
    try:
        prompt = get_prompt(edit_type)
        # .replace instead of .format: user-edited prompts may contain literal
        # braces (JSON examples), which would make .format() throw and silently
        # drop to the fallback.
        user = prompt["user"].replace("{candidate}", candidate_text)
        raw = call_llm(prompt["system"], user, model=model)
        parsed = _parse_llm_json(raw)
        if parsed is not None:
            result = parsed
        else:
            result = dict(fallback)
            used_fallback = True
    except Exception:
        result = dict(fallback)
        used_fallback = True

    # 4. Write to in-memory cache; only persist real OpenAI results to
    #    Supabase (single upsert, low frequency)
    _CACHE[cache_key] = result
    if sb and not used_fallback:
        try:
            from datetime import datetime, timezone
            scored_at = datetime.now(timezone.utc).isoformat()
            result["_scored_at"] = scored_at
            sb.table("ai_scores").upsert({
                "cache_key": cache_key,
                "result": result,
                "scored_at": scored_at,
            }).execute()
        except Exception as e:
            print(f"[ai_scoring] cache write failed for {cache_key}: {e}")

    return _normalize_result(result)


def clear_cache() -> None:
    global _CACHE_PRIMED
    _CACHE.clear()
    _CACHE_PRIMED = False