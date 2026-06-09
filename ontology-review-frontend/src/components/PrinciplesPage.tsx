import { useEffect, useState } from "react";
import { BookOpen, Plus, RefreshCw } from "lucide-react";
import { addPrinciple, getEditPatternDecisions, getPrinciples } from "../api/editPatternsApi";

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

export function PrinciplesPage() {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [decisions, setDecisions] = useState<DecisionRecord[]>([]);
  const [newPrinciple, setNewPrinciple] = useState("");
  const [status, setStatus] = useState("");

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
      await addPrinciple(newPrinciple.trim());
      setNewPrinciple("");
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

      <div className="p-6 grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        <div className="space-y-4">
          {principles.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <BookOpen size={18} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed">{p.body}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-gray-100 text-gray-600">source: {p.source}</span>
                    {p.examples?.map((ex) => <span key={ex} className="px-2 py-1 rounded bg-blue-50 text-blue-700">example: {ex}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Add principle manually</h3>
            <textarea value={newPrinciple} onChange={(e) => setNewPrinciple(e.target.value)} rows={3} placeholder="Example: When duplicate labels use different synsets, prefer disambiguating labels over merging unless context proves the same concept." className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 resize-none" />
            <button onClick={submitPrinciple} disabled={!newPrinciple.trim()} className="mt-2 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white disabled:bg-gray-300">
              <Plus size={15} /> Add Principle
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Concrete edits feeding principles</h3>
          {decisions.length === 0 ? (
            <p className="text-sm text-gray-500">No edit-pattern decisions yet. Accept or alter a duplicate/virtual-node suggestion to populate this log.</p>
          ) : (
            <div className="space-y-3">
              {decisions.slice().reverse().map((d) => (
                <div key={d.id} className="border border-gray-200 rounded-lg p-3 text-sm">
                  <div className="flex justify-between gap-2">
                    <span className="font-medium text-gray-900">{d.pattern_id}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600">{d.decision}</span>
                  </div>
                  {d.comment && <p className="text-gray-600 mt-1">{d.comment}</p>}
                  {d.altered_action && <p className="text-gray-500 mt-1 text-xs">altered action: {d.altered_action}</p>}
                  {d.principle_added && <p className="mt-2 text-xs text-blue-700 bg-blue-50 rounded p-2">Added principle: {d.principle_added.body}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
