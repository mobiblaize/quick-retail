import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import SalesManagementOverview from "../../../components/dashboard/financialManagement/salesManagement/salesManagementOverview";
import SalesTable from "../../../components/dashboard/financialManagement/salesManagement/SalesTable";

const SalesManagement = () => {
  const subHeaders = [
    <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Sales Management
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.newRequest}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Generate Report</span>
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <SalesManagementOverview />
      <SalesTable />
    </PageContainer>
  );
};

export default SalesManagement;
