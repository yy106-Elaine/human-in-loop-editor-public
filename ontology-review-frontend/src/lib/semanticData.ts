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
  if (!m) return "";
  const value = m[1].trim();
  // guard against empty fields whose regex accidentally captured the next
  // field's label (e.g. an empty "- Path:" line followed by "- Example:")
  if (value.startsWith("- ") || /^[A-Za-z]+:$/.test(value)) return "";
  return value;
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
let _labelIndex: Map<string, SemanticInfo> | null = null;

function buildIndex(): Map<string, SemanticInfo> {
  const index = new Map<string, SemanticInfo>();
  const labelIndex = new Map<string, SemanticInfo>();

  function walk(node: RawNode) {
    const desc = node.description ?? "";
    const { definition, path, example } = parseDescription(desc);

    // strip prefixes like "[virtual] ", "[added] ", "[edited] " from the title
    const label = (node.title ?? "").replace(/^\[[^\]]+\]\s*/, "").trim();

    // Primary key: synset id from the Path field (e.g. "... > table.n.01").
    // Fallback for virtual/added nodes (which have an empty Path): use the
    // first Synonym word as a synthetic label key.
    let synsetId = synsetIdFromPath(path);
    const synonyms = grabField(desc, "Synonyms");
    const firstSynonym = synonyms.split(",")[0]?.trim() ?? "";

    if (!synsetId && firstSynonym) {
      // virtual nodes: no real synset id, key the entry by its label instead
      synsetId = firstSynonym;
    }

    const info: SemanticInfo = {
      label: label || firstSynonym,
      synsetId,
      definition,
      pathParents: path,
      taskExample: example,
    };

    if (synsetId) {
      index.set(synsetId, info);
    }

    // also index by lowercase label so virtual nodes can be found by name
    const labelKey = (label || firstSynonym).toLowerCase();
    if (labelKey && !labelIndex.has(labelKey)) {
      labelIndex.set(labelKey, info);
    }

    const specs = node.specializations ?? {};
    for (const child of Object.values(specs)) walk(child);
  }

  // top level is { Entity: {...} }
  for (const root of Object.values(nodesData as Record<string, RawNode>)) {
    walk(root);
  }

  _labelIndex = labelIndex;
  return index;
}

function getLabelIndex(): Map<string, SemanticInfo> {
  if (!_labelIndex) buildIndex();
  return _labelIndex!;
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
  const id = synsetId.trim();

  // 1) direct synset-id match (e.g. "table.n.01")
  const direct = getIndex().get(id);
  if (direct) return direct;

  // 2) fallback: derive a label from the synset id ("layer.n.01" -> "layer")
  //    and look it up in the label index. This recovers virtual/added nodes
  //    whose entries are keyed by label because they have no real synset id.
  const labelFromSynset = id.replace(/\.[nvar]\.[0-9]+$/, "").toLowerCase();
  const byLabel = getLabelIndex().get(labelFromSynset);
  if (byLabel) return byLabel;

  return null;
}

/**
 * Fallback: search by word label when you don't have the synset id yet.
 */
export function findSemanticByLabel(label: string): SemanticInfo | null {
  if (!label) return null;
  const clean = label.replace(/^\[[^\]]+\]\s*/, "").trim().toLowerCase();

  // 1) exact label match (covers virtual nodes keyed by label)
  const exact = getLabelIndex().get(clean);
  if (exact) return exact;

  // 2) prefix match on synset id ("hardware" -> "hardware.n.03")
  for (const info of getIndex().values()) {
    if (info.synsetId.toLowerCase().startsWith(clean + ".")) return info;
  }
  return null;
}