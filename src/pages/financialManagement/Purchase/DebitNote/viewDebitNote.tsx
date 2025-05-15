import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import DebitModal2 from "../../../../components/finacialManagement/purchase.tsx/purchaseReturns/debitNote2Modal";
import ViewDebitNote from "../../../../components/finacialManagement/purchase.tsx/debitNote/view";
import { ROUTES } from "../../../../constants/routes";

const ViewDebitNotePage = () => {
  const navigate = useNavigate();
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  const handleBack = () => {
    navigate(-1);
  };

  const handlePreview = () => {
   navigate(ROUTES.previewDebitNote)
  };
  const handleSend = () => {
    navigate(ROUTES.sendDebitNote)
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
        View Purchase Invoice
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
                onClick={handlePreview}
              >
                Preview debit Note
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                  onClick={handleSend}
              >
                Send debit note to Vendor
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddBulkProducts}
              >
                Download debit Note
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
                onClick={handlePreview}
              >
                Preview debit Note
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                   onClick={handleSend}
              >
                Send debit note to Vendor
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddProduct}
              >
                Download debit Note
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddProduct}
              >
                Record Payment
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddProduct}
              >
                View Purchase Return
              </Menu.Item>

              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddProduct}
              >
                Issue a Remittances Advice
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleViewHistory}
              >
                View Purchase Invoice Version History
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                // onClick={handleAddProduct}
              >
                Void Purchase Invoice
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];
  return (
    <>
      {showAllocatedModal && (
        <DebitModal2
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      <PageContainer subHeaders={subHeaders}>
        <ViewDebitNote />
      </PageContainer>
    </>
  );
};

export default ViewDebitNotePage;
