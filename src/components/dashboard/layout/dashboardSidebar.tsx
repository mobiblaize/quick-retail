import { Card, Divider, List } from "@mantine/core";
import logo from "../../../assets/images/logo.png";
import NavItem from "../../../layout/navItem";
import {
  PointOfSale,
  FinancialManagement,
  Reports,
  Admin,
  otherMenu,
} from "../../../layout/navItemData";
import { useDashboard } from "../../../layout/dashboardContext";
import { X } from "lucide-react";

const DashboardSidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { activeSection } = useDashboard();

  const getSidebarItems = () => {
    switch (activeSection) {
      case "Point of Sales":
        return PointOfSale;
      case "Financial Management":
        return FinancialManagement;
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
          <div className="mt-5">
            <Divider my="lg" />
          </div>
          <List className=" gap-4 mt-6">
            {otherMenu.map((item, index) => (
              <NavItem
                href={item.href}
                activeIcon={item.icon}
                inactiveIcon={item.icon}
                label={item.label}
                key={index}
              />
            ))}
          </List>
        </div>
      </div>
    </Card>
  );
};

export default DashboardSidebar;
