"""
AI scoring layer: given rule-detected candidates, ask the LLM for a
suggested action, rationale, and confidence. Caches results so the same
candidate isn't re-sent to OpenAI on every detect call.
"""

import json
import re
from typing import Any, Dict, List, Optional

from app.services.llm_client import call_llm
from app.services.prompts import get_prompt

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
    if cache_key in _CACHE:
        return _CACHE[cache_key]

    try:
        prompt = get_prompt(edit_type)
        user = prompt["user"].format(candidate=candidate_text)
        raw = call_llm(prompt["system"], user)
        parsed = _parse_llm_json(raw)
        result = parsed if parsed is not None else dict(fallback)
    except Exception:
        # Network error, bad key, timeout, etc. — fail soft.
        result = dict(fallback)

    _CACHE[cache_key] = result
    return result


def clear_cache() -> None:
    _CACHE.clear()