import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart,
  TooltipProps,
} from "recharts";
import { Text, Box, Stack, useMantineTheme } from "@mantine/core";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  const theme = useMantineTheme();

  if (!active || !payload || !payload.length) return null;

  return (
    <Box
      p="sm"
      style={{
        backgroundColor: theme.white,
        borderRadius: theme.radius.sm,
        boxShadow: theme.shadows.sm,
        border: `1px solid ${theme.colors.gray[3]}`,
      }}
    >
      <Text size="sm" fw={600}>
        {label} {/* Month */}
      </Text>
      <Stack gap="xs" mt="xs">
        {payload.map((entry, index) => (
          <Box
            key={`tooltip-item-${index}`}
            style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}
          >
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: entry.color,
              }}
            />
            <Text size="sm" color="dimmed">
              {entry.name}: <Text component="span" fw={600}>{entry.value}</Text>
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

const CustomLegend = ({ payload }: { payload?: { value: string; color: string }[] }) => {
  const theme = useMantineTheme();
  if (!payload) return null;

  return (
    <Box style={{ display: "flex", gap: theme.spacing.md, justifyContent: "center", mt: theme.spacing.sm }}>
      {payload.map((entry, index) => (
        <Box key={index} style={{ display: "flex", alignItems: "center", gap: theme.spacing.sm }}>
          <Box style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: entry.color }} />
          <Text size="sm">{entry.value}</Text>
        </Box>
      ))}
    </Box>
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
  lines: { dataKey: string; color: string; name?: string }[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  xAxisDataKey?: string;
  yAxisFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  highlightedPoint?: HighlightedPoint;
  yAxisLabel?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  lines,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  xAxisDataKey = "month",
  yAxisFormatter = (value) => `₦${value.toLocaleString()}`,
  tooltipFormatter,
  highlightedPoint,
  yAxisLabel,
}) => {
  const theme = useMantineTheme();

  return (
    <Box style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 30, left: 60, bottom: 10 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.colors.gray[3]} />}

          {/* X Axis - Months */}
          <XAxis
            dataKey={xAxisDataKey}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{
              fontFamily: theme.fontFamily,
              fontWeight: 500,
              fontSize: 14,
              fill: theme.colors.gray[7],
            }}
          />

          {/* Y Axis - Amounts */}
          <YAxis
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={{
              fontFamily: theme.fontFamily,
              fontWeight: 500,
              fontSize: 14,
              fill: theme.colors.gray[7],
            }}
            tickFormatter={yAxisFormatter}
            label={{
              value: yAxisLabel || "",
              angle: -90,
              position: "insideLeft",
              offset: -20,
              style: { textAnchor: "middle", fill: theme.colors.gray[6], fontFamily: theme.fontFamily, fontWeight: 600 },
            }}
          />

          {showTooltip && <Tooltip content={<CustomTooltip />} formatter={tooltipFormatter} />}
          {showLegend && <Legend content={<CustomLegend />} />}

          {/* Gradients for areas */}
          <defs>
            {lines.map((line, index) => (
              <linearGradient key={index} id={`color-${line.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color} stopOpacity={0.5} />
                <stop offset="95%" stopColor={line.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          {lines.map((line, index) => (
            <Area key={`area-${index}`} type="monotone" dataKey={line.dataKey} fill={`url(#color-${line.dataKey})`} stroke="none" fillOpacity={1} />
          ))}

          {lines.map((line, index) => (
            <Line
              key={`line-${index}`}
              type="monotone"
              dataKey={line.dataKey}
              stroke={line.color}
              strokeWidth={2}
              name={line.name || line.dataKey}
              dot={false}
              activeDot={{ r: 6, fill: line.color, stroke: theme.white, strokeWidth: 2 }}
            />
          ))}

          {highlightedPoint && (
            <Tooltip
              position={{ x: 0, y: 0 }}
              content={
                <Box
                  style={{
                    backgroundColor: theme.colors.orange[6],
                    color: theme.white,
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                  }}
                >
                  <Text fw={600} size="sm">
                    {highlightedPoint.label}
                  </Text>
                </Box>
              }
              wrapperStyle={{
                visibility: "visible",
                pointerEvents: "none",
                position: "absolute",
                transform: "translate(-50%, -100%)",
              }}
              coordinate={{
                x: data.findIndex((item) => item.month === highlightedPoint.month) * (100 / data.length),
                y: highlightedPoint.value,
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default LineChart;

