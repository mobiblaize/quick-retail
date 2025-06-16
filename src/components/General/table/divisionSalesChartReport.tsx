import { PieChart } from "@mantine/charts";
import { Divider, Text } from "@mantine/core";

interface Customer {
  customerID: string;
  customer_name: string;
  sales_orders_count: number;
}

interface Props {
  customers: Customer[];
}

const DivisionSaleChartReport = ({ customers }: Props) => {
  // Sort customers by sales_orders_count descending
  const sortedCustomers = [...customers].sort(
    (a, b) => b.sales_orders_count - a.sales_orders_count
  );

  const topCustomers = sortedCustomers.slice(0, 4);
  const others = sortedCustomers.slice(4);

  const othersCount = others.reduce(
    (acc, curr) => acc + curr.sales_orders_count,
    0
  );

  const colors = ["#FA9874", "#FCD2C2", "#8F2802", "#CC400C", "#F56630"];

  const pieData = [
    ...topCustomers.map((customer, index) => ({
      name: customer.customer_name,
      value: customer.sales_orders_count,
      color: colors[index],
    })),
    ...(othersCount > 0
      ? [
          {
            name: "Others",
            value: othersCount,
            color: colors[4],
          },
        ]
      : []),
  ];

  const total = pieData.reduce((acc, curr) => acc + curr.value, 0);
  const othersOrderTotal = others.reduce(
    // @ts-ignore
    (acc, curr) => acc + parseFloat(curr.sales_orders_sum_order_total || 0),
    0
  );

  return (
    <main className="flex flex-col md:flex-row mt-6">
      <div className="flex flex-col md:flex-row w-full md:w-[63%] items-center">
        <div className="w-48 h-48 md:w-56 md:h-56 flex items-center justify-center mb-4 md:mb-0 ml-[4em]">
          {total > 0 ? (
            <PieChart
              data={pieData}
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
      </div>
      <div className=" rounded-lg py-4 w-full md:w-[45%] px-4 md:px-8 flex flex-col gap-6 mt-6 md:mt-0">
        {topCustomers.map((data, index) => (
          <div key={index}   className="flex flex-col gap-1 border-b border-gray-300 pb-2">
            <Text size="lg" fw={400} c="black">
              {data.customer_name}
            </Text>
            <div className="flex gap-3">
              <Text size="md" fw={400}>
      
                {data.sales_orders_count}
              </Text>
              <Text size="md" fw={400} className="flex">
                         {/* @ts-ignore */}
                ₦{data.sales_orders_sum_order_total}
              </Text>
              <Divider size="sm" color="#000000" />
            </div>
          </div>
        ))}

        {othersCount > 0 && (
          <div className="flex flex-col gap-1 border-b border-gray-300 pb-2">
            <Text size="lg" fw={600} c="black">
              Others
            </Text>
            <div className="flex gap-3">
              <Text size="md" fw={400}>
                {othersCount}
              </Text>
              <Text size="md" fw={400} className="flex">
                ₦{othersOrderTotal}
              </Text>
              <Divider size="sm" color="#E4E7EC" />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DivisionSaleChartReport;
