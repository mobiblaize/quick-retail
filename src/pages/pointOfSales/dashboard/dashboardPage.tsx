import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalyticsOverview from "../../../components/dashboard/pointOfSales/dashboard/analyticsOverview";
import SalesOverview from "../../../components/dashboard/pointOfSales/dashboard/salesOverview";
import CustomerAnalysis from "../../../components/dashboard/pointOfSales/dashboard/customerAnalysis";
import DivisionSalesOverview from "../../../components/dashboard/pointOfSales/dashboard/divisionSalesOverview";
import CustomerOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/orderTable";
import { useFetchAllSales } from "../../../hooks/backendApis/pos/salesProcessing";
import { useState } from "react";


const DashboardPage = () => {
  const [dateRange, ] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const { data} = useFetchAllSales({
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
  });
  const salesData = data?.data?.sales?.data ?? [];
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
      <CustomerOrdersTable salesData={salesData} />
    </PageContainer>
  );
};

export default DashboardPage;
