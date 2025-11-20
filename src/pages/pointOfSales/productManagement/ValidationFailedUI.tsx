import {
  Box,
  Button,
  Card,
  Group,
  Text,
  Accordion,
  Badge,
  Divider,
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export default function ValidationFailedUI() {
  return (
    <Box className="p-6 bg-gray-50 rounded-xl ">
      {/* Header */}
      <div className="text-center w-full flex flex-col items-center gap-5 rounded-xl bg-white shadow-xs shadow-[] py-10">
        <IconAlertCircle className="text-center" size={48} color="#FF4D4F" />

        <Text fw={600} fz="lg" mt={5}>
          Validation Failed
        </Text>

        <Text fz="sm" c="dimmed">
          We found <b>447 errors</b> in your file that need to be fixed before
          uploading
        </Text>
      </div>

      {/* Stats Row */}
      <Group grow mt={30}>
        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            TOTAL ROWS
          </Text>
          <Text fw={700} fz={22} mt={5}>
            447
          </Text>
        </Card>

        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            ERRORS FOUND
          </Text>
          <Text fw={700} fz={22} mt={5} color="#FF4D4F">
            47
          </Text>
        </Card>

        <Card shadow="xs" radius="md" p="lg">
          <Text fz="xs" c="dimmed">
            VALID ROWS
          </Text>
          <Text fw={700} fz={22} mt={5} color="green">
            400
          </Text>
        </Card>
      </Group>

      {/* Section Title */}
      <div className="flex items-center justify-between rounded-sm mt-10 bg-white p-3">
        <Text fw={600}>COLUMN VALIDATION DETAILS</Text>
        <Button variant="filled" color="orange">
          Download Error Report
        </Button>
      </div>

      {/* Accordion */}
      <div className="border-t border-gray-100 rounded-sm bg-white p-3">
        <Accordion variant="separated" radius="md" defaultValue="sub-category">
          {/* Valid Section */}

          <div className="bg-gray-50 rounded-md mb-3 flex items-center justify-between p-3">
            <div>
              <Text fw={500}>Product Name</Text>
              <Text fz="xs" c="dimmed">
                150 / 150 rows valid
              </Text>
            </div>
            <Badge color="green">All Valid</Badge>
          </div>

          <div className="bg-gray-50 rounded-md mb-3 flex items-center justify-between p-3">
            <div>
              <Text fw={500}>Product Name</Text>
              <Text fz="xs" c="dimmed">
                150 / 150 rows valid
              </Text>
            </div>
            <Badge color="green">All Valid</Badge>
          </div>

          {/* Error Section */}
          <Accordion.Item value="sub-category">
            <Accordion.Control>
              <Group
                className="flex !justify-between pr-4 !items-center"
                w="100%"
              >
                <div>
                  <Text fw={500}>Sub-category</Text>
                  <Text fz="xs" c="dimmed">
                147 / 150 rows valid
              </Text>
                </div>

                <Badge color="red">3 Issues</Badge>
              </Group>
              
            </Accordion.Control>

            <Accordion.Panel>
              <Card
                mt="xs"
                p="md"
                withBorder
                radius="md"
                className="!border-[#FFC9C9]"
                bg="#FFFFFF"
              >
                <Text fz="md" color="#E7000B">
                  Row 23:{" "}
                  <span className="text-[#171717]">
                    Sub-category is required
                  </span>
                </Text>
              </Card>

              <Card
                mt="xs"
                p="md"
                withBorder
                radius="md"
                className="!border-[#FFC9C9]"
                bg="#FFFFFF"
              >
                <Text fz="md" color="#E7000B">
                  Row 23:{" "}
                  <span className="text-[#171717]">
                    Sub-category is required
                  </span>
                </Text>
              </Card>

              <Card
                mt="xs"
                p="md"
                withBorder
                radius="md"
                className="!border-[#FFC9C9]"
                bg="#FFFFFF"
              >
                <Text fz="md" color="#E7000B">
                  Row 23:{" "}
                  <span className="text-[#171717]">
                    Sub-category is required
                  </span>
                </Text>
              </Card>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </Box>
  );
}
