import { Button, Text, Skeleton } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import DiscountTable from "../../../components/dashboard/pointOfSales/happyTime/discountTable";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import { useState } from "react";
import CreateDiscountModal from "../../../components/dashboard/pointOfSales/happyTime/modals/createDiscountModal";
import { useFetchAllDiscount } from "../../../hooks/backendApis/pos/discount";
import AnalysisOverview1 from "../../../components/dashboard/pointOfSales/happyTime/overView2";
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

const DiscountTableSkeleton = () => (
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

const HappyTimePage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const [dateRange] = useState<{ startDate: string; endDate: string }>({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "active") return "active";
    if (status.toLowerCase() === "inactive") return "inactive";
    if (status.toLowerCase() === "expired") return "expired";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    // @ts-ignore
    search: filters.search ?? "",
    // @ts-ignore
    sort_by: filters.sortBy ?? "",
    per_page: "",
    paginate: true,
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.discountStatus),
    discount_type: filters.type === undefined ? "" : filters.type,
    page: currentPage.toString(),
  });

  const startDate = dateRange.startDate || appliedFilters?.startDate || "";
  const endDate = dateRange.endDate || appliedFilters?.endDate || "";

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    ...(startDate ? { start_date: startDate } : {}),
    ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  // @ts-ignore
  const { data = {}, isLoading = false } = useFetchAllDiscount(payload) || {};

  const rawDiscounts = data?.data?.discounts?.data || [];
  const stats = data?.data?.stats || {};

  const handleFilterChange = (filters: FilterValues) => setAppliedFilters(filters);

  const paginationData = data?.data?.discounts
    ? {
        current_page: data.data.discounts.current_page,
        last_page: data.data.discounts.last_page,
        per_page: data.data.discounts.per_page,
        total: data.data.discounts.total,
        from: data.data.discounts.from,
        to: data.data.discounts.to,
        next_page_url: data.data.discounts.next_page_url,
        prev_page_url: data.data.discounts.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Discounts
          </Text>
        </div>
        <div className="flex flex-row gap-2 md:gap-4 justify-start sm:justify-end">
          <Link to={ROUTES.createDiscounts}>
            <Button
              variant="filled-primary"
              className="flex gap-1.5 items-center justify-center"
              style={{ padding: "0.8rem 0.5rem" }}
            >
              <span className="whitespace-nowrap">Create Discount</span>
              <Plus size={24} />
            </Button>
          </Link>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Overview / stats */}
      {isLoading ? <OverviewSkeleton /> : <AnalysisOverview1 stats={stats} />}

      {/* Discounts table */}
      {isLoading ? (
        <DiscountTableSkeleton />
      ) : (
        <DiscountTable
          rawDiscounts={rawDiscounts}
          isLoading={isLoading}
          onFilterChange={handleFilterChange}
          paginationData={paginationData}
          onPageChange={handlePageChange}
          filters={appliedFilters}
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

      <CreateDiscountModal
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
        onCreated={() => {
          setIsLogComplaintsOpen(false);
          // refetch();
        }}
      />
    </PageContainer>
  );
};

export default HappyTimePage;

