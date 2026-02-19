import { Card, Text, Button, Modal, Loader } from "@mantine/core";
import { ArrowUpRight } from "lucide-react";
import { handleOpenEmail } from "../../../utils/handleEmail";

interface CheckMailProps {
  email: string;
  message?: string;
  onClose: () => void;
  opened: boolean;
  onResend: () => void; // Function to trigger resend
  isResending?: boolean; // Loading state
}

const CheckMail = ({
  email,
  message,
  onClose,
  opened,
  onResend,
  isResending = false,
}: CheckMailProps) => {
  return (
    <Modal 
      opened={opened} 
      onClose={onClose} 
      centered 
      withCloseButton={false}
      radius={20}
    >
      <div className="flex flex-col justify-center items-center">
        <Card
          shadow="none"
          radius="lg"
          p={32}
          className="max-w-md w-full text-center border-none"
        >
          <div className="flex flex-col items-center gap-4">
            <Text fw={700} size="xl" c="#48464E">
              Check Your Mail
            </Text>
            <Text c="#6C6975" size="sm">
              {message || `We sent a password reset link to ${email}`}
            </Text>

            <Button
              color="#F56630"
              radius="xl"
              size="md"
              fullWidth
              className="mt-4"
              rightSection={<ArrowUpRight size={16} />}
              onClick={() => {
                handleOpenEmail(email);
                onClose();
              }}
            >
              Open Email App
            </Button>

            <div className="flex justify-center items-center mt-2 gap-1">
              <Text size="sm" c="dimmed">
                Didn't receive the email?
              </Text>
              
              <Button
                variant="transparent"
                size="sm"
                className="text-[#F56630] hover:underline p-0 h-auto"
                onClick={onResend}
                loading={isResending}
                disabled={isResending}
              >
                Resend Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default CheckMail;