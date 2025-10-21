import {
  Modal,
  Checkbox,
  Button,
  TextInput,
  ScrollArea,
  Text,
  Flex,
  Stack,
} from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { FormAttribute } from "./ProductAttributes";
import {
  useAttributesStore,
  useAttributeValues,
} from "../../../../hooks/backendApis/pos/attributesStore";

type Props = {
  opened: boolean;
  attribute: FormAttribute | null;
  onClose: () => void;
  onSave: (values: number[]) => void;
  onAddNew?: () => void;
};

export default function SelectAttributeValueModal({
  opened,
  attribute,
  onClose,
  onSave,
  onAddNew,
}: Props) {
  const { attributes } = useAttributesStore(true);
  const { attributeValues } = useAttributeValues(
    attribute?.attribute_id || 0,
    !!attribute
  );
  const [selected, setSelected] = useState<number[]>(
    attribute?.attribute_value_ids || []
  );
  const [search, setSearch] = useState("");

  // Reset selections when modal reopens
  useEffect(() => {
    if (opened) {
      setSelected([]);
      setSearch("");
    }
  }, [opened, attribute]);

  const attributeName = (() =>
    attributes?.find((x) => x.id === attribute?.attribute_id)?.name)();

  useEffect(() => {
    setSelected(attribute?.attribute_value_ids || []);
  }, [attribute]);

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    const query = search?.trim()?.toLowerCase();
    if (!query) return attributeValues;
    return attributeValues.filter((opt) =>
      opt?.name?.toLowerCase()?.includes(query)
    );
  }, [search, attributeValues]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Select ${attributeName || "Options"}`}
      centered
      size="sm"
    >
      <Text c="dimmed" size="sm" mb="sm">
        Select one or more values for this attribute
      </Text>

      <TextInput
        placeholder="Search options..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="sm"
      />

      {/* ✅ Scrollable Checkbox List - Single Column */}
      <ScrollArea h={220}>
        <Stack p="xs">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.value}
                checked={selected.includes(opt.id)}
                onChange={(e) => {
                  const checked = e.currentTarget.checked;
                  setSelected((prev) =>
                    checked
                      ? [...prev, opt.id]
                      : prev.filter((x) => x !== opt.id)
                  );
                }}
              />
            ))
          ) : (
            <Text size="sm" c="dimmed" ta="center" mt="md">
              No options found.
            </Text>
          )}
        </Stack>
      </ScrollArea>

      <Text
        mt="md"
        className="!text-orange-500 font-medium cursor-pointer hover:underline"
        onClick={() => onAddNew && onAddNew()}
      >
        + Add New Option
      </Text>

      <Flex justify="space-between" mt="xl">
        <Button
          variant="outline"
          color="gray"
          radius="md"
          onClick={onClose}
          w="48%"
        >
          Cancel
        </Button>
        <Button
          color="orange"
          radius="md"
          w="48%"
          onClick={() => {
            // Sort selected IDs based on their order in `attributeValues`
            const ordered = attributeValues
              .filter((opt) => selected.includes(opt.id))
              .map((opt) => opt.id);
            onSave(ordered);
          }}
          disabled={selected.length === 0}
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
