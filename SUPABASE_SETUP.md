# Supabase Integration Guide

This guide makes the ontology review app collaborative — node status changes made by one reviewer are visible to all others in real time (via polling). It also replaces the hardcoded user dropdown with real authentication (Google OAuth or email magic link) via Supabase Auth.

**Estimated time:** 60–90 minutes  
**Prerequisites:** Python 3.11+, Node 18+, a free [Supabase account](https://supabase.com)

---

## Overview of changes

| File | What changes |
|---|---|
| `ontology_backend_starter/requirements.txt` | Add `supabase` and `python-dotenv` |
| `ontology_backend_starter/.env` | New file — your backend Supabase credentials |
| `ontology_backend_starter/app/store.py` | Persist status changes; load them on startup |
| `ontology_backend_starter/app/main.py` | Persist action log; add `/status/all` endpoint |
| `ontology-review-frontend/.env.local` | New file — your frontend Supabase credentials |
| `ontology-review-frontend/src/lib/supabaseClient.ts` | New file — frontend Supabase client |
| `ontology-review-frontend/src/components/LoginPage.tsx` | New file — login screen |
| `ontology-review-frontend/src/api/ontologyApi.ts` | Add `getNodeStatuses()` |
| `ontology-review-frontend/src/components/OntologyTree.tsx` | Poll for status updates every 5s |
| `ontology-review-frontend/src/App.tsx` | Replace user dropdown with auth state |

---

## Step 1 — Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and sign in.
2. Click **New project**.
3. Fill in:
   - **Name:** `ontology-review` (or anything you like)
   - **Database password:** generate a strong one and save it somewhere
   - **Region:** pick the one closest to your team
4. Click **Create new project** and wait ~1 minute for it to provision.

📖 Docs: [Creating a project](https://supabase.com/docs/guides/getting-started)

---

## Step 2 — Create the database tables

1. In your project dashboard, click **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Paste and run the following SQL:

```sql
-- Stores the current review status of each ontology node
CREATE TABLE node_status (
  node_id     TEXT PRIMARY KEY,
  status      TEXT NOT NULL DEFAULT 'none',
  updated_by  TEXT,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Persists the reviewer action log
CREATE TABLE action_log (
  id          BIGSERIAL PRIMARY KEY,
  node_id     TEXT NOT NULL,
  action_type TEXT NOT NULL,
  reviewer    TEXT,
  notes       TEXT,
  payload     JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

4. Click **Run** (or press `Ctrl+Enter`). You should see "Success. No rows returned."

---

## Step 3 — Get your API credentials

1. In the left sidebar, click **Project Settings** → **Data API**.
2. You need two values:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **service_role key** — under "Project API keys", click the eye icon next to `service_role` to reveal it

> ⚠️ Use the `service_role` key (not the `anon` key) for the backend. It bypasses Row Level Security, which is fine since only your FastAPI server uses it. Never expose this key in the frontend.

📖 Docs: [API settings](https://supabase.com/docs/guides/api)

---

## Step 4 — Backend: add credentials

Create a new file at `ontology_backend_starter/.env`:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Replace the values with the ones you copied in Step 3.

> This file is already in `.gitignore` (or should be — check before committing).

---

## Step 5 — Backend: update `requirements.txt`

Open `ontology_backend_starter/requirements.txt` and add two lines:

```
supabase==2.15.2
python-dotenv==1.0.1
```

Then reinstall:

```bash
cd ontology_backend_starter
venv\Scripts\activate
pip install -r requirements.txt
```

---

## Step 6 — Backend: update `store.py`

Open `ontology_backend_starter/app/store.py`. Make the following changes:

### 6a — Add imports at the top of the file

Find the existing imports block and add these lines:

```python
import os
from dotenv import load_dotenv
from supabase import create_client, Client as SupabaseClient

load_dotenv()
```

### 6b — Initialize the Supabase client

Add this block right after the imports (before `DATA_DIR = ...`):

```python
_supabase: SupabaseClient | None = None

def _get_supabase() -> SupabaseClient | None:
    global _supabase
    if _supabase is not None:
        return _supabase
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_KEY")
    if url and key:
        _supabase = create_client(url, key)
    return _supabase
```

### 6c — Load saved statuses on startup

At the bottom of the file, find this line:

```python
ONTOLOGY_TREE: List[OntologyNode] = _build_full_tree()
```

Replace it with:

```python
ONTOLOGY_TREE: List[OntologyNode] = _build_full_tree()


def _load_saved_statuses() -> None:
    """On startup, restore any previously saved node statuses from Supabase."""
    sb = _get_supabase()
    if sb is None:
        return
    try:
        rows = sb.table("node_status").select("node_id, status").execute()
        for row in rows.data:
            node = find_node(row["node_id"])
            if node:
                try:
                    node.status = NodeStatus(row["status"])
                except ValueError:
                    pass  # ignore unknown status values
    except Exception as e:
        print(f"[store] Could not load saved statuses: {e}")


_load_saved_statuses()
```

### 6d — Persist status changes

Find the existing `update_node_status` function:

```python
def update_node_status(node_id: str, status: NodeStatus) -> None:
    node = find_node(node_id)
    if node:
        node.status = status
```

Replace it with:

```python
def update_node_status(node_id: str, status: NodeStatus, reviewer: str | None = None) -> None:
    node = find_node(node_id)
    if node:
        node.status = status
    sb = _get_supabase()
    if sb:
        try:
            sb.table("node_status").upsert({
                "node_id": node_id,
                "status": status.value,
                "updated_by": reviewer,
                "updated_at": "now()",
            }).execute()
        except Exception as e:
            print(f"[store] Could not persist status for {node_id}: {e}")
```

---

## Step 7 — Backend: update `main.py`

Open `ontology_backend_starter/app/main.py`.

### 7a — Persist the action log

The action log currently appends to an in-memory list. Find every occurrence of:

```python
ACTION_LOG.append(
```

There are two of them — one in `save_notes` and one in `apply_action`. After each `ACTION_LOG.append(...)` block, add a Supabase write. For example, the one in `apply_action` looks like:

```python
    ACTION_LOG.append(
        {
            "node_id": node_id,
            "action_type": body.action_type,
            "reviewer": body.reviewer,
            "notes": body.notes,
            "payload": body.payload,
        }
    )
```

Add immediately after it:

```python
    from app.store import _get_supabase
    sb = _get_supabase()
    if sb:
        try:
            sb.table("action_log").insert({
                "node_id": node_id,
                "action_type": body.action_type,
                "reviewer": body.reviewer,
                "notes": body.notes,
                "payload": body.payload,
            }).execute()
        except Exception as e:
            print(f"[main] Could not write action log: {e}")
```

Do the same for the `save_notes` append.

### 7b — Add the `/status/all` endpoint

Add this new route anywhere in `main.py` (e.g. after the `/health` endpoint):

```python
@app.get("/status/all")
def all_statuses():
    """Returns a flat map of node_id → status for all nodes that have been touched."""
    from app.store import _get_supabase
    sb = _get_supabase()
    if sb is None:
        return {}
    try:
        rows = sb.table("node_status").select("node_id, status").execute()
        return {r["node_id"]: r["status"] for r in rows.data}
    except Exception as e:
        print(f"[main] Could not fetch statuses: {e}")
        return {}
```

---

## Step 8 — Frontend: add `getNodeStatuses()`

Open `ontology-review-frontend/src/api/ontologyApi.ts` and add this function at the bottom:

```ts
export async function getNodeStatuses(): Promise<Record<string, string>> {
  const res = await fetch(`${API_BASE}/status/all`);
  if (!res.ok) return {};
  return res.json();
}
```

---

## Step 9 — Frontend: add polling to `OntologyTree.tsx`

Open `ontology-review-frontend/src/components/OntologyTree.tsx`.

### 9a — Import the new function

Find the existing import from `ontologyApi`:

```ts
import { type PatternType } from "../api/editPatternsApi";
```

Add an import for the new function above or below it:

```ts
import { getNodeStatuses } from "../api/ontologyApi";
```

### 9b — Add a helper to apply statuses to the tree

Add this function just before the `OntologyTree` component definition (around line 182):

```ts
function applyStatuses(
  nodes: Record<string, OntologyNode>,
  statuses: Record<string, string>
): Record<string, OntologyNode> {
  function patchNode(node: OntologyNode): OntologyNode {
    const newStatus = statuses[node.id];
    return {
      ...node,
      status: (newStatus as OntologyNode["status"]) ?? node.status,
      children: node.children?.map(patchNode),
    };
  }
  const patched: Record<string, OntologyNode> = {};
  for (const [key, root] of Object.entries(nodes)) {
    patched[key] = patchNode(root);
  }
  return patched;
}
```

### 9c — Add the polling effect

Inside the `OntologyTree` function, find the existing `useEffect` that fetches the tree (around line 214). Add a second `useEffect` directly after it:

```ts
  // Poll for status updates from other reviewers every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      getNodeStatuses()
        .then((statuses) => {
          if (Object.keys(statuses).length > 0) {
            setOntology((prev) => applyStatuses(prev, statuses));
          }
        })
        .catch(() => {}); // fail silently — updates are best-effort
    }, 5000);
    return () => clearInterval(interval);
  }, []);
```

---

## Step 10 — Test it

1. Start the backend:
   ```bash
   cd ontology_backend_starter
   venv\Scripts\activate
   uvicorn app.main:app --reload --port 8000
   ```
   You should see no errors. If Supabase credentials are missing, the app still starts — it just falls back to in-memory state.

2. Start the frontend:
   ```bash
   cd ontology-review-frontend
   npm run dev
   ```

3. Open the app in two browser windows. In one, approve a node. Within 5 seconds, the status dot should update in the other window.

4. Restart the backend. Reload the app. Previously approved nodes should still show their status (loaded from Supabase).

5. In your Supabase dashboard, open **Table Editor** → `node_status` or `action_log` to confirm rows are being written.

---

## Troubleshooting

**Backend starts but statuses don't persist**
Check that `.env` exists in `ontology_backend_starter/` (not the project root) and that both `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` are set correctly. The backend prints a warning if the Supabase client can't initialize.

**`ModuleNotFoundError: supabase`**
Make sure you ran `pip install -r requirements.txt` inside the activated venv.

**Status dots don't update in the second window**
Open the browser console. If you see a network error on `/status/all`, the backend may not be running or CORS is blocking it. The backend already has CORS set to `allow_origins=["*"]` so this should not be an issue locally.

**`python-dotenv` not loading the `.env` file**
The `.env` file must be in the directory where you run `uvicorn` — i.e. `ontology_backend_starter/`. If you run uvicorn from a different directory, pass the path explicitly or set the env vars in your terminal session instead.

---

## Useful links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Python client docs](https://supabase.com/docs/reference/python/introduction)
- [Supabase Table Editor](https://supabase.com/docs/guides/database/tables)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [python-dotenv docs](https://pypi.org/project/python-dotenv/)

---

# Part 2 — Supabase Auth (Google OAuth + Email Magic Link)

This section replaces the hardcoded user dropdown in the app header with real login. After completing it, reviewers sign in with their Google account or a magic link email, and the `currentUser` throughout the app is their verified identity.

**Choose one auth method (or enable both):**
- **Google OAuth** — one click, uses their existing Google account. Requires a Google Cloud project.
- **Email magic link** — user enters email, receives a sign-in link. No password needed. Easiest to set up.

---

## Auth Step 1 — Enable auth providers in Supabase

### Magic link (email)

Magic link is enabled by default — no configuration needed. Skip to Auth Step 2.

### Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and create a new project (or use an existing one).
2. In the left sidebar, go to **APIs & Services** → **OAuth consent screen**.
   - Set User Type to **Internal** (MIT Google Workspace) or **External** depending on your setup.
   - Fill in the app name and support email. Click **Save and Continue** through the rest.
3. Go to **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**.
   - Application type: **Web application**
   - Under **Authorized redirect URIs**, add:
     ```
     https://your-project-id.supabase.co/auth/v1/callback
     ```
     (Replace `your-project-id` with your actual Supabase project ID from the dashboard URL.)
4. Click **Create**. Copy the **Client ID** and **Client Secret**.
5. In your Supabase dashboard, go to **Authentication** → **Providers** → **Google**.
6. Toggle it on, paste in your Client ID and Client Secret, and click **Save**.

📖 Docs: [Supabase Google OAuth setup](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## Auth Step 2 — Get the frontend API key

The frontend uses the **anon (public)** key — different from the `service_role` key used by the backend. It is safe to include in frontend code.

1. In Supabase dashboard → **Project Settings** → **Data API**.
2. Copy the **anon / public** key.

---

## Auth Step 3 — Add frontend environment variables

Create a new file at `ontology-review-frontend/.env.local`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> `.env.local` is already ignored by Vite's default `.gitignore`. Do not commit this file.

---

## Auth Step 4 — Install the Supabase JS client

```bash
cd ontology-review-frontend
npm install @supabase/supabase-js
```

---

## Auth Step 5 — Create the Supabase client

Create a new file at `ontology-review-frontend/src/lib/supabaseClient.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## Auth Step 6 — Create the login screen

Create a new file at `ontology-review-frontend/src/components/LoginPage.tsx`:

```tsx
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-lg font-semibold text-gray-900 mb-1">
          Ontology Engineering Dashboard
        </h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to continue</p>

        {sent ? (
          <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg p-4">
            Check your email — we sent a sign-in link to <strong>{email}</strong>.
          </p>
        ) : (
          <>
            {/* Google */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              </svg>
              Sign in with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Magic link */}
            <form onSubmit={handleMagicLink} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50"
              >
                {loading ? "Sending…" : "Send magic link"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-xs text-red-600">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
```

---

## Auth Step 7 — Update `App.tsx`

Replace the user dropdown logic in `App.tsx` with Supabase auth state. The changes are:

### 7a — Add imports

At the top of `App.tsx`, add:

```ts
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { LoginPage } from "./components/LoginPage";
import type { User } from "@supabase/supabase-js";
```

Remove the existing `import { useEffect, useMemo, useState } from "react"` and replace it with the above (keeping `useMemo` if still needed elsewhere).

### 7b — Replace the user state

Find and remove these lines:

```ts
const DEFAULT_USERS = ["Alice", "Elaine", "Sophia"];
const DEFAULT_ADMIN_USERS = ["Alice"];
```

And the associated `users`, `currentUser`, `roleOverrides` state blocks. Replace them with:

```ts
const [user, setUser] = useState<User | null>(null);
const [authLoading, setAuthLoading] = useState(true);

useEffect(() => {
  // Get initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    setUser(session?.user ?? null);
    setAuthLoading(false);
  });

  // Listen for sign-in / sign-out
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user ?? null);
  });

  return () => subscription.unsubscribe();
}, []);

// Derive a display name from the authenticated user
const currentUser =
  user?.user_metadata?.full_name ||   // Google
  user?.user_metadata?.name ||        // some providers
  user?.email ||                      // email magic link
  "Unknown";
```

### 7c — Gate the app on auth

In the return statement, add a loading state and redirect to `LoginPage` when not signed in. Find the opening of the `return (`:

```tsx
return (
  <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
```

Replace with:

```tsx
if (authLoading) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-sm text-gray-400">
      Loading…
    </div>
  );
}

if (!user) {
  return <LoginPage />;
}

return (
  <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
```

### 7d — Replace the user dropdown in the header

Find the user `<select>` element in the header and replace the entire dropdown block with:

```tsx
<div className="flex items-center gap-3">
  <span className="text-sm text-gray-600">{currentUser}</span>
  <button
    onClick={() => supabase.auth.signOut()}
    className="px-3 py-1.5 text-xs rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
  >
    Sign out
  </button>
</div>
```

> The role selector can stay if needed, or be removed. Since `currentUser` is now a verified identity, you could manage admin roles in Supabase using [custom claims](https://supabase.com/docs/guides/auth/custom-claims-and-role-based-access-control-rbac) rather than the localStorage override.

---

## Auth Step 8 — Test auth

1. Restart the frontend (`npm run dev`).
2. The app should now show the login screen instead of loading directly.
3. Try **Send magic link** — check your email and click the link. You should land back in the app, signed in.
4. Try **Sign in with Google** if you configured it in Auth Step 1.
5. Confirm `currentUser` in the header shows your name or email.
6. Click **Sign out** — you should return to the login screen.

---

## Useful links

- [Supabase Dashboard](https://supabase.com/dashboard)
- [Supabase Python client docs](https://supabase.com/docs/reference/python/introduction)
- [Supabase JS client docs](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth docs](https://supabase.com/docs/guides/auth)
- [Supabase Google OAuth setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Supabase Magic Link docs](https://supabase.com/docs/guides/auth/passwordless-login/auth-magic-link)
- [Supabase Table Editor](https://supabase.com/docs/guides/database/tables)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/overview)
- [python-dotenv docs](https://pypi.org/project/python-dotenv/)
