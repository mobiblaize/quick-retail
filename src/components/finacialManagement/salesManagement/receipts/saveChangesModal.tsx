import { Button, Modal, Text } from "@mantine/core";
import { QuestionMark2 } from "../../../../assets/svg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const SaveChangesModal= ({ opened, onClose }: ResolveProps) => {
    const navigate = useNavigate();
    const handlePreview = () => {
        navigate(ROUTES.previewReceipt);
      };

      const handleView = () => {
        navigate(ROUTES.viewReceipt);
      };
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          <div style={{ wordBreak: "break-word" }}>
            <QuestionMark2  />
            <Text
              c="black"
              fw={700}
              style={{
                fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
              }}
            >
           Save Change and update
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
      Are you sure you want to save changes and update this receipt? 
            </Text>
            <Text
              mt="5"
              style={{
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
              }}
            >
By saving changes, note that a new version history would be created for this invoice. 
            </Text>
          </div>
        }
        centered
        size="md"
        radius={20}
        padding="xl"
      >
        <div className="space-y-4 grid grid-cols-1"></div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
            <div className=""  onClick={handlePreview} >
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
          <div className=""  onClick={handleView}>
          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.1rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
          Yes, Update Changes
          </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SaveChangesModal;
