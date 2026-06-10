import { useEffect, useState, type ReactNode } from "react";
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
  X,
} from "lucide-react";
import {
  decideAISuggestion,
  getAISuggestions,
  getCaseMetadata,
  getStoredAISuggestions,
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

const ACTION_OPTIONS: {
  kind: ActionKind;
  label: string;
  icon: ReactNode;
  helper: string;
  requiredField?: {
    name: string;
    label: string;
    placeholder: string;
  };
}[] = [
  {
    kind: "rename",
    label: "Rename",
    icon: <Pencil size={15} />,
    helper: "Suggest a clearer disambiguated label.",
    requiredField: {
      name: "new_label",
      label: "New label",
      placeholder: "e.g. school_building",
    },
  },
  {
    kind: "merge",
    label: "Merge",
    icon: <GitMerge size={15} />,
    helper: "Merge this node with another existing node.",
    requiredField: {
      name: "target_node_id",
      label: "Target node ID",
      placeholder: "e.g. school.n.01",
    },
  },
  {
    kind: "delete",
    label: "Delete",
    icon: <Trash2 size={15} />,
    helper: "Flag this node for deletion review.",
  },
  {
    kind: "add_parent",
    label: "Add Parent",
    icon: <CornerUpRight size={15} />,
    helper: "Add an additional parent / inheritance path.",
    requiredField: {
      name: "parent_node_id",
      label: "Additional parent ID",
      placeholder: "e.g. building.n.01",
    },
  },
  {
    kind: "place_elsewhere",
    label: "Place Elsewhere",
    icon: <FolderInput size={15} />,
    helper: "Move this node under a better parent.",
    requiredField: {
      name: "target_parent_id",
      label: "New parent ID",
      placeholder: "e.g. structure.n.01",
    },
  },
  {
    kind: "split",
    label: "Split",
    icon: <GitBranch size={15} />,
    helper: "Split an overloaded concept into clearer senses.",
  },
];

interface Suggestion {
  id: string;
  node_id?: string;
  type?: string;
  title: string;
  body: string;
  confidence: number;
  status?: "pending" | "approved" | "rejected";
  decision_feedback?: string;
}

interface ReviewerActionsProps {
  nodeId: string;
  apiConnected?: boolean;
  apiKey?: string;
  onActionComplete?: () => void;
  onActionChange?: (actionType: string, payload: Record<string, unknown>) => void;
}

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-[11px] text-gray-500 mb-1">
        <span>Confidence</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ReviewerActions({
  nodeId,
  apiConnected = false,
  apiKey = "",
  onActionComplete,
  onActionChange,
}: ReviewerActionsProps) {
  const [metadata, setMetadata] = useState<CaseMetadata | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const [decision, setDecision] = useState<Decision>(null);
  const [actionKind, setActionKind] = useState<ActionKind | null>(null);
  const [comment, setComment] = useState("");
  const [fieldValue, setFieldValue] = useState("");

  const [aiSuggestions, setAiSuggestions] = useState<Suggestion[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");
  const [feedbackBySuggestion, setFeedbackBySuggestion] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!nodeId) return;

    setDecision(null);
    setActionKind(null);
    setComment("");
    setFieldValue("");
    setStatusMessage("");
    setAiError("");

    getCaseMetadata(nodeId)
      .then(setMetadata)
      .catch((err) => console.error("Failed to load metadata:", err));

    getStoredAISuggestions(nodeId)
      .then((data) => setAiSuggestions(data.suggestions ?? []))
      .catch(() => setAiSuggestions([]));
  }, [nodeId]);

  useEffect(() => {
    if (!nodeId || !apiConnected || !apiKey) return;

    setLoadingAI(true);
    setAiError("");
    getAISuggestions(nodeId, apiKey)
      .then((data) => setAiSuggestions(data.suggestions ?? []))
      .catch((err) => {
        console.error("Failed to load AI suggestions:", err);
        setAiError("Live AI suggestion failed. Check API key and backend logs.");
      })
      .finally(() => setLoadingAI(false));
  }, [nodeId, apiConnected, apiKey]);

  async function submitToBackend(actionType: string, payload: Record<string, unknown> = {}) {
    if (!nodeId) return;

    try {
      const result = await submitReviewerAction(nodeId, actionType, comment, payload);
      setStatusMessage(result.message ?? "Action submitted.");
      onActionComplete?.();
    } catch (err) {
      console.error(err);
      setStatusMessage("Action failed. Check required fields/backend connection.");
    }
  }

  // Notify parent (App) of the currently selected action so the Diff preview can react.
  useEffect(() => {
    if (!onActionChange) return;
    if (decision === "action" && actionKind) {
      const selected = ACTION_OPTIONS.find((a) => a.kind === actionKind);
      const payload: Record<string, unknown> = {};
      if (selected?.requiredField) {
        payload[selected.requiredField.name] = fieldValue.trim();
      }
      onActionChange(actionKind, payload);
    } else {
      onActionChange("", {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [decision, actionKind, fieldValue]);

  async function handleAccept() {
    setDecision("accept");
    setActionKind(null);
    await submitToBackend("accept", { source: "manual_accept" });
  }

  function handleEscalate() {
    setDecision("escalate");
    setActionKind(null);
  }

  async function handleSubmitAction() {
    if (!actionKind) return;

    const selected = ACTION_OPTIONS.find((a) => a.kind === actionKind);
    const payload: Record<string, string> = {};
    if (selected?.requiredField) {
      payload[selected.requiredField.name] = fieldValue.trim();
    }
    payload.reason = comment.trim();

    await submitToBackend(actionKind, payload);
  }

  async function handleSubmitEscalation() {
    await submitToBackend("escalate", { reason: comment.trim() });
  }

  async function handleSuggestionDecision(suggestion: Suggestion, decisionType: "approve" | "reject") {
    if (!nodeId) return;

    const feedback = feedbackBySuggestion[suggestion.id] ?? "";
    try {
      const result = await decideAISuggestion(nodeId, suggestion.id, decisionType, feedback);
      setStatusMessage(result.message ?? `Suggestion ${decisionType}d.`);
      setAiSuggestions((prev) =>
        prev.map((s) =>
          s.id === suggestion.id
            ? { ...s, status: decisionType === "approve" ? "approved" : "rejected", decision_feedback: feedback }
            : s
        )
      );
      onActionComplete?.();
    } catch (err) {
      console.error(err);
      setStatusMessage("Suggestion decision failed. Check backend.");
    }
  }

  const selectedAction = ACTION_OPTIONS.find((a) => a.kind === actionKind);
  const actionMissingRequiredField = !!selectedAction?.requiredField && !fieldValue.trim();

  const baseBtn =
    "w-full flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left";

  if (!nodeId) {
    return (
      <div className="h-full bg-white border-l border-gray-200 p-4 text-sm text-gray-500">
        Select a node to review actions.
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">
          AI Suggestions &amp; Reviewer Actions
        </h2>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded inline-flex items-center gap-1 ${
            apiConnected ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
          }`}
        >
          <Sparkles size={10} />
          {apiConnected ? "live AI" : "offline"}
        </span>
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-3">
          AI Suggested Actions
        </div>

        {loadingAI && (
          <p className="text-[11px] text-gray-400 italic">Generating live AI suggestions…</p>
        )}
        {aiError && <p className="text-[11px] text-red-600 mb-2">{aiError}</p>}

        <div className="space-y-3">
          {!loadingAI && aiSuggestions.length === 0 && (
            <div className="border border-dashed border-gray-200 rounded-lg p-3 text-xs text-gray-500">
              No AI suggestions yet. Connect an Anthropic API key to generate suggestions for this node.
            </div>
          )}

          {aiSuggestions.map((s) => {
            const status = s.status ?? "pending";
            return (
              <div key={s.id} className="border border-gray-200 rounded-lg p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.title}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-0.5">
                      {s.type ?? "AI"} · {status}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 mt-0.5">AI</span>
                </div>

                <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{s.body}</p>
                <ConfidenceBar value={s.confidence} />

                <textarea
                  value={feedbackBySuggestion[s.id] ?? ""}
                  onChange={(e) =>
                    setFeedbackBySuggestion((prev) => ({ ...prev, [s.id]: e.target.value }))
                  }
                  rows={2}
                  disabled={status !== "pending"}
                  placeholder="Feedback for accepting/rejecting this suggestion…"
                  className="mt-3 w-full text-xs border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none disabled:bg-gray-50"
                />

                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    disabled={status !== "pending"}
                    onClick={() => handleSuggestionDecision(s, "approve")}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                  >
                    Approve Suggestion
                  </button>
                  <button
                    disabled={status !== "pending"}
                    onClick={() => handleSuggestionDecision(s, "reject")}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-1">
          Manual Reviewer Decision
        </div>

        <button
          onClick={handleAccept}
          className={`${baseBtn} ${
            decision === "accept"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <Check size={16} />
          Accept Current Placement
        </button>

        <button
          onClick={() => setDecision((d) => (d === "action" ? null : "action"))}
          className={`${baseBtn} justify-between ${
            decision === "action"
              ? "bg-gray-200 text-gray-900"
              : "bg-gray-100 text-gray-900 hover:bg-gray-200"
          }`}
        >
          <span className="flex items-center gap-2.5">
            <Wrench size={16} />
            Choose Action
          </span>
          {decision === "action" ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {decision === "action" && (
          <div className="pt-1 pb-1 grid grid-cols-2 gap-2">
            {ACTION_OPTIONS.map((opt) => (
              <button
                key={opt.kind}
                onClick={() => {
                  setActionKind(opt.kind);
                  setFieldValue("");
                  setComment("");
                }}
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

      {(decision === "escalate" || (decision === "action" && actionKind)) && (
        <div className="px-4 pb-2">
          {selectedAction?.requiredField && (
            <>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-gray-500 mb-2">
                {selectedAction.requiredField.label}
              </label>
              <input
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                placeholder={selectedAction.requiredField.placeholder}
                className="mb-2 w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </>
          )}

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
                : selectedAction?.helper ?? "Explain the reasoning for this change…"
            }
            className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
          <button
            disabled={!comment.trim() || actionMissingRequiredField}
            onClick={decision === "escalate" ? handleSubmitEscalation : handleSubmitAction}
            className="mt-2 w-full px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-900 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-800"
          >
            Submit {decision === "escalate" ? "Escalation" : selectedAction?.label ?? "Change"}
          </button>
        </div>
      )}

      {decision === "accept" && (
        <div className="px-4 pb-2 text-sm text-gray-600 flex items-center gap-2">
          <Check size={15} className="text-gray-900" />
          Marked as accepted.
        </div>
      )}

      {statusMessage && <p className="px-4 pb-2 text-xs text-gray-600">{statusMessage}</p>}

      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Case Metadata</h3>
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
