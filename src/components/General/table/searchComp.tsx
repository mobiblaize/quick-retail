import { FC, ChangeEvent } from "react";
import { TextInput, Box } from "@mantine/core";
import { Search } from "lucide-react";

interface SearchCompProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setPageIndex?: (index: number) => void;
  filterList?: string[];
  handleFilterChange?: (selectedFilter: string) => void;
  placeholder?: string;
  maxWidth?: string;
  placeholderColor?: string;
  searchIcon?: React.ReactNode;
  iconColor?: string;
}

const SearchComp: FC<SearchCompProps> = ({
  searchTerm,
  setSearchTerm,
  setPageIndex,
  placeholder = "Search",
  maxWidth,
  placeholderColor,
  searchIcon,
  iconColor = "#000000",
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (setPageIndex) {
      setPageIndex(0);
    }
  };

  return (
    <Box
      style={{
        display: "flex",
        gap: "0.75rem",
        margin: "0.75rem 0",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: maxWidth || "400px",
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        leftSection={searchIcon || <Search size={20} color={iconColor} />}
        styles={{
          root: { width: "100%", fontSize: "26px" },
          input: {
            backgroundColor: "transparent",
            "&::placeholder": {
              color: placeholderColor,
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchComp;
