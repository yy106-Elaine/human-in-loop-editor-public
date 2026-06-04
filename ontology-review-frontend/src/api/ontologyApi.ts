const API_BASE = "http://127.0.0.1:8000";

export async function getOntologyTree() {
  const res = await fetch(`${API_BASE}/ontology/tree`);

  if (!res.ok) {
    throw new Error("Failed to load ontology tree");
  }

  return res.json();
}

export async function getSemanticReview(nodeId: string) {
  const res = await fetch(
    `${API_BASE}/reviews/${nodeId}/semantic`
  );

  if (!res.ok) {
    throw new Error("Failed to load semantic review");
  }

  return res.json();
}

export async function getDiffSimulation(nodeId: string) {
  const res = await fetch(
    `${API_BASE}/reviews/${nodeId}/diff`
  );

  if (!res.ok) {
    throw new Error("Failed to load diff simulation");
  }

  return res.json();
}

export async function getCaseMetadata(nodeId: string) {
  const res = await fetch(
    `${API_BASE}/reviews/${nodeId}/metadata`
  );

  if (!res.ok) {
    throw new Error("Failed to load metadata");
  }

  return res.json();
}

export async function submitReviewerAction(
  nodeId: string,
  actionType: string,
  notes?: string,
  payload = {}
) {
  const res = await fetch(
    `${API_BASE}/reviews/${nodeId}/actions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action_type: actionType,
        reviewer: "Sophia",
        notes,
        payload,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to submit action");
  }

  return res.json();
}

export async function saveReviewerNotes(
  nodeId: string,
  notes: string
) {
  const res = await fetch(
    `${API_BASE}/reviews/${nodeId}/notes`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reviewer: "Sophia",
        notes,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to save notes");
  }

  return res.json();
}