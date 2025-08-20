import { Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/orangeNaira.png";
import greenOrders from "../../../../assets/images/greenOrders.png";
import orangePeople from "../../../../assets/images/orangePeople.png";

interface SalesOverviewReportProps {
  reportInfo: {
    startDate: string;
    endDate: string;
    locationId: string;
    reportData: {
      data: {
        stats: {
            total_actual_discount_value: string;
            total_discounts: number;
            total_redemptions: number;
        };
      };
    };
  };
}



const DiscountOverviewReport = ({ reportInfo }: SalesOverviewReportProps) => {
  const stats = reportInfo?.reportData?.data?.stats;

  const currencySymbol = "₦";

  const formattedValue = stats?.total_actual_discount_value
    ? `${currencySymbol}${Number(stats.total_actual_discount_value).toLocaleString()}`
    : `${currencySymbol}0`;

  const cards = [
    {
      title: "TOTAL DISCOUNT VALUE",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      altText: "dollar-sign",
    },
    {
      title: "TOTAL DISCOUNTS",
      value: stats?.total_discounts ?? "0",
      icon: greenOrders,
      iconColor: "#E17036",
      cardBgColor: "#E7F6EC",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "REDEMPTION (USED DISCOUNTS)",
      value: stats?.total_redemptions ?? "0",
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
            Discount overview
          </Text>
          <Text size="sm" className="text-gray-600 font-normal mb-4">An overview of discounts on your stores.</Text>
        </div>
      </header>

      <section className="flex md:flex-row flex-col gap-4 overflow-auto mt-2.5">
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

export default DiscountOverviewReport;
