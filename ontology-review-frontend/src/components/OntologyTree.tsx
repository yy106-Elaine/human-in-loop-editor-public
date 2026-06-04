import { useState, useMemo } from "react";
import {
  ChevronRight,
  ChevronDown,
  Search,
} from "lucide-react";
import {
  ONTOLOGY,
  SUBONTOLOGIES,
  type OntologyNode,
  type NodeStatus,
} from "./ontologyData";

interface TreeNodeProps {
  node: OntologyNode;
  level: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  expandedOverride: Set<string> | null; // when searching, force-expand these
}

const statusColors: Record<NodeStatus, string> = {
  conflict: "bg-red-500",
  ambiguous: "bg-yellow-500",
  inheritance: "bg-purple-500",
  suggestion: "bg-blue-500",
  approved: "bg-green-500",
  none: "bg-gray-300",
};

function TreeNode({
  node,
  level,
  selectedId,
  onSelect,
  expandedOverride,
}: TreeNodeProps) {
  const [isExpandedLocal, setIsExpandedLocal] = useState(
    level === 0,
  );
  const hasChildren =
    !!node.children && node.children.length > 0;

  // While searching, expansion is controlled by the override set.
  const isExpanded = expandedOverride
    ? expandedOverride.has(node.id)
    : isExpandedLocal;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-gray-50 rounded ${
          selectedId === node.id ? "bg-blue-50" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(node.id)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!expandedOverride)
              setIsExpandedLocal((v) => !v);
          }}
          className="w-4 h-4 flex items-center justify-center text-gray-500"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )
          ) : (
            <span className="w-4" />
          )}
        </button>
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${statusColors[node.status]}`}
        />
        <span className="text-sm text-gray-900">
          {node.label}
        </span>
        {node.synset && (
          <span className="text-xs text-gray-500">
            ({node.synset})
          </span>
        )}
        {node.virtual && (
          <span className="text-[10px] px-1 rounded bg-purple-100 text-purple-700">
            v
          </span>
        )}
        {node.verb && (
          <span className="text-[10px] text-gray-400 truncate">
            → {node.verb}
          </span>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedOverride={expandedOverride}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Return a filtered copy of the tree containing only nodes that match `q`
 *  (or have a matching descendant), plus the set of ids to keep expanded. */
function filterTree(
  root: OntologyNode,
  q: string,
): { tree: OntologyNode | null; expand: Set<string> } {
  const expand = new Set<string>();
  const needle = q.trim().toLowerCase();
  if (!needle) return { tree: root, expand };

  function walk(node: OntologyNode): OntologyNode | null {
    const selfMatch =
      node.label.toLowerCase().includes(needle) ||
      (node.synset ?? "").toLowerCase().includes(needle);
    const kids = (node.children ?? [])
      .map(walk)
      .filter(Boolean) as OntologyNode[];
    if (selfMatch || kids.length) {
      if (kids.length) expand.add(node.id);
      return {
        ...node,
        children: kids.length
          ? kids
          : node.children && selfMatch
            ? node.children
            : undefined,
      };
    }
    return null;
  }
  return { tree: walk(root), expand };
}

export function OntologyTree({
  onNodeSelect,
}: {
  onNodeSelect: (id: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(
    null,
  );
  const [active, setActive] = useState<string>("physical"); // active subontology tab
  const [query, setQuery] = useState("");

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onNodeSelect(id);
  };

  const root = ONTOLOGY[active];
  const { tree, expand } = useMemo(
    () => filterTree(root, query),
    [root, query],
  );
  const searching = query.trim().length > 0;

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      {/* Header + filter tabs (top of the LEFT panel) */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Ontology Structure
        </h2>
        <div className="flex gap-1 mb-3">
          {SUBONTOLOGIES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setActive(s.id);
                setQuery("");
              }}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                active === s.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this subontology…"
            className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Tree */}
      <div className="p-2 flex-1">
        {tree && tree.children ? (
          tree.children.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              selectedId={selectedId}
              onSelect={handleSelect}
              expandedOverride={searching ? expand : null}
            />
          ))
        ) : (
          <div className="text-xs text-gray-400 p-4">
            No matches.
          </div>
        )}
      </div>

      {/* Legend (kept from original) */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-600 space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Structural Conflict</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Semantic Ambiguity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Multiple Inheritance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span>AI Suggestion</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Human Approved</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-1 rounded bg-purple-100 text-purple-700">
              v
            </span>
            <span>Virtual node</span>
          </div>
        </div>
      </div>
    </div>
  );
}