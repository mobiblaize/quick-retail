import { useState, useMemo } from "react";
import { Text, Select, Box, Group, Badge, Loader, Stack } from "@mantine/core";
import LineChart from "../../../General/lineChart";
import { ChartDataPoint } from "../../../../types";
import { useFetchSalesAnalysis } from "../../../../hooks/backendApis/pos/dashboard";

const monthOrder = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

const SalesAnalytics = () => {
  const [selectedYear, setSelectedYear] = useState<string>(currentYear.toString());

  const { data, isLoading } = useFetchSalesAnalysis({
    //@ts-ignore
    year: selectedYear,
  });

  const chartData = useMemo(() => {
    if (!data?.data?.data || !Array.isArray(data.data.data)) return [];

    const sorted = [...data.data.data].sort(
      (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    );

    return sorted.map((item) => ({
      month: item.month,
      revenue: item.revenue,
    })) as ChartDataPoint[];
  }, [data]);

  const highlightedPoint = useMemo(() => {
    const highlight = chartData.find((item) => item.revenue > 0);

    return highlight
      ? {
        month: highlight.month,
        value: highlight.revenue,
        dataKey: "revenue",
        label: `₦${highlight.revenue.toLocaleString()}M`,
      }
      : undefined;
  }, [chartData]);

  return (
    <Box
      p="md"
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        width: "100%",
      }}
    >
      <Group justify="space-between" mb="md" align="center">
        <Stack gap={2}>
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales Analytics
          </Text>
          <Text size="sm">
            An overview of sales over time
          </Text>
        </Stack>

        <Select
          data={years}
          value={selectedYear}
          onChange={(value) => value && setSelectedYear(value)}
          placeholder="Select year"
          size="md"          // match DatePickerInput size
          w={110}            // adjust width to be similar to the date pickers
          styles={{
            input: {
              color: '#1D2939',
              fontWeight: 500,
              '&::placeholder': {
                color: '#667085',
              },
            },
          }}
        />
      </Group>

      {isLoading ? (
        <Group justify="center" py="xl">
          <Loader size="sm" />
          <Text>Loading chart...</Text>
        </Group>
      ) : (
        <Box mt="md">
          <Group gap="xs" mb="sm" align="center">
            <Badge color="orange" variant="filled" size="sm" />
            <Text size="sm">Revenue</Text>
          </Group>

          {!chartData.length ? (
            <Text>No sales data available for this year.</Text>
          ) : (
            <LineChart
              data={chartData}
              lines={[{ dataKey: "revenue", color: "#F16722", name: "Revenue" }]}
              height={280}
              yAxisFormatter={(value) => {
                if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
                return value.toString();
              }}
              showLegend={false}
              highlightedPoint={highlightedPoint}
              yAxisLabel="Amount (NGN)"
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default SalesAnalytics;
