import { useState, useMemo } from "react";
import { Text, Select } from "@mantine/core";
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
    <main className="w-full h-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales Analytics
          </Text>
          <Text size="sm" c="secondary">
            An overview of sales over time
          </Text>
        </div>

        <div className="flex gap-4 items-center">
          <Select
            data={years}
            value={selectedYear}
            onChange={(value) => value && setSelectedYear(value)}
            placeholder="Select year"
            size="xs"
            className="w-24"
          />
        </div>
      </header>

      {isLoading ? (
        <Text>Loading chart...</Text>
      ) : (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <Text size="sm">Revenue</Text>
          </div>

          <div className="mt-4">
            {!chartData.length ? (
              <Text>No sales data available for this year.</Text>
            ) : (
              
              <LineChart
                data={chartData}
                lines={[{ dataKey: "revenue", color: "#F16722", name: "Revenue" }]}
                height={280}
                yAxisFormatter={(value) => `${value}M`}
                showLegend={false}
                highlightedPoint={highlightedPoint}
            
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default SalesAnalytics;