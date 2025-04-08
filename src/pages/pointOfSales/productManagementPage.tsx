import PageContainer from "../../layout/pageContainer";
import ProductTable from "../../components/dashboard/pointOfSales/productManagement/productTable";
import { Menu, Button, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";


const ProductManagementPage = () => {
   const navigate = useNavigate();

  const subHeaders = [
    <div className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        Product Management
      </Text>

      <div>
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
              onClick={() => navigate("/dashboard/product-management/add-new-product")}
            >
              Add a product
            </Menu.Item>
            <Menu.Item
              style={{
                fontSize: "14px",
                padding: "8px 16px",
                color: "#333",
              }}
              onClick={() => navigate("/dashboard/product-management/add-bulk-product")}
            >
              Add bulk products
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
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
