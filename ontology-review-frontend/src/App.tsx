import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { OntologyTree } from "./components/OntologyTree";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { LoginPage } from "./components/LoginPage";
import { supabase } from "./lib/supabaseClient";
import {
  getGroupedPatterns,
  type PatternCategory,
  type PatternType,
  type UserRole,
} from "./api/editPatternsApi";

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

function getAdminEmails(): string[] {
  return String(import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [categories, setCategories] = useState<PatternCategory[]>([]);
  const [activeTreeFilter, setActiveTreeFilter] = useState<PatternType | "all" | null>(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => setUser(data.session?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setAuthLoading(false));

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    getGroupedPatterns()
      .then((data) => setCategories(data.categories ?? []))
      .catch((err) => {
        console.error("Could not load tree highlights", err);
        setCategories([]);
      });
  }, []);

  const errorHighlights = useMemo(() => buildErrorHighlights(categories), [categories]);

  if (authLoading) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center text-sm text-gray-500">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const currentEmail = user.email ?? "unknown";
  const currentUser =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    currentEmail;

  const currentRole: UserRole = getAdminEmails().includes(currentEmail.toLowerCase())
    ? "admin"
    : "editor";

  const isAdmin = currentRole === "admin";

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
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{currentUser}</p>
            <p className="text-xs text-gray-500">{currentEmail}</p>
          </div>

          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            isAdmin ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
          }`}>
            {isAdmin ? "Admin" : "Editor"}
          </span>

          <button
            onClick={() => supabase.auth.signOut()}
            className="px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Sign out
          </button>
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
                currentUser={currentEmail}
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