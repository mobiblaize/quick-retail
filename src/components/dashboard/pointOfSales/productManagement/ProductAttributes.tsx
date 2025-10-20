import { Box, Card, Divider, Flex, Text, Menu } from "@mantine/core";
import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { IconChevronDown } from "@tabler/icons-react";
import TagInputGroup from "./ProductAttributeTags";
import AttributeSelectionModal from "./AttributeSelectionModal";
import AddAttributeModal from "./AddAttributeModal";

interface ProductAttributesProps {
  onAttributesChange: (attributes: { name: string; values: string[] }[]) => void;
}

export default function ProductAttributes({ onAttributesChange }: ProductAttributesProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [size, setSize] = useState<string[]>(["Small", "Medium", "Large"]);
  const [colour, setColour] = useState<string[]>(["White", "Black", "Pink"]);

  const [selectionModal, setSelectionModal] = useState<null | "size" | "colour">(null);
  const [addModal, setAddModal] = useState<null | "size" | "colour">(null);

  // Keep parent updated
  useEffect(() => {
    onAttributesChange([
      { name: "size", values: size },
      { name: "colour", values: colour },
    ]);
  }, [size, colour, onAttributesChange]);

  return (
    <Card withBorder radius="md" shadow="sm" mt="xl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={600}>Product Attributes</Text>

        <Menu shadow="md" width={180}>
          <Menu.Target>
            <Flex align="center" gap={6} className="cursor-pointer select-none">
              <IoMdAdd size={18} className="text-[#FF6600]" />
              <Text fz="sm" fw={600} c="#FF6600">
                Select Attribute
              </Text>
              
            </Flex>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => setSelectionModal("size")}>Size</Menu.Item>
            <Menu.Item onClick={() => setSelectionModal("colour")}>Colour</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>

      <Divider mb="md" />

      {/* Attribute List */}
      {isVisible && (
        <Box>
          <TagInputGroup
            label="Size"
            value={size}
            setValue={setSize}
            onEdit={() => setSelectionModal("size")}
          />
          <Divider my="lg" />
          <TagInputGroup
            label="Colour"
            value={colour}
            setValue={setColour}
            onEdit={() => setSelectionModal("colour")}
          />
          
        </Box>
      )}

      {/* ===================== Modals ===================== */}

      {/* Size Selection Modal */}
      <AttributeSelectionModal
        opened={selectionModal === "size"}
        onClose={() => setSelectionModal(null)}
        title="Sizes"
        options={[
          "Extra Small (XS)",
          "Small (S)",
          "Medium (M)",
          "Large (L)",
          "Extra Large (XL)",
          "Extra Extra Large (XXL)",
        ]}
        selected={size}
        onSave={setSize}
        onAddNew={() => {
          setSelectionModal(null);
          setAddModal("size");
        }}
        id={1}
      />

      {/* Colour Selection Modal */}
      <AttributeSelectionModal
        opened={selectionModal === "colour"}
        onClose={() => setSelectionModal(null)}
        title="Colours"
        options={["Black", "White", "Red", "Yellow", "Brown", "Nude", "Pink"]}
        selected={colour}
        onSave={setColour}
        onAddNew={() => {
          setSelectionModal(null);
          setAddModal("colour");
        }}
        id={2}
      />

      {/* Add Size Modal */}
      <AddAttributeModal
        opened={addModal === "size"}
        onClose={() => setAddModal(null)}
        attributeType="Size"
        onSave={(newValues) => setSize((prev) => [...prev, ...newValues])}
        id={1}
      />

      {/* Add Colour Modal */}
      <AddAttributeModal
        opened={addModal === "colour"}
        onClose={() => setAddModal(null)}
        attributeType="Colour"
        onSave={(newValues) => setColour((prev) => [...prev, ...newValues])}
        id={2}
      />
    </Card>
  );
}
