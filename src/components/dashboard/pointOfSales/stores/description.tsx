import { Text } from "@mantine/core";

const Description = ({ productData }: { productData: any }) => {
  const product = productData?.product || {};

  return (
    <main>
      <Text c="black" fw="500">
        Overview
      </Text>
      <Text>
        {product?.long_description || "No description provided."}
      </Text>

      <section className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-3">
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Location:{" "}
            <span className="text-black ml-1">
              {product?.location?.name || "N/A"}
            </span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Brand: <span className="text-black ml-1">Africana</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Weight: <span className="text-black ml-1">6kg</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Sub-category:{" "}
            <span className="text-black ml-1">
              {product?.sub_category?.name || "N/A"}
            </span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Sizes: <span className="text-black ml-1">N/A</span>
          </Text>
        </div>
        <div className="bg-[#F7F9FC] p-2 rounded-full whitespace-nowrap">
          <Text fw={600}>
            Color: <span className="text-black ml-1">N/A</span>
          </Text>
        </div>
      </section>
    </main>
  );
};

export default Description;
