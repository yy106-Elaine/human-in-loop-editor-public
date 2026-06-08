import { useState, useMemo } from "react";
import { OntologyTree } from "./components/OntologyTree";
import { SemanticReview } from "./components/SemanticReview";
import { ReviewerActions } from "./components/ReviewerActions";
import { DiffSimulator } from "./components/DiffSimulator";
import { getNodeContext } from "./components/ontologyLookup";

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [connected, setConnected] = useState(false);

  const context = useMemo(() => getNodeContext(selectedNodeId), [selectedNodeId]);

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Ontology Engineering Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-0.5">
          Human-in-the-Loop AI Semantic Review System
        </p>
      </header>

      {/* API key bar */}
      <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-3 flex items-center gap-3">
        <label className="text-sm text-gray-600 whitespace-nowrap">
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
          className="flex-1 max-w-md text-sm border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button
          onClick={() => setConnected(apiKey.trim().length > 0)}
          className="px-4 py-1.5 rounded-md text-sm font-medium border border-gray-300 bg-gray-100 text-gray-900 hover:bg-gray-200"
        >
          Connect
        </button>
        {connected ? (
          <span className="text-sm text-emerald-700">
            ✓ Connected — live AI suggestions enabled
          </span>
        ) : (
          <span className="text-sm text-gray-500">Not connected</span>
        )}
      </div>

      {/* Main layout */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-cols-[280px_1fr_300px] grid-rows-[1fr_280px]">
          <div className="row-span-2 min-h-0 overflow-hidden">
            <OntologyTree onNodeSelect={setSelectedNodeId} />
          </div>

          <div className="min-h-0 overflow-hidden">
            {selectedNodeId ? (
              <SemanticReview nodeId={selectedNodeId} />
            ) : (
              <div className="h-full bg-white flex items-center justify-center text-sm text-gray-500">
                Select a node from the tree to review.
              </div>
            )}
          </div>

          <div className="row-span-2 min-h-0 overflow-hidden">
            <ReviewerActions
            nodeId={selectedNodeId ?? ""}
            apiConnected={connected}
            apiKey={apiKey}
          />
          </div>

          <div className="min-h-0 overflow-hidden">
            <DiffSimulator nodeId={selectedNodeId ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
