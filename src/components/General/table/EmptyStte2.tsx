
// import { Box, Text } from "@mantine/core";
// import EmptyStateImage from "../../../assets/images/Empty.png";

// const EmptyState2 = () => (
//   <Box
//     style={{
//       padding: "4rem 1rem",
//       textAlign: "center",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//       gap: "0.25rem",
//     }}
//   >
//    <img
//               src={EmptyStateImage}
//               alt="No data"
//               style={{ width: "160px", height: "auto", opacity: 0.8 }}
//             />
//             <Text fw={600} size="lg" c="#1D2739">
//               Not found
//             </Text>
//             <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
//               Sorry, we couldn’t find what you
//             </Text>
//             <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
//               are looking for. Try entering a
//             </Text>
//             <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
//               correct keyword.
//             </Text>
//   </Box>
// );
import { Box, Text, Button } from "@mantine/core";
import EmptyStateImage from "../../../assets/images/Empty.png";
import { FilterValues } from "../table/reuseableFilter";

interface EmptyState2Props {
  onReset?: () => void;
  setSearchTerm?: (value: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
  onSortChange?: (sortBy: string) => void;
  onPageChange?: (page: number) => void;
}

const EmptyState2 = ({
  onReset,
  setSearchTerm,
  onFilterChange,
  onSortChange,
  onPageChange,
}: EmptyState2Props) => {
  const handleReset = () => {
    // Reset search term
    setSearchTerm?.("");

    // Reset filters to default
    onFilterChange?.({
      startDate: "",
      endDate: "",
      location: "",
      stockFrom: "",
      stockTo: "",
      orderStatus: "",
      role: "",
      module: "",
    });

    // Reset sort
    onSortChange?.("");

    // Reset pagination
    onPageChange?.(1);

    // Trigger any additional reset logic (like refetching)
    onReset?.();
  };

  return (
    <Box
      style={{
        padding: "4rem 1rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <img
        src={EmptyStateImage}
        alt="No data"
        style={{ width: "160px", height: "auto", opacity: 0.85 }}
      />

      <Text fw={600} size="lg" c="#1D2739">
        Not Found
      </Text>

      <Text fw={400} size="sm" c="#475367" ta="center" lh="sm">
        Sorry, we couldn’t find what you’re looking for.
      </Text>

      <Text fw={400} size="sm" c="#475367" ta="center" lh="sm">
        Try entering a correct keyword or reset filters.
      </Text>

      <Button
        onClick={handleReset}
        mt="md"
        radius="md"
        styles={(theme) => ({
          root: {
            backgroundColor: theme.colors.orange[6],
            "&:hover": { backgroundColor: theme.colors.orange[7] },
            padding: "0.6rem 1.2rem",
            transition: "all 0.2s ease",
          },
        })}
      >
        <Text c="#fff" fw={500}>
          Reset Table
        </Text>
      </Button>
    </Box>
  );
};

export default EmptyState2;


// export default EmptyState2;