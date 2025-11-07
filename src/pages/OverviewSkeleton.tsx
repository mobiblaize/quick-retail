import { Skeleton } from "@mantine/core";

const OverviewSkeleton = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-sm p-4">
          <Skeleton height={16} width="40%" mb="sm" />
          <Skeleton height={28} width="60%" />
          <Skeleton height={10} mt="sm" width="30%" />
        </div>
      ))}
    </section>
  );
};

export default OverviewSkeleton;
