import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useLoggedOut } from "../hooks/useCustomSession";
import { LockIcon } from "lucide-react";

const LogoutModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const logout = useLoggedOut();

  const handleLogout = () => {
    logout();
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius="md"
        withCloseButton={false}
      >
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <Text fw={700} fz={24}>
              Log Out
            </Text>
            <Text className="py-4">Are you sure you want to log out?</Text>
            <div className="grid lg:grid-cols-2 gap-4 my-2">
              <Button variant="default" onClick={close} size="md" radius={"xl"}>
                Cancel
              </Button>
              <Button
                color="#FD7E14"
                onClick={handleLogout}
                size="md"
                radius={"xl"}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Button unstyled onClick={open} className="w-full">
        <div className="flex items-center gap-[14px]  text-sm bg-[#FCE7DD] rounded-lg px-6 p-4 cursor-pointer">
          <LockIcon className="w-4 h-4" />
          <p>Log Out</p>
        </div>
      </Button>
    </>
  );
};

export default LogoutModal;
