/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Button, Text, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteCategory } from "../../../../hooks/backendApis/pos/categories";

interface DeleteModalProps {
  opened: boolean;
  onClose: () => void;
  category: { id: string | number; name: string } | null;
}

const DeleteCategoryModal = ({ opened, onClose, category }: DeleteModalProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useDeleteCategory(category?.id ?? "");

  const handleDelete = async () => {
    if (!category) return;

    try {
      await mutateAsync();

      // Refresh the table data
      queryClient.invalidateQueries({ queryKey: ["pos/category/all"] });

      notifications.show({
        title: "Deleted",
        message: "Category deleted successfully",
        color: "green",
      });
      onClose();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to delete category",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700} size="lg">Delete Category</Text>}
      centered
      radius="lg"
      padding="xl"
    >
      <Text c="dimmed" size="sm" mb="xl">
        Are you sure you want to delete this category?<br />
        Products added to this category will be deleted.
      </Text>

      <Group grow gap="md">
        <Button
          variant="default"
          onClick={onClose}
          styles={{
            root: {
              borderColor: "#D1D5DB",
              color: "#374151",
              height: "45px",
            },
          }}
        >
          No
        </Button>
        <Button
          color="red"
          onClick={handleDelete}
          loading={isPending}
          styles={{
            root: {
              backgroundColor: "#DC2626",
              height: "45px",
            },
          }}
        >
          Yes, delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteCategoryModal;