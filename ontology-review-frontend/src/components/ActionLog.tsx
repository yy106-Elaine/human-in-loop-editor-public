import { useEffect, useState } from "react";
import { History, Search } from "lucide-react";
import { getActionLog } from "../api/ontologyApi";

interface LogEntry {
  id?: string;
  timestamp?: string;
  node_id: string;
  action_type: string;
  reviewer?: string;
  notes?: string;
  payload?: Record<string, unknown>;
}

export function ActionLog({
  nodeId,
  refreshKey,
}: {
  nodeId: string | null;
  refreshKey: number;
}) {
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<LogEntry[]>([]);

  useEffect(() => {
    getActionLog(showAll ? undefined : nodeId ?? undefined, query, 50)
      .then((data) => setEntries(data.results ?? []))
      .catch((err) => console.error("Failed to load action log:", err));
  }, [nodeId, showAll, query, refreshKey]);

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <History size={15} className="text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Action Log</h3>
        </div>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-[11px] px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
        >
          {showAll ? "Current node" : "All"}
        </button>
      </div>

      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1.5">
          <Search size={13} className="text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search logs..."
            className="w-full text-xs outline-none"
          />
        </div>
      </div>

      <div className="p-3 space-y-2">
        {entries.length === 0 ? (
          <p className="text-xs text-gray-400 italic">No logged actions yet.</p>
        ) : (
          entries.map((entry, idx) => (
            <div key={entry.id ?? idx} className="border border-gray-200 rounded-lg p-2.5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-gray-900">{entry.action_type}</p>
                  <p className="text-[11px] text-gray-500">{entry.node_id}</p>
                </div>
                <span className="text-[10px] text-gray-400 text-right">
                  {entry.timestamp ? new Date(entry.timestamp).toLocaleString() : ""}
                </span>
              </div>

              {entry.notes && (
                <p className="text-xs text-gray-600 mt-1.5 line-clamp-3">{entry.notes}</p>
              )}

              {entry.payload && Object.keys(entry.payload).length > 0 && (
                <pre className="mt-1.5 text-[10px] bg-gray-50 rounded p-1.5 overflow-x-auto text-gray-500">
                  {JSON.stringify(entry.payload, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
