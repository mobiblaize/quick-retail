import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { returnsAnalyticsData } from "../../../../utils/mockData";
import AnalyticsCard from "../../../General/card";

const ReturnsReportAnalytics = () => {
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
          />
        </Group>
      </header>
      <section className="flex overflow-auto gap-2 mt-2.5">
        {returnsAnalyticsData.map((card, index) => (
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
