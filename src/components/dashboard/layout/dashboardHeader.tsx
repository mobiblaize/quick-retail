import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useDashboard } from "../../../layout/dashboardContext";
import { QuestionMark, Settings } from "../../../assets/svg";
import avatar from "../../../assets/images/Avatars.png";
import { Text } from "@mantine/core";

export const DashboardHeader = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) => {
  const { activeSection, setActiveSection } = useDashboard();

  type DashboardSection =
    | "Overview"
    | "Point of Sales"
    | "Financial Management"
    | "Procurement"
    | "Asset Management"
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
      label: "Procurement" as DashboardSection,
      to: ROUTES.procurementDashboard,
      active: activeSection === "Procurement",
    },
    {
      label: "Asset Management" as DashboardSection,
      to: ROUTES.test,
      active: activeSection === "Asset Management",
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
              <p className="cursor-pointer">{route.label}</p>
              {route.active ? (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></div>
              ) : (
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></div>
              )}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Settings />
          <QuestionMark />
          <div className="bg-[#F7F9FC] text-center rounded-full p-1 flex items-center gap-2">
            <img src={avatar} alt="avatar" />
            <Text fw={500} c="black">
              Victoria LLC
            </Text>
          </div>
        </div>
      </nav>
    </div>
  );
};
