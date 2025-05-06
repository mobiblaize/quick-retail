import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import RequestOverviewStatistics from "../../../components/dashboard/procurement/requestDashboard/requestOverviewStatistics";
import AllRequestUpdate from "../../../components/dashboard/procurement/requestDashboard/allRequestUpdate";

const RequestDashboard = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Requests
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.viewBudgetPage}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">View Budget</span>
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <RequestOverviewStatistics />
      <AllRequestUpdate/>
    </PageContainer>
  );
};

export default RequestDashboard;
