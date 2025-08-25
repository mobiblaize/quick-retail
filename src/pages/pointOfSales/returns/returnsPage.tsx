import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import ReturnsAnalytics from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsAnlytics";
import ReturnsTable from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsTable";
import { useFetchAllreturns } from "../../../hooks/backendApis/pos/returns";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { Loader } from "@mantine/core";

const ReturnsPage = () => {
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";

    const allowedStatuses = ["pending", "resolved", "declined"];
    const lowerStatus = status.toLowerCase();

    if (allowedStatuses.includes(lowerStatus)) return lowerStatus;

    return "";
  };

  const mapFiltersToPayload = (filters: FilterValues) => {
    const payload: any = {
      //@ts-ignore
      search: filters.search ?? "",
      //@ts-ignore
      sort_by: filters.sortBy ?? "",
      per_page: "",
      paginate: true,
      location_name: filters.location,
      return_reason: filters.reason,
      status: mapOrderStatus(filters.returnStatus),
      price_from: filters.priceFrom ?? 100,
      price_to: filters.priceTo ?? "",
      page: currentPage.toString(),
    };

    if (filters.startDate) payload.start_date = filters.startDate;
    if (filters.endDate) payload.end_date = filters.endDate;

    return payload;
  };

  const navigate = useNavigate();

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

  const { data = {}, isLoading = false } = useFetchAllreturns(payload) || {};

  const returns = Array.isArray(data?.data?.returns?.data)
    ? data.data.returns.data
    : [];

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const handleLogPage = () => {
    navigate(ROUTES.logReturns);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

 


  const paginationData = data?.data?.returns
  ? {
      current_page: data.data.returns.current_page,
      last_page: data.data.returns.last_page,
      per_page: data.data.returns.per_page,
      total: data.data.returns.total,
      from: data.data.returns.from,
      to: data.data.returns.to,
      next_page_url: data.data.returns.next_page_url,
      prev_page_url: data.data.returns.prev_page_url,
    }
  : undefined;


  const subHeaders = [
    <div key="1">
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

  return (
    <PageContainer subHeaders={subHeaders}>
       {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
      <ReturnsAnalytics
        data={{
          totalReturns: data?.data?.totalReturns ?? 0,
          pending_complaints: data?.data?.pending_complaints ?? 0,
          resolved_complaints: data?.data?.resolved_complaints ?? 0,
          declined_complaints: data?.data?.declined_complaints ?? 0,
        }}
        setDateRange={setDateRange}
      />
      <ReturnsTable
        returns={returns}
        isLoading={isLoading}
        onFilterChange={handleFilterChange}
              // @ts-ignore
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm} 
        filters={appliedFilters}  
        setSearchTerm={(val: string) => {
          setSearchTerm(prev => {
            if (prev !== val) {
              setCurrentPage(1); 
            }
            return val;
          });
        }}
        activeSort={activeSort}      
        setSort={(sortBy) => {
          setActiveSort(sortBy);
          setCurrentPage(1);          
        }}
      />
    </PageContainer>
  );
};

export default ReturnsPage;
4