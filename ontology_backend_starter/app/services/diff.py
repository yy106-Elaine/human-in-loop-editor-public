from app.schemas import DiffSimulation, DiffTreeLine, ImpactMetric
from app.store import find_node, ONTOLOGY_TREE


def _node_path(node_id: str) -> list:
    """Return the list of ancestor labels from root down to (and including) the node.
    e.g. ['Physical', 'artifact', 'part', 'component']."""
    path: list = []

    def walk(nodes, trail):
        for n in nodes:
            if n.id == node_id:
                path.extend(trail + [n.label])
                return True
            if walk(n.children, trail + [n.label]):
                return True
        return False

    walk(ONTOLOGY_TREE, [])
    return path


def _label_with_code(node) -> str:
    return f"{node.label} ({node.code})" if node.code else node.label


def _build_before_tree(node) -> tuple[list[DiffTreeLine], list[str]]:
    """Build the 'before' tree: the node's ancestor path, the node (highlighted),
    then its direct children. Returns (lines, child_labels)."""
    path = _node_path(node.id)
    lines: list[DiffTreeLine] = []
    # ancestors (everything except the node itself)
    for depth, label in enumerate(path[:-1]):
        lines.append(DiffTreeLine(text=label, depth=depth))
    # the node itself, highlighted
    node_depth = max(len(path) - 1, 0)
    lines.append(DiffTreeLine(text=_label_with_code(node), depth=node_depth, highlight=True))
    # direct children
    child_labels = [c.label for c in (node.children or [])]
    for child in (node.children or [])[:6]:
        lines.append(DiffTreeLine(text=child.label, depth=node_depth + 1))
    return lines, child_labels


def _empty_diff(node_id: str, before_lines, after_text: str) -> DiffSimulation:
    return DiffSimulation(
        node_id=node_id,
        before_tree=before_lines,
        after_tree=[DiffTreeLine(text=after_text)],
        inheritance_changes=[],
        affected_descendants=[],
        semantic_conflicts=[],
        broken_rules=[],
        ai_applicability_impact=[],
    )


def simulate_diff(node_id: str, action_type: str = "", payload: dict | None = None) -> DiffSimulation:
    """Simulate a before/after ontology diff for a proposed reviewer action.
    Supports rename, place_elsewhere, add_parent. Other actions show 'no structural change'."""
    payload = payload or {}
    node = find_node(node_id)

    if node is None:
        return _empty_diff(node_id, [DiffTreeLine(text="Node not found.")], "Node not found.")

    before_lines, child_labels = _build_before_tree(node)
    path = _node_path(node.id)
    node_depth = max(len(path) - 1, 0)

    # No action selected yet → after mirrors before, no change.
    if not action_type:
        return DiffSimulation(
            node_id=node_id,
            before_tree=before_lines,
            after_tree=[DiffTreeLine(text="Select an action on the right to preview its effect.")],
            inheritance_changes=[],
            affected_descendants=[],
            semantic_conflicts=[],
            broken_rules=[],
            ai_applicability_impact=[],
        )

    # ---- RENAME ----
    if action_type == "rename":
        new_label = payload.get("new_label", "").strip()
        if not new_label:
            return _empty_diff(node_id, before_lines, "Enter a new label to preview the rename.")
        after_lines: list[DiffTreeLine] = []
        for depth, label in enumerate(path[:-1]):
            after_lines.append(DiffTreeLine(text=label, depth=depth))
        code_suffix = f" ({node.code})" if node.code else ""
        after_lines.append(
            DiffTreeLine(text=f"{new_label}{code_suffix} [RENAMED]", depth=node_depth, highlight=True)
        )
        for child in (node.children or [])[:6]:
            after_lines.append(DiffTreeLine(text=child.label, depth=node_depth + 1))
        return DiffSimulation(
            node_id=node_id,
            before_tree=before_lines,
            after_tree=after_lines,
            inheritance_changes=[
                ImpactMetric(label="Label changed", value="1", detail=f'"{node.label}" → "{new_label}"'),
            ],
            affected_descendants=child_labels,
            semantic_conflicts=[
                ImpactMetric(label="Naming ambiguity resolved", value="1", trend="down"),
            ],
            broken_rules=[],
            ai_applicability_impact=[
                ImpactMetric(label="Label disambiguation", value="+improved"),
            ],
        )

    # ---- PLACE ELSEWHERE (move to a new parent) ----
    if action_type == "place_elsewhere":
        target_id = payload.get("target_parent_id", "").strip()
        if not target_id:
            return _empty_diff(node_id, before_lines, "Enter a new parent ID to preview the move.")
        target = find_node(target_id)
        target_label = target.label if target else f"{target_id} (not found)"
        target_path = _node_path(target_id) if target else [target_label]
        after_lines = []
        for depth, label in enumerate(target_path):
            after_lines.append(DiffTreeLine(text=label, depth=depth))
        moved_depth = len(target_path)
        after_lines.append(
            DiffTreeLine(text=f"{_label_with_code(node)} [MOVED HERE]", depth=moved_depth, highlight=True)
        )
        for child in (node.children or [])[:6]:
            after_lines.append(DiffTreeLine(text=child.label, depth=moved_depth + 1))
        old_parent = path[-2] if len(path) >= 2 else "(root)"
        return DiffSimulation(
            node_id=node_id,
            before_tree=before_lines,
            after_tree=after_lines,
            inheritance_changes=[
                ImpactMetric(label="Parent path removed", value="-1", detail=old_parent),
                ImpactMetric(label="Parent path added", value="+1", detail=target_label),
            ],
            affected_descendants=child_labels,
            semantic_conflicts=[
                ImpactMetric(label="Misplacement resolved", value="1", trend="down"),
            ],
            broken_rules=[],
            ai_applicability_impact=[
                ImpactMetric(label="Context detection", value="+improved"),
            ],
        )

    # ---- ADD PARENT (multiple inheritance) ----
    if action_type == "add_parent":
        parent_id = (payload.get("parent_node_id") or payload.get("target_parent_id") or "").strip()
        if not parent_id:
            return _empty_diff(node_id, before_lines, "Enter a parent ID to preview the added inheritance path.")
        parent = find_node(parent_id)
        parent_label = parent.label if parent else f"{parent_id} (not found)"
        parent_path = _node_path(parent_id) if parent else [parent_label]
        # after = original placement (unchanged) + a second path under the new parent
        after_lines = list(before_lines)
        for depth, label in enumerate(parent_path):
            after_lines.append(DiffTreeLine(text=label, depth=depth))
        new_depth = len(parent_path)
        after_lines.append(
            DiffTreeLine(text=f"{_label_with_code(node)} [NEW PATH]", depth=new_depth, highlight=True)
        )
        for child in (node.children or [])[:6]:
            after_lines.append(DiffTreeLine(text=child.label, depth=new_depth + 1))
        return DiffSimulation(
            node_id=node_id,
            before_tree=before_lines,
            after_tree=after_lines,
            inheritance_changes=[
                ImpactMetric(label="Parent paths added", value="+1", detail=parent_label),
                ImpactMetric(label="Parent paths removed", value="0"),
            ],
            affected_descendants=child_labels,
            semantic_conflicts=[
                ImpactMetric(label="Semantic tensions resolved", value="1", trend="down"),
                ImpactMetric(label="New conflicts introduced", value="0", trend="flat"),
            ],
            broken_rules=[],
            ai_applicability_impact=[
                ImpactMetric(label="Cross-domain detection", value="+improved"),
            ],
        )

    # ---- Other actions (accept/merge/delete/split/escalate): no structural preview yet ----
    return DiffSimulation(
        node_id=node_id,
        before_tree=before_lines,
        after_tree=[DiffTreeLine(text=f"No structural preview for '{action_type}' yet.")],
        inheritance_changes=[],
        affected_descendants=child_labels,
        semantic_conflicts=[],
        broken_rules=[],
        ai_applicability_impact=[],
    )