import { useSearchParams } from "react-router-dom";

import { IFilters } from "../interfaces/users.interface";
import { ESearchParam, ESortBy, ESortDir } from "../enums/filters.enum";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: IFilters = {
    search: searchParams.get(ESearchParam.SEARCH) ?? "",
    nationalities: searchParams.getAll(ESearchParam.NATIONALITY),
    hobbies: searchParams.getAll(ESearchParam.HOBBY),
    sortBy: searchParams.get(ESearchParam.SORT_BY) ?? ESortBy.FIRST_NAME,
    sortDir: searchParams.get(ESearchParam.SORT_DIR) ?? ESortDir.ASC,
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const setSearch = (search: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (search) {
        next.set(ESearchParam.SEARCH, search);
      } else {
        next.delete(ESearchParam.SEARCH);
      }
      return next;
    });
  };

  const toggleNationality = (nationality: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = prev.getAll(ESearchParam.NATIONALITY);
      next.delete(ESearchParam.NATIONALITY);
      if (current.includes(nationality)) {
        current
          .filter((n) => n !== nationality)
          .forEach((n) => next.append(ESearchParam.NATIONALITY, n));
      } else {
        [...current, nationality].forEach((n) =>
          next.append(ESearchParam.NATIONALITY, n),
        );
      }

      return next;
    });
  };

  const toggleHobby = (hobby: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = prev.getAll(ESearchParam.HOBBY);
      next.delete(ESearchParam.HOBBY);
      if (current.includes(hobby)) {
        current
          .filter((h) => h !== hobby)
          .forEach((h) => next.append(ESearchParam.HOBBY, h));
      } else {
        [...current, hobby].forEach((h) => next.append(ESearchParam.HOBBY, h));
      }
      return next;
    });
  };

  const setSortBy = (sortBy: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(ESearchParam.SORT_BY, sortBy);
      return next;
    });
  };

  const setSortDir = (sortDir: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(ESearchParam.SORT_DIR, sortDir);
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
    resetFilters,
  };
};
