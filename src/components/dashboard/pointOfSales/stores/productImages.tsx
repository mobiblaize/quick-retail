import { Text } from "@mantine/core";
import { useState } from "react";


interface ProductImagesProps {
  productData: any; // again, type this properly
}

const ProductImages = ({ productData }: ProductImagesProps) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  if (!productData) return <div>No images available</div>;

  const mainImage = productData.image_path || ""; // adjust key names as per your API
  const thumbnails = productData.variation_attributes?.map((v: any) => v.image_url) || [mainImage];

  return (
    <main className="bg-white h-fit rounded-xl h-auto p-6">
      <Text c="black" size="lg" tt="uppercase" fw={"600"}>
        product images
      </Text>
      <hr className="text-gray-200 mt-2" />
      <section className="flex flex-col justify-center items-center mt-8">
        <img src={thumbnails[selectedThumbnail] || mainImage} alt="product" className="max-w-full" />
      </section>
      <section className="flex justify-center mt-5 gap-2.5">
        {thumbnails.map((thumbnail: string, index: number) => (
          <div
            key={index}
            className={`cursor-pointer ${
              selectedThumbnail === index ? "border-2 border-orange-500 p-0.5" : "opacity-50 p-0.5"
            }`}
            onClick={() => setSelectedThumbnail(index)}
          >
            <img src={thumbnail} alt={`product thumbnail ${index + 1}`} className="w-20 h-20 object-cover" />
          </div>
        ))}
      </section>
    </main>
  );
};


export default ProductImages;
