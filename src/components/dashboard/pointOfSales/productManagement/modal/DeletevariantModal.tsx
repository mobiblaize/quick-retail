import { Button, Flex, Modal,Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';

function DeletevariantModal() {
    const [opened, { open, close }] = useDisclosure(false);
  return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Delete variant"
				classNames={{ title: "capitalize !font-semibold !text-xl" }}
				centered
				size={"sm"}
				radius={"md"}
			>
				<Text fz={"xs"}>
					Are you sure you want to delete this variant? This delete action
					cannot be undone.
				</Text>
				<Flex justify={"space-evenly"} align={"center"} mt="lg">
					<Button className="w-full" tt={"capitalize"} variant="outline">
						No
					</Button>
					<Button className="w-full" tt={"capitalize"}>
						Yes, Delete
					</Button>
				</Flex>
			</Modal>

			<Button onClick={open} radius={"md"}>
				Delete
			</Button>
		</>
	);
}

export default DeletevariantModal