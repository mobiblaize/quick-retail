// // components/DateFilterMenu.tsx

// import { useState, useEffect } from "react";
// import { Menu, Button, ButtonProps, Text } from "@mantine/core";
// import { ChevronDown } from "lucide-react";
// import { CalendaIcon } from "../../assets/svg";
// import { DatePickerInput } from "@mantine/dates";
// import { IconCalendar } from '@tabler/icons-react';

// type FilterOption = "Today" | "Last 7 Days" | "This Month" | "Custom Range";

// export interface DateRange {
//   startDate: Date;
//   endDate: Date;
// }

// interface DateFilterMenuProps {
//   onDateFilterChange?: (dateRange: DateRange) => void;
//   defaultFilter?: FilterOption;
//   buttonVariant?: ButtonProps["variant"];
//   buttonSize?: ButtonProps["size"];
//   disabled?: boolean;
//   className?: string;
//   style?: React.CSSProperties;
//   showIconOnly?: boolean | "sm" | "md" | "lg" | "xl";
// }

// function DateFilterMenu({
//   onDateFilterChange,
//   defaultFilter = "This Month",
//   buttonVariant = "subtle",
//   buttonSize = "sm",
//   disabled = false,
//   className,
//   style,
//   showIconOnly = "md",
// }: DateFilterMenuProps) {
//   const [selectedFilter, setSelectedFilter] =
//     useState<FilterOption>(defaultFilter);
//   const [isIconOnly, setIsIconOnly] = useState(false);

//   const [customDateRange, setCustomDateRange] = useState<DateRange | null>(
//     null
//   );

//   useEffect(() => {
//     const checkScreenSize = () => {
//       if (showIconOnly === true) {
//         setIsIconOnly(true);
//         return;
//       }

//       if (typeof showIconOnly === "string") {
//         const breakpoints = {
//           sm: 640,
//           md: 768,
//           lg: 1024,
//           xl: 1280,
//         };
//         const breakpoint = breakpoints[showIconOnly];
//         setIsIconOnly(window.innerWidth < breakpoint);
//       } else {
//         setIsIconOnly(false);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [showIconOnly]);

//   const handleFilterSelect = (filter: FilterOption): void => {
//     setSelectedFilter(filter);

//     const today = new Date();
//     let startDate: Date;
//     let endDate: Date;

//     switch (filter) {
//       case "Today":
//         startDate = today;
//         endDate = today;
//         break;
//       case "Last 7 Days":
//         startDate = new Date();
//         startDate.setDate(today.getDate() - 7);
//         endDate = today;
//         break;
//       case "This Month":
//         startDate = new Date(today.getFullYear(), today.getMonth(), 1);
//         endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
//         break;
//       case "Custom Range":
//              //@ts-ignore
//         startDate = customDateRange?.startDate;
//              //@ts-ignore
//         endDate = customDateRange.endDate;
//         break;
//       default:
//         startDate = today;
//         endDate = today;
//     }

//     if (onDateFilterChange) {
//       onDateFilterChange({ startDate, endDate });
//     }
//   };

//   const getResponsiveClasses = (isForLargeScreen = false) => {
//     if (typeof showIconOnly !== "string") return "";

//     return isForLargeScreen
//       ? `hidden ${showIconOnly}:block`
//       : `block ${showIconOnly}:hidden`;
//   };

//   const buttonClasses = `${className || ""} transition-all`;
//   const renderCustomRangePicker = () => (
//     <div className="flex gap-4 items-center">
//       <DatePickerInput
//         placeholder="Start Date"
//         value={customDateRange?.startDate || null}
//         onChange={(start) => {
//           const end = customDateRange?.endDate || null;
//           if (start && end) {
//             const range = { startDate: start, endDate: end };
//             setCustomDateRange(range);
//             onDateFilterChange?.(range);
//           } else {
//             //@ts-ignore
//             setCustomDateRange((prev) => ({ ...prev, startDate: start! }));
//           }
//         }}
//         leftSection={<IconCalendar size={16} />}
//         leftSectionPointerEvents="none"
//       />
//       <DatePickerInput
//         placeholder="End date"
//         value={customDateRange?.endDate || null}
//         onChange={(end) => {
//           const start = customDateRange?.startDate || null;
//           if (start && end) {
//             const range = { startDate: start, endDate: end };
//             setCustomDateRange(range);
//             onDateFilterChange?.(range);
//           } else {
//                  //@ts-ignore
//             setCustomDateRange((prev) => ({ ...prev, endDate: end! }));
//           }
//         }}
//         leftSection={<IconCalendar size={16} />}
//         leftSectionPointerEvents="none"
//       />
//       <Button
//         onClick={() => {
//           setSelectedFilter(defaultFilter);
//           setCustomDateRange(null);
//         }}
//         variant="outline"
//       >
//         X
//       </Button>
//     </div>
//   );

//   const renderFilterMenu = () => (
//     <Menu
//       trigger="click-hover"
//       loop={false}
//       withinPortal={false}
//       trapFocus={false}
//       menuItemTabIndex={0}
//       styles={(theme) => ({
//         dropdown: {
//           backgroundColor: "white",
//           border: `1px solid ${theme.colors.textSecondary?.[1] ?? "#D0D5DD"}`,
//           padding: theme.spacing.lg,
//           boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
//         },
//       })}
//     >
//       <Menu.Target>
//         <Button
//           variant={buttonVariant}
//           size={buttonSize}
//           disabled={disabled}
//           className={buttonClasses}
//           style={style}
//           leftSection={isIconOnly ? undefined : <CalendaIcon />}
//           rightSection={
//             isIconOnly ? undefined : (
//               <ChevronDown
//                 size={24}
//                 color="#667185"
//                 className={getResponsiveClasses(true)}
//               />
//             )
//           }
//           styles={(theme) => ({
//             root: {
//               border: `1px solid ${
//                 theme.colors.textSecondary?.[1] ?? "#D0D5DD"
//               }`,
//               color: "#101928",
//               backgroundColor: "white",
//               borderRadius: "8px",
//               "&:hover": {
//                 backgroundColor: theme.colors.gray[0],
//               },
//               ...(isIconOnly && {
//                 padding: 0,
//                 width: "40px",
//                 height: "40px",
//                 minWidth: "40px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }),
//             },
//           })}
//         >
//           <Text fw={500} className={getResponsiveClasses(true)}>
//             {selectedFilter}
//           </Text>
//         </Button>
//       </Menu.Target>
//       <Menu.Dropdown>
//         <Menu.Item onClick={() => handleFilterSelect("Today")}>Today</Menu.Item>
//         <Menu.Item onClick={() => handleFilterSelect("Last 7 Days")}>
//           Last 7 Days
//         </Menu.Item>
//         <Menu.Item onClick={() => handleFilterSelect("This Month")}>
//           This Month
//         </Menu.Item>
//         <Menu.Item
//           onClick={() => setSelectedFilter("Custom Range")}
//           closeMenuOnClick={false}
//         >
//           Custom Range
//         </Menu.Item>
//       </Menu.Dropdown>
//     </Menu>
//   );

//   // Inside your return:
//   return selectedFilter === "Custom Range"
//     ? renderCustomRangePicker()
//     : renderFilterMenu();
// }

// export default DateFilterMenu;

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

  // const handleClear = () => {
  //   const clearedRange = { startDate: null, endDate: null };
  //   setDateRange(clearedRange);
  //   onDateFilterChange?.(clearedRange);
  // };

  return (
    <div className={`flex gap-4 items-center ${className || ""}`} style={style}>
      <DatePickerInput
        placeholder="Start Date"
        value={dateRange.startDate}
        onChange={handleStartChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
      />
      <DatePickerInput
        placeholder="End Date"
        value={dateRange.endDate}
        onChange={handleEndChange}
        leftSection={<IconCalendar size={16} />}
        leftSectionPointerEvents="none"
        disabled={disabled}
      />
     
    </div>
  );
}

export default DateFilterMenu;

