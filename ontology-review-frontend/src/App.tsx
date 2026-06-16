import { useEffect, useState } from "react";
import { OntologyTree } from "./components/OntologyTree";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { PrinciplesPage } from "./components/PrinciplesPage";

const DEFAULT_USERS = ["Elaine", "Sophia"];

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [page, setPage] = useState<"editor" | "principles">("editor");

  // user list — starts with defaults, merges any saved custom names
  const [users, setUsers] = useState<string[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hil_users") || "[]");
      const merged = [...DEFAULT_USERS];
      for (const u of saved) if (!merged.includes(u)) merged.push(u);
      return merged;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // currently selected user — restored from localStorage if present
  const [currentUser, setCurrentUser] = useState<string>(
    () => localStorage.getItem("hil_current_user") || DEFAULT_USERS[0]
  );

  // persist current user whenever it changes
  useEffect(() => {
    localStorage.setItem("hil_current_user", currentUser);
  }, [currentUser]);

  // persist any custom (non-default) users whenever the list changes
  useEffect(() => {
    const custom = users.filter((u) => !DEFAULT_USERS.includes(u));
    localStorage.setItem("hil_users", JSON.stringify(custom));
  }, [users]);

  function handleUserSelect(value: string) {
    if (value === "__add__") {
      const name = window.prompt("Enter your name:")?.trim();
      if (name) {
        setUsers((prev) => (prev.includes(name) ? prev : [...prev, name]));
        setCurrentUser(name);
      }
      return;
    }
    setCurrentUser(value);
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      <header className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Ontology Engineering Dashboard
          </h1>
          <p className="text-sm text-gray-600 mt-0.5">
            Human-in-the-Loop Ontology Editing System
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">User:</span>
            <select
              value={currentUser}
              onChange={(e) => handleUserSelect(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              {users.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
              <option value="__add__">+ Add name…</option>
            </select>
          </label>

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
      </header>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-h-0 overflow-hidden bg-white border-r border-gray-200">
            <OntologyTree onNodeSelect={setSelectedNodeId} />
          </aside>

          <main className="min-h-0 overflow-hidden flex flex-col bg-gray-50">
            <div className="flex-1 min-h-0 overflow-hidden">
              {page === "editor" ? (
                <EditPatternsPage
                  selectedNodeId={selectedNodeId}
                  currentUser={currentUser}
                />
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