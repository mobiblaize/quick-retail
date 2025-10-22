/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Pill, Text, Box, Flex, Grid } from "@mantine/core";
import { useState } from "react";
import { FormAttribute } from "./ProductAttributes";
import {
  useAttributesStore,
  useAttributeValues,
} from "../../../../hooks/backendApis/pos/attributesStore";

interface TagInputGroupProps {
  attribute: FormAttribute;
  onEdit: () => void;
  onDelete: () => void;
  onRemove: (id: number) => void;
}

export default function TagInputGroup({
  attribute,
  onEdit,
  onDelete,
  onRemove,
}: TagInputGroupProps) {
  const [disabled] = useState(false);
  const { attributes } = useAttributesStore(true);
  const { attributeValues } = useAttributeValues(attribute.attribute_id, true);

  const attributeName = (() =>
    attributes?.find((x) => x.id === attribute?.attribute_id)?.name)();

  const attributeValueName = (id: any) =>
    attributeValues?.find((x) => x.id === id)?.value;

  return (
    <Grid gutter={"md"}>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <Text fw={600} fz="sm">
          {attributeName}
        </Text>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Flex justify="space-between">
          <Box
            className="!grow"
            style={{
              border: "1px solid #ced4da",
              width: "100%",
              backgroundColor: disabled ? "#f8f9fa" : "#f1f3f5",
              borderRadius: "8px",
              padding: "2px",
              opacity: disabled ? 0.6 : 1,
              cursor: disabled ? "not-allowed" : "text",
            }}
          >
            <Group gap="xs" wrap="wrap" align="flex-start">
              {attribute.attribute_value_ids?.map((option) => (
                <Pill
                  key={option}
                  size="sm"
                  withRemoveButton={!disabled}
                  onRemove={() => onRemove(option)}
                  variant="outline"
                  className="!capitalize !bg-white !border !border-neutral-400 !text-sm"
                >
                  <Text size="sm">{attributeValueName(option)}</Text>
                </Pill>
              ))}
            </Group>
          </Box>

          <Group ml="md">
            <Text
              onClick={onDelete}
              className="!text-red-600 text-sm font-medium cursor-pointer hover:bg-neutral-100 !px-2 !rounded-sm"
            >
              Delete
            </Text>
            <Text
              className="!text-blue-700 text-sm font-medium cursor-pointer hover:bg-neutral-100 !px-2 !rounded-sm"
              onClick={onEdit}
            >
              {attribute.attribute_value_ids?.length ? "Edit" : "Add"}
            </Text>
          </Group>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}
