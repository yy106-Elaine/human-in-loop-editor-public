from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass
from typing import Any, Dict, List, Optional

from app.store import ONTOLOGY_TREE, find_node
from app.services.ai_scoring import score_candidate
from app.services.ontology_context import get_context_by_label, format_context, get_all_contexts_by_label


@dataclass
class FlatNode:
    id: str
    label: str
    code: Optional[str]
    status: str
    parent_id: Optional[str]
    parent_label: Optional[str]
    path: List[str]
    children_count: int
    is_virtual: bool


def _node_status(node: Any) -> str:
    status = getattr(node, "status", "none")
    return getattr(status, "value", str(status))


def _is_virtual_node(node: Any) -> bool:
    label = (getattr(node, "label", "") or "").strip()
    node_id = (getattr(node, "id", "") or "").strip()
    if label.startswith("[virtual]"):
        return True
    if node_id.startswith("virtual-") or "-virtual-" in node_id:
        return True
    if "virtual" in label.lower():
        return True
    return False


def flatten_ontology() -> List[FlatNode]:
    flat: List[FlatNode] = []

    def walk(nodes: List[Any], parent: Optional[Any], path: List[str]) -> None:
        for n in nodes:
            label = getattr(n, "label", "")
            node_id = getattr(n, "id", "")
            code = getattr(n, "code", None)
            children = getattr(n, "children", []) or []
            current_path = [*path, label]
            flat.append(
                FlatNode(
                    id=node_id,
                    label=label,
                    code=code,
                    status=_node_status(n),
                    parent_id=getattr(parent, "id", None) if parent else None,
                    parent_label=getattr(parent, "label", None) if parent else None,
                    path=current_path,
                    children_count=len(children),
                    is_virtual=_is_virtual_node(n),
                )
            )
            walk(children, n, current_path)

    walk(ONTOLOGY_TREE, None, [])
    return flat


def _norm_label(label: str) -> str:
    return label.replace("_", " ").replace("-", " ").replace("[virtual]", "").strip().lower()

def _rerun_with_current_prompt(scored: Dict[str, Any], edit_type: str) -> bool:
    """True when this cached score was produced AFTER the prompt's last update,
    i.e. it reflects the newest prompt version."""
    from app.services.prompts import get_prompt
    scored_at = scored.get("_scored_at")
    if not scored_at:
        return False
    prompt_updated = get_prompt(
        "multiple_inheritance" if edit_type == "inheritance" else edit_type
    ).get("updated_at")
    if not prompt_updated:
        return True  # prompt never updated -> any score is "current"
    return str(scored_at) > str(prompt_updated)

def detect_duplicate_patterns() -> Dict[str, Any]:
    flat = flatten_ontology()
    groups: Dict[str, List[FlatNode]] = defaultdict(list)

    for node in flat:
        if node.label:
            groups[_norm_label(node.label)].append(node)

    suggestions: List[Dict[str, Any]] = []
    for label_key, nodes in groups.items():
        if len(nodes) < 2:
            continue

        # Semantic filter: only keep as a duplicate candidate if the same-label
        # nodes actually share a definition. Labels like "party" repeat with
        # different senses and are NOT duplicates.
        ctxs = get_all_contexts_by_label(label_key)
        defs = {c["definition"].strip() for c in ctxs if c.get("definition", "").strip()}
        if len(defs) != 1:
            continue

        synsets = sorted({n.code for n in nodes if n.code})
        # Rule-based fallback (used only if the AI call fails).
        if len(synsets) <= 1:
            fallback = {
                "suggested_action": "merge",
                "rationale": (
                    "These nodes share the same label and appear to have the same or missing synset. "
                    "They may represent duplicate concepts unless their paths imply distinct ontology roles."
                ),
                "confidence": 0.90,
            }
        else:
            fallback = {
                "suggested_action": "keep_separate_rename",
                "rationale": (
                    "These nodes share the same label but use different synsets. They should likely be kept separate, "
                    "but renamed or disambiguated so reviewers can see which sense is intended."
                ),
                "confidence": 0.75,
            }

        # Build candidate text with ONE block PER NODE, using each node's own
        # synset (n.code) and its own ONTOLOGY path (n.path). Previously this
        # used get_context_by_label(n.label), which returns the FIRST match for
        # a label — so every same-label node got the *identical* block and the
        # LLM concluded the distinct senses were "identical". We now match each
        # node to the context whose synset (parsed from its title, e.g.
        # "class (class.n.02)") equals n.code, and always show the node's real
        # synset + ontology path so distinct senses are visibly distinct.
        def _synset_of_title(title: str) -> str:
            m = re.search(r"\(([^)]+)\)\s*$", title or "")
            return m.group(1).strip().lower() if m else ""

        ctx_by_synset: Dict[str, Dict[str, Any]] = {}
        for c in ctxs:
            syn = _synset_of_title(c.get("title", ""))
            if syn:
                ctx_by_synset[syn] = c

        blocks = []
        for i, n in enumerate(nodes, 1):
            code = (n.code or "").strip()
            c = ctx_by_synset.get(code.lower())
            definition = (c.get("definition") if c else "") or "(none)"
            synonyms = (c.get("synonyms") if c else "") or "(none)"
            supersenses = (c.get("supersenses") if c else "") or "(none)"
            blocks.append(
                f"Candidate {i}:\n"
                f"  node_id: {n.id}\n"
                f"  Label: {n.label}\n"
                f"  Synset: {code or 'none'}\n"
                f"  Ontology path: {' → '.join(n.path)}\n"
                f"  Parent: {n.parent_label or '(root)'}\n"
                f"  Definition: {definition}\n"
                f"  Synonyms: {synonyms}\n"
                f"  Supersenses: {supersenses}"
            )
        candidate_text = (
            f"These {len(nodes)} ontology nodes share the label "
            f"'{nodes[0].label}'. They are the ONLY candidates. If you "
            "recommend 'merge', the merge target MUST be one of the synsets/"
            "node_ids listed below — never invent another node. Different "
            "synsets or different ontology paths usually mean different senses "
            "that should be kept separate and renamed, not merged.\n\n"
            + "\n\n---\n\n".join(blocks)
        )
        scored = score_candidate(
            edit_type="duplicate",
            cache_key=f"duplicate::{label_key}",
            candidate_text=candidate_text,
            fallback=fallback,
        )

        suggestions.append(
            {
                "id": f"duplicate::{label_key}",
                "pattern_type": "duplicate",
                "rerun_with_current_prompt": _rerun_with_current_prompt(scored, "duplicate"),
                "label": nodes[0].label,
                "title": f"Duplicate label: {nodes[0].label}",
                "suggested_action": scored["suggested_action"],
                "action_params": scored.get("action_params", {}),
                "rationale": scored["rationale"],
                "confidence": scored["confidence"],
                "nodes": [
                    {
                        "id": n.id,
                        "label": n.label,
                        "code": n.code,
                        "parent_label": n.parent_label,
                        "path": " → ".join(n.path),
                    }
                    for n in nodes
                ],
                "synsets": synsets,
            }
        )

    suggestions.sort(key=lambda x: (-x["confidence"], x["label"]))
    return {"pattern_type": "duplicate", "count": len(suggestions), "suggestions": suggestions}


def _virtual_suggestion(node: FlatNode) -> Dict[str, Any]:
    label = node.label
    normalized = _norm_label(label)
    vague_terms = {"thing", "entity", "object", "whole", "part", "group", "set", "unit", "body"}

    if node.children_count >= 3:
        action = "keep"
        confidence = 0.82
        rationale = (
            "This virtual/abstract node groups several children and likely helps preserve inheritance structure. "
            "It should probably be kept unless reviewers find the abstraction misleading."
        )
    elif node.children_count == 1:
        action = "alter"
        confidence = 0.72
        rationale = (
            "This virtual/abstract node has only one child, so it may not be doing enough organizational work. "
            "Consider merging it with the child or renaming it to clarify the abstraction."
        )
    elif normalized in vague_terms or not node.code:
        action = "alter"
        confidence = 0.68
        rationale = (
            "This virtual/abstract node has a broad or underspecified label. It may be useful, but reviewers should "
            "clarify what inheritance property it contributes."
        )
    else:
        action = "remove"
        confidence = 0.61
        rationale = (
            "This virtual/abstract node has no children in the current loaded structure, so it may not currently "
            "contribute useful inheritance organization."
        )

    fallback = {
        "suggested_action": action,
        "rationale": rationale,
        "confidence": confidence,
    }

    ctx = get_context_by_label(node.label)
    if ctx:
        candidate_text = format_context(ctx)
    else:
        candidate_text = (
            f"Label: {node.label}\n"
            f"Synset: {node.code or 'none (virtual/abstract node)'}\n"
            f"Path: {' → '.join(node.path)}\n"
            f"Number of children: {node.children_count}"
        )

    scored = score_candidate(
        edit_type="virtual",
        cache_key=f"virtual::{node.id}",
        candidate_text=candidate_text,
        fallback=fallback,
    )

    return {
        "id": f"virtual::{node.id}",
        "pattern_type": "virtual",
        "rerun_with_current_prompt": _rerun_with_current_prompt(scored, "virtual"),
        "node_id": node.id,
        "label": node.label,
        "code": node.code,
        "parent_label": node.parent_label,
        "path": " → ".join(node.path),
        "children_count": node.children_count,
        "suggested_action": scored["suggested_action"],
        "action_params": scored.get("action_params", {}),
        "title": f"Virtual node: {node.label}",
        "rationale": scored["rationale"],
        "confidence": scored["confidence"],
    }


def detect_virtual_node_patterns(limit: int | None = 75) -> Dict[str, Any]:
    flat = flatten_ontology()
    candidates = [n for n in flat if n.is_virtual]

    # Fallback because some JSON parsers strip "[virtual]" from labels.
    if not candidates:
        candidates = [n for n in flat if not n.code and n.children_count > 0]

    suggestions = [_virtual_suggestion(n) for n in candidates]
    suggestions.sort(key=lambda x: (-x["confidence"], x["label"]))
    # limit=None returns the full list (used by re-run, which must be able to
    # locate ANY node, not just the top 75 shown in the paginated UI).
    sliced = suggestions if limit is None else suggestions[:limit]
    return {"pattern_type": "virtual", "count": len(suggestions), "suggestions": sliced}


def detect_all_edit_patterns() -> Dict[str, Any]:
    duplicates = detect_duplicate_patterns()
    virtuals = detect_virtual_node_patterns()
    return {
        "duplicate": duplicates,
        "virtual": virtuals,
        "summary": {
            "duplicate_count": duplicates["count"],
            "virtual_count": virtuals["count"],
        },
    }


def get_node_pattern_context(node_id: str) -> Dict[str, Any]:
    node = find_node(node_id)
    if not node:
        return {"node_id": node_id, "patterns": []}

    flat = flatten_ontology()
    current = next((n for n in flat if n.id == node_id), None)
    patterns = []

    if current:
        for d in detect_duplicate_patterns()["suggestions"]:
            if any(n["id"] == node_id for n in d["nodes"]):
                patterns.append(d)

        if current.is_virtual or (not current.code and current.children_count > 0):
            patterns.append(_virtual_suggestion(current))

    return {"node_id": node_id, "patterns": patterns}