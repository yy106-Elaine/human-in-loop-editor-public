from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class NodeStatus(str, Enum):
    conflict = "conflict"
    ambiguous = "ambiguous"
    inheritance = "inheritance"
    suggestion = "suggestion"
    approved = "approved"
    none = "none"


class ReviewActionType(str, Enum):
    approve_edit = "approve_edit"
    reject_edit = "reject_edit"
    add_multiple_inheritance = "add_multiple_inheritance"
    split_node = "split_node"
    merge_nodes = "merge_nodes"
    escalate_case = "escalate_case"
    turn_into_rule = "turn_into_rule"


class OntologyNode(BaseModel):
    id: str
    label: str
    code: Optional[str] = None
    status: NodeStatus = NodeStatus.none
    children: List["OntologyNode"] = Field(default_factory=list)


OntologyNode.model_rebuild()


class PerspectiveScore(BaseModel):
    perspective: str
    confidence: float


class ReviewedCase(BaseModel):
    label: str
    status: str
    resolution: str


class SemanticReview(BaseModel):
    node_id: str
    label: str
    code: Optional[str] = None
    semantic_tension_detected: bool
    tension_explanation: str
    wordnet_definition: str
    current_parents: List[str]
    perspective_confidence: List[PerspectiveScore]
    onet_task_examples: List[str]
    similar_reviewed_cases: List[ReviewedCase]
    ai_explanation: str
    recommendation: str


class ActionRequest(BaseModel):
    action_type: ReviewActionType
    reviewer: Optional[str] = None
    notes: Optional[str] = None
    payload: Dict[str, Any] = Field(default_factory=dict)


class ActionResponse(BaseModel):
    ok: bool
    message: str
    node_id: str
    new_status: Optional[NodeStatus] = None


class NotesUpdate(BaseModel):
    reviewer: Optional[str] = None
    notes: str


class CaseMetadata(BaseModel):
    review_id: str
    submitted: str
    ai_confidence: str
    complexity: str
    reviewer: str
    notes: str = ""


class DiffTreeLine(BaseModel):
    text: str
    depth: int = 0
    highlight: bool = False


class ImpactMetric(BaseModel):
    label: str
    value: str
    detail: Optional[str] = None
    trend: Optional[str] = None


class DiffSimulation(BaseModel):
    node_id: str
    before_tree: List[DiffTreeLine]
    after_tree: List[DiffTreeLine]
    inheritance_changes: List[ImpactMetric]
    affected_descendants: List[str]
    semantic_conflicts: List[ImpactMetric]
    broken_rules: List[str]
    ai_applicability_impact: List[ImpactMetric]
