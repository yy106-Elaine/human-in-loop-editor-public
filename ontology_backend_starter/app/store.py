import json
import re
from copy import deepcopy
from pathlib import Path
from typing import Dict, List
from app.schemas import (
    OntologyNode,
    NodeStatus,
    SemanticReview,
    PerspectiveScore,
    ReviewedCase,
    CaseMetadata,
)

DATA_DIR = Path(__file__).parent / "data"

# (frontend tab id, tab display label, filename) — filenames match those in data/
SUBONTOLOGY_FILES = [
    ("actor", "Actor", "actor-ontology-edited-042126.json"),
    ("physical", "Physical", "physical-ontology-edited-042726.json"),
    ("information", "Information", "info-ontology-edited-042726.json"),
    ("activities", "Activities", "activity-ontology-edited-042126.json"),
]

# Extract the first synset code from "research (research.n.01) - Research (...)"
_SYNSET_RE = re.compile(r"\(([a-z_]+\.[nvasr]\.\d+)\)")


def _parse_raw_name(raw: str) -> tuple[str, str | None]:
    """raw looks like 'research (research.n.01) - Research (Research.v.01)'.
    Returns (label, code): label = name before the first '(', code = first synset."""
    m = _SYNSET_RE.search(raw)
    code = m.group(1) if m else None
    label = raw.split("(")[0].strip() if "(" in raw else raw.strip()
    label = label.rstrip(" -").strip()
    return (label or raw.strip(), code)


def _make_id(raw: str, used: set) -> str:
    """Generate a unique id: prefer the synset code, otherwise slugify the name."""
    _, code = _parse_raw_name(raw)
    base = code if code else re.sub(r"[^a-z0-9]+", "-", raw.lower()).strip("-")
    base = base or "node"
    candidate = base
    i = 2
    while candidate in used:
        candidate = f"{base}-{i}"
        i += 1
    used.add(candidate)
    return candidate


def _build_nodes(raw_dict: dict, used: set) -> List[OntologyNode]:
    """Recursively convert {name_string: {children}} into OntologyNode list. Empty {} = leaf."""
    nodes: List[OntologyNode] = []
    for raw_name, children_dict in raw_dict.items():
        label, code = _parse_raw_name(raw_name)
        node_id = _make_id(raw_name, used)
        children = (
            _build_nodes(children_dict, used)
            if isinstance(children_dict, dict) and children_dict
            else []
        )
        nodes.append(
            OntologyNode(
                id=node_id,
                label=label,
                code=code,
                status=NodeStatus.none,  # default everything to none; reviewers change it later
                children=children,
            )
        )
    return nodes


def _load_subontology(filename: str) -> dict:
    """Read one JSON file, stripping the outer wrapper key (e.g. 'process') if present."""
    path = DATA_DIR / filename
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, dict) and len(data) == 1:
        inner = next(iter(data.values()))
        if isinstance(inner, dict):
            return inner
    return data


def _build_full_tree() -> List[OntologyNode]:
    """Assemble the four files into 4 top-level subontology nodes."""
    roots: List[OntologyNode] = []
    used: set = set()
    for sub_id, sub_label, filename in SUBONTOLOGY_FILES:
        try:
            raw = _load_subontology(filename)
        except FileNotFoundError:
            continue  # skip missing files instead of crashing
        roots.append(
            OntologyNode(
                id=sub_id,
                label=sub_label,
                code=None,
                status=NodeStatus.none,
                children=_build_nodes(raw, used),
            )
        )
    return roots


ONTOLOGY_TREE: List[OntologyNode] = _build_full_tree()

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
