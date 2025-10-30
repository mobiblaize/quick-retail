import { useState } from "react";
import { Text } from "@mantine/core";
import { ChevronDown, ChevronUp } from "lucide-react";
import FormInput from "../../../General/formInput";

type VariationAttribute = {
  id: number;
  option_type: string;
  option_value: string;
};

type OverviewProps = {
  name: string;
  code: string;
  sku: string;
  ean: string;
  category?: string;
  product: {
    category: string;
    has_variations: number;
    product_name: string;
    long_description: string;
    short_description: string;
  };
  cost_price: number;
  selling_price: number;
  discount_percentage?: number;
  promotional_price?: number;
  promotional_start_date?: string;
  long_description?: string;
  tags?: string;
  safety_instruction?: string;
  notes?: string;
  safety_instructions?: string;
  reorder_level?: number;
  quantity: number;
  variation_attributes?: VariationAttribute[];
  image_path?: string;
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Text c="black" size="lg" tt="uppercase" fw={"600"}>
          {title}
        </Text>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
      {open && <div className="mt-4 space-y-4">{children}</div>}
    </div>
  );
};

export default function ProductForm({ overview }: { overview: OverviewProps }) {
  console.log("Overview received in ProductForm ===>", overview);

  return (
    <div className="w-full mx-auto p-4">
      <div className="bg-white p-4 rounded-lg shadow mb-[1em]">
        <Text c="black" size="lg" tt="uppercase" fw={"600"}>
          about product
        </Text>
        <hr className="text-gray-200 mt-3" />
        <section className="mt-6 flex flex-col gap-3">
          <div className="bg-[#F56630] rounded-full w-fit px-2.5 py-1">
            <Text c="white" fw="500">
              Product Code: {overview?.code || "N/A"}
            </Text>
          </div>
          <Text size="1.8rem" c="black" fw={600}>
            {overview?.product?.product_name || "N/A"}
          </Text>
        </section>
        <div className="flex mt-5 gap-10">
          <div className="flex">
            <Text c="#667185" fw="500" size="xl">
              SKU: <span className="text-black">{overview?.sku || "N/A"}</span>
            </Text>
          </div>

          <div className="flex">
            <Text c="#667185" fw="500" size="xl">
              Category:{" "}
              <span className="text-black">
                {overview?.category || overview?.product?.category || "N/A"}
              </span>
            </Text>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <Section title="PRICING INFORMATION">
        <FormInput
          type="number"
          label="Cost Price"
          labelProps={{ fw: 600, c: "#667185" }}
          paddingY={"0.7rem"}
          placeholder="₦"
          value={overview?.cost_price ?? ""}
        />
        <FormInput
          type="number"
          label="Selling Price"
          labelProps={{ fw: 600, c: "#667185" }}
          paddingY={"0.7rem"}
          placeholder="₦"
          value={overview?.selling_price ?? ""}
        />
        {/* <FormInput
          type="text"
          label="Discount (optional)"
          paddingY={"0.7rem"}
          placeholder="₦"
          value={overview?.discount_percentage ?? ""}
        /> */}
      </Section>

      {/* ✅ Updated Product Variation Display */}
      {Array.isArray(overview?.variation_attributes) &&
        overview.variation_attributes.length > 0 && (
          <Section title="PRODUCT VARIATIONS">
            <div className="flex gap-6 mt-3 flex-wrap">
              {overview.variation_attributes.map((attr) => (
                <div key={attr.id} className="flex items-center gap-2">
                  <Text c="#667185" fw={500} size="lg">
                    {attr.option_type
                      ? attr.option_type.charAt(0).toUpperCase() +
                        attr.option_type.slice(1)
                      : "N/A"}
                    :
                  </Text>
                  <Text c="black" fw={600} size="lg" className="capitalize">
                    {attr.option_value || "N/A"}
                  </Text>
                </div>
              ))}
            </div>
          </Section>
        )}

      {/* Additional Information */}
      <Section title="ADDITIONAL INFORMATION">
        {/* <FormInput
          type="text"
          label="Long Description"
          paddingY={"0.7rem"}
          placeholder="Enter description"
          value={overview?.product?.long_description ?? ""}
        /> */}
        <FormInput
          type="text"
          labelProps={{ fw: 600, c: "#667185" }}
          label="Short Description"
          paddingY={"0.7rem"}
          placeholder="Enter description"
          value={overview?.product?.short_description ?? ""}
        />
        {/* <FormInput
          type="text"
          label="Tags"
          paddingY={"0.7rem"}
          placeholder="e.g. New Arrival"
          value={overview?.tags ?? ""}
        /> */}
      </Section>

      {/* Inventory */}
      <Section title="INVENTORY">
        <FormInput
          type="number"
          label="Stock Quantity"
          labelProps={{ fw: 600, c: "#667185" }}
          paddingY={"0.7rem"}
          placeholder="N"
          value={overview?.quantity ?? ""}
        />
        <FormInput
          type="number"
          label="Reorder Level"
          labelProps={{ fw: 600, c: "#667185" }}
          paddingY={"0.7rem"}
          placeholder="N"
          value={overview?.reorder_level ?? ""}
        />
      </Section>
    </div>
  );
}
