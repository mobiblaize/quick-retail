import { ReactNode } from "react";
import { Text, Group, Card, useMantineTheme } from "@mantine/core";
import { ArrowIcon } from "../../assets/svg";
import { BlackNaira, RedNaira } from "../../assets/svg/index";

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
  openBillsText?: string;
  overdueBillsText?: string;
  openBillsValue?: number;
  overdueBillsValue?: number;
  lightColor?: string;
  nairaColor?:string;
}

const ProfitCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  cardBgColor,
  textColor = "#667185",
  percentageValue,
  width = "100%",
  height = "auto",
  borderColor,
  openBillsText,
  overdueBillsText,
  openBillsValue,
  overdueBillsValue,
  lightColor,
  nairaColor,
}) => {
  const theme = useMantineTheme();

  const defaultBgColor = cardBgColor || theme.colors.customPrimary[6];

  // const toSentenceCase = (text: string) => 
  // text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : '';

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

      <Text   c={lightColor} size="xs" fw={700} mt="xs" tt={"uppercase"}>
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
<Text
  c={lightColor}
  size="xs"
  fw={700}
  mt="xs"
  style={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  {openBillsText}
  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', color: nairaColor, }}>
    <BlackNaira /> {openBillsValue}
  </div>

</Text>
<Text
  c={lightColor}
  size="xs"
  fw={700}
  mt="xs"
  style={{
    display: 'flex',
    alignItems: 'center',
  }}
>
  {overdueBillsText}
  <div
    style={{
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    }}
  >
    <RedNaira />
    <Text c="red" size="xs" fw={700}>
      {overdueBillsValue}
    </Text>
  </div>
</Text>

  
    </Card>
  );
};

export default ProfitCard;
