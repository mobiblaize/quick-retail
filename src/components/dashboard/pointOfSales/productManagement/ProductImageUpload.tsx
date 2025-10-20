import { Box, Text } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FiUploadCloud } from "react-icons/fi";

function ProductImageUpload(props: Partial<DropzoneProps>) {
	return (
		<Dropzone
			onDrop={(files) => console.log("accepted files", files)}
			onReject={(files) => console.log("rejected files", files)}
			maxSize={5 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
			{...props}
			className="border-2 border-gray-200 border-dashed rounded-md py-7 bg-gray-100/50 cursor-pointer"
		>
			<Box className="flex justify-center items-center text-center">
				<div className="space-y-5">
					<span className="rounded-full p-2 bg-neutral-200/40 flex justify-center w-fit items-center mx-auto">
						<FiUploadCloud size={24} />
					</span>
					<Text>
						{" "}
						<Text span c={"#F16722"}>
							click to upload
						</Text>{" "}
						or drag and drop
						<Text fz={"sm"}>PNG, JPEG (max 5 MB)</Text>
					</Text>
				</div>
			</Box>
		</Dropzone>
	);
}

export default ProductImageUpload;
