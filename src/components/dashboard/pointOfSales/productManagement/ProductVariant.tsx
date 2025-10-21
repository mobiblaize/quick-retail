/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Divider,
  Flex,
  Text,
  Card,
  SimpleGrid,
  TextInput,
  Button,
  NumberInput,
  Collapse,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductImageUpload from "./ProductImageUpload";
import ProductAttributes from "./ProductAttributes";

interface ProductVariantProps {
  form: any;
  sellingUnits: any[];
  handleImagesAddForVariation: (files: File[], variationIndex: number) => void;
  handleRemoveImageForVariation: (
    variationIndex: number,
    imageIndex: number
  ) => void;
}

function ProductVariant({
  form,
  handleImagesAddForVariation,
  handleRemoveImageForVariation,
  sellingUnits,
}: ProductVariantProps) {
  const [expanded, setExpanded] = useState(true);

  const addVariant = () => {
    const newVariant = {
      cost_price: 0,
      selling_price: 0,
      quantity: 0,
      reorder_level: 0,
      sku: "",
      selling_unit: "",
      attributes: [],
      image: [],
    };
    form.insertListItem("variations", newVariant);
  };

  const removeVariant = (index: number) => {
    form.removeListItem("variations", index);
  };

  const variants = form.values.variations;

  return (
    <Card withBorder radius="sm" shadow="md" mt="xl">
      <Box>
        <Flex
          justify="space-between"
          align="center"
          className="cursor-pointer select-none"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <Text fw={600}>Product variant(s)</Text>
          <FaChevronDown
            className={`transition-transform duration-200 ${
              expanded ? "rotate-0" : "-rotate-90"
            }`}
          />
        </Flex>
        <Divider mt="xs" />

        <Collapse in={expanded}>
          {variants.length === 0 && (
            <Flex
              mt="md"
              gap="xs"
              align="center"
              className="!text-text-orange font-bold text-xl cursor-pointer"
              onClick={addVariant}
            >
              <IoMdAdd />
              <Text
                fz="sm"
                fw={600}
                tt="capitalize"
                className="!text-text-orange"
              >
                add variant
              </Text>
            </Flex>
          )}

          {variants.map((variant: any, vIndex: number) => (
            <Card key={vIndex} withBorder radius="sm" mt="sm">
              <Text fw={600} mb="md">
                Variant {vIndex + 1}
              </Text>

              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                <NumberInput
                  label="Cost Price"
                  leftSection={<TbCurrencyNaira />}
                  {...form.getInputProps(`variations.${vIndex}.cost_price`)}
                />
                <NumberInput
                  label="Selling Price"
                  leftSection={<TbCurrencyNaira />}
                  {...form.getInputProps(`variations.${vIndex}.selling_price`)}
                />
                <NumberInput
                  label="Quantity"
                  {...form.getInputProps(`variations.${vIndex}.quantity`)}
                />
                <NumberInput
                  label="Reorder Level"
                  {...form.getInputProps(`variations.${vIndex}.reorder_level`)}
                />
                <TextInput
                  label="SKU (Store Keeping Unit)"
                  {...form.getInputProps(`variations.${vIndex}.sku`)}
                />

                <Select
                  label="Selling Unit"
                  placeholder="Select Selling Unit"
                  data={sellingUnits}
                  rightSection={<FaChevronDown />}
                  classNames={{
                    label: "capitalize font-semibold py-1",
                    input: "!py-5 placeholder:text-#6B7280 ",
                    dropdown: "capitalize",
                  }}
                  {...form.getInputProps(`variations.${vIndex}.selling_unit`)}
                />
                {/* <TextInput
                  label="Selling Unit"
                  {...form.getInputProps(`variations.${vIndex}.selling_unit`)}
                /> */}
              </SimpleGrid>

              {/* Attributes */}
              <Box mt="md">
                <ProductAttributes form={form} index={vIndex} />
              </Box>

              {/* Image Upload */}
              <Box mt="lg">
                <Text fw={600} fz="sm" my="xs" c="black">
                  Product image
                </Text>
                <ProductImageUpload
                  images={form.values.variations[vIndex].image}
                  onFilesAdd={(files: File[]) =>
                    handleImagesAddForVariation(files, vIndex)
                  }
                  onRemove={(imgIndex: number) =>
                    handleRemoveImageForVariation(vIndex, imgIndex)
                  }
                />
              </Box>

              <Flex justify="end" mt="xl" gap={15}>
                <Button
                  onClick={() => removeVariant(vIndex)}
                  radius="md"
                  variant="outline"
                  rightSection={<RiDeleteBinLine />}
                >
                  Remove Variant
                </Button>
              </Flex>
            </Card>
          ))}

          {variants.length > 0 && (
            <Button
              radius="md"
              tt="capitalize"
              className="!w-fit"
              mt="xl"
              onClick={addVariant}
            >
              Add another
            </Button>
          )}
        </Collapse>
      </Box>
    </Card>
  );
}
