import {
  Card,
  Title,
  Divider,
  SimpleGrid,
  TextInput,
  Select,
  Textarea,
  Flex,
  Box,
  Button,
} from "@mantine/core";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { notifications } from "@mantine/notifications";
import ProductAttributes from "./ProductAttributes";
import ProductVariant from "./ProductVariant";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import {
  useFetchAllLocations,
  useCreateProduct,
} from "../../../../hooks/backendApis/pos/products";

export default function AddVariableProductNew() {
  const [formData, setFormData] = useState({
    product_name: "",
    sku: "",
    category_id: "",
    sub_category_id: "",
    short_description: "",
    location_id: "",
    has_variations: true,
    variations: [],
  });

  const [attributes, setAttributes] = useState<
    { name: string; values: string[] }[]
  >([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const { data: categoryData } = useFetchAllCategories();
  const { data: subCategoryData } = useFetchSubCatOfCat(
    selectedCategoryId,
    !!selectedCategoryId
  );
  const { data: locationData } = useFetchAllLocations();
  const createProduct = useCreateProduct();

  // Data mapping
  const categories = Array.isArray(categoryData?.data?.data)
    ? categoryData.data.data
    : [];
  const subCategories = Array.isArray(subCategoryData?.data)
    ? subCategoryData.data
    : [];
  const locations = Array.isArray(locationData?.data?.stores)
    ? locationData.data.stores
    : [];

  const categoryOptions = categories.map((cat: { name: string; id: number }) => ({
    label: cat.name,
    value: String(cat.id),
  }));

  const subCategoryOptions = subCategories.map(
    (cat: { name: string; id: number }) => ({
      label: cat.name,
      value: String(cat.id),
    })
  );

  const locationOptions = locations.map((loc: { name: string; id: string }) => ({
    label: loc.name,
    value: String(loc.id),
  }));

  const handleVariantsChange = (variants: any[]) => {
    setFormData((prev) => ({ ...prev, variations: variants }));
  };

  const handleSubmit = () => {
    const {
      product_name,
      sku,
      category_id,
      sub_category_id,
      short_description,
      location_id,
      has_variations,
      variations,
    } = formData;

    if (!product_name || !sku || !category_id || !sub_category_id || !location_id) {
      notifications.show({
        color: "red",
        message: "Please fill in all required fields.",
      });
      return;
    }

    const payload = {
      product_name,
      sku,
      category_id: Number(category_id),
      sub_category_id: Number(sub_category_id),
      short_description,
      location_id: Number(location_id),
      has_variations,
      variations,
    };

    createProduct.mutate(payload, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          message: "Product added successfully!",
        });
        setFormData({
          product_name: "",
          sku: "",
          category_id: "",
          sub_category_id: "",
          short_description: "",
          location_id: "",
          has_variations: true,
          variations: [],
        });
        setAttributes([]);
      },
      onError: (error: unknown) => {
        const err = error as { response?: { data?: { message?: string } } };
        notifications.show({
          color: "red",
          message: err?.response?.data?.message || "Failed to add product.",
        });
      },
    });
  };

  return (
    <Box px="xl" py="lg">
      {/* Basic Info Section */}
      <Card withBorder radius="sm" shadow="md" py="xl">
        <Title order={3} mb="sm" style={{ color: "#1F2937", fontWeight: 600 }}>
          BASIC INFORMATION
        </Title>
        <Divider mb="md" />

        <SimpleGrid
          cols={{ base: 1, md: 2 }}
          spacing={{ base: 10, sm: 40 }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <TextInput
            label="Product Name"
            placeholder="Enter product name"
            value={formData.product_name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, product_name: e.target.value }))
            }
            classNames={{
              label: "capitalize font-semibold py-1",
              input: "!py-5 placeholder:text-[#6B7280]",
            }}
          />

          <TextInput
            label="SKU (Store Keeping Unit)"
            placeholder="Enter SKU"
            value={formData.sku}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, sku: e.target.value }))
            }
            classNames={{
              label: "capitalize font-semibold py-1",
              input: "!py-5 placeholder:text-[#6B7280]",
            }}
          />

          <Select
            label="Category"
            placeholder="Select product category"
            data={categoryOptions}
            value={formData.category_id}
            onChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                category_id: value || "",
                sub_category_id: "",
              }));
              setSelectedCategoryId(value || "");
            }}
            rightSection={<FaChevronDown />}
            classNames={{
              label: "capitalize font-semibold py-1",
              input: "!py-5 placeholder:text-[#6B7280]",
            }}
          />

          <Select
            label="Sub-category"
            placeholder="Select sub-category"
            data={subCategoryOptions}
            value={formData.sub_category_id}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, sub_category_id: value || "" }))
            }
            rightSection={<FaChevronDown />}
            classNames={{
              label: "capitalize font-semibold py-1",
              input: "!py-5 placeholder:text-[#6B7280]",
            }}
          />

          <Select
            label="Location"
            placeholder="Select location"
            data={locationOptions}
            value={formData.location_id}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, location_id: value || "" }))
            }
            rightSection={<FaChevronDown />}
            classNames={{
              label: "capitalize font-semibold py-1",
              input: "!py-5 placeholder:text-[#6B7280]",
            }}
          />

          <Textarea
            label="Short Description"
            placeholder="Enter a short description"
            value={formData.short_description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                short_description: e.target.value,
              }))
            }
          />
        </SimpleGrid>
      </Card>

      {/* Product Attributes & Variants */}
      <Box mt="xl">
        <ProductAttributes onAttributesChange={setAttributes} />
        <ProductVariant
          attributes={attributes}
          onVariantsChange={handleVariantsChange}
        />
      </Box>

      {/* Footer Actions */}
      <Card mt="xl" shadow="md">
        <Flex justify="flex-end" gap="lg">
          <Button variant="outline" tt="capitalize">
            Cancel
          </Button>
          <Button
            tt="capitalize"
            onClick={handleSubmit}
            loading={createProduct.isPending}
          >
            Continue
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
