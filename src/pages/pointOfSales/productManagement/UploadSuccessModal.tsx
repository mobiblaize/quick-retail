import { Modal, Text, Button } from "@mantine/core";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import content from "../../../assets/images/Content.png"

interface UploadSuccessModalProps {
  opened: boolean;
  onClose: () => void;
  count?: number;
}

export default function UploadSuccessModal({
  opened,
  onClose,
  count = 0,
}: UploadSuccessModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      radius="md"
      overlayProps={{ opacity: 0.5, blur: 2 }}
      styles={{
        content: {
          borderRadius: "12px",
          padding: "2rem",
          textAlign: "center",
        },
      }}
    >
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="flex justify-center mb-4"
      >
       
          <img src={content} alt="Check" />
          
      </motion.div>

      {/* Title */}
      <Text fw={700} size="24px" c="#101928" mb="xs">
        Products Upload Successful
      </Text>

      {/* Description */}
      <Text size="md" c="#48464E">
        You have successfully added{" "}
        <Text span fw={600} c="#F16722">
          {count} products
        </Text>{" "}
        to your inventory.
      </Text>

      {/* Button */}
      <Button
        fullWidth
        mt="lg"
        size="md"
        radius="lg"
        color="orange"
        onClick={onClose}
        styles={{
          root: { fontWeight: 600, fontSize: "1rem", padding: "0.8rem 1rem" },
        }}
      >
        Great!
      </Button>
    </Modal>
  );
}
