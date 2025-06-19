import { Plus, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import FormInput from "../../../General/formInput";
import FormSelect from "../../../General/select";
import useStore from "./addProductStore";
import {
  useFetchAllCategories,
  useFetchSubCatOfCat,
} from "../../../../hooks/backendApis/pos/categories";
import { useFetchAllLocations } from "../../../../hooks/backendApis/pos/products";
import { Button, Input } from "@mantine/core";
import Dropdown from "../../../General/dropdown";
import { useNavigate } from "react-router";
import { notifications } from "@mantine/notifications";
import { useCreateProduct } from "../../../../hooks/backendApis/pos/products";

interface Variant {
  id: number;
  image?: string;
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

    const invalidVariation = variants.find((v) => {
      const sellingPrice = Number(v.selling_price);
      const costPrice = Number(v.cost_price);
      return sellingPrice <= costPrice;
    });

    if (invalidVariation) {
      notifications.show({
        title: "Validation error",
        message:
          "Selling price must be greater than cost price in all variations.",
        color: "red",
      });
      return;
    }

    const payload = {
      product_name: form_data.product_name,
      sku: form_data.sku,
      category_id: Number(form_data.category_id),
      sub_category_id: Number(form_data.sub_category_id),
      short_description: form_data.short_description,
      long_description: form_data.long_description,
      location_id: Number(form_data.location_id),
      has_variations: true,
      tags: form_data.tags,
      promotional_price: Number(form_data.promotional_price),
      promotional_start_date: form_data.promotional_start_date,
      promotional_end_date: form_data.promotional_end_date,
      safety_instructions: form_data.safety_instructions,
      certificates: form_data.certificates,
      image_path: form_data.image_path || [],
      variations: variants.map((v) => ({
        cost_price: Number(v.cost_price),
        selling_price: Number(v.selling_price),
        quantity: Number(v.quantity),
        reorder_level: Number(v.reorder_level),
        size: v.size,
        colour: v.color,
        image: v.image, // already base64
      })),
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
        resetForm();
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleVariantChange = (
    id: number,
    field: keyof Variant,
    value: string
  ) => {
    setVariants((prev) =>
      prev.map((variant) =>
        variant.id === id ? { ...variant, [field]: value } : variant
      )
    );
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200">
          BASIC INFORMATION
        </h2>
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

          <FormSelect
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
          />

          <FormSelect
            label="Sub-category"
            placeholder="Select sub-category"
            options={subCategoryOptions}
            name="sub-category"
            paddingY="4"
            value={form_data.sub_category_id}
            onChange={(e: any) =>
              updateForm({ ...form_data, sub_category_id: e.target.value })
            }
          />
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md mt-[3em]">
        <h2 className="text-lg font-semibold mb-4">Inventory Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormInput
            type="text"
            label="Total Stock Quantity"
            placeholder="Enter stock quantity"
            paddingY={"0.3rem"}
            value={form_data.quantity}
            onChange={(e: any) =>
              updateForm({ ...form_data, quantity: e.target.value })
            }
          />

          <Dropdown
            label="Location"
            options={locationOptions}
            value={form_data.location_id}
            onChange={
              // @ts-ignore
              (val) => updateForm({ ...form_data, location_id: val })
            }
            required
            textColorClass="text-gray-800"
            placeholder="Select location"
          />
        </div>

        <div className="overflow-auto">
          <div className="min-w-[1000px]">
            <div className="grid grid-cols-8 gap-4 px-4 py-2 bg-gray-100 rounded-t-md text-sm font-medium">
              <div>Size</div>
              <div>Color</div>
              <div>Quantity</div>
              <div>Cost Price</div>
              <div>Selling Price</div>
              <div>Reorder Level</div>
              <div>Image</div>
            </div>

            {variants.map((variant) => (
              <div
                key={variant.id}
                className="grid grid-cols-8 gap-4 px-4 py-3 border-b border-gray-200 text-sm"
              >
                {/* Size */}
                <div className="flex flex-col">
                  <Input
                    placeholder="Enter size"
                    value={variant.size || ""}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "size", e.target.value)
                    }
                  />
                </div>

                {/* Color */}
                <div className="flex flex-col">
                  <Input
                    placeholder="Enter color"
                    value={variant.color || ""}
                    onChange={(e) =>
                      handleVariantChange(variant.id, "color", e.target.value)
                    }
                  />
                </div>

                {/* Quantity */}
                <div className="flex flex-col">
                  <Input
                    placeholder="Enter quantity"
                    value={variant.quantity || ""}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "quantity",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Cost Price */}
                <div className="flex flex-col">
                  <Input
                    placeholder="₦"
                    value={variant.cost_price}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "cost_price",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Selling Price */}
                <div className="flex flex-col">
                  <Input
                    placeholder="₦"
                    value={variant.selling_price}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "selling_price",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Reorder Level */}
                <div className="flex flex-col">
                  <Input
                    placeholder="Enter level"
                    value={variant.reorder_level}
                    onChange={(e) =>
                      handleVariantChange(
                        variant.id,
                        "reorder_level",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* Image Upload */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2  border border-[#CED4DA] px-3 py-[0.60em] rounded">
                    <label
                      htmlFor={`image-${variant.id}`}
                      className="text-xs text-[#999] cursor-pointer  max-w-[140px] truncate"
                      title={variant.image || ""}
                    >
                      {variant.image
                        ? variant.image.length > 12
                          ? `${variant.image.slice(0, 12)}...`
                          : variant.image
                        : "Click to upload"}
                    </label>

                    {variant.image ? (
                      <button
                        type="button"
                        onClick={() =>
                          setVariants((prev) =>
                            prev.map((v) =>
                              v.id === variant.id ? { ...v, image: "" } : v
                            )
                          )
                        }
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    ) : (
                      <Upload className="w-4 h-4 text-orange-500" />
                    )}

                    <Input
                      type="file"
                      accept="image/*"
                      id={`image-${variant.id}`}
                      className="hidden"
                      onChange={(e) =>
                        handleImageChange(
                          variant.id,
                          e.target.files?.[0] || null
                        )
                      }
                    />
                  </div>
                </div>

                {/* Delete Row */}
                <div className="flex items-end justify-center">
                  <button
                    onClick={() =>
                      setVariants((prev) =>
                        prev.filter((v) => v.id !== variant.id)
                      )
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="flex items-center px-4 py-2 text-[#F16722] text-sm font-medium rounded transition"
              onClick={handleAddVariant}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Variation
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-[3em]">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          ADDITIONAL INFORMATION
        </h2>

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

          <FormInput
            type="text"
            label="Long Description"
            paddingY={"0.7rem"}
            placeholder="Enter detailed product description"
            optional
            value={form_data.long_description}
            onChange={(e: any) =>
              updateForm({ ...form_data, long_description: e.target.value })
            }
          />

          <FormInput
            type="text"
            label="Tags"
            paddingY={"0.7rem"}
            placeholder="Enter tags"
            value={form_data.tags}
            onChange={(e: any) =>
              updateForm({ ...form_data, tags: e.target.value })
            }
          />

          {/* <FormInput
            type="text"
            label="Note"
            paddingY={"0.7rem"}
            placeholder="Enter note"
            value={form_data.tags}
            onChange={(e: any) =>
              updateForm({ ...form_data, tags: e.target.value })
            }
          /> */}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div
        key="search-product-buttons"
        className="flex gap-4 justify-end mt-[4em] bg-[#fff] p-4"
      >
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button variant="filled-primary" onClick={handleSave} loading={loading}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddVariableForm;
