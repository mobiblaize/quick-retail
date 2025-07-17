import {  Text } from "@mantine/core";
import { Key } from "react";
import AnalyticsCard from "../../../General/card";
import house from "../../../../assets/images/house.png";
import activeStore from "../../../../assets/images/activeStore.png";
import inactiveStore from "../../../../assets/images/inactiveStore.png";

interface TransactionData {
  total_stores: string;
  active_stores: number;
  inactive_stores?: any;
}

interface TransactionOverviewProps {
  data: TransactionData;
  isLoading: boolean;
  setDateRange: (range: { startDate: string; endDate: string }) => void;
}

const AnalysisOverview: React.FC<TransactionOverviewProps> = ({
  data,

}) => {
  const cards = [
    {
      title: "Total Stores",
      value: data?.total_stores,
      icon: house,
      altText: "Total Stores",
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      percentageValue: 0.5,
      borderColor: "#b3d8ff",
    },
    {
      title: "Active Stores",
      value: data?.active_stores,
      icon: activeStore,
      altText: "Active Stores",
      iconColor: "#E17036",
      textColor: "#667185",
      cardBgColor: "#EFF8FF",
      percentageValue: 0.5,
      borderColor: "#98A2B3",
    },
    {
      title: "Inactive Stores",
      value: data?.inactive_stores,
      icon: inactiveStore,
      altText: "Inactive Stores",
      iconColor: "#E17036",
      textColor: "#667185",
      cardBgColor: "#F4F3FF",
      percentageValue: 0.5,
      borderColor: "#98A2B3",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Analysis overview
          </Text>
          <Text size="sm">An overview sales made</Text>
        </div>
        {/* <Group>
          <DateFilterMenu
            onDateFilterChange={({ startDate, endDate }) =>
              setDateRange({
                startDate: startDate?.toISOString().split("T")[0] || "",
                endDate: endDate?.toISOString().split("T")[0] || "",
              })
            }
          />
        </Group> */}
      </header>
      <section className="flex overflow-auto md:flex-row flex-col gap-4 mt-2.5">
        {cards?.map(
          (
            card: {
              title: string;
              value: string | number;
              icon: string | undefined;
              altText: string | undefined;
              iconColor: string | undefined;
              textColor: string | undefined;
              cardBgColor: string | undefined;
              percentageValue: number | undefined;
              borderColor: string | undefined;
            },
            index: Key | null | undefined
          ) => (
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
