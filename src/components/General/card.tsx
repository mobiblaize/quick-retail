import { ReactNode } from "react";
import { Text, Group, Card, useMantineTheme, rem } from "@mantine/core";
import { ArrowIcon } from "../../assets/svg";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
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
}) => {
  const theme = useMantineTheme();
  const defaultBgColor = cardBgColor || theme.colors.customPrimary[6];

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width,
    height,
  };

  if (defaultBgColor.includes("gradient")) {
    cardStyle["background"] = defaultBgColor;
  } else {
    cardStyle["backgroundColor"] = defaultBgColor;
  }

  return (
    <Card 
      // Responsive padding: 'md' (16px) on mobile, 'lg' (20px) on desktop
      p={{ base: "md", sm: "lg" }} 
      radius="md" 
      style={cardStyle}
    >
      {icon && <div>{icon}</div>}
      
      <Text 
        c={textColor} 
        size="xs" 
        fw={700} 
        mt="xs" 
        tt={"uppercase"}
      >
        {title}
      </Text>

      <Text
        c={textColor}
        // Responsive Font Size: 20px on mobile, 24px on desktop
        fz={{ base: rem(13), lg: rem(24) }}
        fw="600"
        style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "8px", 
          flexWrap: "wrap" // Ensures percentage wraps if value is very long on mobile
        }}
      >
        {value}
        
        {percentageValue !== undefined && (
          <Group
            gap="xs"
            wrap="nowrap"
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