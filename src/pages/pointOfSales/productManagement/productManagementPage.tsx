import PageContainer from "../../../layout/pageContainer";
import ProductTable from "../../../components/dashboard/pointOfSales/productManagement/productTable";
import { Menu, Button, Text } from "@mantine/core";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";

const ProductManagementPage = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/dashboard/product-management/add-new-product");
  };

  const handleAddBulkProducts = () => {
    navigate("/dashboard/product-management/add-bulk-product");
  };

  const subHeaders = [
    <div className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        Product Management
      </Text>

      <div>
        <div className="hidden sm:block">
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Add New Product
                <ChevronDown className="ml-2" />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddProduct}
              >
                Add a product
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddBulkProducts}
              >
                Add bulk products
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="block sm:hidden">
          <Menu>
            <Menu.Target>
              <Button
                variant="filled-primary"
                style={{
                  width: "40px",
                  height: "40px",
                  padding: "0",
                  borderRadius: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={20} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddProduct}
              >
                Add a product
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddBulkProducts}
              >
                Add bulk products
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ProductTable />
    </PageContainer>
  );
};

export default ProductManagementPage;
