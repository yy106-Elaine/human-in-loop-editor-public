import { useEffect, useMemo, useState } from "react";
import { OntologyTree } from "./components/OntologyTree";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { getGroupedPatterns, type PatternCategory, type PatternType, type UserRole } from "./api/editPatternsApi";

const DEFAULT_USERS = ["Alice", "Elaine", "Sophia"];
const DEFAULT_ADMIN_USERS = ["Alice"];

export type ErrorHighlightMap = Record<string, PatternType>;

function buildErrorHighlights(categories: PatternCategory[]): ErrorHighlightMap {
  const highlights: ErrorHighlightMap = {};

  for (const category of categories) {
    for (const suggestion of category.suggestions ?? []) {
      if (suggestion.node_id) highlights[suggestion.node_id] = suggestion.pattern_type;

      for (const node of suggestion.nodes ?? []) {
        highlights[node.id] = suggestion.pattern_type;
      }
    }
  }

  return highlights;
}

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
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
  const [currentUser, setCurrentUser] = useState<string>(
    () => localStorage.getItem("hil_current_user") || DEFAULT_USERS[0]
  );
  const [roleOverrides, setRoleOverrides] = useState<Record<string, UserRole>>(() => {
    try {
      return JSON.parse(localStorage.getItem("hil_user_roles") || "{}");
    } catch {
      return {};
    }
  });

  const currentRole: UserRole =
    roleOverrides[currentUser] ??
    (DEFAULT_ADMIN_USERS.includes(currentUser) ? "admin" : "editor");
  const isAdmin = currentRole === "admin";

  const [categories, setCategories] = useState<PatternCategory[]>([]);
  const [activeTreeFilter, setActiveTreeFilter] = useState<PatternType | "all" | null>(null);

  useEffect(() => {
    localStorage.setItem("hil_current_user", currentUser);
  }, [currentUser]);

  useEffect(() => {
    const custom = users.filter((u) => !DEFAULT_USERS.includes(u));
    localStorage.setItem("hil_users", JSON.stringify(custom));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("hil_user_roles", JSON.stringify(roleOverrides));
  }, [roleOverrides]);

  useEffect(() => {
    getGroupedPatterns()
      .then((data) => setCategories(data.categories ?? []))
      .catch((err) => console.error("Could not load tree highlights", err));
  }, []);

  const errorHighlights = useMemo(() => buildErrorHighlights(categories), [categories]);

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

  function handleRoleChange(value: UserRole) {
    setRoleOverrides((prev) => ({ ...prev, [currentUser]: value }));
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

          <label className="flex items-center gap-2 text-sm text-gray-600">
            <span className="text-gray-400">Role:</span>
            <select
              value={currentRole}
              onChange={(e) => handleRoleChange(e.target.value as UserRole)}
              className="rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-400"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {isAdmin ? (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-900 text-white">
              Admin controls enabled
            </span>
          ) : (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">
              Editor review mode
            </span>
          )}
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="h-full grid grid-cols-[320px_minmax(0,1fr)]">
          <aside className="min-h-0 overflow-hidden bg-white border-r border-gray-200">
            <OntologyTree
              onNodeSelect={setSelectedNodeId}
              errorHighlights={errorHighlights}
              activeErrorFilter={activeTreeFilter}
              onErrorFilterChange={setActiveTreeFilter}
            />
          </aside>

          <main className="min-h-0 overflow-hidden flex flex-col bg-gray-50">
            <div className="flex-1 min-h-0 overflow-hidden">
              <EditPatternsPage
                selectedNodeId={selectedNodeId}
                currentUser={currentUser}
                isAdmin={isAdmin}
                externalCategories={categories}
                onCategoriesReloaded={setCategories}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
