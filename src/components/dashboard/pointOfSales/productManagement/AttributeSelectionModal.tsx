import {
  Modal,
  Text,
  Checkbox,
  ScrollArea,
  Flex,
  Button,
  Divider,
} from "@mantine/core";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { usePostData } from "../../../../hooks/useApis";

interface AttributeSelectionModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selected: string[];
  onSave: (values: string[]) => void;
  onAddNew: () => void;
  id: number;
}

export default function AttributeSelectionModal({
  opened,
  onClose,
  title,
  options,
  selected,
  onSave,
  onAddNew,
  id,
}: AttributeSelectionModalProps) {
  const [values, setValues] = useState<string[]>(selected);

  const addVariationValueMutation = usePostData(
    "pos/variation/add-variation-value"
  );

  const handleSave = () => {
    const data = {
      values: values.map((value) => ({
        variation_attribute_id: id,
        value,
      })),
    };
    addVariationValueMutation.mutate(data, {
      onSuccess: () => {
        onSave(values);
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
          <Text fw={600}>{title}</Text>
          <Text fz="sm" c="dimmed">
            Select options suitable for the product
          </Text>
        </div>
      }
      centered
      size="md"
      radius="md"
      overlayProps={{ opacity: 0.3, blur: 2 }}
    >
      <ScrollArea h={250}>
        <Checkbox.Group value={values} onChange={setValues}>
          {options.map((opt) => (
            <Checkbox key={opt} value={opt} label={opt} mt="xs" />
          ))}
        </Checkbox.Group>
      </ScrollArea>

      <Flex
        align="center"
        gap={5}
        mt="md"
        className="cursor-pointer"
        onClick={onAddNew}
      >
        <IoMdAdd color="#F16722" />
        <Text c="#F16722" fw={500} fz="sm">
          Add New Options
        </Text>
      </Flex>

      <Divider my="md" />
      <Flex justify="space-between">
        <Button
          variant="default"
          onClick={onClose}
          radius="md"
          w="48%"
          disabled={addVariationValueMutation.isPending}
        >
          Cancel
        </Button>
        <Button
          color="#F16722"
          onClick={handleSave}
          radius="md"
          w="48%"
          loading={addVariationValueMutation.isPending}
        >
          Continue
        </Button>
      </Flex>
    </Modal>
  );
}
