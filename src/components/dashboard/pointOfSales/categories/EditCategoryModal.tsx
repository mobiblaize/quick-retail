import { useEffect, useState } from "react";
import { Modal, Button, Text, TextInput, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateCategories } from "../../../../hooks/backendApis/pos/categories";

interface EditModalProps {
  opened: boolean;
  onClose: () => void;
  category: { id: string | number; name: string } | null;
}

const EditCategoryModal = ({ opened, onClose, category }: EditModalProps) => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  // We initialize the hook with the ID. If no category is selected, we pass an empty string
  // (Assuming usePutData handles this gracefully or we block execution)
  const { mutateAsync, isPending } = useUpdateCategories(category?.id ?? "");

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!category || !name.trim()) return;

    try {
      await mutateAsync({ name });

      // Refresh the table data
      queryClient.invalidateQueries({ queryKey: ["pos/category/all"] }); // Adjust key based on your useFetchPostData implementation

      notifications.show({
        title: "Success",
        message: "Category updated successfully",
        color: "green",
      });
      onClose();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to update category",
        color: "red",
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700} size="lg">Edit Category</Text>}
      centered
      radius="lg"
      padding="xl"
      withCloseButton
    >
      <Text c="dimmed" size="sm" mb="md">
        Change category name below.
      </Text>

      <TextInput
        label="Category Name"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        mb="xl"
        styles={{
          input: { height: "45px" },
          label: { marginBottom: "8px", fontWeight: 500 },
        }}
      />

      <Group grow gap="md">
        <Button
          variant="outline"
          color="orange"
          onClick={onClose}
          styles={{
            root: {
              borderColor: "#F97316",
              color: "#F97316",
              height: "45px",
            },
          }}
        >
          No
        </Button>
        <Button
          color="orange"
          onClick={handleSubmit}
          loading={isPending}
          styles={{
            root: {
              backgroundColor: "#F97316",
              height: "45px",
            },
          }}
        >
          Save changes
        </Button>
      </Group>
    </Modal>
  );
};

export default EditCategoryModal;