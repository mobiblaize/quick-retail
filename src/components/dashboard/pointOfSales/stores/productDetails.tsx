import { Text } from "@mantine/core";
import { useState } from "react";
import Description from "./description";

interface ProductDetailsProps {
  productData: any; // You can type this based on your data shape
}

const ProductDetails = ({ productData }: ProductDetailsProps) => {
  const [activeTab, setActiveTab] = useState("Description");

  const handleTabChange = (tab: string) => setActiveTab(tab);

  return (
    <main className="bg-white rounded-xl h-auto p-6">
      <Text c="black" size="lg" tt="uppercase" fw={600}>
        about product
      </Text>
      <hr className="text-gray-200 mt-3" />

      <section className="mt-6 flex flex-col gap-3">
        <div className="bg-[#F56630] rounded-full w-fit px-2.5 py-1">
          <Text c="white" fw={500}>
            Product Code: {productData?.code || "N/A"}
          </Text>
        </div>

        <Text size="1.8rem" c="black" fw={600}>
          {productData?.name ||
            productData?.product?.product_name ||
            "Unnamed Product"}
        </Text>
      </section>

      <div className="flex mt-5 gap-10">
        <div>
          <Text c="#667185" fw={500} size="xl">
            SKU:{" "}
            <span className="text-black">
              {productData?.sku || productData?.product?.sku || "N/A"}
            </span>
          </Text>
        </div>

        <div>
          <Text c="#667185" fw={500} size="xl">
            Barcode:{" "}
            <span className="text-black">
              {productData?.ean || productData?.product?.ean || "N/A"}
            </span>
          </Text>
        </div>

        <div>
          <Text c="#667185" fw={500} size="xl">
            Category:{" "}
            <span className="text-black">
              {productData?.product?.category?.name || "N/A"}
            </span>
          </Text>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mt-8">
        <button
          className={`py-2 px-4 cursor-pointer font-medium ${
            activeTab === "Description"
              ? "text-[#1D2939] border-b-2 border-[#1D2939]"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("Description")}
        >
          Description
        </button>
        <button
          className={`py-2 px-4 cursor-pointer font-medium ${
            activeTab === "Delivery"
              ? "text-[#1D2939] border-b-2 border-[#1D2939]"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("Delivery")}
        >
          Delivery
        </button>
        <button
          className={`py-2 px-4 cursor-pointer font-medium ${
            activeTab === "Review"
              ? "text-[#1D2939] border-b-2 border-[#1D2939]"
              : "text-gray-500"
          }`}
          onClick={() => handleTabChange("Review")}
        >
          Review
        </button>
      </div>

      <div className="mt-4 py-4">
        {activeTab === "Description" && (
          //@ts-ignore
          <Description productData={productData} />
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
