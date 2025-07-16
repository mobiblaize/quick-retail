
import { Box, Text } from "@mantine/core";
import EmptyImage from "../../assets/images/emptyillustration.png";

const EmptyState = () => (
  <Box
    style={{
      padding: "4rem 1rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "0.25rem",
    }}
  >
    <img
      src={EmptyImage}
      alt="No data"
      style={{ width: "160px", height: "auto", opacity: 0.8 }}
    />

    <Text fw={600} size="lg" c="#1D2739">
      No analytics overview yet.
    </Text>
    <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
      This page is empty because you are yet to start
    </Text>
    <Text fw={400} size="lg" c="#475367" ta="center" lh="sm">
      making sales or add a product
    </Text>
  </Box>
);

export default EmptyState;
