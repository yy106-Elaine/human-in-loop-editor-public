from app.schemas import DiffSimulation, DiffTreeLine, ImpactMetric


def simulate_diff(node_id: str) -> DiffSimulation:
    """
    Prototype diff simulator.

    In production, this should:
    1. Copy the current ontology graph.
    2. Apply the proposed edit to the copy.
    3. Compare parent paths, descendants, inherited properties, and rule violations.
    4. Return a structured before/after diff for the frontend.
    """

    if node_id != "school":
        return DiffSimulation(
            node_id=node_id,
            before_tree=[DiffTreeLine(text="No diff available for this prototype node.")],
            after_tree=[DiffTreeLine(text="No proposed change available.")],
            inheritance_changes=[],
            affected_descendants=[],
            semantic_conflicts=[],
            broken_rules=[],
            ai_applicability_impact=[],
        )

    return DiffSimulation(
        node_id="school",
        before_tree=[
            DiffTreeLine(text="Actor", depth=0),
            DiffTreeLine(text="Institution", depth=1),
            DiffTreeLine(text="School (school.n.01)", depth=2, highlight=True),
            DiffTreeLine(text="Elementary School", depth=3),
            DiffTreeLine(text="High School", depth=3),
            DiffTreeLine(text="University", depth=3),
        ],
        after_tree=[
            DiffTreeLine(text="Actor", depth=0),
            DiffTreeLine(text="Institution", depth=1),
            DiffTreeLine(text="School (school.n.01)", depth=2, highlight=True),
            DiffTreeLine(text="Elementary School", depth=3),
            DiffTreeLine(text="High School", depth=3),
            DiffTreeLine(text="University", depth=3),
            DiffTreeLine(text="Physical", depth=0),
            DiffTreeLine(text="Building", depth=1),
            DiffTreeLine(text="School (school.n.01) [NEW]", depth=2, highlight=True),
            DiffTreeLine(text="Elementary School", depth=3),
            DiffTreeLine(text="High School", depth=3),
            DiffTreeLine(text="University", depth=3),
        ],
        inheritance_changes=[
            ImpactMetric(label="Parent paths added", value="+1", detail="Physical → Building"),
            ImpactMetric(label="Parent paths removed", value="0"),
        ],
        affected_descendants=["Elementary School", "High School", "University"],
        semantic_conflicts=[
            ImpactMetric(label="Semantic tensions resolved", value="1", trend="down"),
            ImpactMetric(label="New conflicts introduced", value="0", trend="flat"),
        ],
        broken_rules=[],
        ai_applicability_impact=[
            ImpactMetric(label="Physical context detection", value="+12%"),
            ImpactMetric(label="Task disambiguation", value="+8%"),
        ],
    )
