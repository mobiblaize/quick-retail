import { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { Plus } from "lucide-react";
import useStore from "./addProductStore";
import { useFetchAllLocations } from "../../../../hooks/backendApis/pos/products";
import Dropdown from "../../../General/dropdown";

interface Variant {
  id: number;
  image: string;
  name: string;
  quantity: string;
  cost_price: string;
  selling_price: string;
  reorder_level: string;
  size?: string;
  color?: string;
  location_id?: string;
}

const initialVariants: Variant[] = [
  {
    id: 1,
    image: "/product.jpg",
    name: "",
    quantity: "",
    cost_price: "30000",
    selling_price: "30000",
    reorder_level: "",
  },
];

export default function InventoryForm() {
  const { data } = useFetchAllLocations();

  const locations = Array.isArray(data?.data?.stores) ? data.data.stores : [];

  const locationOptions = locations.map(
    (loc: { name: string; id: string }) => ({
      label: loc?.name,
      value: loc?.id,
    })
  );

  const initialFormState = {
    id: "",
    cost_price: "",
    selling_price: "",
    quantity: "",
    reorder_level: "",
    size: "",
    color: "",
    location_id: "",
  };
  const [variants, setVariants] = useState<Variant[]>(initialVariants);
  const [formData, setFormData] = useState(initialFormState);
  const { form_data, updateForm } = useStore();

  useEffect(() => {
    updateForm({
      ...form_data,
      location_id: formData.location_id,
      quantity: formData.quantity,
      variations: variants,
    });
  }, [formData, variants]);

  const handleAddVariant = () => {
    const newId = variants.length + 1;
    const newVariant: Variant = {
      id: newId,
      image: "/product.jpg",
      name: `New Variant ${newId}`,
      quantity: "",
      cost_price: "0",
      selling_price: "0",
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
    <div className="p-4 bg-white rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Inventory Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <FormInput
          type="text"
          label="Total Stock Quantity"
          placeholder="Enter stock quantity"
          paddingY={"0.3rem"}
          value={formData.quantity}
          onChange={(e: any) =>
            setFormData({ ...formData, quantity: e.target.value })
          }
        />

        <Dropdown
          label="Location"
          options={locationOptions}
          value={formData.location_id}
          onChange={
            // @ts-ignore
            (val) => setFormData({ ...formData, location_id: val }) // assuming val is number
          }
          required
          textColorClass="text-gray-800"
          placeholder="Select location"
        />
      </div>

      <div className="overflow-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-8 gap-4 px-4 py-2 bg-gray-100 rounded-t-md text-sm font-medium">
            {/* <div className="col-span-2">Product Variant</div> */}
            <div>Quantity</div>
            <div>Cost Price</div>
            <div>Selling Price</div>
            <div>Reorder Level</div>
            <div>Size</div>
            <div>Color</div>
          </div>

          {variants.map((variant) => (
            <div
              key={variant.id}
              className="grid grid-cols-8 gap-4 items-center px-4 py-3 border-b border-gray-200"
            >
              <Input
                placeholder="Quantity"
                value={variant.quantity || ""}
                onChange={(e) =>
                  handleVariantChange(variant.id, "quantity", e.target.value)
                }
              />
              <Input
                placeholder="Enter cost price"
                value={variant.cost_price}
                onChange={(e: any) =>
                  handleVariantChange(variant.id, "cost_price", e.target.value)
                }
              />
              <Input
                placeholder="Enter selling price"
                value={variant.selling_price}
                onChange={(e: any) =>
                  handleVariantChange(
                    variant.id,
                    "selling_price",
                    e.target.value
                  )
                }
              />
              <Input
                type="number"
                placeholder="Reorder Level"
                value={variant.reorder_level}
                onChange={(e: any) =>
                  handleVariantChange(
                    variant.id,
                    "reorder_level",
                    e.target.value
                  )
                }
              />
              <Input
                placeholder="Size"
                value={variant.size || ""}
                onChange={(e: any) =>
                  handleVariantChange(variant.id, "size", e.target.value)
                }
              />
              <Input
                placeholder="Color"
                value={variant.color || ""}
                onChange={(e: any) =>
                  handleVariantChange(variant.id, "color", e.target.value)
                }
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="flex items-center px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 text-sm font-medium rounded transition"
            onClick={handleAddVariant}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Variation
          </button>
        </div>
      </div>
    </div>
  );
}
