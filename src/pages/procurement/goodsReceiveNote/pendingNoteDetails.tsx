import React from "react";
import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import PendingNoteForm from "../../../components/dashboard/procurement/goodsReceiveNote/pendingNoteForm";
import ApproveGrn from "../../../components/dashboard/procurement/goodsReceiveNote/modal/approveGrn";
import RejectGrn from "../../../components/dashboard/procurement/goodsReceiveNote/modal/rejectGrn";
import ShareableLinkModal from "../../../components/dashboard/procurement/goodsReceiveNote/modal/getShearLink";

const PendingNoteDetails: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const [linkModalOpen, setLinkModalOpen] = React.useState(false);

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
            <Text>Good Receive Note</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Good Receive Note
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex justify-between items-center w-full">
        <Text fw={500} size="xl" c="black">
          View Approved Good Received Note Details
        </Text>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center bg-[#FFFAEB] text-[#B54708] px-3 py-1 rounded-full font-medium text-sm">
            <div className="w-2 h-2 bg-[#B54708] rounded-full" />
            <span className="ml-2">Pending</span>
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
                    onClick={() => setModalOpen(true)}
                  >
                    Approve G.R.N
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    onClick={() => setRejectModalOpen(true)}
                  >
                    Reject G.R.N
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    onClick={() => setLinkModalOpen(true)}
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
                    Preview G.R.N
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
                    onClick={() => setModalOpen(true)}
                  >
                    Approve G.R.N
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    onClick={() => setRejectModalOpen(true)}
                  >
                    Reject G.R.N
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    onClick={() => setLinkModalOpen(true)}
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
                    Preview G.R.N
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
      <PendingNoteForm />
      <ApproveGrn
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      />
       <RejectGrn
        opened={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
      />
       <ShareableLinkModal
        opened={linkModalOpen}
        onClose={() => setLinkModalOpen(false)}
      />
    </PageContainer>
  );
};

export default PendingNoteDetails;
