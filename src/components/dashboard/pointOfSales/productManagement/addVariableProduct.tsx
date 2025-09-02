import { Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import FormInput from "../../../General/formInput";
// import FormSelect from "../../../General/select";
import { TextInput, FileInput, ActionIcon, Group } from "@mantine/core"
import useStore, { initialFormState } from "./addProductStore";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import { useFetchAllLocations } from "../../../../hooks/backendApis/pos/products";
import { Box, Button, Input, Table, Text, Textarea, Title } from "@mantine/core";
import Dropdown from "../../../General/dropdown";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import { useCreateProduct } from "../../../../hooks/backendApis/pos/products";
import Select, { MultiValue } from "react-select";

interface Variant {
  id: number;
  // image?: string;
  image?: string | null;
  name?: string;
  quantity?: string;
  cost_price?: string;
  selling_price?: string;
  reorder_level?: string;
  size?: string;
  color?: string;
  location_id?: string;
}

const initialVariants: Variant[] = [
  {
    id: 1,
    image: "",
    name: "",
    quantity: "",
    cost_price: "",
    selling_price: "",
    reorder_level: "",
  },
];

const AddVariableForm = () => {
  const navigate = useNavigate();

  const { resetForm } = useStore();

  const { mutate } = useCreateProduct();

  const [loading, setLoading] = useState(false);

  const [variantErrors, setVariantErrors] = useState<Record<number, { price?: string; quantity?: string }>>({});

  const [formData, setFormData] = useState({
    ...initialFormState,
    tags: [] as string[], // make sure tags is an array
  });

  const tagOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "food", label: "Food" },
    { value: "item", label: "Item" },
    { value: "phone", label: "Phone" },
    { value: "Gadget", label: "Gadget" },
    { value: "book", label: "Book" },
    { value: "accessory", label: "Accessory" },
  ];

  // Handler to update tags in state
  const handleTagChange = (selected: MultiValue<{ value: string; label: string }>) => {
    const values = selected.map((item: any) => item.value);
    setFormData({ ...formData, tags: values });
  };

  const handleSave = () => {
    if (!form_data.product_name) {
      notifications.show({
        title: "Validation error",
        message: "Please fill all required fields",
        color: "red",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Validate selling price > cost price in all variants
    const invalidVariation = variants.find((v) => {
      const sellingPrice = Number(v.selling_price);
      const costPrice = Number(v.cost_price);
      return sellingPrice <= costPrice;
    });

    if (invalidVariation) {
      notifications.show({
        title: "Validation error",
        message: "Selling price must be greater than cost price in all variations.",
        color: "red",
      });
      return;
    }

    // Ensure first variant image exists and is a non-empty string (base64)
    if (!variants[0]?.image) {
      notifications.show({
        title: "Validation error",
        message: "Please upload an image for the first variant.",
        color: "red",
      });
      return;
    }

    if (!form_data.category_id || !form_data.sub_category_id) {
      notifications.show({
        title: "Validation error",
        message: "Please select category and sub-category",
        color: "red",
      });
      return;
    }

    const payload = {
      product_name: form_data.product_name,
      sku: form_data.sku,
      // category_id: Number(form_data.category_id),
      // sub_category_id: Number(form_data.sub_category_id),
      category_id: Number(form_data.category_id),
      sub_category_id: Number(form_data.sub_category_id),
      short_description: form_data.short_description,
      long_description: form_data.long_description,
      location_id: Number(form_data.location_id),
      has_variations: true,
      // tags: form_data.tags,
      tags: formData.tags.join(","),
      promotional_price: Number(form_data.promotional_price),
      promotional_start_date: form_data.promotional_start_date,
      promotional_end_date: form_data.promotional_end_date,
      safety_instructions: form_data.safety_instructions,
      certificates: form_data.certificates,

      // IMPORTANT: directly assign image_path from variants state
      image_path: [variants[0].image],

      variations: variants.map((v) => ({
        cost_price: Number(v.cost_price),
        selling_price: Number(v.selling_price),
        quantity: Number(v.quantity),
        reorder_level: Number(v.reorder_level),
        size: v.size,
        colour: v.color,
        image: v.image,
      })),
    };

    setLoading(true);

    // check required fields
    if (!form_data.product_name) {
      notifications.show({ title: "Validation error", message: "Please fill all required fields", color: "red" });
      return;
    }

    // check all variant errors
    for (const id in variantErrors) {
      const errors = variantErrors[id];
      if (errors.price || errors.quantity) {
        notifications.show({
          title: "Validation error",
          message: errors.price || errors.quantity,
          color: "red",
        });
        return;
      }
    }

    mutate(payload, {
      onSuccess: () => {
        setLoading(false);
        notifications.show({
          title: "Success",
          message: "Product added successfully",
          color: "green",
        });
        resetForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(-1);
      },
      onError: () => {
        setLoading(false);
        // notifications.show({
        //   title: "Error",
        //   message: error?.response?.data?.message || "Failed to add product",
        //   color: "red",
        // });
      },
    });
  };



  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ""
  );

  const { data: locationData } = useFetchAllLocations();

  const locations = Array.isArray(locationData?.data?.stores)
    ? locationData.data.stores
    : [];

  const locationOptions = locations.map(
    (loc: { name: string; id: string }) => ({
      label: loc?.name,
      value: loc?.id,
    })
  );

  const { data: subCatData } = useFetchSubCatOfCat(
    selectedCategoryId,
    !!selectedCategoryId
  );

  const subCategories = Array.isArray(subCatData?.data) ? subCatData.data : [];

  const { data } = useFetchAllCategories();
  const categories = Array.isArray(data?.data?.data) ? data.data.data : [];

  const categoryOptions =
    Array.isArray(categories) && categories.length > 0
      ? categories.map((cat: { name: string; id: number }) => ({
        label: cat.name,
        value: cat.id,
      }))
      : [];

  const subCategoryOptions =
    Array.isArray(subCategories) && subCategories.length > 0
      ? subCategories.map((cat: { name: string; id: number }) => ({
        label: cat.name,
        value: cat.id,
      }))
      : [];

  const { form_data, updateForm } = useStore();

  const [variants, setVariants] = useState<Variant[]>(initialVariants);

  if (!variants.length) {
    notifications.show({
      title: "Validation error",
      message: "Please add at least one variation",
      color: "red",
    });
    return;
  }



  const handleImageChange = (id: number, file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result?.toString() || "";

      setVariants((prev) =>
        prev.map((variant) =>
          variant.id === id ? { ...variant, image: base64String } : variant
        )
      );

      if (id === 0) {
        updateForm({
          ...form_data,
          image_path: [base64String],
        });
      }
    };

    reader.readAsDataURL(file);
  };



  const handleAddVariant = () => {
    const newId = variants.length + 1;
    const newVariant: Variant = {
      id: newId,
      image: "",
      name: `New Variant ${newId}`,
      quantity: "",
      cost_price: "",
      selling_price: "",
      reorder_level: "",
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  // const handleVariantChange = (
  //   id: number,
  //   field: keyof Variant,
  //   value: string
  // ) => {
  //   setVariants((prev) =>
  //     prev.map((variant) =>
  //       variant.id === id ? { ...variant, [field]: value } : variant
  //     )
  //   );
  // };

  const handleVariantChange = (id: number, field: keyof Variant, value: string) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );

    setVariantErrors((prev) => {
      const current = prev[id] || {};
      const variant = variants.find(v => v.id === id);

      if (!variant) return prev;

      let priceError = current.price;
      let quantityError = current.quantity;

      if (field === "cost_price" || field === "selling_price") {
        const cost = field === "cost_price" ? Number(value) : Number(variant.cost_price);
        const selling = field === "selling_price" ? Number(value) : Number(variant.selling_price);

        if (!isNaN(cost) && !isNaN(selling) && selling <= cost) {
          priceError = "Selling price must be greater than cost price";
        } else {
          priceError = undefined;
        }
      }

      if (field === "quantity" || field === "reorder_level") {
        const qty = field === "quantity" ? Number(value) : Number(variant.quantity);
        const reorder = field === "reorder_level" ? Number(value) : Number(variant.reorder_level);

        if (!isNaN(qty) && !isNaN(reorder) && reorder > qty) {
          quantityError = "Reorder level cannot exceed quantity";
        } else {
          quantityError = undefined;
        }
      }

      return { ...prev, [id]: { price: priceError, quantity: quantityError } };
    });
  };


  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          BASIC INFORMATION
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Product Name"
            placeholder="Enter product name"
            paddingY={"0.7rem"}
            value={form_data.product_name}
            onChange={(e: any) =>
              updateForm({ ...form_data, product_name: e.target.value })
            }
          />

          <FormInput
            type="text"
            label="SKU (Store Keeping Unit)"
            placeholder="Enter SKU"
            paddingY={"0.7rem"}
            value={form_data.sku}
            onChange={(e: any) =>
              updateForm({ ...form_data, sku: e.target.value })
            }
          />

          {/* <FormSelect
            label="Category"
            placeholder="Select product category"
            options={categoryOptions}
            name="category"
            paddingY="4"
            value={selectedCategoryId}
            onChange={(e: any) => {
              setSelectedCategoryId(Number(e.target.value));
              updateForm({ ...form_data, category_id: e.target.value });
            }}
          /> */}

          {/* <FormSelect
            label="Sub-category"
            placeholder="Select sub-category"
            options={subCategoryOptions}
            name="sub-category"
            paddingY="4"
            value={form_data.sub_category_id}
            onChange={(e: any) =>
              updateForm({ ...form_data, sub_category_id: e.target.value })
            }
          /> */}



          {/* Category */}
          <Box>
            <Text size="sm" c="grey" fw={300} mb={3}>
              Category
            </Text>
            {/* <Dropdown
              options={categoryOptions} // [{ label: string, value: string | number }]
              value={selectedCategoryId} // can be number directly
              paddingY={"0.7rem"}
              onChange={(val) => {
                setSelectedCategoryId(Number(val));
                setFormData({ ...formData, category_id: Number(val) });
              }}
              placeholder="Select product category"
              required
            /> */}
            <Dropdown
              options={categoryOptions}
              value={form_data.category_id}
              paddingY={"0.7rem"}
              placeholder="Select product category"
              onChange={(val) => {
                const id = String(val);
                setSelectedCategoryId(id);
                updateForm({ ...form_data, category_id: id, sub_category_id: '' });
              }}
              />
            </Box>

          {/* Sub-category */}
          <div>
            <Text size="sm" c="grey" fw={300} mb={3}>
              Sub-category
            </Text>
            {/* <Dropdown
              options={subCategoryOptions}
              value={formData.sub_category_id}
              paddingY={"0.7rem"}
              onChange={(val) =>
                setFormData({ ...formData, sub_category_id: Number(val) })
              }
              placeholder="Select sub-category"
              required
            /> */}
            <Dropdown
              options={subCategoryOptions}
              value={form_data.sub_category_id}
              paddingY={"0.7rem"}
              placeholder="Select sub-category"
              onChange={(val) => {
                updateForm({ ...form_data, sub_category_id: String(val) });
              }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md mt-[3em]">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          INVENTORY DETAILS
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-[3em]">
          <FormInput
            type="text"
            label="Total Stock Quantity"
            placeholder="Enter stock quantity"
            paddingY={"0.7rem"}
            value={form_data.quantity}
            onChange={(e: any) =>
              updateForm({ ...form_data, quantity: e.target.value })
            }
          />

          <div>
            <Text size="sm" c="grey" fw={300} mb={3}>
              Location
            </Text>
            <Dropdown
              options={locationOptions}
              value={form_data.location_id}
              paddingY={"0.7rem"}
              onChange={
                // @ts-ignore
                (val) => updateForm({ ...form_data, location_id: val })
              }
              required
              // textColorClass="text-gray-800"
              placeholder="Select location"
            />
          </div>
        </div>



        <Table.ScrollContainer minWidth="100%">
          <Table striped highlightOnHover withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Variant Image
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Size
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Colour
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Quantity
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Reorder Level
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Cost Price
                  </Text>
                </Table.Th>
                <Table.Th>
                  <Text fw={600} size="sm">
                    Selling Price
                  </Text>
                </Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {variants.map((variant) => (
                <Table.Tr key={variant.id}>
                  <Table.Td>
                    <Group gap="xs" style={{ minWidth: 120 }}>
                      {variant.image ? (
                        <Group gap="xs" style={{ flex: 1 }}>
                          <Text size="xs" truncate style={{ maxWidth: 80 }} title={variant.image}>
                            {variant.image.length > 10 ? `${variant.image.slice(0, 10)}...` : variant.image}
                          </Text>
                          <ActionIcon
                            size="sm"
                            color="red"
                            variant="subtle"
                            onClick={() =>
                              setVariants((prev) => prev.map((v) => (v.id === variant.id ? { ...v, image: "" } : v)))
                            }
                          >
                            <X size={14} />
                          </ActionIcon>
                        </Group>
                      ) : (
                        // <FileInput
                        //   accept="image/*"
                        //   onChange={(file) => handleImageChange(variant.id, file)}
                        //   size="xl"
                        //   // placeholder="Click to upload"
                        //   rightSection={
                        //     <div style={{ display: "flex", alignItems: "center", height: "100%", paddingRight: 20 }}>
                        //       <Upload size={34} onChange={(file) => handleImageChange(variant.id, file)} />
                        //     </div>
                        //   }
                        // />
                        <>

                          <FileInput
                            accept="image/*"
                            onChange={(file) => handleImageChange(variant.id, file)}
                            size="xl"
                            // placeholder="Click to upload"
                            rightSection={
                              <label
                                htmlFor={`file-input-${variant.id}`} // link to hidden input
                                style={{ display: "flex", alignItems: "center", height: "100%", cursor: "pointer", paddingRight: 20 }}
                              >
                                <Upload size={34} color="orange" />
                              </label>
                            }
                          />
                          <Input
                            type="file"
                            id={`file-input-${variant.id}`} // hidden input
                            style={{ display: "none" }}
                            accept="image/*"
                            onChange={(e) => handleImageChange(variant.id, e.target.files?.[0] || null)}
                          />

                        </>
                      )}
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="Enter size"
                      value={variant.size || ""}
                      onChange={(e) => handleVariantChange(variant.id, "size", e.target.value)}
                      size="md"
                    />
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="Enter colour"
                      value={variant.color || ""}
                      onChange={(e) => handleVariantChange(variant.id, "color", e.target.value)}
                      size="md"
                    />
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="Enter quantity"
                      value={variant.quantity || ""}
                      onChange={(e) => handleVariantChange(variant.id, "quantity", e.target.value)}
                      size="md"
                    // error={variantErrors[variant.id]?.quantity}
                    />
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="Enter level"
                      value={variant.reorder_level || ""}
                      onChange={(e) => handleVariantChange(variant.id, "reorder_level", e.target.value)}
                      size="md"
                      error={variantErrors[variant.id]?.quantity}
                    />
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="₦"
                      value={variant.cost_price}
                      onChange={(e) => handleVariantChange(variant.id, "cost_price", e.target.value)}
                      size="md"
                      error={variantErrors[variant.id]?.price}
                    />
                  </Table.Td>

                  <Table.Td>
                    <TextInput
                      placeholder="₦"
                      value={variant.selling_price}
                      onChange={(e) => handleVariantChange(variant.id, "selling_price", e.target.value)}
                      size="md"
                      error={variantErrors[variant.id]?.price}
                    />
                  </Table.Td>

                  <Table.Td>
                    <ActionIcon
                      color="red"
                      variant="subtle"
                      onClick={() => setVariants((prev) => prev.filter((v) => v.id !== variant.id))}
                    >
                      <Trash2 size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Group justify="flex-start" mt="md">
            <Button leftSection={<Plus size={16} />} variant="subtle" color="orange" onClick={handleAddVariant}>
              Add Variant
            </Button>
          </Group>
        </Table.ScrollContainer>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          ADDITIONAL INFORMATION
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            type="text"
            label="Short Description"
            paddingY={"0.7rem"}
            placeholder="Enter short product description"
            value={form_data.short_description}
            onChange={(e: any) =>
              updateForm({ ...form_data, short_description: e.target.value })
            }
          />

          {/* <FormInput
            type="text"
            label="Long Description"
            paddingY={"0.7rem"}
            placeholder="Enter detailed product description"
            optional
            value={form_data.long_description}
            onChange={(e: any) =>
              updateForm({ ...form_data, long_description: e.target.value })
            }
          /> */}
          <div>
            <Text size="sm" c="grey" fw={300} mb={3}>
              Long Description
            </Text>
            <Textarea
              // type="text"
              placeholder="Enter detailed product description"
              // style={{ padding: "0.7rem" }}
              // optional
              value={formData.long_description}
              onChange={(e: any) =>
                setFormData({ ...formData, long_description: e.target.value })
              }
            />
          </div>

          {/* <FormInput
            type="text"
            label="Tags"
            paddingY={"0.7rem"}
            placeholder="Enter tags"
            value={form_data.tags}
            onChange={(e: any) =>
              updateForm({ ...form_data, tags: e.target.value })
            }
          /> */}

          <div>
            <Text size="sm" fw={300} mb={5} c="gray">
              Tags
            </Text>
            <Select
              options={tagOptions}
              isMulti
              placeholder="Enter tags"
              value={tagOptions.filter((tag) => formData.tags.includes(tag.value))}
              onChange={handleTagChange}
              styles={{
                control: (provided) => ({
                  ...provided,
                  minHeight: "2.5rem",
                  borderWidth: "1px",
                  paddingTop: "5px",
                  paddingBottom: 16,
                  fontSize: "16px",
                  borderColor: "#D1D5DB",
                  borderStyle: "light",
                  borderRadius: "0.375rem",
                  boxShadow: "none",
                  outline: "none",
                  fontFamily: "DM Sans, sans-serif",
                }),
                multiValue: (provided) => ({
                  ...provided,
                  // backgroundColor: "#E7F5FF", // light blue
                  // color: "#1C7ED6",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontFamily: "DM Sans, sans-serif",
                }),
                multiValueLabel: (provided) => ({
                  ...provided,
                  // color: "#1C7ED6",
                  fontFamily: "DM Sans, sans-serif"
                }),
                multiValueRemove: (provided) => ({
                  ...provided,
                  // color: "#1C7ED6",
                  ":hover": { backgroundColor: "transparent", color: "red" },
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "#868E96",
                  fontFamily: "DM Sans, sans-serif",
                  marginTop: "0.7rem",
                }),
                menu: (provided) => ({
                  ...provided,
                  borderRadius: 8,
                  zIndex: 9999,
                  fontFamily: "DM Sans, sans-serif",
                }),
              }}
            />
          </div>

        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button variant="outline-primary" onClick={() => navigate(-1)} style={{ width: 150 }}>
          Cancel
        </Button>

        <Button variant="filled-primary" onClick={handleSave} loading={loading} style={{ width: 150 }}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddVariableForm;
