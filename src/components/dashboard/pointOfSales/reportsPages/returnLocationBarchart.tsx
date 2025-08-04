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
    store: item.store,
    resolved: Number(item.approved),
    declined: Number(item.declined ?? 0),
  }));

  return (
    <div className="w-full h-auto">
      {/* <Text size="xl" fw={600} c="textSecondary.9" mb={8}>
        Location Status Overview
      </Text> */}

      {chartData.length > 0 ? (
        <>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="store" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="resolved" stackId="a" fill="#2A9D90" name="Resolved" />
                <Bar dataKey="declined" stackId="a" fill="#E76E50" name="Declined" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 mt-3 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#2A9D90" }} />
              <Text size="sm">Resolved</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#E76E50" }} />
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
