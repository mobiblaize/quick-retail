import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import AnalyticsCard from "../../../General/card";
import orangeBox from "../../../../assets/images/orangeBox.png";
import goldBox from "../../../../assets/images/goldBox.png";
import greenBox from "../../../../assets/images/greenBox.png";

interface ReturnsAnalyticsData {
  totalReturns: number;
  pending_complaints: number;
  resolved_complaints: number;
  declined_complaints: number;
}

interface ReturnsAnalyticsProps {
  data: ReturnsAnalyticsData;
}

const ReturnsAnalytics: React.FC<ReturnsAnalyticsProps> = ({ data }) => {
  const cards = [
    {
      title: "Total Returned Product",
      value: data?.totalReturns ?? 0,
      icon: orangeBox,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      percentageValue: 0,
      altText: "returned-product",
    },
    {
      title: "Complaints Pending",
      value: data?.pending_complaints ?? 0,
      icon: goldBox,
      iconColor: "#E17036",
      cardBgColor: "#FEF6E7",
      percentageValue: 0,
      borderColor: "#98A2B3",
      altText: "pending-complaints",
    },
    {
      title: "Complaints Resolved",
      value: data?.resolved_complaints ?? 0,
      icon: greenBox,
      iconColor: "#E17036",
      cardBgColor: "#F0FDF9",
      percentageValue: 0,
      borderColor: "#98A2B3",
      altText: "resolved-complaints",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Returns overview
          </Text>
          <Text size="sm">An overview of returns and refunds</Text>
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
      <section className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5">
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
            percentageValue={card.percentageValue}
            borderColor={card.borderColor}
          />
        ))}
      </section>
    </main>
  );
};

export default ReturnsAnalytics;
