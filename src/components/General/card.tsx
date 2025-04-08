import React, { ReactNode } from "react";
import { Box, Text, Group, Card, useMantineTheme } from "@mantine/core";
import { ArrowIcon } from "../../assets/svg";

interface AnalyticsCardProps {
  title: string;
  value: string | number;

  // Optional props
  icon?: ReactNode;
  iconColor?: string;
  cardBgColor?: string;
  textColor?: string;
  percentageValue?: number;
  width?: string | number;
  height?: string | number;
  borderColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  cardBgColor,
  textColor = "#667185",
  percentageValue,
  width = "100%",
  height = "auto",
  borderColor,
}) => {
  const theme = useMantineTheme();

  const defaultBgColor = cardBgColor || theme.colors.customPrimary[6];

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width,
    height,
    boxShadow: borderColor ? `0 0 0 0.5px ${borderColor}` : "none",
  };

  if (defaultBgColor.includes("gradient")) {
    cardStyle["background"] = defaultBgColor;
  } else {
    cardStyle["backgroundColor"] = defaultBgColor;
  }

  return (
    <Card p="lg" radius="md" style={cardStyle}>
      {icon && <div>{icon}</div>}

      <Text c={textColor} size="xs" fw={700} mt="xs" tt={"uppercase"}>
        {title}
      </Text>

      <Text c={textColor} fz="24px" fw="600">
        {value}
      </Text>
      {percentageValue !== undefined && (
        <Box>
          <Group
            justify="center"
            gap="xs"
            style={{
              borderRadius: "1rem",
              padding: "4px 12px",
              display: "inline-flex",
              backgroundColor: "#E7F6EC",
            }}
          >
            <Text c="#036B26" size="sm" fw={500}>
              {percentageValue}
            </Text>
            <ArrowIcon />
          </Group>
        </Box>
      )}
    </Card>
  );
};

export default AnalyticsCard;
