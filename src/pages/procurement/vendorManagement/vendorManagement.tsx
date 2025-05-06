import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown,  Plus } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";
import TierTable from "../../../components/dashboard/procurement/vendorManagement/tierTable";

const VendorManagement = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Vendor Management
      </Text>
      <div className="flex flex-row gap-2 md:gap-4">
        <div>
          <div className="hidden sm:block">
            <Menu>
              <Menu.Target>
                <Button variant="filled-primary">
                  Create a Vendor
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
                <Link to={ROUTES.createTierOne}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                    Tier 1 Vendor
                  </Menu.Item>
                </Link>
                <Link to={ROUTES.createTierTwo}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                    Tier 2 Vendor
                  </Menu.Item>
                </Link>
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
                <Link to={ROUTES.createTierOne}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                    Tier 1 Vendor
                  </Menu.Item>
                </Link>
                <Link to={ROUTES.createTierTwo}>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                   Tier 2 Vendor
                  </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <TierTable />
    </PageContainer>
  );
};

export default VendorManagement;
