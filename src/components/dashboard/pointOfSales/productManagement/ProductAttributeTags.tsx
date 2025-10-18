import { Textarea, Group, Pill, Text, Box, Flex } from "@mantine/core";
import { useState } from "react";

interface TagInputGroupProps {
	value: any[];
	setValue: React.Dispatch<React.SetStateAction<string[]>>;
	required?: boolean;
	errorMessage?: string;
	label: string;
}

export default function TagInputGroup({
	value,
	setValue,
	required = false,

	label,
}: TagInputGroupProps) {
	const [inputValue, setInputValue] = useState("");
	const [touched, setTouched] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const handleKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (disabled) return;
		if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
			e.preventDefault();
			const newTag = inputValue.trim();
			if (!value.some((t) => t === newTag)) {
				const newValue = [...value, newTag];
				setValue(newValue);
				setInputValue("");
			}
		}
	};

	const removeTag = (tag: any) => {
		if (disabled) return;
		const newValue = value.filter((t) => t !== tag);
		setValue(newValue);
	};

	return (
		<Flex justify={"space-between"}>
			<Text fw={600} fz={"sm"}>
				{label}
			</Text>
			<Flex justify={""}>
				<Box
					style={{
						border: "1px solid #ced4da",
						backgroundColor: disabled ? "#f8f9fa" : "#f1f3f5",
						borderRadius: "8px",
						padding: "2px",
						opacity: disabled ? 0.6 : 1,
						cursor: disabled ? "not-allowed" : "text",
					}}
				>
					<Group gap="xs" wrap="wrap" align="flex-start">
						{value?.map((tag: any) => (
							<Pill
								key={tag}
								size="sm"
								withRemoveButton={!disabled}
								onRemove={() => removeTag(tag)}
								variant="outline"
								className="!capitalize !bg-white !border !border-neutral-400 !text-sm"
							>
								<Text size="sm">{tag}</Text>
							</Pill>
						))}

						<Textarea
							value={inputValue}
							onChange={(e) => !disabled && setInputValue(e.target.value)}
							onKeyDown={handleKeyDown}
							onBlur={() => setTouched(true)}
							disabled={disabled}
							placeholder=""
							minRows={2}
							maxRows={3}
							autosize
							variant="unstyled"
							style={{
								flex: 1,
								minWidth: 120,
								backgroundColor: "transparent",
								fontSize: "14px",
							}}
						/>
					</Group>
				</Box>
				<Group ml={"md"}>
					<Text className="!text-red-600 text-sm font-medium cursor-pointer hover:bg-neutral-100 !px-2 !rounded-sm">
						Delete
					</Text>
					<Text
						className="!text-blue-700 text-sm font-medium cursor-pointer hover:bg-neutral-100 !px-2 !rounded-sm"
						onClick={() => setDisabled(false)}
					>
						Edit
					</Text>
				</Group>
			</Flex>
		</Flex>
	);
}
