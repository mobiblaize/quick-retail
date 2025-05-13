import PageContainer from "../../../../layout/pageContainer";
import { Button, Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import PurchaseInvoiceReceipt from "../../../../components/finacialManagement/purchase.tsx/purchaseInvoice/purchaseInvoiceReceipt";

const ViewReceiptPages = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };
  
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
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
  
        <div className="flex sm:hidden">{backButton}</div>
      </div>,
        <div key="1">
          <div className="flex items-left justify-between">
            <Text fw={500} size="xl" c="black">
            Purchase Invoice #171019 
            </Text>
            <div className="flex just justify-end text-right gap-[2em]">
                <div className="flex flex-col">
            <div className="inline-flex  items-center bg-[#FEF2F2] text-[#B42318] px-3 py-1 rounded-full font-medium text-sm">
             
              <div className="w-2 h-2 bg-[#B42318] rounded-full" />
              <span className="ml-2">Partial Payment</span>
            </div>
            <p className="text-[14px] text-[#667185] text-center">
              Purchase Invoice Status
            </p>
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
                //   onClick={() => setModalOpen(true)}
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
                //   onClick={() => setModalOpen(true)}
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
          </div>
          
        </div>,
      ];
      return (
        <PageContainer subHeaders={subHeaders}>
          <PurchaseInvoiceReceipt/>
        </PageContainer>
      );
    };
    

export default ViewReceiptPages;
