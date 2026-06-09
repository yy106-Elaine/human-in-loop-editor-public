import { useEffect, useMemo, useState } from "react";
import { Check, GitMerge, Pencil, RefreshCw, Search, Split, X } from "lucide-react";
import { decideEditPattern, getDuplicatePatterns, getVirtualPatterns } from "../api/editPatternsApi";

type Tab = "duplicates" | "virtuals";

interface PatternSuggestion {
  id: string;
  pattern_type: "duplicate" | "virtual";
  title: string;
  label?: string;
  suggested_action: string;
  rationale: string;
  confidence: number;
  nodes?: { id: string; label: string; code?: string | null; parent_label?: string | null; path: string }[];
  synsets?: string[];
  path?: string;
  node_id?: string;
  code?: string | null;
  parent_label?: string | null;
  children_count?: number;
}

export function EditPatternsPage() {
  const [tab, setTab] = useState<Tab>("duplicates");
  const [duplicates, setDuplicates] = useState<PatternSuggestion[]>([]);
  const [virtuals, setVirtuals] = useState<PatternSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  async function load() {
    setLoading(true);
    setStatus("");
    try {
      const [dup, virt] = await Promise.all([getDuplicatePatterns(), getVirtualPatterns()]);
      setDuplicates(dup.suggestions ?? []);
      setVirtuals(virt.suggestions ?? []);
    } catch (err) {
      console.error(err);
      setStatus("Could not load edit patterns. Check backend routes.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const active = tab === "duplicates" ? duplicates : virtuals;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return active;
    return active.filter((p) => JSON.stringify(p).toLowerCase().includes(q));
  }, [active, query]);

  return (
    <div className="h-full bg-gray-50 overflow-hidden flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Edit Pattern Review</h2>
            <p className="text-sm text-gray-600 mt-0.5">Demo examples: duplicate handling and virtual-node handling.</p>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white hover:bg-gray-50">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button onClick={() => setTab("duplicates")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${tab === "duplicates" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Duplicate Handling ({duplicates.length})
          </button>
          <button onClick={() => setTab("virtuals")} className={`px-3 py-1.5 rounded-md text-sm font-medium ${tab === "virtuals" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            Virtual Node Handling ({virtuals.length})
          </button>

          <div className="ml-auto relative">
            <Search size={15} className="absolute left-2.5 top-2.5 text-gray-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search patterns..." className="pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-lg w-72" />
          </div>
        </div>
      </div>

      {status && <div className="px-6 py-2 text-sm text-red-700 bg-red-50 border-b border-red-100">{status}</div>}

      <div className="flex-1 overflow-y-auto p-6">
        {loading ? <p className="text-sm text-gray-500">Loading edit patterns...</p> :
         filtered.length === 0 ? <p className="text-sm text-gray-500">No matching patterns found.</p> :
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filtered.map((pattern) => <PatternCard key={pattern.id} pattern={pattern} />)}
          </div>}
      </div>
    </div>
  );
}

function PatternCard({ pattern }: { pattern: PatternSuggestion }) {
  const [comment, setComment] = useState("");
  const [alteredAction, setAlteredAction] = useState(pattern.suggested_action);
  const [principleUpdate, setPrincipleUpdate] = useState("");
  const [message, setMessage] = useState("");

  async function submit(selected: "approve" | "alter" | "reject") {
    setMessage("");
    try {
      await decideEditPattern(pattern.id, {
        decision: selected,
        comment,
        altered_action: selected === "alter" ? alteredAction : undefined,
        principle_update: principleUpdate,
        payload: { pattern },
      });
      setMessage(`Saved ${selected} decision.`);
    } catch (err) {
      console.error(err);
      setMessage("Save failed. Check backend.");
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-500">{pattern.pattern_type}</div>
          <h3 className="text-base font-semibold text-gray-900 mt-0.5">{pattern.title}</h3>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-blue-50 text-blue-700">{Math.round(pattern.confidence * 100)}%</span>
      </div>

      <div className="mt-3 text-sm text-gray-700 leading-relaxed">{pattern.rationale}</div>

      <div className="mt-3 rounded-lg bg-gray-50 border border-gray-200 p-3">
        <div className="text-xs font-semibold text-gray-700 mb-1">Suggested action</div>
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">
          {iconForAction(pattern.suggested_action)} {humanize(pattern.suggested_action)}
        </div>
      </div>

      {pattern.pattern_type === "duplicate" && pattern.nodes && (
        <div className="mt-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Matching nodes</div>
          <div className="space-y-2">
            {pattern.nodes.map((n) => (
              <div key={n.id} className="text-xs border border-gray-200 rounded-md p-2">
                <div className="font-mono text-gray-900">{n.id}</div>
                <div className="text-gray-600">{n.path}</div>
                {n.code && <div className="text-gray-500">Synset: {n.code}</div>}
              </div>
            ))}
          </div>
        </div>
      )}

      {pattern.pattern_type === "virtual" && (
        <div className="mt-3 text-xs text-gray-600 space-y-1">
          <div><strong>Node:</strong> {pattern.node_id}</div>
          <div><strong>Path:</strong> {pattern.path}</div>
          <div><strong>Children:</strong> {pattern.children_count}</div>
        </div>
      )}

      <div className="mt-4 border-t border-gray-100 pt-4">
        <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={2} placeholder="Human reviewer note..." className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 resize-none" />

        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
          <input value={alteredAction} onChange={(e) => setAlteredAction(e.target.value)} placeholder="Altered action, if changing" className="text-sm border border-gray-300 rounded-lg px-3 py-2" />
          <input value={principleUpdate} onChange={(e) => setPrincipleUpdate(e.target.value)} placeholder="Optional principle update" className="text-sm border border-gray-300 rounded-lg px-3 py-2" />
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <button onClick={() => submit("approve")} className="inline-flex justify-center items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700"><Check size={15} /> Accept</button>
          <button onClick={() => submit("alter")} className="inline-flex justify-center items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800"><Pencil size={15} /> Alter</button>
          <button onClick={() => submit("reject")} className="inline-flex justify-center items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"><X size={15} /> Reject</button>
        </div>

        {message && <div className="mt-2 text-xs text-gray-600">{message}</div>}
      </div>
    </div>
  );
}

function iconForAction(action: string) {
  if (action.includes("merge")) return <GitMerge size={15} />;
  if (action.includes("rename") || action.includes("alter")) return <Pencil size={15} />;
  if (action.includes("split") || action.includes("separate")) return <Split size={15} />;
  return <Check size={15} />;
}

function humanize(value: string) {
  return value.replaceAll("_", " ");
}
