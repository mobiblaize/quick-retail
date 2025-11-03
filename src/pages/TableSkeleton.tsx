import { Skeleton } from "@mantine/core";

const TableSkeleton = () => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4 w-full">
      {/* Header (filters/search) */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Skeleton height={36} width={220} />
        <Skeleton height={36} width={160} />
        <Skeleton height={36} width={140} />
        <Skeleton height={36} width={120} />
        <Skeleton height={36} width={220} />
      </div>

      {/* Table head */}
      <div className="grid grid-cols-6 gap-4 border-b py-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={14} width="60%" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 8 }).map((_, r) => (
        <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
          {Array.from({ length: 6 }).map((_, c) => (
            <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
          ))}
        </div>
      ))}

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between mt-4">
        <Skeleton height={28} width={180} />
        <div className="flex gap-2">
          <Skeleton height={28} width={32} />
          <Skeleton height={28} width={32} />
          <Skeleton height={28} width={32} />
        </div>
      </div>
    </section>
  );
};

export default TableSkeleton;
