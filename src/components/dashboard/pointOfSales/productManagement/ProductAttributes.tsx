import {
	Box,
	Button,
	Card,
	Divider,
	Flex,
	Group,
	Text,
	Badge,
} from "@mantine/core";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import TagInputGroup from "./ProductAttributeTags";
interface Attribute {
	id: string;
	name: string;
	values: string[];
}
function ProductAttributes() {
	const [display, setDisplay] = useState(true);
	const [size, setSize] = useState(["Small", "Medium", "Large"]);
	const [colour, setColour] = useState(["White", "Black", "Pink"]);

	// const [attributes, setAttributes] = useState<Attribute[]>([
	// 	{ id: "1", name: "Size", values: ["Small", "Medium", "Large"] },
	// 	{ id: "2", name: "Colour", values: ["White", "Black", "Pink"] },
	// ]);

	// const handleDelete = (id: string) => {
	// 	setAttributes((prev) => prev.filter((attr) => attr.id !== id));
	// };

	return (
		<Card withBorder radius={"sm"} shadow="md" mt="xl">
			<Flex justify={"space-between"} align={"center"} tt={"capitalize"}>
				<Text>product attributes</Text>
				<Flex
					gap={"xs"}
					className="!text-text-orange font-bold text-xl cursor-pointer"
					align={"center"}
					onClick={() => setDisplay(true)}
				>
					<IoMdAdd />
					<Text
						className="!text-text-orange"
						fz={"sm"}
						fw={600}
						tt={"capitalize"}
					>
						select attribute
					</Text>
				</Flex>
			</Flex>
			<Divider c="#cfcfcf0" />

			{/* Attributes List */}
			{display && (
				<Box className="p-4">
					<TagInputGroup value={size} setValue={setSize} label="size"/>
					<Divider my="lg" />
					<TagInputGroup value={colour} setValue={setColour} label="colour"/>
				</Box>
			)}
		</Card>
	);
}

export default ProductAttributes;
