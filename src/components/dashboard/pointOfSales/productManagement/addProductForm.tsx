import { UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormInput from "../../../General/formInput";
// import FormSelect from "../../../General/select";
import useStore, { initialFormState } from "./addProductStore";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import Dropdown from "../../../General/dropdown";
import {
  useFetchAllLocations,
  useCreateProduct,
} from "../../../../hooks/backendApis/pos/products";
import { Button, Divider, Text, Textarea, Title, Box } from "@mantine/core";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import Select, { MultiValue } from "react-select";


const AddProductForm = () => {
  const navigate = useNavigate();
  const { updateForm } = useStore();
  const [loading, setLoading] = useState(false);
  const { mutate } = useCreateProduct();

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    ""
  );
  const [priceError, setPriceError] = useState<string | null>(null);
  const [quantityError, setQuantityError] = useState<string | null>(null);


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
  const categoryOptions = categories.map(
    (cat: { name: string; id: number }) => ({
      label: cat.name,
      value: cat.id,
    })
  );
  const subCategoryOptions = subCategories.map(
    (cat: { name: string; id: number }) => ({
      label: cat.name,
      value: cat.id,
    })
  );

  // const [formData, setFormData] = useState({ ...initialFormState });
  const [formData, setFormData] = useState({
    ...initialFormState,
    tags: [] as string[], // make sure tags is an array
  });

  useEffect(() => {
    updateForm(formData);
  }, [formData]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<File[]>([]);

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleFileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);

    Promise.all(files.map(fileToBase64))
      .then((base64Images) => {
        setFormData((prev) => ({
          ...prev,
          image_path: [...prev.image_path, ...base64Images],
        }));
      })
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject("Failed to convert file to base64");
      };
      reader.onerror = reject;
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleSave = () => {
    if (
      !formData.product_name ||
      !formData.sku ||
      !formData.category_id ||
      !formData.sub_category_id
    ) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const costPrice = Number(formData.cost_price);
    const sellingPrice = Number(formData.selling_price);

    if (sellingPrice <= costPrice) {
      notifications.show({
        title: "Invalid Pricing",
        message: "Selling price must be greater than cost price",
        color: "red",
      });
      return;
    }

    // ✅ New image check
    if (
      !formData.has_variations &&
      (!formData.image_path || formData.image_path.length === 0)
    ) {
      notifications.show({
        title: "Validation Error",
        message: "At least one product image is required",
        color: "red",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }


    const payload = {
      product_name: formData.product_name,
      sku: formData.sku,
      category_id: Number(formData.category_id),
      sub_category_id: Number(formData.sub_category_id),
      short_description: formData.short_description,
      long_description: formData.long_description,
      location_id: Number(formData.location_id),
      has_variations: formData.has_variations ? 1 : 0,
      image_path: formData.image_path || [],
      cost_price: costPrice,
      selling_price: sellingPrice,
      total_quantity: Number(formData.quantity),
      reorder_level: Number(formData.reorder_level),
      // tags: formData.tags,
      tags: formData.tags.join(","),
      promotional_price: Number(formData.promotional_price),
      promotional_start_date: formData.promotional_start_date || null,
      promotional_end_date: formData.promotional_end_date || null,
      safety_instructions: formData.safety_instructions || "",
      certificates: formData.certificates || [],
      // image_path: formData.image_path || [],
      variations: [],
      notes: formData.notes || "",
    };

    setLoading(true);
    const quantity = Number(formData.quantity);
    const reorder = Number(formData.reorder_level);

    if (priceError) {
      notifications.show({
        title: "Invalid Pricing",
        message: priceError,
        color: "red",
      });
      return;
    }

    if (quantityError || reorder > quantity) {
      notifications.show({
        title: "Validation Error",
        message: "Product quantity should be higher than order level",
        color: "red",
      });
      return;
    }

    if (
      !formData.product_name ||
      !formData.sku ||
      !formData.category_id ||
      !formData.sub_category_id
    ) {
      notifications.show({
        title: "Validation Error",
        message: "Please fill all required fields",
        color: "red",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return; // stop submission
    }

    // ✅ Now safe to call mutate
    setLoading(true);
    mutate(payload, {
      onSuccess: () => {
        setLoading(false);
        notifications.show({
          title: "Success",
          message: "Product added successfully",
          color: "green",
        });
        setFormData({ ...initialFormState });
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

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          BASIC INFORMATION
        </Title>
        <Divider mb="md" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Product Name
            </Text>
            <FormInput
              type="text"
              placeholder="Enter product name"
              paddingY={"0.7rem"}
              value={formData.product_name}
              onChange={(val: string) =>
                setFormData({ ...formData, product_name: val })
              }
            />
          </div>

          {/* SKU */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              SKU (Store Keeping Unit)
            </Text>
            <FormInput
              type="text"
              placeholder="Enter SKU"
              paddingY={"0.7rem"}
              value={formData.sku}
              onChange={(val: string) =>
                setFormData({ ...formData, sku: val })
              }
            />
          </div>

          {/* Category */}
          <Box>
            <Text size="sm" fw={600} mb="md">
              Category
            </Text>
            <Dropdown
              options={categoryOptions} // [{ label: string, value: string | number }]
              value={selectedCategoryId} // can be number directly
              paddingY={"0.7rem"}
              onChange={(val) => {
                setSelectedCategoryId(val);
                setFormData({ ...formData, category_id: String(val) });
              }}
              placeholder="Select product category"
              required
            />
          </Box>


          {/* Sub-category */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Sub-category
            </Text>
            <Dropdown
              options={subCategoryOptions}
              value={formData.sub_category_id}
              paddingY={"0.7rem"}
              onChange={(val) =>
                setFormData({ ...formData, sub_category_id: String(val) })
              }
              placeholder="Select sub-category"
              required
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Cost Price
            </Text>
            <FormInput
              type="number"
              placeholder="₦"
              paddingY={"0.7rem"}
              value={formData.cost_price} // keep as string
              onChange={(val: string) => {
                setFormData({ ...formData, cost_price: val });

                if (formData.selling_price && Number(val) > Number(formData.selling_price)) {
                  setPriceError("Selling price must be greater than cost price");
                } else {
                  setPriceError(null);
                }
              }}
            />

          </div>


          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Selling Price
            </Text>
            <FormInput
              type="number"
              placeholder="₦"
              paddingY={"0.7rem"}
              value={formData.selling_price} // keep as string
              onChange={(val: string) => {
                setFormData({ ...formData, selling_price: val });
                // setFormData({ ...formData, selling_price: selling });

                if (
                  formData.cost_price &&
                  Number(formData.cost_price) > Number(val)
                ) {
                  setPriceError("Selling price must be greater than cost price");
                } else {
                  setPriceError(null);
                }
              }}
            />

            {priceError && (
              <Text size="sm" c="red" mt={5} fw="600">
                {priceError}
              </Text>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          INVENTORY DETAILS
        </Title>
        <Divider mb="md" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Quantity
            </Text>
            <FormInput
              type="number"
              placeholder="Enter Quantity"
              paddingY={"0.7rem"}
              value={formData.quantity}
              onChange={(val: string) => {
                const quantity = Number(val);
                setFormData({ ...formData, quantity: val });

                if (formData.reorder_level && quantity < Number(formData.reorder_level)) {
                  setQuantityError("Product quantity should be higher than order level");
                } else {
                  setQuantityError(null);
                }
              }}
            />
            {/* {quantityError && (
              <Text size="sm" c="red" mt={5} fw="600">
                {quantityError}
              </Text>
            )} */}
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Re-order Level
            </Text>
            <FormInput
              type="number"
              placeholder="Enter Re-order Level"
              paddingY={"0.7rem"}
              value={formData.reorder_level}
              onChange={(val: string) => {
                const reorder = Number(val);
                setFormData({ ...formData, reorder_level: val });

                if (formData.quantity && reorder > Number(formData.quantity)) {
                  setQuantityError("Product quantity should be higher than order level");
                } else {
                  setQuantityError(null);
                }
              }}
            />
            {quantityError && (
              <Text size="sm" c="red" mt={5} fw="600">
                {quantityError}
              </Text>
            )}
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Location
            </Text>
            <Dropdown
              options={locationOptions}
              value={formData.location_id}
              paddingY={"0.7rem"}
              onChange={
                // @ts-ignore
                (val) => setFormData({ ...formData, location_id: val })
              }
              required
              // textColorClass="text-gray-800"
              placeholder="Select location"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <Title order={3} mb="sm" style={{ color: '#1F2937', fontWeight: 600 }}>
          ADDITIONAL INFORMATION
        </Title>
        <Divider mb="md" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Short Description
            </Text>
            <FormInput
              type="text"
              placeholder="Enter short product description"
              paddingY={"0.7rem"}
              value={formData.short_description}
              onChange={(val: string) =>
                setFormData({ ...formData, short_description: val })
              }
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
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
              autosize={false}
              minRows={3}
              styles={{
                input: {
                  display: "flex",
                  alignItems: "center", // vertical center
                },
              }}
            />
          </div>

          <div>
            <Text size="sm" fw={600} mb={8} mt={6}>
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

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Notes
            </Text>
            <FormInput
              type="text"
              placeholder="Enter random notes on product, supplier or inventory"
              paddingY={"0.7rem"}
              optional
              value={formData.notes}
              onChange={(val: string) =>
                setFormData({ ...formData, notes: val })
              }
            />
          </div>
        </div>

        {/* Product Images Upload Section */}
        <div className="mt-6">
          <Text size="lg" fw={500} c="gray.8" mb="sm">
            Product Images
          </Text>

          <div className="flex md:flex-row flex-col md:items-center gap-6">
            {/* Previews with Remove Option */}
            {images.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {images.map((file, index) => (
                  <div key={index} className="relative w-50 h-50 group">
                    <img
                      src={URL.createObjectURL(file) || "/placeholder.svg"}
                      alt={`preview-${index}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 border-2 border-white cursor-pointer"
                      aria-label="Remove image"
                    >
                      <X size={16} strokeWidth={4.5} />
                    </button>
                  </div>
                ))}
              </div>
            )}


            {/* Upload Box */}
            <div
              className="w-50 h-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-500 transition"
              onClick={handleUploadClick}
              role="button"
              aria-label="Upload images"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleUploadClick();
              }}
            >
              <UploadCloud className="text-gray-400" size={32} />

              <Text c="orange.5" size="sm" fw={600} mt="sm">
                Click to upload
              </Text>
              <Text c="gray.5" size="xs">
                or drag and drop
              </Text>
              <Text c="gray.4" size="xs" mt="xs">
                PNG, JPEG (max 5 MB)
              </Text>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImageChange}
                accept="image/png, image/jpeg"
                multiple
                className="hidden"
              />
            </div>

            {/* Add More Button */}
            {/* <button
              type="button"
              className="text-orange-500 flex items-center gap-2 font-medium text-sm"
              onClick={handleUploadClick}
            >
              + Add more photos
            </button> */}
          </div>
        </div>
      </div>

      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          style={{ width: 150 }}
        >
          Cancel
        </Button>

        <Button
          variant="filled-primary"
          loading={loading}
          onClick={handleSave}
          style={{ width: 150 }}
          disabled={!!priceError}
        >
          Submit
        </Button>
      </div>

    </div>
  );
};

export default AddProductForm;
