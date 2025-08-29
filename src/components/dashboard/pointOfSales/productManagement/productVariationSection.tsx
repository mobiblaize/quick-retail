import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useFetchProductVariations } from "../../../../hooks/backendApis/pos/products";
import { Input, Text } from "@mantine/core";

const ProductVariationSection = ({ form_data }: any) => {
  const productId = form_data?.product?.productID;
  const hasVariations = form_data?.product?.has_variations === 1;
  const [variants, setVariants] = useState<any[]>([]);

  const { data, isLoading, isError } = useFetchProductVariations(
    productId,
    !!productId && hasVariations
  );

  useEffect(() => {
    if (data?.data?.product_variations) {
      const transformed = data.data.product_variations.map((variant: any) => {
        const sizeAttr = variant.variation_attributes.find(
          (attr: any) => attr.option_type === "size"
        );
        const colorAttr = variant.variation_attributes.find(
          (attr: any) => attr.option_type === "colour"
        );

        return {
          id: variant.id,
          variationID: variant.variationID, 
          cost_price: variant.cost_price || "",
          selling_price: variant.selling_price || "",
          reorder_level: variant.reorder_level || "",
          size: sizeAttr?.option_value || "",
          color: colorAttr?.option_value || "",
        };
      });

      setVariants(transformed);
    }
  }, [data]);

  const handleDeleteVariant = (variantId: string | number) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        id: Date.now(), 
        variationID: "",        
        product_id: productId,
        cost_price: "",
        selling_price: "",
        reorder_level: "",
        size: "",
        color: "",

      },
    ]);
  };

  if (!form_data?.product) {
    return <p className="text-sm p-4">Loading product...</p>;
  }

  if (!productId) {
    return <p className="text-sm text-red-500 p-4">Invalid product data</p>;
  }

  if (!hasVariations) {
    return <p className="text-sm p-4">This product has no variations</p>;
  }

  if (isLoading) return <p className="text-sm p-4">Loading variations...</p>;
  if (isError) return <p className="text-sm text-red-500 p-4">Error loading variations</p>;

  return (
    <div className="overflow-auto">
      <div className="min-w-[1000px]">
        <div className="grid grid-cols-8 gap-4 px-4 py-2 bg-gray-100 rounded-t-md text-sm font-medium">
          <Text fw={500}>Cost Price</Text>
          <Text fw={500}>Selling Price</Text>
          <Text fw={500}>Reorder Level</Text>
          <Text fw={500}>Size</Text>
          <Text fw={500}>Color</Text>
          <Text fw={500} ta="right" pr="sm" className="col-span-3">Actions</Text>
        </div>

        {variants.map((variant) => (
          <div
            key={variant.id}
            className="grid grid-cols-8 gap-4 items-center px-4 py-3 border-b border-gray-200 relative group"
          >
            <Input
              placeholder="Enter cost price"
              value={variant.cost_price}
              onChange={(e: any) =>
                setVariants((prev) =>
                  prev.map((v) =>
                    v.id === variant.id ? { ...v, cost_price: e.target.value } : v
                  )
                )
              }
            />
            <Input
              placeholder="Enter selling price"
              value={variant.selling_price}
              onChange={(e: any) =>
                setVariants((prev) =>
                  prev.map((v) =>
                    v.id === variant.id ? { ...v, selling_price: e.target.value } : v
                  )
                )
              }
            />
            <Input
              type="number"
              placeholder="Reorder Level"
              value={variant.reorder_level}
              onChange={(e: any) =>
                setVariants((prev) =>
                  prev.map((v) =>
                    v.id === variant.id ? { ...v, reorder_level: e.target.value } : v
                  )
                )
              }
            />
            <Input
              placeholder="Size"
              value={variant.size}
              onChange={(e: any) =>
                setVariants((prev) =>
                  prev.map((v) => (v.id === variant.id ? { ...v, size: e.target.value } : v))
                )
              }
            />
            <Input
              placeholder="Color"
              value={variant.color}
              onChange={(e: any) =>
                setVariants((prev) =>
                  prev.map((v) => (v.id === variant.id ? { ...v, color: e.target.value } : v))
                )
              }
            />

            <div className="flex justify-end col-span-3 pr-2">
              <button
                type="button"
                onClick={() => handleDeleteVariant(variant.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete variant"
              >
                <Trash2 size={18} />
              </button>
            </div>
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
  );
};

export default ProductVariationSection;
