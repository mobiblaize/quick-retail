import { Text } from "@mantine/core";
import { useState } from "react";
import Description from "./description";
import Delivery from "./Delivery";
import Review from "./review";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("Description");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "Description":
        return <Description />;
      case "Delivery":
        return <Delivery />;
      case "Review":
        return <Review />;
      default:
        return <Description />;
    }
  };

  return (
    <main className="bg-white rounded-xl h-auto p-6">
      <Text c="black" size="lg" tt="uppercase" fw={"600"}>
        about product
      </Text>
      <hr className="text-gray-200 mt-3" />
      <section className="mt-6 flex flex-col gap-3">
        <div className="bg-[#F56630] rounded-full w-fit px-2.5 py-1">
          <Text c="white" fw="500">
            Product Code: AB 123455 DE
          </Text>
        </div>
        <Text size="1.8rem" c="black" fw={600}>
          Sleek Sneakers ''24
        </Text>
      </section>
      <div className="flex mt-5 gap-10">
        <div className="flex">
          <Text c="#667185" fw="500" size="xl">
            SKU: <span className="text-black">1234567</span>
          </Text>
        </div>

        <div className="flex">
          <Text c="#667185" fw="500" size="xl">
            Barcode: <span className="text-black">1234567</span>
          </Text>
        </div>

        <div className="flex">
          <Text c="#667185" fw="500" size="xl">
            Category: <span className="text-black">Shoes</span>
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

      <div className="mt-4 py-4">{renderActiveComponent()}</div>
    </main>
  );
};

export default ProductDetails;
