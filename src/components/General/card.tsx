import  { ReactNode } from "react";
import { Text, Group, Card, useMantineTheme } from "@mantine/core";
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
  lightColor?: string;
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
  // lightColor,
}) => {
  const theme = useMantineTheme();

  const defaultBgColor = cardBgColor || theme.colors.customPrimary[6];

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width,
    height,
    border: borderColor ? `1px solid ${borderColor}` : undefined,
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

      <Text c={textColor} fz="24px" fw="600" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
  {value}
  {percentageValue !== undefined && (
    <Group
      gap="xs"
      style={{
        borderRadius: "0.8rem",
        padding: "4px 8px",
        display: "inline-flex",
        backgroundColor: "#E7F6EC",
      }}
    >
      <Text c="#036B26" size="sm" fw={500}>
        {percentageValue}
      </Text>
      <ArrowIcon />
    </Group>
  )}
</Text>

    </Card>
  );
};

export default AnalyticsCard;
