import { Paper, rem, Text } from "@mantine/core";
import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  options: Option[];
  label?: string;
  placeholder?: string;
  value: string | number | null;
  onChange: (val: string) => void;
  required?: boolean;
  textColorClass?: string;
}

const Dropdown2 = ({
  options,
  label,
  placeholder = "Select...",
  value,
  onChange,
  required,
  textColorClass,
}: CustomDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative w-full`} ref={dropdownRef}>
      {label && (
        <Text size="sm" fw={500} c="gray.7" mb={4}>
          {label}
          {required && (
            <Text span c="red.6" ml={4}>
              *
            </Text>
          )}
        </Text>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`items-center flex justify-between w-full text-left px-4 py-2 bg-white border border-gray-300 rounded-md text-sm ${textColorClass || "text-black"}`}
        style={{
          paddingTop: rem(16),   // 0.7rem ≈ 11.2px
          paddingBottom: rem(16),
          paddingLeft: rem(16),
          paddingRight: rem(16),
        }}
      >
        {selectedOption ? (
          <Text>{selectedOption.label}</Text>
        ) : (
          <Text size="sm">
            {placeholder}
          </Text>
        )}
        <span className="float-right">▾</span>
      </button>

      {open && (
        <Paper
          shadow="md"
          withBorder
          radius="md"
          style={{
            position: "absolute",
            zIndex: 10,
            marginTop: 4,
            width: "100%",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <Text
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              px="md"
              py="xs"
              style={{
                cursor: "pointer",
                backgroundColor:
                  value === opt.value ? "#3b82f6" : "transparent",
                color: value === opt.value ? "white" : "black",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  "#2563eb";
                (e.currentTarget as HTMLElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor =
                  value === opt.value ? "#3b82f6" : "transparent";
                (e.currentTarget as HTMLElement).style.color =
                  value === opt.value ? "white" : "black";
              }}
            >
              {opt.label}
            </Text>
          ))}
        </Paper>
      )}

    </div>
  );
};

export default Dropdown2;
