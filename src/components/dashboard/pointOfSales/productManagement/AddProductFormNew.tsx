import {
	Button,
	Divider,
	Text,
	Textarea,
	Title,
	Box,
	Card,
	SimpleGrid,
	TextInput,
	Select,
    Flex,
} from "@mantine/core";
import { FaChevronDown } from "react-icons/fa6";


import { TbCurrencyNaira } from "react-icons/tb";
import ProductImageUpload from "./ProductImageUpload";
import AddProductModalNew from "./modal/AddProductModalNew";

function AddProductFormNew() {
	return (
		<Box>
			<Card withBorder radius={"sm"} shadow="md" py="xl">
				<Title order={3} mb="sm" style={{ color: "#1F2937", fontWeight: 600 }}>
					BASIC INFORMATION
				</Title>
				<Divider mb="md" />
				<SimpleGrid
					cols={{ base: 1, md: 2 }}
					spacing={{ base: 10, sm: 40 }}
					verticalSpacing={{ base: "md", sm: "xl" }}
					className="capitalize"
				>
					<TextInput
						label="product name"
						placeholder="Enter product name"
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
					<Select
						label="category"
						placeholder="Select product category"
						data={["empty", "data"]}
						rightSection={<FaChevronDown />}
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
							dropdown: "capitalize",
						}}
					/>
					<Select
						label="sub-category"
						placeholder="Select sub-category"
						data={["empty", "data"]}
						rightSection={<FaChevronDown />}
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
							dropdown: "capitalize",
						}}
					/>
					<TextInput
						// error="Your cost price should not be higher than your selling price"
						label="cost price"
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
						}}
					/>
					<TextInput
						// error="Your selling price should be higher than your cost price"
						label="selling price"
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
						}}
					/>
					<Textarea
						label="short description"
						placeholder="Enter a short description"
					/>
				</SimpleGrid>
			</Card>
			<Card withBorder radius={"sm"} shadow="md" mt="xl" py="xl">
				<Title order={3} mb="sm" style={{ color: "#1F2937", fontWeight: 600 }}>
					INVENTORY DETAILS
				</Title>
				<Divider mb="md" />
				<SimpleGrid
					cols={{ base: 1, md: 2 }}
					spacing={{ base: 10, sm: 40 }}
					verticalSpacing={{ base: "md", sm: "xl" }}
					className="capitalize"
				>
					<Select
						label="selling unit"
						placeholder="Select selling unit"
						data={["empty", "data"]}
						rightSection={<FaChevronDown />}
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
							dropdown: "capitalize",
						}}
					/>
					<TextInput
						// error="Your selling price should be higher than your cost price"
						label="quantity"
						placeholder="Enter quantity"
						leftSection={<TbCurrencyNaira />}
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
					<Select
						label="store"
						placeholder="Select store"
						data={["empty", "data"]}
						rightSection={<FaChevronDown />}
						classNames={{
							label: "capitalize font-semibold py-1",
							input: "!py-5 placeholder:text-#6B7280 ",
							dropdown: "capitalize",
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
					<Button radius={"md"} variant="outline">
						Cancel
					</Button>
					<AddProductModalNew/>
				</Flex>
			</Card>
		</Box>
	);
}

export default AddProductFormNew;
