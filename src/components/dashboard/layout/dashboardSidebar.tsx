import { Card, List, Text } from "@mantine/core";
import logo from "../../../assets/images/logo.png";
import NavItem from "../../../layout/navItem";
import {
  PointOfSale,
  FinancialManagement,
  Reports,
  Admin,
  Procurement,
  AssetManagement,
} from "../../../layout/navItemData";
import { useDashboard } from "../../../layout/dashboardContext";
import { X } from "lucide-react";
import LogoutModal from "../../LogoutModal";
import { ROUTES } from "../../../constants/routes";
import {
  InActiveNotification,
  Settings,
} from "../../../assets/svg";
import { useUserStore } from "../../../hooks/useUserStore";
import { useLocation } from "react-router";

// const DashboardSidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
//   const { activeSection } = useDashboard();
//   const { user, } = useUserStore();

//   const getSidebarItems = () => {
//     if (location.pathname.startsWith("/dashboard/admin")) {
//       return Admin;
//     }
//   // console.log(user)
//   const getSidebarItems = () => {
//     switch (activeSection) {
//       case "Point of Sales":
//         return PointOfSale;
//       case "Financial Management":
//         return FinancialManagement;
//       case "Procurement":
//         return Procurement;
//       case "Asset Management":
//         return AssetManagement;
//       case "Reports":
//         return Reports;
//       case "Admin":
//         return Admin;
//       case "Overview":
//       default:
//         return PointOfSale;
//     }
//   };

//   const sidebarItems = getSidebarItems();

const DashboardSidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { activeSection } = useDashboard();
  const { user } = useUserStore();
  const location = useLocation();

  const getSidebarItems = () => {
    if (location.pathname.startsWith("/dashboard/admin")) {
      return Admin;
    }

    switch (activeSection) {
      case "Point of Sales":
        return PointOfSale;
      case "Financial Management":
        return FinancialManagement;
      case "Procurement":
        return Procurement;
      case "Asset Management":
        return AssetManagement;
      case "Reports":
        return Reports;
      case "Admin":
        return Admin;
      case "Overview":
      default:
        return PointOfSale;
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <Card className="h-full w-full max-w-[20rem] shadow-none rounded-none p-0 bg-black">
      <div className="h-full flex flex-col">
        <div className="px-4">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" className="object-contain" />
            <X
              onClick={toggleSidebar}
              className="w-6 h-6 text-gray-700 cursor-pointer md:hidden"
            />
          </div>
        </div>

        <div className="mt-8 px-3 overflow-y-auto hide-scrollbar flex-1">
          <div className="mb-6 px-3 bg-[#F0F2F5] p-4 rounded-lg">
            <Text size="lg" fw={600} c="textSecondary.9">{user?.firstname} {user?.lastname}</Text>
            <Text fw={400} size="md" c="secondary">  {user?.locations?.[0]?.name}</Text>
          </div>


          <div className="mb-6">
            <List spacing="md" size="sm" className="p-0">
              {sidebarItems.map((item, index) => (
                <NavItem
                  key={index}
                  href={item.href}
                  label={item.label}
                  inactiveIcon={item.inactiveIcon}
                  activeIcon={item.activeIcon}
                  hasChildren={item.hasChildren}
                  children={item.children}
                />
              ))}
            </List>
          </div>
        </div>
        <div className="px-3">
          {activeSection === "Admin" && (
            <div className="mb-6"> {/* Adds spacing below Settings */}
              <NavItem
                href={ROUTES.notificationPage}
                label="Notifications"

                inactiveIcon={InActiveNotification}
                activeIcon={InActiveNotification}
                unreadCount={10}
              />
              <NavItem
                href={ROUTES.adminSettings}
                label="Settings"
                inactiveIcon={Settings}
                activeIcon={Settings}
              />
            </div>
          )}

          <List className="gap-4 mt-9">
            <LogoutModal />
          </List>
        </div>

      </div>
    </Card>
  );
};

export default DashboardSidebar;
