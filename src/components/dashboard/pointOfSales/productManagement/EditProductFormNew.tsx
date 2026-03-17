/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Switch,
  Group,
  Text,
} from "@mantine/core";
import { FaChevronDown } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";
import ProductVariant from "./ProductVariant";
import { useEffect, useRef, useCallback } from "react";
import { useForm } from "@mantine/form";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import {
  useFetchAllSellingUnits,
  useFetchAllStore,
} from "../../../../hooks/backendApis/pos/storeManagement";
import {
  useCreateProduct,
  useUpdateProduct,
} from "../../../../hooks/backendApis/pos/products";
import { expandFormAttributesToValues } from "../../../../utils/expandFormAttributesToValues";
import { notifications } from "@mantine/notifications";
import { ROUTES } from "../../../../constants/routes";
import { useNavigate, useSearchParams } from "react-router";
import ProductImageUpload from "./ProductImageUpload";

// Form initial values factory
const createInitialFormValues = (isVariable: boolean) => ({
  product_name: "",
  sku: "",
  barcode: "",
  category_id: "",
  sub_category_id: "",
  short_description: "",
  location_id: "",
  has_variations: isVariable,
  selling_unit: "",
  cost_price: "",
  selling_price: "",
  total_quantity: "",
  reorder_level: "",
  image_path: [] as string[],
  variations: [
    {
      variationID: null as string | null,
      cost_price: 0,
      selling_price: 0,
      quantity: 0,
      reorder_level: 0,
      sku: "",
      selling_unit: "",
      attributes: [] as any[],
      image: [] as string[],
    },
  ],
});

// Form validation schema
const createFormValidation = () => ({
  product_name: (value: any) =>
    value?.trim() ? null : "Product name is required",

  sku: (value: any, values: any) =>
    values.has_variations || value?.trim() ? null : "SKU is required",

  category_id: (value: any) => (value ? null : "Category is required"),

  sub_category_id: (value: any) => (value ? null : "Sub-category is required"),

  short_description: (value: any) =>
    value?.trim() ? null : "Short description is required",

  location_id: (value: any) => (value ? null : "Location is required"),

  selling_unit: (value: any, values: any) =>
    values.has_variations || value?.toString().trim()
      ? null
      : "Selling unit is required",

  cost_price: (value: any, values: any) =>
    values.has_variations || Number(value) > 0
      ? null
      : "Cost price must be greater than 0",

  selling_price: (value: any, values: any) =>
    values.has_variations || Number(value) > 0
      ? null
      : "Selling price must be greater than 0",

  total_quantity: validateQuantityAndReorder,

  reorder_level: validateReorderLevel,

  variations: {
    cost_price: validateVariationCostPrice,
    selling_price: validateVariationSellingPrice,
    attributes: (value: any, values: any) =>
      values.has_variations && (!Array.isArray(value) || value.length === 0)
        ? "At least one attribute is required for each variation"
        : null,
    image: (value: any, values: any) =>
      values.has_variations && !Array.isArray(value)
        ? "Invalid image format"
        : null,
    quantity: validateVariationQuantity,
    reorder_level: validateVariationReorderLevel,
    sku: (value: any, values: any) =>
      values.has_variations && !value?.trim()
        ? "Variation SKU is required"
        : null,
    selling_unit: (value: any, values: any) =>
      values.has_variations && !value?.trim()
        ? "Selling unit is required"
        : null,
  },
});

// Validation helpers outside component to reduce complexity
const validateQuantityAndReorder = (value: any, values: any) => {
  if (values.has_variations) return null;
  
  if (Number(value) < 0) return "Quantity cannot be negative";

  if (Number(values.reorder_level) > Number(value))
    return "Quantity cannot be less than reorder level";

  return null;
};

const validateReorderLevel = (value: any, values: any) => {
  if (values.has_variations) return null;
  
  if (Number(value) < 0) return "Reorder level cannot be negative";

  if (Number(value) > Number(values.total_quantity))
    return "Reorder level cannot be greater than quantity";

  return null;
};

const validateVariationCostPrice = (value: any, values: any) => {
  if (!values.has_variations) return null;
  if (value <= 0) return "Cost price must be greater than 0";
  return null;
};

const validateVariationSellingPrice = (value: any, values: any) => {
  if (!values.has_variations) return null;
  if (value <= 0) return "Selling price must be greater than 0";
  return null;
};

const validateVariationQuantity = (value: any, values: any) => {
  if (!values.has_variations) return null;
  if (value < 0) return "Quantity cannot be negative";
  return null;
};

const validateVariationReorderLevel = (value: any, values: any) => {
  if (!values.has_variations) return null;
  if (value < 0) return "Reorder level cannot be negative";
  return null;
};

interface EditProductFormNewProps {
  readonly initialData?: any;
  readonly isLoading?: boolean;
}

function EditProductFormNew({
  initialData,
  isLoading,
}: EditProductFormNewProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInitializing = useRef(false);

  const createProduct = useCreateProduct();
  const productId = initialData?.data?.productID;
  const updateProduct = useUpdateProduct(productId);
  const navigate = useNavigate();

  // Determine if we're in edit mode
  const isEditMode = !!initialData?.data;
  const { data: catData } =
    useFetchAllCategories({
      paginate: false,
    }) || {};
  const { data: storeData } = useFetchAllStore() || {};
  const { data: suData } = useFetchAllSellingUnits() || {};

  // Helper to map data arrays to select options
  const mapToSelectOptions = (data: any[], idField: string = 'id', labelField: string = 'name') => {
    return (Array.isArray(data) ? data : []).map((item: any) => ({
      value: String(item[idField]),
      label: item[labelField],
    }));
  };

  const categories = mapToSelectOptions(catData?.data || []);
  const sellingUnits = mapToSelectOptions(suData?.data || [], 'name', 'name');
  const stores = mapToSelectOptions(storeData?.data || []);

  // Read the query parameter (?variable=true)
  const isVariable = searchParams.get("variable") === "true";

  const form = useForm({
    initialValues: createInitialFormValues(isVariable),
    validate: createFormValidation(),
  });

  // Helper function to update search params
  const updateSearchParams = useCallback((hasVariations: boolean) => {
    const params = new URLSearchParams(searchParams);
    params.set("variable", String(hasVariations));
    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const current = searchParams.get("variable") === "true";
    if (form.values.has_variations !== current) {
      updateSearchParams(form.values.has_variations);
    }
  }, [form.values.has_variations, searchParams, updateSearchParams]);

  const { data: subCatData } =
    useFetchSubCatOfCat(form.values.category_id, !!form.values.category_id) ||
    {};

  const subcategories = mapToSelectOptions(subCatData?.data || []);

  useEffect(() => {
    // Reset sub-category when category changes (but not during initialization)
    if (!isInitializing.current) {
      form.setFieldValue("sub_category_id", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.category_id]);

  // Helper function to group variation values by attribute
  const groupVariationAttributes = (values: any[]) => {
    const grouped = values.reduce((acc: any, val: any) => {
      const attrId = val.attribute_id;
      if (!acc[attrId]) {
        acc[attrId] = {
          attribute_id: attrId,
          attribute_name: val.attribute?.name || "",
          attribute_value_ids: [],
          attribute_values: [],
        };
      }
      acc[attrId].attribute_value_ids.push(val.attribute_value_id);
      acc[attrId].attribute_values.push({
        id: val.attribute_value_id,
        value: val.attribute_value?.value || "",
      });
      return acc;
    }, {});
    return Object.values(grouped);
  };

  // Helper function to transform product variations for form
  const transformProductVariations = (productVariations: any[]) => {
    return productVariations.map((v: any) => ({
      variationID: v.variationID || null,
      cost_price: v.cost_price || 0,
      selling_price: v.selling_price || 0,
      quantity: v.quantity || 0,
      reorder_level: v.reorder_level || 0,
      sku: v.sku || "",
      barcode: v.ean || "",
      selling_unit: v.selling_unit || "",
      attributes: Array.isArray(v.values)
        ? groupVariationAttributes(v.values)
        : [],
      image: v.image_path
        ? v.image_path.split(",").map((url: string) => url.trim()).filter(Boolean)
        : [],
    }));
  };

  // Helper function to set form values from product data
  const setFormValuesFromProduct = (product: any, isVariable: boolean) => {
    form.setValues({
      product_name: product.product_name || "",
      sku: product.sku || "",
      barcode: product.ean || "",
      category_id: product.category_id ? String(product.category_id) : "",
      sub_category_id: product.sub_category_id ? String(product.sub_category_id) : "",
      short_description: product.short_description || "",
      location_id: product.location_id ? String(product.location_id) : "",
      has_variations: isVariable,
      selling_unit: product.selling_unit || "",
      cost_price: product.cost_price || "",
      selling_price: product.selling_price || "",
      total_quantity: product.total_quantity ? String(product.total_quantity) : "",
      reorder_level: product?.product_variations?.[0]?.reorder_level || "",
      image_path: product.image_path
        ? product.image_path.split(",").map((url: string) => url.trim()).filter(Boolean)
        : [],
      variations:
        isVariable && product.product_variations?.length > 0
          ? transformProductVariations(product.product_variations)
          : form.values.variations,
    });
  };

  // Helper to finalize initialization
  const finalizeInitialization = (isVariable: boolean) => {
    if (isVariable) {
      updateSearchParams(true);
    }
    setTimeout(() => {
      isInitializing.current = false;
    }, 0);
  };

  // Pre-populate form when initialData is available
  useEffect(() => {
    if (initialData?.data) {
      isInitializing.current = true;
      const product = initialData.data;
      const isVariable = product.has_variations === 1;
      console.log("initialData sub_category_id:", product.sub_category_id);

      setFormValuesFromProduct(product, isVariable);

      console.log("Form values:", form.values);

      finalizeInitialization(isVariable);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // helper to convert File -> base64 string
  const readFileAsDataURL = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });

  // Helper to convert files to base64 and update form field
  const convertAndAppendImages = async (files: File[], fieldKey: string) => {
    if (!files || files.length === 0) return;

    try {
      const base64s = await Promise.all(files.map(readFileAsDataURL));
      const existing = form.getInputProps(fieldKey).value || [];
      form.setFieldValue(fieldKey, [...existing, ...base64s]);
    } catch (err) {
      console.error("Error converting files", err);
    }
  };

  // variation images: accepts multiple files, appends to variation.image[]
  const handleImageUpload = async (files: File[], variationIndex: number) => {
    await convertAndAppendImages(files, `variations.${variationIndex}.image`);
  };

  const handleRemoveVariationImage = (
    variationIndex: number,
    imageIndex: number,
  ) => {
    const key = `variations.${variationIndex}.image`;
    const existing: string[] = form.getInputProps(key).value || [];
    const updated = existing.filter((_, i) => i !== imageIndex);
    form.setFieldValue(key, updated);
  };

  // simple product images: accepts multiple files, appends to image_path[]
  const handleSimpleImageUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    try {
      const base64s = await Promise.all(files.map(readFileAsDataURL));
      const existing = form.values.image_path || [];
      form.setFieldValue("image_path", [...existing, ...base64s]);
    } catch (err) {
      console.error("Error converting files", err);
    }
  };

  const handleRemoveSimpleImage = (index: number) => {
    const updated = (form.values.image_path || []).filter(
      (_, i) => i !== index,
    );
    form.setFieldValue("image_path", updated);
  };

  // Helper to build variable product payload
  const buildVariableProductPayload = (values: typeof form.values) => {
    const transformedVariations = values.variations.map((variation) => {
      const baseVariation = {
        attributes: expandFormAttributesToValues(variation.attributes),
        cost_price: Number(variation.cost_price),
        selling_price: Number(variation.selling_price),
        quantity: Number(variation.quantity),
        reorder_level: Number(variation.reorder_level),
        sku: variation.sku,
        selling_unit: variation.selling_unit,
        image: variation.image,
      };

      if (variation.variationID) {
        return { ...baseVariation, variationID: variation.variationID };
      }
      return baseVariation;
    });

    return {
      product_name: values.product_name,
      sku: values.sku,
      barcode: values.barcode,
      category_id: Number(values.category_id),
      sub_category_id: Number(values.sub_category_id),
      short_description: values.short_description,
      location_id: Number(values.location_id),
      has_variations: true,
      variations: transformedVariations,
    };
  };

  // Helper to build simple product payload
  const buildSimpleProductPayload = (values: typeof form.values) => {
    return {
      product_name: values.product_name,
      sku: values.sku,
      barcode: values.barcode,
      category_id: Number(values.category_id),
      sub_category_id: Number(values.sub_category_id),
      short_description: values.short_description,
      location_id: Number(values.location_id),
      has_variations: false,
      selling_unit: values.selling_unit,
      cost_price: Number(values.cost_price),
      selling_price: Number(values.selling_price),
      total_quantity: Number(values.total_quantity || 0),
      reorder_level: Number(values.reorder_level || 0),
      image_path: Array.isArray(values.image_path) ? values.image_path : [],
    };
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      let payload: any;

      if (values.has_variations) {
        if (!Array.isArray(values.variations) || values.variations.length < 2) {
          notifications.show({
            title: "Product Variations Error",
            message: "At least 2 variations are required for variable products",
            color: "red",
          });
          return;
        }
        payload = buildVariableProductPayload(values);
      } else {
        payload = buildSimpleProductPayload(values);
      }

      // Use update or create based on edit mode
      const response = isEditMode
        ? await updateProduct.mutateAsync(payload)
        : await createProduct.mutateAsync(payload);

      notifications.show({
        title: isEditMode ? "Product Updated!" : "New Product Saved!",
        message:
          response?.message ||
          (isEditMode
            ? "Product updated successfully"
            : "Product created successfully"),
        color: "green",
      });

      navigate(ROUTES.productManagement);
    } catch (error: any) {
      notifications.clean();

      notifications.show({
        title: "Error",
        message: error?.message || "Failed to create product",
        color: "red",
      });
    }
  };

  // Show loading state while fetching initial data
  if (isLoading) {
    return (
      <Box px="xl" py="lg">
        <Card withBorder radius={"sm"} shadow="md" py="xl">
          <Flex justify="center" align="center" style={{ minHeight: "400px" }}>
            <Text size="lg" c="dimmed">
              Loading product data...
            </Text>
          </Flex>
        </Card>
      </Box>
    );
  }

  return (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <Box px="xl" py="lg">
        {/* Top BASIC INFORMATION (variable mode) or BASIC INFORMATION (simple mode) */}
        <Card withBorder radius={"sm"} shadow="md" py="xl">
          <Title
            order={3}
            mb="sm"
            style={{ color: "#1F2937", fontWeight: 600 }}
          >
            BASIC INFORMATION
          </Title>
          <Divider mb="md" />
          <SimpleGrid
            cols={{ base: 1, md: 2 }}
            spacing={{ base: 10, sm: 40 }}
            verticalSpacing={{ base: "md", sm: "xl" }}
            className="capitalize"
          >
            {/* shared top fields */}
            <TextInput
              label="product name"
              placeholder="Enter product name"
              classNames={{
                label: "capitalize font-semibold py-1",
                input: "!py-5 placeholder:text-#6B7280 ",
              }}
              {...form.getInputProps("product_name")}
              error={form.errors.product_name}
            />
            <TextInput
                  label="Barcode"
                  placeholder="Enter barcode"
                  classNames={{
                    label: "capitalize font-semibold py-1",
                    input: "!py-5 placeholder:text-#6B7280 ",
                  }}
                  {...form.getInputProps("barcode")}
                  error={form.errors.barcode}
                />

            {/* SKU field only for simple products */}
            {!form.values.has_variations && (
              
                <TextInput
                  label="SKU (Store Keeping Unit)"
                  placeholder="Enter SKU"
                  classNames={{
                    label: "capitalize font-semibold py-1",
                    input: "!py-5 placeholder:text-#6B7280 ",
                  }}
                  {...form.getInputProps("sku")}
                  error={form.errors.sku}
                />
            )}
            

            <Select
              label="category"
              placeholder="Select product category"
              data={categories}
              rightSection={<FaChevronDown />}
              classNames={{
                label: "capitalize font-semibold py-1",
                input: "!py-5 placeholder:text-#6B7280 ",
                dropdown: "capitalize",
              }}
              {...form.getInputProps("category_id")}
              error={form.errors.category_id}
            />

            <Select
              label="sub-category"
              placeholder="Select sub-category"
              data={subcategories}
              rightSection={<FaChevronDown />}
              classNames={{
                label: "capitalize font-semibold py-1",
                input: "!py-5 placeholder:text-#6B7280 ",
                dropdown: "capitalize",
              }}
              {...form.getInputProps("sub_category_id")}
              error={form.errors.sub_category_id}
            />

            {/* For simple product, show cost & selling price in BASIC INFORMATION */}
            {form.values.has_variations ? (
              // variable product: show short description and store in this card
              <>
                <Textarea
                  label="short description"
                  placeholder="Enter a short description"
                  {...form.getInputProps("short_description")}
                  error={form.errors.short_description}
                />

                <Select
                  label="Store"
                  placeholder="Select Store"
                  data={stores}
                  rightSection={<FaChevronDown />}
                  classNames={{
                    label: "capitalize font-semibold py-1",
                    input: "!py-5 placeholder:text-#6B7280 ",
                    dropdown: "capitalize",
                  }}
                  {...form.getInputProps("location_id")}
                  error={form.errors.location_id}
                />
              </>
            ) : (
              // simple product: move prices into BASIC INFORMATION
              <>
                <TextInput
                  label="cost price"
                  leftSection={<TbCurrencyNaira />}
                  placeholder="Enter cost price"
                  {...form.getInputProps("cost_price")}
                  error={form.errors.cost_price}
                />

                <TextInput
                  label="selling price"
                  leftSection={<TbCurrencyNaira />}
                  placeholder="Enter selling price"
                  {...form.getInputProps("selling_price")}
                  error={form.errors.selling_price}
                />

                <Textarea
                  label="short description"
                  placeholder="Enter a short description"
                  {...form.getInputProps("short_description")}
                  error={form.errors.short_description}
                />
                {/* Note: store will be shown in INVENTORY DETAILS for simple product */}
              </>
            )}
          </SimpleGrid>

          <Group mt="md">
            <Switch
              label={
                form.values.has_variations
                  ? "Variable Product"
                  : "Simple Product"
              }
              checked={form.values.has_variations}
              onChange={(e) =>
                form.setFieldValue("has_variations", e.currentTarget.checked)
              }
            />
          </Group>
        </Card>

        {/* content varies per mode */}
        {form.values.has_variations ? (
          <>
            {/* Variable product variants UI */}
            <Box mt="xl">
              <ProductVariant
                sellingUnits={sellingUnits}
                form={form}
                handleImagesAddForVariation={handleImageUpload}
                handleRemoveImageForVariation={handleRemoveVariationImage}
              />
            </Box>

            {/* final action buttons (unchanged for variable flow) */}
            <Card mt="xl" shadow="md">
              <Flex justify={"flex-end"} gap={"lg"}>
                <Button variant="outline" tt={"capitalize"}>
                  cancel
                </Button>
                <Button
                  loading={
                    (isEditMode ? updateProduct : (createProduct as any))
                      .isPending
                  }
                  disabled={
                    (isEditMode ? updateProduct : (createProduct as any))
                      .isPending
                  }
                  type="submit"
                  tt={"capitalize"}
                >
                  {isEditMode ? "Update Product" : "Continue"}
                </Button>
              </Flex>
            </Card>
          </>
        ) : (
          /* Simple product: INVENTORY DETAILS card (matches your old template) */
          <Card withBorder radius={"sm"} shadow="md" mt="xl" py="xl">
            <Title
              order={3}
              mb="sm"
              style={{ color: "#1F2937", fontWeight: 600 }}
            >
              INVENTORY DETAILS
            </Title>
            <Divider mb="md" />

            <SimpleGrid
              cols={{ base: 1, md: 2 }}
              spacing={{ base: 10, sm: 40 }}
              verticalSpacing={{ base: "md", sm: "xl" }}
              className="capitalize"
            >
              <Select
                label="selling unit"
                placeholder="Select selling unit"
                data={sellingUnits}
                rightSection={<FaChevronDown />}
                classNames={{
                  label: "capitalize font-semibold py-1",
                  input: "!py-5 placeholder:text-#6B7280 ",
                  dropdown: "capitalize",
                }}
                {...form.getInputProps("selling_unit")}
                error={form.errors.selling_unit}
              />

              <TextInput
                label="quantity"
                placeholder="Enter quantity"
                classNames={{
                  label: "capitalize font-semibold py-1",
                  input: "!py-5 placeholder:text-#6B7280 ",
                }}
                {...form.getInputProps("total_quantity")}
                error={form.errors.total_quantity}
              />

              <TextInput
                label="Re-order level"
                placeholder="Enter re-order level"
                classNames={{
                  label: "capitalize font-semibold py-1",
                  input: "!py-5 placeholder:text-#6B7280 ",
                }}
                {...form.getInputProps("reorder_level")}
                error={form.errors.reorder_level}
              />

              <Select
                label="store"
                placeholder="Select store"
                data={stores}
                rightSection={<FaChevronDown />}
                classNames={{
                  label: "capitalize font-semibold py-1",
                  input: "!py-5 placeholder:text-#6B7280 ",
                  dropdown: "capitalize",
                }}
                {...form.getInputProps("location_id")}
                error={form.errors.location_id}
              />
            </SimpleGrid>

            <Box mt="lg">
              <Text fw={600} fz="sm" my="xs" c="black">
                Product image
              </Text>
              <ProductImageUpload
                images={form.values.image_path}
                onFilesAdd={(files: File[]) => handleSimpleImageUpload(files)}
                onRemove={(i: number) => handleRemoveSimpleImage(i)}
              />
            </Box>

            <Flex justify={"end"} mt="xl" gap={15} className="">
              <Button radius={"md"} variant="outline">
                Cancel
              </Button>
              <Button
                radius={"md"}
                type="submit"
                loading={
                  (isEditMode ? updateProduct : (createProduct as any))
                    .isPending
                }
                disabled={
                  (isEditMode ? updateProduct : (createProduct as any))
                    .isPending
                }
              >
                {isEditMode ? "Update Product" : "Continue"}
              </Button>
            </Flex>
          </Card>
        )}
      </Box>
    </form>
  );
}

export default EditProductFormNew;
