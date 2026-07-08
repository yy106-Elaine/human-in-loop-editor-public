const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export type PatternType =
  | "duplicate"
  | "virtual"
  | "misplaced"
  | "inheritance"
  | "naming";

export type UserRole = "editor" | "admin";

export interface PatternNode {
  id: string;
  label: string;
  code?: string | null;
  parent_label?: string | null;
  path?: string;
}

export interface PatternSuggestion {
  id: string;
  pattern_type: PatternType;
  title: string;
  label?: string;
  suggested_action: string;
  rationale: string;
  confidence: number;
  action_params?: Record<string, unknown>;
  nodes?: PatternNode[];
  synsets?: string[];
  node_id?: string;
  code?: string | null;
  parent_label?: string | null;
  path?: string;
  children_count?: number;
}

export interface PatternCategory {
  key: PatternType;
  title: string;
  description: string;
  suggestions: PatternSuggestion[];
  count?: number;
  limit?: number;
  offset?: number;
  has_more?: boolean;
}

export interface PatternCategorySummary {
  key: PatternType;
  title: string;
  description: string;
  count: number;
}

export type PatternCounts = Partial<Record<PatternType, number>>;

export interface Principle {
  id: string;
  title: string;
  body: string;
  source: string;
  examples?: string[];
  category?: PatternType | "all";
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
    pattern_type?: PatternType;
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
  conflict_type?: "pattern_decision" | "llm_prompt";
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

export interface LlmPrompt {
  id: string;
  title: string;
  category: PatternType | "all";
  body: string;
  active_version: number;
  updated_at: string;
}

export interface LlmPromptChange {
  id: string;
  prompt_id: string;
  reviewer: string;
  proposed_body: string;
  comment?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  resolved_by?: string;
  resolved_at?: string;
}

export interface ManualEdit {
  id: string;
  pattern_id: string;
  reviewer: string;
  edit_type: string;
  target_node_id?: string;
  payload: Record<string, unknown>;
  comment?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  resolved_by?: string;
  resolved_at?: string;
}

export interface BatchJob {
  id: string;
  category: PatternType | "all";
  reviewer: string;
  status: "queued" | "approved" | "rejected";
  suggestion_count: number;
  created_at: string;
  resolved_by?: string;
  resolved_at?: string;
}

export async function getGroupedPatterns(limit = 10, offset = 0) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  const res = await fetch(`${API_BASE}/edit-patterns/grouped?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load grouped edit patterns");
  return res.json();
}

export async function getPatternCounts(): Promise<{
  counts: PatternCounts;
  categories: PatternCategorySummary[];
}> {
  const res = await fetch(`${API_BASE}/edit-patterns/counts`);
  if (!res.ok) throw new Error("Failed to load edit pattern counts");
  return res.json();
}

export async function getPatternHighlights(): Promise<{
  highlights: Record<string, PatternType>;
  counts: PatternCounts;
}> {
  const res = await fetch(`${API_BASE}/edit-patterns/highlights`);
  if (!res.ok) throw new Error("Failed to load edit pattern highlights");
  return res.json();
}

export async function getPatternCategoryPage(
  category: PatternType,
  options: { limit?: number; offset?: number; q?: string } = {}
): Promise<PatternCategory> {
  const params = new URLSearchParams({
    limit: String(options.limit ?? 25),
    offset: String(options.offset ?? 0),
  });

  if (options.q?.trim()) params.set("q", options.q.trim());

  const res = await fetch(
    `${API_BASE}/edit-patterns/category/${encodeURIComponent(category)}?${params.toString()}`
  );
  if (!res.ok) throw new Error(`Failed to load ${category} patterns`);
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
    principle_category?: PatternType | "all";
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

  if (!res.ok) throw new Error(`Failed to store pattern decision: ${await res.text()}`);
  return res.json();
}

export async function getPrinciples(category?: PatternType | "all") {
  const url = category
    ? `${API_BASE}/principles?category=${encodeURIComponent(category)}`
    : `${API_BASE}/principles`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load principles");
  return res.json();
}

export async function addPrinciple(
  text: string,
  reviewer = "Sophia",
  examples: string[] = [],
  category: PatternType | "all" = "all"
) {
  const res = await fetch(`${API_BASE}/principles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      decision: "approve",
      reviewer,
      principle_update: text,
      principle_category: category,
      payload: { examples },
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
    is_admin?: boolean;
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

  if (!res.ok) throw new Error(`Failed to resolve conflict: ${await res.text()}`);
  return res.json();
}

export async function getLlmPrompts() {
  const res = await fetch(`${API_BASE}/llm-prompts`);
  if (!res.ok) throw new Error("Failed to load LLM prompts");
  return res.json();
}

export async function proposeLlmPromptChange(
  promptId: string,
  body: { reviewer: string; proposed_body: string; comment?: string }
) {
  const res = await fetch(`${API_BASE}/llm-prompts/${encodeURIComponent(promptId)}/changes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to propose prompt change: ${await res.text()}`);
  return res.json();
}

export async function getLlmPromptChanges() {
  const res = await fetch(`${API_BASE}/llm-prompt-changes`);
  if (!res.ok) throw new Error("Failed to load prompt changes");
  return res.json();
}

export async function approveLlmPromptChange(
  changeId: string,
  body: { reviewer: string; approve: boolean; is_admin?: boolean; comment?: string }
) {
  const res = await fetch(`${API_BASE}/admin/llm-prompt-changes/${encodeURIComponent(changeId)}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to review prompt change: ${await res.text()}`);
  return res.json();
}

export async function createBatchJob(
  body: { reviewer: string; category: PatternType | "all"; is_admin?: boolean }
) {
  const res = await fetch(`${API_BASE}/admin/batch-process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to create batch job: ${await res.text()}`);
  return res.json();
}

export async function getBatchJobs() {
  const res = await fetch(`${API_BASE}/admin/batch-jobs`);
  if (!res.ok) throw new Error("Failed to load batch jobs");
  return res.json();
}

export async function decideBatchJob(
  jobId: string,
  body: { reviewer: string; approve: boolean; is_admin?: boolean; comment?: string }
) {
  const res = await fetch(`${API_BASE}/admin/batch-jobs/${encodeURIComponent(jobId)}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to review batch job: ${await res.text()}`);
  return res.json();
}

export async function submitManualEdit(
  body: {
    reviewer: string;
    pattern_id: string;
    edit_type: string;
    target_node_id?: string;
    payload?: Record<string, unknown>;
    comment?: string;
  }
) {
  const res = await fetch(`${API_BASE}/manual-edits`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to submit manual edit: ${await res.text()}`);
  return res.json();
}

export async function getManualEdits() {
  const res = await fetch(`${API_BASE}/manual-edits`);
  if (!res.ok) throw new Error("Failed to load manual edits");
  return res.json();
}

export async function decideManualEdit(
  editId: string,
  body: { reviewer: string; approve: boolean; is_admin?: boolean; comment?: string }
) {
  const res = await fetch(`${API_BASE}/admin/manual-edits/${encodeURIComponent(editId)}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to review manual edit: ${await res.text()}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Editable LLM prompts (one per edit type) — talks to the real /prompts routes
// ---------------------------------------------------------------------------

// Backend prompt keys. NOTE: backend uses "multiple_inheritance",
// while the frontend PatternType uses "inheritance".
export type PromptEditType =
  | "duplicate"
  | "virtual"
  | "misplaced"
  | "multiple_inheritance"
  | "naming";

export interface EditablePrompt {
  label: string;
  system: string;
  user: string;
}

// Map the frontend PatternType -> backend prompt key
export function toPromptEditType(pattern: PatternType): PromptEditType {
  return pattern === "inheritance" ? "multiple_inheritance" : pattern;
}

export async function getPrompts(): Promise<{ prompts: Record<PromptEditType, EditablePrompt> }> {
  const res = await fetch(`${API_BASE}/prompts`);
  if (!res.ok) throw new Error("Failed to load prompts");
  return res.json();
}

export async function updatePrompt(
  editType: PromptEditType,
  body: { system?: string; user?: string }
): Promise<{ edit_type: string; prompt: EditablePrompt }> {
  const res = await fetch(`${API_BASE}/prompts/${encodeURIComponent(editType)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to update prompt: ${await res.text()}`);
  return res.json();
}

export async function resetPrompt(
  editType: PromptEditType
): Promise<{ edit_type: string; prompt: EditablePrompt }> {
  const res = await fetch(`${API_BASE}/prompts/${encodeURIComponent(editType)}/reset`, {
    method: "POST",
  });
  if (!res.ok) throw new Error(`Failed to reset prompt: ${await res.text()}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Force re-run ONE node's AI score with the current prompt (costs ~1 OpenAI call)
// ---------------------------------------------------------------------------
export async function rerunNode(
  cacheKey: string
): Promise<{ ok: boolean; cache_key: string; suggestion: PatternSuggestion }> {
  const res = await fetch(`${API_BASE}/edit-patterns/rerun-node`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cache_key: cacheKey }),
  });
  if (!res.ok) throw new Error(`Failed to re-run node: ${await res.text()}`);
  return res.json();
}


// ---------------------------------------------------------------------------
// Active learning / learned auto-review
// ---------------------------------------------------------------------------

export interface LearningModelSummary {
  trained_at?: string | null;
  examples: number;
  rule_count: number;
  global_majority?: "approve" | "alter" | "reject";
  decision_counts?: Partial<Record<"approve" | "alter" | "reject", number>>;
}

export interface LearnedPrediction {
  decision: "approve" | "alter" | "reject";
  confidence: number;
  source: "learned_rule" | "heuristic";
  reason: string;
  support: number;
  signature?: string;
}

export interface AutoReviewItem {
  id: string;
  pattern_id: string;
  suggestion: PatternSuggestion;
  prediction: LearnedPrediction;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  resolved_by?: string;
  resolved_at?: string;
  comment?: string;
  applied_decision?: FinishedChange;
}

export async function getLearningStatus(): Promise<{
  model: LearningModelSummary;
  auto_review_count: number;
}> {
  const res = await fetch(`${API_BASE}/learning/status`);
  if (!res.ok) throw new Error(`Failed to load learning status: ${await res.text()}`);
  return res.json();
}

export interface LearnedRule {
  signature: string;
  decision: "approve" | "alter" | "reject";
  confidence: number;
  support: number;
  counts: Partial<Record<"approve" | "alter" | "reject", number>>;
}

export async function getLearnedRules(): Promise<{
  trained_at: string | null;
  rule_count: number;
  rules: LearnedRule[];
}> {
  const res = await fetch(`${API_BASE}/learning/rules`);
  if (!res.ok) throw new Error(`Failed to load learned rules: ${await res.text()}`);
  return res.json();
}

export async function trainLearningModel(body: {
  reviewer: string;
  is_admin?: boolean;
}): Promise<{ ok: boolean; model: LearningModelSummary }> {
  const res = await fetch(`${API_BASE}/learning/train`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to train learning model: ${await res.text()}`);
  return res.json();
}

export async function predictSuggestionDecision(
  suggestion: PatternSuggestion
): Promise<{ prediction: LearnedPrediction }> {
  const res = await fetch(`${API_BASE}/learning/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ suggestion }),
  });
  if (!res.ok) throw new Error(`Failed to predict suggestion decision: ${await res.text()}`);
  return res.json();
}

export async function getAutoReviewItems(options: {
  category?: PatternType | "all";
  threshold?: number;
  limit?: number;
} = {}): Promise<{ items: AutoReviewItem[]; threshold: number; count: number }> {
  const params = new URLSearchParams({
    category: options.category ?? "all",
    threshold: String(options.threshold ?? 0.85),
    limit: String(options.limit ?? 50),
  });

  const res = await fetch(`${API_BASE}/learning/auto-review?${params.toString()}`);
  if (!res.ok) throw new Error(`Failed to load learned auto-review items: ${await res.text()}`);
  return res.json();
}

export async function decideAutoReviewItem(
  itemId: string,
  body: {
    reviewer: string;
    approve: boolean;
    is_admin?: boolean;
    comment?: string;
  }
): Promise<{ ok: boolean; item: AutoReviewItem }> {
  const res = await fetch(`${API_BASE}/learning/auto-review/${encodeURIComponent(itemId)}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to decide learned auto-review item: ${await res.text()}`);
  return res.json();
}

export async function undoEditPatternDecision(patternId: string) {
  const res = await fetch(
    `${API_BASE}/edit-patterns/${encodeURIComponent(patternId)}/decision`,
    {
      method: "DELETE",
    }
  );
  
  if (!res.ok) {
    throw new Error(`Failed to undo decision: ${await res.text()}`);
  }
  return res.json();
}
// ---------------------------------------------------------------------------
// LLM prompt learning variation
// ---------------------------------------------------------------------------

export interface PromptLearningExample {
  pattern_id?: string;
  ai_suggested_action?: string;
  ai_title?: string;
  human_decision?: "approve" | "alter" | "reject";
  human_altered_action?: string | null;
  human_comment?: string | null;
}

export interface PromptLearningProposal {
  ok: boolean;
  edit_type: PromptEditType;
  current: EditablePrompt;
  proposed: EditablePrompt;
  rationale: string;
  examples: PromptLearningExample[];
  example_count: number;
}

export async function learnPromptFromDecisions(
  editType: PromptEditType,
  body: {
    reviewer: string;
    min_examples?: number;
    max_examples?: number;
  }
): Promise<PromptLearningProposal> {
  const res = await fetch(`${API_BASE}/prompts/${encodeURIComponent(editType)}/learn-proposal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to learn prompt update: ${await res.text()}`);
  return res.json();
}

export async function rerunBatchWithCurrentPrompt(
  body: {
    edit_type: PromptEditType;
    reviewer: string;
    limit?: number;
    run_all?: boolean;
  }
): Promise<{ ok: boolean; edit_type: PromptEditType; run_all: boolean; count: number; suggestions: PatternSuggestion[] }> {
  const res = await fetch(`${API_BASE}/edit-patterns/rerun-batch`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to rerun batch: ${await res.text()}`);
  return res.json();
}
