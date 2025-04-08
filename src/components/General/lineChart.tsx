import React from "react";
import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  TooltipProps,
  Area,
  ComposedChart,
} from "recharts";
import { Text } from "@mantine/core";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md border border-gray-200">
        <Text size="sm" fw={600}>
          {label}
        </Text>
        {payload.map((entry, index) => (
          <div
            key={`tooltip-item-${index}`}
            className="flex items-center gap-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <Text size="sm" c="dimmed">
              {entry.name}:{" "}
              <Text component="span" fw={600}>
                {entry.value}
              </Text>
            </Text>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

interface LegendPayload {
  value: string;
  color: string;
  type?: string;
  id?: string;
}

const CustomLegend = ({ payload }: { payload?: LegendPayload[] }) => {
  return (
    <div className="flex gap-4 justify-center mt-2">
      {payload &&
        payload.map((entry, index) => (
          <div key={`legend-item-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <Text size="sm">{entry.value}</Text>
          </div>
        ))}
    </div>
  );
};

export interface DataPoint {
  month: string;
  [key: string]: string | number;
}

interface HighlightedPoint {
  month: string;
  value: number;
  dataKey: string;
  label: string;
}

interface LineChartProps {
  data: DataPoint[];
  lines: {
    dataKey: string;
    color: string;
    name?: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisDataKey?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  highlightedPoint?: HighlightedPoint;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisDataKey = "month",
  yAxisFormatter = (value) => `${value}M`,
  tooltipFormatter,
  highlightedPoint,
}) => {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
          )}

          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 12, fill: "#666" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{ fontSize: 12, fill: "#666" }}
            tickFormatter={yAxisFormatter}
          />

          {showTooltip && (
            <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />
          )}

          {showLegend && <Legend content={<CustomLegend />} />}

          {/* Define gradients for each line */}
          <defs>
            {lines.map((line, index) => (
              <linearGradient
                key={`gradient-${index}`}
                id={`color-${line.dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={line.color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={line.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          {/* Improved Area beneath lines with gradient */}
          {lines.map((line, index) => (
            <Area
              key={`area-${index}`}
              type="monotone"
              dataKey={line.dataKey}
              fill={`url(#color-${line.dataKey})`}
              stroke="none"
              fillOpacity={1}
            />
          ))}

          {/* Lines on top */}
          {lines.map((line, index) => (
            <Line
              key={`line-${index}`}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              name={line.name || line.dataKey}
              dot={false}
              activeDot={{
                r: 6,
                fill: line.color,
                stroke: "#fff",
                strokeWidth: 2,
              }}
            />
          ))}

          {highlightedPoint && (
            <Tooltip
              position={{ x: 0, y: 0 }}
              content={
                <div className="bg-orange-500 text-white px-3 py-1 rounded-md shadow-md">
                  <Text fw={600} size="sm">
                    {highlightedPoint.label}
                  </Text>
                </div>
              }
              wrapperStyle={{
                visibility: "visible",
                pointerEvents: "none",
                position: "absolute",
                transform: "translate(-50%, -100%)",
              }}
              coordinate={{
                x:
                  data.findIndex(
                    (item) => item.month === highlightedPoint.month
                  ) *
                  (100 / data.length),
                y: highlightedPoint.value,
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
