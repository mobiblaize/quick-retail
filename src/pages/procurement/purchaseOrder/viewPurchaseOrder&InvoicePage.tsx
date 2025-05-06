import React, { useState } from "react";
import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ViewPurchaseOrderInvoiceForm from "../../../components/dashboard/procurement/purchaseOrder/viewPurchaseOrderInvoiceForm";
import DeletePurchaseModal from "../../../components/dashboard/procurement/purchaseOrder/modal/deletePurchaseModal";

const ViewPurchaseOrderInvoicePage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

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
          {/* <div className="flex items-center">
            <Text>Purchase</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                 Purchase Invoice
              </Text>
            </>
          </div> */}
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex justify-between items-center">
        <Text fw={500} size="xl" c="black">
          View Purchase Order and Purchase Invoice
        </Text>

        <div className="flex items-center gap-6">
          <div>
            <div className="inline-flex items-center bg-[#FEF2F2] text-[#B42318] px-3 py-1 rounded-full font-medium text-sm">
              <div className="w-2 h-2 bg-[#B42318] rounded-full" />
              <span className="ml-2">Pending Payment</span>
            </div>
            <p className="text-[14px] text-[#667185] text-center">
              Purchase Invoice Status
            </p>
          </div>

          <div>
            <div className="inline-flex items-center bg-[#FEF2F2] text-[#B42318] px-3 py-1 rounded-full font-medium text-sm">
              <div className="w-2 h-2 bg-[#B42318] rounded-full" />
              <span className="ml-2">Overdue</span>
            </div>
            <p className="text-[14px] text-[#667185] text-center">P.O Status</p>
          </div>

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
                  Edit Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
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
                  Download Purchase Order
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
                  Edit Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Delete Purchase Order
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  
                >
                  Download Purchase Order
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
      <ViewPurchaseOrderInvoiceForm />

       <DeletePurchaseModal opened={modalOpen} onClose={() => setModalOpen(false)} />
    </PageContainer>
  );
};

export default ViewPurchaseOrderInvoicePage;
