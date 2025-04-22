import { Text } from "@mantine/core";
import { storeAnalysisData } from "../../../../utils/mockData";
import AnalyticsCard from "../../../General/card";

const AnalysisOverview = () => {
  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Analysis overview
          </Text>
          <Text size="sm">An overview sales made</Text>
        </div>
      </header>
      <section className="flex overflow-auto md:flex-row flex-col gap-4  mt-2.5">
        {storeAnalysisData.map((card, index) => (
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

export default AnalysisOverview;
