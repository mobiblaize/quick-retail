import { useState, useEffect } from "react";
import { Menu, Button, ButtonProps, Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { CalendaIcon } from "../../assets/svg";

type FilterOption = "Today" | "Last 7 Days" | "This Month" | string;

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateFilterMenuProps {
  onDateFilterChange?: (dateRange: DateRange) => void;
  defaultFilter?: FilterOption;
  buttonVariant?: ButtonProps["variant"];
  buttonSize?: ButtonProps["size"];
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showIconOnly?: boolean | "sm" | "md" | "lg" | "xl";
}

function DateFilterMenu({
  onDateFilterChange,
  defaultFilter = "This Month",
  buttonVariant = "subtle",
  buttonSize = "sm",
  disabled = false,
  className,
  style,
  showIconOnly = "md",
}: DateFilterMenuProps) {
  const [selectedFilter, setSelectedFilter] =
    useState<FilterOption>(defaultFilter);
  const [isIconOnly, setIsIconOnly] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (showIconOnly === true) {
        setIsIconOnly(true);
        return;
      }

      if (typeof showIconOnly === "string") {
        const breakpoints = {
          sm: 640,
          md: 768,
          lg: 1024,
          xl: 1280,
        };
        const breakpoint = breakpoints[showIconOnly];
        setIsIconOnly(window.innerWidth < breakpoint);
      } else {
        setIsIconOnly(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [showIconOnly]);

  const handleFilterSelect = (filter: FilterOption): void => {
    setSelectedFilter(filter);

    let startDate: Date, endDate: Date;
    const today = new Date();

    switch (filter) {
      case "Today":
        startDate = today;
        endDate = today;
        break;
      case "Last 7 Days":
        startDate = new Date();
        startDate.setDate(today.getDate() - 7);
        endDate = today;
        break;
      case "This Month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      default:
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }

    if (onDateFilterChange) {
      onDateFilterChange({ startDate, endDate });
    }
  };

  const getResponsiveClasses = (isForLargeScreen = false) => {
    if (typeof showIconOnly !== "string") return "";

    if (isForLargeScreen) {
      return `hidden ${showIconOnly}:block`;
    }
    return `block ${showIconOnly}:hidden`;
  };

  const buttonClasses = `${className || ""} transition-all`;

  return (
    <Menu
      trigger="click-hover"
      loop={false}
      withinPortal={false}
      trapFocus={false}
      menuItemTabIndex={0}
      styles={(theme) => ({
        dropdown: {
          backgroundColor: "white",
          border: `1px solid ${theme.colors.textSecondary[1] || "#D0D5DD"}`,
          padding: theme.spacing.lg,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
        },
        item: {
          color: theme.colors.textSecondary[7],
          fontWeight: 400,
          "&:hover": {
            backgroundColor: theme.colors.gray[0],
            color: "#475367",
          },
          "&[data-selected]": {
            backgroundColor: "transparent",
            color: "#475367",
            fontWeight: 500,
          },
          "&[data-hovered]": {
            backgroundColor: theme.colors.gray[0],
          },
        },
      })}
    >
      <Menu.Target>
        <Button
          variant={buttonVariant}
          size={buttonSize}
          disabled={disabled}
          className={buttonClasses}
          style={style}
          leftSection={isIconOnly ? undefined : <CalendaIcon />}
          rightSection={
            isIconOnly ? undefined : (
              <ChevronDown
                size={24}
                color="#667185"
                className={getResponsiveClasses(true)}
              />
            )
          }
          styles={(theme) => ({
            root: {
              border: `1px solid ${theme.colors.textSecondary[1] || "#D0D5DD"}`,
              color: "#101928",
              backgroundColor: "white",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: theme.colors.gray[0],
              },
              ...(isIconOnly && {
                padding: 0,
                width: "40px",
                height: "40px",
                minWidth: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }),
            },
            inner: {
              justifyContent: isIconOnly ? "center" : "flex-start",
              width: "100%",
            },
            leftSection: {
              marginRight: isIconOnly ? 0 : 8,
            },
            rightSection: {
              marginLeft: isIconOnly ? 0 : 8,
            },
            label: {
              fontWeight: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: isIconOnly ? "100%" : "auto",
            },
          })}
        >
          {isIconOnly ? (
            <CalendaIcon />
          ) : (
            <div className="flex items-center">
              <div className={getResponsiveClasses()}></div>
              <Text fw={500} className={getResponsiveClasses(true)}>
                {selectedFilter}
              </Text>
            </div>
          )}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => handleFilterSelect("Today")}>Today</Menu.Item>
        <Menu.Item onClick={() => handleFilterSelect("Last 7 Days")}>
          Last 7 Days
        </Menu.Item>
        <Menu.Item onClick={() => handleFilterSelect("This Month")}>
          This Month
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DateFilterMenu;
