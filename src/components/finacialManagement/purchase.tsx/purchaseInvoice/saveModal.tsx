import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { RedQuestionMark } from "../../../../assets/svg";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const SaveModal = ({ opened, onClose }: ResolveProps) => {
  const handlePreview = () => {};

  const handleToast = () => {
    notifications.show({
      title: "Success",
      message: "New Changes saved and updated",
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
              Save and Update Changes?
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
          Are you sure you want to save and update new changes to this purchase
          Invoice #181901?
        </Text>
        <div className="mt-[1em]">
          <Text
            mt="5"
            style={{
              fontSize: "clamp(0.875rem, 2vw, 1rem)",
            }}
          >
            Note that this action would override the current purchase invoice
            data, while the former saves in the purchase invoice version history
          </Text>
        </div>
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
              Yes, Save and Update
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SaveModal;
