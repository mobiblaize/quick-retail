import { PieChart } from "@mantine/charts";
import { Divider, Text } from "@mantine/core";

interface CategoryData {
  category?: string;
  category_name?: string;
  total_sold: number;
  percentage: number;
}

interface Props {
  data: CategoryData[];
}

const DivisionSalePie = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <Text>No data available</Text>
      </div>
    );
  }

  // ✅ Normalize category keys
  const normalizedData = data.map((item) => ({
    category: item.category || item.category_name || "Unknown",
    total_sold: Number(item.total_sold) || 0,
    percentage: Number(item.percentage) || 0,
  }));

  const total = normalizedData.reduce((acc, item) => acc + item.total_sold, 0);
  const colors = ["#E76E50", "#274754", "#84CC16", "#06B6D4", "#FACC15"];

  // ✅ Check if backend already includes “Others”
  const hasBackendOthers = normalizedData.some(
    (item) => item.category.toLowerCase() === "others"
  );

  // Sort descending by total_sold
  const sorted = [...normalizedData].sort(
    (a, b) => b.total_sold - a.total_sold
  );

  let top3: CategoryData[] = [];
  let others: CategoryData[] = [];

  if (hasBackendOthers) {
    // ✅ If API already included “Others”, just keep top 4 including it
    top3 = sorted.slice(0, 4);
    others = [];
  } else {
    // ✅ Otherwise, compute “Others” manually
    top3 = sorted.slice(0, 3);
    others = sorted.slice(3);
  }

  const othersTotal = others.reduce((acc, item) => acc + item.total_sold, 0);
  const othersPercentage = others.reduce(
    (acc, item) => acc + item.percentage,
    0
  );

  const chartData = [
  ...top3.map((item, index) => ({
    name: item.category ?? "Unknown", // ✅ ensures name is string
    value: parseFloat(item.percentage.toFixed(2)),
    color: colors[index % colors.length],
  })),
  ...(others.length > 0
    ? [
        {
          name: "Others",
          value: parseFloat(othersPercentage.toFixed(2)),
          color: colors[(top3.length + 1) % colors.length],
        },
      ]
    : []),
];


  return (
    <main className="flex flex-col md:flex-row mt-6 justify-between">
      {/* Left: Chart + Legend */}
      <div className="flex flex-col md:flex-row w-full md:w-[63%] items-center">
        <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mb-4 md:mb-0">
          {total > 0 ? (
            <PieChart
              data={chartData}
              size={180}
              tooltipDataSource="segment"
              strokeWidth={1}
              paddingAngle={1}
              withTooltip
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </div>

        {/* Legend */}
        <div className="flex flex-row md:flex-col flex-wrap justify-center gap-4 md:ml-2">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex whitespace-nowrap items-center gap-2 mr-4 md:mr-0"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <Text fw={500} size="sm" c="gray.9">
                {item.name} — {item.value}%
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Category Breakdown */}
      <div className="bg-[#F9FAFB] rounded-lg py-4 w-full md:w-[35%] px-4 md:px-8 flex flex-col gap-6 mt-6 md:mt-0">
        {[...top3, ...(others.length > 0 ? [{
          category: "Others",
          total_sold: othersTotal,
        }] : [])].map((item, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Text size="sm" fw={400}>
              {item.category}
            </Text>
            <div className="flex flex-col gap-3">
              <Text size="lg" fw={700}>
                {item.total_sold.toLocaleString()}
              </Text>
              <Divider size="sm" color="#E4E7EC" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DivisionSalePie;
