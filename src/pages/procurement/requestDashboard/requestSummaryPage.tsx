import React, { useState } from "react";
import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import RequestDetails from "../../../components/dashboard/procurement/requestDashboard/requestDetails";
import SupportingDocument from "../../../components/dashboard/procurement/requestDashboard/supportingDocument";
import DeclineRequestModal from "../../../components/dashboard/procurement/requestDashboard/modal/declineRequestModal";
import ApproveRequestModal from "../../../components/dashboard/procurement/requestDashboard/modal/approveRequestModal";

const RequestSummaryPage: React.FC = () => {
  const navigate = useNavigate();
   const [modalOpen, setModalOpen] = useState(false);
   const [modalOpenApprove, setModalOpenApprove] = useState(false);


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
            <Text>Procurement</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Requests
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="justify-between flex items-center">
        <Text fw={500} size="xl" c="black">
          Request Summary
        </Text>

        <div>
          <div className="hidden sm:block">
            <Menu>
              <Menu.Target>
                <Button variant="filled-primary">
                  Quick Action
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
                  onClick={() => setModalOpen(true)}
                >
                  Decline Request
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpenApprove(true)}
                >
                  Approve Request
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
                  onClick={() => setModalOpen(true)}
                >
                  Decline Request
                </Menu.Item>
                <Menu.Item
                  style={{
                    fontSize: "14px",
                    padding: "8px 16px",
                    color: "#333",
                  }}
                  onClick={() => setModalOpenApprove(true)}
                >
                  Approve Request
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
    <>
      <PageContainer subHeaders={getSubHeaders()}>
        <RequestDetails />
        <SupportingDocument />
      </PageContainer>

      <DeclineRequestModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ApproveRequestModal
        opened={modalOpenApprove}
        onClose={() => setModalOpenApprove(false)}
      />
    </>
  );
};

export default RequestSummaryPage;
