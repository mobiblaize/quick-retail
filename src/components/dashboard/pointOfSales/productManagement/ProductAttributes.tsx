/* eslint-disable @typescript-eslint/no-explicit-any */
// ProductAttributes.tsx
import { Box, Card, Divider, Flex, Text } from "@mantine/core";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IconChevronDown } from "@tabler/icons-react";
import TagInputGroup from "./ProductAttributeTags";
import ProductAttributesModal from "./ProductAttributesModal";
import SelectAttributeValueModal from "./SelectAttributeValueModal";
import CreateAttributeModal from "./CreateAttributeModal";
import AddAttributeOptionsModal from "./AddAttributeOptionsModal";

interface Props {
  form: any;
  index: number;
}

export interface ProductAttributes {
  id: number;
  name: string;
}

export interface FormAttribute {
  attribute_id: number;
  attribute_value_ids: number[];
}

export interface ProductAttributeValue {
  attribute_id: string;
  attribute_value_id: string;
}

export default function ProductAttributes({ form, index }: Props) {
  const [opened, setOpened] = useState({
    select: false,
    selectValue: false,
    create: false,
    addOptions: false,
  });

  const [selectedAttribute, setSelectedAttribute] =
    useState<FormAttribute | null>(null);

  // Read attributes array for this variation safely
  const attrs: FormAttribute[] =
    (form.values?.variations?.[index]?.attributes as any[]) || [];

  // Add attribute placeholders (no values yet) if needed — but we generally add values via modal
  const updateAttributes = (attributeIds: number[]) => {
    const newAttrs = attributeIds.map((id) => {
      return {
        attribute_id: id,
        attribute_value_ids:
          attrs.find((x) => id === x.attribute_id)?.attribute_value_ids ?? [],
      };
    });
    form.setFieldValue(`variations.${index}.attributes`, newAttrs);
  };

  const removeAllForAttribute = (attributeId: number) => {
    console.log(attributeId);

    const remaining = attrs.filter((a) => a.attribute_id !== attributeId);
    form.setFieldValue(`variations.${index}.attributes`, remaining);
  };

  const removeAttributeOption = (attributeId: number, optionId: number) => {
    const selAttr = { ...attrs.find((x) => x.attribute_id === attributeId) };
    selAttr.attribute_value_ids = selAttr?.attribute_value_ids?.filter(
      (a) => a !== optionId
    );
    const updated = attrs.map((a) =>
      a.attribute_id === attributeId ? selAttr : a
    );
    form.setFieldValue(`variations.${index}.attributes`, updated);
  };

  // Append values for an attribute (used by SelectAttributeValueModal onSave)
  const UpdateAttributeOption = (attributeId: number, values: number[]) => {
    const selAttr = { ...attrs.find((x) => x.attribute_id === attributeId) };
    selAttr.attribute_value_ids = values;
    const updated = attrs.map((a) =>
      a.attribute_id === attributeId ? selAttr : a
    );
    form.setFieldValue(`variations.${index}.attributes`, updated);
  };

  // When user selects an attribute from the Select Attribute modal:
  const handleSelectAttribute = (attributeIds: number[]) => {
    console.log(attributeIds);
    
    updateAttributes(attributeIds);
    setOpened((prev) => ({ ...prev, select: false }));
  };

  // When SelectAttributeValueModal returns selected values
  const handleValuesSelected = (values: number[]) => {
    if (!selectedAttribute) return;
    UpdateAttributeOption(selectedAttribute.attribute_id, values);
    setSelectedAttribute(null);
    setOpened((prev) => ({ ...prev, selectValue: false }));
  };

  return (
    <Card withBorder radius="sm" shadow="sm" p="sm">
      <Flex justify="space-between" align="center">
        <Text fw={600}>Attributes</Text>

        <Flex
          gap="xs"
          className="!text-text-orange font-bold text-md cursor-pointer"
          align="center"
          onClick={() => setOpened((prev) => ({ ...prev, select: true }))}
        >
          <IoMdAdd />
          <Text fz="sm" fw={600} className="!text-text-orange">
            select attribute
          </Text>
        </Flex>
      </Flex>

      <Divider mt="sm" />

      <Box mt="sm">
        {/* Render TagInputGroup for each attribute group */}
        {attrs.length === 0 ? (
          <Text c="dimmed" size="sm">
            No attributes added for this variant yet.
          </Text>
        ) : (
          attrs.map((attribute, i) => {
            return (
              <Box key={`${index}-${attribute.attribute_id}-${i}`} mb="md">
                <TagInputGroup
                  attribute={attribute}
                  onDelete={() => removeAllForAttribute(attribute.attribute_id)}
                  onRemove={(optionId) =>
                    removeAttributeOption(attribute.attribute_id, optionId)
                  }
                  onEdit={() => {
                    setSelectedAttribute(attribute);
                    setOpened((prev) => ({ ...prev, selectValue: true }));
                  }}
                />
              </Box>
            );
          })
        )}
      </Box>

      {/* Modals */}
      <ProductAttributesModal
        opened={opened.select}
        selection={attrs.map((x) => x.attribute_id)}
        onClose={() => setOpened((prev) => ({ ...prev, select: false }))}
        onContinue={handleSelectAttribute} // returns attribute id/name
        onCreateNew={() =>
          setOpened((prev) => ({ ...prev, select: false, create: true }))
        }
      />

      <SelectAttributeValueModal
        opened={opened.selectValue}
        attribute={selectedAttribute}
        onClose={() => {
          setOpened((prev) => ({ ...prev, selectValue: false }));
          setSelectedAttribute(null);
        }}
        onSave={(values: number[]) => handleValuesSelected(values)}
        onAddNew={() =>
          setOpened((prev) => ({
            ...prev,
            selectValue: false,
            addOptions: true,
          }))
        }
      />

      <CreateAttributeModal
        opened={opened.create}
        onClose={() =>
          setOpened((prev) => ({ ...prev, create: false, select: true }))
        }
        onSave={() =>
          setOpened((prev) => ({ ...prev, create: false, select: true }))
        }
      />

      <AddAttributeOptionsModal
        opened={opened.addOptions}
        attribute={selectedAttribute}
        onClose={() =>
          setOpened((prev) => ({
            ...prev,
            addOptions: false,
            selectValue: true,
          }))
        }
        onSave={() =>
          setOpened((prev) => ({
            ...prev,
            addOptions: false,
            selectValue: true,
          }))
        }
      />
    </Card>
  );
}
