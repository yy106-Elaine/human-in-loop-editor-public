const API_BASE = "http://127.0.0.1:8000";

export async function getOntologyTree() {
  const res = await fetch(`${API_BASE}/ontology/tree`);
  if (!res.ok) throw new Error("Failed to load ontology tree");
  return res.json();
}

export async function lookupOntology(query: string, limit = 25) {
  const params = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`${API_BASE}/ontology/lookup?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to search ontology");
  return res.json();
}

export async function getSemanticReview(nodeId: string) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/semantic`);
  if (!res.ok) throw new Error("Failed to load semantic review");
  return res.json();
}

export async function getDiffSimulation(
  nodeId: string,
  actionType: string = "",
  payload: Record<string, unknown> = {}
) {
  const res = await fetch(`${API_BASE}/reviews/${nodeId}/diff`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action_type: actionType, payload }),
  });
  if (!res.ok) throw new Error("Failed to load diff simulation");
  return res.json();
}

export async function getCaseMetadata(nodeId: string) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/metadata`);
  if (!res.ok) throw new Error("Failed to load metadata");
  return res.json();
}

export async function submitReviewerAction(
  nodeId: string,
  actionType: string,
  notes?: string,
  payload: Record<string, unknown> = {}
) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/actions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action_type: actionType,
      reviewer: "Sophia",
      notes,
      payload,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to submit action: ${text}`);
  }

  return res.json();
}

export async function saveReviewerNotes(nodeId: string, notes: string) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/notes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      reviewer: "Sophia",
      notes,
    }),
  });

  if (!res.ok) throw new Error("Failed to save notes");
  return res.json();
}

export async function getAISuggestions(nodeId: string, apiKey: string) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/ai-suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ api_key: apiKey }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load AI suggestions: ${text}`);
  }

  return res.json();
}

export async function getStoredAISuggestions(nodeId: string) {
  const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(nodeId)}/ai-suggestions`);
  if (!res.ok) throw new Error("Failed to load stored AI suggestions");
  return res.json();
}

export async function decideAISuggestion(
  nodeId: string,
  suggestionId: string,
  decision: "approve" | "reject",
  feedback: string
) {
  const res = await fetch(
    `${API_BASE}/reviews/${encodeURIComponent(nodeId)}/ai-suggestions/${encodeURIComponent(suggestionId)}/decision`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        decision,
        reviewer: "Sophia",
        feedback,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to submit AI suggestion decision: ${text}`);
  }

  return res.json();
}

export async function getActionLog(nodeId?: string, query = "", limit = 100) {
  const params = new URLSearchParams({ limit: String(limit) });
  if (nodeId) params.set("node_id", nodeId);
  if (query) params.set("q", query);

  const res = await fetch(`${API_BASE}/actions/log?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load action log");
  return res.json();
}
