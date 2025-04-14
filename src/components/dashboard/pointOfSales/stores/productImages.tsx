import { Text } from "@mantine/core";
import { useState } from "react";
import productMain from "../../../../assets/images/productImage.png";
import subProuct from "../../../../assets/images/sub_productImage.png";

const ProductImages = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const thumbnails = [subProuct, subProuct, subProuct];

  return (
    <main className="bg-white h-fit rounded-xl h-auto p-6">
      <Text c="black" size="lg" tt="uppercase" fw={"600"}>
        product images
      </Text>
      <hr className="text-gray-200 mt-2" />
      <section className="flex flex-col justify-center items-center mt-8">
        <img src={productMain} alt="product" className="max-w-full" />
      </section>
      <section className="flex justify-center mt-5 gap-2.5">
        {thumbnails.map((thumbnail, index) => (
          <div
            key={index}
            className={`cursor-pointer ${
              selectedThumbnail === index
                ? "border-2 border-orange-500 p-0.5"
                : "opacity-50 p-0.5"
            }`}
            onClick={() => setSelectedThumbnail(index)}
          >
            <img
              src={thumbnail}
              alt={`product thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export default ProductImages;
