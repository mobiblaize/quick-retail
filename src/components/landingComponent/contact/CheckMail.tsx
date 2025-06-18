import { Card, Text, Button, Modal } from "@mantine/core";
import { ArrowUpRight } from "lucide-react";
import { handleOpenEmail } from "../../../utils/handleEmail";

const CheckMail = ({
  email,
  message,
  onClose,
  opened,
}: {
  email: string;
  message: string;
  onClose: () => void;
  opened: boolean;
}) => {
  return (
    <Modal opened={opened} onClose={onClose} centered>
      <div className="flex flex-col min-h-[50vh] justify-center items-center ">
        <Card
          shadow="sm"
          radius="lg"
          p={32}
          withBorder
          className=" max-w-md w-full text-center"
        >
          <div className="flex flex-col items-center gap-4">
            <Text fw={700} size="xl" c="#48464E">
              Check Your Mail
            </Text>
            <Text c="#6C6975">{message || "Please check your mail."}</Text>

            <Button
              color="#F56630"
              radius="xl"
              size="md"
              className="mt-4"
              rightSection={<ArrowUpRight size={16} />}
              onClick={() => {
                handleOpenEmail(email);
                onClose();
              }}
            >
              Check Mail
            </Button>
          </div>
        </Card>
      </div>
    </Modal>
  );
};

export default CheckMail;
