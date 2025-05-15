import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronLeft, Plus} from "lucide-react";
import RemmittanceView from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/viewRemittance";
import { ROUTES } from "../../../../constants/routes";
import { useState } from "react";
import SentRemittanceModal from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/sentModal";
import VoidRemittance from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/voidRemittance";


const ViewRemittancePage = () => {
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
        View Remittance Advice (#254367)
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
                //   onClick={handleViewHistory}
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
                //   onClick={handleViewHistory}
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
    <div className=" text-sm flex justify-end text-right gap-6 mt-[1em]">
        <p className="text-sm">Status:</p>
        <p className="text-[#4E4B66] bg-[#D0D5DD] py-1 px-3 rounded-md">Draft</p> |
        <p className="text-green-900 bg-green-300 bg-[#F7D394] py-1 px-3 rounded-md">Sent</p>
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
      <RemmittanceView/>
    </PageContainer>
    </>
  );
};

export default ViewRemittancePage;
