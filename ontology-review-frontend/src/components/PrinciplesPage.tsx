import { useEffect, useState } from "react";
import { BookOpen, ChevronDown, ChevronRight, Plus, RefreshCw } from "lucide-react";
import { addPrinciple, getEditPatternDecisions, getPrinciples } from "../api/editPatternsApi";

// Color coding per pattern_type (mirrors EditPatternsPage) — pattern_id looks like "duplicate::actor"
const PATTERN_COLORS: Record<string, { chip: string; bar: string }> = {
  duplicate: { chip: "bg-blue-100 text-blue-700", bar: "bg-blue-500" },
  virtual: { chip: "bg-purple-100 text-purple-700", bar: "bg-purple-500" },
  misplaced: { chip: "bg-amber-100 text-amber-700", bar: "bg-amber-500" },
  inheritance: { chip: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  naming: { chip: "bg-pink-100 text-pink-700", bar: "bg-pink-500" },
};

function patternColor(patternId: string) {
  const type = patternId.split("::")[0];
  return PATTERN_COLORS[type] ?? { chip: "bg-gray-100 text-gray-600", bar: "bg-gray-300" };
}

interface Principle {
  id: string;
  title: string;
  body: string;
  source: string;
  examples?: string[];
}

interface DecisionRecord {
  id: string;
  pattern_id: string;
  decision: string;
  comment?: string;
  altered_action?: string;
  principle_added?: Principle;
}

export function PrinciplesPage({ currentUser }: { currentUser: string }) {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [newPrinciple, setNewPrinciple] = useState("");
  const [status, setStatus] = useState("");
  const [editSearch, setEditSearch] = useState("");
  const [selectedExamples, setSelectedExamples] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function load() {
    setStatus("");
    try {
      const [p, d] = await Promise.all([getPrinciples(), getEditPatternDecisions()]);
      setPrinciples(p.principles ?? []);
      setDecisions(d.decisions ?? []);
    } catch (err) {
      console.error(err);
      setStatus("Could not load principles/decision log.");
    }
  }

  useEffect(() => { load(); }, []);

  async function submitPrinciple() {
    if (!newPrinciple.trim()) return;
    try {
      await addPrinciple(newPrinciple.trim(), currentUser, selectedExamples);
      setNewPrinciple("");
      setSelectedExamples([]);
      setEditSearch("");
      await load();
    } catch {
      setStatus("Could not add principle.");
    }
  }

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Shared Editing Principles</h2>
          <p className="text-sm text-gray-600 mt-0.5">Shows how concrete artifact edits can update abstract review principles.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50">
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      {status && <div className="px-6 py-2 text-sm text-red-700 bg-red-50">{status}</div>}

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {principles.map((p) => {
            const exampleIds = p.examples ?? [];
            const relatedEdits = decisions.filter((d) => exampleIds.includes(d.pattern_id));
            const isOpen = expandedId === p.id;

            return (
              <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <BookOpen size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{p.body}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">source: {p.source}</span>
                      <button
                        onClick={() => setExpandedId(isOpen ? null : p.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        {isOpen ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                        {exampleIds.length} related {exampleIds.length === 1 ? "edit" : "edits"}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                        {relatedEdits.length === 0 ? (
                          <p className="text-xs text-gray-500">
                            No concrete edits linked to this principle yet.
                          </p>
                        ) : (
                          relatedEdits.map((d) => {
                            const pc = patternColor(d.pattern_id);
                            const ptype = d.pattern_id.split("::")[0];
                            return (
                            <div
                              key={d.id}
                              className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 pl-4"
                            >
                              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${pc.bar}`} />
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium text-gray-900 inline-flex items-center gap-1.5 flex-wrap min-w-0">
                                  <span className="truncate">{d.pattern_id}</span>
                                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${pc.chip}`}>
                                    {ptype}
                                  </span>
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600 shrink-0">
                                  {d.decision}
                                </span>
                              </div>
                              {d.altered_action && (
                                <p className="text-xs text-gray-500 mt-1">
                                  altered action: {d.altered_action}
                                </p>
                              )}
                              {d.comment && (
                                <p className="text-xs text-gray-600 mt-1">{d.comment}</p>
                              )}
                            </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Add principle manually</h3>
            <textarea
              value={newPrinciple}
              onChange={(e) => setNewPrinciple(e.target.value)}
              rows={3}
              placeholder="Example: When duplicate labels use different synsets, prefer disambiguating labels over merging unless context proves the same concept."
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 resize-none"
            />

            {/* Link existing edits as examples */}
            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
                Link edits as examples (optional)
              </p>
              <input
                value={editSearch}
                onChange={(e) => setEditSearch(e.target.value)}
                placeholder="Search edits by id (e.g. duplicate, actor)..."
                className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />

              {selectedExamples.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selectedExamples.map((id) => (
                    <span
                      key={id}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-50 text-blue-700"
                    >
                      {id}
                      <button
                        onClick={() =>
                          setSelectedExamples((prev) => prev.filter((x) => x !== id))
                        }
                        className="hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                {decisions.length === 0 ? (
                  <p className="text-xs text-gray-500 p-3">
                    No finished edits yet. Make a decision in the Editor first.
                  </p>
                ) : (
                  decisions
                    .filter((d) => {
                      const q = editSearch.trim().toLowerCase();
                      if (!q) return true;
                      return (
                        d.pattern_id.toLowerCase().includes(q) ||
                        d.decision.toLowerCase().includes(q)
                      );
                    })
                    .map((d) => {
                      const checked = selectedExamples.includes(d.pattern_id);
                      const pc = patternColor(d.pattern_id);
                      const ptype = d.pattern_id.split("::")[0];
                      return (
                        <label
                          key={d.id}
                          className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setSelectedExamples((prev) =>
                                checked
                                  ? prev.filter((x) => x !== d.pattern_id)
                                  : [...prev, d.pattern_id]
                              )
                            }
                          />
                          <span className="font-medium text-gray-900 truncate">
                            {d.pattern_id}
                          </span>
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0 ${pc.chip}`}>
                            {ptype}
                          </span>
                          <span className="ml-auto text-xs text-gray-500 shrink-0">
                            {d.decision}
                          </span>
                        </label>
                      );
                    })
                )}
              </div>
            </div>

            <button
              onClick={submitPrinciple}
              disabled={!newPrinciple.trim()}
              className="mt-3 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white disabled:bg-gray-300"
            >
              <Plus size={15} /> Add Principle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}