from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel
from app.services.ai_suggestions import generate_ai_suggestions
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from app.services.ai_scoring import score_candidate
from app.services.edit_patterns import (
    detect_duplicate_patterns,
    detect_virtual_node_patterns,
    detect_all_edit_patterns,
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
        "title": "Same label does not always mean same concept",
        "body": (
            "When two nodes share a label but have different synsets or different inheritance paths, "
            "reviewers should decide whether the label reflects duplicate concepts or distinct senses "
            "that need clearer names."
        ),
        "source": "initial",
        "examples": [],
    },
    {
        "id": "principle-virtual-utility",
        "title": "Virtual nodes should contribute inheritance value",
        "body": (
            "A virtual node should be kept when it organizes multiple children or captures a reusable abstraction. "
            "It should be altered or removed when it adds little structure or obscures meaning."
        ),
        "source": "initial",
        "examples": [],
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


class PatternDecisionRequest(BaseModel):
    decision: str  # approve | alter | reject
    reviewer: Optional[str] = "Sophia"
    comment: Optional[str] = ""
    altered_action: Optional[str] = None
    principle_update: Optional[str] = None
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
    """返回所有被改过的 node 的 node_id → status 映射。"""
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


def _detect_inheritance_patterns() -> Dict[str, Any]:
    rows = flatten_tree(ONTOLOGY_TREE)
    groups: Dict[str, List[Dict[str, Any]]] = {}

    for row in rows:
        label = _norm_pattern_label(row.get("label", ""))
        if not label:
            continue
        groups.setdefault(label, []).append(row)

    suggestions: List[Dict[str, Any]] = []

    for label, matches in groups.items():
        if len(matches) < 2:
            continue

        top_categories = sorted({_top_category(row) for row in matches})
        synsets = sorted({row.get("code") for row in matches if row.get("code")})

        if len(top_categories) < 2:
            continue

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
        _inh_scored = score_candidate(
            edit_type="multiple_inheritance",
            cache_key=f"inheritance::{label}",
            candidate_text=f"Label: {matches[0]['label']}\nAppears under these paths:\n{_paths}",
            fallback=_inh_fb,
        )
        suggestions.append(
            {
                "id": f"inheritance::{label}",
                "pattern_type": "inheritance",
                "label": matches[0]["label"],
                "title": f"Multiple inheritance candidate: {matches[0]['label']}",
                "suggested_action": _inh_scored["suggested_action"],
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
            }
        )

    suggestions.sort(key=lambda item: (-item["confidence"], item["label"]))
    return {
        "pattern_type": "inheritance",
        "count": len(suggestions),
        "suggestions": suggestions[:25],
    }


def _detect_misplaced_patterns() -> Dict[str, Any]:
    rows = flatten_tree(ONTOLOGY_TREE)
    suggestions: List[Dict[str, Any]] = []

    activity_like = {
        "meeting",
        "conference",
        "convention",
        "date",
        "party",
        "dinner",
        "reception",
    }
    information_like = {
        "record",
        "document",
        "paper",
        "table",
        "file",
        "report",
        "chart",
        "map",
    }
    actor_like = {
        "school",
        "library",
        "office",
        "institution",
        "government",
        "company",
        "staff",
    }

    for row in rows:
        label = _norm_pattern_label(row.get("label", ""))
        top = _top_category(row).lower()
        path_string = row.get("path_string", "")

        suggested_parent = None

        if label in activity_like and "activit" not in top:
            suggested_parent = "Activities"
        elif label in information_like and "information" not in top:
            suggested_parent = "Information"
        elif label in actor_like and "actor" not in top and "physical" in top:
            suggested_parent = "Actor or multiple inheritance"

        if suggested_parent:
            _mis_fb = {
                "suggested_action": f"review placement under {suggested_parent}",
                "rationale": (
                    f"The node appears under {top or 'an unclear category'}, but its label suggests "
                    f"it may belong under {suggested_parent}. A human reviewer should verify whether "
                    "this is a true IS-A relationship or a contextual use."
                ),
                "confidence": 0.64,
            }
            _mis_scored = score_candidate(
                edit_type="misplaced",
                cache_key=f"misplaced::{row['id']}",
                candidate_text=(
                    f"Label: {row['label']} ({row.get('code') or 'no synset'})\n"
                    f"Current path: {path_string}\n"
                    f"Current top category: {top}\n"
                    f"Heuristic suggests it may belong under: {suggested_parent}"
                ),
                fallback=_mis_fb,
            )
            suggestions.append(
                {
                    "id": f"misplaced::{row['id']}",
                    "pattern_type": "misplaced",
                    "node_id": row["id"],
                    "label": row["label"],
                    "code": row.get("code"),
                    "path": path_string,
                    "title": f"Possible misplaced node: {row['label']}",
                    "suggested_action": _mis_scored["suggested_action"],
                    "rationale": _mis_scored["rationale"],
                    "confidence": _mis_scored["confidence"],
                    "nodes": [
                        {
                            "id": row["id"],
                            "label": row["label"],
                            "code": row.get("code"),
                            "parent_label": row["path"][-2] if len(row.get("path", [])) >= 2 else None,
                            "path": path_string,
                        }
                    ],
                }
            )

    return {
        "pattern_type": "misplaced",
        "count": len(suggestions),
        "suggestions": suggestions[:25],
    }


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
        _nam_scored = score_candidate(
            edit_type="naming",
            cache_key=f"naming::{row['id']}",
            candidate_text=(
                f"Label: {row['label']} ({row.get('code') or 'no synset'})\n"
                f"Path: {row.get('path_string','')}"
            ),
            fallback=_nam_fb,
        )
        suggestions.append(
            {
                "id": f"naming::{row['id']}",
                "pattern_type": "naming",
                "node_id": row["id"],
                "label": row["label"],
                "code": row.get("code"),
                "path": row.get("path_string", ""),
                "title": f"Naming review: {row['label']}",
                "suggested_action": _nam_scored["suggested_action"],
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
        )

    suggestions.sort(key=lambda item: (-item["confidence"], item["label"]))
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
    suggestions = detected.get("suggestions", [])
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
    limit: int = Query(25, ge=1, le=100),
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

    record = {
        "id": f"pattern-decision-{len(PATTERN_DECISIONS) + 1}",
        "pattern_id": pattern_id,
        "decision": decision,
        "reviewer": body.reviewer or "Unassigned",
        "comment": body.comment or "",
        "altered_action": body.altered_action,
        "payload": body.payload or {},
        "created_at": now_iso(),
    }
    PATTERN_DECISIONS.append(record)

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
        principle = {
            "id": f"principle-{len(PRINCIPLES) + 1}",
            "title": "Human-updated editing principle",
            "body": body.principle_update.strip(),
            "source": "human_review",
            "examples": [pattern_id],
            "created_at": record["created_at"],
        }
        PRINCIPLES.append(principle)
        record["principle_added"] = principle

    return {
        "ok": True,
        "message": f"Stored {decision} decision for {pattern_id}.",
        "record": record,
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
def get_principles():
    """Return shared editing principles, including human-updated ones."""
    return {"principles": PRINCIPLES}


@app.post("/principles")
def add_principle(body: PatternDecisionRequest):
    """Manually add a shared editing principle."""
    text = (body.principle_update or body.comment or "").strip()
    if not text:
        raise HTTPException(status_code=400, detail="principle_update or comment is required")

    principle = {
        "id": f"principle-{len(PRINCIPLES) + 1}",
        "title": "Human-added principle",
        "body": text,
        "source": "manual",
        "examples": [],
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
