const UserCardSkeleton = () => {
  return (
    <div className="flex items-start gap-3 p-4 border-b border-line animate-pulse">
      <div className="w-12 h-12 rounded-full bg-surface-muted" />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-4 bg-surface-muted rounded w-1/3" />
        <div className="h-3 bg-surface-muted rounded w-1/4" />
        <div className="flex gap-1">
          <div className="h-5 bg-surface-muted rounded-full w-16" />
          <div className="h-5 bg-surface-muted rounded-full w-16" />
        </div>
      </div>
    </div>
  );
};
export default UserCardSkeleton;
