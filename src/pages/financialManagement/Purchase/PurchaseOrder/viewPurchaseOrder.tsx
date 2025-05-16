import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import ViewPurchaseOrderForm from "../../../../components/finacialManagement/purchase.tsx/purchaseOrder/viewPurchaseOrder";
import { ROUTES } from "../../../../constants/routes";
import PageContainer from "../../../../layout/pageContainer";

export default function ViewPurchaseOrderPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleVendor = () => {
    navigate(ROUTES.vendorHistory);
  };
  const handleHistory = () => {
    navigate(ROUTES.purchaseOrderHistory);
  };

  const handleVendorDetails = () => {
    navigate(ROUTES.vendorDetails);
  };

  const getSubHeaders = () => {
    const backButton = (
      <button
        onClick={handleBack}
        className="flex cursor-pointer gap-2 items-center"
      >
        <ChevronLeft />
        <Text fw={500} c="black">
          Back
        </Text>
      </button>
    );

    const subHeaders = [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
         
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex justify-between items-center">
        <Text fw={500} size="xl" c="black">
          View Purchase Order
        </Text>

        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <Menu>
              <Menu.Target>
                <Button variant="filled-primary">
                  Quick Actions
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
                  // onClick={handleAddProduct}
                >
                  Preview Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleHistory}
                >
                  Purchase Order Version History
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Download Purchase Order (PDF)
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Delete Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Convert Purchase Order and G.R.N <br />
                  to a Purchase Invoice / Bill?
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleVendor}
                >
                  View All Vendor
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  //   onClick={() => setModalOpen(true)}
                  onClick={handleVendorDetails}
                >
                  Vendor Details
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
                  // onClick={handleAddProduct}
                >
                  Preview Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleHistory}
                >
                  Purchase Order Version History
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                >
                  Download Purchase Order (PDF)
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Delete Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Convert Purchase Order and G.R.N <br />
                  to a Purchase Invoice / Bill?
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleVendor}
                >
                  View All Vendor
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleVendorDetails}
                >
                  Vendor Details
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <ViewPurchaseOrderForm />
    </PageContainer>
  );
}
