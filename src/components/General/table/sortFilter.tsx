import { Menu, Button, Box, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SortFilterProps {
  onSortChange: (sortBy: string) => void;
  activeSort: string;
  sortOptions?: { label: string; key: string }[];
}

const SortFilter = ({ onSortChange, activeSort, sortOptions }: SortFilterProps) => {
  const [active, setActive] = useState(activeSort);
  
  const defaultSortOptions = [
    { label: "All", key: "" },
    { label: "Recent", key: "recent" },
    { label: "Oldest", key: "oldest" },
    { label: "A-Z", key: "a-z" },
    { label: "Z-A", key: "z-a" },
  ];

  const optionsToUse = sortOptions ?? defaultSortOptions;

  return (
    <Box style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Text size="md" fw={500} c="black" className="whitespace-nowrap">
        Sort By:
      </Text>
      <Menu position="bottom-end">
        <Menu.Target>
          <Button
            variant="outline"
            size="sm"
            rightSection={<ChevronDown size={16} />}
            styles={{
              root: {
                padding: "0.30rem 0.5rem",
                backgroundColor: "transparent",
                border: "1px solid var(--mantine-color-gray-3)",
                borderRadius: "0.375rem",
                color: "#475367",
                fontSize: "15px",
                textTransform: "capitalize",
              },
            }}
          >
            <Text size="md" c="#000" fw={300}>{active || "All"}</Text>
          </Button>
        </Menu.Target>
        <Menu.Dropdown style={{ minWidth: "120px" }}>
          {optionsToUse.map((option) => (
            <Menu.Item
              key={option.key}
              onClick={() => {
                onSortChange(option.key);
                setActive(option.key);
              }}
              styles={{
                item: {
                  backgroundColor:
                    active === option.key
                      ? "var(--mantine-color-gray-1)"
                      : undefined,
                },
              }}
            >
              {option.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default SortFilter;
