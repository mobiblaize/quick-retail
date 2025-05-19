import PageContainer from "../../../../layout/pageContainer";
import { Button, Menu, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { ROUTES } from "../../../../constants/routes";
import PreviewRemittance from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/previewRemittance";
import VoidRemittance from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/voidRemittance";
import { useState } from "react";
import SentRemittanceModal from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/sentModal";

const PreviewRemittancePage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleCreate = () => {
    navigate(ROUTES.createRemittance);
  };

  const handleEdit = () => {
    navigate(ROUTES.editRemittance);
  };

  const handleSend = () => {
    navigate(ROUTES.attachRemittance);
  };
  const handleAllocate = () => {
    navigate(ROUTES.allocateRemittance);
  };
  const [showAllocatedModal2, setShowAllocatedModal2] = useState(false);
  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
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
<div>
    <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div className="flex flex-col">
        <Text fw={500} size="xl" c="black">
          Preview Remittance Advice
        </Text>
        <Text fw={300} size="md" className="text-[#667085]">
        Preview remittances advice details and information. 
        </Text>
      </div>
      <div className="flex flex-row gap-2 md:gap-4 cursor-pointer">
    
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
                  onClick={handleCreate}
                >
               Create New
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleEdit}
                >
             Edit Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setShowAllocatedModal(true)}
                >
                Void Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={handleSend}
                onClick={() => setShowAllocatedModal2(true)}
                >
              Send to Customer
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleSend}
                >
              Share via Email
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={handleReturn}
                >
                Get Shareable Link
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={handleRemitanceAdvice}
                >
                 Download as PDF
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleAllocate}
                >
Allocate Remittances<br/>
 Advice to Purchase Invoice
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
                  onClick={handleCreate}
                >
                   Create New
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleEdit}
                >
                 Edit Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setShowAllocatedModal(true)}
                >
               Void Remittances Advice
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   
                onClick={() => setShowAllocatedModal2(true)}
                >
                   Send to Customer
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleSend}
                >
                Share via Email
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={handleReturn}
                >
                    Get Shareable Link
                </Menu.Item>

                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                //   onClick={handleRemitanceAdvice}
                >
                      Download as PDF
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={handleAllocate}
                >
                Allocate Remittances<br/>
 Advice to Purchase Invoice
                </Menu.Item>
               
              </Menu.Dropdown>
            </Menu>
          </div>
      </div>
      </div>
    </div>
    <div className=" text-sm flex justify-end text-right gap-6 mt-[3em]">
        <p className="text-sm">Status:</p>
        <p className="text-[#4E4B66] bg-[#D0D5DD] py-1 px-3 rounded-md">Draft</p> |
        <p className="text-[#B54708] bg-[#F7D394] py-1 px-3 rounded-md">Approval Pending</p>
    </div>
    </div>,
  ];
  return (
    <>
    {showAllocatedModal && (
       <VoidRemittance
         opened={showAllocatedModal}
         onClose={() => setShowAllocatedModal(false)}
       />
     )}
      {showAllocatedModal2 && (
       <SentRemittanceModal
         opened={showAllocatedModal2}
         onClose={() => setShowAllocatedModal2(false)}
       />
     )}
    <PageContainer subHeaders={subHeaders}>
      <PreviewRemittance />
    </PageContainer>
    </>
  );
};

export default PreviewRemittancePage;
