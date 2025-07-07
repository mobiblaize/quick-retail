import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalyticsOverview from "../../../components/dashboard/pointOfSales/dashboard/analyticsOverview";
import SalesOverview from "../../../components/dashboard/pointOfSales/dashboard/salesOverview";
import CustomerAnalysis from "../../../components/dashboard/pointOfSales/dashboard/customerAnalysis";
import DivisionSalesOverview from "../../../components/dashboard/pointOfSales/dashboard/divisionSalesOverview";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";



const AdminDashboardPage = () => {

  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
  const [dateRange, ] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "paid") return "paid";
    if (status.toLowerCase() === "pending") return "pending";
    return status.toLowerCase();
  };
  

const mapFiltersToPayload = (filters: FilterValues) => ({
  // @ts-ignore
  search: filters.search ?? "",
  // @ts-ignore
  sort_by: filters.sortBy ?? "",
  per_page: "500",
  paginate: true,
  start_date: filters.startDate ?? "",
  end_date: filters.endDate ?? "",
  status: mapOrderStatus(filters.paymentStatus),
  price_from: filters.priceFrom ?? 100,
  price_to: filters.priceTo ?? ""
});


  const startDate = dateRange.startDate || appliedFilters?.startDate || "";
const endDate = dateRange.endDate || appliedFilters?.endDate || "";

const shouldFetch = startDate && endDate; 

const payload = shouldFetch
  ? {
      ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
      start_date: startDate,
      end_date: endDate,
    }
  : undefined;

  const { data = {}, } = useFetchAllSales(payload) || {};
  

  const salesData = data?.data?.sales?.data ?? [];

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const subHeaders = [
    <Text fw={500} size="xl" c="black">
      Dashboard
    </Text>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AnalyticsOverview />
      <SalesOverview />
      <CustomerAnalysis />
      <DivisionSalesOverview />
      <CustomerOrdersTable salesData={salesData}  onFilterChange={handleFilterChange} />
    </PageContainer>
  );
};

export default AdminDashboardPage;
