import { Group, Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import orangeBox from "../../../../assets/images/orangeBox.png";
import goldBox from "../../../../assets/images/goldBox.png";
import greenBox from "../../../../assets/images/greenBox.png";
import DateFilterMenu from "../../../General/filterMenu";

type ReturnsReportAnalyticsProps = {
  reportData: any;
  startDate: string;
  endDate: string;
};

const ReturnsReportAnalytics = ({ reportData,  }: ReturnsReportAnalyticsProps) => {
  const stats = reportData?.stats;
 
  
  const cards = [
    {
      title: "Total Returned Products",
      value: stats?.total_returned_products ?? 0,
      icon: orangeBox,
    iconColor: "#E17036",
    textColor: "white",
    cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
    altText: "dollar-sign",
    },
    {
      title: "Total Pending Complaints",
      value: stats?.total_pending_complaints ?? 0,
      icon: goldBox,
    iconColor: "#E17036",
    cardBgColor: "#FEF6E7",
    borderColor: "#98A2B3",
    altText: "orders-icon",
    },
    {
      title: "Total Resolved Complaints",
      value: stats?.total_resolved_complaints ?? 0,
      icon: greenBox,
      iconColor: "#E17036",
      cardBgColor: "#F0FDF9",
      borderColor: "#98A2B3",
      altText: "customer-icon",
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

      <section className="grid grid-cols-1 md:grid-cols-3 overflow-auto gap-4 md:gap-2 mt-2.5">
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
            borderColor={card.borderColor}
          />
        ))}
      </section>
    </main>
  );
};

export default ReturnsReportAnalytics;
