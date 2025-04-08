import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import InventoryTable from "../../../components/dashboard/pointOfSales/inventoryManagement/inventoryTable";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";

const InventoryManagementPage = () => {
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Inventory
        </Text>
        <Link to={ROUTES.updateInventory}>
          <Button variant="filled-primary">Update Inventory</Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <InventoryTable />
    </PageContainer>
  );
};

export default InventoryManagementPage;
