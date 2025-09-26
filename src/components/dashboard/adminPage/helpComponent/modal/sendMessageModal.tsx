import {
  Modal,
  Button,
  TextInput,
  Select,
  Textarea,
  Group,
  Text,
  Box,
  FileButton,
} from "@mantine/core";
import { useState } from "react";
import { IconUpload, IconTrash, IconCheck } from "@tabler/icons-react";
import { useHelp } from "../../../../../hooks/backendApis/admin/help";
import { notifications } from "@mantine/notifications";

type Props = {
  opened: boolean;
  onClose: () => void;
};

const areasOfConcern = [
  "Point of Sales",
  "User Management",
  "Inventory",
  "Billing",
];

export default function ContactSupportModal({ opened, onClose }: Props) {
  const [email, setEmail] = useState("");
  const [concern, setConcern] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValid =
    email.trim() !== "" && concern !== "" && message.trim() !== "";
  //@ts-ignore
  const { mutate: sendHelp, isLoading } = useHelp();

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!isValid) return;

    let base64File = "";
    if (file) {
      try {
        base64File = await fileToBase64(file);
      } catch (err) {
        console.error("File conversion failed", err);
      }
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Proceed with your action here (e.g., submit form)
    console.log("Valid email:", email);
    setError("");

    const payload = {
      email,
      message,
      application: concern,
      file: base64File,
    };

    sendHelp(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Message sent successfully",
          color: "green",
        });
        // clear and close
        setEmail("");
        setConcern("");
        setMessage("");
        setFile(null);
        onClose();
      },
      onError: (err) => {
        notifications.show({
          title: "Error",
          message: "Failed to send message. Please try again.",
          color: "red",
        });
        console.error("Support request failed", err);
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text fw={600} size="lg" c="#101928">
          Contact Support
          <Text fw={600} size="sm" c="#667185">
            Fill the information below to contact support.
          </Text>
        </Text>
      }
      radius="lg"
      centered
    >
      <Box className="space-y-4">
        {/* <TextInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        /> */}
        <TextInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
            if (error) setError(""); // Clear error on change
          }}
          error={error}
          required
        />

        <Select
          label="Area of Concern"
          placeholder="Select role"
          data={areasOfConcern}
          value={concern}
          onChange={(value) => setConcern(value || "")}
          required
        />

        <Textarea
          label="Message"
          placeholder="Type message here"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          minRows={3}
          required
        />

        <div className="border border-dashed border-gray-300 rounded-lg p-3 text-sm">
          <Text fw={500} size="sm" mb={6}>
            Supporting document if any
          </Text>

          {file ? (
            <Group
              justify="space-between"
              align="center"
              className="p-2 border rounded-lg"
            >
              <Group gap="xs">
                <IconCheck size={16} color="green" />
                <div>
                  <Text size="sm" fw={500} c="green">
                    Upload Successful
                  </Text>
                  <Text size="xs" c="dimmed">
                    {file.name} • {(file.size / 1024).toFixed(1)} KB
                  </Text>
                </div>
              </Group>
              <IconTrash
                size={18}
                color="red"
                className="cursor-pointer"
                onClick={() => setFile(null)}
              />
            </Group>
          ) : (
            <FileButton
              onChange={setFile}
              accept="image/png,image/jpeg,application/pdf"
            >
              {(props) => (
                <Button
                  leftSection={<IconUpload size={16} />}
                  variant="outline"
                  color="orange"
                  {...props}
                >
                  Click to upload
                </Button>
              )}
            </FileButton>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-7 mt-[2em] justify-center min-w-full">
          <Button
            className="!w-full"
            variant="outline-primary"
            onClick={onClose}
          >
            No
          </Button>

          <Button
            className={`!w-full ${
              !isValid || !validateEmail(email)
                ? "bg-'#F16722' text-white cursor-not-allowed"
                : ""
            }`}
            variant="filled"
            color={!isValid || !validateEmail(email) ? "white" : "orange"}
            onClick={handleSubmit}
            disabled={!isValid || !validateEmail(email) || isLoading}
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
