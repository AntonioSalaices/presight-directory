import { useUsers } from "../hooks/useUsers";
import { useFilters } from "../hooks/useFilters";
import { sortByValue } from "../utils/sort.utils";
import logo from "../assets/presight-logo.svg";

const Sidebar = () => {
  const { filters, toggleNationality, toggleHobby } = useFilters();
  const { data } = useUsers(filters);

  const hobbies = (data?.pages[0]?.hobbies ?? []).sort(sortByValue);
  const nationalities = (data?.pages[0]?.nationalities ?? []).sort(sortByValue);

  return (
    <aside className="w-64 h-screen overflow-y-auto border-r  p-4 flex flex-col gap-6 bg-surface-card">
      <div className="py-2 flex justify-center">
        <img src={logo} alt="Presight" className="h-8 w-auto" />
      </div>

      <section>
        <h3 className="font-semibold text-primary text-sm uppercase tracking-wide mb-2">
          Nationality
        </h3>
        <ul className="flex flex-col gap-1">
          {nationalities.map(({ value, count }) => (
            <li key={value}>
              <button
                onClick={() => toggleNationality(value)}
                className={`w-full flex justify-between items-center text-sm px-2 py-1 transition-colors rounded hover:bg-surface-muted ${
                  filters.nationalities.includes(value)
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-muted"
                }`}
              >
                <span>{value}</span>
                <span className="text-text-subtle">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="font-semibold text-sm text-primary uppercase tracking-wide mb-2">
          Hobbies
        </h3>
        <ul className="flex flex-col gap-1">
          {hobbies.map(({ value, count }) => (
            <li key={value}>
              <button
                onClick={() => toggleHobby(value)}
                className={`w-full flex justify-between items-center text-sm px-2 py-1 rounded transition-colors  hover:bg-surface-muted ${
                  filters.hobbies.includes(value)
                    ? "bg-primary-light text-primary font-medium"
                    : "text-text-muted"
                }`}
              >
                <span>{value}</span>
                <span className="text-text-subtle">{count}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};
export default Sidebar;
