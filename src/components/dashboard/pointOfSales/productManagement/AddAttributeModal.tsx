import { Modal, Text, TextInput, Button, Flex } from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { usePostData } from "../../../../hooks/useApis";

interface AddAttributeModalProps {
  opened: boolean;
  onClose: () => void;
  attributeType: string;
  onSave: (newValues: string[]) => void;
  id: number;
}

export default function AddAttributeModal({
  opened,
  onClose,
  attributeType,
  onSave,
  id,
}: AddAttributeModalProps) {
  const [values, setValues] = useState<string[]>([""]);

  const addVariationValueMutation = usePostData("pos/variation/add-variation-value");

  const handleChange = (index: number, value: string) => {
    const updated = [...values];
    updated[index] = value;
    setValues(updated);
  };

  const addMoreValue = () => setValues([...values, ""]);

  const handleSave = () => {
    const filtered = values.filter((v) => v.trim() !== "");
    const data = {
      values: filtered.map((value) => ({
        variation_attribute_id: id,
        value,
      })),
    };
    addVariationValueMutation.mutate(data, {
      onSuccess: () => {
        onSave(filtered);
        onClose();
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <div>
          <Text fw={600}>Add New Options</Text>
          <Text fz="sm" c="dimmed">
            Enter options related to the product
          </Text>
        </div>
      }
      centered
      size="md"
      radius="md"
      overlayProps={{ opacity: 0.3, blur: 2 }}
    >
      <TextInput label="Attribute Type" value={attributeType} readOnly mb="md" />
      {values.map((val, i) => (
        <TextInput
          key={i}
          label={`Option Value ${i + 1}`}
          placeholder="Enter value"
          value={val}
          onChange={(e) => handleChange(i, e.currentTarget.value)}
          mb="md"
        />
      ))}

      <Flex align="center" gap={5} className="cursor-pointer" onClick={addMoreValue}>
        <IoMdAdd color="#F16722" />
        <Text c="#F16722" fw={500} fz="sm">
          Add More Value
        </Text>
      </Flex>

      <Flex justify="space-between" mt="lg">
        <Button variant="default" radius="md" w="48%" onClick={onClose} disabled={addVariationValueMutation.isPending}>
          Cancel
        </Button>
        <Button color="#F16722" radius="md" w="48%" onClick={handleSave} loading={addVariationValueMutation.isPending}>
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
