import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../filterMenu";
import AnalyticsCard from "../card";
import { useEffect, useState } from "react";
import dollar from "../../../assets/images/dollarSign.png";
import orders from "../../../assets/images/orders.png";
import customer from "../../../assets/images/customers.png";
import { useFetchAnalysisOverview } from "../../../hooks/backendApis/pos/dashboard";

const OverviewBox = () => {
  const [isMobile, setIsMobile] = useState(false);

  const { data, isLoading, error } = useFetchAnalysisOverview();

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const cards = [
    {
      title: "Total Revenue Generated",
      value: data?.data?.totalRevenue || "₦0.00",
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      percentageValue: 0, 
      altText: "dollar-sign",

    },
    {
      title: "Total Orders",
      value: data?.data?.totalOrders?.toString() || "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#EFF8FF",
      percentageValue: 0,
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "Total Customers",
      value: data?.data?.totalCustomers?.toString() || "0",
      icon: customer,
    iconColor: "#E17036",
    cardBgColor: "#F4F3FF",
    percentageValue: 0,
    borderColor: "#98A2B3",
    altText: "customer-icon",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-3 sm:px-6 py-4 sm:py-8 rounded-lg bg-white">
      <header className="flex flex-row justify-between sm:items-center">
        <div className="flex flex-col mb-3 sm:mb-0">
          <Text size="xl" fw={600}>
            Analysis overview
          </Text>

          <Text size="sm">
            {isMobile
              ? "An Overview of sales made"
              : "This is an overview summarizing sales, highlighting key trends and strategies."}
          </Text>
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
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red">Failed to fetch data</Text>
        ) : (
          cards.map((card, index) => (
            <AnalyticsCard
              key={index}
              title={card.title}
              value={card.value}
              icon={<img src={card.icon} alt={card.title} className="w-6 h-6" />}
              iconColor={card.iconColor}
              textColor={card.textColor}
              cardBgColor={card.cardBgColor}
              borderColor={card.borderColor}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default OverviewBox;
