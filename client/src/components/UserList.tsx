import { useRef, useEffect } from "react";

import { useVirtualizer } from "@tanstack/react-virtual";

import { useUsers } from "../hooks/useUsers";
import { useFilters } from "../hooks/useFilters";
import UserCard from "./UserCard";

export default function UserList() {
  const { filters } = useFilters();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useUsers(filters);
  const parentRef = useRef<HTMLDivElement>(null);

  const users = data?.pages.flatMap((page) => page.data) ?? [];

  const virtualizer = useVirtualizer({
    count: hasNextPage ? users.length + 1 : users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
  });

  useEffect(() => {
    const lastItem = virtualizer.getVirtualItems().at(-1);
    if (!lastItem) return;
    if (
      lastItem.index >= users.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [virtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage]);

  if (isLoading)
    return <div className="p-8 text-center text-text-muted">Loading...</div>;
  if (isError)
    return (
      <div className="p-8 text-center text-red-400">Error loading users</div>
    );
  if (!users.length)
    return (
      <div className="p-8 text-center text-text-muted">No users found</div>
    );
  return (
    <div ref={parentRef} className="overflow-auto h-full">
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const user = users[virtualItem.index];
          return (
            <div
              key={virtualItem.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              {user ? <UserCard user={user} /> : <div>Loading...</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
