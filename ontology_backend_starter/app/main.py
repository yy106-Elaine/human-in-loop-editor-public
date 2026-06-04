from fastapi import FastAPI, HTTPException
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
)
from app.services.diff import simulate_diff


app = FastAPI(title="Ontology Review Backend", version="0.1.0")

# For local frontend dev. In production, restrict this to your frontend host.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/ontology/tree")
def ontology_tree():
    return get_tree()


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

    ACTION_LOG.append(
        {
            "node_id": node_id,
            "action_type": "save_notes",
            "reviewer": body.reviewer,
            "notes": body.notes,
        }
    )

    return {"ok": True, "node_id": node_id, "notes": metadata.notes}


@app.post("/reviews/{node_id}/actions", response_model=ActionResponse)
def apply_action(node_id: str, body: ActionRequest):
    """
    Handles reviewer actions from the right-side action panel.

    MVP behavior:
    - approve_edit: mark node green/approved
    - reject_edit: leave node as suggestion/ambiguous but log rejection
    - add_multiple_inheritance: mark node purple/inheritance
    - split_node / merge_nodes / escalate_case / turn_into_rule:
      log action and return an explanatory message

    Production behavior should create formal proposed edits/rules rather than
    mutating ontology state immediately.
    """
    ACTION_LOG.append(
        {
            "node_id": node_id,
            "action_type": body.action_type,
            "reviewer": body.reviewer,
            "notes": body.notes,
            "payload": body.payload,
        }
    )

    if body.action_type == ReviewActionType.approve_edit:
        update_node_status(node_id, NodeStatus.approved)
        return ActionResponse(
            ok=True,
            message="Edit approved. Node marked as human-approved.",
            node_id=node_id,
            new_status=NodeStatus.approved,
        )

    if body.action_type == ReviewActionType.reject_edit:
        return ActionResponse(
            ok=True,
            message="Edit rejected and logged for future model/rule adjustment.",
            node_id=node_id,
        )

    if body.action_type == ReviewActionType.add_multiple_inheritance:
        update_node_status(node_id, NodeStatus.inheritance)
        return ActionResponse(
            ok=True,
            message="Multiple inheritance action logged. Node marked as multiple-inheritance candidate.",
            node_id=node_id,
            new_status=NodeStatus.inheritance,
        )

    if body.action_type == ReviewActionType.split_node:
        return ActionResponse(
            ok=True,
            message="Split request logged. Production system should create a split proposal object.",
            node_id=node_id,
        )

    if body.action_type == ReviewActionType.merge_nodes:
        target = body.payload.get("target_node_id")
        if not target:
            raise HTTPException(status_code=400, detail="merge_nodes requires payload.target_node_id")
        return ActionResponse(
            ok=True,
            message=f"Merge request logged with target node {target}.",
            node_id=node_id,
        )

    if body.action_type == ReviewActionType.escalate_case:
        update_node_status(node_id, NodeStatus.conflict)
        return ActionResponse(
            ok=True,
            message="Case escalated for team review.",
            node_id=node_id,
            new_status=NodeStatus.conflict,
        )

    if body.action_type == ReviewActionType.turn_into_rule:
        rule_text = body.payload.get("rule_text")
        if not rule_text:
            raise HTTPException(status_code=400, detail="turn_into_rule requires payload.rule_text")
        return ActionResponse(
            ok=True,
            message="Rule candidate logged for future consistency checking.",
            node_id=node_id,
        )

    raise HTTPException(status_code=400, detail="Unsupported action")


@app.get("/actions/log")
def action_log():
    return ACTION_LOG
