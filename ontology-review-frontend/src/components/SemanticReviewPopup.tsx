// src/components/SemanticReviewPopup.tsx
import { useEffect, useState } from "react";
import { getSemanticInfo, findSemanticByLabel } from "../lib/semanticData";
import { getWordnetInfo } from "../api/ontologyApi";

interface SemanticReviewPopupProps {
  /** synset id, e.g. "hardware.n.03" — preferred lookup key */
  synsetId?: string | null;
  /** fallback: plain word label, e.g. "hardware" */
  label?: string;
  /** full ontology hierarchy path from the live tree, e.g. "Physical → matter → fragment" */
  hierarchyPath?: string;
  /** screen position: popup's left edge and vertical center */
  x: number;
  y: number;
  onClose: () => void;
}

export function SemanticReviewPopup({
  synsetId,
  label,
  hierarchyPath,
  x,
  y,
  onClose,
}: SemanticReviewPopupProps) {
  const info = synsetId
    ? getSemanticInfo(synsetId)
    : label
    ? findSemanticByLabel(label)
    : null;

  // Live WordNet lookup by synset code: definition + synonyms.
  const [wordnet, setWordnet] = useState<{ definition: string; synonyms: string[] } | null>(null);
  useEffect(() => {
    setWordnet(null);
    const code = synsetId || info?.synsetId;
    if (!code || !/\.[nvasr]\.\d+$/.test(code)) return; // only real synset codes
    let cancelled = false;
    getWordnetInfo(code)
      .then((d) => { if (!cancelled) setWordnet(d); })
      .catch(() => {}); // fall back silently to nodes-data.json definition
    return () => { cancelled = true; };
  }, [synsetId, info?.synsetId]);

  // Ontology hierarchy path comes from the live tree (passed in), NOT from the
  // WordNet-style Path field in nodes-data.json. Split on the "→" separator.
  const parents = hierarchyPath
    ? hierarchyPath.split("→").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="fixed z-50"
      // x = popup's left edge (just right of the node),
      // y = node's vertical center; translateY(-50%) centers the bubble on it
      style={{ left: x, top: y, transform: "translateY(-50%)" }}
      role="dialog"
      aria-label="Semantic Review"
    >
      {/* speech bubble */}
      <div className="relative w-[340px] max-w-[90vw] rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl">
        {/* close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        >
          ✕
        </button>

        {/* content */}
        <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden p-4 pr-8">
          <div className="space-y-4">
            {/* title — falls back to the passed-in label when semantic data is missing */}
            <div>
              <h3 className="text-base font-semibold leading-tight text-gray-900">
                {info?.label || label || info?.synsetId}
              </h3>
              {info?.synsetId && (
                <p className="text-xs text-gray-500">{info.synsetId}</p>
              )}
            </div>

            {/* WordNet Definition — live from WordNet by synset, falling back
                to the static nodes-data.json definition */}
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                WordNet Definition
              </h4>
              <p className="text-sm leading-relaxed text-gray-800">
                {wordnet?.definition || info?.definition || "—"}
              </p>
            </section>

            {/* Synonyms — from the WordNet synset's lemmas */}
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Synonyms
              </h4>
              {wordnet?.synonyms && wordnet.synonyms.length > 0 ? (
                <p className="text-sm leading-relaxed text-gray-800">
                  {wordnet.synonyms.join(", ")}
                </p>
              ) : (
                <p className="text-sm text-gray-500">—</p>
              )}
            </section>

            {/* Current Parent(s) — from the live ontology tree, always shown when available */}
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Current Parent(s)
              </h4>
              {parents.length > 0 ? (
                <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm leading-relaxed text-gray-800">
                  {parents.map((p, i) => (
                    <span key={i} className="inline-flex items-center">
                      <span className="break-all">{p}</span>
                      {i < parents.length - 1 && (
                        <span className="ml-1 text-gray-400">→</span>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">—</p>
              )}
            </section>

            {/* O*NET Task Examples */}
            <section>
              <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                O*NET Task Examples
              </h4>
              <p className="text-sm leading-relaxed text-gray-800">
                {info?.taskExample || "—"}
              </p>
            </section>
          </div>
        </div>

        {/* speech-bubble tail — points LEFT toward the node, vertically centered */}
        {/* white fill */}
        <div
          className="absolute top-1/2 h-0 w-0"
          style={{
            left: "-10px",
            transform: "translateY(-50%)",
            borderTop: "10px solid transparent",
            borderBottom: "10px solid transparent",
            borderRight: "10px solid #ffffff",
          }}
        />
        {/* border outline (slightly larger, sits behind) */}
        <div
          className="absolute top-1/2 h-0 w-0"
          style={{
            left: "-11px",
            transform: "translateY(-50%)",
            borderTop: "11px solid transparent",
            borderBottom: "11px solid transparent",
            borderRight: "11px solid #e5e7eb", // gray-200
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
}