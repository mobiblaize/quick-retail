import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalyticsOverview from "../../../components/dashboard/pointOfSales/dashboard/analyticsOverview";
import SalesOverview from "../../../components/dashboard/pointOfSales/dashboard/salesOverview";
import CustomerAnalysis from "../../../components/dashboard/pointOfSales/dashboard/customerAnalysis";
import DivisionSalesOverview from "../../../components/dashboard/pointOfSales/dashboard/divisionSalesOverview";
import DashboardOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/dashboardOrderTable";
import EmptyState from "../../../components/General/EmptyState";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      const [
        analyticsHasData,
        salesHasData,
        customerHasData,
        divisionHasData,
        ordersHasData,
      ] = await Promise.all([
        Promise.resolve(true), 
        Promise.resolve(false),
        Promise.resolve(false),
        Promise.resolve(false),
        Promise.resolve(false),
      ]);

      const anyData = [
        analyticsHasData,
        salesHasData,
        customerHasData,
        divisionHasData,
        ordersHasData,
      ].some(Boolean);

      setHasData(anyData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const subHeaders = [
    <Text fw={500} size="xl" c="black">
      Dashboard
    </Text>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {isLoading ? (
        <Text ta="center" py="xl">Loading...</Text>
      ) : !hasData ? (
        <EmptyState
        />
      ) : (
        <>
          <AnalyticsOverview />
          <SalesOverview />
          <CustomerAnalysis />
          <DivisionSalesOverview />
          <DashboardOrdersTable />
        </>
      )}
    </PageContainer>
  );
};

export default DashboardPage;

