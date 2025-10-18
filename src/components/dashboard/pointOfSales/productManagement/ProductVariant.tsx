import {
	Box,
	Divider,
	Flex,
	Text,
	Card,
	SimpleGrid,
	TextInput,
	Select,
	Button,
} from "@mantine/core";
import { useState } from "react";
import { FaAngleDown, FaChevronDown } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";
import ProductImageUpload from "./ProductImageUpload";
import { RiDeleteBinLine } from "react-icons/ri";
interface VariantProps {
	id: string;
	name: string;
	values: string[];
}
function ProductVariant() {
	const [variant, setVariant] = useState<VariantProps[]>([]);

	const handleAddVariant = () => {
		const newVariant: VariantProps = {
			id: crypto.randomUUID(), // unique id
			name: "New Attribute", // placeholder until user edits
			values: [],
		};

		setVariant((prev) => [...prev, newVariant]);
	};
	const handleAddValue = (id: string, value: string) => {
		setVariant((prev) =>
			prev.map((v) =>
				v.id === id ? { ...v, values: [...v.values, value] } : v
			)
		);
	};
	const handleDeleteVariant = (id: string) => {
		setVariant((prev) => prev.filter((v) => v.id !== id));
	};
	return (
		<Card withBorder radius={"sm"} shadow="md" mt="xl">
			<Box>
				<Flex justify={"space-between"}>
					<Text>Product variant(s)</Text>
					<FaAngleDown />
				</Flex>
				<Divider />
				{variant.length > 0 || <Flex
					mt="md"
					gap={"xs"}
					className="!text-text-orange font-bold text-xl cursor-pointer"
					align={"center"}
					onClick={handleAddVariant}
				>
					<IoMdAdd />
					<Text
						className="!text-text-orange"
						fz={"sm"}
						fw={600}
						tt={"capitalize"}
					>
						add variant
					</Text>
				</Flex>}
			</Box>
			{variant.map((item) => (
				<Card key={item.id} withBorder radius={"sm"} mt="sm">
					<Text>Variant {variant.length}</Text>
					<SimpleGrid cols={{ base: 1, md: 2 }} spacing={"xl"}>
						<Select
							label="size"
							placeholder="select size"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
							rightSection={<FaChevronDown />}
						/>
						<Select
							label="color"
							placeholder="select color"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
							rightSection={<FaChevronDown />}
						/>
						<Select
							label="selling unit"
							placeholder="select selling unit"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
							rightSection={<FaChevronDown />}
						/>
						<TextInput
							label="stock quantity"
							placeholder="enter stock quantity"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
						/>
						<TextInput
							label="cost price"
							leftSection={<TbCurrencyNaira />}
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
						/>
						<TextInput
							label="selling price"
							leftSection={<TbCurrencyNaira />}
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
						/>
						<TextInput
							label="SKU (Store Keeping Unit)"
							placeholder="Enter SKU"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
						/>
						<TextInput
							label="Re-order level"
							placeholder="Enter re-order level"
							classNames={{
								label: "capitalize font-semibold py-1",
								input: "!py-5 placeholder:text-#6B7280 ",
							}}
						/>
					</SimpleGrid>
					<Box mt="lg">
						<Text fw={600} fz={"sm"} my="xs" c="black">
							Product image
						</Text>
						<ProductImageUpload />
					</Box>
					<Flex justify={"end"} mt="xl" gap={15}>
						<Button
							onClick={() => handleDeleteVariant(item.id)}
							radius={"md"}
							variant="outline"
							rightSection={<RiDeleteBinLine />}
						>
							Remove Variant
						</Button>

						{/* <AddProductModalNew /> */}
					</Flex>
				</Card>
			))}
			{variant.length > 0 && (
				<Button
					radius={"md"}
					tt="capitalize"
					className="!w-fit"
					mt="xl"
					onClick={handleAddVariant}
				>
					Add another
				</Button>
			)}
		</Card>
	);
}

export default ProductVariant;
