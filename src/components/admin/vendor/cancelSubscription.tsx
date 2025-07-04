import { Button, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useFetchCancelSub } from "../../../hooks/backendApis/admin/profile";


interface ResolveProps {
  opened: boolean;
  onClose: () => void;
}

const CancelSubscriptionModal = ({ opened, onClose }: ResolveProps) => {
// @ts-ignore
  const { mutate, isLoading } = useFetchCancelSub();

  const handleCancel = () => {
    mutate(
      {}, 
      {
        onSuccess: (res: any) => {
          notifications.show({
            title: "Success",
            message: res?.message || "Subscription cancelled successfully",
            color: "green",
            autoClose: 3000,
          });
          onClose();
        },
        onError: (err: any) => {
          notifications.show({
            title: "Error",
            message:
              err?.response?.data?.message ||
              "Failed to cancel subscription. Please try again.",
            color: "red",
            autoClose: 3000,
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
        <Text
          c="black"
          fw={600}
          size="sm"
          style={{
            fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
            whiteSpace: "nowrap",
          }}
        >
          Cancel Subscription
        </Text>
      }
      centered
      size="lg"
      radius={20}
      padding="xl"
    >
      <Text
        mt="5"
        style={{
          fontSize: "clamp(0.875rem, 2vw, 1rem)",
        }}
      >
        Are you sure you want to cancel this subscription? By cancelling, you
        will no longer access features linked to it.
      </Text>

      <div className="grid md:grid-cols-2 grid-cols-1 md:mt-7 gap-3 md:gap-14">
        <Button
          onClick={onClose}
          variant="outline"
          style={{
            color: "#475367",
            height: "auto",
            borderRadius: "0.4rem",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
            border: "1px solid #475367",
          }}
        >
          No
        </Button>

        <Button
          onClick={handleCancel}
          variant="filled"
          disabled={isLoading}
          style={{
            backgroundColor: "#BA110B",
            color: "white",
            height: "auto",
            borderRadius: "0.4rem",
            padding: "0.9rem 0.1rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "100%",
          }}
        >
          {isLoading ? "Cancelling..." : "Yes, Cancel"}
        </Button>
      </div>
    </Modal>
  );
};

export default CancelSubscriptionModal;

