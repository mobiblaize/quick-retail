import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider, Text } from "@mantine/core";

interface Customer {
  category_name: string;
  total_quantity_sold: string | number;
  total_revenue: string | number;
}

interface Props {
  categories: Customer[];
}

const DivisionProductChartReport = ({ categories }: Props) => {
  const colors = ["#FA9874", "#FCD2C2", "#8F2802", "#CC400C", "#F56630"];

  // Ensure numbers
  const cleanedCategories = categories.map((c) => ({
    ...c,
    total_quantity_sold: Number(c.total_quantity_sold),
    total_revenue: Number(c.total_revenue)
  }));

  const sorted = cleanedCategories
    .filter(c => c.category_name !== "Others")
    .sort((a, b) => b.total_quantity_sold - a.total_quantity_sold);

  const top = sorted.slice(0, 4);
  const rest = sorted.slice(4);

  const othersDynamic = {
    total_quantity_sold: rest.reduce((acc, c) => acc + c.total_quantity_sold, 0),
    total_revenue: rest.reduce((acc, c) => acc + c.total_revenue, 0)
  };

  const othersBackend = cleanedCategories.find(c => c.category_name === "Others") || { total_quantity_sold: 0, total_revenue: 0 };

  const combinedOthers = {
    name: "Others",
    value: othersDynamic.total_quantity_sold + othersBackend.total_quantity_sold,
    revenue: othersDynamic.total_revenue + othersBackend.total_revenue,
    color: colors[4]
  };

  const pieData = [
    ...top.map((c, i) => ({
      name: c.category_name,
      value: c.total_quantity_sold,
      revenue: c.total_revenue,
      color: colors[i] || "#ccc"
    })),
    ...(combinedOthers.value > 0 || combinedOthers.revenue > 0 ? [combinedOthers] : [])
  ];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, percent
  }: any) => {
    if (percent === 0) return null;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {(percent * 100).toFixed(1)}%
        {/* {(percent * 100)} */}
      </text>
    );
  };

  return (
    <main className="flex flex-col md:flex-row mt-6">
    {/* // <main className="flex flex-col md:flex-row mt-6 gap-4 md:gap-12"> */}
      <div className="w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-4 md:mb-0 ml-[2em] gap-6">

          {pieData.length > 0 ? (
            <ResponsiveContainer width="110%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="55%"
                  cy="50%"
                  outerRadius="75%"
                  label={renderCustomizedLabel}
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any,  props: any) => [
                    `${value} products`, 
                    props.payload.name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Text>No data available</Text>
          )}
      </div>

      <div className="rounded-lg py-4 w-full md:w-[45%] px-4 md:px-8 flex flex-col gap-6 mt-6 md:mt-0">
        {pieData.map((item, index) => (
          <div key={index} className="flex flex-col gap-1 border-b border-gray-300 pb-2">
            <div className="flex gap-2 items-center">
              <span
                style={{
                  backgroundColor: item.color,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  display: 'inline-block'
                }}
              ></span>
              <Text size="lg" fw={400} c="black">{item.name}</Text>
            </div>
            <div className="flex gap-3">
              <Text size="md" fw={400}>{item.value} products</Text>
              <Text size="md" fw={400}>
                ₦{Number(item.revenue).toLocaleString()}
              </Text>
              <Divider size="sm" color="#000000" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DivisionProductChartReport;
