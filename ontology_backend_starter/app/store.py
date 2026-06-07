from copy import deepcopy
from typing import Dict, List
from app.schemas import (
    OntologyNode,
    NodeStatus,
    SemanticReview,
    PerspectiveScore,
    ReviewedCase,
    CaseMetadata,
)


ONTOLOGY_TREE: List[OntologyNode] = [
    OntologyNode(
        id="actor",
        label="Actor",
        status=NodeStatus.none,
        children=[
            OntologyNode(
                id="institution",
                label="Institution",
                status=NodeStatus.none,
                children=[
                    OntologyNode(id="school", label="School", code="school.n.01", status=NodeStatus.ambiguous),
                    OntologyNode(id="hospital", label="Hospital", code="hospital.n.01", status=NodeStatus.approved),
                ],
            ),
            OntologyNode(
                id="professional",
                label="Professional",
                status=NodeStatus.none,
                children=[
                    OntologyNode(id="doctor", label="Doctor", code="doctor.n.01", status=NodeStatus.approved),
                    OntologyNode(id="teacher", label="Teacher", code="teacher.n.01", status=NodeStatus.suggestion),
                ],
            ),
        ],
    ),
    OntologyNode(
        id="physical",
        label="Physical",
        status=NodeStatus.none,
        children=[
            OntologyNode(
                id="building",
                label="Building",
                status=NodeStatus.none,
                children=[
                    OntologyNode(id="school-building", label="School", code="school.n.02", status=NodeStatus.inheritance),
                    OntologyNode(id="library", label="Library", code="library.n.01", status=NodeStatus.approved),
                ],
            ),
            OntologyNode(
                id="artifact",
                label="Artifact",
                status=NodeStatus.none,
                children=[OntologyNode(id="tool", label="Tool", code="tool.n.01", status=NodeStatus.approved)],
            ),
        ],
    ),
    OntologyNode(
        id="information",
        label="Information",
        status=NodeStatus.none,
        children=[
            OntologyNode(id="record", label="Record", code="record.n.01", status=NodeStatus.approved),
            OntologyNode(id="document", label="Document", code="document.n.01", status=NodeStatus.conflict),
        ],
    ),
    OntologyNode(
        id="activities",
        label="Activities",
        status=NodeStatus.none,
        children=[
            OntologyNode(id="education", label="Education", code="education.n.01", status=NodeStatus.approved),
            OntologyNode(id="research", label="Research", code="research.n.01", status=NodeStatus.suggestion),
        ],
    ),
]

SEMANTIC_REVIEWS: Dict[str, SemanticReview] = {
    "school": SemanticReview(
        node_id="school",
        label="School",
        code="school.n.01",
        semantic_tension_detected=True,
        tension_explanation="This concept exhibits properties of both physical structures and institutional actors.",
        wordnet_definition='An educational institution where instruction is given: "he studied music at a school"',
        current_parents=["Actor → Institution → School"],
        perspective_confidence=[
            PerspectiveScore(perspective="Physical Structure", confidence=0.71),
            PerspectiveScore(perspective="Institution", confidence=0.68),
            PerspectiveScore(perspective="Social Actor", confidence=0.44),
            PerspectiveScore(perspective="Information Artifact", confidence=0.11),
        ],
        onet_task_examples=[
            "Teach courses in subject matter specialization at a school",
            "Visit the school building to inspect facilities",
            "The school provides education to 500 students",
        ],
        similar_reviewed_cases=[
            ReviewedCase(
                label="Hospital",
                status="Approved",
                resolution="Resolved as dual inheritance: Physical/Building + Actor/Institution",
            ),
            ReviewedCase(
                label="Library",
                status="Approved",
                resolution="Resolved as Physical/Building (primary) + Information/Repository",
            ),
        ],
        ai_explanation=(
            'The term "school" exhibits polysemy across physical and institutional dimensions. '
            "Usage analysis from O*NET suggests dual inheritance may be appropriate."
        ),
        recommendation=(
            "Add multiple inheritance path to Physical/Building while maintaining current "
            "Actor/Institution classification."
        ),
    )
}

CASE_METADATA: Dict[str, CaseMetadata] = {
    "school": CaseMetadata(
        review_id="ONT-2847",
        submitted="2026-05-15",
        ai_confidence="Medium",
        complexity="High",
        reviewer="Unassigned",
    )
}

ACTION_LOG = []


def get_tree() -> List[OntologyNode]:
    return deepcopy(ONTOLOGY_TREE)


def find_node(node_id: str, nodes: List[OntologyNode] | None = None) -> OntologyNode | None:
    if nodes is None:
        nodes = ONTOLOGY_TREE
    for node in nodes:
        if node.id == node_id:
            return node
        found = find_node(node_id, node.children)
        if found:
            return found
    return None


def update_node_status(node_id: str, status: NodeStatus) -> None:
    node = find_node(node_id)
    if node:
        node.status = status


def get_semantic_review(node_id: str) -> SemanticReview:
    if node_id in SEMANTIC_REVIEWS:
        return SEMANTIC_REVIEWS[node_id]

    node = find_node(node_id)
    label = node.label if node else node_id
    code = node.code if node else None

    return SemanticReview(
        node_id=node_id,
        label=label,
        code=code,
        semantic_tension_detected=False,
        tension_explanation="No semantic tension has been detected for this node.",
        wordnet_definition="Definition unavailable in prototype data.",
        current_parents=[],
        perspective_confidence=[],
        onet_task_examples=[],
        similar_reviewed_cases=[],
        ai_explanation="No AI explanation available yet.",
        recommendation="No recommendation available yet.",
    )


def get_case_metadata(node_id: str) -> CaseMetadata:
    if node_id not in CASE_METADATA:
        CASE_METADATA[node_id] = CaseMetadata(
            review_id=f"ONT-{abs(hash(node_id)) % 10000}",
            submitted="2026-05-15",
            ai_confidence="Unknown",
            complexity="Unknown",
            reviewer="Unassigned",
        )
    return CASE_METADATA[node_id]
