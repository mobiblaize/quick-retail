import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import AnalyticsCard from "../../../General/card";
import { useFetchDiscountStat } from "../../../../hooks/backendApis/pos/discount";
import house from "../../../../assets/images/house.png";
import dollar from "../../../../assets/images/dollarSign.png";

const AnalysisOverview = () => {
  const { data,} = useFetchDiscountStat();

  const statsData = data?.data
    ? [
        {
          title: "Total Redemption",
          value: data.data.total_redemption,
          icon: house, 
          altText: "dollar-sign",
          iconColor: "#E17036",
          textColor: "white",
          cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
          // percentageValue: 0,
          borderColor: "#BAE6FD",
        },
        {
          title: "Total Amount",
          value: `₦${data.data.total_amount.toLocaleString()}`,
          icon: dollar,
          altText: "Discount Icon",
          iconColor: "#E17036",
          cardBgColor: "#EFF8FF",
          borderColor: "#98A2B3",
          // percentageValue: 0,
        },
        {
          title: "New Amount",
          value: `₦${data.data.new_amount.toLocaleString()}`,
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
            Analysis overview
          </Text>
          <Text size="sm">An overview sales made</Text>
        </div>
        <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly
          />
        </Group>
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

export default AnalysisOverview;
