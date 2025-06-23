import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider, Text } from "@mantine/core";

interface Customer {
  customer_name: string;
  total_orders: number;
  total_order_value: string;
}

interface Props {
  customers: Customer[];
}

const DivisionSaleChartReport = ({ customers }: Props) => {


 const colors = ["#FA9874", "#FCD2C2", "#8F2802", "#CC400C", "#F56630"];

  const othersFromBackend = customers.find(c => c.customer_name === "Others");
const customersWithoutOthers = customers.filter(c => c.customer_name !== "Others");

const sortedCustomers = [...customersWithoutOthers].sort(
  (a, b) => b.total_orders - a.total_orders
);

const topCustomers = sortedCustomers.slice(0, 4);
const remainingCustomers = sortedCustomers.slice(4);

const dynamicOthersCount = remainingCustomers.reduce((acc, curr) => acc + curr.total_orders, 0);
const dynamicOthersOrderTotal = remainingCustomers.reduce(
  (acc, curr) => acc + Number(curr.total_order_value),
  0
);

// Merge backend Others + dynamic Others
const combinedOthers = {
  name: "Others",
  total_orders: (othersFromBackend?.total_orders ?? 0) + dynamicOthersCount,
  total_order_value: (Number(othersFromBackend?.total_order_value) ?? 0) + dynamicOthersOrderTotal,
  color: "#F56630",
};

// Pie data
const pieData = [
  ...topCustomers.map((customer, index) => ({
    name: customer.customer_name,
    value: Number(customer.total_order_value),
    color: colors[index],
  })),
  ...(combinedOthers.total_order_value > 0
    ? [{
        name: "Others",
        value: combinedOthers.total_order_value,
        color: combinedOthers.color,
      }]
    : [])
];

  
  const total = pieData.reduce((acc, curr) => acc + curr.value, 0);

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
      </text>
    );
  };
  

  
  return (
    <main className="flex flex-col md:flex-row mt-6">
      <div className="flex flex-col md:flex-row w-full md:w-[63%] items-center">
        <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mb-4 md:mb-0 ml-[4em]">
          {total > 0 ? (
           <ResponsiveContainer width="110%" height="100%">
           <PieChart margin={{ left: 30, right: 30, top: 20, bottom: 20 }}>
             <Pie
               data={pieData}
               dataKey="value"
               nameKey="name"
               cx="55%"  
               cy="50%"
               outerRadius="60%"
               label={renderCustomizedLabel}
               labelLine={true}
               paddingAngle={2}
             >
               {pieData.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={entry.color} />
               ))}
             </Pie>
             <Tooltip
               formatter={(value: number) =>
                 `₦${Number(value).toLocaleString()}`
               }
             />
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
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: data.color,
          display: "inline-block",
        }}
      ></span>
      <Text size="lg" fw={data.name === "Others" ? 600 : 400} c="black">
        {data.name}
      </Text>
    </div>
    <div className="flex gap-3">
      <Text size="md" fw={400}>
        {data.name === "Others"
          ? combinedOthers.total_orders
          : topCustomers.find(c => c.customer_name === data.name)?.total_orders ?? 0}
      </Text>
      <Text size="md" fw={400} className="flex">
        ₦{Number(data.value).toLocaleString()}
      </Text>
      <Divider size="sm" color="#E4E7EC" />
    </div>
  </div>
))}


{/* {combinedOthers.total_order_value > 0 && (
  <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
    <Text size="lg" fw={600} c="black">
      Others
    </Text>
    <div className="flex gap-3">
      <Text size="md" fw={400}>
        {combinedOthers.total_orders}
      </Text>
      <Text size="md" fw={400} className="flex">
        ₦{combinedOthers.total_order_value.toLocaleString()}
      </Text>
      <Divider size="sm" color="#E4E7EC" />
    </div>
  </div>
)}
      */}
      </div>
    </main>
  );
};

export default DivisionSaleChartReport;

