import { Button, Text, Skeleton } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/stores/analysisOverview";
import StoreOverviewTable from "../../../components/dashboard/pointOfSales/stores/storeOverviewTable";
import AddNewStore from "../../../components/dashboard/pointOfSales/stores/modals/addNewStore";
import { useEffect, useRef, useState } from "react";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

/* ---------- Skeletons ---------- */
const OverviewSkeleton = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm p-4">
        <Skeleton height={16} width="40%" mb="sm" />
        <Skeleton height={28} width="60%" />
        <Skeleton height={10} mt="sm" width="30%" />
      </div>
    ))}
  </section>
);

const StoresTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* top controls */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
      <Skeleton height={36} width={220} />
    </div>
    {/* table head */}
    <div className="grid grid-cols-6 gap-4 border-b py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>
    {/* rows */}
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
        {Array.from({ length: 6 }).map((_, c) => (
          <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
        ))}
      </div>
    ))}
    {/* pagination */}
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
/* ---------- /Skeletons ---------- */

const StoreTarget = () => {
  const [, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const [appliedFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  // Track first load so later refetches don’t swap in skeletons
  const firstLoad = useRef(true);

  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
    search: filters.search ?? "",
  });

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  // @ts-ignore
  const { data, isLoading, isFetching, refetch } = useFetchStore(payload) || {};

  useEffect(() => {
    if (!isLoading) firstLoad.current = false;
  }, [isLoading]);

  const showOverviewSkeleton = firstLoad.current && isLoading;
  const showTableSkeleton =
    (firstLoad.current && isLoading) ||
    (!Array.isArray(data?.data?.stores?.data) && isLoading);

  const stores = Array.isArray(data?.data?.stores?.data)
    ? data.data.stores.data
    : [];

  const paginationData = data?.data?.stores
    ? {
        current_page: data.data.stores.current_page,
        last_page: data.data.stores.last_page,
        per_page: data.data.stores.per_page,
        total: data.data.stores.total,
        from: data.data.stores.from,
        to: data.data.stores.to,
        next_page_url: data.data.stores.next_page_url,
        prev_page_url: data.data.stores.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const [isAddNewStoreOpen, setIsAddNewStoreOpen] = useState(false);

  const subHeaders = [
    <div key="1" className="w-full">
      <div className="flex flex-row flex-wrap items-center justify-between gap-4">
        <Text fw={500} size="xl" c="#1D2739">
          Stores
        </Text>
        <div className="flex gap-4 overflow-x-auto pb-2">
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center whitespace-nowrap"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setIsAddNewStoreOpen(true)}
          >
            Add New Store
            <Plus />
          </Button>
        </div>
      </div>
    </div>,
  ];

  const handleRefetchAll = async () => {
    try {
      await refetch();
    } catch (err) {
      console.error("Error refetching store list:", err);
    }
  };

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Overview */}
      {showOverviewSkeleton ? (
        <OverviewSkeleton />
      ) : (
        <AnalysisOverview
          data={data?.data?.stats}
          isLoading={Boolean(isLoading || isFetching)}
          setDateRange={setDateRange}
        />
      )}

      {/* Stores table */}
      {showTableSkeleton ? (
        <StoresTableSkeleton />
      ) : (
        <StoreOverviewTable
          stores={stores}
          loading={Boolean(isLoading || isFetching)}
          refetchStores={handleRefetchAll}
          paginationData={paginationData}
          onPageChange={handlePageChange}
          searchTerm={searchTerm}
          setSearchTerm={(val: string) => {
            setSearchTerm((prev) => {
              if (prev !== val) setCurrentPage(1);
              return val;
            });
          }}
          activeSort={activeSort}
          setSort={(sortBy) => {
            setActiveSort(sortBy);
            setCurrentPage(1);
          }}
        />
      )}

      <AddNewStore
        opened={isAddNewStoreOpen}
        onClose={() => setIsAddNewStoreOpen(false)}
        refetchStores={handleRefetchAll}
      />
    </PageContainer>
  );
};

export default StoreTarget;

