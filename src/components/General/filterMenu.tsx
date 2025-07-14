import { useState } from "react";
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
}

function DateFilterMenu({
  onDateFilterChange,
  disabled = false,
  className,
  style,
}: DateFilterMenuProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const handleStartChange = (startDate: Date | null) => {
    const updatedRange = { ...dateRange, startDate };
    setDateRange(updatedRange);
    onDateFilterChange?.(updatedRange);
  };

  const handleEndChange = (endDate: Date | null) => {
    const updatedRange = { ...dateRange, endDate };
    setDateRange(updatedRange);
    onDateFilterChange?.(updatedRange);
  };


  return (
    <div className={`flex gap-4 items-center text-[#475367] ${className || ""}`} style={style}>
      <DatePickerInput
        placeholder="Start Date"
        value={dateRange.startDate}
        onChange={handleStartChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
        styles={{
          input: {
            color: '#1D2939',
            fontWeight: 500,

          },
          placeholder: {
            color: '#667085',
          },
        }}
      />
      <DatePickerInput
        placeholder="End Date"
        value={dateRange.endDate}
        onChange={handleEndChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
        styles={{
          input: {
            color: '#1D2939', 
            fontWeight: 500,

          },
          placeholder: {
            color: '#667085', 
          },
        }}
      />
     
    </div>
  );
}

export default DateFilterMenu;

