import { Button, Modal, Text } from "@mantine/core";



interface ConfirmStoreModalProps {
  opened: boolean;
  onClose: () => void;
  action: "activate" | "deactivate";
  onConfirm: () => void;
}

const ConfirmStoreModal = ({ opened, onClose, action, onConfirm }: ConfirmStoreModalProps) => {
  const isActivate = action === "activate";

  return (
    <Modal opened={opened} onClose={onClose} centered size="md" radius={20} padding="xl">
      <div>
      
        <Text size="1.4rem" c="black" fw={400}>
          {isActivate ? "Activate Store" : "Deactivate Store"}
        </Text>

        {isActivate ? (
          <>
            <Text mt="5">Are you sure you want to activate this store?</Text>
            <Text mt="5">Once activated products can be added to this store</Text>
          </>
        ) : (
          <Text mt="5">
            Are you sure you want to deactivate this store? Once deactivated, you will no longer
            be able to perform actions on this store.
          </Text>
        )}
      </div>

      <div className="flex mt-7 gap-5">
        <Button
          variant="outline"
          onClick={onClose}
          style={{ color: "#475367", borderRadius: "0.4rem", width: "100%" }}
        >
          No, don't
        </Button>
        <Button
          variant="filled"
          onClick={onConfirm}
          style={{
            backgroundColor: isActivate ? "#099137" : "#d32f2f",
            color: "white",
            borderRadius: "0.4rem",
            width: "100%",
          }}
        >
         Yes {isActivate ? "Activate" : "Deactivate"}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmStoreModal;


