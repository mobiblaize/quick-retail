import PageContainer from "../../../layout/pageContainer";
import ProductTable from "../../../components/dashboard/pointOfSales/productManagement/productTable";
import { Button, Text } from "@mantine/core";
import AddProduct from "../../../components/dashboard/pointOfSales/productManagement/modal/addProductModal";
import { useState } from "react";

const ProductManagementPage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);

  // const handleAddProduct = () => {
  //   navigate("/dashboard/product-management/add-new-product");
  // };

  // const handleAddBulkProducts = () => {
  //   navigate("/dashboard/product-management/add-bulk-product");
  // };

  const subHeaders = [
    <div className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        Product Management
      </Text>

      <div>
        <div className="hidden sm:block">
          <Button
            onClick={() => setIsLogComplaintsOpen(true)}
            variant="filled-primary"
            className="flex gap-1.5"
          >
            Add a product
          </Button>
        </div>

        <div className="block sm:hidden">
           <Button
            onClick={() => setIsLogComplaintsOpen(true)}
            variant="filled-primary"
            className="flex gap-1.5"
          >
            Add a product
          </Button>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      
      <ProductTable />
      <AddProduct
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
    </PageContainer>
  );
};

export default ProductManagementPage;
