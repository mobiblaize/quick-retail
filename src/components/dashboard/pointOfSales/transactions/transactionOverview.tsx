import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/dollarSign.png";
import orders from "../../../../assets/images/orders.png";

interface TransactionData {
  total_transaction_value: string;
  total_transaction_volume: number;
  transactions?: any;
}

interface TransactionOverviewProps {
  data: TransactionData;
  isLoading: boolean;
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({
  data,
  // isLoading,
}) => {
  const currencySymbol = "₦";

  const formattedValue = data?.total_transaction_value
    ? `${currencySymbol}${Number(
        data.total_transaction_value
      ).toLocaleString()}`
    : `${currencySymbol}0`;

  const cards = [
    {
      title: "TOTAL TRANSACTION VALUE",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      // percentageValue: 0,
      altText: "dollar-sign",
    },

    {
      title: "TOTAL TRANSACTION VOLUME",
      value: data?.total_transaction_volume ?? "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#EFF8FF",
      // percentageValue: 0,
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
  ];
  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Transaction overview
          </Text>
          <Text size="sm">An overview of transaction of sales</Text>
        </div>
        <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly="sm"
          />
        </Group>
      </header>
      <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
        {cards.map((card, index) => (
          <AnalyticsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={
              <div>
                <img src={card.icon} alt={card.altText} />
              </div>
            }
            iconColor={card.iconColor}
            textColor={card.textColor}
            cardBgColor={card.cardBgColor}
            // percentageValue={card.percentageValue}
            borderColor={card.borderColor}
          />
        ))}
      </section>
    </main>
  );
};

export default TransactionOverview;
