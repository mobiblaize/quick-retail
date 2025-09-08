import { UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { notifications } from "@mantine/notifications";
import {
  Title,
  Textarea,
  Button,
  Paper,
  Grid,
  Stack,
  Text,
  Group,
  Image,
  Box,
  ActionIcon,
} from "@mantine/core";
import useStore from "./addProductStore";
import {
  useFetchAllCategories,
  // useFetchAllSubCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import {
  useFetchAllLocations,              
  useUpdateProduct,
} from "../../../../hooks/backendApis/pos/products";
import ProductVariationSection from "./productVariationSection";
import { useNavigate } from "react-router";
import FormInput from "../../../General/formInput";
import Dropdown from "../../../General/dropdown";

interface VariantPayload {
  variationID: string | null;
  sku: string | null;
  cost_price: number;
  selling_price: number;
  reorder_level: number;
  size: string | null;
  color: string | null;
  productID: string | null;
}

const EditProductForm = () => {
  const navigate = useNavigate();
  const { form_data } = useStore();

  const [formData, setFormData] = useState({ ...form_data });
  const { mutate: updateProduct, isPending: isLoading } = useUpdateProduct(
    form_data?.product?.productID
  );

  // ✅ new state for selected category
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    formData?.product?.category?.id || ""
  );

  // ✅ fetch categories & subcategories
  const { data: subCatData } = useFetchSubCatOfCat(
    selectedCategoryId,
    !!selectedCategoryId
  );
  const subCategories = Array.isArray(subCatData?.data) ? subCatData.data : [];

  const subCategoryOptions = subCategories.map(
    (cat: { name: string; id: number }) => ({
      label: cat.name,
      value: cat.id,
    })
  );


  // Categories & Locations
  const { data: categoryData } = useFetchAllCategories();
  const categories = Array.isArray(categoryData?.data?.data)
    ? categoryData.data.data
    : [];
  const categoryOptions = categories.map((c: any) => ({
    label: c.name,
    value: c.id.toString(),
  }));

  // const { data: subCategoryData } = useFetchAllSubCategories();
  // const subCategories = Array.isArray(subCategoryData?.data?.data)
  //   ? subCategoryData.data.data
  //   : [];
  // const subCategoryOptions = subCategories.map((c: any) => ({
  //   label: c.name,
  //   value: c.id.toString(),
  // }));

  const { data: locationData } = useFetchAllLocations();
  const locations = Array.isArray(locationData?.data?.stores?.data)
    ? locationData.data.stores.data
    : [];
  const locationOptions = locations.map((loc: any) => ({
    label: loc.name,
    value: loc.id,
  }));

  // Images
  const [serverImages, setServerImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setServerImages(
      Array.isArray(formData.image_path) ? formData.image_path : []
    );
  }, [formData]);

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prev) => [...prev, ...files]);
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleRemoveImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  // Variants
  const [variants, setVariants] = useState<VariantPayload[]>(
    Array.isArray(form_data?.variations)
      ? form_data.variations.map((v: any) => ({
        variationID: v.variationID ?? null,
        sku: v.sku ?? null,
        cost_price: v.cost_price ?? 0,
        selling_price: v.selling_price ?? 0,
        reorder_level: v.reorder_level ?? 0,
        size: v.attributes?.size ?? null,
        color: v.attributes?.color ?? null,
        productID: form_data.product?.productID ?? null,
      }))
      : []
  );

  const [hasVariationsEnabled] = useState(
    Boolean(form_data.has_variations ?? form_data.product?.has_variations)
  );

  // Handle Submit
  const handleUpdateSubmit = () => {
    if (!formData.product?.productID) {
      notifications.show({
        title: "Error",
        message: "Product ID is missing",
        color: "red",
      });
      return;
    }

    // Ensure we always have at least one variation if has_variations is true
    const preparedVariants =
      variants.length > 0
        ? variants
        : [
          {
            variationID: null,
            productID: formData.product?.productID ?? null,
            sku: `SKU-${Date.now()}`,
            cost_price: parseInt(formData.cost_price?.toString() || "0", 10),
            selling_price: parseInt(
              formData.selling_price?.toString() || "0",
              10
            ),
            reorder_level: parseInt(
              formData.reorder_level?.toString() || "0",
              10
            ),
            size: formData.size ?? null,
            color: formData.color ?? null,
          },
        ];

    const variationsPayload = preparedVariants.map((v) => {
      const baseSku = v.sku?.replace(/\s/g, "") || `SKU-${Date.now()}`;
      const uniqueSku = v.variationID
        ? v.sku // existing variations keep their original SKU
        : `${baseSku}-${Math.floor(Math.random() * 10000)}`; // new variations get unique SKU

      return {
        variationID: v.variationID, // existing or null
        product_id: v.productID ?? formData.product?.productID ?? null,
        sku: uniqueSku,
        cost_price: parseInt(v.cost_price?.toString() || "0", 10),
        selling_price: parseInt(v.selling_price?.toString() || "0", 10),
        reorder_level: parseInt(v.reorder_level?.toString() || "0", 10),
        attributes: {
          size: v.size ?? null,
          color: v.color ?? null,
        },
      };
    });

    const payload = {
      ...formData,
      has_variations: Boolean(
        formData.has_variations ?? formData.product?.has_variations ?? false
      ),
      productID: formData.product?.productID ?? null,
      cost_price: parseInt(formData.cost_price?.toString() || "0", 10),
      selling_price: parseInt(formData.selling_price?.toString() || "0", 10),
      image_path: Array.isArray(formData.image_path)
        ? formData.image_path
        : formData.image_path
          ? [formData.image_path as string]
          : [],
      variations: variationsPayload,
    };

    updateProduct(payload, {
      onSuccess: () => {
        notifications.show({
          title: "Success",
          message: "Product updated successfully",
          color: "green",
        });
        navigate(-1);
      },
      onError: (err: any) => {
        notifications.show({
          title: "Error",
          message: err?.response?.data?.message || "Failed to update product",
          color: "red",
        });
      },
    });
  };

  return (
    <Stack gap="xl">
      {/* BASIC INFO */}
      <Paper p="xl" radius="md" withBorder>
        <Title
          order={3}
          size="h4"
          mb="md"
          pb="xs"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          BASIC INFORMATION
        </Title>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="Product Name"
              placeholder="Enter product name"
              paddingY={"0.7rem"}
              value={formData?.product?.product_name}
              onChange={(e: any) =>
                setFormData({ ...formData, product_name: e.target.value })
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="SKU (Store Keeping Unit)"
              placeholder="Enter SKU"
              paddingY={"0.7rem"}
              value={formData.sku}
              onChange={(e: any) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
          </Grid.Col>

          {/* <Grid.Col span={{ base: 12, md: 6 }}>
            <Dropdown
              label="Category"
              placeholder={
                formData.product.category?.name || "Select product category"
              }
              options={categoryOptions}
              paddingY={"0.7rem"}
              value={formData.product.category?.id?.toString() || ""}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  category: categoryOptions.find((c: any) => c.value === value),
                })
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Dropdown
              label="Sub-category"
              placeholder={
                formData.product.sub_category?.name ||
                "Select product sub category"
              }
              options={subCategoryOptions}
              paddingY={"0.7rem"}
              value={formData.sub_category_id || ""}
              onChange={(value) =>
                setFormData({ ...formData, sub_category_id: value || "" })
              }
            />
          </Grid.Col> */}


          <Grid.Col span={{ base: 12, md: 6 }}>
            <Dropdown
              label="Category"
              placeholder={
                formData.product?.category?.name || "Select product category"
              }
              options={categoryOptions}
              paddingY="0.7rem"
              value={selectedCategoryId} // ✅ keep it number or ""
              onChange={(value) => {
                setSelectedCategoryId(Number(value));
                setFormData({
                  ...formData,
                  category_id: value?.toString() || "", // ensure string type
                  sub_category_id: "", // reset subcategory when category changes
                });
              }}
              />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Dropdown
              label="Sub-category"
              placeholder={
                formData.product?.sub_category?.name || "Select product sub category"
              }
              options={subCategoryOptions} // ✅ filtered by selectedCategoryId
              paddingY="0.7rem"
              value={formData.sub_category_id?.toString() || ""}
              onChange={(value) =>
                setFormData({ 
                  ...formData, 
                  sub_category_id: value?.toString() || "" 
                })
              }
            />
          </Grid.Col>

        </Grid>
      </Paper>

      {/* PRICING INFO */}
      {!hasVariationsEnabled && (
        <Paper p="xl" radius="md" withBorder>
          <Title
            order={3}
            size="h4"
            mb="md"
            pb="xs"
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            PRICING INFORMATION
          </Title>
          <Grid gutter="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FormInput
                label="Cost Price"
                placeholder="₦"
                value={formData.cost_price}
                paddingY={"0.7rem"}
                onChange={(value: any) =>
                  setFormData({
                    ...formData,
                    cost_price: value?.toString() || "",
                  })
                }
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <FormInput
                label="Selling Price"
                placeholder="₦"
                value={formData.selling_price}
                paddingY={"0.7rem"}
                onChange={(value: any) =>
                  setFormData({
                    ...formData,
                    selling_price: value?.toString() || "",
                  })
                }
              />
            </Grid.Col>
          </Grid>
        </Paper>
      )}

      {/* ADDITIONAL INFO & IMAGES */}
      <Paper p="xl" radius="md" withBorder>
        <Title
          order={3}
          size="h4"
          mb="md"
          pb="xs"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          ADDITIONAL INFORMATION
        </Title>

        <Grid gutter="md">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="Short Description"
              placeholder="Enter short product description"
              value={formData.product.short_description}
              paddingY={"0.7rem"}
              onChange={(e: any) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Text size="sm" c="grey" fw={300} mb={3}>
              Long Description
            </Text>
            <Textarea
              // label="Long Description"
              placeholder="Enter detailed product description"
              value={formData.product.long_description}
              // paddingY={"0.7rem"}
              onChange={(e) =>
                setFormData({ ...formData, long_description: e.target.value })
              }
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="Tags"
              placeholder="Enter tags"
              paddingY={"0.7rem"}
              value={formData.product.tags}
              onChange={(e: any) =>
                setFormData({ ...formData, tags: e.target.value })
              }
            />
          </Grid.Col>
        </Grid>

        {/* Product Images */}
        <Box mt="lg">
          <Text fw={500} mb="sm">
            Product Images
          </Text>

          <Group align="center" gap="md">
            {(serverImages.length > 0 || images.length > 0) && (
              <Group gap="md">
                {serverImages.map((url, index) => (
                  <Box key={`server-${index}`} pos="relative" w={200} h={200}>
                    <Image
                      src={url}
                      alt={`server-preview-${index}`}
                      w="100%"
                      h="100%"
                      fit="cover"
                      radius="md"
                    />
                  </Box>
                ))}

                {images.map((file, index) => (
                  <Box
                    key={`uploaded-${index}`}
                    pos="relative"
                    w={200}
                    h={200}
                    className="group" // 👈 group to control hover
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`preview-${index}`}
                      w="100%"
                      h="100%"
                      fit="cover"
                      radius="md"
                    />

                    <ActionIcon
                      variant="filled"
                      color="red"
                      size="sm"
                      radius="xl"
                      pos="absolute"
                      top={6}
                      right={6}
                      onClick={() => handleRemoveImage(index)}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-200 border-2 border-white shadow-lg" // 👈 fade-in on hover
                    >
                      <X size={14} strokeWidth={3} />
                    </ActionIcon>
                  </Box>
                ))}
              </Group>
            )}

            {Array.isArray(formData?.image_path) ? (
              formData.image_path.map((imgSrc, index) => (
                <Image
                  key={index}
                  src={imgSrc}
                  w={200}
                  h={200}
                  fit="cover"
                  radius="md"
                  mt="md"
                  alt={`Image ${index + 1}`}
                />
              ))
            ) : formData?.image_path ? (
              <Image
                src={formData.image_path}
                w={200}
                h={200}
                fit="cover"
                radius="md"
                mt="md"
                alt="Product image"
              />
            ) : null}



            <Paper
              w={200}
              h={200}
              withBorder
              style={{
                border: "2px dashed #d1d5db",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleUploadClick}
            >
              <UploadCloud size={32} color="#9ca3af" />
              <Text size="sm" fw={500} c="orange" mt="xs">
                Click to upload
              </Text>
              <Text size="xs" c="dimmed">
                or drag and drop
              </Text>
              <Text size="xs" c="dimmed" mt={4}>
                PNG, JPEG (max 5 MB)
              </Text>
            </Paper>





            {/* <Button
              variant="subtle"
              color="orange"
              leftSection={<UploadCloud size={16} />}
              onClick={handleUploadClick}
            >
              Add more photos
            </Button> */}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileImageChange}
              accept="image/png, image/jpeg"
              multiple
              style={{ display: "none" }}
            />
          </Group>


        </Box>
      </Paper>

      {/* Inventory */}
      <Paper p="xl" radius="md" withBorder>
        <Title
          order={3}
          size="h4"
          mb="md"
          pb="xs"
          style={{ borderBottom: "1px solid #e5e7eb" }}
        >
          Inventory Details
        </Title>

        <Grid gutter="md" mb="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="Total Stock Quantity"
              placeholder="Enter stock quantity"
              paddingY={"0.7rem"}
              value={formData.quantity}
              onChange={(value: any) =>
                setFormData({ ...formData, quantity: value?.toString() || "" })
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Dropdown
              label="Location"
              placeholder={
                formData.product.location?.name || "Select location"
              }
              options={locationOptions}
              paddingY={"0.7rem"}
              value={formData.product.location?.id || ""}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  location: locationOptions.find((c: any) => c.value === value),
                })
              }
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <FormInput
              label="Reorder Level"
              placeholder="Enter a reorder level"
              paddingY={"0.7rem"}
              value={formData.reorder_level}
              onChange={(value: any) =>
                setFormData({
                  ...formData,
                  reorder_level: value?.toString() || "",
                })
              }
            />
          </Grid.Col>
        </Grid>

        <ProductVariationSection
          form_data={form_data}
          variants={variants}
          setVariants={setVariants}
        />
      </Paper>

      <Paper p="xl" radius="md" withBorder>
        <Group justify="flex-end">
          <Button variant="filled-primary" onClick={handleUpdateSubmit} loading={isLoading} style={{ width: 150 }}>
            {isLoading ? "Updating..." : "Update Product"}
          </Button>
        </Group>
      </Paper>
    </Stack>
  );
};

export default EditProductForm;
