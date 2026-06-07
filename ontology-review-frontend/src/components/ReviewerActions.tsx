import { useEffect, useState } from "react";
import {
  Check,
  Wrench,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Pencil,
  GitMerge,
  Trash2,
  CornerUpRight,
  FolderInput,
  GitBranch,
  Sparkles,
} from "lucide-react";
import {
  getCaseMetadata,
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

type Decision = "accept" | "action" | "escalate" | null;
type ActionKind =
  | "rename"
  | "merge"
  | "delete"
  | "add_parent"
  | "place_elsewhere"
  | "split";

//The six action options of Figma. The backendAction must correspond to the backend ReviewActionType.
const ACTION_OPTIONS: {
  kind: ActionKind;
  label: string;
  icon: React.ReactNode;
}[] = [
  { kind: "rename", label: "Rename", icon: <Pencil size={15} /> },
  { kind: "merge", label: "Merge", icon: <GitMerge size={15} /> },
  { kind: "delete", label: "Delete", icon: <Trash2 size={15} /> },
  { kind: "add_parent", label: "Add Parent", icon: <CornerUpRight size={15} /> },
  { kind: "place_elsewhere", label: "Place Elsewhere", icon: <FolderInput size={15} /> },
  { kind: "split", label: "Split", icon: <GitBranch size={15} /> },
];

interface Suggestion {
  id: string;
  title: string;
  body: string;
  confidence: number;
}
const PLACEHOLDER_SUGGESTIONS: Suggestion[] = [
  {
    id: "s1",
    title: "Possible duplicate sense",
    body: "This node may overlap with another synset under a different branch. Review whether the two senses should be merged or kept distinct.",
    confidence: 0.85,
  },
  {
    id: "s2",
    title: "Candidate for multiple inheritance",
    body: "The concept appears to belong under more than one parent. Consider adding an additional inheritance path.",
    confidence: 0.62,
  },
];

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
        <span>Confidence</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function ReviewerActions({
  nodeId,
  apiConnected = false,
}: {
  nodeId: string;
  apiConnected?: boolean;
}) {
  const [metadata, setMetadata] = useState<CaseMetadata | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [decision, setDecision] = useState<Decision>(null);
  const [actionKind, setActionKind] = useState<ActionKind | null>(null);
  const [comment, setComment] = useState("");

  // When switching nodes, reset the form and re-fetch the metadata
  useEffect(() => {
    setDecision(null);
    setActionKind(null);
    setComment("");
    setStatusMessage("");
    getCaseMetadata(nodeId)
      .then(setMetadata)
      .catch((err) => console.error("Failed to load metadata:", err));
  }, [nodeId]);

  async function submitToBackend(actionType: string, payload = {}) {
    try {
      const result = await submitReviewerAction(
        nodeId,
        actionType,
        comment,
        payload
      );
      setStatusMessage(result.message ?? "Action submitted.");
    } catch (err) {
      console.error(err);
      setStatusMessage("Action failed. Check backend connection.");
    }
  }

  function handleAccept() {
    setDecision("accept");
    setActionKind(null);
    submitToBackend("accept");
  }

  function handleEscalate() {
    setDecision("escalate");
    setActionKind(null);
    //The submission of "escalate" is located in the "Submit" button below (a comment is required)
  }

  async function handleSubmitAction() {
    if (!actionKind) return;
    // Some actions require additional payloads. For now, we will use placeholder values. 
    const payload: Record<string, string> = {};
    if (actionKind === "rename") payload.new_label = comment || "(unspecified)";
    if (actionKind === "merge") payload.target_node_id = "(unspecified)";
    if (actionKind === "add_parent") payload.parent_node_id = "(unspecified)";
    if (actionKind === "place_elsewhere") payload.target_parent_id = "(unspecified)";
    await submitToBackend(actionKind, payload);
  }

  async function handleSubmitEscalation() {
    await submitToBackend("escalate");
  }

  const baseBtn =
    "w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left";

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          AI Suggestions &amp; Reviewer Actions
        </h2>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${
            apiConnected
              ? "bg-emerald-50 text-emerald-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          <Sparkles size={10} />
          {apiConnected ? "live AI" : "offline"}
        </span>
      </div>

      {/* AI SUGGESTIONS */}
      <div className="p-4 border-b border-gray-200">
        <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-3">
          AI Suggestions
        </div>
        <div className="space-y-3">
          {PLACEHOLDER_SUGGESTIONS.map((s) => (
            <div key={s.id} className="border border-gray-200 rounded-lg p-3.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-900">{s.title}</p>
                <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">
                  AI
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                {s.body}
              </p>
              <ConfidenceBar value={s.confidence} />
            </div>
          ))}
          {!apiConnected && (
            <p className="text-[11px] text-gray-400 italic">
              Showing sample suggestions. Connect an Anthropic API key to
              generate live ones.
            </p>
          )}
        </div>
      </div>

      {/* REVIEWER DECISION*/}
      <div className="p-4 space-y-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-1">
          Reviewer Decision
        </div>

        {/* Accept */}
        <button
          onClick={handleAccept}
          className={`${baseBtn} ${
            decision === "accept"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <Check size={16} />
          Accept
        </button>

        {/* Action*/}
        <button
          onClick={() =>
            setDecision((d) => (d === "action" ? null : "action"))
          }
          className={`${baseBtn} justify-between ${
            decision === "action"
              ? "bg-gray-200 text-gray-900"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Wrench size={16} />
            Action
          </span>
          {decision === "action" ? (
            <ChevronUp size={15} />
          ) : (
            <ChevronDown size={15} />
          )}
        </button>

        {decision === "action" && (
          <div className="pt-1 pb-1 grid grid-cols-2 gap-2">
            {ACTION_OPTIONS.map((opt) => (
              <button
                key={opt.kind}
                onClick={() => setActionKind(opt.kind)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                  actionKind === opt.kind
                    ? "border-gray-900 bg-gray-50 text-gray-900"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* Escalate */}
        <button
          onClick={handleEscalate}
          className={`${baseBtn} ${
            decision === "escalate"
              ? "border border-amber-300 bg-amber-50 text-amber-900"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <AlertTriangle size={16} />
          Escalate
        </button>
      </div>

      {/* COMMENT + Submit*/}
      {(decision === "escalate" ||
        (decision === "action" && actionKind)) && (
        <div className="px-4 pb-2">
          <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-2">
            Comment
            <span className="ml-1 normal-case text-gray-400">
              — why this {decision === "escalate" ? "escalation" : "change"}?
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder={
              decision === "escalate"
                ? "Explain what needs discussion…"
                : "Explain the reasoning for this change…"
            }
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
          <button
            disabled={!comment.trim()}
            onClick={
              decision === "escalate"
                ? handleSubmitEscalation
                : handleSubmitAction
            }
            className="mt-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            Submit {decision === "escalate" ? "Escalation" : "Change"}
          </button>
        </div>
      )}

      {/* Accept */}
      {decision === "accept" && (
        <div className="px-4 pb-2 text-sm text-gray-600 flex items-center gap-2">
          <Check size={15} className="text-gray-900" />
          Marked as accepted.
        </div>
      )}

      {statusMessage && (
        <p className="px-4 pb-2 text-xs text-gray-600">{statusMessage}</p>
      )}

      {/* CASE METADATA */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Case Metadata
        </h3>
        <div className="space-y-2 text-xs text-gray-600">
          <MetadataRow label="Review ID:" value={metadata?.review_id ?? "Loading..."} mono />
          <MetadataRow label="Submitted:" value={metadata?.submitted ?? "Loading..."} />
          <MetadataRow label="AI Confidence:" value={metadata?.ai_confidence ?? "Loading..."} />
          <MetadataRow label="Complexity:" value={metadata?.complexity ?? "Loading..."} />
          <MetadataRow label="Reviewer:" value={metadata?.reviewer ?? "Loading..."} />
        </div>
      </div>
    </div>
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