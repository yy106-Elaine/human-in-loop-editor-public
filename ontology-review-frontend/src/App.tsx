import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { OntologyTree } from "./components/OntologyTree";
import { EditPatternsPage } from "./components/EditPatternsPage";
import { PrinciplesPage } from "./components/PrinciplesPage";
import { LoginPage } from "./components/LoginPage";
import { supabase } from "./lib/supabaseClient";
import {
  getPatternHighlights,
  type PatternType,
  type UserRole,
} from "./api/editPatternsApi";
import { getOntologyTree } from "./api/ontologyApi";

export type ErrorHighlightMap = Record<string, PatternType>;

// Lightweight flat node option for ID autocomplete (Alter panel).
export interface NodeOption {
  id: string;
  label: string;
  code: string | null;
  path: string;
}

function getAdminEmails(): string[] {
  return String(import.meta.env.VITE_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [focusNodeIds, setFocusNodeIds] = useState<string[]>([]);
  const [page, setPage] = useState<"editor" | "principles">("editor");
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [errorHighlights, setErrorHighlights] = useState<ErrorHighlightMap>({});
  const [activeTreeFilter, setActiveTreeFilter] = useState<PatternType | "all" | null>(null);
  const [nodeOptions, setNodeOptions] = useState<NodeOption[]>([]);

  // Load the tree once and flatten it for the Alter-panel ID autocomplete.
  useEffect(() => {
    interface BackendNode {
      id: string;
      label: string;
      code: string | null;
      children: BackendNode[];
    }
    getOntologyTree()
      .then((roots: BackendNode[]) => {
        const flat: NodeOption[] = [];
        const walk = (n: BackendNode, trail: string[]) => {
          const path = [...trail, n.label];
          flat.push({ id: n.id, label: n.label, code: n.code, path: path.join(" → ") });
          (n.children ?? []).forEach((c) => walk(c, path));
        };
        roots.forEach((r) => walk(r, []));
        setNodeOptions(flat);
      })
      .catch(() => setNodeOptions([]));
  }, []);

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

  async function refreshTreeHighlights() {
    try {
      const data = await getPatternHighlights();
      setErrorHighlights(data.highlights ?? {});
    } catch (err) {
      console.error("Could not load lightweight tree highlights", err);
      setErrorHighlights({});
    }
  }

  useEffect(() => {
    refreshTreeHighlights();
  }, []);

  const visibleHighlights = useMemo(() => errorHighlights, [errorHighlights]);

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
              errorHighlights={visibleHighlights}
              activeErrorFilter={activeTreeFilter}
              onErrorFilterChange={setActiveTreeFilter}
              focusNodeIds={focusNodeIds}
            />
          </aside>

          <main className="min-h-0 overflow-hidden flex flex-col bg-gray-50">
            <div className="flex-1 min-h-0 overflow-hidden">
              <EditPatternsPage
                selectedNodeId={selectedNodeId}
                currentUser={currentEmail}
                isAdmin={isAdmin}
                onCategoriesReloaded={refreshTreeHighlights}
                page={page}
                setPage={setPage}
                principlesView={<PrinciplesPage currentUser={currentEmail} />}
                onFocusNode={setFocusNodeIds}
                nodeOptions={nodeOptions}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
