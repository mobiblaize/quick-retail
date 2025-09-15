import { Anchor, Stack, Text } from "@mantine/core";

export default function Instructions() {
  return (
    <Stack gap={6} mt="xl">
      <Text fz="sm" c="gray.7">
        <Anchor href="#" c="blue" underline="always">
          Download the product template Banking Template
        </Anchor>
      </Text>
      <Text fz="sm" c="gray.7">
        Enter product details according to the columns provided
      </Text>
      <Text fz="sm" c="gray.7">
        Preview your Banking Template for mistakes and errors
      </Text>
      <Text fz="sm" c="gray.7">
        Save the Banking Template to your device
      </Text>
      <Text fz="sm" c="gray.7">
        Upload file to Quick Retail bulk product upload and submit
      </Text>
    </Stack>
    );
  }
    