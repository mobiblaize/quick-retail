import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RedQuestionMark } from "../../../assets/svg";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const DeactivateModal = ({ opened, onClose }: ResolveProps) => {
  const handleToast = () => {
    notifications.show({
      title: "Success",
      message: "New Card has been deactivated successfully ",
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
              Deactivate Card?
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
          Are you sure you want to deactivate card? By deactivating, Card
          information and functionality would be removed temporarily from this
          system, therefore this card can’t be used to make payment until
          reactivated.
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
           Yes, Deactivate
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeactivateModal;
