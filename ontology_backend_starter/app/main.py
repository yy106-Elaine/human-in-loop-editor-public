from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from uuid import uuid4

from pydantic import BaseModel
from app.services.ai_suggestions import generate_ai_suggestions
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

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
)
from app.services.diff import simulate_diff


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


@app.get("/health")
def health():
    return {"ok": True}


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


@app.get("/reviews/{node_id}/diff")
def diff_simulation(node_id: str):
    return simulate_diff(node_id)


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
