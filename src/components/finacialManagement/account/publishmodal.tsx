import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router";
import { RedQuestionMark } from "../../../assets/svg";
import { ROUTES } from "../../../constants/routes";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const PublishModal = ({ opened, onClose }: ResolveProps) => {
    const navigate = useNavigate();
  const handleToast = () => {
    navigate(ROUTES.viewJournal)
    notifications.show({
      title: "Success",
      message: "Journal Entry has been successfully Published",
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
              Publish Journal Entry
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
              After careful review of entries, are you sure you want to publish
              Journal 39235 with 6 journal of entries?
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
              Yes, Publish
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PublishModal;
