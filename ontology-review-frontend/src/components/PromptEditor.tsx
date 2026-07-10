import { useEffect, useState } from "react";
import { X, RotateCcw, Save, Sparkles, Play, AlertTriangle } from "lucide-react";
import {
  getPrompts,
  updatePrompt,
  resetPrompt,
  learnPromptFromDecisions,
  rerunBatchWithCurrentPrompt,
  toPromptEditType,
  type EditablePrompt,
  type PromptEditType,
  type PatternType,
  type PromptLearningExample,
} from "../api/editPatternsApi";

export function PromptEditor({
  patternType,
  currentUser,
  isAdmin = false,
  onClose,
  onBatchComplete,
}: {
  patternType: PatternType;
  currentUser: string;
  isAdmin?: boolean;
  onClose: () => void;
  onBatchComplete?: () => void | Promise<void>;
}) {
  const editType: PromptEditType = toPromptEditType(patternType);

  const [prompt, setPrompt] = useState<EditablePrompt | null>(null);
  const [systemText, setSystemText] = useState("");
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [learning, setLearning] = useState(false);
  const [runningBatch, setRunningBatch] = useState(false);
  const [batchSize, setBatchSize] = useState(10);
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false);

  const [learnedSystemText, setLearnedSystemText] = useState("");
  const [learnedUserText, setLearnedUserText] = useState("");
  const [learnedRationale, setLearnedRationale] = useState("");
  const [learnedExamples, setLearnedExamples] = useState<PromptLearningExample[]>([]);
  const [hasLearnedProposal, setHasLearnedProposal] = useState(false);

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      const data = await getPrompts();
      const p = data.prompts[editType];
      setPrompt(p);
      setSystemText(p.system);
      setUserText(p.user);
      setLearnedSystemText("");
      setLearnedUserText("");
      setLearnedRationale("");
      setLearnedExamples([]);
      setHasLearnedProposal(false);
      setDirty(false);
    } catch (err) {
      console.error(err);
      setStatus("Could not load this prompt.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editType]);

  async function handleSave() {
    setSaving(true);
    setStatus("");
    try {
      const res = await updatePrompt(editType, {
        system: systemText,
        user: userText,
      });
      setPrompt(res.prompt);
      setSystemText(res.prompt.system);
      setUserText(res.prompt.user);
      setDirty(false);
      setStatus("Saved. Run a small batch to regenerate suggestions with this prompt.");
    } catch (err) {
      console.error(err);
      setStatus("Could not save the prompt.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!confirm("Reset this prompt back to its default? Your edits will be lost.")) return;
    setSaving(true);
    setStatus("");
    try {
      const res = await resetPrompt(editType);
      setPrompt(res.prompt);
      setSystemText(res.prompt.system);
      setUserText(res.prompt.user);
      setDirty(false);
      setStatus("Reset to default.");
    } catch (err) {
      console.error(err);
      setStatus("Could not reset the prompt.");
    } finally {
      setSaving(false);
    }
  }

  async function handleLearnFromDecisions() {
    setLearning(true);
    setStatus("");
    try {
      const res = await learnPromptFromDecisions(editType, {
        reviewer: currentUser,
        min_examples: 3,
        max_examples: 8,
      });
      setLearnedSystemText(res.proposed.system);
      setLearnedUserText(res.proposed.user);
      setLearnedRationale(res.rationale || "The LLM proposed this prompt based on recent human review decisions.");
      setLearnedExamples(res.examples ?? []);
      setHasLearnedProposal(true);
      setStatus(`Learned prompt proposal created from ${res.example_count} reviewed examples. Review/edit it, then click Save learned prompt.`);
    } catch (err) {
      console.error(err);
      setStatus(err instanceof Error ? err.message : "Could not generate learned prompt update.");
    } finally {
      setLearning(false);
    }
  }

  function useLearnedProposal() {
    setSystemText(learnedSystemText);
    setUserText(learnedUserText);
    setDirty(true);
    setStatus("Learned proposal copied into the editable prompt. Save it before re-running suggestions.");
  }

  async function saveLearnedPrompt() {
    setSaving(true);
    setStatus("");
    try {
      const res = await updatePrompt(editType, {
        system: learnedSystemText,
        user: learnedUserText,
      });
      setPrompt(res.prompt);
      setSystemText(res.prompt.system);
      setUserText(res.prompt.user);
      setDirty(false);
      setStatus("Saved learned prompt. Next, run a small batch to test it before running all.");
    } catch (err) {
      console.error(err);
      setStatus("Could not save the learned prompt.");
    } finally {
      setSaving(false);
    }
  }

  async function runBatch(runAll: boolean) {
    if (runAll && !confirm("RUN ALL can make many OpenAI calls. Only continue if you are confident in the prompt.")) return;
    setRunningBatch(true);
    setStatus("");
    try {
      const res = await rerunBatchWithCurrentPrompt({
        edit_type: editType,
        reviewer: currentUser,
        limit: batchSize,
        run_all: runAll,
      });
      setStatus(`${runAll ? "Run all" : `Batch of ${batchSize}`} complete. Regenerated ${res.count} suggestion(s) with the current prompt.`);
      await onBatchComplete?.();
    } catch (err) {
      console.error(err);
      setStatus(err instanceof Error ? err.message : "Could not re-run suggestions.");
    } finally {
      setRunningBatch(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">LLM Prompt — {prompt?.label ?? editType}</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Edit the prompt, learn from 3–5+ reviewed examples, then test on a small batch before running all.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">Loading prompt...</div>
          ) : (
            <>
              <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <div className="flex gap-2">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                  <p>
                    Guideline: click <strong>Learn from decisions</strong> only after this category has at least 3–5 reviewed examples.
                    After saving a learned prompt, first run a batch of 10. Use <strong>RUN ALL</strong> only if the batch looks accurate.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-gray-900">Current editable prompt</h4>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">System prompt</label>
                    <textarea
                      value={systemText}
                      onChange={(e) => { setSystemText(e.target.value); setDirty(true); }}
                      rows={14}
                      className="w-full text-sm font-mono border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-y leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">User prompt</label>
                    <textarea
                      value={userText}
                      onChange={(e) => { setUserText(e.target.value); setDirty(true); }}
                      rows={5}
                      className="w-full text-sm font-mono border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-y leading-relaxed"
                    />
                    <p className="text-xs text-gray-400 mt-1">{"{candidate}"} is replaced with the node details at scoring time.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-gray-900">LLM-learned proposal</h4>
                    <button
                      onClick={handleLearnFromDecisions}
                      disabled={learning || saving}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <Sparkles size={13} />
                      {learning ? "Learning..." : "Learn from decisions"}
                    </button>
                  </div>

                  {!hasLearnedProposal ? (
                    <div className="border border-dashed border-gray-300 rounded-lg p-6 text-sm text-gray-500 bg-gray-50">
                      No learned proposal yet. Review at least 3–5 suggestions in this category, then click Learn from decisions.
                    </div>
                  ) : (
                    <>
                      <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                        <p className="text-xs font-medium text-indigo-900">Why the prompt changed</p>
                        <p className="text-sm text-indigo-800 mt-1">{learnedRationale}</p>
                        <p className="text-xs text-indigo-600 mt-2">Based on {learnedExamples.length} recent example decision(s).</p>
                      </div>

                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">Proposed system prompt</label>
                        <textarea
                          value={learnedSystemText}
                          onChange={(e) => setLearnedSystemText(e.target.value)}
                          rows={14}
                          className="w-full text-sm font-mono border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-300 resize-y leading-relaxed bg-indigo-50/30"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">Proposed user prompt</label>
                        <textarea
                          value={learnedUserText}
                          onChange={(e) => setLearnedUserText(e.target.value)}
                          rows={5}
                          className="w-full text-sm font-mono border border-indigo-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-300 resize-y leading-relaxed bg-indigo-50/30"
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button onClick={useLearnedProposal} className="px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-gray-700">
                          Copy proposal left
                        </button>
                        <button
                          onClick={saveLearnedPrompt}
                          disabled={saving}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                          <Save size={14} /> Save learned prompt
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-3 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              disabled={saving || loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50"
            >
              <RotateCcw size={14} /> Reset
            </button>
            <div className="inline-flex items-center gap-1.5">
              <button
                onClick={() => runBatch(false)}
                disabled={runningBatch || loading}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50"
              >
                <Play size={14} /> {runningBatch ? "Running..." : "Run batch of"}
              </button>
              <input
                type="number"
                min={1}
                max={200}
                value={batchSize}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  setBatchSize(Number.isNaN(v) ? 1 : Math.max(1, Math.min(200, v)));
                }}
                disabled={runningBatch || loading}
                className="w-16 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-50"
                title="Number of suggestions to re-run"
              />
            </div>
            <button
              onClick={() => runBatch(true)}
              disabled={runningBatch || loading || !isAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-red-300 bg-white hover:bg-red-50 text-red-700 disabled:opacity-50"
              title={isAdmin ? "Run all suggestions in this category" : "Admin only"}
            >
              RUN ALL (only if confident)
            </button>
          </div>

          <div className="flex items-center gap-3">
            {status && <span className="text-xs text-gray-500 max-w-sm">{status}</span>}
            <button
              onClick={handleSave}
              disabled={saving || loading || !dirty}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              <Save size={14} /> {saving ? "Saving..." : "Save current prompt"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
