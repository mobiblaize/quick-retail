import { Select, Text, Group } from "@mantine/core";
import { useMemo, useRef } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface CustomDropdownProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value: string | number | null;
  onChange: (val: string | number) => void;
  required?: boolean;
  optional?: boolean;
  error?: string;
  color?: string;
  requiredColor?: string;
  IconComponent?: React.ReactNode;
  paddingX?: number | string;
  paddingY?: number | string;
  borderWidth?: number | string;
  leftPrefix?: string;
  disabled?: boolean;
  searchable?: boolean;
}

const Dropdown = ({
  options,
  label,
  placeholder = "Select...",
  value,
  onChange,
  disabled,
  required,
  optional,
  error,
  color,
  requiredColor = "red.6",
  IconComponent,
  paddingX = 16,
  paddingY = "5px",
  borderWidth = "1px",
  leftPrefix,
  searchable = false,
}: CustomDropdownProps) => {
  const data = useMemo(
    () =>
      options.map((opt) => ({
        value: String(opt.value),
        label: opt.label,
      })),
    [options]
  );

  const normalizeDimension = (dimension: number | string | undefined) => {
    if (dimension === undefined) return "0.5rem";
    if (typeof dimension === "number") return `${dimension}px`;
    return dimension;
  };

  const paddingXValue = normalizeDimension(paddingX);
  const paddingYValue = normalizeDimension(paddingY);
  const borderWidthValue = normalizeDimension(borderWidth);

  const inputRef = useRef<HTMLInputElement>(null);

  const sharedLabel = label && (
    <Group gap="xs" align="center">
      <Text size="sm" fw={500} c="gray.7">
        {label}
      </Text>
      {required && (
        <Text size="sm" c={requiredColor}>
          *
        </Text>
      )}
      {optional && (
        <Text size="sm" c="gray.5">
          (Optional)
        </Text>
      )}
    </Group>
  );

  return (
    <Select
      ref={inputRef}
      label={sharedLabel}
      placeholder={placeholder}
      data={data}
      disabled={disabled}
      value={value !== null ? String(value) : null}
      onChange={(val) => {
        if (val !== null) {
          const parsed =
            isNaN(Number(val)) || val.trim() === "" ? val : Number(val);
          onChange(parsed);
        }
      }}
      error={error}
      rightSection={IconComponent}
      searchable={searchable}
      styles={{
        wrapper: { width: "100%" },
        input: {
          borderWidth: borderWidthValue,
          borderColor: error ? "#D42620" : "#E5E7EB",
          borderStyle: "solid",
          borderRadius: "0.375rem",
          backgroundColor: "#fff",
          color: error ? "#D42620" : color ?? "#111827",
          paddingLeft: leftPrefix ? "2.5rem" : paddingXValue,
          paddingRight: IconComponent ? "2.5rem" : paddingXValue,
          paddingTop: paddingYValue,
          paddingBottom: paddingYValue,
          height: "auto",
          minHeight: "2.5rem",
          fontSize: "16px",
          boxShadow: "none",
          outline: "none",
          "&::placeholder": { color: "#111827" },
        },
      }}
      rightSectionWidth={40}
    />
  );
};

export default Dropdown;
