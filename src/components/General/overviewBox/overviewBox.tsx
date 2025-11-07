import { useEffect, useState } from "react";
import { Button, Group, Text } from "@mantine/core";
import DateFilterMenu from "../filterMenu";
import AnalyticsCard from "../card";
import dollar from "../../../assets/images/orangeNaira.png";
import orders from "../../../assets/images/orders.png";
import customer from "../../../assets/images/customers.png";
import { useFetchAnalysisOverview } from "../../../hooks/backendApis/pos/dashboard";

const OverviewBox = () => {
  const [isMobile, setIsMobile] = useState(false);

  // 🔹 Initial empty date range
  const initialDateRange = {
    start_date: "",
    end_date: "",
  };

  const [dateRange, setDateRange] = useState(initialDateRange);

  // 🔹 Fetch overview data based on date range
  const { data, isLoading, error } = useFetchAnalysisOverview(dateRange);

  // 🔹 Handle screen resizing for responsiveness
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 🔹 Reset both start & end date
  const handleReset = () => {
    setDateRange(initialDateRange);
  };

  // 🔹 Handle date filter changes
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

  // 🔹 Prepare data for cards
  const currencySymbol = "₦";
  const formattedValue = data?.data?.totalRevenue
    ? `${currencySymbol}${Number(data?.data?.totalRevenue).toLocaleString()}`
    : `${currencySymbol}0`;

  const cards = [
    {
      title: "Total Revenue Generated",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      borderColor: "#98A2B3",
      altText: "dollar-sign",
    },
    {
      title: "Total Orders",
      value: data?.data?.totalOrders?.toString() || "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#EFF8FF",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
    {
      title: "Total Customers",
      value: data?.data?.totalCustomers?.toString() || "0",
      icon: customer,
      iconColor: "#E17036",
      cardBgColor: "#F4F3FF",
      borderColor: "#98A2B3",
      altText: "customer-icon",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-3 sm:px-6 py-4 sm:py-8 rounded-lg bg-white">
      {/* 🔹 Header */}
      <header className="grid gap-3 sm:flex sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Analytics Overview
          </Text>

          <Text size="sm">
            {isMobile
              ? "An overview of sales made"
              : "This is an overview summarizing sales, highlighting key trends and strategies."}
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

      {/* 🔹 Cards Section */}
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

export default OverviewBox;
