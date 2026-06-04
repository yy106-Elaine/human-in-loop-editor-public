import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { getSemanticReview } from "../api/ontologyApi";

interface ConfidenceRow {
  perspective: string;
  confidence: number;
}

interface ReviewedCase {
  label: string;
  status: string;
  resolution: string;
}

interface SemanticReviewData {
  node_id: string;
  label: string;
  code?: string;
  semantic_tension_detected: boolean;
  tension_explanation: string;
  wordnet_definition: string;
  current_parents: string[];
  perspective_confidence: ConfidenceRow[];
  onet_task_examples: string[];
  similar_reviewed_cases: ReviewedCase[];
  ai_explanation: string;
  recommendation: string;
}

export function SemanticReview({ nodeId }: { nodeId: string }) {
  const [review, setReview] = useState<SemanticReviewData | null>(null);

  useEffect(() => {
    getSemanticReview(nodeId)
      .then(setReview)
      .catch((err) => console.error("Failed to load semantic review:", err));
  }, [nodeId]);

  if (!review) {
    return (
      <div className="h-full bg-white flex items-center justify-center text-sm text-gray-500">
        Loading semantic review...
      </div>
    );
  }

  return (
    <div className="h-full bg-white overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Semantic Perspective Review
        </h2>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{review.label}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{review.code}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {review.semantic_tension_detected && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="text-amber-600 mt-0.5" size={18} />
            <div>
              <p className="text-sm font-medium text-amber-900">
                Semantic Tension Detected
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {review.tension_explanation}
              </p>
            </div>
          </div>
        )}

        <Section title="WordNet Definition">
          <p className="text-sm text-gray-700 leading-relaxed">
            {review.wordnet_definition}
          </p>
        </Section>

        <Section title="Current Parent(s)">
          <div className="space-y-2">
            {review.current_parents.map((parent) => (
              <div
                key={parent}
                className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded"
              >
                {parent}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Perspective Confidence">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-700">
                    Perspective
                  </th>
                  <th className="text-left px-4 py-2.5 font-medium text-gray-700">
                    Confidence
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {review.perspective_confidence.map((row) => (
                  <tr key={row.perspective} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 text-gray-900">
                      {row.perspective}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${row.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-gray-700 font-medium min-w-[3rem]">
                          {(row.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="O*NET Task Examples">
          <div className="space-y-2">
            {review.onet_task_examples.map((example, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded"
              >
                • {example}
              </div>
            ))}
          </div>
        </Section>

        <Section title="Similar Reviewed Cases">
          <div className="space-y-2">
            {review.similar_reviewed_cases.map((caseItem) => (
              <div
                key={caseItem.label}
                className="border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {caseItem.label}
                  </span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    {caseItem.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{caseItem.resolution}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="AI Explanation">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {review.ai_explanation}
            </p>
            <p className="mt-3 text-sm text-gray-700">
              <strong>Recommendation:</strong> {review.recommendation}
            </p>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-2">{title}</h4>
      {children}
    </div>
  );
}