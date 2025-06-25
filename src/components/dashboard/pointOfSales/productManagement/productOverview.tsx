// components/SalesOverview.tsx
import { Group, Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/dollarSign.png";
import greenOrders from "../../../../assets/images/greenOrders.png";
import orangePeople from "../../../../assets/images/orangePeople.png";
import DateFilterMenu from "../../../General/filterMenu";

interface TransactionData {
    total_revenue: string;
  active: number;
  inactive?: number;
}

interface TransactionOverviewProps {
  data: TransactionData;
  isLoading: boolean;
  setDateRange: (range: { startDate: string; endDate: string }) => void;
}

const ProductOverview: React.FC<TransactionOverviewProps> = ({
  data,
  setDateRange,
}) => {
  const currencySymbol = "₦";

  const formattedValue = data?.total_revenue
    ? `${currencySymbol}${Number(data.total_revenue).toLocaleString()}`
    : `${currencySymbol}0`;

  const cards = [
    {
      title: "TOTAL PODUCT VALUE ",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      altText: "dollar-sign",
    },
    {
      title: "ACTIVE PRODUCTS",
      value: data?.active ?? "0",
      icon: greenOrders,
      iconColor: "#E17036",
      cardBgColor: "#E7F6EC",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "INACTIVE PRODUCTS",
      value: data?. inactive ?? "0",
      icon: orangePeople,
      iconColor: "#E17036",
      cardBgColor: "#FEF6E7",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
         Sales overview
          </Text>
          <Text size="sm">This is an overview summarizing sales</Text>
        </div>
        <Group>
          <DateFilterMenu
            onDateFilterChange={({ startDate, endDate }) =>
              setDateRange({
                startDate: startDate?.toISOString().split("T")[0] || "",
                endDate: endDate?.toISOString().split("T")[0] || "",
              })
            }
          />
        </Group>
      </header>

      <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
        {cards.map((card, index) => (
          <AnalyticsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={<img src={card.icon} alt={card.altText} />}
            iconColor={card.iconColor}
            textColor={card.textColor}
            cardBgColor={card.cardBgColor}
            borderColor={card.borderColor}
          />
        ))}
      </section>
    </main>
  );
};

export default ProductOverview;

