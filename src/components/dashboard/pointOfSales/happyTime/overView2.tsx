import { Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import house from "../../../../assets/images/house.png";
import dollar from "../../../../assets/images/naira1.png";
// @ts-ignore
const AnalysisOverview1 = ({ stats }) => { 
  const statsData = stats
    ? [
        {
          title: "TOTAL DISCOUNT VALUE",
          value: `₦${Number(stats.total_discount_value).toLocaleString()}`,      
          icon: house, 
          altText: "dollar-sign",
          iconColor: "#E17036",
          textColor: "white",
          cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
          // percentageValue: 0,
          borderColor: "#BAE6FD",
        },
        {
          title: "TOTAL DISCOUNTS",
          value: stats.total_discounts,
          icon: dollar,
          altText: "Discount Icon",
          iconColor: "#E17036",
          cardBgColor: "#EFF8FF",
          borderColor: "#98A2B3",
          // percentageValue: 0,
        },
        {
          title: "REDEMPTION (USED DISCOUNTS)",
          value: stats.total_redemptions,
          icon: dollar,
          iconColor: "#E17036",
          cardBgColor: "#F4F3FF",
          // percentageValue: 0,
          borderColor: "#98A2B3",
          altText: "customer-icon",
        },
      ]
    : [];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
          Discount Overview
          </Text>
          <Text size="sm">An overview of discounts created and used</Text>
        </div>
        {/* <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly
          />
        </Group> */}
      </header>
      <section className="flex md:flex-row flex-col gap-4 overflow-auto gap-2 mt-2.5">
      {statsData.map((card, index) => (
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
              // percentageValue={card.percentageValue}
              borderColor={card.borderColor}
            />
          )
        )}
      </section>
    </main>
  );
};

export default AnalysisOverview1;
