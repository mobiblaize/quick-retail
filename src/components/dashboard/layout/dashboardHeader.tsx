import { useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDashboard } from "../../../layout/dashboardContext";
import { useUserStore } from "../../../hooks/useUserStore";
import { Bell } from "lucide-react";
import { useUnread } from "../../../hooks/backendApis/admin/settings";

type DashboardSection =
  | "Overview"
  | "Point of Sales"
  | "Admin";

const NotificationBell = () => {
  const { data: unreadCount } = useUnread();
  const count = Number(unreadCount) || 0;

  return (
    <Link
      to={ROUTES.notificationPage}
      className="relative inline-flex items-center justify-center w-11 h-11 bg-[#F1F5F9] rounded-full cursor-pointer hover:bg-[#E2E8F0] transition-colors shrink-0"
    >
      <Bell className="w-5 h-5 text-[#64748B]" strokeWidth={2} />
      {count > 0 && (
        <span className="absolute top-0 right-0 flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[11px] font-semibold text-white bg-[#D92D20] rounded-full translate-x-1/4 -translate-y-1/4 shadow-sm">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
};

export const DashboardHeader = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  const { activeSection, setActiveSection } = useDashboard();
  const isAdmin = useUserStore((state) => state.isAdmin());
  const location = useLocation();

  const navLinks = useMemo(() => {
    const links = [
      {
        label: "Point of Sales" as DashboardSection,
        to: ROUTES.dashboard,
        active: activeSection === "Point of Sales",
      },
    ];

    if (isAdmin) {
      links.push({
        label: "Admin" as DashboardSection,
        to: ROUTES.vendorpage,
        active: activeSection === "Admin",
      });
    }

    return links;
  }, [activeSection, isAdmin]);

  useEffect(() => {
    if (location.pathname.startsWith("/dashboard/admin")) {
      setActiveSection("Admin");
    } else if (location.pathname.startsWith("/dashboard")) {
      setActiveSection("Point of Sales");
    }
  }, [location.pathname, setActiveSection]);

  const handleNavClick = (section: DashboardSection) => {
    setActiveSection(section);
  };

  return (
    <div className="bg-white text-black px-4 shadow-xs py-6 flex items-center justify-between gap-6">
      <p onClick={toggleSidebar} />
      <nav className="flex justify-between w-full">
        <div className="flex gap-6">
          {navLinks.map((route, index) => (
            <Link
              key={index}
              to={route.to}
              className={`relative group pb-2 ${
                route.active
                  ? "text-orange-500 font-medium"
                  : "text-[#667185] font-normal"
              }`}
              onClick={() => handleNavClick(route.label)}
            >
              <p style={{ cursor: "pointer", fontFamily: "Inter, sans-serif" }}>
                {route.label}
              </p>
              {route.active ? (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              ) : (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
              )}
            </Link>
          ))}
        </div>
        <NotificationBell />
      </nav>
    </div>
  );
};
