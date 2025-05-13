import  { ReactNode } from "react";
import { Text, Card, useMantineTheme } from "@mantine/core";


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

const ReturnsAnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  cardBgColor,
  textColor = "#667185",
  // percentageValue,
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
      <div className="flex justify-between ">
        <div className="flex flex-col">
          <Text
            c={textColor}
            fz="24px"
            fw="600"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            {value}
          </Text>
          <Text c={textColor} size="sm" fw={700} >
            {title}
          </Text>
        </div>
        {icon && <div>{icon}</div>}
      </div>
    </Card>
  );
};

export default ReturnsAnalyticsCard;
