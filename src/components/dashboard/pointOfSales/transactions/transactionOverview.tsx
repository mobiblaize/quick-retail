import { Button, Group, Text } from "@mantine/core";
import AnalyticsCard from "../../../General/card";
import dollar from "../../../../assets/images/orangeNaira.png";
import orders from "../../../../assets/images/orders.png";
import DateFilterMenu from "../../../General/filterMenu";
import { useState } from "react";

interface TransactionData {
  total_transaction_value: string;
  total_transaction_volume: number;
  transactions?: any;
}

interface TransactionOverviewProps {
  data: TransactionData;
  isLoading: boolean;
  onDateRangeChange: (range: { startDate: string; endDate: string }) => void;
}

const TransactionOverview: React.FC<TransactionOverviewProps> = ({
  data,
  onDateRangeChange,
  // isLoading,
}) => {
  const currencySymbol = "₦";

  const initialDateRange = {
    start_date: "",
    end_date: "",
  };

  const [dateRange, setDateRange] = useState(initialDateRange);

  // 🔹 Reset filter
  const handleReset = () => {
    setDateRange(initialDateRange);
    onDateRangeChange({ startDate: "", endDate: "" });
  };

  // 🔹 Handle date change
  const handleDateFilterChange = (dates: {
    startDate: Date | null;
    endDate: Date | null;
  }) => {
    const start_date = dates.startDate
      ? dates.startDate.toISOString().split("T")[0]
      : "";
    const end_date = dates.endDate
      ? dates.endDate.toISOString().split("T")[0]
      : "";

    setDateRange({ start_date, end_date });
    onDateRangeChange({ startDate: start_date, endDate: end_date });
  };

  // 🔹 Format sales value
  const formattedValue = data?.total_transaction_value
    ? `${currencySymbol}${Number(
        data.total_transaction_value
      ).toLocaleString()}`
    : `${currencySymbol}0`;

  // 🔹 Card data
  const cards = [
    {
      title: "TOTAL TRANSACTION VALUE",
      value: formattedValue,
      icon: dollar,
      iconColor: "#E17036",
      textColor: "white",
      cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
      altText: "dollar-sign",
    },
    {
      title: "TOTAL TRANSACTION VOLUME",
      value: data?.total_transaction_volume ?? "0",
      icon: orders,
      iconColor: "#E17036",
      cardBgColor: "#EFF8FF",
      borderColor: "#98A2B3",
      altText: "orders-icon",
    },
  ];

  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="flex flex-col mb-3 sm:mb-0">
          <Text size="xl" fw={500} c="textSecondary.9">
            Transaction Overview
          </Text>
          <Text size="sm">An overview of sales transactions</Text>
        </div>

        <div className="flex items-center gap-3">
          <Group>
            <DateFilterMenu
              onDateFilterChange={handleDateFilterChange}
              startDate={dateRange.start_date}
              endDate={dateRange.end_date}
            />
          </Group>

          {dateRange.start_date && dateRange.end_date && (
            <Button onClick={handleReset} variant="outline">
              Reset
            </Button>
          )}
        </div>
      </header>

      {/* Cards */}
      <section className="flex md:flex-row flex-col gap-4 overflow-auto mt-2.5">
        {cards.map((card, index) => (
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

export default TransactionOverview;
