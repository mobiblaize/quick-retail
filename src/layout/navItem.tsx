import { useState } from "react";
import { List, Anchor } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NavItemProps {
  inactiveIcon?: React.ElementType;
  activeIcon?: React.ElementType;
  label: string;
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

  if (hasChildren) {
    return (
      <>
        <div onClick={toggleOpened} className="cursor-pointer">
          <List.Item
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
          </List.Item>
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
                    className={`py-3 px-4 ${
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

  return (
    <Anchor component={Link} to={href} underline="never" onClick={onNavigate}>
      <List.Item
        className={`cursor-pointer ${
          isActive ? "bg-[#FCE7DD] rounded-lg" : ""
        } rounded-none px-6 p-4`}
      >
        <div className="flex gap-2 items-center">
          <div>
            {isActive && ActiveIcon ? (
              <ActiveIcon size="1.2rem" />
            ) : InactiveIcon ? (
              <InactiveIcon size="1.2rem" />
            ) : null}
          </div>
          <p
            className={`${
              isActive
                ? "font-semibold text-[#F16722]"
                : isLogOut
                ? "text-red-500"
                : "text-[#787486] font-[400]"
            }`}
          >
            {label}
          </p>
        </div>
      </List.Item>
    </Anchor>
  );
};

export default NavItem;
