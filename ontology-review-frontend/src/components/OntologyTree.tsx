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
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  highlightIds: Set<string>;
  errorHighlights: Record<string, PatternType>;
}

function TreeNode({
  node,
  level,
  selectedId,
  onSelect,
  expandedIds,
  onToggle,
  highlightIds,
  errorHighlights,
}: TreeNodeProps) {
  const hasChildren = !!node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isFocused = selectedId === node.id || highlightIds.has(node.id);
  const errorType = errorHighlights[node.id];
  const errorMeta = errorType ? ERROR_META[errorType] : null;

  return (
    <div>
      <div
        data-node-id={node.id}
        className={`flex items-center gap-2 py-1.5 px-2 cursor-pointer rounded border ${
          isFocused
            ? "bg-gray-900 text-white border-gray-900"
            : errorMeta
              ? `${errorMeta.row} hover:bg-gray-50`
              : "border-transparent hover:bg-gray-50"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={(e) => onSelect(node, e)}
        title={errorType ? `${ERROR_META[errorType].label} issue` : undefined}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
          className={`w-4 h-4 flex items-center justify-center ${
            isFocused ? "text-white" : "text-gray-500"
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
        <span className={`text-sm truncate ${isFocused ? "text-white" : "text-gray-900"}`}>
          {node.label}
        </span>
        {node.synset && (
          <span className={`text-xs shrink-0 ${isFocused ? "text-gray-200" : "text-gray-500"}`}>
            ({node.synset})
          </span>
        )}
        {errorType && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded shrink-0 ${
              isFocused ? "bg-white/20 text-white" : "bg-white/70 text-gray-700"
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
              expandedIds={expandedIds}
              onToggle={onToggle}
              highlightIds={highlightIds}
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
  focusNodeIds,
}: {
  onNodeSelect: (id: string) => void;
  errorHighlights?: Record<string, PatternType>;
  activeErrorFilter?: PatternType | "all" | null;
  onErrorFilterChange?: (filter: PatternType | "all" | null) => void;
  focusNodeIds?: string[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [popup, setPopup] = useState<{ synset?: string | null; label: string; hierarchyPath: string; x: number; y: number } | null>(null);
  const [active, setActive] = useState<string>("physical");
  const [query, setQuery] = useState("");
  const [ontology, setOntology] = useState<Record<string, OntologyNode>>({});
  const [subontologies, setSubontologies] = useState<{ id: string; label: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [highlightIds, setHighlightIds] = useState<Set<string>>(new Set());
 
  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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

  // Walk the full tree to build the ontology hierarchy path to a node,
  // e.g. "Physical → matter → fragment". Uses the live tree data (not WordNet),
  // so virtual nodes get a real path too. Includes the node itself.
  const buildHierarchyPath = (targetId: string): string => {
    let result: string[] = [];

    const walk = (nodes: OntologyNode[], trail: string[]): boolean => {
      for (const n of nodes) {
        const nextTrail = [...trail, n.label];
        if (n.id === targetId) {
          result = nextTrail;
          return true;
        }
        if (n.children && walk(n.children, nextTrail)) return true;
      }
      return false;
    };

    // search across all subontologies so it works regardless of active tab
    for (const root of Object.values(ontology)) {
      if (walk([root], [])) break;
    }
    return result.join(" → ");
  };

  // Find which subontology (tab) a node id belongs to.
  const subontologyOf = (nodeId: string): string | null => {
    const inTree = (n: OntologyNode): boolean => {
      if (n.id === nodeId) return true;
      return (n.children ?? []).some(inTree);
    };
    for (const s of subontologies) {
      const r = ontology[s.id];
      if (r && inTree(r)) return s.id;
    }
    return null;
  };

  const handleSelect = (node: OntologyNode, e: React.MouseEvent) => {
    setSelectedId(node.id);
    onNodeSelect(node.id);

    // If the click came from a global-search result in another subontology,
    // switch to that subontology so the node stays visible after clearing.
    if (searching) {
      const sub = subontologyOf(node.id);
      if (sub && sub !== active) setActive(sub);
    }

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setPopup({
      synset: node.synset,
      label: node.label,
      hierarchyPath: buildHierarchyPath(node.id),
      x: rect.right + 12,
      y: rect.top + rect.height / 2,
    });
  };

  // Focus a node (or group of nodes) when a review card is clicked: switch to
  // the subontology, expand ancestor chains, highlight all related nodes, and
  // scroll the first one into view.
  useEffect(() => {
    if (!focusNodeIds || focusNodeIds.length === 0 || Object.keys(ontology).length === 0) return;

    const targets = new Set(focusNodeIds);
    let foundSub: string | null = null;
    const allAncestors = new Set<string>();

    function dfs(node: OntologyNode, path: string[], sub: string) {
      if (targets.has(node.id)) {
        if (!foundSub) foundSub = sub;
        for (const p of [...path, node.id]) allAncestors.add(p);
      }
      for (const c of node.children ?? []) {
        dfs(c, [...path, node.id], sub);
      }
    }

    for (const sub of Object.keys(ontology)) {
      dfs(ontology[sub], [], sub);
    }

    if (!foundSub) return; // none of the target nodes are in the tree

    setActive(foundSub);
    setQuery("");
    setExpandedIds((prev) => new Set([...prev, ...allAncestors]));
    setHighlightIds(new Set(focusNodeIds));
    setSelectedId(focusNodeIds[0]);

    // Scroll the first target into view once it has rendered. Switching tab +
    // expanding ancestors takes several frames, so poll briefly until the
    // node's DOM element exists, then scroll to it.
    let tries = 0;
    const first = focusNodeIds[0];
    const timer = setInterval(() => {
      const el = document.querySelector(`[data-node-id="${first}"]`);
      if (el) {
        el.scrollIntoView({ block: "center", behavior: "smooth" });
        clearInterval(timer);
      } else if (++tries > 20) {
        clearInterval(timer);
      }
    }, 50);
  }, [focusNodeIds, ontology]);

  const root = ontology[active];
  // When switching subontology, default-expand its top-level nodes (level 0),
  // without collapsing anything the user already opened.
  useEffect(() => {
    if (!root?.children) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      for (const child of root.children!) next.add(child.id);
      return next;
    });
  }, [root]);

  const searching = query.trim().length > 0;

  // GLOBAL search: when there is a query, search every subontology (not just
  // the active tab) and show all matches grouped by subontology. With no query,
  // show only the active subontology as before.
  const results = useMemo(() => {
    const out: {
      sub: { id: string; label: string };
      tree: OntologyNode;
      expand: Set<string>;
    }[] = [];
    if (searching) {
      for (const s of subontologies) {
        const r = ontology[s.id];
        if (!r) continue;
        const { tree, expand } = filterTree(r, query, errorHighlights, activeErrorFilter ?? null);
        if (tree && tree.children && tree.children.length) {
          out.push({ sub: s, tree, expand });
        }
      }
      return out;
    }
    if (!root) return out;
    const { tree, expand } = filterTree(root, query, errorHighlights, activeErrorFilter ?? null);
    const activeSub = subontologies.find((s) => s.id === active) ?? { id: active, label: active };
    if (tree) out.push({ sub: activeSub, tree, expand });
    return out;
  }, [searching, query, subontologies, ontology, root, active, errorHighlights, activeErrorFilter]);

  const expand = useMemo(() => {
    const set = new Set<string>();
    for (const r of results) for (const id of r.expand) set.add(id);
    return set;
  }, [results]);

  const filtering = query.trim().length > 0 || !!activeErrorFilter;

  return (
    <div className="h-full bg-white border-r border-gray-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-gray-200 shrink-0">
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
            placeholder="Search all ontologies…"
            className="w-full pl-7 pr-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="p-2 flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain">
        {loading ? (
          <div className="text-xs text-gray-400 p-4">Loading…</div>
        ) : error ? (
          <div className="text-xs text-red-500 p-4">Failed to load: {error}</div>
        ) : results.length > 0 ? (
          results.map(({ sub, tree }) => (
            <div key={sub.id} className="mb-2">
              {searching && (
                <p className="px-2 pt-1 pb-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {sub.label}
                </p>
              )}
              {tree.children?.map((node) => (
                <TreeNode
                  key={node.id}
                  node={node}
                  level={0}
                  selectedId={selectedId}
                  onSelect={handleSelect}
                  expandedIds={filtering ? expand : expandedIds}
                  onToggle={toggleExpand}
                  highlightIds={highlightIds}
                  errorHighlights={errorHighlights}
                />
              ))}
            </div>
          ))
        ) : (
          <div className="text-xs text-gray-400 p-4">No matches.</div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
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
      </div>

      {popup && (
        <SemanticReviewPopup
          synsetId={popup.synset}
          label={popup.label}
          hierarchyPath={popup.hierarchyPath}
          x={popup.x}
          y={popup.y}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
