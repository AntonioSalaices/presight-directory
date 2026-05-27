import { useSearchParams } from "react-router-dom";

import { IFilters } from "../interfaces/users.interface";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IFilters = {
    search: searchParams.get("search") ?? "",
    nationalities: searchParams.getAll("nationality"),
    hobbies: searchParams.getAll("hobby"),
    sortBy: searchParams.get("sortBy") ?? "first_name",
    sortDir: searchParams.get("sortDir") ?? "asc",
  };

  const setSearch = (search: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (search) {
        next.set("search", search);
      } else {
        next.delete("search");
      }
      return next;
    });
  };

  const toggleNationality = (nationality: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams("nationality");
      const current = prev.getAll("nationality");
      next.delete("nationality");
      if (current.includes(nationality)) {
        current
          .filter((n) => n !== nationality)
          .forEach((n) => next.append("nationality", n));
      } else {
        [...current, nationality].forEach((n) => next.append("nationality", n));
      }

      return next;
    });
  };

  const toggleHobby = (hobby: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = prev.getAll("hobby");
      next.delete("hobby");
      if (current.includes(hobby)) {
        current
          .filter((h) => h !== hobby)
          .forEach((h) => next.append("hobby", h));
      } else {
        [...current, hobby].forEach((h) => next.append("hobby", h));
      }
      return next;
    });
  };

  const setSortBy = (sortBy: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortBy", sortBy);
      return next;
    });
  };

  const setSortDir = (sortDir: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("sortDir", sortDir);
      return next;
    });
  };

  return {
    filters,
    setSearch,
    toggleNationality,
    toggleHobby,
    setSortBy,
    setSortDir,
  };
};
