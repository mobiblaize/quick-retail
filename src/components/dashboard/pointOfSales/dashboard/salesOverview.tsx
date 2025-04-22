import { useMemo } from "react";
import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { monthlySalesData } from "../../../../utils/mockData";
import LineChart from "../../../General/lineChart";
import { ChartDataPoint } from "../../../../types";

const SalesOverview = () => {
  const chartData = useMemo(() => {
    return monthlySalesData.map((item) => ({
      month: item.month,
      revenue: item.revenue,
    })) as ChartDataPoint[];
  }, []);

  const highlightedPoint = useMemo(() => {
    const highlightedData = monthlySalesData.find(
      (item) => "highlighted" in item && item.highlighted === true
    );

    if (highlightedData) {
      return {
        month: highlightedData.month,
        value: highlightedData.revenue,
        dataKey: "revenue",
        label:
          "label" in highlightedData &&
          typeof highlightedData.label === "string"
            ? highlightedData.label
            : `₦${highlightedData.revenue}M`,
      };
    }

    return undefined;
  }, []);

  return (
    <main className="w-full h-auto px-3 sm:px-6 py-4 sm:py-8 rounded-lg bg-white">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Sales overview
          </Text>
          <Text size="sm" c="secondary">
            An overview of sales made
          </Text>
        </div>
        <Group className="w-full sm:w-auto">
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly
          />
        </Group>
      </header>

      <div className="mt-2 sm:mt-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
          <Text size="sm">Revenue</Text>
        </div>

        <div className="mt-2 sm:mt-4 overflow-x-auto">
          <div className="min-w-[320px] w-full">
            <LineChart
              data={chartData}
              lines={[
                { dataKey: "revenue", color: "#F16722", name: "Revenue" },
              ]}
              height={220}
              yAxisFormatter={(value) => `${value}M`}
              showLegend={false}
              highlightedPoint={highlightedPoint}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SalesOverview;
