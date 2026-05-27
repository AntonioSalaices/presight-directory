import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../api/users";
import { IFilters } from "../interfaces/users.interface";

const LIMIT = 20;

export const useUsers = (filters: IFilters) => {
  return useInfiniteQuery({
    queryKey: ["users", filters],
    queryFn: ({ pageParam = 1 }) =>
      fetchUsers({
        search: filters.search,
        nationality: filters.nationalities,
        hobby: filters.hobbies,
        sortBy: filters.sortBy,
        sortDir: filters.sortDir,
        page: pageParam,
        limit: LIMIT,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    initialPageParam: 1,
  });
};
