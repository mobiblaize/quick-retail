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

const ReturnsPage = () => {
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });


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
    per_page: "500",
    paginate: true,
    location_name: filters.location,
    return_reason:filters.reason,
    status: mapOrderStatus(filters.returnStatus),
    price_from: filters.priceFrom ?? 100,
    price_to: filters.priceTo ?? "",
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
      } 
  
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Returns and Overview
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
      <ReturnsAnalytics
        data={{
          totalReturns: data?.data?.totalReturns ?? 0,
          pending_complaints: data?.data?.pending_complaints ?? 0,
          resolved_complaints: data?.data?.resolved_complaints ?? 0,
          declined_complaints: data?.data?.declined_complaints ?? 0,
        }}
        setDateRange={setDateRange}
      />
      <ReturnsTable returns={returns} isLoading={isLoading}    onFilterChange={handleFilterChange}/>
    </PageContainer>
  );
};

export default ReturnsPage;
