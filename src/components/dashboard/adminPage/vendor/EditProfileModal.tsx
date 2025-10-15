import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Avatar,
  FileButton,
  Stack,
  Text,
} from "@mantine/core";
import { motion } from "framer-motion";
import { Edit } from "lucide-react";

interface EditVendorProfileModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    avatar?: string;
  };
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    avatar?: string;
  }) => void;
}

export default function EditVendorProfileModal({
  opened,
  onClose,
  initialData,
  onSave,
}: EditVendorProfileModalProps) {
  const [firstName, setFirstName] = useState(initialData?.firstName || "");
  const [lastName, setLastName] = useState(initialData?.lastName || "");
  const [email] = useState(initialData?.email || "");
  const [companyName] = useState(
    initialData?.companyName || ""
  );
  const [phoneNumber] = useState(
    initialData?.phoneNumber || ""
  );
  const [avatar, setAvatar] = useState(initialData?.avatar || "");

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setAvatar(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSave({ firstName, lastName, email, companyName, phoneNumber, avatar });
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      withCloseButton
      overlayProps={{ blur: 3 }}
      styles={{
        header: { marginBottom: 0 },
        body: { paddingTop: 0 },
      }}
      title={
        <div>
          <Text fw={600} fz="lg" c="#1A1A1A">
            Edit Vendor Profile
          </Text>
          <Text fz="sm" c="#667085">
            Edit your vendor details below.
          </Text>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Stack gap="md" mt="md">
          {/* Avatar */}
          <div className="relative flex justify-start mb-2">
            <Avatar
              src={avatar}
              radius="100%"
              size={90}
              alt="Profile Picture"
              styles={{ root: { border: "2px solid #FF6B00" } }}
            />
            <FileButton onChange={handleFileChange} accept="image/*">
              {(props) => (
                <Button
                  {...props}
                  radius="xl"
                  variant="subtle"
                  color="orange"
                  size="compact-xs"
                  className="!absolute bottom-1 right-[calc(90%-40px)] bg-white border border-orange-400 shadow-sm hover:bg-orange-50"
                  p={4}
                >
                  <Edit size={14} color="#FF6B00" />
                </Button>
              )}
            </FileButton>
          </div>

          {/* Name Fields */}
          <Group grow>
            <TextInput
              label="First Name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              radius="md"
              required
            />
            <TextInput
              label="Last Name"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              radius="md"
              required
            />
          </Group>

          <TextInput
            label="Email"
            value={email}
            radius="md"
            disabled
          />

          <TextInput
            label="Company Name"
            value={companyName}
            radius="md"
            disabled
          />

          <TextInput
            label="Phone Number"
            value={phoneNumber}
            radius="md"
            disabled
          />

          <Group justify="space-between" mt="sm">
            <Button
              variant="outline"
              color="orange"
              radius="md"
              w="48%"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="orange"
              radius="md"
              w="48%"
              onClick={handleSubmit}
            >
              Update
            </Button>
          </Group>
        </Stack>
      </motion.div>
    </Modal>
  );
}
