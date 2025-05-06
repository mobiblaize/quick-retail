import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import ShipmentAnalytics from "../../../components/dashboard/procurement/shipments/shipmentsAnalytics";
import AllShipmentTable from "../../../components/dashboard/procurement/shipments/allShipmentTable";

const ShipmentsDashboard = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
         Shipments
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.createShipment}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Create New</span>
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
       <ShipmentAnalytics/>
       <AllShipmentTable />
    </PageContainer>
  );
};


export default ShipmentsDashboard;
