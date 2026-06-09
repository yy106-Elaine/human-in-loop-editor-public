const API_BASE = "http://127.0.0.1:8000";

export interface PatternDecisionInput {
  decision: "approve" | "alter" | "reject";
  reviewer?: string;
  comment?: string;
  altered_action?: string;
  principle_update?: string;
  payload?: Record<string, unknown>;
}

export async function getDuplicatePatterns() {
  const res = await fetch(`${API_BASE}/edit-patterns/duplicates`);
  if (!res.ok) throw new Error("Failed to load duplicate patterns");
  return res.json();
}

export async function getVirtualPatterns() {
  const res = await fetch(`${API_BASE}/edit-patterns/virtual`);
  if (!res.ok) throw new Error("Failed to load virtual node patterns");
  return res.json();
}

export async function decideEditPattern(patternId: string, input: PatternDecisionInput) {
  const res = await fetch(`${API_BASE}/edit-patterns/${encodeURIComponent(patternId)}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reviewer: "Sophia", ...input }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to save edit pattern decision: ${text}`);
  }
  return res.json();
}

export async function getEditPatternDecisions() {
  const res = await fetch(`${API_BASE}/edit-pattern-decisions`);
  if (!res.ok) throw new Error("Failed to load decisions");
  return res.json();
}

export async function getPrinciples() {
  const res = await fetch(`${API_BASE}/principles`);
  if (!res.ok) throw new Error("Failed to load principles");
  return res.json();
}

export async function addPrinciple(body: string) {
  const res = await fetch(`${API_BASE}/principles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      decision: "approve",
      reviewer: "Sophia",
      principle_update: body,
    }),
  });
  if (!res.ok) throw new Error("Failed to add principle");
  return res.json();
}
