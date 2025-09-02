import { Text, Skeleton } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";
import { useFetchAllTransactions } from "../../../hooks/backendApis/pos/transactions";
import { useEffect, useRef, useState } from "react";
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

const TransactionsTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
      <Skeleton height={36} width={220} />
    </div>
    <div className="grid grid-cols-6 gap-4 border-b py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
        {Array.from({ length: 6 }).map((_, c) => (
          <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
        ))}
      </div>
    ))}
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

const TransactionPage = () => {
  const [tempDateRange, setTempDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [perPage] = useState(10);

  // Track first load so later refetches don't swap in skeletons
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
  const { data, isLoading, isFetching } = useFetchAllTransactions(payload) || {};
  const transactionsArray = data?.data?.transactions?.data ?? [];

  useEffect(() => {
    if (!isLoading) firstLoad.current = false;
  }, [isLoading]);

  const showOverviewSkeleton = firstLoad.current && isLoading;
  const showTableSkeleton = (firstLoad.current && isLoading) || (!transactionsArray.length && isLoading);

  const paginationData = data?.data?.transactions
    ? {
        current_page: data.data.transactions.current_page,
        last_page: data.data.transactions.last_page,
        per_page: data.data.transactions.per_page,
        total: data.data.transactions.total,
        from: data.data.transactions.from,
        to: data.data.transactions.to,
        next_page_url: data.data.transactions.next_page_url,
        prev_page_url: data.data.transactions.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Transactions
        </Text>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Overview */}
      {showOverviewSkeleton ? (
        <OverviewSkeleton />
      ) : (
        <TransactionOverview
          data={data?.data}
          isLoading={Boolean(isLoading || isFetching)}
          onDateRangeChange={({ startDate, endDate }) => {
            const updatedRange = {
              startDate: startDate || tempDateRange.startDate,
              endDate: endDate || tempDateRange.endDate,
            };
            setTempDateRange(updatedRange);

            if (updatedRange.startDate && updatedRange.endDate) {
              const newFilters = {
                ...appliedFilters,
                startDate: updatedRange.startDate,
                endDate: updatedRange.endDate,
              };
              setAppliedFilters(newFilters);
              setCurrentPage(1);
            }
          }}
        />
      )}

      {/* Table */}
      {showTableSkeleton ? (
        <TransactionsTableSkeleton />
      ) : (
        <AllTransactionTable
          data={transactionsArray}
          isLoading={Boolean(isLoading || isFetching)}
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
          paginationData={paginationData}
          onPageChange={handlePageChange}
        />
      )}

      {!isLoading && !isFetching && transactionsArray.length === 0 && (
        <div className="mt-6 text-center text-gray-600">No transactions to display</div>
      )}
    </PageContainer>
  );
};

export default TransactionPage;
