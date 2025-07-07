import { Modal, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useParams } from "react-router-dom";
import { useDeactivateUser } from "../../../../../hooks/backendApis/admin/userManagement";

type Props = {
  opened: boolean;
  onClose: () => void;
  setUser: (user: any) => void;
};

export default function DeactiveUserModal({ opened, onClose, setUser }: Props) {
  const { userId } = useParams();
  const deactivateUser = useDeactivateUser(userId || "");

  const handleDeactivate = () => {
    deactivateUser.mutate(undefined, {
      onSuccess: (response: any) => {
        showNotification({
          title: "User Deactivated",
          message: response?.message || "User deactivated successfully",
          color: "green",
        });
        setUser(response.data); 
        onClose();
      },
      onError: (err: any) => {
        showNotification({
          title: "Error",
          message: err?.response?.data?.message || "Something went wrong",
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
        <div className="items-left gap-2">
          <h2 className="text-[20px] font-bold text-[#344054]">Deactivate User</h2>
        </div>

        <p className="text-[#667085] text-[15px]">
          Are you sure you want to deactivate this user? Once deactivated, the
          user will no longer have access to features assigned to their role.
        </p>

        <div className="flex gap-4 mt-[2em] justify-center">
          <Button variant="outline-primary" onClick={onClose}>
            No
          </Button>

          <Button variant="filled-primary" onClick={handleDeactivate}>
            Yes, Deactivate
          </Button>
        </div>
      </div>
    </Modal>
  );
}
