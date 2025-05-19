import { Button, Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { RedQuestionMark } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const DebitIssueModal = ({ opened, onClose }: ResolveProps) => {
  const navigate = useNavigate();
  const handlePreview = () => {
    navigate(ROUTES.allDebitNote);
  };

  return (
    <>
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
              Debit Note Issued.
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
          Congratulations you have issued a debit note successfully.
        </Text>
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
              Close
            </Button>
          </div>
          <div className="" onClick={handlePreview}>
            <Button
              variant="filled"
              style={{
                backgroundColor: "#F16722",
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 0.1rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "100%",
              }}
            >
              View all debit Note
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DebitIssueModal;
