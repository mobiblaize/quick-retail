import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import PurchaseOrderReceipt from "../../../../components/finacialManagement/purchase.tsx/purchaseOrder/previewPurchasrOrder";
import PageContainer from "../../../../layout/pageContainer";


const PreviewPurchaseOrderPage = () => {
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


<div key="2" className="flex justify-between items-center">
<Text fw={500} size="xl" c="black">
  View Debit Note
</Text>
        <div className="flex items-center gap-6">
          <div className="hidden sm:block">
            <Menu>
              <Menu.Target>
                <Button variant="filled-primary">
                  Download
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
                  // onClick={handleAddBulkProducts}
                >
                  Download Preview Order
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
                    Download Preview Order
                </Menu.Item>
       
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>

  ];

  return (
    <PageContainer subHeaders={subHeaders}>
   <PurchaseOrderReceipt/>
    </PageContainer>
  );
};

export default PreviewPurchaseOrderPage;
