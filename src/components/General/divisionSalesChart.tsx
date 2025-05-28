import { PieChart } from "@mantine/charts";
import { Divider, Text } from "@mantine/core";

interface Props {
  newCustomers: number;
  existingCustomers: number;
  existing_customers_percentage: number;
  new_customers_percentage: number;
}

const DivisionSaleChart = ({
  newCustomers,
  existingCustomers,
  new_customers_percentage,
  existing_customers_percentage,
}: Props) => {
  const total = newCustomers + existingCustomers;

  const pieData = [
    {
      name: "New Customers",
      value: new_customers_percentage,
      color: "#E76E50",
    },
    {
      name: "Existing Customers",
      value: existing_customers_percentage,
      color: "#274754",
    },
  ];

  const customerAnalysis = [
    {
      label: "New Customers",
      num: newCustomers,
    },
    {
      label: "Existing Customers",
      num: existingCustomers,
    },
  ];

  return (
    <main className="flex flex-col md:flex-row mt-6 justify-between">
      <div className="flex flex-col md:flex-row w-full md:w-[63%] items-center">
        <div className="w-48 h-48 md:w-56 md:h-56 flex  items-center justify-center mb-4 md:mb-0">
          {total > 0 ? (
            <PieChart
              data={pieData}
              size={180}
              tooltipDataSource="segment"
              strokeWidth={1}
              paddingAngle={1}
              withTooltip={false}
              style={{ height: "100%", width: "100%" }}
            />
          ) : (
            <Text>No data available</Text>
          )}
        </div>

        <div className="flex flex-row md:flex-col flex-wrap justify-center gap-4 md:ml-2">
          {pieData.map((item, index) => (
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

      <div className="bg-[#F9FAFB] rounded-lg py-4 w-full md:w-[35%] px-4 md:px-8 flex flex-col gap-6 mt-6 md:mt-0">
        {customerAnalysis.map((data, index) => (
          <div key={index} className="flex flex-col gap-1">
            <Text size="sm" fw={400}>
              {data.label}
            </Text>
            <div className="flex flex-col gap-3">
              <Text size="lg" fw={700}>
                {data.num}
              </Text>
              <Divider size="sm" color="#E4E7EC" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default DivisionSaleChart;
