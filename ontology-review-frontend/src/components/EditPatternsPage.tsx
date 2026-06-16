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
  Search,
  Trash2,
  X,
} from "lucide-react";
import {
  decideEditPattern,
  getEditPatternDecisions,
  getGroupedPatterns,
  getPrinciples,
  type PatternCategory,
  type PatternSuggestion,
} from "../api/editPatternsApi";

// Preset reviewer actions (mirrors ReviewerActions.tsx ACTION_OPTIONS)
const ALTER_ACTIONS: {
  kind: string;
  label: string;
  icon: LucideIcon;
  requiredField?: { label: string; placeholder: string };
}[] = [
  { kind: "rename", label: "Rename", icon: Pencil, requiredField: { label: "New label", placeholder: "e.g. school_building" } },
  { kind: "merge", label: "Merge", icon: GitMerge, requiredField: { label: "Target node ID", placeholder: "e.g. school.n.01" } },
  { kind: "delete", label: "Delete", icon: Trash2 },
  { kind: "add_parent", label: "Add Parent", icon: CornerUpRight, requiredField: { label: "Additional parent ID", placeholder: "e.g. building.n.01" } },
  { kind: "place_elsewhere", label: "Place Elsewhere", icon: FolderInput, requiredField: { label: "New parent ID", placeholder: "e.g. structure.n.01" } },
  { kind: "split", label: "Split", icon: GitBranch },
];

const ISSUE_META: Record<string, { icon: LucideIcon; active: string }> = {
  duplicate: { icon: GitMerge, active: "bg-blue-600 text-white" },
  virtual: { icon: Layers, active: "bg-purple-600 text-white" },
  misplaced: { icon: AlertTriangle, active: "bg-amber-600 text-white" },
  inheritance: { icon: GitBranch, active: "bg-emerald-600 text-white" },
  naming: { icon: Pencil, active: "bg-pink-600 text-white" },
};

interface PrincipleOption {
  id: string;
  title: string;
}
const ALL_KEY = "__all__";

interface FinishedChange {
  id: string;
  pattern_id: string;
  decision: "approve" | "alter" | "reject";
  reviewer: string;
  comment: string;
  altered_action?: string | null;
  payload?: { title?: string; suggested_action?: string; pattern_type?: string };
  created_at: string;
}

export function EditPatternsPage({
  selectedNodeId,
  currentUser,
}: {
  selectedNodeId?: string | null;
  currentUser: string;
}) {
  const [categories, setCategories] = useState<PatternCategory[]>([]);
  const [activeKey, setActiveKey] = useState("duplicate");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "unfinished" | "finished">("all");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [decisions, setDecisions] = useState<FinishedChange[]>([]);

  async function load() {
    setLoading(true);
    setStatus("");

    try {
      const data = await getGroupedPatterns();
      const loaded = data.categories ?? [];
      setCategories(loaded);

      // also load the human decisions that have already been made
      try {
        const decisionData = await getEditPatternDecisions();
        setDecisions(decisionData.decisions ?? []);
      } catch (decErr) {
        console.error(decErr);
      }

      if (loaded.length && !loaded.some((c: PatternCategory) => c.key === activeKey)) {
        setActiveKey(loaded[0].key);
      }
    } catch (err) {
      console.error(err);
      setStatus("Could not load editor suggestions. Check backend route /edit-patterns/grouped.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const isAll = activeKey === ALL_KEY;
  const activeCategory = categories.find((c) => c.key === activeKey);

  const filteredSuggestions = useMemo(() => {
    // when ALL is selected, merge suggestions across every category
    const suggestions = isAll
      ? categories.flatMap((c) => c.suggestions)
      : activeCategory?.suggestions ?? [];
    const q = query.trim().toLowerCase();

    if (!q) return suggestions;

    return suggestions.filter((suggestion) =>
      JSON.stringify(suggestion).toLowerCase().includes(q)
    );
  }, [isAll, categories, activeCategory, query]);

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

            return (
              <button
                key={category.key}
                onClick={() => setActiveKey(category.key)}
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
                  {category.suggestions.length}
                </span>
              </button>
            );
          })}

          {/* ALL tab — shows every category's suggestions combined */}
          {categories.length > 0 && (() => {
            const active = activeKey === ALL_KEY;
            const totalCount = categories.reduce(
              (sum, c) => sum + c.suggestions.length,
              0
            );
            return (
              <button
                onClick={() => setActiveKey(ALL_KEY)}
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
                  {totalCount}
                </span>
              </button>
            );
          })()}
        </div>


        <div className="mt-4 flex items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1 shrink-0">
            {([
              ["all", "All"],
              ["unfinished", "Unfinished"],
              ["finished", "Finished"],
            ] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setStatusFilter(key)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  statusFilter === key
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={load}
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
              placeholder="Search within this edit type..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
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
            Loading editor suggestions...
          </div>
        ) : !isAll && !activeCategory ? (
          <div className="h-full flex items-center justify-center text-sm text-gray-500">
            No edit categories loaded.
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {statusFilter !== "finished" && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {isAll ? "All Edit Patterns" : activeCategory!.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {isAll
                    ? "Every detected edit pattern across all issue types."
                    : activeCategory!.description}
                </p>
              </div>
            )}

            {statusFilter !== "finished" && (
              <div className="space-y-4">
                {filteredSuggestions.length === 0 ? (
                  <div className="bg-white border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
                    No suggestions found for this category.
                  </div>
                ) : (
                  filteredSuggestions.map((suggestion) => (
                    <SuggestionCard
                      key={suggestion.id}
                      suggestion={suggestion}
                      currentUser={currentUser}
                      onDecision={load}
                    />
                  ))
                )}
              </div>
            )}

            {/* Finished Changes — human decisions already made */}
            {statusFilter !== "unfinished" && (
              <div className={statusFilter === "finished" ? "" : "mt-10 border-t border-gray-200 pt-6"}>
                <h3 className="text-lg font-semibold text-gray-900">
                  Finished Changes
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Decisions you've already made on the suggestions above.
                </p>

                {decisions.length === 0 ? (
                  <div className="mt-4 bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center text-sm text-gray-500">
                    No finished changes yet.
                  </div>
                ) : (
                  <div className="mt-4 space-y-2">
                    {[...decisions].reverse().map((d) => (
                      <FinishedChangeRow key={d.id} change={d} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SuggestionCard({
  suggestion,
  currentUser,
  onDecision,
}: {
  suggestion: PatternSuggestion;
  currentUser: string;
  onDecision: () => void;
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

  // load existing principles so the reviewer can link this edit to one
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
      onDecision();
    } catch (err) {
      console.error(err);
      setStatus("Could not save decision.");
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-base font-semibold text-gray-900">
            {suggestion.title}
          </h4>
          <p className="text-sm text-gray-500 mt-1">
            Suggested action:{" "}
            <span className="font-medium text-gray-800">
              {suggestion.suggested_action}
            </span>
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
                        // record the chosen action label as the altered_action sent to backend
                        setAlteredAction(opt.label);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                        selected
                          ? "border-gray-900 bg-white text-gray-900"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={14} />
                      {opt.label}
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
                        // include the field value in altered_action, e.g. "Rename → school_building"
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
                      onClick={() =>
                        setLinkPrincipleId(selected ? null : p.id)
                      }
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

          <button
            onClick={() => submit(mode)}
            className="mt-2 w-full px-3 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Save {mode} decision
          </button>
        </div>
      )}

      {status && <p className="mt-2 text-xs text-gray-500">{status}</p>}
    </div>
  );
}

function FinishedChangeRow({ change }: { change: FinishedChange }) {
  const decisionStyle: Record<string, string> = {
    approve: "bg-green-100 text-green-700",
    alter: "bg-amber-100 text-amber-700",
    reject: "bg-red-100 text-red-700",
  };
  const title = change.payload?.title || change.pattern_id;
  const when = change.created_at
    ? new Date(change.created_at).toLocaleString()
    : "";

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          {change.reviewer}
          {when && ` · ${when}`}
          {change.altered_action && ` · → ${change.altered_action}`}
        </p>
      </div>
      <span
        className={`shrink-0 text-xs font-medium px-2 py-1 rounded ${
          decisionStyle[change.decision] ?? "bg-gray-100 text-gray-600"
        }`}
      >
        {change.decision}
      </span>
    </div>
  );
}