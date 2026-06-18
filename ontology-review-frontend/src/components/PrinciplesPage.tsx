import { EditPatternsPage } from "./EditPatternsPage";

/**
 * Principles are now shown inside each edit category, including All.
 * This component is kept only for compatibility with older imports/routes.
 */
export function PrinciplesPage({ currentUser }: { currentUser: string }) {
  return (
    <EditPatternsPage
      currentUser={currentUser}
      isAdmin={false}
      selectedNodeId={null}
    />
  );
}
