import { useNavigate } from "react-router-dom";
import { Card, SimpleGrid, Text, Button, Group } from "@mantine/core";

const reports = [
  { label: "Sales Report", path: "sales-processing" },
  { label: "Product Report", path: "product-management" },
  { label: "Returns & Refunds Report", path: "returns-refunds" },
  { label: "Discounts Report", path: "discounts" },
];

const ReportSelection = () => {
  const navigate = useNavigate();

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {reports.map((report) => (
          <Card
            key={report.path}
            shadow="xs"
            padding="md"
            radius="md"
            withBorder
          >
            <Group justify="space-between" align="center">
              <Text size="sm" fw={500}>
                {report.label}
              </Text>
              <Button
                size="xs"
                variant="light"
                onClick={() =>
                  navigate("/dashboard/reports/report-date-input", {
                    state: {
                      reportType: report.path,
                      reportLabel: report.label,
                    },
                  })
                }
              >
                ➔
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Card>
  );
};

export default ReportSelection;
