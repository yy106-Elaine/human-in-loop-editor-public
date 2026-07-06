import { useState, useMemo, useEffect } from "react";
import { SemanticReviewPopup } from "./SemanticReviewPopup";
import { ChevronRight, ChevronDown, Search } from "lucide-react";
import { type OntologyNode, type NodeStatus } from "./ontologyData";
import { getNodeStatuses } from "../api/ontologyApi";
import { type PatternType } from "../api/editPatternsApi";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

interface BackendNode {
  id: string;
  label: string;
  code: string | null;
  status: NodeStatus;
  children: BackendNode[];
}

function toOntologyNode(n: BackendNode): OntologyNode {
  return {
    id: n.id,
    label: n.label,
    status: n.status,
    synset: n.code ?? undefined,
    children: n.children && n.children.length ? n.children.map(toOntologyNode) : undefined,
  };
}

function applyStatuses(
  nodes: Record<string, OntologyNode>,
  statuses: Record<string, string>
): Record<string, OntologyNode> {
  function patchNode(node: OntologyNode): OntologyNode {
    const newStatus = statuses[node.id];
    return {
      ...node,
      status: (newStatus as NodeStatus) ?? node.status,
      children: node.children?.map(patchNode),
    };
  }
  const patched: Record<string, OntologyNode> = {};
  for (const [key, root] of Object.entries(nodes)) {
    patched[key] = patchNode(root);
  }
  return patched;
}

const ERROR_META: Record<PatternType, { label: string; dot: string; row: string }> = {
  duplicate: { label: "Duplicate", dot: "bg-blue-500", row: "bg-blue-50 border-blue-200" },
  virtual: { label: "Virtual", dot: "bg-purple-500", row: "bg-purple-50 border-purple-200" },
  misplaced: { label: "Misplaced", dot: "bg-amber-500", row: "bg-amber-50 border-amber-200" },
  inheritance: { label: "Multiple Inheritance", dot: "bg-emerald-500", row: "bg-emerald-50 border-emerald-200" },
  naming: { label: "Naming", dot: "bg-pink-500", row: "bg-pink-50 border-pink-200" },
};

const statusColors: Record<NodeStatus, string> = {
  conflict: "bg-red-500",
  ambiguous: "bg-yellow-500",
  inheritance: "bg-emerald-500",
  suggestion: "bg-blue-500",
  approved: "bg-green-500",
  none: "bg-gray-300",
};

interface TreeNodeProps {
  node: OntologyNode;
  level: number;
  selectedId: string | null;
  onSelect: (node: OntologyNode, e: React.MouseEvent) => void;
  expandedOverride: Set<string> | null;
  errorHighlights: Record<string, PatternType>;
}

function TreeNode({
  node,
  level,
  selectedId,
  onSelect,
  expandedOverride,
  errorHighlights,
}: TreeNodeProps) {
  const [isExpandedLocal, setIsExpandedLocal] = useState(level === 0);
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expandedOverride ? expandedOverride.has(node.id) : isExpandedLocal;
  const errorType = errorHighlights[node.id];
  const errorMeta = errorType ? ERROR_META[errorType] : null;

  return (
    <div>
      <div
        className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer hover:bg-gray-50 rounded border ${
          selectedId === node.id
            ? "bg-gray-900 text-white border-gray-900"
            : errorMeta
              ? errorMeta.row
              : "border-transparent"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={(e) => onSelect(node, e)}
        title={errorType ? `${ERROR_META[errorType].label} issue` : undefined}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!expandedOverride) setIsExpandedLocal((v) => !v);
          }}
          className={`w-4 h-4 flex items-center justify-center ${
            selectedId === node.id ? "text-white" : "text-gray-500"
          }`}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />
          ) : (
            <span className="w-4" />
          )}
        </button>

        <div
          className={`w-2 h-2 rounded-full shrink-0 ${
            errorMeta ? errorMeta.dot : statusColors[node.status]
          }`}
        />
        <span className={`text-sm truncate ${selectedId === node.id ? "text-white" : "text-gray-900"}`}>
          {node.label}
        </span>
        {node.synset && (
          <span className={`text-xs shrink-0 ${selectedId === node.id ? "text-gray-200" : "text-gray-500"}`}>
            ({node.synset})
          </span>
        )}
        {errorType && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
              selectedId === node.id ? "bg-white/20 text-white" : "bg-white/70 text-gray-700"
            }`}
          >
            {ERROR_META[errorType].label}
          </span>
        )}
        {node.virtual && (
          <span className="text-[10px] px-1 rounded bg-purple-100 text-purple-700">v</span>
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
              errorHighlights={errorHighlights}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function filterTree(
  root: OntologyNode,
  q: string,
  errorHighlights: Record<string, PatternType>,
  activeErrorFilter: PatternType | "all" | null
): { tree: OntologyNode | null; expand: Set<string> } {
  const expand = new Set<string>();
  const needle = q.trim().toLowerCase();

  function walk(node: OntologyNode): OntologyNode | null {
    const textMatch =
      !needle ||
      node.label.toLowerCase().includes(needle) ||
      (node.synset ?? "").toLowerCase().includes(needle);

    const errorType = errorHighlights[node.id];
    const errorMatch =
      !activeErrorFilter ||
      activeErrorFilter === "all" ||
      errorType === activeErrorFilter;

    const kids = (node.children ?? [])
      .map(walk)
      .filter(Boolean) as OntologyNode[];

    if ((textMatch && errorMatch) || kids.length) {
      if (kids.length) expand.add(node.id);
      return {
        ...node,
        children: kids.length ? kids : node.children && textMatch ? node.children : undefined,
      };
    }

    return null;
  }

  return { tree: walk(root), expand };
}

export function OntologyTree({
  onNodeSelect,
  errorHighlights = {},
  activeErrorFilter,
  onErrorFilterChange,
}: {
  onNodeSelect: (id: string) => void;
  errorHighlights?: Record<string, PatternType>;
  activeErrorFilter?: PatternType | "all" | null;
  onErrorFilterChange?: (filter: PatternType | "all" | null) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [popup, setPopup] = useState<{ synset?: string | null; label: string; x: number; y: number } | null>(null);
  const [active, setActive] = useState<string>("physical");
  const [query, setQuery] = useState("");
  const [ontology, setOntology] = useState<Record<string, OntologyNode>>({});
  const [subontologies, setSubontologies] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(() => {
    const base: Record<PatternType, number> = {
      duplicate: 0,
      virtual: 0,
      misplaced: 0,
      inheritance: 0,
      naming: 0,
    };
    for (const type of Object.values(errorHighlights)) base[type] += 1;
    return base;
  }, [errorHighlights]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_BASE}/ontology/tree`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: BackendNode[]) => {
        if (cancelled) return;
        const map: Record<string, OntologyNode> = {};
        const tabs: { id: string; label: string }[] = [];
        for (const sub of data) {
          map[sub.id] = toOntologyNode(sub);
          tabs.push({ id: sub.id, label: sub.label });
        }
        setOntology(map);
        setSubontologies(tabs);
        setActive((prev) => (map[prev] ? prev : tabs[0]?.id ?? ""));
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(String(err));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Poll for status updates from other reviewers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getNodeStatuses()
        .then((statuses) => {
          if (Object.keys(statuses).length > 0) {
            setOntology((prev) => applyStatuses(prev, statuses));
          }
        })
        .catch(() => {}); // fail silently — best-effort
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (node: OntologyNode, e: React.MouseEvent) => {
    setSelectedId(node.id);
    onNodeSelect(node.id);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopup({
      synset: node.synset,
      label: node.label,
      x: rect.right + 12,
      y: rect.top + rect.height / 2,
    });
  };

  const root = ontology[active];
  const { tree, expand } = useMemo(
    () => root
      ? filterTree(root, query, errorHighlights, activeErrorFilter ?? null)
      : { tree: null, expand: new Set<string>() },
    [root, query, errorHighlights, activeErrorFilter]
  );
  const filtering = query.trim().length > 0 || !!activeErrorFilter;

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Ontology Structure</h2>
        <div className="flex gap-1 mb-3 overflow-x-auto">
          {subontologies.map((s) => (
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
          <Search size={14} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this subontology…"
            className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="p-2 flex-1">
        {loading ? (
          <div className="text-xs text-gray-400 p-4">Loading…</div>
        ) : error ? (
          <div className="text-xs text-red-500 p-4">Failed to load: {error}</div>
        ) : tree && tree.children ? (
          tree.children.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              selectedId={selectedId}
              onSelect={handleSelect}
              expandedOverride={filtering ? expand : null}
              errorHighlights={errorHighlights}
            />
          ))
        ) : (
          <div className="text-xs text-gray-400 p-4">No matches.</div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-gray-700">Error type highlights</p>
          <button
            onClick={() => onErrorFilterChange?.(null)}
            className="text-[11px] text-gray-500 hover:text-gray-900"
          >
            clear
          </button>
        </div>
        <div className="text-xs text-gray-600 space-y-1.5">
          <button
            onClick={() => onErrorFilterChange?.(activeErrorFilter === "all" ? null : "all")}
            className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded ${
              activeErrorFilter === "all" ? "bg-gray-900 text-white" : "hover:bg-gray-50"
            }`}
          >
            <span>All highlighted</span>
            <span>{Object.keys(errorHighlights).length}</span>
          </button>

          {(Object.keys(ERROR_META) as PatternType[]).map((type) => (
            <button
              key={type}
              onClick={() => onErrorFilterChange?.(activeErrorFilter === type ? null : type)}
              className={`w-full flex items-center justify-between gap-2 px-2 py-1 rounded ${
                activeErrorFilter === type ? "bg-gray-900 text-white" : "hover:bg-gray-50"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${ERROR_META[type].dot}`} />
                {ERROR_META[type].label}
              </span>
              <span>{counts[type]}</span>
            </button>
          ))}
        </div>
      </div>

      {popup && (
        <SemanticReviewPopup
          synsetId={popup.synset}
          label={popup.label}
          x={popup.x}
          y={popup.y}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
