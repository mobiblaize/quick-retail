import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronRight } from "lucide-react";
import AllPurchaseOrdersTable from "../../../components/dashboard/procurement/purchaseOrder/allPurchaseOrderTable";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";


const PurchaseOrderPage = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Purchase Order
      </Text>

      <div className="flex flex-row gap-2 md:gap-4">
        <Link to={ROUTES.createPurchaseOrder}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Create Purchase Order</span>
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AllPurchaseOrdersTable />
    </PageContainer>
  );
};

export default PurchaseOrderPage;
