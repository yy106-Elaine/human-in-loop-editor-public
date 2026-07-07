import { PromptEditor } from "./PromptEditor";
import { useEffect, useMemo, useState, type LucideIcon } from "react";
import {
  AlertTriangle,
  Check,
  CornerUpRight,
  FolderInput,
  GitBranch,
  GitMerge,
  Layers,
  Pencil,
  RefreshCw,
  RotateCcw,
  Search,
  Trash2,
  Info,
  X,
} from "lucide-react";
import {
  decideEditPattern,
  getConflicts,
  getEditPatternDecisions,
  getPatternCategoryPage,
  getPatternCounts,
  getPrinciples,
  resolveConflict,
  rerunNode,
  getLearningStatus,
  getLearnedRules,
  trainLearningModel,
  getAutoReviewItems,
  decideAutoReviewItem,
  undoEditPatternDecision,
  type AutoReviewItem,
  type LearnedRule,
  type CollaborationConflict,
  type LearningModelSummary,
  type FinishedChange,
  type PatternCategory,
  type PatternCategorySummary,
  type PatternSuggestion,
  type PatternType,
} from "../api/editPatternsApi";

const PAGE_SIZE = 25;
const ALL_KEY = "__all__";

const ALTER_ACTIONS: {
  kind: string;
  label: string;
  icon: LucideIcon;
  description?: string;
  requiredField?: { label: string; placeholder: string };
}[] = [
  { kind: "rename", label: "Rename", icon: Pencil, description: "Keep the node but give it a clearer, disambiguated label.", requiredField: { label: "New label", placeholder: "e.g. school_building" } },
  { kind: "merge", label: "Merge", icon: GitMerge, description: "Combine this node into another existing node (they are the same concept).", requiredField: { label: "Target node ID", placeholder: "e.g. school.n.01" } },
  { kind: "delete", label: "Delete", icon: Trash2, description: "Remove this node from the ontology entirely." },
  { kind: "add_parent", label: "Add Parent", icon: CornerUpRight, description: "Give this node an additional parent (it belongs under more than one).", requiredField: { label: "Additional parent ID", placeholder: "e.g. building.n.01" } },
  { kind: "place_elsewhere", label: "Place Elsewhere", icon: FolderInput, description: "Move this node under a different parent (it is currently misplaced).", requiredField: { label: "New parent ID", placeholder: "e.g. structure.n.01" } },
];

const ISSUE_META: Record<string, { icon: LucideIcon; active: string }> = {
  duplicate: { icon: GitMerge, active: "bg-blue-600 text-white" },
  virtual: { icon: Layers, active: "bg-purple-600 text-white" },
  misplaced: { icon: AlertTriangle, active: "bg-amber-600 text-white" },
  inheritance: { icon: GitBranch, active: "bg-emerald-600 text-white" },
  naming: { icon: Pencil, active: "bg-pink-600 text-white" },
};

const PATTERN_COLORS: Record<string, { card: string; bar: string; actionText: string }> = {
  duplicate: { card: "bg-blue-50 border-blue-200", bar: "bg-blue-500", actionText: "text-blue-700" },
  virtual: { card: "bg-purple-50 border-purple-200", bar: "bg-purple-500", actionText: "text-purple-700" },
  misplaced: { card: "bg-amber-50 border-amber-200", bar: "bg-amber-500", actionText: "text-amber-700" },
  inheritance: { card: "bg-emerald-50 border-emerald-200", bar: "bg-emerald-500", actionText: "text-emerald-700" },
  naming: { card: "bg-pink-50 border-pink-200", bar: "bg-pink-500", actionText: "text-pink-700" },
};

const DEFAULT_COLOR = { card: "bg-white border-gray-200", bar: "bg-gray-300", actionText: "text-gray-800" };

// Color by ACTION (what the AI recommends), independent of category.
function actionColor(action?: string): string {
  switch ((action || "").toLowerCase()) {
    case "merge":
      return "text-blue-700";
    case "rename":
    case "relabel":
      return "text-amber-700";
    case "accept":
    case "keep":
    case "keep_separate":
      return "text-emerald-700";
    case "delete":
    case "remove":
      return "text-red-700";
    case "place_elsewhere":
    case "add_parent":
      return "text-violet-700";
    default:
      return "text-gray-700";
  }
}

// Turn action_params into a readable phrase instead of raw JSON.
function describeActionParams(params: unknown): string | null {
  if (!params || typeof params !== "object") return null;
  const p = params as Record<string, unknown>;
  if (Array.isArray(p.renames) && p.renames.length > 0) {
    return p.renames
      .map((r) => {
        const o = r as Record<string, unknown>;
        return `${o.node_id} → "${o.new_label}"`;
      })
      .join(", ");
  }
  if (typeof p.new_label === "string" && p.new_label) {
    return `→ "${p.new_label}"`;
  }
  if (typeof p.merge_into === "string" && p.merge_into) {
    return `merge into ${p.merge_into}`;
  }
  if (typeof p.target_parent === "string" && p.target_parent) {
    return `move under ${p.target_parent}`;
  }
  if (typeof p.additional_parent === "string" && p.additional_parent) {
    return `also under ${p.additional_parent}`;
  }
  return null;
}

type StatusFilter = "all" | "unfinished" | "finished" | "conflicts" | "learned";

interface PrincipleOption {
  id: string;
  title: string;
}

function emptyCategory(summary: PatternCategorySummary): PatternCategory {
  return {
    key: summary.key,
    title: summary.title,
    description: summary.description,
    suggestions: [],
    count: summary.count,
    limit: PAGE_SIZE,
    offset: 0,
    has_more: summary.count > 0,
  };
}

function mergeCategoryPage(
  existing: PatternCategory | undefined,
  page: PatternCategory,
  append: boolean
): PatternCategory {
  if (!append || !existing) return page;

  const seen = new Set(existing.suggestions.map((s) => s.id));
  const additions = page.suggestions.filter((s) => !seen.has(s.id));

  return {
    ...page,
    suggestions: [...existing.suggestions, ...additions],
  };
}

export function EditPatternsPage({
  selectedNodeId,
  currentUser,
  isAdmin = false,
  onCategoriesReloaded,
}: {
  selectedNodeId?: string | null;
  currentUser: string;
  isAdmin?: boolean;
  onCategoriesReloaded?: () => void | Promise<void>;
}) {
  const [categories, setCategories] = useState<PatternCategory[]>([]);
  const [activeKey, setActiveKey] = useState<PatternType | typeof ALL_KEY>("duplicate");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [decisions, setDecisions] = useState<FinishedChange[]>([]);
  const [conflicts, setConflicts] = useState<CollaborationConflict[]>([]);
  const [promptEditorFor, setPromptEditorFor] = useState<PatternType | null>(null);
  
  async function loadSharedState() {
    const [decisionData, conflictData] = await Promise.all([
      getEditPatternDecisions(),
      getConflicts(),
    ]);
    setDecisions(decisionData.decisions ?? []);
    setConflicts(conflictData.conflicts ?? []);
  }

  async function loadCategory(
    key: PatternType,
    opts: { append?: boolean; q?: string } = {}
  ) {
    const existing = categories.find((c) => c.key === key);
    const offset = opts.append ? existing?.suggestions.length ?? 0 : 0;

    // Append = load one more page. Non-append refresh = reload the WHOLE
    // category in one shot (data is cached server-side, no LLM calls), so
    // filtering out decided items never leaves a near-empty list that forces
    // repeated "Load more" clicks after each decision.
    const total = existing?.count ?? PAGE_SIZE;
    const limit = opts.append ? PAGE_SIZE : Math.max(total, PAGE_SIZE);

    const page = await getPatternCategoryPage(key, {
      limit,
      offset,
      q: opts.q ?? query,
    });

    setCategories((prev) =>
      prev.map((category) =>
        category.key === key
          ? mergeCategoryPage(category, page, Boolean(opts.append))
          : category
      )
    );
  }

  async function loadInitial() {
    setLoading(true);
    setStatus("");

    try {
      const [countsData] = await Promise.all([getPatternCounts(), loadSharedState()]);
      const summaries = countsData.categories ?? [];
      const initialCategories = summaries.map(emptyCategory);
      setCategories(initialCategories);

      const preferred = summaries.some((c: PatternCategorySummary) => c.key === activeKey)
        ? activeKey
        : summaries[0]?.key ?? "duplicate";

      setActiveKey(preferred);

      // Load the whole active category up front (cached server-side, no LLM),
      // so filtering decided items doesn't leave gaps.
      if (preferred !== ALL_KEY) {
        const summary = summaries.find((c: PatternCategorySummary) => c.key === preferred);
        const fullPage = await getPatternCategoryPage(preferred as PatternType, {
          limit: Math.max(summary?.count ?? PAGE_SIZE, PAGE_SIZE),
          offset: 0,
        });

        setCategories((prev) =>
          prev.map((category) =>
            category.key === preferred ? fullPage : category
          )
        );
      }

      await onCategoriesReloaded?.();
    } catch (err) {
      console.error(err);
      setStatus("Could not load editor suggestions. Check backend pagination routes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInitial();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshCurrentView() {
    setStatus("");
    try {
      await loadSharedState();

      if (activeKey === ALL_KEY) {
        await Promise.all(categories.map((c) => loadCategory(c.key, { append: false })));
      } else {
        await loadCategory(activeKey, { append: false });
      }

      await onCategoriesReloaded?.();
    } catch (err) {
      console.error(err);
      setStatus("Could not refresh the current view.");
    }
  }

  async function handleCategoryClick(key: PatternType | typeof ALL_KEY) {
    setActiveKey(key);
    setStatus("");

    if (key === ALL_KEY) {
      // Load one page per category only when All is opened.
      setPageLoading(true);
      try {
        await Promise.all(categories.map((c) => loadCategory(c.key, { append: false })));
      } catch (err) {
        console.error(err);
        setStatus("Could not load all category previews.");
      } finally {
        setPageLoading(false);
      }
      return;
    }

    const category = categories.find((c) => c.key === key);
    if (!category || category.suggestions.length > 0) return;

    setPageLoading(true);
    try {
      await loadCategory(key, { append: false });
    } catch (err) {
      console.error(err);
      setStatus(`Could not load ${key} suggestions.`);
    } finally {
      setPageLoading(false);
    }
  }

  async function handleLoadMore() {
    if (activeKey === ALL_KEY) return;

    setPageLoading(true);
    setStatus("");
    try {
      await loadCategory(activeKey, { append: true });
    } catch (err) {
      console.error(err);
      setStatus("Could not load more suggestions.");
    } finally {
      setPageLoading(false);
    }
  }

  async function handleSearch() {
    if (activeKey === ALL_KEY) {
      setStatus("Search is category-specific. Select a category first, then search.");
      return;
    }

    setPageLoading(true);
    setStatus("");
    try {
      await loadCategory(activeKey, { append: false, q: query });
    } catch (err) {
      console.error(err);
      setStatus("Could not search this category.");
    } finally {
      setPageLoading(false);
    }
  }

  const isAll = activeKey === ALL_KEY;
  const activeCategory = categories.find((c) => c.key === activeKey);
  const openConflicts = conflicts.filter((c) => c.status === "open");

  const visibleSuggestions = useMemo(() => {
    if (isAll) return categories.flatMap((c) => c.suggestions);
    return activeCategory?.suggestions ?? [];
  }, [isAll, categories, activeCategory]);

  // Set of pattern_ids that already have a human/AI decision.
  const decidedIds = useMemo(
    () => new Set(decisions.map((d) => d.pattern_id)),
    [decisions]
  );

  // Unfinished view should hide anything already decided.
  const displayedSuggestions = useMemo(() => {
    if (statusFilter === "unfinished") {
      return visibleSuggestions.filter((s) => !decidedIds.has(s.id));
    }
    return visibleSuggestions;
  }, [statusFilter, visibleSuggestions, decidedIds]);

  const totalCount = isAll
    ? categories.reduce((sum, c) => sum + (c.count ?? c.suggestions.length), 0)
    : activeCategory?.count ?? activeCategory?.suggestions.length ?? 0;

  const hasMore = !isAll && Boolean(activeCategory?.has_more);

  // Decisions that belong to the CURRENT category (or all categories).
  // pattern_id looks like "duplicate::auction", so the prefix is the category.
  const categoryDecisions = isAll
    ? decisions
    : decisions.filter((d) => {
        const cat = (d.pattern_id.split("::")[0] || "").toLowerCase();
        return cat === activeKey;
      });

  // A pattern can have several historical decisions (re-decided over time).
  // Keep only the latest per pattern_id so Finished shows each item once.
  const relevantDecisions = useMemo(() => {
    const latestByPattern = new Map<string, FinishedChange>();
    for (const d of categoryDecisions) {
      const existing = latestByPattern.get(d.pattern_id);
      if (!existing || new Date(d.created_at) > new Date(existing.created_at)) {
        latestByPattern.set(d.pattern_id, d);
      }
    }
    return Array.from(latestByPattern.values());
  }, [categoryDecisions]);

  // Unfinished = suggestions actually loaded that have no decision yet.
  // (Matches the filtered list exactly, so the tab count and the list agree.)
  const unfinishedCount = visibleSuggestions.filter(
    (s) => !decidedIds.has(s.id)
  ).length;
  // Finished = decisions in this category.
  const finishedCount = relevantDecisions.length;

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gray-50">
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <p className="text-sm text-gray-500">
          Select an edit type, review suggested cases, then accept, alter, or reject.
          {selectedNodeId && (
            <span className="ml-1 text-gray-400">
              · Current tree node: {selectedNodeId}
            </span>
          )}
        </p>

        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((category) => {
            const meta = ISSUE_META[category.key] ?? ISSUE_META.duplicate;
            const Icon = meta.icon;
            const active = activeKey === category.key;
            const count = category.count ?? category.suggestions.length;

            return (
              <button
                key={category.key}
                onClick={() => handleCategoryClick(category.key)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? meta.active
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon size={15} />
                {category.title}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    active ? "bg-white/20 text-white" : "bg-white text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          {categories.length > 0 && (() => {
            const active = activeKey === ALL_KEY;
            const count = categories.reduce(
              (sum, c) => sum + (c.count ?? c.suggestions.length),
              0
            );

            return (
              <button
                onClick={() => handleCategoryClick(ALL_KEY)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Layers size={15} />
                All
                <span
                  className={`text-xs px-1.5 py-0.5 rounded ${
                    active ? "bg-white/20 text-white" : "bg-white text-gray-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })()}
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1 shrink-0">
            {([
              ["all", "All"],
              ["unfinished", `Unfinished${unfinishedCount ? ` (${unfinishedCount})` : ""}`],
              ["finished", `Finished${finishedCount ? ` (${finishedCount})` : ""}`],
              ["conflicts", `Conflicts${openConflicts.length ? ` (${openConflicts.length})` : ""}`],
              ["learned", "Learned"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === key
                    ? key === "conflicts"
                      ? "bg-red-50 text-red-700 shadow-sm"
                      : "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={refreshCurrentView}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50 shrink-0"
          >
            <RefreshCw size={15} />
            Refresh
          </button>

          <div className="relative flex-1 max-w-md ml-auto">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              placeholder={isAll ? "Select a category to search..." : "Search this category..."}
              disabled={isAll}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>
        </div>
      </div>

      {status && (
        <div className="shrink-0 px-6 py-2 bg-red-50 text-red-700 text-sm">
          {status}
        </div>
      )}

      <div className="flex-1 min-h-0 overflow-y-auto p-6">
        {loading ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            Loading editor counts...
          </div>
        ) : !isAll && !activeCategory ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No edit categories loaded.
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {statusFilter === "conflicts" ? (
              <ConflictResolutionPanel
                conflicts={openConflicts}
                currentUser={currentUser}
                isAdmin={isAdmin}
                onResolved={refreshCurrentView}
              />
            ) : statusFilter === "learned" ? (
              <LearnedSuggestionsPanel
                currentUser={currentUser}
                isAdmin={isAdmin}
                activeCategory={isAll ? "all" : activeCategory?.key ?? "all"}
                onApplied={refreshCurrentView}
              />
            ) : (
              <>
                {statusFilter !== "finished" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {isAll ? "All Edit Patterns" : activeCategory!.title}
                      </h3>
                      {!isAll && activeCategory && (
                        <button
                          onClick={() => setPromptEditorFor(activeCategory.key)}
                          className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                        >
                          <Pencil size={13} />
                          View / Edit LLM prompt
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {isAll
                        ? "Previewing one loaded page per category. Open a category to page through all suggestions."
                        : activeCategory!.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Showing {displayedSuggestions.length}
                      {statusFilter === "unfinished" ? " unfinished" : ""} of {totalCount} suggestion{totalCount === 1 ? "" : "s"}.
                    </p>
                  </div>
                )}

                {statusFilter !== "finished" && (
                  <div className="space-y-4">
                    {pageLoading && displayedSuggestions.length === 0 ? (
                      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
                        Loading suggestions...
                      </div>
                    ) : displayedSuggestions.length === 0 ? (
                      <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
                        {statusFilter === "unfinished"
                          ? "All suggestions in this category have been decided."
                          : "No suggestions loaded for this category."}
                      </div>
                    ) : (
                      displayedSuggestions.map((suggestion) => (
                        <SuggestionCard
                          key={suggestion.id}
                          suggestion={suggestion}
                          currentUser={currentUser}
                          decisions={decisions.filter((d) => d.pattern_id === suggestion.id)}
                          conflict={conflicts.find(
                            (c) => c.pattern_id === suggestion.id && c.status === "open"
                          )}
                          onDecision={refreshCurrentView}
                        />
                      ))
                    )}

                    {hasMore && (
                      <div className="pt-2">
                        <button
                          onClick={handleLoadMore}
                          disabled={pageLoading}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          {pageLoading ? "Loading..." : `Load more ${activeCategory?.title ?? "suggestions"}`}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {statusFilter !== "unfinished" && (
                  <div className={statusFilter === "finished" ? "" : "mt-10 border-t border-gray-200 pt-6"}>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Finished Changes
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Decisions already made on the suggestions above.
                    </p>

                    {relevantDecisions.length === 0 ? (
                      <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-500">
                        No finished changes yet.
                      </div>
                    ) : (
                      <div className="mt-4 space-y-2">
                        {[...relevantDecisions].reverse().map((d) => (
                          <FinishedChangeRow 
                          key={d.id} 
                          change={d} 
                          onUndo={refreshCurrentView} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {promptEditorFor && (
        <PromptEditor
          patternType={promptEditorFor}
          onClose={() => setPromptEditorFor(null)}
        />
      )}
    </div>
  );
}

function SuggestionCard({
  suggestion,
  currentUser,
  decisions,
  conflict,
  onDecision,
}: {
  suggestion: PatternSuggestion;
  currentUser: string;
  decisions: FinishedChange[];
  conflict?: CollaborationConflict;
  onDecision: () => void | Promise<void>;
}) {
  const [mode, setMode] = useState<"approve" | "alter" | "reject" | null>(null);
  const [comment, setComment] = useState("");
  const [alteredAction, setAlteredAction] = useState("");
  const [actionKind, setActionKind] = useState<string | null>(null);
  const [actionField, setActionField] = useState("");
  const [principleUpdate, setPrincipleUpdate] = useState("");
  const [principles, setPrinciples] = useState<PrincipleOption[]>([]);
  const [linkPrincipleId, setLinkPrincipleId] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const [rerunning, setRerunning] = useState(false);

  useEffect(() => {
    getPrinciples()
      .then((data) => setPrinciples(data.principles ?? []))
      .catch(() => setPrinciples([]));
  }, []);

  async function submit(decision: "approve" | "alter" | "reject") {
    try {
      await decideEditPattern(suggestion.id, {
        decision,
        reviewer: currentUser,
        comment,
        altered_action: alteredAction,
        principle_update: principleUpdate,
        link_principle_id: linkPrincipleId ?? undefined,
        payload: {
          pattern_type: suggestion.pattern_type,
          suggested_action: suggestion.suggested_action,
          action_params: suggestion.action_params ?? {},
          title: suggestion.title,
        },
      });

      setStatus(`Saved ${decision} decision.`);
      setMode(null);
      setComment("");
      setAlteredAction("");
      setActionKind(null);
      setActionField("");
      setPrincipleUpdate("");
      setLinkPrincipleId(null);
      await onDecision();
    } catch (err) {
      console.error(err);
      setStatus("Could not save decision.");
    }
  }

  async function handleRerun() {
    if (!confirm("Re-run this node with the current prompt? This calls OpenAI (costs ~1 request).")) {
      return;
    }
    setRerunning(true);
    setStatus("");
    try {
      const res = await rerunNode(suggestion.id);
      setStatus(
        `Re-ran. New action: ${res.suggestion.suggested_action} (${Math.round(
          res.suggestion.confidence * 100
        )}%).`
      );
      await onDecision();
    } catch (err) {
      console.error(err);
      setStatus("Could not re-run this node.");
    } finally {
      setRerunning(false);
    }
  }

  const colors = PATTERN_COLORS[suggestion.pattern_type ?? ""] ?? DEFAULT_COLOR;

  return (
    <div className={`relative overflow-hidden border rounded-xl shadow-sm p-4 pl-5 ${colors.card}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bar}`} />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {suggestion.title}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Suggested action:{" "}
            <span className={`font-semibold ${actionColor(suggestion.suggested_action)}`}>
              {suggestion.suggested_action}
            </span>
            {(() => {
              const desc = describeActionParams(suggestion.action_params);
              return desc ? (
                <span className="text-gray-600">{" · "}{desc}</span>
              ) : null;
            })()}
          </p>
        </div>

        <div className="text-right shrink-0">
          <p className="text-xs text-gray-500">Confidence</p>
          <p className="text-lg font-semibold text-gray-900">
            {Math.round(suggestion.confidence * 100)}%
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {suggestion.rationale}
      </p>

      {suggestion.nodes && suggestion.nodes.length > 0 && (
        <div className="mt-4 grid gap-2">
          {suggestion.nodes.slice(0, 5).map((node) => (
            <div
              key={node.id}
              className="rounded-lg bg-gray-50 border border-gray-200 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-900">
                  {node.label}
                </span>
                <span className="text-xs text-gray-500">
                  {node.code ?? "no synset"}
                </span>
              </div>
              {node.path && (
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {node.path}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {suggestion.path && (
        <p className="text-xs text-gray-500 mt-3">{suggestion.path}</p>
      )}

      {decisions.length > 0 && (
        <div className="mt-4 rounded-lg border border-gray-200 bg-white/80 px-3 py-2 text-xs text-gray-600">
          Reviewed by: {decisions.map((d) => `${d.reviewer} (${d.decision})`).join(", ")}
        </div>
      )}

      {conflict && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          Conflict detected: reviewers chose different decisions for this suggestion.
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setMode("approve")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          <Check size={13} />
          Accept
        </button>

        <button
          onClick={() => setMode("alter")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <Pencil size={13} />
          Alter
        </button>

        <button
          onClick={() => setMode("reject")}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <X size={13} />
          Reject
        </button>

        <button
          onClick={handleRerun}
          disabled={rerunning}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <RotateCcw size={13} />
          {rerunning ? "Re-running..." : "Re-run AI"}
        </button>
      </div>

      {mode && (
        <div className="mt-4 border border-gray-200 rounded-lg p-3 bg-gray-50">
          {mode === "alter" && (
            <div className="mb-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                Choose an action
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ALTER_ACTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = actionKind === opt.kind;

                  return (
                    <button
                      key={opt.kind}
                      onClick={() => {
                        setActionKind(opt.kind);
                        setActionField("");
                        setAlteredAction(opt.label);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                        selected
                          ? "border-gray-900 bg-white text-gray-900"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={14} />
                      <span>{opt.label}</span>
                      {opt.description && (
                        <span className="ml-auto relative group/tip">
                          <Info size={13} className="text-gray-400 group-hover/tip:text-gray-600" />
                          <span className="pointer-events-none absolute right-0 bottom-full mb-1.5 z-20 w-56 rounded-md bg-gray-900 text-white text-xs font-normal leading-snug px-2.5 py-1.5 opacity-0 group-hover/tip:opacity-100 transition-opacity">
                            {opt.description}
                          </span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {(() => {
                const selected = ALTER_ACTIONS.find((a) => a.kind === actionKind);
                if (!selected?.requiredField) return null;

                return (
                  <div className="mt-3">
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-1">
                      {selected.requiredField.label}
                    </label>
                    <input
                      value={actionField}
                      onChange={(e) => {
                        setActionField(e.target.value);
                        setAlteredAction(
                          e.target.value.trim()
                            ? `${selected.label} → ${e.target.value.trim()}`
                            : selected.label
                        );
                      }}
                      placeholder={selected.requiredField.placeholder}
                      className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                );
              })()}
            </div>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Reviewer note..."
            rows={2}
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          />

          {principles.length > 0 && (
            <div className="mt-2">
              <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                Link to a principle (optional)
              </p>
              <div className="flex flex-wrap gap-2">
                {principles.map((p) => {
                  const selected = linkPrincipleId === p.id;

                  return (
                    <button
                      key={p.id}
                      onClick={() => setLinkPrincipleId(selected ? null : p.id)}
                      className={`text-left px-3 py-1.5 rounded-md text-xs border transition-colors max-w-[260px] ${
                        selected
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {p.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <textarea
            value={principleUpdate}
            onChange={(e) => setPrincipleUpdate(e.target.value)}
            placeholder="Optional: turn this decision into a reusable principle..."
            rows={2}
            className="mt-2 w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
          />

          {(() => {
            // Enforce required fields on Alter: if the chosen action needs a
            // value (rename -> new label, merge/add_parent/place_elsewhere -> ID)
            // it must be filled before the decision can be saved.
            const selectedAlter = ALTER_ACTIONS.find((a) => a.kind === actionKind);
            const missingRequired =
              mode === "alter" &&
              Boolean(selectedAlter?.requiredField) &&
              actionField.trim() === "";
            return (
              <>
                <button
                  onClick={() => submit(mode)}
                  disabled={missingRequired}
                  className="mt-2 w-full px-3 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save {mode} decision
                </button>
                {missingRequired && (
                  <p className="mt-1 text-xs text-amber-600">
                    {selectedAlter?.requiredField?.label} is required for “{selectedAlter?.label}”.
                  </p>
                )}
              </>
            );
          })()}
        </div>
      )}

      {status && <p className="mt-2 text-xs text-gray-500">{status}</p>}
    </div>
  );
}


function describeRule(rule: LearnedRule): string {
  const [patternType, action, confidenceBucket, nodeBucket] = rule.signature.split("|");

  const conf =
    confidenceBucket === "high"
      ? "high-confidence"
      : confidenceBucket === "medium"
      ? "medium-confidence"
      : "low-confidence";

  const size =
    nodeBucket === "single"
      ? "a single node"
      : nodeBucket === "few"
      ? "a few nodes"
      : "many nodes";

  const verb =
    rule.decision === "approve"
      ? "approve the"
      : rule.decision === "reject"
      ? "reject the"
      : "alter the";

  return `When a ${conf} ${patternType} suggests "${action}" on ${size} → ${verb} ${action}.`;
}

function explainRule(rule: LearnedRule): string {
  const counts = rule.counts ?? {};
  const total = rule.support;
  const winning = counts[rule.decision] ?? 0;
  const pct = Math.round(rule.confidence * 100);

  const breakdown = Object.entries(counts)
    .map(([decision, n]) => `${n} ${decision}`)
    .join(", ");

  const agreement =
    pct === 100
      ? `all ${total} of those decisions agreed`
      : `${winning} of ${total} agreed (${breakdown})`;

  return `Learned because across ${total} matching human decision${
    total === 1 ? "" : "s"
  }, ${agreement} on "${rule.decision}". The system now applies this automatically to new suggestions with the same profile, while anything outside this profile still goes to a human.`;
}

function LearnedSuggestionsPanel({
  currentUser,
  isAdmin,
  activeCategory,
  onApplied,
}: {
  currentUser: string;
  isAdmin: boolean;
  activeCategory: PatternType | "all";
  onApplied: () => void | Promise<void>;
}) {
  const [model, setModel] = useState<LearningModelSummary | null>(null);
  const [items, setItems] = useState<AutoReviewItem[]>([]);
  const [rules, setRules] = useState<LearnedRule[]>([]);
  const [threshold, setThreshold] = useState(0.85);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      const [modelData, reviewData, rulesData] = await Promise.all([
        getLearningStatus(),
        getAutoReviewItems({
          category: activeCategory,
          threshold,
          limit: 50,
        }),
        getLearnedRules(),
      ]);

      setModel(modelData.model);
      setItems(reviewData.items ?? []);
      setRules(rulesData.rules ?? []);
    } catch (err) {
      console.error(err);
      setStatus("Could not load learned suggestions.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  async function handleTrain() {
    setLoading(true);
    setStatus("");
    try {
      const data = await trainLearningModel({
        reviewer: currentUser,
        is_admin: isAdmin,
      });
      setModel(data.model);
      const [reviewData, rulesData] = await Promise.all([
        getAutoReviewItems({
          category: activeCategory,
          threshold,
          limit: 50,
        }),
        getLearnedRules(),
      ]);
      setItems(reviewData.items ?? []);
      setRules(rulesData.rules ?? []);
      setStatus("Learning model retrained from human decisions.");
    } catch (err) {
      console.error(err);
      setStatus("Could not train learning model.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDecision(item: AutoReviewItem, approve: boolean) {
    if (!isAdmin) {
      setStatus("Only admins can approve learned auto-decisions.");
      return;
    }

    setStatus("");
    try {
      await decideAutoReviewItem(item.id, {
        reviewer: currentUser,
        approve,
        is_admin: isAdmin,
        comment: approve
          ? "Admin approved learned auto-decision."
          : "Admin rejected learned auto-decision.",
      });

      await load();
      await onApplied();
    } catch (err) {
      console.error(err);
      setStatus("Could not update learned auto-review item.");
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Learned Suggestions
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            The system learns from prior human decisions and proposes high-confidence auto-decisions for remaining suggestions.
          </p>
        </div>

        <button
          onClick={handleTrain}
          disabled={loading}
          className="shrink-0 inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
        >
          <RefreshCw size={15} />
          {loading ? "Training..." : "Train from decisions"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Training examples</p>
          <p className="text-2xl font-semibold text-gray-900">
            {model?.examples ?? 0}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500">Learned rules</p>
          <p className="text-2xl font-semibold text-gray-900">
            {model?.rule_count ?? 0}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <label className="text-xs text-gray-500">Auto threshold</label>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              min={0}
              max={1}
              step={0.05}
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="w-24 px-2 py-1.5 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={load}
              disabled={loading}
              className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {rules.length > 0 && (
        <div className="mt-4 border border-gray-200 rounded-xl bg-white p-4">
          <h4 className="text-sm font-semibold text-gray-900">
            Rules the system learned from your decisions
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Each rule is summarized from prior human decisions and applied automatically to matching suggestions.
          </p>
          <div className="mt-3 space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.signature}
                className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5"
              >
                <p className="text-sm text-gray-800">
                  {describeRule(rule)}
                </p>
                <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                  {explainRule(rule)}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono">
                    {rule.signature}
                  </span>
                  <span>{Math.round(rule.confidence * 100)}% agreement</span>
                  <span>·</span>
                  <span>{rule.support} human decision{rule.support === 1 ? "" : "s"}</span>
                  {rule.counts && (
                    <span>
                      ·{" "}
                      {Object.entries(rule.counts)
                        .map(([k, v]) => `${v} ${k}`)
                        .join(", ")}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isAdmin && (
        <p className="mt-4 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          You can view learned suggestions, but only admins can approve auto-decisions.
        </p>
      )}

      {status && (
        <p className={`mt-4 text-sm ${
          status.toLowerCase().includes("could not") || status.toLowerCase().includes("only admins")
            ? "text-red-700 bg-red-50 border-red-200"
            : "text-emerald-700 bg-emerald-50 border-emerald-200"
        } border rounded-lg px-3 py-2`}>
          {status}
        </p>
      )}

      {loading && items.length === 0 ? (
        <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
          Loading learned suggestions...
        </div>
      ) : items.length === 0 ? (
        <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
          No high-confidence learned suggestions yet. Make more human decisions, then train the model.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((item) => {
            const colors = PATTERN_COLORS[item.suggestion.pattern_type] ?? DEFAULT_COLOR;
            return (
              <div
                key={item.id}
                className={`relative overflow-hidden border rounded-xl p-4 pl-5 ${colors.card}`}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colors.bar}`} />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">
                      {item.suggestion.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Learned decision:{" "}
                      <span className="font-semibold text-gray-900">
                        {item.prediction.decision}
                      </span>{" "}
                      ({Math.round(item.prediction.confidence * 100)}%)
                    </p>
                  </div>

                  <span className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {item.prediction.source === "learned_rule" ? "learned rule" : "heuristic"}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                  {item.prediction.reason}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  Original action: {item.suggestion.suggested_action}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDecision(item, true)}
                    disabled={!isAdmin}
                    className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Approve auto-decision
                  </button>

                  <button
                    onClick={() => handleDecision(item, false)}
                    disabled={!isAdmin}
                    className="px-3 py-1.5 rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject auto-decision
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


function ConflictResolutionPanel({
  conflicts,
  currentUser,
  isAdmin,
  onResolved,
}: {
  conflicts: CollaborationConflict[];
  currentUser: string;
  isAdmin: boolean;
  onResolved: () => void | Promise<void>;
}) {
  const [status, setStatus] = useState("");

  async function chooseConsensus(
    conflict: CollaborationConflict,
    decision: "approve" | "alter" | "reject"
  ) {
    if (!isAdmin) {
      setStatus("Only admins can resolve conflicts.");
      return;
    }

    setStatus("");

    try {
      await resolveConflict(conflict.id, {
        reviewer: currentUser,
        consensus_decision: decision,
        comment: `Consensus resolved as ${decision}`,
        is_admin: isAdmin,
      });
      await onResolved();
    } catch (err) {
      console.error(err);
      setStatus("Could not resolve conflict.");
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Conflicts</h3>
      <p className="text-sm text-gray-600 mt-1">
        Resolve cases where multiple reviewers made incompatible decisions on the same suggestion.
      </p>

      {!isAdmin && (
        <p className="mt-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          You can view conflicts, but only admins can resolve them.
        </p>
      )}

      {status && <p className="mt-2 text-sm text-red-700">{status}</p>}

      {conflicts.length === 0 ? (
        <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
          No open conflicts.
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {conflicts.map((conflict) => (
            <div key={conflict.id} className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-medium text-gray-900">{conflict.pattern_id}</p>

              <div className="mt-2 space-y-1 text-sm text-gray-700">
                {conflict.votes.map((vote) => (
                  <p key={vote.id}>
                    <span className="font-medium">{vote.reviewer}</span>: {vote.decision}
                    {vote.altered_action ? ` → ${vote.altered_action}` : ""}
                    {vote.comment ? ` — ${vote.comment}` : ""}
                  </p>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(["approve", "alter", "reject"] as const).map((decision) => (
                  <button
                    key={decision}
                    onClick={() => chooseConsensus(conflict, decision)}
                    disabled={!isAdmin}
                    className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Consensus: {decision}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FinishedChangeRow({ 
  change, 
  onUndo 
}: { 
  change: FinishedChange;
  onUndo?: () => Promise<void> | void;
}) {
  const [isUndoing, setIsUndoing] = useState(false);

  const decisionStyle: Record<string, string> = {
    approve: "bg-green-100 text-green-700",
    alter: "bg-amber-100 text-amber-700",
    reject: "bg-red-100 text-red-700",
  };

  const title = change.payload?.title || change.pattern_id;
  const when = change.created_at
    ? new Date(change.created_at).toLocaleString()
    : "";

  const isLearned =
    Boolean(change.payload?.learning_prediction) ||
    Boolean(change.payload?.auto_review_id);

  const aiAction =
    (change.payload?.suggested_action as string | undefined) ?? null;

  const aiParams = change.payload?.action_params as
    | Record<string, unknown>
    | undefined;
    
  const aiParamsText = describeActionParams(aiParams);

  const humanAction =
    change.decision === "approve"
      ? aiAction
      : change.altered_action || null;

  async function handleUndo() {
    if (!onUndo) return;
    setIsUndoing(true);
    try {
      await undoEditPatternDecision(change.pattern_id);
      await onUndo(); 
    } catch (err) {
      console.error("Undo failed:", err);
      alert("Failed to undo. Check if the backend endpoint exists.");
    } finally {
      setIsUndoing(false);
    }
  }

  return (
    <div
      className={`border rounded-lg px-4 py-3 flex items-center justify-between gap-3 ${
        isLearned ? "bg-indigo-50/60 border-indigo-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
          <span
            className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
              isLearned
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isLearned ? "AI learned" : "Human"}
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {aiAction && (
            <span>
              AI suggested{" "}
              <span className={`font-semibold ${actionColor(aiAction)}`}>
                {aiAction}
              </span>
              {aiParamsText && (
                <span className="text-gray-500"> {aiParamsText}</span>
              )}
            </span>
          )}
          {aiAction && " · "}
          <span className="font-medium">{change.decision}</span>
          {change.decision !== "approve" && humanAction && (
            <span>
              {" → "}
              <span className={`font-semibold ${actionColor(humanAction)}`}>
                {humanAction}
              </span>
            </span>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {isLearned ? `Learning System · approved by ${change.reviewer}` : change.reviewer}
          {when && ` · ${when}`}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${
            decisionStyle[change.decision] ?? "bg-gray-100 text-gray-600"
          }`}
        >
          {change.decision}
        </span>
        {onUndo && (
          <button
            onClick={handleUndo}
            disabled={isUndoing}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <RotateCcw size={11} />
            {isUndoing ? "Undoing..." : "Undo"}
          </button>
        )}
      </div>
    </div>
  );
}