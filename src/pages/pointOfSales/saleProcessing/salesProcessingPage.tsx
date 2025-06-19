
import { useEffect, useState } from "react";
import { Text, Button } from "@mantine/core";
import { Link } from "react-router";
import PageContainer from "../../../layout/pageContainer";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { ROUTES } from "../../../constants/routes";
import SalesOverview from "../../../components/dashboard/pointOfSales/salesProcessing/salesOverview";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

const SalesProcessingPage = () => {
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
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

  const shouldFetch = dateRange.startDate && dateRange.endDate;

  const { data, isLoading, refetch } = useFetchAllSales(
    shouldFetch
      ? {
          ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
        }
      : undefined
  );
  

  useEffect(() => {
    if (shouldFetch) {
      refetch();
    }
  }, [appliedFilters, dateRange, refetch, shouldFetch])

  const salesData = data?.data?.sales?.data ?? [];

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };



  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Sale Processing
        </Text>
        <Link to={ROUTES.createOrder}>
          <Button variant="filled-primary">Create Order</Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <SalesOverview
        data={data?.data}
        isLoading={isLoading}
        setDateRange={setDateRange}
      />
        <CustomerOrdersTable
        salesData={salesData}
        onFilterChange={handleFilterChange}
      />
    </PageContainer>
  );
};

export default SalesProcessingPage;

