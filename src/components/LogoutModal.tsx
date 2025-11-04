import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Exit from "../assets/images/exit.png"
import { useLoggedOut } from "../hooks/useCustomSession";
import { useEffect, useState } from "react";

const LogoutModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const logout = useLoggedOut();

  const handleLogout = () => {
    logout();
    close();
  };

  useEffect(() => {
    const name = sessionStorage.getItem("customer_name");
    const email = sessionStorage.getItem("customer_email");

    if (name) setCustomerName(name);
    if (email) setCustomerEmail(email);
  }, []);


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

      <Button unstyled onClick={open} className="w-full ">
        <div className="flex items-center justify-between gap-[1px]  text-sm bg-[#F0F2F5] rounded-[10em] px-6 py-2 cursor-pointer">
          <div className="text-left">
           <Text size="sm" fw={600} c="textSecondary.9">{customerName}</Text>
           <Text fw={400} size="sm" c="secondary">{customerEmail}</Text>
          </div>
          <div>
            <img src={Exit} alt="logout icon" />
          </div>
          
        </div>
      </Button>
    </>
  );
};

export default LogoutModal;
