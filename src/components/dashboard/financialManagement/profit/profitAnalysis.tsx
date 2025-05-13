import { Group, Text } from "@mantine/core";
import { ProfitAnalysisOverviewData } from "../../../../utils/mockData";
import { useEffect, useState } from "react";
import DateFilterMenu from "../../../General/filterMenu";
import ProfitCard from "../../../General/profitCard";

const ProfitAnalysisBox = () => {
  const [isMobile, setIsMobile] = useState(false);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <main className="w-full h-auto overflow-auto px-3 sm:px-6 py-4 sm:py-8 rounded-lg bg-white">
      <header className="flex flex-row justify-between sm:items-center">
        <div className="flex flex-col mb-3 sm:mb-0 text-[#1D2739]">
          <Text size="xl" fw={600}>
      Profit Analysis
          </Text>

          {isMobile ? (
            <Text size="sm">
                </Text>
          ) : (
            <Text size="sm">
            </Text>
          )}
        </div>
        <Group className="mt-2 sm:mt-0">
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly="sm"
          />
        </Group>
      </header>
      <section className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5">
        {ProfitAnalysisOverviewData.map((card, index) => (
          <ProfitCard
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
            openBillsText={card.openBillsText}
            overdueBillsText={card.overdueBillsText}
            openBillsValue={card.openBillsValue}
            overdueBillsValue={card.overdueBillsValue}
          />
        ))}
        
      </section>
     
    </main>
  );
};

export default ProfitAnalysisBox;
