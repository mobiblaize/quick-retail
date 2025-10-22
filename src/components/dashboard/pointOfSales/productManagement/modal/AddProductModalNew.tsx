import { Modal, Button, Text, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function AddProductModalNew() {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="add product"
				classNames={{ title: "capitalize !font-semibold !text-xl" }}
				centered
				size={"sm"}
				radius={"md"}
			>
				<Text fz={"xs"}>
					Are you sure you want to add this product? Ensure that the product
					information filled are correct.
				</Text>
				<Flex justify={"space-evenly"} align={"center"} mt="lg">
					<Button className="w-full" tt={"capitalize"} variant="outline">
						cancel
					</Button>
					<Button className="w-full" tt={"capitalize"}>add product</Button>
				</Flex>
			</Modal>

			<Button onClick={open} radius={"md"}>
				Save Product
			</Button>
		</>
	);
}

export default AddProductModalNew;
