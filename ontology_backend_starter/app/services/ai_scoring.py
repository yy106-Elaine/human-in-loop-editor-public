"""
AI scoring layer: given rule-detected candidates, ask the LLM for a
suggested action, rationale, and confidence. Caches results so the same
candidate isn't re-sent to OpenAI on every detect call.
"""
import json
import os
import re
from typing import Any, Dict, List, Optional

from app.services.llm_client import call_llm
from app.services.prompts import get_prompt
from app.store import _get_supabase

# Cache: key -> {"suggested_action", "rationale", "confidence"}
_CACHE: Dict[str, Dict[str, Any]] = {}


def _strip_json_fences(txt: str) -> str:
    txt = txt.strip()
    if txt.startswith("```"):
        txt = re.sub(r"^```(?:json)?\s*", "", txt)
        txt = re.sub(r"\s*```$", "", txt)
    return txt.strip()


def _parse_llm_json(raw: str) -> Optional[Dict[str, Any]]:
    try:
        data = json.loads(_strip_json_fences(raw))
    except json.JSONDecodeError:
        return None
    if "suggested_action" not in data:
        return None
    # Clamp confidence into [0, 1]
    try:
        conf = float(data.get("confidence", 0.5))
    except (TypeError, ValueError):
        conf = 0.5
    data["confidence"] = max(0.0, min(1.0, conf))
    data["rationale"] = str(data.get("rationale", "")).strip()
    return data


def score_candidate(
    edit_type: str,
    cache_key: str,
    candidate_text: str,
    fallback: Dict[str, Any],
) -> Dict[str, Any]:
    """Ask the LLM to score one candidate. Returns dict with
    suggested_action / rationale / confidence. Falls back to `fallback`
    (the old rule-based values) on any error, so detection never crashes."""
    # Kill switch: when SKIP_LLM is on, never call OpenAI.
    # Serve cached results if present, otherwise return the rule-based fallback.
    if os.getenv("SKIP_LLM", "").lower() in ("1", "true", "yes"):
        if cache_key in _CACHE:
            return _CACHE[cache_key]
        sb = _get_supabase()
        if sb:
            try:
                row = sb.table("ai_scores").select("result").eq("cache_key", cache_key).maybe_single().execute()
                if row is not None and row.data:
                    _CACHE[cache_key] = row.data["result"]
                    return row.data["result"]
            except Exception as e:
                print(f"[ai_scoring] cache read failed for {cache_key}: {e}")
        return dict(fallback)
    # 1. In-memory cache is fastest
    if cache_key in _CACHE:
        return _CACHE[cache_key]

    # 2. Check Supabase persistent cache
    sb = _get_supabase()
    if sb:
        try:
            row = sb.table("ai_scores").select("result").eq("cache_key", cache_key).maybe_single().execute()
            if row is not None and row.data:
                _CACHE[cache_key] = row.data["result"]   # warm in-memory cache
                return row.data["result"]
        except Exception as e:
            print(f"[ai_scoring] cache read failed for {cache_key}: {e}")

    # 3. Cache miss -> call OpenAI
    used_fallback = False
    try:
        prompt = get_prompt(edit_type)
        user = prompt["user"].format(candidate=candidate_text)
        raw = call_llm(prompt["system"], user)
        parsed = _parse_llm_json(raw)
        if parsed is not None:
            result = parsed
        else:
            result = dict(fallback)
            used_fallback = True
    except Exception:
        result = dict(fallback)
        used_fallback = True

    # 4. Write to in-memory cache; only persist real OpenAI results to Supabase
    _CACHE[cache_key] = result
    if sb and not used_fallback:
        try:
            sb.table("ai_scores").upsert({
                "cache_key": cache_key,
                "result": result,
            }).execute()
        except Exception as e:
            print(f"[ai_scoring] cache write failed for {cache_key}: {e}")

    return result


def clear_cache() -> None:
    _CACHE.clear()