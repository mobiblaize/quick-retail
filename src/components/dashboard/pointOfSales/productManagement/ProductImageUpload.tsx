import { useState } from "react";
import { Box, Text, Image, Flex, ActionIcon } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface ProductImageUploadProps extends Partial<DropzoneProps> {
  onImagesChange?: (images: string[]) => void;
}

function ProductImageUpload({ onImagesChange, ...props }: ProductImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);

  const handleDrop = (files: File[]) => {
    const promises = files.map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(promises).then((base64Images) => {
      const updated = [...images, ...base64Images];
      setImages(updated);
      onImagesChange?.(updated);
    });
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onImagesChange?.(updated);
  };

  return (
    <Box>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.warn("Rejected files:", files)}
        maxSize={5 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple
        {...props}
        className="border-2 border-gray-200 border-dashed rounded-md py-7 bg-gray-100/50 cursor-pointer"
      >
        <Box className="flex justify-center items-center text-center">
          <div className="space-y-5">
            <span className="rounded-full p-2 bg-neutral-200/40 flex justify-center w-fit items-center mx-auto">
              <FiUploadCloud size={24} />
            </span>
            <Text>
              <Text span c="#F16722">
                Click to upload
              </Text>{" "}
              or drag and drop
              <Text fz="sm">PNG, JPEG (max 5 MB)</Text>
            </Text>
          </div>
        </Box>
      </Dropzone>

      {images.length > 0 && (
        <Flex wrap="wrap" gap="md" mt="md">
          {images.map((img, index) => (
            <Box key={index} className="relative">
              <Image
                src={img}
                alt={`product-${index}`}
                radius="md"
                w={120}
                h={120}
                fit="cover"
                className="border border-gray-200"
              />
              <ActionIcon
                color="red"
                radius="xl"
                size="sm"
                className="absolute -top-2 -right-2 bg-white shadow"
                onClick={() => handleRemove(index)}
              >
                <RiDeleteBinLine size={16} />
              </ActionIcon>
            </Box>
          ))}
        </Flex>
      )}
    </Box>
  );
}

export default ProductImageUpload;
