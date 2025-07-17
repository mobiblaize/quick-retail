
import { Menu, Button, Box, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";


interface SortFilterProps {
  onSortChange: (sortBy: string) => void;
  activeSort: string;
}

const SortFilter = ({ onSortChange, activeSort }: SortFilterProps) => {
  const sortOptions = [
    { label: "All", key: "" },
    { label: "Recent",  key: "desc"  },
    { label: "Oldest",  key: "asc"},
    { label: "A-Z",  key: "desc"  },
    { label: "Z-A",  key: "asc" },
  ];

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
            {activeSort || "All"}
          </Button>
        </Menu.Target>
        <Menu.Dropdown style={{ minWidth: "120px" }}>
          {sortOptions.map((option) => (
            <Menu.Item
              key={option.key}
              onClick={() => onSortChange(option.key)}
              styles={{
                item: {
                  backgroundColor:
                    activeSort === option.key
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

