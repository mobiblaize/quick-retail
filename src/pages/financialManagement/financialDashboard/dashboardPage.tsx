import { Button, Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import Categories from "../../../components/dashboard/financialManagement/categories/index";
import FinancialMetricsOverview from "../../../components/dashboard/financialManagement/metrics/financialMetricsOverview";
import InflowOutflowChart from "../../../components/dashboard/financialManagement/Inflow/inflowOutflow";
import InflowOverview from "../../../components/dashboard/financialManagement/Inflow/inflowOverview";
import ProfitAnalysisOverview from "../../../components/dashboard/financialManagement/profit/profitAnalysisOverview";
import PendingRequestTable from "../../../components/dashboard/procurement/dashboard/pendingRequestTable";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";
import BalanceModules from "../../../components/dashboard/financialManagement/BalanceModules/index";
import PaymentOverview from "../../../components/dashboard/financialManagement/paymentOverview/index";
import PaymentOverviewCustomer from "../../../components/dashboard/financialManagement/PaymentOverviewCustomer/index";
import PaymentItemOverview from "../../../components/dashboard/financialManagement/ItemOverdue/index";

const FinancialDashboard = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Dashboard
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.newRequest}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Generate Reports</span>
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <FinancialMetricsOverview/>
      <ProfitAnalysisOverview/>
      <InflowOverview/>
      <Categories/>
      <BalanceModules/>
      <PaymentOverview/>
      <PaymentOverviewCustomer/>
      <PaymentItemOverview/>
    </PageContainer>
  );
};

export default FinancialDashboard