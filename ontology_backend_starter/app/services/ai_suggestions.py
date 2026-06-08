"""
Generate AI review suggestions for a single ontology node using Claude.
Adapted from Aiman's flag_and_place.py prompt, simplified for real-time use.
"""

import json
import re
from anthropic import Anthropic

from app.store import find_node, ONTOLOGY_TREE


SYSTEM_PROMPT = """You are auditing a noun taxonomy used in an ontology engineering project.

Each node represents a conceptual category. The taxonomy has four sub-ontologies:
Physical Entity, Information, Activity, and Actor.

You will be given ONE node, its parent, and its siblings. Identify potential issues
with this node and return concrete review suggestions. Look for these issue types:

1. MISPLACED — the node does not seem to be a true IS-A subtype of its parent,
   or seems to belong under a different parent or sub-ontology.
2. DUPLICATE — the node overlaps heavily in meaning with a sibling or a common
   concept and might be a duplicate sense that should be merged.
3. MULTIPLE_INHERITANCE — the concept reasonably belongs under more than one parent
   (e.g. "school" is both an institution and a building).
4. NAMING — the node's label is ambiguous and a clearer, disambiguated label would help.

Be conservative: only raise an issue when there is a clear, defensible reason.
A node with no real issues should return an empty suggestions list.

Return STRICT JSON only, no markdown, in exactly this shape:
{
  "suggestions": [
    {
      "type": "MISPLACED" | "DUPLICATE" | "MULTIPLE_INHERITANCE" | "NAMING",
      "title": "short title, max 6 words",
      "body": "1-2 sentence explanation of the issue and what to consider",
      "confidence": 0.0 to 1.0
    }
  ]
}
Return at most 3 suggestions, ordered by confidence (highest first)."""


USER_PROMPT = """## Node being reviewed
Label: {label}
Synset: {code}

## Parent
{parent}

## Siblings (same parent)
{siblings}

Analyze this node and return suggestions as STRICT JSON."""


def _strip_json_fences(txt: str) -> str:
    txt = txt.strip()
    if txt.startswith("```"):
        txt = re.sub(r"^```(?:json)?\s*", "", txt)
        txt = re.sub(r"\s*```$", "", txt)
    return txt.strip()


def _find_parent_and_siblings(node_id: str):
    """Walk the tree to find the node's parent and its siblings."""
    def walk(nodes, parent):
        for n in nodes:
            if n.id == node_id:
                siblings = [c.label for c in nodes if c.id != node_id]
                return parent, siblings
            found = walk(n.children, n)
            if found:
                return found
        return None

    result = walk(ONTOLOGY_TREE, None)
    if not result:
        return None, []
    parent, siblings = result
    parent_label = parent.label if parent else "(root — no parent)"
    return parent_label, siblings


def generate_ai_suggestions(node_id: str, api_key: str) -> dict:
    """Call Claude to generate review suggestions for one node.
    Returns {"suggestions": [...]} or raises on hard errors."""
    node = find_node(node_id)
    if node is None:
        return {"suggestions": []}

    parent_label, siblings = _find_parent_and_siblings(node_id)
    siblings_str = ", ".join(siblings[:15]) if siblings else "(none)"

    user_prompt = USER_PROMPT.format(
        label=node.label,
        code=node.code or "(no synset)",
        parent=parent_label,
        siblings=siblings_str,
    )

    client = Anthropic(api_key=api_key)
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    raw = response.content[0].text
    cleaned = _strip_json_fences(raw)
    try:
        parsed = json.loads(cleaned)
    except json.JSONDecodeError:
        # If Claude returned something unparseable, fail soft with empty list
        return {"suggestions": []}

    # Normalize: ensure it's the right shape
    suggestions = parsed.get("suggestions", [])
    return {"suggestions": suggestions[:3]}