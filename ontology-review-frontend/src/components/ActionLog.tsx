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

const ACTION_LABELS: Record<string, string> = {
  accept: "Accepted",
  rename: "Renamed",
  merge: "Merged",
  delete: "Deleted",
  add_parent: "Added parent",
  place_elsewhere: "Moved",
  split: "Split",
  escalate: "Escalated",
  ai_suggestion_approve: "Approved AI suggestion",
  ai_suggestion_reject: "Rejected AI suggestion",
};

function prettyAction(raw: string): string {
  return (
    ACTION_LABELS[raw] ??
    raw.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// Pull a short human-readable summary out of the payload, instead of dumping JSON.
function payloadSummary(payload?: Record<string, unknown>): string | null {
  if (!payload) return null;
  const p = payload as Record<string, unknown>;
  if (typeof p.suggestion_title === "string") return p.suggestion_title;
  if (typeof p.new_label === "string") return `→ "${p.new_label}"`;
  if (typeof p.target_node_id === "string") return `with ${p.target_node_id}`;
  if (typeof p.parent_node_id === "string") return `under ${p.parent_node_id}`;
  if (typeof p.target_parent_id === "string") return `to ${p.target_parent_id}`;
  return null;
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
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-900">
                    {prettyAction(entry.action_type)}
                  </p>
                  <p className="text-[11px] text-gray-500 font-mono truncate">
                    {entry.node_id}
                  </p>
                </div>
                <span className="text-[10px] text-gray-400 text-right shrink-0">
                  {entry.timestamp
                    ? new Date(entry.timestamp).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              {payloadSummary(entry.payload) && (
                <p className="text-xs text-gray-700 mt-1.5 line-clamp-2">
                  {payloadSummary(entry.payload)}
                </p>
              )}

              {entry.notes && (
                <p className="text-[11px] text-gray-500 mt-1 line-clamp-3 italic">
                  “{entry.notes}”
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
