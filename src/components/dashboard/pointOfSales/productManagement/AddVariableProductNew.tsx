import {
	Card,
	Title,
	Divider,
	SimpleGrid,
	TextInput,
	Select,
	Textarea,
	Flex,
	Box,
	Text,
	Group,
	Button,
} from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import ProductAttributes from "./ProductAttributes";
import ProductVariant from "./ProductVariant";

function AddVariableProductNew() {
	return (
		<Box px="xl" py="lg">
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

					<Textarea
						label="short description"
						placeholder="Enter a short description"
					/>
				</SimpleGrid>
			</Card>
			<Box>
				<ProductAttributes />
				<ProductVariant />
			</Box>

			{/* <Card mt="xl" shadow="md">
				<Flex justify={"flex-end"} gap={"lg"}>
					<Button variant="outline" tt={"capitalize"}>
						cancel
					</Button>
					<Button tt={"capitalize"}>continue</Button>
				</Flex>
			</Card> */}
		</Box>
	);
}

export default AddVariableProductNew;
