import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import PageContainer from "../../../../layout/pageContainer";
import ViewPurchaseInvoiceForm from "../../../../components/finacialManagement/purchase.tsx/purchaseInvoice/viewPurchaseInvoiceForm";

export default function ViewPurchaseInvoicePage() {
  const navigate = useNavigate();
  const [, setModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleViewHistory = () => {
    navigate(ROUTES.viewHistory);
  };
  const handlePreview = () => {
    navigate(ROUTES.viewPurchaseReceipt);
  };

  const handleReturn = () => {
    navigate(ROUTES.viewPurchaseReturns);
  };
  const handleRemitanceAdvice = () => {
    navigate(ROUTES.createRemittance);
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
                  // onClick={handleAddProduct}
                >
                  Edit Purchase Invoice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handlePreview }
                >
                  Preview Purchase Invoice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddBulkProducts}
                >
                  Download Purchase Invoice (PDF)
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Get Shareable Link
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Record Payment
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleReturn}
                >
                  View Purchase Return
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleRemitanceAdvice}
                >
                  Issue a Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleViewHistory}
                >
                  View Purchase Invoice Version History
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={ROUTES.viewHistory}
                >
                  Void Purchase Invoice
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
                  onClick={handlePreview}
                >
                   Preview Purchase Invoice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                >
                Download Purchase Invoice (PDF
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  // onClick={handleAddProduct}
                >
                  Get Shareable Link
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
                  onClick={handleReturn}
                >
                  View Purchase Return
                </Menu.Item>

                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleRemitanceAdvice}
                >
                  Issue a Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleViewHistory}
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

    return subHeaders;
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <ViewPurchaseInvoiceForm />
    </PageContainer>
  );
}
