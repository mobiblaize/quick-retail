import { useEffect, useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import DateFilterMenu from "../filterMenu";
import AnalyticsCard from "../card";
import customer from "../../../assets/images/RedBodies.png";
import { useFetchUsers } from "../../../hooks/backendApis/admin/userManagement";

const UserOverviewBox = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 🔹 initial empty state
  const initialDateRange = {
    start_date: "",
    end_date: "",
  };

  const [dateRange, setDateRange] = useState(initialDateRange);

  // 🔹 fetch users with the selected date range
  const { data, isLoading, error } = useFetchUsers(dateRange);

  // 🔹 responsiveness
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 🔹 reset both start & end date
  const handleReset = () => {
    setDateRange(initialDateRange);
  };

  // 🔹 handle filter date changes
  const handleDateFilterChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    setDateRange({
      start_date: dates.startDate
        ? dates.startDate.toISOString().split("T")[0]
        : "",
      end_date: dates.endDate ? dates.endDate.toISOString().split("T")[0] : "",
    });
  };

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
      iconColor: "#099137",
      textColor: "white",
      cardBgColor: "#F16722",
      borderColor: "#98A2B3",
      altText: "total-users",
    },
    {
      title: "Total Active Users",
      value: stats.activeUsers.toString(),
      icon: customer,
      iconColor: "#099137",
      cardBgColor: "#E7F6EC",
      borderColor: "#98A2B3",
      innerColor: "#099137",
      altText: "active-users",
    },
    {
      title: "Total Inactive Users",
      value: stats.inactiveUsers.toString(),
      icon: customer,
      iconColor: "#099137",
      cardBgColor: "#FBEAE9",
      borderColor: "#98A2B3",
      altText: "inactive-users",
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

        {/* 🔹 Date Filter + Reset Button */}
        <div className="flex items-center gap-3">
          <Group className="sm:mt-0">
            <DateFilterMenu
              onDateFilterChange={handleDateFilterChange}
              startDate={dateRange.start_date}
              endDate={dateRange.end_date}
            />
          </Group>

          {/* 🔹 Show Reset button only if both dates exist */}
          {dateRange.start_date && dateRange.end_date && (
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          )}
        </div>
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
                <img
                  src={card.icon}
                  alt={card.altText}
                  className="w-8 h-8 rounded-lg bg-[#FFECE5]"
                />
              }
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

export default UserOverviewBox;
