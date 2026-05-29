import { SORT_FIELDS } from "../constants/filters.constants";
import { ESortDir } from "../enums/filters.enum";
import { useFilters } from "../hooks/useFilters";

const SortControls = () => {
  const { filters, setSortBy, setSortDir } = useFilters();

  return (
    <div className="flex items-center gap-2 p-4 border-b border-line">
      <span className="text-sm text-muted">Sort by</span>
      <select
        value={filters.sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="text-sm rounded-lg  bg-surface border border-line px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {SORT_FIELDS.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          setSortDir(
            filters.sortDir === ESortDir.ASC ? ESortDir.DESC : ESortDir.ASC,
          )
        }
        className="text-sm rounded-lg  bg-surface border border-line px-2 py-1 text-foreground hover:bg-surface-muted transition-colors"
      >
        {filters.sortDir === ESortDir.ASC ? "↑ Asc" : "↓ Desc"}
      </button>
    </div>
  );
};
export default SortControls;
