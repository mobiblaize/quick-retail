import { Modal, TextInput, Button, Text, Flex, Stack } from "@mantine/core";
import { useState } from "react";
import { FormAttribute } from "./ProductAttributes";
import { IoAddOutline } from "react-icons/io5";
import {
  useAttributesStore,
  useAttributeValues,
} from "../../../../hooks/backendApis/pos/attributesStore";
import { notifications } from "@mantine/notifications";

interface AddAttributeOptionsModalProps {
  opened: boolean;
  attribute: FormAttribute | null;
  onClose: () => void;
  onSave: () => void;
}

export default function AddAttributeOptionsModal({
  opened,
  attribute,
  onClose,
  onSave,
}: AddAttributeOptionsModalProps) {
  const { attributes } = useAttributesStore(true);
  const [options, setOptions] = useState<string[]>([""]);
  const { createAttributeValues, createAttributeValuesMutation } =
    useAttributeValues(attribute?.attribute_id || 0, !!attribute);

  const attributeName = (() =>
    attributes?.find((x) => x.id === attribute?.attribute_id)?.name)();

  const handleChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const handleAddValue = () => setOptions([...options, ""]);

  const handleSave = () => {
    const filtered = options.filter((o) => o.trim() !== "");
    if (filtered.length <= 0) return;
    createAttributeValues(
      { attribute_id: String(attribute?.attribute_id), value: filtered },
      {
        onSuccess: (res) => {
          notifications.show({
            title: "Success",
            message: res.message || "Attribute Options Created Successfully.",
            color: "green",
          });
          onSave();
          setOptions([""]);
        },
        onError: (error) => {
          notifications.show({
            title: "Error",
            message:
              error?.response?.data?.message ||
              "Failed to create attribute options",
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
      title={<Text fw={600}>Add New Options</Text>}
      centered
      radius="lg"
    >
      <Text c="dimmed" size="sm" mb="sm">
        Enter options related to the product.
      </Text>

      <Stack gap="sm">
        <TextInput
          label="Attribute Type"
          value={attributeName || ""}
          disabled
          mb="sm"
        />

        {options.map((value, index) => (
          <TextInput
            key={index}
            label={`Option Value`}
            placeholder="Enter value"
            description={
              index === 0
                ? "Example of a value is; Large (L) for size or Round for shape"
                : undefined
            }
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
        {!createAttributeValuesMutation.isPending && (
          <Flex
            align="center"
            gap={6}
            mt="xs"
            className="cursor-pointer select-none"
            onClick={handleAddValue}
          >
            <IoAddOutline size={18} color="#f97316" />
            <Text c="orange.6" fw={500} size="sm">
              Add More Value
            </Text>
          </Flex>
        )}
      </Stack>

      <Flex justify="space-between" mt="xl">
        <Button
          variant="outline"
          color="gray"
          radius="md"
          onClick={() => {
            onClose();
            setOptions([""]);
          }}
          w="48%"
        >
          Cancel
        </Button>
        <Button
          color="orange"
          radius="md"
          w="48%"
          onClick={handleSave}
          loading={createAttributeValuesMutation.isPending}
          disabled={
            options.every((o) => !o.trim()) ||
            createAttributeValuesMutation.isPending
          }
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
