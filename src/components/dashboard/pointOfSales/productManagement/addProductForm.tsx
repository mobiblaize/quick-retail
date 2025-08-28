import { UploadCloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
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
import { Button, Divider, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";

const AddProductForm = () => {
  const navigate = useNavigate();
  const { updateForm } = useStore();
  const [loading, setLoading] = useState(false);
  const { mutate } = useCreateProduct();

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

  const [formData, setFormData] = useState({ ...initialFormState });

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
      tags: formData.tags,
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

    mutate(payload, {
      onSuccess: () => {
        setLoading(false);
        notifications.show({
          title: "Success",
          message: "Product added successfully",
          color: "green",
        });
        setFormData({ ...initialFormState }); // reset form
        window.scrollTo({ top: 0, behavior: "smooth" });

        // ✅ Navigate back after success
        navigate(-1);
      },
      onError: (error: any) => {
        setLoading(false);
        notifications.show({
          title: "Error",
          message: error?.response?.data?.message || "Failed to add product",
          color: "red",
        });
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
              onChange={(e: any) =>
                setFormData({ ...formData, product_name: e.target.value })
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
              onChange={(e: any) =>
                setFormData({ ...formData, sku: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Category
            </Text>
            <FormSelect
              placeholder="Select product category"
              options={categoryOptions}
              name="category"
              paddingY="4"
              value={selectedCategoryId}
              onChange={(e: any) => {
                setSelectedCategoryId(Number(e.target.value));
                setFormData({ ...formData, category_id: e.target.value });
              }}
            />
          </div>

          {/* Sub-category */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Sub-category
            </Text>
            <FormSelect
              placeholder="Select sub-category"
              options={subCategoryOptions}
              name="sub-category"
              paddingY="4"
              value={formData.sub_category_id}
              onChange={(e: any) =>
                setFormData({ ...formData, sub_category_id: e.target.value })
              }
            />
          </div>

          {/* Cost Price */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Cost Price
            </Text>
            <FormInput
              type="number"
              placeholder="₦"
              value={formData.cost_price}
              onChange={(e: any) =>
                setFormData({ ...formData, cost_price: e.target.value })
              }
            />
          </div>

          {/* Selling Price */}
          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Selling Price
            </Text>
            <FormInput
              type="number"
              placeholder="₦"
              value={formData.selling_price}
              onChange={(e: any) =>
                setFormData({ ...formData, selling_price: e.target.value })
              }
            />
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
              onChange={(e: any) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Re-order Level
            </Text>
            <FormInput
              type="number"
              placeholder="Enter Quantity"
              paddingY={"0.7rem"}
              value={formData.reorder_level}
              onChange={(e: any) =>
                setFormData({ ...formData, reorder_level: e.target.value })
              }
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Location
            </Text>
            <Dropdown
              options={locationOptions}
              value={formData.location_id}
              onChange={
                // @ts-ignore
                (val) => setFormData({ ...formData, location_id: val })
              }
              required
              textColorClass="text-gray-800"
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
              onChange={(e: any) =>
                setFormData({ ...formData, short_description: e.target.value })
              }
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Long Description
            </Text>
            <FormInput
              type="text"
              placeholder="Enter detailed product description"
              paddingY={"0.7rem"}
              optional
              value={formData.long_description}
              onChange={(e: any) =>
                setFormData({ ...formData, long_description: e.target.value })
              }
            />
          </div>

          <div>
            <Text size="sm" style={{ fontWeight: 600, marginBottom: 16 }}>
              Tags
            </Text>
            <FormInput
              type="text"
              placeholder="Enter tags"
              paddingY={"0.7rem"}
              value={formData.tags}
              onChange={(e: any) =>
                setFormData({ ...formData, tags: e.target.value })
              }
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
              onChange={(e: any) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </div>
        </div>

        {/* Product Images Upload Section */}
        <div className="mt-6">
          <h3 className="text-gray-800 font-medium mb-2">Product Images</h3>

          <div className="flex md:flex-row flex-col md:items-center gap-6">
            {/* Upload Box */}
            <div
              className="w-48 h-48 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-md cursor-pointer hover:border-blue-500 transition"
              onClick={handleUploadClick}
              role="button"
              aria-label="Upload images"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") handleUploadClick();
              }}
            >
              <UploadCloud className="text-gray-400" size={32} />
              <p className="text-orange-500 text-sm font-medium mt-2">
                Click to upload
              </p>
              <p className="text-gray-500 text-xs">or drag and drop</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPEG (max 5 MB)</p>
            </div>

            {/* Add More Button */}
            <button
              type="button"
              className="text-orange-500 flex items-center gap-2 font-medium text-sm"
              onClick={handleUploadClick}
            >
              + Add more photos
            </button>

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

          {/* Previews with Remove Option */}
          {images.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((file, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition-opacity opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button variant="filled-primary" loading={loading} onClick={handleSave}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddProductForm;
