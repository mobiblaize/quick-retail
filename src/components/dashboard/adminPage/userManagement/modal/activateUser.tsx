import { Modal, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useActivateUser } from "../../../../../hooks/backendApis/admin/userManagement";

type Props = {
  opened: boolean;
  onClose: () => void;
  userId: string;
  setUser: (user: any) => void;
};

export default function ActivateUserModal({ opened, onClose, userId, setUser }: Props) {
  const { mutate: activateUser, isPending } = useActivateUser(userId);

  const handleActivate = () => {
    activateUser(undefined, {
      onSuccess: (data: any) => {
        setUser(data.data);
        showNotification({
          title: "Success",
          message: "User activated successfully",
          color: "green",
        });

        setUser(data.data);

        onClose();
      },
      onError: () => {
        showNotification({
          title: "Error",
          message: "Activation failed",
          color: "red",
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="md"
      classNames={{ body: "p-6" }}
    >
      <div className="space-y-4">
        <h2 className="text-[20px] font-bold text-[#344054]">Activate User</h2>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to activate this user? Once activated, this user gains access to features assigned to their role.
        </p>

        <div className="flex gap-4 mt-[2em] justify-center">
          <Button variant="outline-primary" onClick={onClose} disabled={isPending}>
            No
          </Button>
          <Button variant="filled-primary" onClick={handleActivate} loading={isPending}>
            Yes, Activate
          </Button>
        </div>
      </div>
    </Modal>
  );
}
