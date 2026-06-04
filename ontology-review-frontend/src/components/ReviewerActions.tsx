import { useEffect, useState } from "react";
import {
  Check,
  X,
  GitBranch,
  Split,
  GitMerge,
  AlertTriangle,
  BookOpen,
} from "lucide-react";
import {
  getCaseMetadata,
  saveReviewerNotes,
  submitReviewerAction,
} from "../api/ontologyApi";

interface CaseMetadata {
  review_id: string;
  submitted: string;
  ai_confidence: string;
  complexity: string;
  reviewer: string;
  notes?: string;
}

export function ReviewerActions({ nodeId }: { nodeId: string }) {
  const [notes, setNotes] = useState("");
  const [metadata, setMetadata] = useState<CaseMetadata | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    getCaseMetadata(nodeId)
      .then((data) => {
        setMetadata(data);
        setNotes(data.notes ?? "");
      })
      .catch((err) => console.error("Failed to load metadata:", err));
  }, [nodeId]);

  async function handleAction(actionType: string, payload = {}) {
    try {
      const result = await submitReviewerAction(
        nodeId,
        actionType,
        notes,
        payload
      );
      setStatusMessage(result.message ?? "Action submitted.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Action failed. Check backend connection.");
    }
  }

  async function handleSaveNotes() {
    try {
      await saveReviewerNotes(nodeId, notes);
      setStatusMessage("Notes saved.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Failed to save notes.");
    }
  }

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">
          Reviewer Actions
        </h2>
      </div>

      <div className="p-4 space-y-2">
        <ActionButton
          icon={<Check size={16} />}
          label="Approve Edit"
          className="text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => handleAction("approve_edit")}
        />

        <ActionButton
          icon={<X size={16} />}
          label="Reject Edit"
          className="text-gray-700 bg-gray-100 hover:bg-gray-200"
          onClick={() => handleAction("reject_edit")}
        />

        <ActionButton
          icon={<GitBranch size={16} />}
          label="Add Multiple Inheritance"
          className="text-gray-700 bg-purple-50 hover:bg-purple-100 border border-purple-200"
          onClick={() => handleAction("add_multiple_inheritance")}
        />

        <ActionButton
          icon={<Split size={16} />}
          label="Split Node"
          className="text-gray-700 bg-gray-100 hover:bg-gray-200"
          onClick={() => handleAction("split_node")}
        />

        <ActionButton
          icon={<GitMerge size={16} />}
          label="Merge Nodes"
          className="text-gray-700 bg-gray-100 hover:bg-gray-200"
          onClick={() =>
            handleAction("merge_nodes", {
              target_node_id: "school-building",
            })
          }
        />

        <ActionButton
          icon={<AlertTriangle size={16} />}
          label="Escalate Case"
          className="text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200"
          onClick={() => handleAction("escalate_case")}
        />

        <ActionButton
          icon={<BookOpen size={16} />}
          label="Turn Into Rule"
          className="text-gray-700 bg-blue-50 hover:bg-blue-100 border border-blue-200"
          onClick={() =>
            handleAction("turn_into_rule", {
              rule_text:
                "If a concept refers to both an institution and a building, consider multiple inheritance unless task context clearly favors one perspective.",
            })
          }
        />
      </div>

      <div className="p-4 border-t border-gray-200 mt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          Reviewer Notes
        </h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add notes about this case..."
        />

        <button
          onClick={handleSaveNotes}
          className="w-full mt-2 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Save Notes
        </button>

        {statusMessage && (
          <p className="mt-2 text-xs text-gray-600">{statusMessage}</p>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Case Metadata
        </h3>

        <div className="space-y-2 text-xs text-gray-600">
          <MetadataRow
            label="Review ID:"
            value={metadata?.review_id ?? "Loading..."}
            mono
          />
          <MetadataRow
            label="Submitted:"
            value={metadata?.submitted ?? "Loading..."}
          />
          <MetadataRow
            label="AI Confidence:"
            value={metadata?.ai_confidence ?? "Loading..."}
          />
          <MetadataRow
            label="Complexity:"
            value={metadata?.complexity ?? "Loading..."}
          />
          <MetadataRow
            label="Reviewer:"
            value={metadata?.reviewer ?? "Loading..."}
          />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  className,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${className}`}
    >
      {icon}
      {label}
    </button>
  );
}

function MetadataRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex justify-between gap-2">
      <span>{label}</span>
      <span className={`${mono ? "font-mono" : ""} text-gray-900 text-right`}>
        {value}
      </span>
    </div>
  );
}