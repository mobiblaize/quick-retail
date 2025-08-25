
import {  SetStateAction, useEffect, useState } from "react";
import { Text, Button } from "@mantine/core";
import { Link, useLocation } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { ROUTES } from "../../../constants/routes";
import SalesOverview from "../../../components/dashboard/pointOfSales/salesProcessing/salesOverview";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { Loader } from "@mantine/core";



const SalesProcessingPage = () => {
  // const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);

  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });


  const location = useLocation();


  useEffect(() => {
    if (location.state?.reload) {
      // Reload logic here
      setCurrentPage(1);
      // @ts-ignore
      setAppliedFilters(null);
      window.history.replaceState({}, document.title); 
    }
  }, [location.state?.reload]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState("");
  //@ts-ignore
  // const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "paid") return "paid";
    if (status.toLowerCase() === "pending") return "pending";
    return status.toLowerCase();
  };
  

const mapFiltersToPayload = (filters: FilterValues) => ({
  // @ts-ignore
  search: filters.search ?? "",
  // search: searchTerm, 
  // @ts-ignore
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


  const startDate = dateRange.startDate || appliedFilters?.startDate || "";
const endDate = dateRange.endDate || appliedFilters?.endDate || "";

const [activeSort, setActiveSort] = useState("");
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
  const { data = {}, isLoading = false } = useFetchAllSales(payload) || {};
  

  const salesData = data?.data?.sales?.data ?? [];

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);  
  };


  

  const paginationData = data?.data?.sales
  ? {
      current_page: data.data.sales.current_page,
      last_page: data.data.sales.last_page,
      per_page: data.data.sales.per_page,
      total: data.data.sales.total,
      from: data.data.sales.from,
      to: data.data.sales.to,
      next_page_url: data.data.sales.next_page_url,
      prev_page_url: data.data.sales.prev_page_url,
    }
  : undefined;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  

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
       {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
      <SalesOverview
        data={data?.data}
        isLoading={isLoading}
        setDateRange={setDateRange}
      />
        <CustomerOrdersTable
        salesData={salesData}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
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
        setSort={(sortBy: SetStateAction<string>) => {
          setActiveSort(sortBy);
          setCurrentPage(1);          
        }}
      />
    </PageContainer>
  );
};

export default SalesProcessingPage;

