import { Text } from "@mantine/core";
import PageContainer from "../../layout/pageContainer";
import AnalyticsOverview from "../../components/dashboard/pointOfSales/dashboard/analyticsOverview";
import SalesOverview from "../../components/dashboard/pointOfSales/dashboard/salesOverview";
import CustomerOrdersTable from "../../components/dashboard/pointOfSales/dashboard/orderTable";
import KeyPerformance from "../../components/dashboard/pointOfSales/dashboard/keyPerformance";
import DivisionSalesOverview from "../../components/dashboard/pointOfSales/dashboard/divisionSalesOverview";
import CustomerAnalysis from "../../components/dashboard/pointOfSales/dashboard/customerAnalysis";

const DashboardPage = () => {
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
      <KeyPerformance />
      <CustomerOrdersTable />
    </PageContainer>
  );
};

export default DashboardPage;
