"""
Editable LLM prompts, one per edit type.
Prompts adapted from Aiman's flag_and_place.py audit system, which uses
structured error/fix-type classification. Stored in memory with defaults;
exposed via API so users can edit them.
"""

from app.store import _get_supabase
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
            "- merge: the nodes refer to the same concept (same or near-identical "
            "definition/synset) and should be combined.\n"
            "- rename: the nodes are different senses that happen to "
            "share a label; keep them separate but rename to disambiguate.\n\n"
            "Be conservative: only recommend MERGE when the senses are clearly the same.\n\n"
            "IMPORTANT RULES:\n"
            "- suggested_action MUST be EXACTLY one of these strings: "
            "\"merge\" or \"rename\". Never invent other "
            "values like \"relabel\", \"keep\", or \"keep_separate_rename\".\n"
            "- confidence must reflect genuine uncertainty. Reserve 0.95-1.0 "
            "ONLY when definitions are word-for-word identical. Use 0.7-0.9 "
            "when concepts are clearly the same but wording differs, and "
            "0.5-0.7 when it is a judgment call. Do NOT default everything to "
            "1.0.\n\n"
            "Return STRICT JSON only, no markdown, no comments.\n\n"
            "The JSON MUST have these keys: suggested_action, action_params, "
            "rationale, confidence.\n\n"
            "action_params is a REQUIRED object; its contents depend on the action:\n"
            "- If suggested_action is \"rename\": action_params MUST contain a "
            "\"renames\" array, one object per node that needs a new label, each "
            "with \"node_id\" and \"new_label\". new_label MUST be concrete and "
            "disambiguated (e.g. \"tract (anatomy)\"), never empty.\n"
            "- If suggested_action is \"merge\": action_params MUST contain "
            "\"merge_into\" (the node_id you would keep) AND \"target_parent\" "
            "(the label or synset id of the parent the merged node should live "
            "under — usually the kept node's current parent; if the two nodes "
            "have different parents, pick the one whose IS-A relation the "
            "definition supports, and justify the choice in the rationale).\n\n"
            "Example for rename:\n"
            "{\n"
            '  "suggested_action": "rename",\n'
            '  "action_params": {"renames": [{"node_id": "tract.n.02", "new_label": "tract (anatomy)"}, {"node_id": "tract.n.01", "new_label": "tract (land)"}]},\n'
            '  "rationale": "Different senses of the word tract.",\n'
            '  "confidence": 0.95\n'
            "}\n\n"
            "Example for merge:\n"
            "{\n"
            '  "suggested_action": "merge",\n'
            '  "action_params": {"merge_into": "actor.n.01", "target_parent": "person"},\n'
            '  "rationale": "Both nodes have identical definitions; the kept node\'s parent \'person\' is the correct IS-A home for the merged concept.",\n'
            '  "confidence": 1.0\n'
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
            "- accept: it groups multiple children or captures a reusable abstraction "
            "that improves MECE structure; keep it as-is.\n"
            "- rename: it is useful but mislabeled or unclear; give it a clearer label.\n"
            "- delete: it adds little organizational value and could be flattened.\n\n"
            "Be conservative.\n\n"
            "Return STRICT JSON only, no markdown, no comments.\n\n"
            "The JSON MUST have these keys: suggested_action, action_params, "
            "rationale, confidence.\n\n"
            "action_params is a REQUIRED object:\n"
            "- If suggested_action is \"rename\": action_params MUST contain "
            "\"new_label\", a concrete clearer label, never empty.\n"
            "- If suggested_action is \"accept\" or \"delete\": use an empty "
            "object {}.\n\n"
            "Example for rename:\n"
            "{\n"
            '  "suggested_action": "rename",\n'
            '  "action_params": {"new_label": "physical process"},\n'
            '  "rationale": "The current label is unclear.",\n'
            '  "confidence": 0.8\n'
            "}\n\n"
            "Example for accept:\n"
            "{\n"
            '  "suggested_action": "accept",\n'
            '  "action_params": {},\n'
            '  "rationale": "This node groups several children well.",\n'
            '  "confidence": 0.9\n'
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
            "You are given ONE node with its label, WordNet definition, O*NET task "
            "examples, and its current path in the taxonomy. Decide whether the node "
            "is correctly placed.\n\n"
            "Judge by the DEFINITION first — never by the label alone. Many labels "
            "sound like one category but their definition places them in another "
            "(e.g. 'party' defined as 'an organization to gain political power' is an "
            "ACTOR/organization, not an activity, even though parties can be events).\n\n"
            "The taxonomy has four top-level subontologies: Physical, Information, "
            "Actor, Activities. Below the top level, every parent-child edge must be "
            "a true IS-A relation.\n\n"
            "Decide ONE of:\n"
            "- accept: the node's current placement is a correct IS-A chain. Use "
            "this whenever the definition supports the current parent.\n"
            "- place_elsewhere: the node belongs somewhere else. You MUST name the "
            "destination.\n"
            "- rename: placement is fine but the label misleads about the sense; "
            "give a clearer label.\n"
            "- delete: the node is not a valid concept at all (rare; be conservative).\n\n"
            "IMPORTANT RULES:\n"
            "- suggested_action MUST be EXACTLY one of: \"accept\", "
            "\"place_elsewhere\", \"rename\", \"delete\". These match the reviewer's "
            "action buttons. Never invent values like \"review placement\" or "
            "\"verify\" — reviewing is the human's job; your job is a concrete "
            "recommendation.\n"
            "- If suggested_action is \"place_elsewhere\": action_params MUST "
            "contain \"target_parent\", the label or synset id of the parent it "
            "should sit under, as specific as possible (e.g. \"organization\" or "
            "\"organization.n.01\", not just a subontology name unless nothing more "
            "specific fits).\n"
            "- If suggested_action is \"rename\": action_params MUST contain "
            "\"new_label\", concrete and disambiguated, never empty.\n"
            "- If suggested_action is \"accept\" or \"delete\": use an empty object {}.\n"
            "- rationale MUST cite the definition and/or O*NET examples as evidence.\n"
            "- confidence reflects genuine uncertainty: 0.85+ only when the "
            "definition is decisive; 0.6-0.85 for reasonable judgment calls; below "
            "0.6 when evidence is thin.\n\n"
            "Return STRICT JSON only, no markdown, no comments. Keys: "
            "suggested_action, action_params, rationale, confidence.\n\n"
            "Example (misclassified label):\n"
            "{\n"
            '  "suggested_action": "place_elsewhere",\n'
            '  "action_params": {"target_parent": "organization"},\n'
            '  "rationale": "The definition \'an organization to gain political power\' and the O*NET examples about advising political parties describe an organization (an actor), not an activity.",\n'
            '  "confidence": 0.9\n'
            "}\n\n"
            "Example (placement is actually fine):\n"
            "{\n"
            '  "suggested_action": "accept",\n'
            '  "action_params": {},\n'
            '  "rationale": "The definition describes a physical structure, matching its current parent under Physical > artifact.",\n'
            '  "confidence": 0.85\n'
            "}"
        ),
        "user": (
            "## Node under review\n{candidate}\n\n"
            "Is this node correctly placed? Judge by its definition, not its label. "
            "Return your decision as STRICT JSON."
        ),
    },
    "multiple_inheritance": {
        "label": "Multiple Inheritance",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "You are given ONE concept (a single WordNet synset) that appears in "
            "MULTIPLE places in the taxonomy — i.e. it has more than one parent. "
            "You see its label, synset, definition, and every path where it occurs.\n\n"
            "Multiple inheritance is sometimes CORRECT: a concept can genuinely be "
            "a subtype of two parents (e.g. 'tomato' under both fruit and "
            "vegetable-as-food). It is INCORRECT when one of the placements is not "
            "a true IS-A relation, or when the duplication is accidental.\n\n"
            "Judge each occurrence by the DEFINITION: for every path, ask whether "
            "the concept truly IS-A its parent there.\n\n"
            "Decide ONE of:\n"
            "- accept: every listed placement is a valid IS-A relation; the "
            "multiple inheritance is legitimate and should stay.\n"
            "- delete: at least one placement is wrong and the concept should be "
            "DETACHED from that parent (the node itself is kept in its valid "
            "location(s)). You MUST say which parent(s) to detach from.\n\n"
            "IMPORTANT RULES:\n"
            "- suggested_action MUST be EXACTLY \"accept\" or \"delete\". These "
            "match the reviewer's action buttons. Never output meta-advice like "
            "\"consider\" or \"review\" — deciding is your job.\n"
            "- If \"delete\": action_params MUST contain \"remove_parents\", an "
            "array naming each parent to detach from, each entry as "
            "\"detach from parent <label> (<synset or path fragment>)\", keeping "
            "the placement(s) whose IS-A relation the definition supports.\n"
            "- If \"accept\": action_params is an empty object {}.\n"
            "- rationale MUST cite the definition and explain, per placement, why "
            "it is or isn't a valid IS-A relation.\n"
            "- confidence: 0.85+ only when the definition clearly settles it; "
            "0.6-0.85 for judgment calls; below 0.6 when evidence is thin.\n\n"
            "Return STRICT JSON only, no markdown, no comments. Keys: "
            "suggested_action, action_params, rationale, confidence.\n\n"
            "Example (legitimate multiple inheritance):\n"
            "{\n"
            '  "suggested_action": "accept",\n'
            '  "action_params": {},\n'
            '  "rationale": "The definition supports both placements: it IS-A fruit botanically and IS-A vegetable in the food-preparation sense.",\n'
            '  "confidence": 0.85\n'
            "}\n\n"
            "Example (one placement is wrong):\n"
            "{\n"
            '  "suggested_action": "delete",\n'
            '  "action_params": {"remove_parents": ["detach from parent Give (Transfer between actors > Provide > Give)"]},\n'
            '  "rationale": "The definition describes a monetary award (a thing), which IS-A transferable object; the placement under the act of giving is not a valid IS-A relation.",\n'
            '  "confidence": 0.75\n'
            "}"
        ),
        "user": (
            "## Concept with multiple parents\n{candidate}\n\n"
            "Is this multiple inheritance legitimate? If not, name which parent(s) "
            "to detach from. Return STRICT JSON."
        ),
    },
    "naming": {
        "label": "Naming / Disambiguation",
        "system": (
            "You are auditing a noun taxonomy for an ontology engineering project. "
            "You are given ONE node whose label may be vague, ambiguous, virtual, or "
            "missing a synset, along with its WordNet definition and path.\n\n"
            "Your job is to propose the ACTUAL new label when one is needed — never "
            "to tell the human to 'clarify' or 'disambiguate' (they know that; they "
            "need your concrete suggestion).\n\n"
            "Decide ONE of:\n"
            "- rename: the label is vague/ambiguous in this position; provide a "
            "concrete clearer label. Good renames add the distinguishing sense in "
            "parentheses or pick a more specific word, e.g. \"part\" under anatomy "
            "-> \"body part\"; \"tract\" -> \"tract (anatomy)\"; a [virtual] grouper "
            "named \"structure\" -> \"structural component\".\n"
            "- accept: the label is already clear enough in context (common for "
            "well-known terms whose path disambiguates them). Be honest — do not "
            "invent renames for labels that are fine.\n\n"
            "IMPORTANT RULES:\n"
            "- suggested_action MUST be EXACTLY \"rename\" or \"accept\". These "
            "match the reviewer's action buttons.\n"
            "- If \"rename\": action_params MUST contain \"new_label\", concrete "
            "and specific, never empty, never a meta-instruction.\n"
            "- If \"accept\": action_params is {}.\n"
            "- rationale must say WHY the current label is or isn't clear, citing "
            "the definition or path.\n"
            "- confidence: 0.85+ only when the ambiguity (or clarity) is obvious.\n\n"
            "Return STRICT JSON only, no markdown, no comments. Keys: "
            "suggested_action, action_params, rationale, confidence.\n\n"
            "Example:\n"
            "{\n"
            '  "suggested_action": "rename",\n'
            '  "action_params": {"new_label": "tract (anatomy)"},\n'
            '  "rationale": "Under the anatomy subtree, bare \'tract\' is ambiguous with land tracts; the definition refers to a system of body organs.",\n'
            '  "confidence": 0.85\n'
            "}\n\n"
            "Example:\n"
            "{\n"
            '  "suggested_action": "accept",\n'
            '  "action_params": {},\n'
            '  "rationale": "The path already disambiguates this common term and the definition matches its position.",\n'
            '  "confidence": 0.8\n'
            "}"
        ),
        "user": (
            "## Node under review\n{candidate}\n\n"
            "Should this node be renamed? If yes, propose the exact new label. "
            "Return STRICT JSON."
        ),
    },
}

_PROMPTS: Dict[str, Dict[str, str]] = deepcopy(_DEFAULT_PROMPTS)
_PROMPTS_LOADED = False


def _seed_defaults_to_supabase(sb) -> None:
    """If the prompts table is empty, write the defaults into it once."""
    try:
        existing = sb.table("prompts").select("edit_type").execute()
        have = {row["edit_type"] for row in existing.data}
        rows_to_insert = []
        for edit_type, p in _DEFAULT_PROMPTS.items():
            if edit_type not in have:
                rows_to_insert.append({
                    "edit_type": edit_type,
                    "label": p.get("label", ""),
                    "system": p["system"],
                    "user": p["user"],
                })
        if rows_to_insert:
            sb.table("prompts").insert(rows_to_insert).execute()
            print(f"[prompts] seeded {len(rows_to_insert)} default prompts to Supabase")
    except Exception as e:
        print(f"[prompts] could not seed defaults: {e}")


def _load_prompts() -> None:
    """Load prompts from Supabase into memory once. Falls back to in-memory
    defaults if Supabase is unavailable."""
    global _PROMPTS_LOADED
    if _PROMPTS_LOADED:
        return
    sb = _get_supabase()
    if sb is None:
        _PROMPTS_LOADED = True
        return
    try:
        _seed_defaults_to_supabase(sb)
        rows = sb.table("prompts").select("edit_type,label,system,user,updated_at").execute()
        for row in rows.data:
            et = row["edit_type"]
            if et in _PROMPTS:
                _PROMPTS[et] = {
                    "label": row.get("label", _PROMPTS[et].get("label", "")),
                    "system": row["system"],
                    "user": row["user"],
                    "updated_at": row.get("updated_at"),
                }
        print(f"[prompts] loaded {len(rows.data)} prompts from Supabase")
    except Exception as e:
        print(f"[prompts] could not load from Supabase: {e}")
    _PROMPTS_LOADED = True

def get_all_prompts() -> Dict[str, Dict[str, str]]:
    _load_prompts()
    return deepcopy(_PROMPTS)


def get_prompt(edit_type: str) -> Dict[str, str]:
    _load_prompts()
    return deepcopy(_PROMPTS[edit_type])


def update_prompt(edit_type: str, system: str | None = None, user: str | None = None) -> Dict[str, str]:
    _load_prompts()
    if edit_type not in _PROMPTS:
        raise KeyError(edit_type)
    if system is not None:
        _PROMPTS[edit_type]["system"] = system
    if user is not None:
        _PROMPTS[edit_type]["user"] = user

    from datetime import datetime, timezone
    now_iso = datetime.now(timezone.utc).isoformat()
    _PROMPTS[edit_type]["updated_at"] = now_iso

    sb = _get_supabase()
    if sb:
        try:
            sb.table("prompts").upsert({
                "edit_type": edit_type,
                "label": _PROMPTS[edit_type].get("label", ""),
                "system": _PROMPTS[edit_type]["system"],
                "user": _PROMPTS[edit_type]["user"],
                "updated_at": now_iso,
            }).execute()
        except Exception as e:
            print(f"[prompts] could not persist {edit_type}: {e}")

    return deepcopy(_PROMPTS[edit_type])


def reset_prompt(edit_type: str) -> Dict[str, str]:
    if edit_type not in _DEFAULT_PROMPTS:
        raise KeyError(edit_type)
    _PROMPTS[edit_type] = deepcopy(_DEFAULT_PROMPTS[edit_type])

    sb = _get_supabase()
    if sb:
        try:
            sb.table("prompts").upsert({
                "edit_type": edit_type,
                "label": _PROMPTS[edit_type].get("label", ""),
                "system": _PROMPTS[edit_type]["system"],
                "user": _PROMPTS[edit_type]["user"],
                "updated_at": "now()",
            }).execute()
        except Exception as e:
            print(f"[prompts] could not persist reset for {edit_type}: {e}")

    return deepcopy(_PROMPTS[edit_type])
