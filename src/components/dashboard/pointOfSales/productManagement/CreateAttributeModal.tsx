import { Modal, TextInput, Button, Text, Flex } from "@mantine/core";
import { useState } from "react";
import { useAttributesStore } from "../../../../hooks/backendApis/pos/attributesStore";
import { notifications } from "@mantine/notifications";

interface CreateAttributeModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}

export default function CreateAttributeModal({
  opened,
  onClose,
  onSave,
}: CreateAttributeModalProps) {
  const [value, setValue] = useState("");
  const { createAttribute, createAttributeMutation } = useAttributesStore(true);

  const onAdd = () => {
    createAttribute(
      { name: value },
      {
        onSuccess: (res) => {
          notifications.show({
            title: "Success",
            message: res.message || "Attribute Created Successfully.",
            color: "green",
          });
          onSave(value);
          setValue("");
        },
        onError: (error) => {
          notifications.show({
            title: "Error",
            message:
              error?.response?.data?.message || "Failed to create attribute",
            color: "red",
          });
        },
      }
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Create New Attribute"
      centered
    >
      <Text c="dimmed" size="sm" mb="sm">
        Enter new product attribute.
      </Text>

      <TextInput
        placeholder="E.g. Size"
        value={value}
        disabled={createAttributeMutation.isPending}
        onChange={(e) => setValue(e.target.value)}
        mb="md"
      />



      <Flex justify="space-between" mt="xl">
        <Button
          variant="outline"
          color="gray"
          radius="md"
          onClick={() => {
            onClose();
            setValue("");
          }}
          w="48%"
        >
          Cancel
        </Button>
        <Button
          color="orange"
          radius="md"
          w="48%"
          onClick={onAdd}
          loading={createAttributeMutation.isPending}
          disabled={!value || createAttributeMutation.isPending}
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
