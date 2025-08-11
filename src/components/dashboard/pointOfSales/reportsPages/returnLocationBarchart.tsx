import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Text } from "@mantine/core";

interface LocationStatus {
  store: string;
  approved: number;
  declined?: number;
}

interface Props {
  data: LocationStatus[];
}

const LocationBarChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
  //  @ts-ignore
    store: item.store || item.location_name, 
    resolved: Number(item.approved),
    declined: Number(item.declined ?? 0),
  }));
  console.log(
    "Store names in chart data:",
    chartData.map((d) => d.store)
  );
  return (
    <div className="w-full h-auto">
   

      {chartData.length > 0 ? (
        <>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="store"
                  tick={{ fontSize: 16, dx: 60 }}
                  interval={0}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar
                  dataKey="resolved"
                  stackId="a"
                  fill="#2A9D90"
                  name="Resolved"
                />
                <Bar
                  dataKey="declined"
                  stackId="a"
                  fill="#E76E50"
                  name="Declined"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: "#2A9D90" }}
              />
              <Text size="sm">Resolved</Text>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: "#E76E50" }}
              />
              <Text size="sm">Declined</Text>
            </div>
          </div>
        </>
      ) : (
        <Text>No data available</Text>
      )}
    </div>
  );
};

export default LocationBarChart;
