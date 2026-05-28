import { useEffect, useState } from "react";
import { useFilters } from "../hooks/useFilters";
import SortControls from "./SortControls";

interface FiltersProps {
  onMenuClick: () => void;
}
const DEBOUNCE_MS = 300;

export default function Filters({ onMenuClick }: FiltersProps) {
  const { filters, setSearch } = useFilters();
  const [value, setValue] = useState(filters.search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(value!);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 p-4 border-b border-border bg-surface-card">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="md:hidden text-text-muted hover:text-text p-1"
        >
          ☰
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search by name..."
          className="flex-1 px-4 py-2 bg-surface border border-border rounded-lg text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <SortControls />
    </div>
  );
}
