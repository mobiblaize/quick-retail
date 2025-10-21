import { Box, Text, Image, ActionIcon, SimpleGrid } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";

interface ProductImageUploadProps extends Partial<DropzoneProps> {
  /** Base64 preview strings owned by parent form */
  images: string[];
  /** Called with the File[] user dropped/selected (multiple allowed) */
  onFilesAdd?: (files: File[]) => void;
  /** Called when the user wants to remove an image at index */
  onRemove?: (index: number) => void;
  maxSizeMB?: number;
}

export default function ProductImageUpload({
  images = [],
  onFilesAdd,
  onRemove,
  maxSizeMB = 5,
  ...props
}: ProductImageUploadProps) {
  const handleDrop = (files: File[]) => {
    if (onFilesAdd) onFilesAdd(files);
  };

  return (
    <Box>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log("Rejected files", files)}
        maxSize={maxSizeMB * 1024 ** 2}
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
              <Text span c="#F16722" fw={600}>
                Click to upload
              </Text>{" "}
              or drag and drop
              <Text fz="sm" c="dimmed">
                PNG, JPEG (max {maxSizeMB} MB)
              </Text>
            </Text>
          </div>
        </Box>
      </Dropzone>

      {images.length > 0 && (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} mt="md" spacing="md">
          {images.map((src, index) => (
            <Box
              key={index}
              className="!relative border rounded-md overflow-hidden shadow-sm aspect-square bg-gray-100"
            >
              <Image
                src={src}
                alt={`Uploaded image ${index + 1}`}
                fit="cover"
                height="100%"
                width="100%"
                className="object-cover w-full h-full"
              />
              <ActionIcon
                variant="filled"
                color="red"
                radius="xl"
                size="sm"
                className="!absolute !top-2 !right-2"
                onClick={() => onRemove && onRemove(index)}
              >
                <RiDeleteBinLine size={16} />
              </ActionIcon>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
}
