import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import { RedQuestionMark } from "../../../../assets/svg";
import DebitIssueModal from "./debitModalIssue";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const IssueModal = ({ opened, onClose }: ResolveProps) => {
  const handlePreview = () => {
    setShowAllocatedModal(true);
    // onClose();
  };

  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
  return (
    <>
      {showAllocatedModal && (
        <DebitIssueModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div style={{ wordBreak: "break-word" }}>
            <RedQuestionMark />
            <Text
              c="black"
              fw={600}
              size="sm"
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
                whiteSpace: "nowrap",
              }}
            >
              Issue a Debit note?
            </Text>
          </div>
        }
        centered
        size="lg"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1"></div>
        <Text
          mt="5"
          style={{
            fontSize: "clamp(0.875rem, 2vw, 1rem)",
          }}
        >
          Are you sure you issue a debit note?
        </Text>
        <div className="mt-[1em]">
          <Text
            mt="5"
            style={{
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
            }}
          >
            Kindly note that by issuing a debit note. the book balance would be
            affected.
          </Text>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
          <div className="">
            <Button
              variant="outline"
              style={{
                color: "#475367",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.5rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
                border: "1px solid #475367",
              }}
            >
              No, Cancel
            </Button>
          </div>
          <div className="" onClick={handlePreview}>
            <Button
              variant="filled"
              style={{
                backgroundColor: "#D42620",
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 0.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
              }}
            >
              Yes,Issue
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default IssueModal;
