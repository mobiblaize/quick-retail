
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

interface EmptyState2Props {
  onReset?: () => void;
}

const EmptyState2 = ({ onReset }: EmptyState2Props) => {
  const handleReset = () => {
    if (onReset) {
      onReset();
    }
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
        style={{ width: "160px", height: "auto", opacity: 0.8 }}
      />
      <Text fw={600} size="lg" c="#1D2739">
        Not found
      </Text>
      <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
        Sorry, we couldn't find what you are looking for.
      </Text>
      <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
        Try entering a correct keyword or reset filters.
      </Text>

      {onReset && (
        <Button
          onClick={handleReset}
          style={{
            marginTop: "1rem",
            backgroundColor: "#f97316",
          }}
        >
          <Text c="#fff" fw={500}>Reset Table</Text>
        </Button>
      )}
    </Box>
  );
};

export default EmptyState2;


// export default EmptyState2;