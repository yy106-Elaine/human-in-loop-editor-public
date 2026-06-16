const API_BASE = "http://127.0.0.1:8000";

export interface PatternNode {
  id: string;
  label: string;
  code?: string | null;
  parent_label?: string | null;
  path?: string;
}

export interface PatternSuggestion {
  id: string;
  pattern_type:
    | "duplicate"
    | "virtual"
    | "misplaced"
    | "inheritance"
    | "naming";
  title: string;
  label?: string;
  suggested_action: string;
  rationale: string;
  confidence: number;
  nodes?: PatternNode[];
  synsets?: string[];
  node_id?: string;
  code?: string | null;
  parent_label?: string | null;
  path?: string;
  children_count?: number;
}

export interface PatternCategory {
  key: string;
  title: string;
  description: string;
  suggestions: PatternSuggestion[];
}

export interface Principle {
  id: string;
  title: string;
  body: string;
  source: string;
  examples?: string[];
  created_at?: string;
}

export interface FinishedChange {
  id: string;
  pattern_id: string;
  decision: "approve" | "alter" | "reject";
  reviewer: string;
  comment: string;
  altered_action?: string | null;
  linked_principle_id?: string;
  principle_added?: Principle;
  payload?: {
    title?: string;
    suggested_action?: string;
    pattern_type?: string;
    [key: string]: unknown;
  };
  created_at: string;
  created_conflict_id?: string;
}

export interface CollaborationConflict {
  id: string;
  pattern_id: string;
  status: "open" | "resolved";
  votes: FinishedChange[];
  consensus?: {
    id: string;
    conflict_id: string;
    pattern_id: string;
    decision: "approve" | "alter" | "reject";
    altered_action?: string | null;
    reviewer: string;
    comment?: string;
    created_at: string;
  } | null;
  created_at: string;
  updated_at?: string;
  resolved_at?: string;
}

export async function getGroupedPatterns() {
  const res = await fetch(`${API_BASE}/edit-patterns/grouped`);
  if (!res.ok) throw new Error("Failed to load grouped edit patterns");
  return res.json();
}

export async function getDuplicatePatterns() {
  const res = await fetch(`${API_BASE}/edit-patterns/duplicates`);
  if (!res.ok) throw new Error("Failed to load duplicate patterns");
  return res.json();
}

export async function getVirtualPatterns() {
  const res = await fetch(`${API_BASE}/edit-patterns/virtual`);
  if (!res.ok) throw new Error("Failed to load virtual patterns");
  return res.json();
}

export async function decideEditPattern(
  patternId: string,
  body: {
    decision: "approve" | "alter" | "reject";
    reviewer?: string;
    comment?: string;
    altered_action?: string;
    principle_update?: string;
    link_principle_id?: string;
    payload?: Record<string, unknown>;
  }
) {
  const res = await fetch(
    `${API_BASE}/edit-patterns/${encodeURIComponent(patternId)}/decision`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to store pattern decision: ${text}`);
  }

  return res.json();
}

export async function getPrinciples() {
  const res = await fetch(`${API_BASE}/principles`);
  if (!res.ok) throw new Error("Failed to load principles");
  return res.json();
}

export async function addPrinciple(text: string, reviewer = "Sophia") {
  const res = await fetch(`${API_BASE}/principles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      decision: "approve",
      reviewer,
      principle_update: text,
    }),
  });

  if (!res.ok) throw new Error("Failed to add principle");
  return res.json();
}

export async function getEditPatternDecisions() {
  const res = await fetch(`${API_BASE}/edit-pattern-decisions`);
  if (!res.ok) throw new Error("Failed to load edit pattern decisions");
  return res.json();
}

export async function getConflicts(status?: "open" | "resolved") {
  const url = status
    ? `${API_BASE}/collaboration/conflicts?status=${status}`
    : `${API_BASE}/collaboration/conflicts`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load collaboration conflicts");
  return res.json();
}

export async function resolveConflict(
  conflictId: string,
  body: {
    reviewer: string;
    consensus_decision: "approve" | "alter" | "reject";
    consensus_action?: string;
    comment?: string;
  }
) {
  const res = await fetch(
    `${API_BASE}/collaboration/conflicts/${encodeURIComponent(conflictId)}/consensus`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to resolve conflict: ${text}`);
  }

  return res.json();
}
