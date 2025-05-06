import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import ProcurementAnalyticsOverview from "../../../components/dashboard/procurement/dashboard/procurementAnalyticsOverview";
import PendingRequestTable from "../../../components/dashboard/procurement/dashboard/pendingRequestTable";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";

const ProcurementDashboard = () => {
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
            <span className="whitespace-nowrap">Add New Request</span>
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ProcurementAnalyticsOverview />
      <PendingRequestTable />
    </PageContainer>
  );
};

export default ProcurementDashboard;
