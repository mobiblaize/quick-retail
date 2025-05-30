import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import productMain from "../../../../assets/images/productImage.png";

type DetailsProps = {
  image_path?: string; // comma-separated thumbnail URLs
  image?: string;      // main image
};

const ProductImagesSection = ({ details }: { details: DetailsProps }) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    details.image
  );

  // Update selected image if details.image changes
  useEffect(() => {
    setSelectedImage(details.image);
  }, [details.image]);

  // Convert comma-separated string into array
  const thumbnails: string[] = details.image_path
    ? details.image_path.split(",").map((img) => img.trim())
    : [];

  return (
    <main className="bg-white rounded-xl h-auto p-6">
      <Text c="black" size="lg" tt="uppercase" fw={"600"}>
        product images
      </Text>
      <hr className="text-gray-200 mt-2" />

      {/* Main Image */}
      <section className="flex flex-col justify-center items-center mt-8">
        <img
          src={selectedImage || productMain}
          alt="product"
          className="max-w-full max-h-[400px] object-contain"
        />
      </section>

      {/* Thumbnails */}
      {thumbnails.length > 0 && (
        <section className="flex justify-center mt-5 gap-2.5 flex-wrap">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={index}
              className={`cursor-pointer ${
                selectedImage === thumbnail
                  ? "border-2 border-orange-500 p-0.5"
                  : "opacity-50 p-0.5"
              }`}
              onClick={() => setSelectedImage(thumbnail)}
            >
              <img
                src={thumbnail}
                alt={`product thumbnail ${index + 1}`}
                className="w-20 h-20 object-cover rounded"
              />
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default ProductImagesSection;
