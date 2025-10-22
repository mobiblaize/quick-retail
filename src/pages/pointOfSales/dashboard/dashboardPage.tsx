import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalyticsOverview from "../../../components/dashboard/pointOfSales/dashboard/analyticsOverview";
import SalesOverview from "../../../components/dashboard/pointOfSales/dashboard/salesOverview";
import CustomerAnalysis from "../../../components/dashboard/pointOfSales/dashboard/customerAnalysis";
import DivisionSalesOverview from "../../../components/dashboard/pointOfSales/dashboard/divisionSalesOverview";
import DashboardOrdersTable from "../../../components/dashboard/pointOfSales/dashboard/dashboardOrderTable";
import EmptyState from "../../../components/General/EmptyState";
import { useState, useEffect } from "react";
import GetStartedChecklist from "../../../components/dashboard/pointOfSales/dashboard/GetStartedChecklist";
import { useGetData } from "../../../hooks/useApis";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  // Check if user is new by fetching onboarding progress
  const { data: onboardingData } = useGetData("pos/onboard/onboarding-progress");

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

  // Determine if user is new (no onboarding progress or all steps incomplete)
  const isNewUser = !onboardingData || !onboardingData.data || Object.values(onboardingData.data).every((step) => !step);

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
          {isNewUser && <GetStartedChecklist />}
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

