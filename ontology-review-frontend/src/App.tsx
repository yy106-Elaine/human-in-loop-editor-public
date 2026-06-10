import { useState } from "react";
import { OntologyTree } from "./components/OntologyTree";
import { SemanticReview } from "./components/SemanticReview";
import { ReviewerActions } from "./components/ReviewerActions";
import { DiffSimulator } from "./components/DiffSimulator";
import { ActionLog } from "./components/ActionLog";
import { NodeLookup } from "./components/NodeLookup";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { PrinciplesPage } from "./components/PrinciplesPage";

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [connected, setConnected] = useState(false);
  const [logRefreshKey, setLogRefreshKey] = useState(0);
  const [centerTab, setCenterTab] = useState<
    "semantic" | "diff" | "patterns" | "principles"
  >("semantic");
  const [currentAction, setCurrentAction] = useState<{
    actionType: string;
    payload: Record<string, unknown>;
  }>({ actionType: "", payload: {} });

  function handleActionComplete() {
    setLogRefreshKey((v) => v + 1);
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Ontology Engineering Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-0.5">
          Human-in-the-Loop AI Semantic Review System
        </p>
      </header>

      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <NodeLookup onSelectNode={setSelectedNodeId} />

        <label className="text-sm text-gray-600 whitespace-nowrap ml-auto">
          Anthropic API key
        </label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => {
            setApiKey(e.target.value);
            setConnected(false);
          }}
          placeholder="sk-ant-…"
          className="w-72 text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={() => setConnected(apiKey.trim().length > 0)}
          className="px-4 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
        >
          Connect
        </button>
        {connected ? (
          <span className="text-sm text-emerald-700">✓ Live AI enabled</span>
        ) : (
          <span className="text-sm text-gray-500">Not connected</span>
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-cols-[280px_1fr_360px] grid-rows-[minmax(0,1fr)]">
          <div className="min-h-0 overflow-hidden">
            <OntologyTree onNodeSelect={setSelectedNodeId} />
          </div>

          <div className="min-h-0 overflow-hidden flex flex-col bg-white border-l border-gray-200">
            <div className="shrink-0 flex border-b border-gray-200 overflow-x-auto">
              <button
                onClick={() => setCenterTab("semantic")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  centerTab === "semantic"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Semantic Review
              </button>

              <button
                onClick={() => setCenterTab("diff")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  centerTab === "diff"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Review Log
              </button>

              <button
                onClick={() => setCenterTab("patterns")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  centerTab === "patterns"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Edit Patterns
              </button>

              <button
                onClick={() => setCenterTab("principles")}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                  centerTab === "principles"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Principles
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              {centerTab === "patterns" ? (
                <EditPatternsPage onActionComplete={handleActionComplete} />
              ) : centerTab === "principles" ? (
                <PrinciplesPage />
              ) : !selectedNodeId ? (
                <div className="h-full flex items-center justify-center text-sm text-gray-500">
                  Select a node from the tree or lookup bar to review.
                </div>
              ) : centerTab === "semantic" ? (
                <SemanticReview nodeId={selectedNodeId} />
              ) : (
                <div className="h-full flex flex-col overflow-hidden">
                  <div className="flex-1 min-h-0 overflow-y-auto border-b border-gray-200">
                    <DiffSimulator
                      nodeId={selectedNodeId}
                      actionType={currentAction.actionType}
                      payload={currentAction.payload}
                    />
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <ActionLog nodeId={selectedNodeId} refreshKey={logRefreshKey} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="min-h-0 overflow-hidden">
            <ReviewerActions
              nodeId={selectedNodeId ?? ""}
              apiConnected={connected}
              apiKey={apiKey}
              onActionComplete={handleActionComplete}
              onActionChange={(actionType, payload) =>
                setCurrentAction({ actionType, payload })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}