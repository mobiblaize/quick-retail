import { Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { CustomerOverviewData } from "../../../../utils/mockData";
import AnalyticsCard from "../../../General/card";



const ViewCustomerBox = () => {
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
        <div className="flex flex-col mb-3 sm:mb-0">
          <Text size="xl" fw={600}>
          Orders Overview
          </Text>

          {isMobile ? (
            <Text size="sm"></Text>
          ) : (
            <Text size="sm">
    
            </Text>
          )}
        </div>
      
      </header>
      <section className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5">
        {CustomerOverviewData.map((card, index) => (
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

export default ViewCustomerBox;
