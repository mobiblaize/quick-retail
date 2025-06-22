import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Text } from "@mantine/core";

interface RefundStatsPieChartProps {
  pending: number;
  declined: number;
  resolved: number;
}

const RefundStatsPieChart = ({ pending, declined, resolved }: RefundStatsPieChartProps) => {
  const total = pending + declined + resolved;

  const pieData = [
    { name: "Request Pending", value: pending, color: "#DD900D" },
    { name: "Refund Declined", value: declined, color: "#CB1A14" },
    { name: "Refund Resolved", value: resolved, color: "#099137" },
  ].filter(item => item.value > 0);

  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, percent
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 h-64">
        {pieData.length > 0 && total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="55%"
                cy="50%"
                outerRadius="60%"
                label={renderCustomizedLabel}
                paddingAngle={2}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} product(s)`, name]} 
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
              // @ts-ignore
          <Text align="center">No data available</Text>
        )}
      </div>

      <div className="flex flex-col gap-2 w-full md:w-1/2">
        {pieData.map((item, index) => {
          const percent = total > 0 ? ((item.value / total) * 100).toFixed(1) : "0.0";
          return (
            <div key={index} className="flex items-center border-b border-gray-300 pb-1 flex-col mt-5 ">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                <Text size="md" color="black">{item.name}</Text>
              </div>
              <Text size="md" className="flex gap-6">
  <span>{item.value}</span>
  <span>{percent}%</span>
</Text>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RefundStatsPieChart;
