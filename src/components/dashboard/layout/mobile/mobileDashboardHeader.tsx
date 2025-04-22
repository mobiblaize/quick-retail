import { Link } from "react-router-dom";
import { useDashboard } from "../../../../layout/dashboardContext";
import { ROUTES } from "../../../../constants/routes";

const MobileDashboardHeader = () => {
  const { activeSection, setActiveSection } = useDashboard();

  type DashboardSection =
    | "Overview"
    | "Point of Sales"
    | "Financial Management"
    | "Reports"
    | "Admin";

  const navLinks = [
    {
      label: "Overview" as DashboardSection,
      to: ROUTES.dashboard,
      active: activeSection === "Overview",
    },
    {
      label: "Point of Sales" as DashboardSection,
      to: ROUTES.dashboard,
      active: activeSection === "Point of Sales",
    },
    {
      label: "Financial Management" as DashboardSection,
      to: ROUTES.dashboard,
      active: activeSection === "Financial Management",
    },
    {
      label: "Reports" as DashboardSection,
      to: ROUTES.dashboard,
      active: activeSection === "Reports",
    },
    {
      label: "Admin" as DashboardSection,
      to: ROUTES.dashboard,
      active: activeSection === "Admin",
    },
  ];

  const handleNavClick = (section: DashboardSection) => {
    setActiveSection(section);
  };

  return (
    <div className="relative bg-white shadow-sm w-full">
      <div className="overflow-x-auto hide-scrollbar">
        <div className="flex space-x-6 px-4">
          {navLinks.map((route, index) => (
            <div key={index} className="relative py-4">
              <Link
                to={route.to}
                className={`whitespace-nowrap text-lg ${
                  route.active
                    ? "text-orange-500 font-medium"
                    : "text-gray-400 font-normal"
                }`}
                onClick={() => handleNavClick(route.label)}
              >
                {route.label}
              </Link>
              {route.active && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 rounded-t"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileDashboardHeader;