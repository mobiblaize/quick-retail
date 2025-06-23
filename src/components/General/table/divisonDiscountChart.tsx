import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider, Text } from "@mantine/core";
import { truncateText } from '../../../utils/helpers';

interface Customer {
    product_name: string;
    selling_price: number;
    total_discount_value: string;
    total_redemptions: number;
}

interface Props {
  discounts: Customer[];
}

const DivisionDiscountChartReport = ({ discounts }: Props) => {
  const safeDiscounts = Array.isArray(discounts) ? discounts : [];

  const otherProducts = safeDiscounts.filter(p => p.product_name === "Others");
  const mainProducts = safeDiscounts.filter(p => p.product_name !== "Others");

  const sortedMain = [...mainProducts].sort(
    (a, b) => Number(b.total_discount_value) - Number(a.total_discount_value)
  );

  const topCustomers = sortedMain.slice(0, 4);
  const otherFromMain = sortedMain.slice(4);

  const othersCount = otherFromMain.reduce((acc, curr) => acc + Number(curr.total_redemptions), 0);
  const othersDiscountValue = otherFromMain.reduce((acc, curr) => acc + Number(curr.total_discount_value), 0);

  const explicitOthersCount = otherProducts.reduce((acc, p) => acc + Number(p.total_redemptions), 0);
  const explicitOthersDiscountValue = otherProducts.reduce((acc, p) => acc + Number(p.total_discount_value), 0);

  const finalOthersCount = othersCount + explicitOthersCount;
  const finalOthersDiscountValue = othersDiscountValue + explicitOthersDiscountValue;

  const colors = ["#FA9874", "#FCD2C2", "#8F2802", "#CC400C"];
  const othersColor = "#F56630";

  const pieData = [
    ...topCustomers.map((discount, index) => ({
      name: discount.product_name,
      value: Number(discount.total_discount_value),
      count: discount.total_redemptions,
      price: discount.selling_price,
      color: colors[index] || "#ccc",
    })),
    ...(finalOthersDiscountValue > 0
      ? [{
          name: "Others",
          value: finalOthersDiscountValue,
          count: finalOthersCount,
          price: 0, // No single price for others
          color: othersColor
        }]
      : []
    )
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
      <div className="flex flex-col md:flex-row w-full md:w-[53%] items-center ml-2">
        <div className="w-60 h-60">
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
      </div>

      <div className="rounded-lg py-4 w-full md:w-[45%] px-4 md:px-8 flex flex-col gap-6 mt-6 md:mt-0">
        {pieData.map((data, index) => (
          <div key={index} className="flex flex-col gap-1 border-b border-gray-300 pb-2">
            <div className="flex items-center gap-2">
              <span
                style={{
                  backgroundColor: data.color,
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  display: 'inline-block'
                }}
              ></span>
              <Text size="lg" fw={400} c="black">
                {truncateText(data.name)}
              </Text>
            </div>
            <div className="flex gap-3">
              <Text size="md" fw={400}>
                {data.count}
              </Text>
              <Text size="md" fw={400}>
                ₦{Number(data.price).toLocaleString()}
              </Text>
              <Text size="md" fw={400}>
                ₦{Number(data.value).toLocaleString()}
              </Text>
              <Divider size="sm" color="#000000" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DivisionDiscountChartReport;
