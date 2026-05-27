import React from "react";
import { useUsers } from "../hooks/useUsers";
import { useFilters } from "../hooks/useFilters";

export default function Sidebar() {
  const { filters } = useFilters();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUsers(filters);
  console.log("data", data);
  return <div></div>;
}
