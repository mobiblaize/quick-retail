// import { FC, ChangeEvent } from "react";
// import { TextInput, Box } from "@mantine/core";
// import { Search } from "lucide-react";

// interface SearchCompProps {
//   searchTerm: string;
//   setSearchTerm: (value: string) => void;
//   setPageIndex?: (index: number) => void;
//   filterList?: string[];
//   handleFilterChange?: (selectedFilter: string) => void;
//   placeholder?: string;
//   maxWidth?: string;
//   placeholderColor?: string;
//   searchIcon?: React.ReactNode;
//   iconColor?: string;
// }

// const SearchComp: FC<SearchCompProps> = ({
//   searchTerm,
//   setSearchTerm,
//   setPageIndex,
//   placeholder = "Search",
//   maxWidth,
//   placeholderColor,
//   searchIcon,
//   iconColor = "#000000",
// }) => {

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/,/g, ""); 
//     setSearchTerm(value);
//     if (setPageIndex) {
//       setPageIndex(0);
//     }
//   };
  
//   return (
//     <Box
//       style={{
//         display: "flex",
//         gap: "0.75rem",
//         margin: "0.75rem 0",
//         width: "100%",
//         justifyContent: "space-between",
//         alignItems: "center",
//         maxWidth: maxWidth || "400px",
//       }}
//     >
//       <TextInput
//         placeholder={placeholder}
//         value={searchTerm}
//         onChange={handleInputChange}
//         leftSection={searchIcon || <Search size={20} color={iconColor} />}
//         styles={{
//           root: { width: "100%" },
//           input: {
//             height: "48px",
//             fontSize: "18px", 
//             backgroundColor: "transparent",
//             "&::placeholder": {
//               color: placeholderColor,
//               fontSize: "16px",
//             },
//           },
//         }}
//       />
//     </Box>
//   );
// };

// export default SearchComp;

import { FC, ChangeEvent, useEffect, useState } from "react";
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
  debounceDelay?: number; // optional, default 500ms
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
  debounceDelay = 5000,
}) => {
  const [localValue, setLocalValue] = useState(searchTerm);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(localValue);
      if (setPageIndex) {
        setPageIndex(0);
      }
    }, debounceDelay);

    return () => {
      clearTimeout(handler);
    };
  }, [localValue, debounceDelay, setSearchTerm, setPageIndex]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, "");
    setLocalValue(value);
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
        value={localValue}
        onChange={handleInputChange}
        leftSection={searchIcon || <Search size={20} color={iconColor} />}
        styles={{
          root: { width: "100%" },
          input: {
            height: "48px",
            fontSize: "18px",
            backgroundColor: "transparent",
            "&::placeholder": {
              color: placeholderColor,
              fontSize: "16px",
            },
          },
        }}
      />
    </Box>
  );
};

export default SearchComp;

