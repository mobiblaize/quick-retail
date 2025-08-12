import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../filterMenu";
import AnalyticsCard from "../card";
import { useEffect, useState } from "react";
import customer from "../../../assets/images/RedBodies.png";
import { useFetchUsers } from "../../../hooks/backendApis/admin/userManagement";

const  UserOverviewBox = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: "",
    end_date: "",
  });

  // 👇 Connect to your new API
  const { data, isLoading, error } = useFetchUsers(dateRange);

  const checkScreenSize = () => {
    setIsMobile(window.innerWidth < 640);
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [])

  const stats = data?.data?.stats || {
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
  };

  const cards = [
    {
      title: "Total Users",
      value: stats.totalUsers.toString(),
      icon: customer,
      iconColor: "#FFFFFF",
      // textColor: "white",
      // cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      cardBgColor: "#F4F3FF",
      percentageValue: 0,
       borderColor: "#98A2B3",
      altText: "dollar-sign",
    },
    {
      title: "Total Active Users",
      value: stats.activeUsers.toString(),
      icon: customer,
      iconColor: "#E17036",
      cardBgColor: "#EFF8FF",
      percentageValue: 0,
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "Total Inactive Users",
      value: stats.inactiveUsers.toString(),
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
     <header className="grid gap-3 sm:flex sm:flex-row sm:justify-between sm:items-center">
  <div className="flex flex-col">
    <Text size="xl" fw={600} c="textSecondary.9">
      User Overview
    </Text>
    <Text size="sm">
      {isMobile
        ? "This is an overview summarizing users"
        : "This is an overview summarizing users"}
    </Text>
  </div>

  <Group className="sm:mt-0">
    <DateFilterMenu
      onDateFilterChange={({ startDate, endDate }) =>
        setDateRange({
          //@ts-ignore
          start_date: startDate.toISOString().split("T")[0],
          //@ts-ignore
          end_date: endDate.toISOString().split("T")[0],
        })
      }
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
              icon={
                <img src={card.icon} alt={card.title} className="w-6 h-6" />
              }
              iconColor={card.iconColor}
              // textColor={card.textColor}
              cardBgColor={card.cardBgColor}
              borderColor={card.borderColor}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default UserOverviewBox;
