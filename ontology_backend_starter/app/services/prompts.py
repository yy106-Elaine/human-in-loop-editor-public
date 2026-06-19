"""
Editable LLM prompts, one per edit type.
Prompts adapted from Aiman's flag_and_place.py audit system, which uses
structured error/fix-type classification. Stored in memory with defaults;
exposed via API so users can edit them.
"""

from copy import deepcopy
from typing import Dict

EDIT_TYPES = ["duplicate", "virtual", "misplaced", "multiple_inheritance", "naming"]

_DEFAULT_PROMPTS: Dict[str, Dict[str, str]] = {
    "duplicate": {
        "label": "Duplicate Handling",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "You are given two or more nodes that share the same or a similar label. "
            "Sharing a label does NOT mean they are duplicates — many labels repeat "
            "across the taxonomy with genuinely different senses (e.g. 'party' as a "
            "political organization vs. a social gathering).\n\n"
            "Use the DEFINITION, SYNONYMS, and PATH of each node to decide:\n"
            "- MERGE: the nodes refer to the same concept (same or near-identical "
            "definition/synset) and should be combined.\n"
            "- KEEP_SEPARATE_RENAME: the nodes are different senses that happen to "
            "share a label; keep them separate but suggest disambiguating labels.\n\n"
            "Be conservative: only recommend MERGE when the senses are clearly the same.\n\n"
            "IMPORTANT RULES:\n"
            "- suggested_action MUST be EXACTLY one of these two strings: "
            "\"merge\" or \"keep_separate_rename\". Never invent other "
            "values like \"relabel\" or \"rename\".\n"
            "- confidence must reflect genuine uncertainty. Reserve 0.95-1.0 "
            "ONLY when definitions are word-for-word identical. Use 0.7-0.9 "
            "when concepts are clearly the same but wording differs, and "
            "0.5-0.7 when it is a judgment call. Do NOT default everything to "
            "1.0.\n\n"
            "Return STRICT JSON only, no markdown:\n"
            "{\n"
            '  "suggested_action": "merge" | "keep_separate_rename",\n'
            '  "rationale": "1-2 sentence explanation grounded in the definitions",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Candidate nodes sharing a label\n{candidate}\n\n"
            "Compare their definitions and senses. Return your decision as STRICT JSON."
        ),
    },
    "virtual": {
        "label": "Virtual Node Handling",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "A '[virtual]' node is an abstract grouping node inserted to organize "
            "children, not a real WordNet concept. Decide whether it earns its place:\n"
            "- KEEP: it groups multiple children or captures a reusable abstraction "
            "that improves MECE structure.\n"
            "- ALTER: it is useful but mislabeled or has only one child; suggest "
            "renaming or merging with its child.\n"
            "- REMOVE: it adds little organizational value and could be flattened.\n\n"
            "Be conservative.\n\n"
            "Return STRICT JSON only, no markdown:\n"
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
            "Determine whether the node is correctly placed under its parent via a "
            "true IS-A relationship. If it is not, classify the error:\n\n"
            "ERROR TYPES:\n"
            "- TYPE_MISMATCH: the node belongs in a different sub-ontology entirely "
            "(the four are Physical Entity, Information, Activity, Actor). "
            "E.g. 'policy' belongs in Information, 'walking' in Activity.\n"
            "- HIERARCHY_MISMATCH: the node is the right kind of thing but is not a "
            "subtype of its current parent. E.g. 'engine' under 'vehicle' — an engine "
            "is not a type of vehicle.\n"
            "- GRANULARITY_ERROR: the node is too broad or too specific relative to "
            "its parent/siblings and should sit at a different depth.\n\n"
            "Use the DEFINITION, SUPERSENSES, PATH, and SIBLINGS to reason about "
            "conceptual meaning, not just surface words. Be conservative: placements "
            "are expected to be imperfect, so only flag clear errors. If the node could "
            "reasonably be read as a subtype of the parent, return keep.\n\n"
            "Return STRICT JSON only, no markdown:\n"
            "{\n"
            '  "suggested_action": "keep" | "move",\n'
            '  "error_type": "TYPE_MISMATCH" | "HIERARCHY_MISMATCH" | "GRANULARITY_ERROR" | "N/A",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node being audited (with its parent and siblings)\n{candidate}\n\n"
            "Analyze the IS-A relationship and return your decision as STRICT JSON."
        ),
    },
    "multiple_inheritance": {
        "label": "Multiple Inheritance",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "Decide whether the concept genuinely belongs under more than one parent "
            "(e.g. 'school' is both an institution and a building, 'actor' could be "
            "both a person and a performer-role). Use the DEFINITION and SUPERSENSES "
            "to judge whether multiple distinct senses or facets are at play. "
            "Be conservative: most nodes need only one parent.\n\n"
            "Return STRICT JSON only, no markdown:\n"
            "{\n"
            '  "suggested_action": "single_parent" | "multiple_parents",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node and its current parent\n{candidate}\n\n"
            "Analyze whether it needs multiple parents. Return STRICT JSON."
        ),
    },
    "naming": {
        "label": "Naming",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "Decide whether the node's label is clear in context, or AMBIGUOUS such "
            "that a clearer, disambiguated label would help reviewers. A good "
            "disambiguated label preserves scope and avoids overlap with siblings. "
            "E.g. 'window' might become 'window (architectural)' vs 'window (UI)'. "
            "Be conservative: only suggest renaming when the label is genuinely "
            "ambiguous given its definition and siblings.\n\n"
            "Return STRICT JSON only, no markdown:\n"
            "{\n"
            '  "suggested_action": "keep_label" | "rename",\n'
            '  "rationale": "1-2 sentence explanation",\n'
            '  "title_suggestion": "suggested clearer label, or empty if keep_label",\n'
            '  "confidence": 0.0 to 1.0\n'
            "}"
        ),
        "user": (
            "## Node being reviewed (with definition and siblings)\n{candidate}\n\n"
            "Analyze the label clarity and return your decision as STRICT JSON."
        ),
    },
}

_PROMPTS: Dict[str, Dict[str, str]] = deepcopy(_DEFAULT_PROMPTS)


def get_all_prompts() -> Dict[str, Dict[str, str]]:
    return deepcopy(_PROMPTS)


def get_prompt(edit_type: str) -> Dict[str, str]:
    return deepcopy(_PROMPTS[edit_type])


def update_prompt(edit_type: str, system: str | None = None, user: str | None = None) -> Dict[str, str]:
    if edit_type not in _PROMPTS:
        raise KeyError(edit_type)
    if system is not None:
        _PROMPTS[edit_type]["system"] = system
    if user is not None:
        _PROMPTS[edit_type]["user"] = user
    return deepcopy(_PROMPTS[edit_type])


def reset_prompt(edit_type: str) -> Dict[str, str]:
    if edit_type not in _DEFAULT_PROMPTS:
        raise KeyError(edit_type)
    _PROMPTS[edit_type] = deepcopy(_DEFAULT_PROMPTS[edit_type])
    return deepcopy(_PROMPTS[edit_type])
