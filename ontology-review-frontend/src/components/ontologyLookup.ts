// Lookup helpers over the ONTOLOGY data. Builds an index once (module load),
// then answers node / path / parent / siblings queries in O(1)-ish time.
import { ONTOLOGY, type OntologyNode } from './ontologyData';

interface IndexEntry {
  node: OntologyNode;
  parent: OntologyNode | null;
  ancestors: OntologyNode[]; // root-first, excluding the node itself
  subontologyId: string;
}

const INDEX = new Map<string, IndexEntry>();

function build(node: OntologyNode, parent: OntologyNode | null, ancestors: OntologyNode[], subId: string) {
  INDEX.set(node.id, { node, parent, ancestors, subontologyId: subId });
  const nextAncestors = [...ancestors, node];
  for (const child of node.children ?? []) {
    build(child, node, nextAncestors, subId);
  }
}

// Build index for each subontology root. The root node itself is indexed too.
for (const [subId, root] of Object.entries(ONTOLOGY)) {
  build(root, null, [], subId);
}

export interface NodeContext {
  node: OntologyNode;
  /** Human-readable path like "Communication → coding system → software" (excludes the synthetic root). */
  path: string[];
  parent: OntologyNode | null;
  siblings: OntologyNode[];
  children: OntologyNode[];
  subontologyId: string;
}

export function getNodeContext(id: string | null): NodeContext | null {
  if (!id) return null;
  const entry = INDEX.get(id);
  if (!entry) return null;

  // path = ancestors (minus the synthetic subontology root) + this node's label
  const pathNodes = [...entry.ancestors.slice(1), entry.node];
  const path = pathNodes.map((n) => n.label);

  const siblings = entry.parent
    ? (entry.parent.children ?? []).filter((c) => c.id !== entry.node.id)
    : [];

  return {
    node: entry.node,
    path,
    parent: entry.parent,
    siblings,
    children: entry.node.children ?? [],
    subontologyId: entry.subontologyId,
  };
}
