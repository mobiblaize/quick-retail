import { useState } from "react";
import { List, Anchor, Text } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useUnread } from "../hooks/backendApis/admin/settings";



interface NavItemProps {
  inactiveIcon?: React.ElementType;
  activeIcon?: React.ElementType;
  label: any;
  href: string;
  hasChildren?: boolean;
  children?: { label: string; href: string }[];
  active?: boolean;
  onNavigate?: () => void;
}

const NavItem = ({
  label,
  href,
  inactiveIcon: InactiveIcon,
  activeIcon: ActiveIcon,
  hasChildren,
  children = [],
  onNavigate,
}: NavItemProps) => {
  const location = useLocation();
  const [opened, setOpened] = useState(false);

  const { data: unreadCount } = useUnread();

  const isActive = (() => {
    if (href === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }

    if (href !== "/dashboard") {
      const pathSegments = location.pathname.split("/").filter(Boolean);
      const hrefSegments = href.split("/").filter(Boolean);
      return hrefSegments.every(
        (segment, index) => pathSegments[index] === segment
      );
    }

    return false;
  })();

  const isChildActive = () => {
    if (children.length === 0) return false;
    return children.some((child) => location.pathname === child.href);
  };

  const isLogOut = label === "Log Out";

  const toggleOpened = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setOpened(!opened);
    }
  };

  // -------------------------------
  // 📂 NAV ITEM WITH CHILDREN
  // -------------------------------
  if (hasChildren) {
    return (
      <>
        <div onClick={toggleOpened} className="cursor-pointer">
          <div
            className={`${
              isActive || isChildActive() ? "bg-[#FCE7DD] rounded-lg" : ""
            } rounded-none px-6 p-4`}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2 items-center">
                <div>
                  {(isActive || isChildActive()) && ActiveIcon ? (
                    <ActiveIcon size="1.2rem" />
                  ) : InactiveIcon ? (
                    <InactiveIcon size="1.2rem" />
                  ) : null}
                </div>
                <p
                  className={`${
                    isActive || isChildActive()
                      ? "font-semibold text-[#F16722]"
                      : isLogOut
                      ? "text-red-500"
                      : "text-[#787486] font-[400]"
                  }`}
                >
                  {label}
                </p>
              </div>
              <div className="text-[#787486] ml-10">
                {opened ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
          </div>
        </div>

        {opened && (
          <div className="pl-8">
            {children.map((child, index) => {
              const isChildItemActive = location.pathname === child.href;
              return (
                <Anchor
                  key={index}
                  component={Link}
                  to={child.href}
                  underline="never"
                  onClick={onNavigate}
                >
                  <List.Item
                    className={`py-3 px-4 text-md ${
                      isChildItemActive ? "text-[#F16722]" : "text-[#787486]"
                    }`}
                  >
                    {child.label}
                  </List.Item>
                </Anchor>
              );
            })}
          </div>
        )}
      </>
    );
  }

  // -------------------------------
  // 📄 NORMAL NAV ITEM
  // -------------------------------
  return (
    <Anchor component={Link} to={href} underline="never" onClick={onNavigate}>
      <div
        className={`cursor-pointer 
          ${isActive ? "bg-[#FCE7DD] rounded-lg" : "hover:bg-[#F0F2F5]"} 
          rounded-none px-6 p-4`}
      >
        <div className="flex gap-2 items-center relative">
          {/* Icon */}
          <div className="min-w-6 min-h-6 w-6 h-6 flex items-center justify-center">
            {isActive && ActiveIcon ? (
              <ActiveIcon size={20} />
            ) : InactiveIcon ? (
              <InactiveIcon size={20} />
            ) : null}
          </div>

          {/* ✅ Label with unread count in front */}
          <div className="flex items-center justify-between  w-full gap-2">
            
            <p
              className={`${
                isActive
                  ? "font-semibold text-[#F16722]"
                  : isLogOut
                  ? "text-red-500"
                  : "text-[#787486] font-[400] hover:text-black"
              }`}
            >
              {label}
            </p>
            {label === "Notifications" && unreadCount > 0 && (
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-2">
                <Text c="customPrimary.10" fw={600} size="xs">
                  {unreadCount}
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    </Anchor>
  );
};

export default NavItem;
