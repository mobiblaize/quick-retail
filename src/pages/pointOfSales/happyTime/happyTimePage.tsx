import { Button, Text } from "@mantine/core";
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

const HappyTimePage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
  const [dateRange, ] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 

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
    types: filters.type === 'all' || !filters.type ? "" : filters.type, 
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
};
// @ts-ignore
  const { data = {}, isLoading = false } =  useFetchAllDiscount(payload) || {};

  const rawDiscounts = data?.data?.discounts?.data || [];
  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  
  const subHeaders = [
    <div key="1">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <Text fw={500} size="xl" c="black">
          Discounts
        </Text>
        <div className="flex flex-row gap-2 md:gap-4">
          {/* <Link to={ROUTES.happyDiscountAnalytics}>
            <Button
              variant="outline-primary"
              className="flex gap-1.5 items-center justify-center"
              style={{ padding: "0.8rem 1rem" }}
            >
              <span className="whitespace-nowrap">Discount Analytics</span>
              <ChevronRight />
            </Button>
          </Link> */}

          <Link to={ROUTES.createDiscounts}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 0.5rem" }}
            // onClick={() => setIsLogComplaintsOpen(true)}
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
      <AnalysisOverview1 />   
      <DiscountTable 
        rawDiscounts={rawDiscounts}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
        paginationData={paginationData}
        onPageChange={handlePageChange}
      />
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
