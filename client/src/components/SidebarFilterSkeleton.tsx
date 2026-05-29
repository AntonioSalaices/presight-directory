interface ISidebarFilterSkeletonProps {
  rows?: number;
}

const SidebarFilterSkeleton = ({ rows = 8 }: ISidebarFilterSkeletonProps) => (
  <ul className="flex flex-col gap-1" aria-hidden>
    {Array.from({ length: rows }).map((_, i) => (
      <li
        key={i}
        className="flex justify-between items-center px-2 py-1 animate-pulse"
      >
        <div className="h-4 bg-surface-muted rounded w-24" />
        <div className="h-4 bg-surface-muted rounded w-8" />
      </li>
    ))}
  </ul>
);

export default SidebarFilterSkeleton;
