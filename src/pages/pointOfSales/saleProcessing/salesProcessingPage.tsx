import { SetStateAction, useEffect, useState } from "react";
import { Text, Button, Skeleton } from "@mantine/core";
import { Link, useLocation } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { ROUTES } from "../../../constants/routes";
import SalesOverview from "../../../components/dashboard/pointOfSales/salesProcessing/salesOverview";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

// ---------- Skeletons ----------
const SalesOverviewSkeleton = () => (
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

const OrdersTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* top controls: search/filters */}
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
    {/* table rows */}
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

const SalesProcessingPage = () => {
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(
    {} as FilterValues
  );
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const location = useLocation();

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  useEffect(() => {
    if (location.state?.reload) {
      setCurrentPage(1);
      setAppliedFilters({} as FilterValues);
      window.history.replaceState({}, document.title);
    }
  }, [location.state?.reload]);

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "paid") return "paid";
    if (status.toLowerCase() === "pending") return "pending";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    per_page: perPage.toString(),
    paginate: true,
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.paymentStatus),
    price_from: filters.priceFrom ?? 100,
    price_to: filters.priceTo ?? "",
    page: currentPage.toString(),
  });

  // Separate payloads for overview and table data
  const overviewPayload = {
    page: currentPage.toString(),
    per_page: perPage.toString(),
  };

  const tablePayload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    ...(dateRange.startDate ? { start_date: dateRange.startDate } : {}),
    ...(dateRange.endDate ? { end_date: dateRange.endDate } : {}),
    page: currentPage.toString(),
    per_page: perPage.toString(),
    search: searchTerm,
    sort_by: activeSort,
  };

  // Separate API calls for overview and table
  const { data: overviewData = {}, isLoading: isOverviewLoading } =
    useFetchAllSales(overviewPayload) || {};
  const { data: tableData = {}, isLoading: isTableLoading } =
    useFetchAllSales(tablePayload) || {};

  const salesData = tableData?.data?.sales?.data ?? [];

  const paginationData = tableData?.data?.sales
    ? {
        current_page: tableData.data.sales.current_page,
        last_page: tableData.data.sales.last_page,
        per_page: tableData.data.sales.per_page,
        total: tableData.data.sales.total,
        from: tableData.data.sales.from,
        to: tableData.data.sales.to,
        next_page_url: tableData.data.sales.next_page_url,
        prev_page_url: tableData.data.sales.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleFilterChange = (filters: FilterValues) =>
    setAppliedFilters(filters);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="#1D2739">
          Sales Processing
        </Text>
        <Link to={ROUTES.createOrder}>
          <Button variant="filled-primary">Create Order</Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Overview: skeleton while loading */}
      {isOverviewLoading ? (
        <SalesOverviewSkeleton />
      ) : (
        <SalesOverview
          data={overviewData?.data}
          isLoading={isOverviewLoading}
          onDateRangeChange={setDateRange}
        />
      )}

      {/* Orders table: skeleton while loading */}
      {isTableLoading ? (
        <OrdersTableSkeleton />
      ) : (
        <CustomerOrdersTable
          salesData={salesData}
          onFilterChange={handleFilterChange}
          isLoading={isTableLoading}
          paginationData={paginationData}
          onPageChange={handlePageChange}
          onSearchChange={setSearchTerm}
          searchTerm={searchTerm}
          filters={appliedFilters}
          setSearchTerm={(val: string) => {
            setSearchTerm((prev) => {
              if (prev !== val) setCurrentPage(1);
              return val;
            });
          }}
          activeSort={activeSort}
          setSort={(sortBy: SetStateAction<string>) => {
            setActiveSort(sortBy);
            setCurrentPage(1);
          }}
        />
      )}
    </PageContainer>
  );
};

export default SalesProcessingPage;
