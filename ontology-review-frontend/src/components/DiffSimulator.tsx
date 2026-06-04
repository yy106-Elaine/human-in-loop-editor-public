import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { getDiffSimulation } from "../api/ontologyApi";

interface DiffTreeLine {
  text: string;
  depth: number;
  highlight: boolean;
}

interface ImpactMetric {
  label: string;
  value: string;
  detail?: string;
  trend?: string;
}

interface DiffData {
  node_id: string;
  before_tree: DiffTreeLine[];
  after_tree: DiffTreeLine[];
  inheritance_changes: ImpactMetric[];
  affected_descendants: string[];
  semantic_conflicts: ImpactMetric[];
  broken_rules: string[];
  ai_applicability_impact: ImpactMetric[];
}

export function DiffSimulator({ nodeId }: { nodeId: string }) {
  const [diff, setDiff] = useState<DiffData | null>(null);

  useEffect(() => {
    getDiffSimulation(nodeId)
      .then(setDiff)
      .catch((err) => console.error("Failed to load diff:", err));
  }, [nodeId]);

  if (!diff) {
    return (
      <div className="h-full bg-white border-t border-gray-200 flex items-center justify-center text-sm text-gray-500">
        Loading diff simulation...
      </div>
    );
  }

  return (
    <div className="h-full bg-white border-t border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">
          Ontology Diff Simulator
        </h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <TreePreview title="Before (Current State)" lines={diff.before_tree} />
          <TreePreview
            title="After (Proposed Change)"
            lines={diff.after_tree}
            variant="after"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <MetricCard
            title="Inheritance Changes"
            color="blue"
            metrics={diff.inheritance_changes}
          />

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-purple-900 mb-2">
              Affected Descendants
            </h4>
            <div className="text-xs text-gray-700">
              <span className="font-semibold text-purple-900">
                {diff.affected_descendants.length} nodes
              </span>{" "}
              will inherit proposed changes
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {diff.affected_descendants.map((node) => (
                <div key={node}>• {node}</div>
              ))}
            </div>
          </div>

          <MetricCard
            title="Semantic Conflicts"
            color="green"
            metrics={diff.semantic_conflicts}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <h4 className="text-xs font-semibold text-amber-900 mb-2">
              Broken Rules
            </h4>
            <div className="text-xs text-gray-700">
              {diff.broken_rules.length === 0
                ? "No ontology consistency rules violated"
                : diff.broken_rules.map((rule) => (
                    <div key={rule}>• {rule}</div>
                  ))}
            </div>
          </div>

          <MetricCard
            title="AI Applicability Impact"
            color="blue"
            metrics={diff.ai_applicability_impact}
          />
        </div>
      </div>
    </div>
  );
}

function TreePreview({
  title,
  lines,
  variant = "before",
}: {
  title: string;
  lines: DiffTreeLine[];
  variant?: "before" | "after";
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
      <div
        className={`border rounded-lg p-3 text-xs font-mono space-y-1 ${
          variant === "after"
            ? "bg-green-50 border-green-200"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {lines.map((line, idx) => (
          <div
            key={`${line.text}-${idx}`}
            className={
              line.highlight
                ? "text-green-700 font-semibold bg-green-100 inline-block px-1"
                : "text-gray-600"
            }
            style={{ paddingLeft: `${line.depth * 16}px` }}
          >
            └─ {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricCard({
  title,
  metrics,
  color,
}: {
  title: string;
  metrics: ImpactMetric[];
  color: "blue" | "green" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-900",
    green: "bg-green-50 border-green-200 text-green-900",
    purple: "bg-purple-50 border-purple-200 text-purple-900",
  };

  return (
    <div className={`border rounded-lg p-3 ${colorClasses[color]}`}>
      <h4 className="text-xs font-semibold mb-2">{title}</h4>
      <div className="space-y-1.5">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex items-center gap-2 text-xs">
            {metric.trend === "down" ? (
              <TrendingDown size={14} className="text-green-600" />
            ) : metric.trend === "flat" ? (
              <Minus size={14} className="text-gray-600" />
            ) : (
              <TrendingUp size={14} className="text-green-600" />
            )}
            <span className="text-gray-700">
              <strong>{metric.value}</strong> {metric.label}
              {metric.detail ? ` (${metric.detail})` : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}