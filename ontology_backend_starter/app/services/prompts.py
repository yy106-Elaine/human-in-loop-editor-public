"""
Editable LLM prompts, one per edit type.
Stored in memory with sensible defaults; exposed via API so users can edit them.
"""

from copy import deepcopy
from typing import Dict

# The five edit types the system reasons about.
EDIT_TYPES = ["duplicate", "virtual", "misplaced", "multiple_inheritance", "naming"]

# Default prompt for each edit type. {candidate} is filled in at call time
# with the concrete node(s) the rule layer flagged.
_DEFAULT_PROMPTS: Dict[str, Dict[str, str]] = {
    "duplicate": {
        "label": "Duplicate Handling",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "You are given a set of nodes that share the same or similar label and may be duplicates. "
            "Decide whether they should be MERGED (same concept) or KEPT SEPARATE and renamed "
            "(different senses). Be conservative and explain your reasoning.\n\n"
            "Return STRICT JSON only, no markdown, in exactly this shape:\n"
            "{\n"
            '  "suggested_action": "merge" | "keep_separate_rename",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Candidate duplicate nodes\n{candidate}\n\n"
            "Analyze these nodes and return your decision as STRICT JSON."
        ),
    },
    "virtual": {
        "label": "Virtual Node Handling",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "A 'virtual' node is an abstract grouping node. Decide whether it should be KEPT "
            "(it organizes children or captures a reusable abstraction), ALTERED (renamed or "
            "merged with a child), or REMOVED (adds little structure). Be conservative.\n\n"
            "Return STRICT JSON only, no markdown, in exactly this shape:\n"
            "{\n"
            '  "suggested_action": "keep" | "alter" | "remove",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Candidate virtual node\n{candidate}\n\n"
            "Analyze this node and return your decision as STRICT JSON."
        ),
    },
    "misplaced": {
        "label": "Misplaced Nodes",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "Decide whether the node is a true IS-A subtype of its parent, or whether it is "
            "MISPLACED and belongs under a different parent or sub-ontology. Be conservative.\n\n"
            "Return STRICT JSON only, no markdown, in exactly this shape:\n"
            "{\n"
            '  "suggested_action": "keep" | "move",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node and its current parent\n{candidate}\n\n"
            "Analyze this node and return your decision as STRICT JSON."
        ),
    },
    "multiple_inheritance": {
        "label": "Multiple Inheritance",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "Decide whether the concept reasonably belongs under more than one parent "
            "(e.g. 'school' is both an institution and a building). Be conservative.\n\n"
            "Return STRICT JSON only, no markdown, in exactly this shape:\n"
            "{\n"
            '  "suggested_action": "single_parent" | "multiple_parents",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node and its current parent(s)\n{candidate}\n\n"
            "Analyze this node and return your decision as STRICT JSON."
        ),
    },
    "naming": {
        "label": "Naming",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "Decide whether the node's label is clear, or AMBIGUOUS and in need of a clearer, "
            "disambiguated label. Be conservative.\n\n"
            "Return STRICT JSON only, no markdown, in exactly this shape:\n"
            "{\n"
            '  "suggested_action": "keep_label" | "rename",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node being reviewed\n{candidate}\n\n"
            "Analyze this node and return your decision as STRICT JSON."
        ),
    },
}

# Live, editable copy (starts as a deep copy of defaults).
_PROMPTS: Dict[str, Dict[str, str]] = deepcopy(_DEFAULT_PROMPTS)


def get_all_prompts() -> Dict[str, Dict[str, str]]:
    """Return all editable prompts, keyed by edit type."""
    return deepcopy(_PROMPTS)


def get_prompt(edit_type: str) -> Dict[str, str]:
    """Return one edit type's prompt. Raises KeyError if unknown."""
    return deepcopy(_PROMPTS[edit_type])


def update_prompt(edit_type: str, system: str | None = None, user: str | None = None) -> Dict[str, str]:
    """Update the system and/or user prompt for one edit type."""
    if edit_type not in _PROMPTS:
        raise KeyError(edit_type)
    if system is not None:
        _PROMPTS[edit_type]["system"] = system
    if user is not None:
        _PROMPTS[edit_type]["user"] = user
    return deepcopy(_PROMPTS[edit_type])


def reset_prompt(edit_type: str) -> Dict[str, str]:
    """Reset one edit type's prompt back to its default."""
    if edit_type not in _DEFAULT_PROMPTS:
        raise KeyError(edit_type)
    _PROMPTS[edit_type] = deepcopy(_DEFAULT_PROMPTS[edit_type])
    return deepcopy(_PROMPTS[edit_type])