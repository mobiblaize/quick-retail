import { Group, Text } from "@mantine/core";
import {  inStoreOverviewData, } from "../../../../utils/mockData";
import { useEffect, useState } from "react";
import DateFilterMenu from "../../../General/filterMenu";
import ReturnsAnalyticsCard from "../../../General/returnsCard";

const InStoreBox = () => {
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
          Overview
          </Text>

          {isMobile ? (
            <Text size="sm">
                {/* An overview of all requests */}
                </Text>
          ) : (
            <Text size="sm">
              {/* An overview of all requests */}
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
      <section className="flex flex-col sm:flex-row overflow-auto gap-6 md:gap-2 mt-5 w-full lg:w-[70%]">
        {inStoreOverviewData.map((card, index) => (
          <ReturnsAnalyticsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={
              <div>
                <img src={card.icon}  />
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

export default InStoreBox;
