import { useEffect, useState } from "react";

import { useFilters } from "../hooks/useFilters";
import SortControls from "./SortControls";
import { DEBOUNCE_MS } from "../constants/filters.constants";

interface IFiltersProps {
  onMenuClick: () => void;
}

const Filters = ({ onMenuClick }: IFiltersProps) => {
  const { filters, setSearch, resetFilters } = useFilters();
  const [value, setValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value!);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 p-4 border-b border-line bg-surface-card">
      <div className="flex items-center gap-2 flex-1">
        <button
          onClick={onMenuClick}
          className="md:hidden text-muted hover:text-foreground p-1"
        >
          ☰
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 px-4 py-2 bg-surface border border-line rounded-lg text-foreground placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {(filters.search ||
          filters.nationalities.length > 0 ||
          filters.hobbies.length > 0) && (
          <button
            onClick={() => {
              setValue("");
              resetFilters();
            }}
            className="text-sm text-muted hover:text-foreground px-2 py-1 rounded hover:bg-surface-muted transition-colors"
          >
            Reset
          </button>
        )}
      </div>
      <SortControls />
    </div>
  );
};
export default Filters;
