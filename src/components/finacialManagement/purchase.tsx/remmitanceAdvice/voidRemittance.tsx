import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RedQuestionMark } from "../../../../assets/svg";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const VoidRemittance = ({ opened, onClose }: ResolveProps) => {
  const handlePreview = () => {};

  const handleToast = () => {
    notifications.show({
      title: "Success",
      message: "Remittance Advice has been voided",
      color: "green",
      autoClose: 3000,
    });

    onClose();
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
              Void Remittance Advice #181918
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
              Are you sure you want to Void this remittance Advice #181901?
            </Text>
            <div className="mt-[1em]">
              <Text
                mt="5"
                style={{
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                }}
              >
                Note that voiding a receipt the “remittance Advice” amount for a
                specific purchase invoice would be canceled hence, hence it
                would be added to the outstanding amount of a specific purchase
                Invoice.
              </Text>
            </div>

            <div className="mt-[1em]">
              <Text
                mt="5"
                style={{
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                }}
              >
                E.g Void Remittance Advice 101 (₦100,000) that has been issued
                for Invoice (₦100,000 - Paid Fully), would imply that, the void
                amount “₦100,000” would be re-added as an outstanding “Amount /
                Fee” to the purchase invoice it was prior issued to.
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
          <div className="" onClick={handleToast}>
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
              Yes, Void
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default VoidRemittance;
