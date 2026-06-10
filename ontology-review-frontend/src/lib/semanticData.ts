// src/lib/semanticData.ts
import nodesData from "../data/nodes-data.json";

export interface SemanticInfo {
  label: string;        // e.g. "hardware"
  synsetId: string;     // e.g. "hardware.n.03"
  definition: string;   // WordNet Definition
  pathParents: string;  // Current Parent(s), e.g. "entity.n.01 > ... > component.n.03"
  taskExample: string;  // O*NET Task Example
}

// --- line-based field extractor ---
function grabField(description: string, label: string): string {
  // matches lines like "- Definition: ....", "- Path: ....", "- Example: ...."
  const re = new RegExp(`-\\s*${label}:\\s*(.*)`);
  const m = description.match(re);
  return m ? m[1].trim() : "";
}

function parseDescription(description: string) {
  return {
    definition: grabField(description, "Definition"),
    path: grabField(description, "Path"),
    example: grabField(description, "Example"),
  };
}

// last token of the path is the synset id, e.g. "... > hardware.n.03" -> "hardware.n.03"
function synsetIdFromPath(path: string): string {
  if (!path) return "";
  const parts = path.split(">").map((s) => s.trim());
  return parts[parts.length - 1] || "";
}

// --- walk the nested tree and build an index keyed by synset id ---
type RawNode = {
  title?: string;
  description?: string;
  specializations?: Record<string, RawNode>;
};

let _index: Map<string, SemanticInfo> | null = null;

function buildIndex(): Map<string, SemanticInfo> {
  const index = new Map<string, SemanticInfo>();

  function walk(node: RawNode) {
    const desc = node.description ?? "";
    const { definition, path, example } = parseDescription(desc);
    const synsetId = synsetIdFromPath(path);
    if (synsetId) {
      // strip prefixes like "[virtual] ", "[added] ", "[edited] " from the label
      const label = (node.title ?? "").replace(/^\[[^\]]+\]\s*/, "").trim();
      index.set(synsetId, {
        label,
        synsetId,
        definition,
        pathParents: path,
        taskExample: example,
      });
    }
    const specs = node.specializations ?? {};
    for (const child of Object.values(specs)) walk(child);
  }

  // top level is { Entity: {...} }
  for (const root of Object.values(nodesData as Record<string, RawNode>)) {
    walk(root);
  }
  return index;
}

function getIndex(): Map<string, SemanticInfo> {
  if (!_index) _index = buildIndex();
  return _index;
}

/**
 * Look up semantic info for a node.
 * Pass the synset id directly (preferred), e.g. "hardware.n.03".
 */
export function getSemanticInfo(synsetId: string): SemanticInfo | null {
  if (!synsetId) return null;
  return getIndex().get(synsetId.trim()) ?? null;
}

/**
 * Fallback: search by word label when you don't have the synset id yet.
 * Returns the first synset whose id starts with "<label>.".
 */
export function findSemanticByLabel(label: string): SemanticInfo | null {
  if (!label) return null;
  const clean = label.replace(/^\[[^\]]+\]\s*/, "").trim().toLowerCase();
  for (const info of getIndex().values()) {
    if (info.synsetId.toLowerCase().startsWith(clean + ".")) return info;
  }
  return null;
}