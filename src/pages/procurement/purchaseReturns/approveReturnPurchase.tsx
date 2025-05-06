import React from "react";
import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ViewPurchaseForm from "../../../components/dashboard/procurement/purchaseReturns/viewPurchaseForm";

const ApproveReturnPurchase: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
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
          <div className="flex items-center">
            <Text>Purchase</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Purchase Return
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex justify-between items-center w-full">
        <Text fw={500} size="xl" c="black">
          View Purchase Requests
        </Text>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full font-medium text-sm">
            <div className="w-2 h-2 bg-[#027A48] rounded-full" />
            <span className="ml-2">Approved</span>
          </div>

          <div>
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
                    Approve Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Reject Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Get Shareable Link
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Preview Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Download Purchase Return
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
                    Approve Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Reject Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Get Shareable Link
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Preview Purchase Return
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Download Purchase Return
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <ViewPurchaseForm />
    </PageContainer>
  );
};

export default ApproveReturnPurchase;
