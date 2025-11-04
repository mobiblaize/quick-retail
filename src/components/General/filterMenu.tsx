import { useEffect, useState } from "react";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateFilterMenuProps {
  onDateFilterChange?: (dateRange: DateRange) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  startDate?: string;
  endDate?: string;
}

function DateFilterMenu({
  onDateFilterChange,
  disabled = false,
  className,
  style,
  startDate,
  endDate,
}: DateFilterMenuProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // 🔹 Get today's date (prevent future selections)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 🔹 Sync props (startDate)
  useEffect(() => {
    setDateRange((prev) => ({
      ...prev,
      startDate: startDate ? new Date(startDate) : null,
    }));
  }, [startDate]);

  // 🔹 Sync props (endDate)
  useEffect(() => {
    setDateRange((prev) => ({
      ...prev,
      endDate: endDate ? new Date(endDate) : null,
    }));
  }, [endDate]);

  // 🔹 Handle start date change
  const handleStartChange = (startDate: Date | null) => {
    const updatedRange = { ...dateRange, startDate };

    // If start date is after end date → reset end date
    if (updatedRange.endDate && startDate && updatedRange.endDate < startDate) {
      updatedRange.endDate = null;
    }

    setDateRange(updatedRange);
    onDateFilterChange?.(updatedRange);
  };

  // 🔹 Handle end date change
  const handleEndChange = (endDate: Date | null) => {
    const updatedRange = { ...dateRange, endDate };
    setDateRange(updatedRange);
    onDateFilterChange?.(updatedRange);
  };

  return (
    <div
      className={`flex gap-4 items-center text-[#475367] ${className || ""}`}
      style={style}
    >
      {/* 🔹 Start Date */}
      <DatePickerInput
        placeholder="Start Date"
        value={dateRange.startDate}
        onChange={handleStartChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
        maxDate={today} // ✅ cannot pick beyond today
        styles={{
          input: { color: "#1D2939", fontWeight: 500, overflow: "hidden" },
          placeholder: { color: "#667085" },
        }}
      />

      {/* 🔹 End Date */}
      <DatePickerInput
        placeholder="End Date"
        value={dateRange.endDate}
        onChange={handleEndChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
        minDate={dateRange.startDate || undefined} // ✅ cannot pick before start date
        maxDate={today} // ✅ cannot pick beyond today
        styles={{
          input: { color: "#1D2939", fontWeight: 500, overflow: "hidden" },
          placeholder: { color: "#667085" },
        }}
      />
    </div>
  );
}

export default DateFilterMenu;
