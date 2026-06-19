"""
Loads the rich ontology data (nodes-data.json) and exposes semantic context
for any node: definition, synonyms, supersenses, synset, path, siblings.
Used to give the LLM real context when scoring candidates.

Nodes are keyed by their full synset path (from the description's "- Path:"
line), which is unique even when labels collide (426 labels repeat).
"""

import json
import os
import re
from functools import lru_cache
from typing import Any, Dict, List, Optional

_DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "nodes-data.json")


def _parse_description(desc: str) -> Dict[str, str]:
    """Parse the '- Field: value' lines in a node description."""
    fields = {
        "definition": "",
        "synonyms": "",
        "supersenses": "",
        "path": "",
        "example": "",
        "virtual": "",
    }
    for line in desc.splitlines():
        line = line.strip()
        m = re.match(r"-\s*(\w+):\s*(.*)", line)
        if not m:
            continue
        key, val = m.group(1).lower(), m.group(2).strip()
        if key in fields:
            fields[key] = val
    return fields


def _label_of(title: str) -> str:
    return title.split("(")[0].strip().lower()


@lru_cache(maxsize=1)
def _index() -> Dict[str, Dict[str, Any]]:
    """Build an index: synset_path -> node context. Also a label fallback index."""
    with open(_DATA_PATH, encoding="utf-8") as f:
        data = json.load(f)

    by_path: Dict[str, Dict[str, Any]] = {}
    by_label: Dict[str, List[Dict[str, Any]]] = {}

    def walk(node: Dict[str, Any], parent_title: Optional[str], siblings: List[str]):
        title = node.get("title", "")
        label = _label_of(title)
        fields = _parse_description(node.get("description", ""))
        children = node.get("specializations", {}) or {}
        child_labels = [_label_of(t) for t in children.keys()]

        ctx = {
            "title": title,
            "label": label,
            "definition": fields["definition"],
            "synonyms": fields["synonyms"],
            "supersenses": fields["supersenses"],
            "path": fields["path"],
            "example": fields["example"],
            "virtual": fields["virtual"],
            "parent": parent_title,
            "siblings": [s for s in siblings if _label_of(s) != label],
            "children": child_labels,
        }

        path_key = fields["path"].strip()
        if path_key:
            by_path[path_key] = ctx
        by_label.setdefault(label, []).append(ctx)

        sibling_titles = list(children.keys())
        for ctitle, cnode in children.items():
            walk(cnode, title, sibling_titles)

    for root in data.values():
        walk(root, None, [])

    return {"by_path": by_path, "by_label": by_label}


def get_context_by_label(label: str) -> Optional[Dict[str, Any]]:
    """Return semantic context for a label. If the label is ambiguous
    (repeats), returns the first match. For precise lookup use get_context_by_path."""
    idx = _index()
    matches = idx["by_label"].get(label.strip().lower())
    return matches[0] if matches else None


def get_all_contexts_by_label(label: str) -> List[Dict[str, Any]]:
    """Return ALL nodes sharing a label (useful for duplicate analysis)."""
    return _index()["by_label"].get(label.strip().lower(), [])


def format_context(ctx: Dict[str, Any], max_siblings: int = 12) -> str:
    """Format a node's context into a readable block for the LLM prompt."""
    if not ctx:
        return "(no semantic context available)"
    sibs = ", ".join(ctx["siblings"][:max_siblings]) or "(none)"
    return (
        f"Label: {ctx['label']}\n"
        f"Definition: {ctx['definition'] or '(none)'}\n"
        f"Synonyms: {ctx['synonyms'] or '(none)'}\n"
        f"Supersenses: {ctx['supersenses'] or '(none)'}\n"
        f"Path: {ctx['path'] or '(none)'}\n"
        f"Parent: {ctx['parent'] or '(root)'}\n"
        f"Siblings: {sibs}"
    )