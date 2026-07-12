from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import uuid4
from functools import lru_cache
from pydantic import BaseModel
from nltk.corpus import wordnet as wn
# Ensure the NLTK wordnet corpus is available (Render's container starts
# without it). Downloads once on first boot; no-op afterwards.
import nltk
try:
    wn.ensure_loaded()
except LookupError:
    nltk.download("wordnet", quiet=True)
    nltk.download("omw-1.4", quiet=True)
from app.services.ai_suggestions import generate_ai_suggestions
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.services.ai_scoring import score_candidate, _CACHE
from app.services.edit_patterns import (
    detect_duplicate_patterns,
    detect_virtual_node_patterns,
    detect_all_edit_patterns,
    _rerun_with_current_prompt,
    get_node_pattern_context,
)

from app.schemas import (
    ActionRequest,
    ActionResponse,
    NotesUpdate,
    NodeStatus,
    ReviewActionType,
)
from app.store import (
    ACTION_LOG,
    get_tree,
    get_semantic_review,
    get_case_metadata,
    update_node_status,
    find_node,
    ONTOLOGY_TREE,
    _get_supabase,
)
from app.services.diff import simulate_diff
from app.services.prompts import (
    get_all_prompts,
    get_prompt,
    update_prompt,
    reset_prompt,
)


app = FastAPI(title="Ontology Review Backend", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup_prime() -> None:
    """Warm in-memory state from Supabase so learning persists across restarts."""
    prime_pattern_decisions()
    # Warm the semantic cache so the first counts request doesn't stall on
    # ~900 cold WordNet lookups (slow on Render's small instance).
    try:
        _detect_naming_patterns()
        _detect_misplaced_patterns()
        print("[main] detector warmup complete")
    except Exception as e:
        print(f"[main] detector warmup failed: {e}")


# In-memory MVP stores. These are safe for prototyping.
# Later: move these to SQLite/Postgres.
AI_SUGGESTION_STORE: Dict[str, List[Dict[str, Any]]] = {}

# In-memory stores for edit-pattern demo decisions and shared principles.
# Later: move these to SQLite/Postgres alongside ACTION_LOG.
PATTERN_DECISIONS: List[Dict[str, Any]] = []
CONFLICTS: List[Dict[str, Any]] = []
PRINCIPLES: List[Dict[str, Any]] = [
    {
        "id": "principle-duplicate-sense",
        "title": "Nodes with the same name do not necessarily mean the same thing",
        "body": (
            "When two nodes share a name but have different synsets or different inheritance paths, "
            "reviewers should decide whether the label reflects the same concept and should be merged, "
            "or distinct senses that need clearer names."
        ),
        "source": "seed",
        "examples": [],
        "category": "duplicate",
    },
    {
        "id": "principle-duplicate-disambiguation",
        "title": "Distinguish meanings by renaming or adding a clarifying suffix",
        "body": (
            "When same-named nodes have distinct meanings, rename them. Prefer a clear synonym when one "
            "is available and unused; otherwise add a clarifying parenthetical suffix, such as "
            "'litter (animal)' and 'litter (trash)'."
        ),
        "source": "seed",
        "examples": [],
        "category": "duplicate",
    },
    {
        "id": "principle-virtual-organizing-value",
        "title": "Virtual nodes should contribute organizing value",
        "body": (
            "Keep a virtual node only when it usefully organizes the nodes beneath it. As a rule of thumb, "
            "each level of abstraction should usually contain about 3-8 categories, with exceptions. "
            "An only-child virtual node may add little value, while a virtual node that prevents an "
            "overcrowded sibling list may be useful."
        ),
        "source": "seed",
        "examples": [],
        "category": "virtual",
    },
    {
        "id": "principle-misplaced-top-categories",
        "title": "Use the four noun-category definitions when reviewing placement",
        "body": (
            "Physical Entities are tangible material things; Information entities are defined by meaning, "
            "content, or representation; Actors perform or can be treated as performing actions; Activities "
            "are happenings, processes, occurrences, or changes. Use these definitions when choosing the "
            "correct top-level ontology."
        ),
        "source": "seed",
        "examples": [],
        "category": "misplaced",
    },
    {
        "id": "principle-misplaced-is-a",
        "title": "Every child must be a type of its parent",
        "body": (
            "Every parent-child edge must express an IS-A relationship. For example, an engine is not a "
            "type of vehicle, so it should instead be placed under a parent such as component or car component."
        ),
        "source": "seed",
        "examples": [],
        "category": "misplaced",
    },
    {
        "id": "principle-inheritance-distinct-parents",
        "title": "Multiple parents must be distinct and both contribute inheritance",
        "body": (
            "A node should have more than one parent only when the parents are genuinely distinct and the node "
            "inherits properties from both. A book may be both information and a physical object. By contrast, "
            "device > electronic device > smartphone is a normal ancestry chain, not a reason to give smartphone "
            "both device and electronic device as direct parents."
        ),
        "source": "seed",
        "examples": [],
        "category": "inheritance",
    },
    {
        "id": "principle-naming-no-underscores",
        "title": "Node names should avoid underscores",
        "body": (
            "Underscores are artifacts of ontology generation and should be replaced with spaces. For example, "
            "'electro-acoustic_transducer' should become 'electro-acoustic transducer'."
        ),
        "source": "seed",
        "examples": [],
        "category": "naming",
    },
    {
        "id": "principle-global-no-artifact-prefixes",
        "title": "Node names should not contain artifact prefixes",
        "body": (
            "Remove generated prefixes such as numbering ('1. Name') and bracketed markers such as '[virtual]'. "
            "Node names should contain substantive text. Meaning-clarifying suffixes such as "
            "'class (socioeconomic)' are allowed."
        ),
        "source": "seed",
        "examples": [],
        "category": "all",
    },
]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def log_event(
    node_id: str,
    action_type: str,
    reviewer: Optional[str] = None,
    notes: Optional[str] = None,
    payload: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    event = {
        "id": f"log_{uuid4().hex[:10]}",
        "timestamp": now_iso(),
        "node_id": node_id,
        "action_type": action_type,
        "reviewer": reviewer or "Unassigned",
        "notes": notes or "",
        "payload": payload or {},
    }
    ACTION_LOG.append(event)
    sb = _get_supabase()
    if sb:
        try:
            sb.table("action_log").insert({
                "node_id": node_id,
                "action_type": action_type,
                "reviewer": reviewer,
                "notes": notes,
                "payload": payload or {},
            }).execute()
        except Exception as e:
            print(f"[main] Could not write action log: {e}")
    return event


def _persist_pattern_decision(record: Dict[str, Any]) -> None:
    """Append a pattern decision to the in-memory list AND persist it to
    Supabase (mirrors how log_event persists action_log). This is what lets
    the learning model keep its training data across backend restarts."""
    PATTERN_DECISIONS.append(record)
    sb = _get_supabase()
    if sb:
        try:
            sb.table("pattern_decisions").upsert({
                "id": record["id"],
                "pattern_id": record["pattern_id"],
                "decision": record["decision"],
                "reviewer": record.get("reviewer"),
                "comment": record.get("comment"),
                "altered_action": record.get("altered_action"),
                "payload": record.get("payload") or {},
                "created_at": record.get("created_at"),
            }).execute()
        except Exception as e:
            print(f"[main] could not persist pattern decision: {e}")


def prime_pattern_decisions(force: bool = False) -> None:
    """Load all pattern_decisions from Supabase into memory in ONE query at
    startup, so the learning model trains across restarts instead of from
    scratch. Same single-query pattern as ai_scoring.prime_cache."""
    if PATTERN_DECISIONS and not force:
        return
    sb = _get_supabase()
    if sb is None:
        return
    try:
        rows = sb.table("pattern_decisions").select("*").order("created_at").execute()
        PATTERN_DECISIONS.clear()
        for row in rows.data:
            PATTERN_DECISIONS.append(row)
        print(f"[main] primed {len(rows.data)} pattern decisions")
    except Exception as e:
        print(f"[main] prime_pattern_decisions failed: {e}")


def flatten_tree(nodes, parent_path=None) -> List[Dict[str, Any]]:
    parent_path = parent_path or []
    rows: List[Dict[str, Any]] = []
    for node in nodes:
        path = [*parent_path, node.label]
        rows.append(
            {
                "id": node.id,
                "label": node.label,
                "code": node.code,
                "status": node.status,
                "path": path,
                "path_string": " → ".join(path),
                "children_count": len(node.children or []),
            }
        )
        rows.extend(flatten_tree(node.children or [], path))
    return rows


@lru_cache(maxsize=1)
def _ontology_reference_index() -> Dict[str, Dict[str, Any]]:
    """Index real ontology nodes by id, synset code, and normalized label."""
    rows = flatten_tree(ONTOLOGY_TREE)
    by_id = {str(row["id"]).strip().lower(): row for row in rows if row.get("id")}
    by_code = {str(row["code"]).strip().lower(): row for row in rows if row.get("code")}
    by_label: Dict[str, List[Dict[str, Any]]] = {}
    for row in rows:
        label = _norm_pattern_label(str(row.get("label") or ""))
        if label:
            by_label.setdefault(label, []).append(row)
    return {"by_id": by_id, "by_code": by_code, "by_label": by_label, "rows": rows}


def _resolve_existing_node_ref(value: Any) -> Optional[Dict[str, Any]]:
    """Resolve an LLM-proposed node reference only when it maps to a real node.

    Exact ids and synset codes are preferred. A label is accepted only when it
    identifies exactly one node, avoiding ambiguous free-form destinations.
    """
    ref = str(value or "").strip()
    if not ref:
        return None
    index = _ontology_reference_index()
    key = ref.lower()
    if key in index["by_id"]:
        return index["by_id"][key]
    if key in index["by_code"]:
        return index["by_code"][key]
    matches = index["by_label"].get(_norm_pattern_label(ref), [])
    return matches[0] if len(matches) == 1 else None


@lru_cache(maxsize=4096)
def _valid_parent_options_cached(current_id: str, current_top: str, limit: int = 25) -> tuple:
    """Cached core of _valid_parent_options, keyed by (node id, top category).
    Without this, every misplaced candidate re-filters and re-sorts all
    ~3.3k rows on every request — slow enough on Render to hang the
    post-save refresh and pin the Save/batch buttons."""
    rows = _ontology_reference_index()["rows"]
    candidates = [
        candidate for candidate in rows
        if candidate.get("id") != current_id
        and candidate.get("children_count", 0) > 0
        and _top_category(candidate) == current_top
    ]
    candidates.sort(key=lambda candidate: (len(candidate.get("path") or []), str(candidate.get("label") or "")))
    return tuple(candidates[:limit])


def _valid_parent_options(row: Dict[str, Any], limit: int = 25) -> List[Dict[str, Any]]:
    """Return real, nearby ontology nodes that the LLM may choose as parents."""
    return list(_valid_parent_options_cached(str(row.get("id") or ""), _top_category(row), limit))


def _format_parent_options(row: Dict[str, Any], limit: int = 25) -> str:
    options = _valid_parent_options(row, limit=limit)
    if not options:
        return "(no validated candidates available; recommend accept instead of inventing a parent)"
    return "\n".join(
        f'- node_id={option["id"]}; label={option["label"]}; path={option.get("path_string", "")}'
        for option in options
    )


def _validate_suggestion_action(suggestion: Dict[str, Any]) -> Dict[str, Any]:
    """Prevent cards from proposing ontology nodes that do not exist."""
    result = dict(suggestion)
    params = dict(result.get("action_params") or {})
    action = str(result.get("suggested_action") or "").strip().lower()

    ref_fields = {
        "place_elsewhere": "target_parent",
        "add_parent": "additional_parent",
    }
    field = ref_fields.get(action)
    if field:
        resolved = _resolve_existing_node_ref(params.get(field))
        if resolved is None:
            result["suggested_action"] = "accept"
            result["action_params"] = {}
            result["rationale"] = (
                f'{result.get("rationale", "")} The proposed {field.replace("_", " ")} did not match '
                "a unique existing ontology node, so the invalid structural edit was suppressed."
            ).strip()
            result["validation_warning"] = f"Invalid or ambiguous ontology reference: {params.get(field)!r}"
            return result
        params[field] = resolved["id"]
        params[f"{field}_label"] = resolved["label"]

    if action == "merge":
        merge_target = _resolve_existing_node_ref(params.get("merge_into"))
        target_parent = _resolve_existing_node_ref(params.get("target_parent"))
        if merge_target is None or target_parent is None:
            result["suggested_action"] = "rename"
            result["action_params"] = {"renames": []}
            result["rationale"] = (
                f'{result.get("rationale", "")} The merge target or resulting parent did not match '
                "a unique existing ontology node, so the unsafe merge recommendation was suppressed."
            ).strip()
            result["validation_warning"] = "Merge requires an existing merge target and existing resulting parent."
            return result
        params["merge_into"] = merge_target["id"]
        params["merge_into_label"] = merge_target["label"]
        params["target_parent"] = target_parent["id"]
        params["target_parent_label"] = target_parent["label"]

    result["action_params"] = params
    return result


class PatternDecisionRequest(BaseModel):
    decision: str  # approve | alter | reject
    reviewer: Optional[str] = "Sophia"
    comment: Optional[str] = ""
    altered_action: Optional[str] = None
    principle_update: Optional[str] = None
    principle_category: Optional[str] = None
    link_principle_id: Optional[str] = None
    payload: Dict[str, Any] = {}


class ConsensusRequest(BaseModel):
    reviewer: Optional[str] = "Unassigned"
    consensus_decision: str  # approve | alter | reject
    consensus_action: Optional[str] = None
    comment: Optional[str] = ""


def decision_signature(record: Dict[str, Any]) -> str:
    """A compact representation of what the reviewer actually chose.

    Two reviewers can both review the same pattern without creating a conflict
    if their signatures match. A conflict appears only when the decision/action
    differs across different reviewers.
    """
    return "|".join(
        [
            record.get("decision", ""),
            record.get("altered_action") or "",
            str(record.get("payload", {}).get("suggested_action", "")),
        ]
    )


def recompute_conflict(pattern_id: str) -> Optional[Dict[str, Any]]:
    votes = [d for d in PATTERN_DECISIONS if d.get("pattern_id") == pattern_id]
    reviewers = {v.get("reviewer") for v in votes}

    if len(votes) < 2 or len(reviewers) < 2:
        return None

    signatures = {decision_signature(v) for v in votes}
    if len(signatures) <= 1:
        return None

    existing = next(
        (
            c
            for c in CONFLICTS
            if c.get("pattern_id") == pattern_id and c.get("status") == "open"
        ),
        None,
    )
    if existing:
        existing["votes"] = votes
        existing["updated_at"] = now_iso()
        return existing

    conflict = {
        "id": f"conflict-{len(CONFLICTS) + 1}",
        "pattern_id": pattern_id,
        "status": "open",
        "votes": votes,
        "created_at": now_iso(),
        "updated_at": now_iso(),
        "consensus": None,
    }
    CONFLICTS.append(conflict)
    return conflict


@app.get("/health")
def health():
    return {"ok": True}
@app.get("/health")
def health():
    return {"ok": True}


@app.get("/status/all")
def all_statuses():
    """Return a node_id -> status mapping for all nodes that were changed."""
    sb = _get_supabase()
    if sb is None:
        return {}
    try:
        rows = sb.table("node_status").select("node_id,status").execute()
        return {r["node_id"]: r["status"] for r in rows.data}
    except Exception as e:
        print(f"[main] Could not fetch statuses: {e}")
        return {}


@app.get("/ontology/tree")
def ontology_tree():
    return get_tree()
@app.get("/ontology/tree")
def ontology_tree():
    return get_tree()


@app.get("/ontology/lookup")
def ontology_lookup(
    q: str = Query("", description="Search by label, synset code, or path"),
    limit: int = Query(25, ge=1, le=100),
):
    """Search the ontology tree and return lightweight node hits."""
    query = q.strip().lower()
    rows = flatten_tree(ONTOLOGY_TREE)

    if query:
        rows = [
            row
            for row in rows
            if query in row["label"].lower()
            or (row["code"] and query in row["code"].lower())
            or query in row["path_string"].lower()
            or query in row["id"].lower()
        ]

    return {"query": q, "results": rows[:limit], "count": len(rows)}


@app.get("/ontology/nodes/{node_id}")
def ontology_node(node_id: str):
    node = find_node(node_id)
    if node is None:
        raise HTTPException(status_code=404, detail=f"Node not found: {node_id}")
    rows = flatten_tree(ONTOLOGY_TREE)
    match = next((row for row in rows if row["id"] == node_id), None)
    return {
        "id": node.id,
        "label": node.label,
        "code": node.code,
        "status": node.status,
        "children": node.children,
        "path": match["path"] if match else [node.label],
        "path_string": match["path_string"] if match else node.label,
    }


@app.get("/reviews/{node_id}/semantic")
def semantic_review(node_id: str):
    return get_semantic_review(node_id)


@app.get("/reviews/{node_id}/metadata")
def case_metadata(node_id: str):
    return get_case_metadata(node_id)


class DiffRequest(BaseModel):
    action_type: str = ""
    payload: Dict[str, Any] = {}


@app.post("/reviews/{node_id}/diff")
def diff_simulation(node_id: str, body: DiffRequest):
    return simulate_diff(node_id, body.action_type, body.payload)


@app.put("/reviews/{node_id}/notes")
def save_notes(node_id: str, body: NotesUpdate):
    metadata = get_case_metadata(node_id)
    metadata.notes = body.notes
    if body.reviewer:
        metadata.reviewer = body.reviewer

    log_event(
        node_id=node_id,
        action_type="save_notes",
        reviewer=body.reviewer,
        notes=body.notes,
    )

    return {"ok": True, "node_id": node_id, "notes": metadata.notes}


@app.post("/reviews/{node_id}/actions", response_model=ActionResponse)
def apply_action(node_id: str, body: ActionRequest):
    """
    Handles human reviewer actions.

    This MVP records review decisions and updates visual node status.
    It does NOT rewrite the source ontology JSON directly. That is intentional:
    approved changes should become a review/change queue before being applied
    to canonical ontology files.
    """
    payload = body.payload or {}
    log_event(
        node_id=node_id,
        action_type=str(body.action_type),
        reviewer=body.reviewer,
        notes=body.notes,
        payload=payload,
    )

    if body.action_type in {ReviewActionType.approve_edit, ReviewActionType.accept}:
        update_node_status(node_id, NodeStatus.approved)
        return ActionResponse(
            ok=True,
            message="Accepted. Node marked as human-approved.",
            node_id=node_id,
            new_status=NodeStatus.approved,
        )

    if body.action_type == ReviewActionType.reject_edit:
        return ActionResponse(
            ok=True,
            message="Rejected and logged for future model/rule adjustment.",
            node_id=node_id,
        )

    if body.action_type in {ReviewActionType.escalate_case, ReviewActionType.escalate}:
        update_node_status(node_id, NodeStatus.conflict)
        return ActionResponse(
            ok=True,
            message="Case escalated for team review.",
            node_id=node_id,
            new_status=NodeStatus.conflict,
        )

    if body.action_type in {ReviewActionType.add_multiple_inheritance, ReviewActionType.add_parent}:
        parent = payload.get("parent_node_id") or payload.get("target_parent_id")
        update_node_status(node_id, NodeStatus.inheritance)
        return ActionResponse(
            ok=True,
            message=f"Add-parent/multiple-inheritance request logged{f' (parent: {parent})' if parent else ''}.",
            node_id=node_id,
            new_status=NodeStatus.inheritance,
        )

    if body.action_type in {ReviewActionType.split_node, ReviewActionType.split}:
        return ActionResponse(
            ok=True,
            message="Split request logged. A split proposal can be reviewed before modifying ontology JSON.",
            node_id=node_id,
        )

    if body.action_type in {ReviewActionType.merge_nodes, ReviewActionType.merge}:
        target = payload.get("target_node_id")
        if not target:
            raise HTTPException(status_code=400, detail="merge requires payload.target_node_id")
        return ActionResponse(
            ok=True,
            message=f"Merge request logged with target node {target}.",
            node_id=node_id,
        )

    if body.action_type == ReviewActionType.rename:
        new_label = payload.get("new_label")
        if not new_label:
            raise HTTPException(status_code=400, detail="rename requires payload.new_label")
        return ActionResponse(
            ok=True,
            message=f"Rename request logged (new label: {new_label}).",
            node_id=node_id,
        )

    if body.action_type == ReviewActionType.delete:
        update_node_status(node_id, NodeStatus.conflict)
        return ActionResponse(
            ok=True,
            message="Delete request logged. Node marked for review, but ontology JSON was not rewritten.",
            node_id=node_id,
            new_status=NodeStatus.conflict,
        )

    if body.action_type == ReviewActionType.place_elsewhere:
        target = payload.get("target_parent_id")
        if not target:
            raise HTTPException(status_code=400, detail="place_elsewhere requires payload.target_parent_id")
        update_node_status(node_id, NodeStatus.suggestion)
        return ActionResponse(
            ok=True,
            message=f"Move request logged (new parent: {target}).",
            node_id=node_id,
            new_status=NodeStatus.suggestion,
        )

    if body.action_type == ReviewActionType.turn_into_rule:
        rule_text = payload.get("rule_text")
        if not rule_text:
            raise HTTPException(status_code=400, detail="turn_into_rule requires payload.rule_text")
        return ActionResponse(
            ok=True,
            message="Rule candidate logged for future consistency checking.",
            node_id=node_id,
        )

    raise HTTPException(status_code=400, detail="Unsupported action")


@app.get("/actions/log")
def action_log(
    node_id: Optional[str] = None,
    q: str = "",
    limit: int = Query(100, ge=1, le=500),
):
    rows = list(reversed(ACTION_LOG))
    if node_id:
        rows = [row for row in rows if row.get("node_id") == node_id]
    if q.strip():
        query = q.strip().lower()
        rows = [
            row for row in rows
            if query in row.get("node_id", "").lower()
            or query in row.get("action_type", "").lower()
            or query in row.get("notes", "").lower()
            or query in str(row.get("payload", {})).lower()
        ]
    return {"results": rows[:limit], "count": len(rows)}


class AISuggestionRequest(BaseModel):
    api_key: str


@app.post("/reviews/{node_id}/ai-suggestions")
def ai_suggestions(node_id: str, body: AISuggestionRequest):
    if not body.api_key:
        raise HTTPException(status_code=400, detail="api_key is required")
    try:
        data = generate_ai_suggestions(node_id, body.api_key)
        suggestions = data.get("suggestions", [])

        stored: List[Dict[str, Any]] = []
        for suggestion in suggestions:
            item = {
                "id": suggestion.get("id") or f"sug_{uuid4().hex[:10]}",
                "node_id": node_id,
                "type": suggestion.get("type", "UNKNOWN"),
                "title": suggestion.get("title", "Untitled suggestion"),
                "body": suggestion.get("body", ""),
                "confidence": float(suggestion.get("confidence", 0)),
                "status": "pending",
                "created_at": now_iso(),
                "decision_feedback": "",
                "decision_reviewer": "",
            }
            stored.append(item)

        AI_SUGGESTION_STORE[node_id] = stored
        log_event(
            node_id=node_id,
            action_type="generate_ai_suggestions",
            payload={"suggestion_count": len(stored)},
        )
        return {"suggestions": stored}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI suggestion failed: {e}")


@app.get("/reviews/{node_id}/ai-suggestions")
def get_stored_ai_suggestions(node_id: str):
    return {"suggestions": AI_SUGGESTION_STORE.get(node_id, [])}


class AISuggestionDecisionRequest(BaseModel):
    decision: str  # approve | reject
    reviewer: Optional[str] = None
    feedback: Optional[str] = None


@app.post("/reviews/{node_id}/ai-suggestions/{suggestion_id}/decision")
def decide_ai_suggestion(node_id: str, suggestion_id: str, body: AISuggestionDecisionRequest):
    decision = body.decision.lower().strip()
    if decision not in {"approve", "reject"}:
        raise HTTPException(status_code=400, detail="decision must be approve or reject")

    suggestions = AI_SUGGESTION_STORE.get(node_id, [])
    suggestion = next((s for s in suggestions if s["id"] == suggestion_id), None)
    if suggestion is None:
        raise HTTPException(status_code=404, detail=f"Suggestion not found: {suggestion_id}")

    suggestion["status"] = "approved" if decision == "approve" else "rejected"
    suggestion["decision_feedback"] = body.feedback or ""
    suggestion["decision_reviewer"] = body.reviewer or "Unassigned"
    suggestion["decided_at"] = now_iso()

    if decision == "approve":
        update_node_status(node_id, NodeStatus.suggestion)

    log_event(
        node_id=node_id,
        action_type=f"ai_suggestion_{decision}",
        reviewer=body.reviewer,
        notes=body.feedback,
        payload={
            "suggestion_id": suggestion_id,
            "suggestion_type": suggestion.get("type"),
            "suggestion_title": suggestion.get("title"),
            "suggestion_body": suggestion.get("body"),
            "confidence": suggestion.get("confidence"),
        },
    )

    return {
        "ok": True,
        "node_id": node_id,
        "suggestion": suggestion,
        "message": f"AI suggestion {decision}ed and logged.",
    }


# -----------------------------------------------------------------------------
# Edit-pattern demo routes
# -----------------------------------------------------------------------------
def _norm_pattern_label(label: str) -> str:
    return (
        label.replace("_", " ")
        .replace("-", " ")
        .replace("[virtual]", "")
        .strip()
        .lower()
    )


def _top_category(row: Dict[str, Any]) -> str:
    path = row.get("path") or []
    return path[0] if path else "Unknown"

@lru_cache(maxsize=4096)
def _cached_semantic(node_id: str):
    """Memoized semantic lookup for detector candidate building.
    Detectors re-run on every counts/category load; the underlying WordNet
    lookups are pure and slow on small instances, so cache them."""
    try:
        s = get_semantic_review(node_id)
        return (s.wordnet_definition, tuple(s.onet_task_examples or []))
    except Exception:
        return (None, ())

def _detect_inheritance_patterns() -> Dict[str, Any]:
    rows = flatten_tree(ONTOLOGY_TREE)
    groups: Dict[str, List[Dict[str, Any]]] = {}

    for row in rows:
        code_key = (row.get("code") or "").strip()
        if not code_key:
            continue  # no synset -> cannot be multiply inherited
        groups.setdefault(code_key, []).append(row)

    suggestions: List[Dict[str, Any]] = []

    for code_key, matches in groups.items():
        if len(matches) < 2:
            continue

        top_categories = sorted({_top_category(row) for row in matches})
        synsets = sorted({row.get("code") for row in matches if row.get("code")})

        _paths = "\n".join(
            f"- {r['label']} ({r.get('code') or 'no synset'}): {r.get('path_string','')}"
            for r in matches[:6]
        )
        _inh_fb = {
            "suggested_action": "consider_multiple_inheritance",
            "rationale": (
                "This label appears in multiple sub-ontologies or inheritance paths. "
                "A reviewer should decide whether these are distinct senses, duplicate entries, "
                "or a valid multiple-inheritance concept."
            ),
            "confidence": 0.72,
        }
        _inh_def, _ = _cached_semantic(matches[0]["id"])
        _inh_scored = score_candidate(
            edit_type="multiple_inheritance",
            cache_key=f"inheritance::{code_key}",
            candidate_text=(
                f"Label: {matches[0]['label']}\n"
                f"Synset (same concept in all occurrences): {code_key}\n"
                f"Definition: {_inh_def or '—'}\n"
                f"Appears under these paths:\n{_paths}"
            ),
            fallback=_inh_fb,
        )
        suggestions.append(
            _validate_suggestion_action({
                "id": f"inheritance::{code_key}",
                "pattern_type": "inheritance",
                "rerun_with_current_prompt": _rerun_with_current_prompt(_inh_scored, "inheritance"),
                "label": matches[0]["label"],
                "title": f"Multiple inheritance candidate: {matches[0]['label']}",
                "suggested_action": _inh_scored["suggested_action"],
                "action_params": _inh_scored.get("action_params", {}),
                "rationale": _inh_scored["rationale"],
                "confidence": _inh_scored["confidence"],
                "nodes": [
                    {
                        "id": row["id"],
                        "label": row["label"],
                        "code": row.get("code"),
                        "parent_label": row["path"][-2] if len(row.get("path", [])) >= 2 else None,
                        "path": row.get("path_string", ""),
                    }
                    for row in matches[:6]
                ],
                "synsets": synsets,
            })
        )

    suggestions.sort(key=lambda item: (-item["confidence"], item["label"]))
    return {
        "pattern_type": "inheritance",
        "count": len(suggestions),
        "suggestions": suggestions,
    }


MISPLACED_MODEL = "gpt-4o-mini"  # cheap model for the all-nodes scan

def _has_number_prefix(label: str) -> bool:
    """Artifact prefixes like '5. Misclassified' / '1. Name'."""
    s = label.lstrip()
    dot = s.find(". ")
    return dot > 0 and s[:dot].isdigit()


def _is_junk_for_misplaced(row: Dict[str, Any]) -> bool:
    """Malformed nodes that shouldn't be scored as 'misplaced' — they are
    already surfaced by the naming detector instead:
      - no WordNet synset (row['code'] empty)
      - artifact number prefix like '5. Name'
    Runs before any LLM call, so filtering here is free."""
    label = str(row.get("label") or "")
    if _has_number_prefix(label):
        return True
    if not row.get("code"):   # 'no synset' — same test the naming detector uses
        return True
    return False

def _misplaced_suggestion_for_row(row: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Score ONE node for misplacement. Returns a suggestion dict when the
    LLM (cached or live) recommends a change; None when the node is accepted,
    unscored (fallback), or is a subontology root."""
    path = row.get("path", [])
    if len(path) < 2:
        return None  # subontology roots can't be misplaced
    if _is_junk_for_misplaced(row):
        return None  # malformed node -> handled by the naming detector

    top = _top_category(row).lower()
    path_string = row.get("path_string", "")

    _mis_fb = {
        "suggested_action": "unscored",
        "rationale": "Not yet scanned with the misplacement prompt.",
        "confidence": 0.0,
    }
    _sem_def, _sem_onet = _cached_semantic(row["id"])
    _mis_scored = score_candidate(
        edit_type="misplaced",
        cache_key=f"misplaced::{row['id']}",
        candidate_text=(
            f"Label: {row['label']} ({row.get('code') or 'no synset'})\n"
            f"Definition: {_sem_def or '—'}\n"
            f"O*NET task examples: {'; '.join(_sem_onet or []) or '—'}\n"
            f"Current path: {path_string}\n"
            f"Current top category: {top}\n"
            f"Parent: {path[-2] if len(path) >= 2 else '—'}\n"
            "VALID DESTINATION PARENTS (choose only an exact node_id from this list):\n"
            f"{_format_parent_options(row)}"
        ),
        fallback=_mis_fb,
        model=MISPLACED_MODEL,
    )

    _mis_scored = _validate_suggestion_action(_mis_scored)
    action = (_mis_scored.get("suggested_action") or "").lower()
    # Only surface real, LLM-judged problems: skip unscored fallbacks and
    # nodes the model accepted as correctly placed.
    if action in ("unscored", "accept", ""):
        return None

    return {
        "id": f"misplaced::{row['id']}",
        "pattern_type": "misplaced",
        "rerun_with_current_prompt": _rerun_with_current_prompt(_mis_scored, "misplaced"),
        "node_id": row["id"],
        "label": row["label"],
        "code": row.get("code"),
        "path": path_string,
        "title": f"Possible misplaced node: {row['label']}",
        "suggested_action": _mis_scored["suggested_action"],
        "action_params": _mis_scored.get("action_params", {}),
        "rationale": _mis_scored["rationale"],
        "confidence": _mis_scored["confidence"],
        "nodes": [
            {
                "id": row["id"],
                "label": row["label"],
                "code": row.get("code"),
                "parent_label": path[-2] if len(path) >= 2 else None,
                "path": path_string,
            }
        ],
    }


def _detect_misplaced_patterns() -> Dict[str, Any]:
    """All-nodes misplacement review. Every node is a candidate; the LLM
    (via cached scores) decides which are actually misplaced. Unscanned
    nodes and accepted placements produce no card."""
    rows = flatten_tree(ONTOLOGY_TREE)
    suggestions: List[Dict[str, Any]] = []
    for row in rows:
        s = _misplaced_suggestion_for_row(row)
        if s is not None:
            suggestions.append(s)

    suggestions.sort(key=lambda item: (-item["confidence"], item["label"]))
    return {
        "pattern_type": "misplaced",
        "count": len(suggestions),
        # Return all; the category endpoint paginates via limit/offset and
        # the counts endpoint needs the true total for the badge.
        "suggestions": suggestions,
    }

_NAMING_VAGUE_LABELS = {
    "thing", "entity", "object", "unit", "body", "part", "set", "group",
    "system", "structure", "matter", "attribute", "process",
}

def _naming_suggestion_for_row(row: Dict[str, Any]) -> Dict[str, Any]:
    """Build the naming suggestion for ONE flattened row (used by both the
    detector loop and single-node re-runs)."""
    label_raw = row.get("label", "")
    label = _norm_pattern_label(label_raw)
    no_synset = not row.get("code")
    vague = label in _NAMING_VAGUE_LABELS
    virtual_marker = "[virtual]" in label_raw.lower()

    confidence = 0.58
    if no_synset:
        confidence += 0.12
    if vague:
        confidence += 0.10
    if virtual_marker:
        confidence += 0.05

    _nam_fb = {
        "suggested_action": "clarify_label_or_add_disambiguation",
        "rationale": (
            "This node may need a clearer label or disambiguation because it is vague, virtual, "
            "missing a synset, or formatted in a way that may hide the intended sense."
        ),
        "confidence": min(confidence, 0.88),
    }
    _sem_def, _ = _cached_semantic(row["id"])
    _nam_scored = score_candidate(
        edit_type="naming",
        cache_key=f"naming::{row['id']}",
        candidate_text=(
            f"Label: {row['label']} ({row.get('code') or 'no synset'})\n"
            f"Definition: {_sem_def or '—'}\n"
            f"Path: {row.get('path_string','')}"
        ),
        fallback=_nam_fb,
    )
    return {
        "id": f"naming::{row['id']}",
        "pattern_type": "naming",
        "rerun_with_current_prompt": _rerun_with_current_prompt(_nam_scored, "naming"),
        "node_id": row["id"],
        "label": row["label"],
        "code": row.get("code"),
        "path": row.get("path_string", ""),
        "title": f"Naming review: {row['label']}",
        "suggested_action": _nam_scored["suggested_action"],
        "action_params": _nam_scored.get("action_params", {}),
        "rationale": _nam_scored["rationale"],
        "confidence": _nam_scored["confidence"],
        "nodes": [
            {
                "id": row["id"],
                "label": row["label"],
                "code": row.get("code"),
                "parent_label": row["path"][-2] if len(row.get("path", [])) >= 2 else None,
                "path": row.get("path_string", ""),
            }
        ],
    }

_NAMING_FULL: List[Dict[str, Any]] = []
def _detect_naming_patterns() -> Dict[str, Any]:
    rows = flatten_tree(ONTOLOGY_TREE)
    suggestions: List[Dict[str, Any]] = []

    vague_labels = {
        "thing",
        "entity",
        "object",
        "unit",
        "body",
        "part",
        "set",
        "group",
        "system",
        "structure",
        "matter",
        "attribute",
        "process",
    }

    for row in rows:
        label_raw = row.get("label", "")
        label = _norm_pattern_label(label_raw)
        has_underscore = "_" in label_raw
        no_synset = not row.get("code")
        vague = label in vague_labels
        virtual_marker = "[virtual]" in label_raw.lower()

        if not (has_underscore or no_synset or vague or virtual_marker):
            continue

        suggestions.append(_naming_suggestion_for_row(row))

    suggestions.sort(key=lambda item: (-item["confidence"], item["label"]))
    global _NAMING_FULL
    _NAMING_FULL = suggestions
    return {
        "pattern_type": "naming",
        "count": len(suggestions),
        "suggestions": suggestions[:25],
    }


@app.get("/edit-patterns")
def edit_patterns():
    """Return all detected edit-pattern suggestions for compatibility."""
    return detect_all_edit_patterns()



PATTERN_CATEGORY_META: Dict[str, Dict[str, str]] = {
    "duplicate": {
        "title": "Duplicate Handling",
        "description": "Same label, repeated concept, or different synsets that need merge/rename review.",
    },
    "virtual": {
        "title": "Virtual Node Handling",
        "description": "Virtual nodes that should be kept, altered, or removed based on inheritance value.",
    },
    "misplaced": {
        "title": "Misplaced Nodes",
        "description": "Nodes whose current parent may not express a valid IS-A relationship.",
    },
    "inheritance": {
        "title": "Multiple Inheritance",
        "description": "Concepts that may legitimately belong under more than one parent.",
    },
    "naming": {
        "title": "Naming / Disambiguation",
        "description": "Labels that may need clearer names, sense labels, or formatting changes.",
    },
}


def _detect_category_patterns(category: str) -> Dict[str, Any]:
    """Detect one edit-pattern category at a time.

    This is intentionally separated from /edit-patterns/grouped so the frontend
    can lazy-load one category/page instead of pulling every suggestion at once.
    """
    if category == "duplicate":
        return detect_duplicate_patterns()
    if category == "virtual":
        return detect_virtual_node_patterns()
    if category == "misplaced":
        return _detect_misplaced_patterns()
    if category == "inheritance":
        return _detect_inheritance_patterns()
    if category == "naming":
        return _detect_naming_patterns()
    raise HTTPException(status_code=404, detail=f"Unknown edit-pattern category: {category}")


def _filter_suggestions_by_query(suggestions: List[Dict[str, Any]], q: str) -> List[Dict[str, Any]]:
    query = q.strip().lower()
    if not query:
        return suggestions
    return [s for s in suggestions if query in str(s).lower()]


def _page_suggestions(
    suggestions: List[Dict[str, Any]],
    limit: int,
    offset: int,
    q: str = "",
) -> Dict[str, Any]:
    filtered = _filter_suggestions_by_query(suggestions, q)
    total = len(filtered)
    page = filtered[offset : offset + limit]
    return {
        "suggestions": page,
        "total": total,
        "limit": limit,
        "offset": offset,
        "has_more": offset + limit < total,
    }


def _category_response(category: str, limit: int, offset: int, q: str = "") -> Dict[str, Any]:
    detected = _detect_category_patterns(category)
    suggestions = [_validate_suggestion_action(s) for s in detected.get("suggestions", [])]
    page = _page_suggestions(suggestions, limit=limit, offset=offset, q=q)
    meta = PATTERN_CATEGORY_META[category]

    return {
        "key": category,
        "title": meta["title"],
        "description": meta["description"],
        "count": page["total"],
        "suggestions": page["suggestions"],
        "limit": page["limit"],
        "offset": page["offset"],
        "has_more": page["has_more"],
    }


def _suggestion_node_ids(suggestion: Dict[str, Any]) -> List[str]:
    ids: List[str] = []
    node_id = suggestion.get("node_id")
    if node_id:
        ids.append(str(node_id))
    for node in suggestion.get("nodes") or []:
        nid = node.get("id")
        if nid:
            ids.append(str(nid))
    return ids


@app.get("/edit-patterns/counts")
def edit_pattern_counts():
    """Return counts only, without sending every suggestion card to the frontend."""
    counts: Dict[str, int] = {}
    categories: List[Dict[str, Any]] = []

    for key, meta in PATTERN_CATEGORY_META.items():
        detected = _detect_category_patterns(key)
        count = len(detected.get("suggestions", []))
        counts[key] = count
        categories.append(
            {
                "key": key,
                "title": meta["title"],
                "description": meta["description"],
                "count": count,
            }
        )

    return {"counts": counts, "categories": categories}


@app.get("/edit-patterns/highlights")
def edit_pattern_highlights():
    """Return a lightweight node_id -> pattern_type map for tree highlighting.

    This avoids loading/rendering all suggestion cards just to color the left tree.
    """
    highlights: Dict[str, str] = {}
    counts: Dict[str, int] = {}

    for key in PATTERN_CATEGORY_META:
        detected = _detect_category_patterns(key)
        suggestions = detected.get("suggestions", [])
        counts[key] = len(suggestions)

        for suggestion in suggestions:
            for node_id in _suggestion_node_ids(suggestion):
                highlights[node_id] = key

    return {"highlights": highlights, "counts": counts}


@app.get("/edit-patterns/category/{category}")
def edit_pattern_category(
    category: str,
    # Cap raised from 100 -> 5000. The misplaced category can legitimately
    # return ~1000 cards, and the frontend currently requests limit=count in
    # one shot; a le=100 cap made that request 422 ("Could not load"). This
    # only affects validation — the response is served from cache, no OpenAI.
    limit: int = Query(25, ge=1, le=5000),
    offset: int = Query(0, ge=0),
    q: str = "",
):
    """Return one paginated edit-pattern category."""
    return _category_response(category, limit=limit, offset=offset, q=q)


@app.get("/edit-patterns/grouped")
def grouped_edit_patterns(
    limit: int = Query(10, ge=0, le=100),
    offset: int = Query(0, ge=0),
):
    """Return grouped edit-pattern suggestions with a small page per category.

    Backward compatible with the older frontend, but now avoids sending huge
    payloads by default. Use /edit-patterns/category/{category} for full paging.
    """
    categories: List[Dict[str, Any]] = []
    counts: Dict[str, int] = {}

    for key, meta in PATTERN_CATEGORY_META.items():
        detected = _detect_category_patterns(key)
        suggestions = detected.get("suggestions", [])
        total = len(suggestions)
        counts[key] = total

        categories.append(
            {
                "key": key,
                "title": meta["title"],
                "description": meta["description"],
                "suggestions": suggestions[offset : offset + limit] if limit else [],
                "count": total,
                "limit": limit,
                "offset": offset,
                "has_more": offset + limit < total if limit else total > 0,
            }
        )

    return {"categories": categories, "counts": counts}

class RerunNodeRequest(BaseModel):
    cache_key: str


@app.post("/edit-patterns/rerun-node")
def rerun_node(body: RerunNodeRequest):
    """Force re-score ONE candidate with the current prompt, by deleting its
    cached score and re-running its category detector. Because other nodes are
    still cached, only this one actually calls OpenAI (costs ~1 call)."""
    cache_key = body.cache_key

    # 1. Infer the category from the cache_key prefix (before "::")
    prefix = cache_key.split("::", 1)[0] if "::" in cache_key else ""
    prefix_to_category = {
        "duplicate": "duplicate",
        "virtual": "virtual",
        "misplaced": "misplaced",
        "inheritance": "inheritance",
        "naming": "naming",
    }
    category = prefix_to_category.get(prefix)
    if category is None:
        raise HTTPException(
            status_code=400,
            detail=f"Cannot infer category from cache_key: {cache_key}",
        )

    # 2. Drop the old cached result (in-memory + Supabase) so it gets re-scored
    _CACHE.pop(cache_key, None)
    sb = _get_supabase()
    if sb:
        try:
            sb.table("ai_scores").delete().eq("cache_key", cache_key).execute()
        except Exception as e:
            print(f"[main] could not delete old score for {cache_key}: {e}")

    # 3. Re-score ONLY this node directly, instead of re-running the whole
    #    category detector and fishing the id back out (which was fragile:
    #    pagination limits / sort order / id drift could all make the match
    #    fail even though the node exists). We deleted its cache above, and
    #    _virtual_suggestion / detect_duplicate_patterns will re-call OpenAI
    #    for this one key (every other node stays warm-cached).
    import os
    old_skip = os.environ.get("SKIP_LLM")
    os.environ["SKIP_LLM"] = "false"  # force a real OpenAI call for the deleted key
    try:
        match = None

        if category == "virtual":
            # cache_key == f"virtual::{node.id}"; recover the node id and
            # re-score just that node.
            from app.services.edit_patterns import (
                flatten_ontology,
                _virtual_suggestion,
            )
            node_id = cache_key.split("::", 1)[1]
            flat_node = next(
                (n for n in flatten_ontology() if n.id == node_id), None
            )
            if flat_node is not None:
                match = _virtual_suggestion(flat_node)
        elif category == "naming":
            # Re-score just this one node directly — re-running the whole
            # 870-candidate detector made re-runs crawl.
            node_id = cache_key.split("::", 1)[1]
            row = next(
                (r for r in flatten_tree(ONTOLOGY_TREE) if r.get("id") == node_id),
                None,
            )
            if row is not None:
                match = _naming_suggestion_for_row(row)
        elif category == "misplaced":
            # All-nodes misplacement review: re-score just this node with
            # the misplacement prompt (mini model).
            node_id = cache_key.split("::", 1)[1]
            row = next(
                (r for r in flatten_tree(ONTOLOGY_TREE) if r.get("id") == node_id),
                None,
            )
            if row is not None:
                match = _misplaced_suggestion_for_row(row)
                if match is None:
                    # Re-run judged it correctly placed — return a synthetic
                    # accept card so the UI can show the outcome instead of 404.
                    match = {
                        "id": cache_key,
                        "pattern_type": "misplaced",
                        "node_id": node_id,
                        "label": row.get("label", ""),
                        "suggested_action": "accept",
                        "action_params": {},
                        "rationale": "Re-run judged this node correctly placed.",
                        "confidence": 0.0,
                        "nodes": [],
                    }
        else:
            # Other categories key by something other than node.id
            # (e.g. duplicate::{label}), so fall back to the detector and
            # match by id.
            detected = _detect_category_patterns(category)
            match = next(
                (s for s in detected.get("suggestions", []) if s.get("id") == cache_key),
                None,
            )
    finally:
        if old_skip is None:
            os.environ.pop("SKIP_LLM", None)
        else:
            os.environ["SKIP_LLM"] = old_skip

    if match is None:
        raise HTTPException(
            status_code=404,
            detail=f"Re-run did not produce a result for {cache_key}",
        )
    match = _validate_suggestion_action(match)
    return {"ok": True, "cache_key": cache_key, "suggestion": match}

@app.get("/wordnet/{code}")
def wordnet_info(code: str):
    """Live WordNet lookup by synset code: definition + synonyms (lemmas)."""
    try:
        synset = wn.synset(code)
    except Exception:
        raise HTTPException(status_code=404, detail=f"No WordNet entry for '{code}'")
    definition = synset.definition()
    examples = synset.examples()
    if examples:
        definition = f'{definition}: "{examples[0]}"'
    synonyms = [l.name().replace("_", " ") for l in synset.lemmas()]
    return {"code": code, "definition": definition, "synonyms": synonyms}

@app.get("/edit-patterns/duplicates")
def duplicate_edit_patterns():
    """Detect duplicate labels / duplicate-sense edit patterns."""
    return detect_duplicate_patterns()


@app.get("/edit-patterns/virtual")
def virtual_edit_patterns():
    """Detect virtual node keep / alter / remove edit patterns."""
    return detect_virtual_node_patterns()


@app.get("/edit-patterns/misplaced")
def misplaced_edit_patterns():
    """Detect possible misplaced-node edit patterns."""
    return _detect_misplaced_patterns()


@app.get("/edit-patterns/inheritance")
def inheritance_edit_patterns():
    """Detect possible multiple-inheritance edit patterns."""
    return _detect_inheritance_patterns()


@app.get("/edit-patterns/naming")
def naming_edit_patterns():
    """Detect naming/disambiguation edit patterns."""
    return _detect_naming_patterns()


@app.get("/reviews/{node_id}/patterns")
def node_edit_patterns(node_id: str):
    """Return duplicate/virtual edit-pattern context for one selected node."""
    return get_node_pattern_context(node_id)


@app.post("/edit-patterns/{pattern_id:path}/decision")
def decide_edit_pattern(pattern_id: str, body: PatternDecisionRequest):
    """
    Store a human decision on an edit-pattern suggestion.

    This records whether the reviewer approved, rejected, or altered the suggested
    edit. If the reviewer writes a principle update, the backend also records a
    new shared principle linked to this concrete example.
    """
    decision = body.decision.lower().strip()
    if decision not in {"approve", "alter", "reject"}:
        raise HTTPException(status_code=400, detail="decision must be approve, alter, or reject")

    import uuid
    record = {
        "id": f"pattern-decision-{uuid.uuid4().hex[:12]}",
        "pattern_id": pattern_id,
        "decision": decision,
        "reviewer": body.reviewer or "Unassigned",
        "comment": body.comment or "",
        "altered_action": body.altered_action,
        "payload": body.payload or {},
        "created_at": now_iso(),
    }
    _persist_pattern_decision(record)

    conflict = recompute_conflict(pattern_id)
    if conflict:
        record["created_conflict_id"] = conflict["id"]

    # If the reviewer linked this edit to an existing principle,
    # add this pattern_id to that principle's examples (dedup).
    if body.link_principle_id:
        for p in PRINCIPLES:
            if p["id"] == body.link_principle_id:
                if pattern_id not in p["examples"]:
                    p["examples"].append(pattern_id)
                record["linked_principle_id"] = body.link_principle_id
                break

    log_event(
        node_id=pattern_id,
        action_type=f"edit_pattern_{decision}",
        reviewer=body.reviewer,
        notes=body.comment,
        payload={
            "altered_action": body.altered_action,
            "principle_update": body.principle_update,
            **(body.payload or {}),
        },
    )

    if body.principle_update and body.principle_update.strip():
        _text = body.principle_update.strip()
        # Use the first sentence (or first ~80 chars) as the title, full text as body.
        _first = _text.split(".")[0].strip()
        _title = _first if 0 < len(_first) <= 80 else (_text[:80].rstrip() + "…")
        principle = {
            "id": f"principle-{len(PRINCIPLES) + 1}",
            "title": _title,
            "body": _text,
            "source": "human_review",
            "examples": [pattern_id],
            "category": body.principle_category or (body.payload or {}).get("pattern_type") or "all",
            "created_at": record["created_at"],
        }
        PRINCIPLES.append(principle)
        record["principle_added"] = principle

    return {
        "ok": True,
        "message": f"Stored {decision} decision for {pattern_id}.",
        "record": record,
    }

@app.post("/edit-patterns/misplaced/scan")
def scan_all_misplaced(limit: int = 0):
    """One-time full scan: score every ELIGIBLE node with the misplacement
    prompt (gpt-4o-mini). limit=0 = all.

    Skips two kinds of node so the scan can actually terminate:
      - already-scored nodes (cache hit), and
      - junk/ineligible nodes (no synset / number-prefixed) that
        _misplaced_suggestion_for_row itself skips BEFORE any LLM call and
        therefore never caches. Without this second skip, those uncached
        junk nodes were re-counted on every request, so `scanned` plateaued
        at `limit` forever and never reached 0 (the infinite-scan bug).

    Response counters let the caller verify completeness:
      scanned         newly scored on this call
      already_cached  eligible nodes already done before this call
      remaining       eligible nodes still uncached after this call (limit hit)
      eligible_total  total scoreable nodes in the ontology
      done            True when nothing eligible is left to score
    """
    import os
    rows = flatten_tree(ONTOLOGY_TREE)
    old_skip = os.environ.get("SKIP_LLM")
    os.environ["SKIP_LLM"] = "false"
    scanned = 0
    already = 0
    remaining = 0
    eligible = 0
    try:
        for row in rows:
            if len(row.get("path", [])) < 2:
                continue  # subontology roots can't be misplaced
            if _is_junk_for_misplaced(row):
                continue  # mirror the scorer's own guard; never cacheable
            eligible += 1
            cache_key = f"misplaced::{row['id']}"
            if cache_key in _CACHE:
                already += 1
                continue  # already scored; only pay for new nodes
            if limit and scanned >= limit:
                remaining += 1  # keep counting to report true progress
                continue
            _misplaced_suggestion_for_row(row)  # scores + caches
            scanned += 1
    finally:
        if old_skip is None:
            os.environ.pop("SKIP_LLM", None)
        else:
            os.environ["SKIP_LLM"] = old_skip
    return {
        "ok": True,
        "scanned": scanned,
        "already_cached": already,
        "remaining": remaining,
        "eligible_total": eligible,
        "done": remaining == 0,
    }

@app.delete("/edit-patterns/{pattern_id:path}/decision")
def undo_edit_pattern_decision(pattern_id: str, reviewer: str = ""):
    """
    Undo a human decision on an edit-pattern suggestion.

    Only removes decisions made by the requesting reviewer, so one person's
    undo never wipes out a teammate's decision on the same suggestion.
    """
    if not reviewer:
        raise HTTPException(status_code=400, detail="reviewer is required to undo")

    # 1. Find THIS reviewer's decision records for this pattern.
    matching = [
        d for d in PATTERN_DECISIONS
        if d.get("pattern_id") == pattern_id and d.get("reviewer") == reviewer
    ]
    if not matching:
        return {"ok": True, "message": "No decision by this reviewer to undo."}

    # 2a. Remove only this reviewer's records from memory.
    PATTERN_DECISIONS[:] = [
        d for d in PATTERN_DECISIONS
        if not (d.get("pattern_id") == pattern_id and d.get("reviewer") == reviewer)
    ]
    removed_count = len(matching)

    # 2b. Delete only this reviewer's rows from Supabase.
    sb = _get_supabase()
    if sb:
        try:
            sb.table("pattern_decisions").delete().eq(
                "pattern_id", pattern_id
            ).eq("reviewer", reviewer).execute()
        except Exception as e:
            print(f"[main] could not delete pattern decision(s) from Supabase: {e}")

    # 3. Unlink from principle examples only when NO decisions remain on this
    #    pattern (another reviewer's decision may still justify the link).
    still_decided = any(d.get("pattern_id") == pattern_id for d in PATTERN_DECISIONS)
    if not still_decided:
        for p in PRINCIPLES:
            if pattern_id in p.get("examples", []):
                p["examples"].remove(pattern_id)

    # 4. Log the undo event with the real reviewer
    log_event(
        node_id=pattern_id,
        action_type="undo_edit_pattern_decision",
        reviewer=reviewer,
        notes="Undid own previous decision",
        payload={}
    )

    return {
        "ok": True,
        "message": f"Successfully undid {removed_count} decision(s) by {reviewer} for {pattern_id}."
    }

@app.get("/collaboration/conflicts")
def collaboration_conflicts(status: Optional[str] = None):
    """Return open/resolved conflicts created by incompatible reviewer decisions."""
    rows = CONFLICTS
    if status:
        rows = [c for c in rows if c.get("status") == status]
    return {"conflicts": rows}


@app.get("/collaboration/summary")
def collaboration_summary():
    """Return reviewer decisions and conflict state for collaborative review UI."""
    return {"decisions": PATTERN_DECISIONS, "conflicts": CONFLICTS}


@app.post("/collaboration/conflicts/{conflict_id}/consensus")
def resolve_conflict(conflict_id: str, body: ConsensusRequest):
    """Resolve an open conflict by storing a consensus decision."""
    conflict = next((c for c in CONFLICTS if c.get("id") == conflict_id), None)
    if conflict is None:
        raise HTTPException(status_code=404, detail="Conflict not found")
    if conflict.get("status") == "resolved":
        raise HTTPException(status_code=400, detail="Conflict already resolved")

    decision = body.consensus_decision.lower().strip()
    if decision not in {"approve", "alter", "reject"}:
        raise HTTPException(status_code=400, detail="consensus_decision must be approve, alter, or reject")

    consensus = {
        "id": f"consensus-{uuid4().hex[:8]}",
        "conflict_id": conflict_id,
        "pattern_id": conflict["pattern_id"],
        "decision": decision,
        "altered_action": body.consensus_action,
        "reviewer": body.reviewer or "Unassigned",
        "comment": body.comment or "",
        "created_at": now_iso(),
    }

    conflict["status"] = "resolved"
    conflict["consensus"] = consensus
    conflict["resolved_at"] = consensus["created_at"]
    conflict["updated_at"] = consensus["created_at"]

    log_event(
        node_id=conflict["pattern_id"],
        action_type="conflict_consensus",
        reviewer=body.reviewer,
        notes=body.comment,
        payload=consensus,
    )

    return {"ok": True, "conflict": conflict}


@app.get("/edit-pattern-decisions")
def edit_pattern_decisions():
    """Return stored human decisions on edit-pattern suggestions."""
    return {"decisions": PATTERN_DECISIONS}


@app.get("/principles")
def get_principles(category: Optional[str] = None):
    """Return shared editing principles.

    If category is provided, include principles for that edit type plus global/all
    principles. This keeps principle linking specific to the current edit type.
    """
    rows = PRINCIPLES
    if category and category != "all":
        rows = [
            p for p in rows
            if (p.get("category") or "all") in {category, "all"}
        ]
    return {"principles": rows}


@app.post("/principles")
def add_principle(body: PatternDecisionRequest):
    """Manually add a shared editing principle."""
    text = (body.principle_update or body.comment or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="principle_update or comment is required")

    _first = text.split(".")[0].strip()
    _title = _first if 0 < len(_first) <= 80 else (text[:80].rstrip() + "…")
    _examples = []
    if body.payload and isinstance(body.payload, dict):
        _examples = body.payload.get("examples", []) or []
    principle = {
        "id": f"principle-{len(PRINCIPLES) + 1}",
        "title": _title,
        "body": text,
        "source": "manual",
        "examples": _examples,
        "category": body.principle_category or "all",
        "created_at": now_iso(),
    }
    PRINCIPLES.append(principle)
    return {"ok": True, "principle": principle}

# ---------------------------------------------------------------------------
# Editable LLM prompts (one per edit type)
# ---------------------------------------------------------------------------

class PromptUpdate(BaseModel):
    system: Optional[str] = None
    user: Optional[str] = None


class PromptLearningRequest(BaseModel):
    reviewer: Optional[str] = "Unassigned"
    min_examples: int = 3
    max_examples: int = 8
    focus_category: Optional[str] = None


class BatchRerunRequest(BaseModel):
    edit_type: str
    reviewer: Optional[str] = "Unassigned"
    limit: int = 10
    run_all: bool = False


def _pattern_type_for_prompt(edit_type: str) -> str:
    return "inheritance" if edit_type == "multiple_inheritance" else edit_type


def _recent_decisions_for_prompt_learning(edit_type: str, max_examples: int) -> List[Dict[str, Any]]:
    pattern_type = _pattern_type_for_prompt(edit_type)
    rows = [
        d for d in PATTERN_DECISIONS
        if (d.get("payload") or {}).get("pattern_type") == pattern_type
        or str(d.get("pattern_id", "")).startswith(pattern_type + "::")
    ]
    return list(reversed(rows))[:max_examples]


@app.post("/prompts/{edit_type}/learn-proposal")
def learn_prompt_proposal(edit_type: str, body: PromptLearningRequest) -> Dict[str, Any]:
    """Use recent human decisions to propose an improved prompt.

    This does NOT save the prompt and does NOT re-run suggestions. The user sees
    current vs learned prompt, edits it if needed, then saves manually.
    """
    try:
        current = get_prompt(edit_type)
    except KeyError:
        raise HTTPException(status_code=404, detail=f"Unknown edit type: {edit_type}")

    examples = _recent_decisions_for_prompt_learning(edit_type, body.max_examples)
    if len(examples) < body.min_examples:
        raise HTTPException(
            status_code=400,
            detail=f"Need at least {body.min_examples} reviewed examples for this category; found {len(examples)}.",
        )

    compact_examples = []
    for d in examples:
        payload = d.get("payload") or {}
        compact_examples.append({
            "pattern_id": d.get("pattern_id"),
            "ai_suggested_action": payload.get("suggested_action"),
            "ai_title": payload.get("title"),
            "human_decision": d.get("decision"),
            "human_altered_action": d.get("altered_action"),
            "human_comment": d.get("comment"),
        })

    from app.services.llm_client import call_llm
    import json, re

    system = (
        "You improve ontology-editing prompts from human feedback. "
        "Given the current prompt and several human review decisions, propose a revised prompt "
        "that better reflects the reviewers' behavior. Keep the required JSON output contract intact. "
        "Return STRICT JSON only with keys: system, user, rationale."
    )
    user = (
        f"EDIT TYPE: {edit_type}\n\n"
        f"CURRENT SYSTEM PROMPT:\n{current.get('system','')}\n\n"
        f"CURRENT USER PROMPT:\n{current.get('user','')}\n\n"
        f"HUMAN DECISION EXAMPLES:\n{json.dumps(compact_examples, indent=2)}\n\n"
        "Revise the prompts to better guide future AI suggestions. "
        "Do not remove required fields, allowed action names, or strict JSON requirements."
    )

    raw = call_llm(system, user, temperature=0.2, max_tokens=1800)
    cleaned = raw.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned).strip()
    try:
        parsed = json.loads(cleaned)
    except Exception:
        raise HTTPException(status_code=500, detail=f"LLM did not return valid JSON: {raw[:500]}")

    proposed = {
        "label": current.get("label", edit_type),
        "system": parsed.get("system") or current.get("system", ""),
        "user": parsed.get("user") or current.get("user", ""),
    }

    log_event(
        node_id=f"prompt::{edit_type}",
        action_type="llm_prompt_learning_proposal",
        reviewer=body.reviewer,
        payload={"edit_type": edit_type, "example_count": len(examples), "rationale": parsed.get("rationale", "")},
    )

    return {
        "ok": True,
        "edit_type": edit_type,
        "current": current,
        "proposed": proposed,
        "rationale": parsed.get("rationale", ""),
        "examples": compact_examples,
        "example_count": len(examples),
    }


@app.post("/edit-patterns/rerun-batch")
def rerun_batch(body: BatchRerunRequest):
    """Re-run a small batch or all cached AI scores for one edit type.

    Re-scores each target individually (cache delete + direct re-score).
    Never flips the global SKIP_LLM switch and never re-runs the whole
    detector with the switch off — that combination silently full-scanned
    every uncached node (3.3k real API calls) on each batch click.
    """
    import os
    edit_type = body.edit_type
    category = _pattern_type_for_prompt(edit_type)
    if category not in PATTERN_CATEGORY_META:
        raise HTTPException(status_code=404, detail=f"Unknown edit type: {edit_type}")

    # 1. Collect candidate ids WITHOUT any OpenAI calls (cache/fallback only).
    old_skip = os.environ.get("SKIP_LLM")
    os.environ["SKIP_LLM"] = "true"
    try:
        if category == "virtual":
            from app.services.edit_patterns import detect_virtual_node_patterns
            detected = detect_virtual_node_patterns(limit=None)
        else:
            detected = _detect_category_patterns(category)
    finally:
        if old_skip is None:
            os.environ.pop("SKIP_LLM", None)
        else:
            os.environ["SKIP_LLM"] = old_skip

    candidate_ids = [s.get("id") for s in detected.get("suggestions", []) if s.get("id")]
    target_ids = candidate_ids if body.run_all else candidate_ids[: max(1, min(body.limit, 50))]

    # 2. Delete targets' cached scores (memory + Supabase).
    sb = _get_supabase()
    for cache_key in target_ids:
        _CACHE.pop(cache_key, None)
        if sb:
            try:
                sb.table("ai_scores").delete().eq("cache_key", cache_key).execute()
            except Exception as e:
                print(f"[main] could not delete old score for {cache_key}: {e}")

    # 3. Re-score ONLY the targets, one node at a time. SKIP_LLM stays
    #    scoped to this loop: with the cache deleted, the single-node
    #    scorers hit the LLM for exactly these keys.
    results: List[Dict[str, Any]] = []
    rows_by_id = {str(r.get("id")): r for r in flatten_tree(ONTOLOGY_TREE)}
    old_skip = os.environ.get("SKIP_LLM")
    os.environ["SKIP_LLM"] = "false"
    try:
        for cache_key in target_ids:
            node_id = cache_key.split("::", 1)[1] if "::" in cache_key else ""
            s = None
            if category == "misplaced":
                row = rows_by_id.get(node_id)
                if row is not None:
                    s = _misplaced_suggestion_for_row(row)
            elif category == "naming":
                row = rows_by_id.get(node_id)
                if row is not None:
                    s = _naming_suggestion_for_row(row)
            elif category == "virtual":
                from app.services.edit_patterns import flatten_ontology, _virtual_suggestion
                flat_node = next((n for n in flatten_ontology() if n.id == node_id), None)
                if flat_node is not None:
                    s = _virtual_suggestion(flat_node)
            else:
                # duplicate / inheritance are group-keyed; re-detect the
                # category (their candidate sets are small) and pick the key.
                det = _detect_category_patterns(category)
                s = next((x for x in det.get("suggestions", []) if x.get("id") == cache_key), None)
            if s is not None:
                results.append(_validate_suggestion_action(s))
    finally:
        if old_skip is None:
            os.environ.pop("SKIP_LLM", None)
        else:
            os.environ["SKIP_LLM"] = old_skip

    log_event(
        node_id=f"prompt::{edit_type}",
        action_type="llm_prompt_batch_rerun",
        reviewer=body.reviewer,
        payload={"edit_type": edit_type, "run_all": body.run_all, "requested": len(target_ids), "refreshed": len(results)},
    )
    return {"ok": True, "edit_type": edit_type, "run_all": body.run_all, "count": len(results), "suggestions": results}

@app.get("/prompts")
def list_prompts() -> Dict[str, Any]:
    """Return all editable prompts, keyed by edit type."""
    return {"prompts": get_all_prompts()}


@app.put("/prompts/{edit_type}")
def edit_prompt(edit_type: str, body: PromptUpdate) -> Dict[str, Any]:
    """Update the system and/or user prompt for one edit type."""
    try:
        updated = update_prompt(edit_type, system=body.system, user=body.user)
    except KeyError:
        raise HTTPException(status_code=404, detail=f"Unknown edit type: {edit_type}")
    return {"edit_type": edit_type, "prompt": updated}


@app.post("/prompts/{edit_type}/reset")
def reset_one_prompt(edit_type: str) -> Dict[str, Any]:
    """Reset one edit type's prompt back to its default."""
    try:
        restored = reset_prompt(edit_type)
    except KeyError:
        raise HTTPException(status_code=404, detail=f"Unknown edit type: {edit_type}")
    return {"edit_type": edit_type, "prompt": restored}


# ---------------------------------------------------------------------------
# Active learning / self-learning from human decisions
# ---------------------------------------------------------------------------

LEARNING_MODEL: Dict[str, Any] = {
    "trained_at": None,
    "examples": 0,
    "rules": {},
    "global_majority": "approve",
}

AUTO_REVIEW_ITEMS: List[Dict[str, Any]] = []


class LearningTrainRequest(BaseModel):
    reviewer: Optional[str] = "Unassigned"
    is_admin: Optional[bool] = False


class LearningPredictRequest(BaseModel):
    suggestion: Dict[str, Any]


class AutoReviewDecisionRequest(BaseModel):
    reviewer: Optional[str] = "Unassigned"
    approve: bool
    is_admin: Optional[bool] = False
    comment: Optional[str] = ""


def _normalize_action(action: Optional[str]) -> str:
    return (action or "").strip().lower().replace(" ", "_")


def _pattern_decision_lookup() -> Dict[str, Dict[str, Any]]:
    """Most recent human decision for each pattern id."""
    latest: Dict[str, Dict[str, Any]] = {}
    for row in PATTERN_DECISIONS:
        latest[row.get("pattern_id", "")] = row
    return latest


def _suggestion_signature(suggestion: Dict[str, Any]) -> str:
    """Compact feature key for simple active learning.

    This intentionally stays interpretable for demo/research use. It learns from
    pattern type + suggested action instead of using opaque RL.
    """
    pattern_type = suggestion.get("pattern_type", "unknown")
    action = _normalize_action(suggestion.get("suggested_action"))
    node_count = len(suggestion.get("nodes") or [])
    confidence = float(suggestion.get("confidence") or 0)

    if confidence >= 0.85:
        confidence_bucket = "high"
    elif confidence >= 0.65:
        confidence_bucket = "medium"
    else:
        confidence_bucket = "low"

    if node_count <= 1:
        node_bucket = "single"
    elif node_count <= 3:
        node_bucket = "few"
    else:
        node_bucket = "many"

    return f"{pattern_type}|{action}|{confidence_bucket}|{node_bucket}"


def _train_learning_model() -> Dict[str, Any]:
    """Train a lightweight, interpretable rule learner from human decisions."""
    decision_counts: Dict[str, int] = {}
    rule_counts: Dict[str, Dict[str, int]] = {}

    # Look up the REAL current suggestion (true confidence + nodes) by pattern_id,
    # so the signature we learn matches the signature we later predict with.
    # Stored payloads only carry pattern_type/suggested_action/title, so without
    # this the learned signature defaults to medium/single and never matches the
    # real high/few suggestions -> learned rules silently never fire.
    real_by_id: Dict[str, Dict[str, Any]] = {
        s.get("id"): s for s in _all_current_suggestions("all")
    }

    for row in PATTERN_DECISIONS:
        decision = row.get("decision")
        if decision not in {"approve", "alter", "reject"}:
            continue

        payload = row.get("payload") or {}
        pattern_id = row.get("pattern_id", "")
        real = real_by_id.get(pattern_id, {})
        suggestion = {
            "id": pattern_id,
            "pattern_type": payload.get("pattern_type")
                or real.get("pattern_type")
                or pattern_id.split("::")[0],
            "suggested_action": payload.get("suggested_action")
                or real.get("suggested_action")
                or row.get("altered_action", ""),
            "confidence": real.get("confidence", payload.get("confidence", 0.75)),
            "nodes": real.get("nodes", payload.get("nodes", [])),
        }
        signature = _suggestion_signature(suggestion)

        decision_counts[decision] = decision_counts.get(decision, 0) + 1
        rule_counts.setdefault(signature, {})
        rule_counts[signature][decision] = rule_counts[signature].get(decision, 0) + 1

    rules: Dict[str, Dict[str, Any]] = {}
    for signature, counts in rule_counts.items():
        total = sum(counts.values())
        best_decision, best_count = max(counts.items(), key=lambda item: item[1])
        rules[signature] = {
            "decision": best_decision,
            "confidence": round(best_count / total, 3),
            "support": total,
            "counts": counts,
        }

    global_majority = "approve"
    if decision_counts:
        global_majority = max(decision_counts.items(), key=lambda item: item[1])[0]

    LEARNING_MODEL.update(
        {
            "trained_at": now_iso(),
            "examples": sum(decision_counts.values()),
            "rules": rules,
            "global_majority": global_majority,
            "decision_counts": decision_counts,
        }
    )
    return LEARNING_MODEL


def _heuristic_prediction(suggestion: Dict[str, Any]) -> Dict[str, Any]:
    """Fallback when there are not enough training examples."""
    pattern_type = suggestion.get("pattern_type")
    action = _normalize_action(suggestion.get("suggested_action"))
    confidence = float(suggestion.get("confidence") or 0)
    node_count = len(suggestion.get("nodes") or [])

    # Conservative, explainable defaults.
    decision = "approve"
    score = 0.55
    reason = "Fallback heuristic: not enough human decisions to fully train the learner yet."

    if pattern_type == "virtual" and ("remove" in action or "delete" in action) and node_count <= 1:
        decision = "approve"
        score = 0.78
        reason = "Virtual node with low structural value often receives approval for removal."
    elif pattern_type == "duplicate" and ("merge" in action or "duplicate" in action):
        decision = "approve" if confidence >= 0.75 else "alter"
        score = 0.72 if confidence >= 0.75 else 0.62
        reason = "Duplicate suggestions are usually approved when confidence is strong; otherwise they need alteration."
    elif pattern_type == "naming":
        decision = "alter"
        score = 0.68
        reason = "Naming issues usually require a human-provided replacement label."
    elif pattern_type == "misplaced":
        decision = "alter"
        score = 0.66
        reason = "Misplaced nodes usually require choosing a better parent rather than direct approval."
    elif pattern_type == "inheritance":
        decision = "alter"
        score = 0.64
        reason = "Multiple inheritance candidates usually require a reviewer to specify the additional parent."

    return {
        "decision": decision,
        "confidence": score,
        "source": "heuristic",
        "reason": reason,
        "support": 0,
    }


def _predict_suggestion_decision(suggestion: Dict[str, Any]) -> Dict[str, Any]:
    if LEARNING_MODEL.get("trained_at") is None:
        _train_learning_model()

    signature = _suggestion_signature(suggestion)
    rule = (LEARNING_MODEL.get("rules") or {}).get(signature)

    if rule and rule.get("support", 0) >= 2:
        return {
            "decision": rule["decision"],
            "confidence": rule["confidence"],
            "source": "learned_rule",
            "reason": (
                f"Matched learned rule {signature!r} based on "
                f"{rule['support']} prior human decision(s)."
            ),
            "support": rule["support"],
            "signature": signature,
        }

    heuristic = _heuristic_prediction(suggestion)
    heuristic["signature"] = signature
    return heuristic


def _all_current_suggestions(category: str = "all") -> List[Dict[str, Any]]:
    """Collect suggestions for the learning layer WITHOUT triggering OpenAI.

    Forces SKIP_LLM so any cache-miss node falls back to rule-based scoring
    instead of calling the API. This prevents the full-scan LLM storm that
    crashed the free-tier Supabase: clicking the "Learned" tab can now never
    fan out into hundreds of OpenAI calls.
    """
    keys = list(PATTERN_CATEGORY_META.keys()) if category == "all" else [category]
    suggestions: List[Dict[str, Any]] = []

    import os
    old_skip = os.environ.get("SKIP_LLM")
    os.environ["SKIP_LLM"] = "true"   # learning is pure statistics, never calls OpenAI
    try:
        for key in keys:
            detected = _detect_category_patterns(key)
            for suggestion in detected.get("suggestions", []):
                suggestions.append(suggestion)
    finally:
        # restore the previous value so normal scoring elsewhere is unaffected
        if old_skip is None:
            os.environ.pop("SKIP_LLM", None)
        else:
            os.environ["SKIP_LLM"] = old_skip

    return suggestions


@app.get("/learning/status")
def learning_status():
    """Return current active-learning model summary."""
    if LEARNING_MODEL.get("trained_at") is None:
        _train_learning_model()
    return {
        "model": {
            "trained_at": LEARNING_MODEL.get("trained_at"),
            "examples": LEARNING_MODEL.get("examples"),
            "rule_count": len(LEARNING_MODEL.get("rules") or {}),
            "global_majority": LEARNING_MODEL.get("global_majority"),
            "decision_counts": LEARNING_MODEL.get("decision_counts", {}),
        },
        "auto_review_count": len([x for x in AUTO_REVIEW_ITEMS if x.get("status") == "pending"]),
    }


@app.get("/learning/rules")
def learning_rules():
    """Return the full learned rule table for transparency / auditing.

    Each rule shows the signature it matches, the decision it predicts, the
    confidence (agreement among human decisions), how many human decisions
    support it, and the raw approve/alter/reject vote counts. This is the
    interpretable record of what the system learned from people.
    """
    if LEARNING_MODEL.get("trained_at") is None:
        _train_learning_model()
    rules = LEARNING_MODEL.get("rules") or {}
    return {
        "trained_at": LEARNING_MODEL.get("trained_at"),
        "rule_count": len(rules),
        "rules": [
            {
                "signature": sig,
                "decision": r.get("decision"),
                "confidence": r.get("confidence"),
                "support": r.get("support"),
                "counts": r.get("counts"),
            }
            for sig, r in sorted(rules.items(), key=lambda kv: -kv[1].get("support", 0))
        ],
    }


@app.post("/learning/train")
def train_learning_model(body: LearningTrainRequest):
    """Train/retrain from human pattern decisions."""
    model = _train_learning_model()
    log_event(
        node_id="learning",
        action_type="learning_train",
        reviewer=body.reviewer,
        payload={
            "examples": model.get("examples"),
            "rule_count": len(model.get("rules") or {}),
        },
    )
    return {"ok": True, "model": model}


@app.post("/learning/predict")
def predict_learning_decision(body: LearningPredictRequest):
    """Predict approve/alter/reject for one suggestion."""
    prediction = _predict_suggestion_decision(body.suggestion)
    return {"prediction": prediction}


@app.get("/learning/auto-review")
def learning_auto_review(
    category: str = "all",
    threshold: float = Query(0.85, ge=0.0, le=1.0),
    limit: int = Query(50, ge=1, le=250),
):
    """Return high-confidence learned predictions for unresolved suggestions."""
    reviewed = _pattern_decision_lookup()
    existing_pending = {
        item["pattern_id"]: item
        for item in AUTO_REVIEW_ITEMS
        if item.get("status") == "pending"
    }

    candidates: List[Dict[str, Any]] = []
    for suggestion in _all_current_suggestions(category):
        pattern_id = suggestion.get("id")
        if not pattern_id or pattern_id in reviewed:
            continue

        prediction = _predict_suggestion_decision(suggestion)
        if prediction.get("confidence", 0) < threshold:
            continue

        if pattern_id in existing_pending:
            item = existing_pending[pattern_id]
            item["prediction"] = prediction
            item["suggestion"] = suggestion
        else:
            item = {
                "id": f"auto-review-{len(AUTO_REVIEW_ITEMS) + 1}",
                "pattern_id": pattern_id,
                "suggestion": suggestion,
                "prediction": prediction,
                "status": "pending",
                "created_at": now_iso(),
            }
            AUTO_REVIEW_ITEMS.append(item)

        candidates.append(item)
        if len(candidates) >= limit:
            break

    return {"items": candidates, "threshold": threshold, "count": len(candidates)}


@app.post("/learning/auto-review/{item_id}/decision")
def decide_learning_auto_review(item_id: str, body: AutoReviewDecisionRequest):
    """Admin approval/rejection for a learned auto-decision candidate."""
    if not body.is_admin:
        raise HTTPException(status_code=403, detail="Only admins can approve learned auto-decisions")

    item = next((x for x in AUTO_REVIEW_ITEMS if x.get("id") == item_id), None)
    if item is None:
        raise HTTPException(status_code=404, detail="Auto-review item not found")
    if item.get("status") != "pending":
        raise HTTPException(status_code=400, detail="Auto-review item already resolved")

    item["status"] = "approved" if body.approve else "rejected"
    item["resolved_by"] = body.reviewer or "Unassigned"
    item["resolved_at"] = now_iso()
    item["comment"] = body.comment or ""

    if body.approve:
        prediction = item["prediction"]
        suggestion = item["suggestion"]
        record = {
            "id": f"pattern-decision-{uuid4().hex[:12]}",
            "pattern_id": item["pattern_id"],
            "decision": prediction["decision"],
            "reviewer": body.reviewer or "Learning System",
            "comment": body.comment or "Admin-approved learned auto-decision.",
            "altered_action": None,
            "payload": {
                "pattern_type": suggestion.get("pattern_type"),
                "suggested_action": suggestion.get("suggested_action"),
                "title": suggestion.get("title"),
                "learning_prediction": prediction,
                "auto_review_id": item_id,
            },
            "created_at": now_iso(),
        }
        _persist_pattern_decision(record)
        item["applied_decision"] = record

        log_event(
            node_id=item["pattern_id"],
            action_type="learning_auto_decision_approved",
            reviewer=body.reviewer,
            notes=body.comment,
            payload=record,
        )
    else:
        log_event(
            node_id=item["pattern_id"],
            action_type="learning_auto_decision_rejected",
            reviewer=body.reviewer,
            notes=body.comment,
            payload=item,
        )

    return {"ok": True, "item": item}

# ---------------------------------------------------------------------------
# Admin / study reset
# ---------------------------------------------------------------------------

class ResetRequest(BaseModel):
    scope: str = "study"          # "log" = clear the activity feed only; "study" = full reset
    is_admin: Optional[bool] = False
    reviewer: Optional[str] = "Facilitator"


def _reset_tree_statuses(nodes) -> None:
    """Recursively set every node's status back to none (clears tree coloring)."""
    for n in nodes:
        n.status = NodeStatus.none
        _reset_tree_statuses(n.children or [])


@app.post("/admin/reset")
def admin_reset(body: ResetRequest):
    """Clear accumulated review state so the next study session starts clean."""
    if not body.is_admin:
        raise HTTPException(status_code=403, detail="Only a facilitator/admin can reset study state")

    sb = _get_supabase()

    # 1. Activity log — always cleared (in-memory + Supabase).
    ACTION_LOG.clear()
    if sb:
        try:
            sb.table("action_log").delete().neq("node_id", "__never__").execute()
        except Exception as e:
            print(f"[main] could not clear action_log: {e}")

    if body.scope == "log":
        return {"ok": True, "scope": "log", "message": "Activity log cleared."}

    # 2. Full reset — in-memory stores.
    PATTERN_DECISIONS.clear()
    CONFLICTS.clear()
    AI_SUGGESTION_STORE.clear()
    AUTO_REVIEW_ITEMS.clear()
    _CACHE.clear()                          # cached AI scores
    _reset_tree_statuses(ONTOLOGY_TREE)     # node colors back to none

    LEARNING_MODEL.update({
        "trained_at": None, "examples": 0, "rules": {},
        "global_majority": "approve", "decision_counts": {},
    })

    # Keep the 2 seeded principles, drop the human-added ones.
    seeded = [p for p in PRINCIPLES if p.get("source") == "initial"]
    PRINCIPLES.clear()
    PRINCIPLES.extend(seeded)

    # 3. Full reset — Supabase tables that get primed back on restart.
    if sb:
        for table, col in (("pattern_decisions", "id"),
                           ("node_status", "node_id"),
                           ("ai_scores", "cache_key")):
            try:
                sb.table(table).delete().neq(col, "__never__").execute()
            except Exception as e:
                print(f"[main] could not clear {table}: {e}")

    return {"ok": True, "scope": "study", "message": "Full study state reset."}