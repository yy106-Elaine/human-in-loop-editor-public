import { useMemo, useState } from "react";
import type { NodeOption } from "../App";

/**
 * Search-as-you-type input for picking a target node ID (used by the Alter
 * panel's merge / add parent / place elsewhere actions). Filters the flat
 * node list by label or synset code; picking an option fills in the node id
 * and jumps/highlights it in the left-hand tree via onFocusNode.
 */
export function NodeIdAutocomplete({
  value,
  onChange,
  onPick,
  nodeOptions,
  onFocusNode,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onPick: (node: NodeOption) => void;
  nodeOptions: NodeOption[];
  onFocusNode?: (nodeIds: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const matches = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];
    return nodeOptions
      .filter(
        (n) =>
          n.label.toLowerCase().includes(q) ||
          (n.code ?? "").toLowerCase().includes(q) ||
          n.id.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [value, nodeOptions]);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          // Delay closing so an option click registers before blur hides it.
          setTimeout(() => setOpen(false), 150);
        }}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      {open && matches.length > 0 && (
        <div className="absolute z-30 mt-1 w-full max-h-64 overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {matches.map((n) => (
            <button
              key={n.id}
              type="button"
              onMouseDown={(e) => e.preventDefault() /* keep input focus */}
              onClick={() => {
                onPick(n);
                onFocusNode?.([n.id]);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-900 truncate">
                  {n.label}
                </span>
                <span className="text-xs text-gray-500 shrink-0">
                  {n.code ?? "no synset"}
                </span>
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">{n.path}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}