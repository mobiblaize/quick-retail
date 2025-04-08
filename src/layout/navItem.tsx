import { List, Anchor } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

interface NavItemProps {
  inactiveIcon?: React.ElementType;
  activeIcon?: React.ElementType;
  label: string;
  href: string;
}

const NavItem = ({
  label,
  href,
  inactiveIcon: InactiveIcon,
  activeIcon: ActiveIcon,
}: NavItemProps) => {
  const location = useLocation();

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

  const isLogOut = label === "Log Out";

  return (
    <Anchor component={Link} to={href} underline="never">
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
