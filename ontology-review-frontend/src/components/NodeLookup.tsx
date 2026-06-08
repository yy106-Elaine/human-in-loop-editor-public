import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { lookupOntology } from "../api/ontologyApi";

interface LookupResult {
  id: string;
  label: string;
  code?: string | null;
  path_string: string;
  children_count: number;
}

export function NodeLookup({
  onSelectNode,
}: {
  onSelectNode: (nodeId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LookupResult[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      lookupOntology(query, 8)
        .then((data) => setResults(data.results ?? []))
        .catch((err) => console.error("Lookup failed:", err));
    }, 250);

    return () => window.clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full max-w-md">
      <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 bg-white">
        <Search size={14} className="text-gray-400" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Lookup node by label, synset, or path..."
          className="w-full text-sm outline-none"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full mt-1 z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
          {results.map((result) => (
            <button
              key={result.id}
              onClick={() => {
                onSelectNode(result.id);
                setQuery(result.label);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex justify-between gap-2">
                <span className="text-sm font-medium text-gray-900">{result.label}</span>
                <span className="text-xs text-gray-500">{result.code}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">{result.path_string}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
