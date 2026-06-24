import { useEffect, useState } from "react";
import { X, RotateCcw, Save } from "lucide-react";
import {
  getPrompts,
  updatePrompt,
  resetPrompt,
  toPromptEditType,
  type EditablePrompt,
  type PromptEditType,
  type PatternType,
} from "../api/editPatternsApi";

// The "All" tab and the "inheritance" frontend key both need handling.
// We accept a PatternType and map it to the backend prompt key.
export function PromptEditor({
  patternType,
  onClose,
}: {
  patternType: PatternType;
  onClose: () => void;
}) {
  const editType: PromptEditType = toPromptEditType(patternType);

  const [prompt, setPrompt] = useState<EditablePrompt | null>(null);
  const [systemText, setSystemText] = useState("");
  const [userText, setUserText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [dirty, setDirty] = useState(false);

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      const data = await getPrompts();
      const p = data.prompts[editType];
      setPrompt(p);
      setSystemText(p.system);
      setUserText(p.user);
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
      setStatus("Saved. Note: existing cached AI scores were NOT re-run.");
    } catch (err) {
      console.error(err);
      setStatus("Could not save the prompt.");
    } finally {
      setSaving(false);
    }
  }

  async function handleReset() {
    if (!confirm("Reset this prompt back to its default? Your edits will be lost.")) {
      return;
    }
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              LLM Prompt — {prompt?.label ?? editType}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              This is the exact prompt sent to the LLM when scoring this category.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">
              Loading prompt...
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">
                  System prompt
                </label>
                <textarea
                  value={systemText}
                  onChange={(e) => {
                    setSystemText(e.target.value);
                    setDirty(true);
                  }}
                  rows={14}
                  className="w-full text-sm font-mono border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-y leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-gray-500 mb-1.5">
                  User prompt
                </label>
                <textarea
                  value={userText}
                  onChange={(e) => {
                    setUserText(e.target.value);
                    setDirty(true);
                  }}
                  rows={4}
                  className="w-full text-sm font-mono border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-y leading-relaxed"
                />
                <p className="text-xs text-gray-400 mt-1">
                  {"{candidate}"} is replaced with the node's details at scoring time.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleReset}
            disabled={saving || loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            <RotateCcw size={14} />
            Reset to default
          </button>

          <div className="flex items-center gap-3">
            {status && (
              <span className="text-xs text-gray-500 max-w-xs">{status}</span>
            )}
            <button
              onClick={handleSave}
              disabled={saving || loading || !dirty}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50"
            >
              <Save size={14} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}