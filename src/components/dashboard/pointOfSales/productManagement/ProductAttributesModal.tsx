import {
  Modal,
  Checkbox,
  Button,
  TextInput,
  ScrollArea,
  Text,
  Flex,
} from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
import { useAttributesStore } from "../../../../hooks/backendApis/pos/attributesStore";

interface ProductAttributesModalProps {
  selection: number[];
  opened: boolean;
  onClose: () => void;
  onContinue: (selected: number[]) => void;
  onCreateNew: () => void;
}

export default function ProductAttributesModal({
  opened,
  selection,
  onClose,
  onContinue,
  onCreateNew,
}: ProductAttributesModalProps) {
  const [selected, setSelected] = useState<number[]>(selection);
  const { attributes } = useAttributesStore(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSelected(selection);
  }, [selection]);

  // Filter attributes based on search query
  const filteredAttributes = useMemo(() => {
    const query = search?.trim()?.toLowerCase();
    if (!query) return attributes;
    return attributes.filter((attr) =>
      attr?.name?.toLowerCase()?.includes(query)
    );
  }, [attributes, search]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Product Attributes"
      centered
    >
      <Text c="dimmed" size="sm" mb="sm">
        Select attributes suitable for the product
      </Text>

      {/* 🔍 Search input */}
      <TextInput
        placeholder="Search attributes..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        mb="sm"
      />

      {/* 🧾 Scrollable attribute list */}
      <ScrollArea h={200}>
        {filteredAttributes.length > 0 ? (
          filteredAttributes.map((attr) => (
            <Checkbox
              key={attr.id}
              label={attr.name}
              checked={selected.includes(attr.id)}
              onChange={(e) => {
                const checked = e.currentTarget.checked;
                setSelected((prev) =>
                  checked
                    ? [...prev, attr.id]
                    : prev.filter((x) => x !== attr.id)
                );
              }}
              mb="xs"
            />
          ))
        ) : (
          <Text size="sm" c="dimmed" ta="center" mt="md">
            No attributes found.
          </Text>
        )}
      </ScrollArea>

      <Text
        mt="md"
        className="!text-orange-500 font-medium cursor-pointer hover:underline"
        onClick={onCreateNew}
      >
        + Add New Attribute
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
            // Sort selected IDs based on their order in `attributes`
            const ordered = attributes
              .filter((attr) => selected.includes(attr.id))
              .map((attr) => attr.id);
            onContinue(ordered);
          }}
          disabled={selected.length === 0}
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
}
