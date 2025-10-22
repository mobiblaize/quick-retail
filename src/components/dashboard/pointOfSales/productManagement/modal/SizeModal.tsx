import {
	Box,
	Button,
	Modal,
	Title,
	Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
interface Props {
	children: React.ReactNode;
	title: string;
	description: string;
}
function SizeModal({ children, title, description }: Props) {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				classNames={{ title: "capitalize !font-semibold !text-xl" }}
				centered
				size={"sm"}
				radius={"md"}
			>
				<Box>
					<Title>{title}</Title>
					<Text>{description}</Text>
				</Box>
				{children}
			</Modal>
			<Button onClick={open}>open</Button>
		</>
	);
}

export default SizeModal;

// function Size() {
// 	return (
// 		<Stack>
// 			<TextInput placeholder="search types" leftSection={<FaSearch />} />
// 			<Box className="space-y-5">
// 				{[]?.fill(0).map((item) => (
// 					<Checkbox key={item} label="title" />
// 				))}
// 			</Box>
// 			<Flex gap={3} align={"center"} className="text-text-orange">
// 				<IoMdAdd />
// 				<Text>add new options</Text>
// 			</Flex>
// 			<Flex>
// 				<Button variant="outline">Cancel</Button>
// 				<Button variant="outline">Continue</Button>
// 			</Flex>
// 		</Stack>
// 	);
// }

// function colour() {
// 	return (
// 		<Stack>
// 			<TextInput placeholder="search types" leftSection={<FaSearch />} />
// 			<Box className="space-y-5">
// 				{[]?.map((item) => (
// 					<Checkbox key={item} label="title" />
// 				))}
// 			</Box>
// 			<Flex gap={3} align={"center"} className="text-text-orange">
// 				<IoMdAdd />
// 				<Text>add new options</Text>
// 			</Flex>
// 			<Flex>
// 				<Button variant="outline">Cancel</Button>
// 				<Button variant="outline">Continue</Button>
// 			</Flex>
// 		</Stack>
// 	);
// }

// function options() {
// 	return (
// 		<Stack>
// 			<TextInput label="attribute type" />
// 			<TextInput label="aoption value" />
// 			<TextInput label="aoption value" />
// 			<Flex gap={3} align={"center"} className="text-text-orange">
// 				<IoMdAdd />
// 				<Text>add new options</Text>
// 			</Flex>
// 			<Flex>
// 				<Button variant="outline">Cancel</Button>
// 				<Button variant="outline">save</Button>
// 			</Flex>
// 		</Stack>
// 	);
// }
