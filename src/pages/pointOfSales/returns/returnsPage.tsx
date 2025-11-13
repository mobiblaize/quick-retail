import { Button, Text, Skeleton } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import ReturnsAnalytics from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsAnlytics";
import ReturnsTable from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsTable";
import { useFetchAllreturns } from "../../../hooks/backendApis/pos/returns";
import { ROUTES } from "../../../constants/routes";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

/* ---------- Skeletons ---------- */
const AnalyticsSkeleton = () => (
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

const ReturnsTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex flex-wrap gap-3 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={36} width={180 + i * 40} />
      ))}
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
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} height={28} width={32} />
        ))}
      </div>
    </div>
  </section>
);
/* ---------- /Skeletons ---------- */

const ReturnsPage = () => {
  const navigate = useNavigate();

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  /* ---------- Filter Mapping ---------- */
  const mapOrderStatus = (status?: string) => {
    if (!status || status.toLowerCase() === "all") return "";
    const allowedStatuses = ["pending", "resolved", "declined"];
    const lowerStatus = status.toLowerCase();
    return allowedStatuses.includes(lowerStatus) ? lowerStatus : "";
  };

  const mapFiltersToPayload = (filters: FilterValues) => {
    const payload: Record<string, any> = {
      search: filters.search ?? "",
      sort_by: filters.sortBy ?? "",
      paginate: true,
      location_name: filters.location,
      return_reason: filters.reason === "all" ? "" : filters.reason,
      status: mapOrderStatus(filters.returnStatus),
      price_from: filters.priceFrom ?? 100,
      price_to: filters.priceTo ?? "",
      page: currentPage.toString(),
    };

    if (filters.startDate) payload.start_date = filters.startDate;
    if (filters.endDate) payload.end_date = filters.endDate;

    return payload;
  };

  /* ---------- Payloads ---------- */
  const analyticsPayload = {
    ...mapFiltersToPayload(appliedFilters),
    page: currentPage,
    per_page: perPage.toString(),
    ...(dateRange.startDate ? { start_date: dateRange.startDate } : {}),
    ...(dateRange.endDate ? { end_date: dateRange.endDate } : {}),
  };

  const tablePayload = {
    ...mapFiltersToPayload(appliedFilters),
    ...(dateRange.startDate ? { start_date: dateRange.startDate } : {}),
    ...(dateRange.endDate ? { end_date: dateRange.endDate } : {}),
    page: currentPage,
    per_page: perPage.toString(),
    search: searchTerm,
    sort_by: activeSort,
  };

  /* ---------- API Calls ---------- */
  const {
    data: analyticsData,
    isLoading: isAnalyticsLoading,
  } = useFetchAllreturns(analyticsPayload) || { data: {}, isLoading: false };

  const {
    data: tableData,
    isLoading: isTableLoading,
  } = useFetchAllreturns(tablePayload) || { data: {}, isLoading: false };

  const returns = Array.isArray(tableData?.data?.returns?.data)
    ? tableData.data.returns.data
    : [];

  const paginationData = tableData?.data?.returns
    ? {
        current_page: tableData.data.returns.current_page,
        last_page: tableData.data.returns.last_page,
        per_page: tableData.data.returns.per_page,
        total: tableData.data.returns.total,
        from: tableData.data.returns.from,
        to: tableData.data.returns.to,
        next_page_url: tableData.data.returns.next_page_url,
        prev_page_url: tableData.data.returns.prev_page_url,
      }
    : undefined;

  /* ---------- Handlers ---------- */
  const handleFilterChange = (filters: FilterValues) => setAppliedFilters(filters);
  const handleLogPage = () => navigate(ROUTES.logReturns);
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleResetFilters = () => {
    setDateRange({ startDate: "", endDate: "" });
    setAppliedFilters({} as FilterValues);
    setCurrentPage(1);
    setSearchTerm("");
    setActiveSort("");
  };

  /* ---------- Subheader ---------- */
  const subHeaders = [
    <div key="header">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Returns and Refunds
        </Text>
        <Button
          onClick={handleLogPage}
          variant="filled-primary"
          className="flex gap-1.5"
        >
          New Return Log
          <Plus size={24} />
        </Button>
      </div>
    </div>,
  ];

  /* ---------- Render ---------- */
  return (
    <PageContainer subHeaders={subHeaders}>
      {/* ---------- Analytics ---------- */}
      {isAnalyticsLoading ? (
        <AnalyticsSkeleton />
      ) : (
        <ReturnsAnalytics
          data={{
            totalReturns: analyticsData?.data?.totalReturns ?? 0,
            pending_complaints: analyticsData?.data?.pending_complaints ?? 0,
            resolved_complaints: analyticsData?.data?.resolved_complaints ?? 0,
            declined_complaints: analyticsData?.data?.declined_complaints ?? 0,
          }}
          onDateRangeChange={setDateRange}
          onReset={handleResetFilters}
        />
      )}

      {/* ---------- Table ---------- */}
      {isTableLoading ? (
        <ReturnsTableSkeleton />
      ) : (
        <ReturnsTable
          returns={returns}
          isLoading={isTableLoading}
          onFilterChange={handleFilterChange}
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
          setSort={(sortBy) => {
            setActiveSort(sortBy);
            setCurrentPage(1);
          }}
        />
      )}
    </PageContainer>
  );
};

export default ReturnsPage;
