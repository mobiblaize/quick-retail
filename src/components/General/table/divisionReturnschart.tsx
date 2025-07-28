import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider, Text } from "@mantine/core";
import { truncateText } from '../../../utils/helpers';

interface Customer {
  product_name: string;
  product_price: number;
  return_count: string;
}

interface Props {
  returns: Customer[];
}

const DivisionReturnsChartReport = ({ returns }: Props) => {
  const sortedReturns = [...returns].sort(
    (a, b) => Number(b.product_price) - Number(a.product_price)
  );

  const topReturns = sortedReturns.slice(0, 4);
  const others = sortedReturns.slice(4);

  const othersTotalPrice = others.reduce(
    (acc, curr) => acc + Number(curr.product_price),
    0
  );

  const colors = ["#FA9874", "#FCD2C2", "#8F2802", "#CC400C", "#F56630"];

  const pieData = [
    ...topReturns.map((item, index) => ({
      name: truncateText(item.product_name),
      value: Number(item.product_price),
      return_count: item.return_count,
      color: colors[index] || "#ccc",
    })),
    ...(othersTotalPrice > 0
      ? [{
          name: "Others",
          value: othersTotalPrice,
          return_count: "",  // or combine return counts if you want
          color: colors[4] || "#ccc",
        }]
      : []),
  ];

  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, percent
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {(percent * 100).toFixed(1)}%
      </text>
    );
  };

  return (
    <main className="flex flex-col md:flex-row mt-6">
      <div className="w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-4 md:mb-0 ml-[4em]">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="110%" height="100%">
              <PieChart margin={{ left: 30, right: 30, top: 20, bottom: 20 }}>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="55%"
                  cy="50%"
                  outerRadius="75%"
                  label={renderCustomizedLabel}
                  labelLine={true}
                  paddingAngle={2}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
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
              {item.return_count && (
                <Text size="md" fw={400}>
                  {item.return_count}
                </Text>
              )}
              <Text size="md" fw={400}>
                ₦{Number(item.value).toLocaleString()}
              </Text>
              <Divider size="sm" color="#000000" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DivisionReturnsChartReport;
