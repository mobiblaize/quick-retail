import {
  Box,
  Divider,
  Flex,
  Text,
  Card,
  SimpleGrid,
  TextInput,
  Select,
  Button,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductImageUpload from "./ProductImageUpload";

interface VariantData {
  id: string;
  size: string;
  color: string;
  selling_unit: string;
  quantity: string;
  cost_price: string;
  selling_price: string;
  sku: string;
  reorder_level: string;
  images: string[];
}

interface ProductVariantProps {
  attributes: { name: string; values: string[] }[];
  onVariantsChange: (variants: {
    cost_price: number;
    selling_price: number;
    quantity: number;
    reorder_level: number;
    sku: string;
    selling_unit: string;
    attributes: { attribute_id: string; attribute_value_id: string }[];
    image: string[];
  }[]) => void;
}

export default function ProductVariant({
  attributes,
  onVariantsChange,
}: ProductVariantProps) {
  const [variants, setVariants] = useState<VariantData[]>([]);

  const handleAddVariant = () => {
    const newVariant: VariantData = {
      id: crypto.randomUUID(),
      size: "",
      color: "",
      selling_unit: "",
      quantity: "",
      cost_price: "",
      selling_price: "",
      sku: "",
      reorder_level: "",
      images: [],
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  const handleDeleteVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariant = (
    id: string,
    field: keyof VariantData,
    value: string | string[]
  ) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const handleImagesChange = (id: string, images: string[]) => {
    updateVariant(id, "images", images);
  };

  // 🔄 Sync formatted variants with parent
  useEffect(() => {
    const formattedVariants = variants.map((variant) => ({
      cost_price: parseFloat(variant.cost_price) || 0,
      selling_price: parseFloat(variant.selling_price) || 0,
      quantity: parseInt(variant.quantity) || 0,
      reorder_level: parseInt(variant.reorder_level) || 0,
      sku: variant.sku,
      selling_unit: variant.selling_unit,
      attributes: [
        ...(variant.size
          ? [{ attribute_id: "size", attribute_value_id: variant.size }]
          : []),
        ...(variant.color
          ? [{ attribute_id: "colour", attribute_value_id: variant.color }]
          : []),
      ],
      image: variant.images,
    }));
    onVariantsChange(formattedVariants);
  }, [variants, onVariantsChange]);

  // 🧩 Extract attribute options
  const sizeOptions =
    attributes
      .find((attr) => attr.name.toLowerCase() === "size")
      ?.values.map((v) => ({ label: v, value: v })) || [];

  const colorOptions =
    attributes
      .find((attr) => attr.name.toLowerCase() === "colour")
      ?.values.map((v) => ({ label: v, value: v })) || [];

  return (
    <Card withBorder radius="md" shadow="sm" mt="xl">
      {/* Header */}
      <Flex justify="space-between" align="center" mb="md">
        <Text fw={600}>Product Variant(s)</Text>
        <FaAngleDown />
      </Flex>
      <Divider />

      {/* Empty State */}
      {variants.length === 0 && (
        <Flex
          mt="md"
          gap="xs"
          align="center"
          className="text-orange-600 font-semibold text-base cursor-pointer"
          onClick={handleAddVariant}
        >
          <IoMdAdd />
          <Text fz="sm" fw={600}>
            Add Variant
          </Text>
        </Flex>
      )}

      {/* Variant Cards */}
      {variants.map((item, index) => (
        <Card key={item.id} withBorder radius="sm" mt="md" shadow="xs" p="md">
          <Flex justify="space-between" align="center" mb="xs">
            <Text fw={500}>Variant {index + 1}</Text>
            <Button
              onClick={() => handleDeleteVariant(item.id)}
              color="red"
              variant="subtle"
              rightSection={<RiDeleteBinLine />}
              size="xs"
            >
              Remove
            </Button>
          </Flex>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl" mb="sm">
            <Select
              label="Size"
              placeholder="Select size"
              data={sizeOptions}
              value={item.size}
              onChange={(value) => updateVariant(item.id, "size", value || "")}
              rightSection={<FaChevronDown />}
            />
            <Select
              label="Color"
              placeholder="Select color"
              data={colorOptions}
              value={item.color}
              onChange={(value) => updateVariant(item.id, "color", value || "")}
              rightSection={<FaChevronDown />}
            />
            <Select
              label="Selling Unit"
              placeholder="Select unit"
              data={[
                { label: "Piece", value: "piece" },
                { label: "Pack", value: "pack" },
              ]}
              value={item.selling_unit}
              onChange={(value) =>
                updateVariant(item.id, "selling_unit", value || "")
              }
              rightSection={<FaChevronDown />}
            />
            <TextInput
              label="Stock Quantity"
              placeholder="Enter quantity"
              value={item.quantity}
              onChange={(e) =>
                updateVariant(item.id, "quantity", e.currentTarget.value)
              }
            />
            <TextInput
              label="Cost Price"
              leftSection={<TbCurrencyNaira />}
              value={item.cost_price}
              onChange={(e) =>
                updateVariant(item.id, "cost_price", e.currentTarget.value)
              }
            />
            <TextInput
              label="Selling Price"
              leftSection={<TbCurrencyNaira />}
              value={item.selling_price}
              onChange={(e) =>
                updateVariant(item.id, "selling_price", e.currentTarget.value)
              }
            />
            <TextInput
              label="SKU (Stock Keeping Unit)"
              placeholder="Enter SKU"
              value={item.sku}
              onChange={(e) =>
                updateVariant(item.id, "sku", e.currentTarget.value)
              }
            />
            <TextInput
              label="Reorder Level"
              placeholder="Enter reorder level"
              value={item.reorder_level}
              onChange={(e) =>
                updateVariant(item.id, "reorder_level", e.currentTarget.value)
              }
            />
          </SimpleGrid>

          {/* Image Upload */}
          <Box mt="md">
            <Text fw={600} fz="sm" mb="xs">
              Product Images
            </Text>
            <ProductImageUpload
              onImagesChange={(images) => handleImagesChange(item.id, images)}
            />
          </Box>
        </Card>
      ))}

      {/* Add Another */}
      {variants.length > 0 && (
        <Button
          mt="xl"
          radius="md"
          onClick={handleAddVariant}
          tt="capitalize"
          className="w-fit"
        >
          Add Another
        </Button>
      )}
    </Card>
  );
}
