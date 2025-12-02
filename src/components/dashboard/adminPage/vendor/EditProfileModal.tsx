import { useState, useEffect } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Avatar,
  Stack,
  Text,
} from "@mantine/core";
import { motion } from "framer-motion";

interface EditVendorProfileModalProps {
  opened: boolean;
  onClose: () => void;
  initialData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    companyName?: string;
    phoneNumber?: string;
    localImage?: string;
  };
  onSave: (data: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    phoneNumber: string;
    localImage?: string;
  }) => void;
}

export default function EditVendorProfileModal({
  opened,
  onClose,
  initialData,
  onSave,
}: EditVendorProfileModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localImage, setLocalImage] = useState("");

  // ✅ Load initial data when modal opens
  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName || "");
      setLastName(initialData.lastName || "");
      setEmail(initialData.email || "");
      setCompanyName(initialData.companyName || "");
      setPhoneNumber(initialData.phoneNumber || "");
      setLocalImage(initialData.localImage || "");
    }
  }, [initialData]);


  const handleSubmit = () => {
    onSave({
      firstName,
      lastName,
      email,
      companyName,
      phoneNumber,
      localImage,
    });
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
          {/* Avatar Upload */}
          <div className="relative flex justify-start mb-2">
            <Avatar
              src={localImage}
              radius="100%"
              size={90}
              alt="Profile Picture"
              styles={{ root: { border: "2px solid #FF6B00" } }}
            />
            
          </div>

          {/* Editable Name Fields */}
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

          {/* Read-only Fields */}
          <TextInput label="Email" value={email} radius="md" disabled />
          <TextInput label="Company Name" value={companyName} radius="md" disabled />
          <TextInput label="Phone Number" value={phoneNumber} radius="md" disabled />

          <Group justify="space-between" mt="sm">
            <Button variant="outline" color="orange" radius="md" w="48%" onClick={onClose}>
              Cancel
            </Button>
            <Button color="orange" radius="md" w="48%" onClick={handleSubmit}>
              Update
            </Button>
          </Group>
        </Stack>
      </motion.div>
    </Modal>
  );
}
