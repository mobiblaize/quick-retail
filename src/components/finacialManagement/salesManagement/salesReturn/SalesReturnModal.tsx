import { Button, Modal, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import {  RedQuestionMark } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const SalesReturnModal = ({ opened, onClose }: ResolveProps) => {
  const handlePreview = () => {};
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate(ROUTES.inStoreOverview);
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
              Record a Sales return?
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
              Are you sure you want to record this sales returns on invoice
              #181901 and it associated receipt (s)?
            </Text>
            <div className="mt-[1em]">
              <Text
                mt="5"
                style={{
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                }}
              >
                Kindly note that by recording sales returns,. the book balance
                would be affected, as the recorded amount on the sales returns
                would be added to the invoice amount for future use.
              </Text>
            </div>
          </div>
        }
        centered
        size="lg"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1"></div>
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
              No, Cancel
            </Button>
          </div>
          <div className="" onClick={handleContinue}>
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
      Yes, Record
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SalesReturnModal;
