import { Button, Modal, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useResolveComplaint } from "../../../../../hooks/backendApis/pos/returns";

interface ResolveProps {
  opened: boolean;
  onClose: () => void;
  returnID: string;
}

const Resolve = ({ opened, onClose, returnID }: ResolveProps) => {
  const { mutate: resolveComplaint } = useResolveComplaint();
  

  const handleResolveComplaint = () => {
    resolveComplaint(
      {
        returnID: returnID,
        payload: {
          status: "approved",
          refund_type: "cashback",
        },
      },
      {
        onSuccess: () => {
          showNotification({
            title: "Success",
            message: "Complaint resolved successfully",
            color: "green",
          });
          onClose(); // if you’re closing a modal or something similar
        },
        onError: (error: any) => {
          const errMsg =
            error?.response?.data?.message ||
            error?.response?.data?.exception?.message ||
            "Something went wrong";
          showNotification({
            title: "Error",
            message: errMsg,
            color: "red",
          });
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div style={{ wordBreak: "break-word" }}>
          <Text
            c="black"
            fw={700}
            style={{ fontSize: "clamp(1.3rem, 4vw, 1.8rem)" }}
          >
            Complaints Resolved
          </Text>
          <Text mt="5" style={{ fontSize: "clamp(0.875rem, 2vw, 1rem)" }}>
            Are you sure you want to resolve this complaint?
          </Text>
        </div>
      }
      centered
      size="md"
      radius={20}
      padding="xl"
    >
      <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
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
          onClick={onClose}
        >
          No
        </Button>
        <Button
          variant="filled"
          onClick={handleResolveComplaint}
          style={{
            backgroundColor: "#099137",
            color: "white",
            borderRadius: "0.4rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
          }}
        >
          Yes, Resolve
        </Button>
      </div>
    </Modal>
  );
};

export default Resolve;
