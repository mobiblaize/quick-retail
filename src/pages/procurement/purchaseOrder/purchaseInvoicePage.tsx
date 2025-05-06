import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown, Plus } from "lucide-react";
import PurchaseInvoiceHistoryTable from "../../../components/dashboard/procurement/purchaseOrder/purchaseInvoiceHistoryTable";
import DeletePurchaseModal from "../../../components/dashboard/procurement/purchaseOrder/modal/deletePurchaseModal";
import { useState } from "react";

const PurchaseInvoicePage = () => {
   const [modalOpen, setModalOpen] = useState(false);

  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Purchase Invoice Version History
      </Text>

      <div>
        <div className="hidden sm:block">
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Export
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
                onClick={() => setModalOpen(true)}
              >
                Download Purchase Order
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <PurchaseInvoiceHistoryTable />
      <DeletePurchaseModal opened={modalOpen} onClose={() => setModalOpen(false)} />
    </PageContainer>
  );
};

export default PurchaseInvoicePage;
