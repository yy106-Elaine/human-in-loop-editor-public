import { useState } from "react";
import { OntologyTree } from "./components/OntologyTree";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { PrinciplesPage } from "./components/PrinciplesPage";

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [page, setPage] = useState<"editor" | "principles">("editor");

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900">
          Ontology Engineering Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-0.5">
          Human-in-the-Loop Ontology Editing System
        </p>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-h-0 overflow-hidden bg-white border-r border-gray-200">
            <OntologyTree onNodeSelect={setSelectedNodeId} />
          </aside>

          <main className="min-h-0 overflow-hidden flex flex-col bg-gray-50">
            <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {page === "editor" ? "Editor" : "Principles"}
                </h2>
                <p className="text-sm text-gray-600 mt-0.5">
                  {page === "editor"
                    ? "Review detected ontology edit patterns by issue type."
                    : "Review reusable principles derived from concrete ontology edits."}
                </p>
              </div>

              <div className="flex items-center gap-1 rounded-lg bg-gray-100 p-1">
                <button
                  onClick={() => setPage("editor")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    page === "editor"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Editor
                </button>

                <button
                  onClick={() => setPage("principles")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    page === "principles"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Principles
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              {page === "editor" ? (
                <EditPatternsPage selectedNodeId={selectedNodeId} />
              ) : (
                <PrinciplesPage />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}