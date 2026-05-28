import { useFilters } from "../hooks/useFilters";

// TODO: Move to constants
const SORT_FIELDS = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Age", value: "age" },
  { label: "Nationality", value: "nationality" },
];

export default function SortControls() {
  const { filters, setSortBy, setSortDir } = useFilters();

  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200">
      <span className="text-sm text-text-muted">Sort by</span>
      <select
        value={filters.sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-sm bg-surface border border-border rounded px-2 py-1 text-text focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {SORT_FIELDS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button
        onClick={() => setSortDir(filters.sortDir === "asc" ? "desc" : "asc")}
        className="text-sm bg-surface border border-border rounded px-2 py-1 text-text hover:bg-surface-muted transition-colors"
      >
        {filters.sortDir === "asc" ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
}
