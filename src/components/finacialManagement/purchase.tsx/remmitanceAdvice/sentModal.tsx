import { Button, Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { RedQuestionMark } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const SentRemittanceModal = ({ opened, onClose }: ResolveProps) => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(ROUTES.allRemittance);
  };
  const handlePreview = () => {
    navigate(ROUTES.previewRemittance);
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
              Remittance Advice Sent
            </Text>

            <div className="mt-[1em]"></div>
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
          Congratulations, receipt has been successfully sent to customer
        </Text>
        <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
          <div className="" onClick={handlePreview}>
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
              Preview
            </Button>
          </div>
          <div className="" onClick={handleView}>
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
              View all Receipts
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SentRemittanceModal;
