import { FC, useState } from "react";
import { Menu, Button, Box, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { TableRowData } from "../../../types";

interface SortFilterProps {
  data: TableRowData[];
  onSort: (data: TableRowData[]) => void;
}

const SortFilter: FC<SortFilterProps> = ({ data, onSort }) => {
  const [activeOption, setActiveOption] = useState<string>("All");

  // Default sort options - can be extended later
  const sortOptions = [
    { label: "All", key: "all" },
    { label: "Recent", key: "recent" },
    { label: "Oldest", key: "oldest" },
    { label: "A-Z", key: "a-z" },
    { label: "Z-A", key: "z-a" },
  ];

  const handleSort = (optionKey: string) => {
    setActiveOption(optionKey);
    const sortedData = [...data];

    switch (optionKey) {
      case "recent":
        // Will be implemented when API is connected
        // sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        // Will be implemented when API is connected
        // sortedData.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "a-z":
        sortedData.sort((a, b) =>
          (a.name?.toString() || "").localeCompare(b.name?.toString() || "")
        );
        break;
      case "z-a":
        sortedData.sort((a, b) =>
          (b.name?.toString() || "").localeCompare(a.name?.toString() || "")
        );
        break;
      default:
        // "All" case - return original order
        break;
    }

    onSort(sortedData);
  };

  return (
    <Box style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <Text size="md" fw={500} c="black">
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
            {activeOption}
          </Button>
        </Menu.Target>
        <Menu.Dropdown style={{ minWidth: "120px" }}>
          {sortOptions.map((option) => (
            <Menu.Item
              key={option.key}
              onClick={() => handleSort(option.key)}
              styles={{
                item: {
                  backgroundColor:
                    activeOption === option.key
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
