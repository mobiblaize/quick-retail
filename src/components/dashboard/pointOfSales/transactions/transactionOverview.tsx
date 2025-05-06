import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { transactionOverviewData } from "../../../../utils/mockData";
import AnalyticsCard from "../../../General/card";

const TransactionOverview = () => {
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
        {transactionOverviewData.map((card, index) => (
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

export default TransactionOverview;
