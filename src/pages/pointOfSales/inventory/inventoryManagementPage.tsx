import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import InventoryTable from "../../../components/dashboard/pointOfSales/inventoryManagement/inventoryTable";
import { Loader } from "@mantine/core";
import { useState } from "react";


const InventoryManagementPage = () => {
  const [isLoading,] = useState(); 
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Inventory Management
        </Text>
       
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
       {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )} 
      <InventoryTable />
    </PageContainer>
  );
};

export default InventoryManagementPage;
