import { useState } from "react";
import { Avatar, Drawer, List, Text } from "@mantine/core";
import NavItem from "../../../../layout/navItem";
import {
  PointOfSale,
  FinancialManagement,
  Reports,
  Admin,
  mobileOtherMenu,
  Procurement,
  AssetManagement,
} from "../../../../layout/navItemData";
import { useDashboard } from "../../../../layout/dashboardContext";
import { MoreIcon, LogoutBlack } from "../../../../assets/svg";
import { Link, useLocation } from "react-router-dom";
import avatar from "../../../../assets/images/Avatars.png";

const MobileMoreMnu = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { activeSection } = useDashboard();
  const location = useLocation();

  const getSidebarItems = () => {
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
  const bottomNavItems = sidebarItems.slice(0, 4);
  const moreMenuItems = sidebarItems.slice(4);
  const hasMoreItems = moreMenuItems.length > 0;

  const handleNavigation = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden z-20">
        {bottomNavItems.map((item, index) => {
          const isActive = location.pathname === item.href;
          const IconComponent = isActive ? item.activeIcon : item.inactiveIcon;

          return (
            <Link
              key={index}
              to={item.href}
              className={`p-2 ${isActive ? "bg-[#FCE7DD] rounded-lg" : ""}`}
            >
              {IconComponent && <IconComponent />}
            </Link>
          );
        })}

        {hasMoreItems && (
          <div className="p-2" onClick={() => setIsDrawerOpen(true)}>
            <MoreIcon />
          </div>
        )}
      </div>

      <Drawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="left"
        size="xs"
        title={
          <div>
            <Text ml={"22"} c={"black"} size="lg" fw={"500"}>
              More
            </Text>
          </div>
        }
        classNames={{
          header: "bg-white border-b border-gray-100 p-2",
          body: "p-0",
          content: "bg-white",
        }}
      >
        <List spacing="xs" size="sm" className="p-0">
          {moreMenuItems.map((item, index) => (
            <div key={index}>
              <NavItem
                href={item.href}
                label={item.label}
                inactiveIcon={item.inactiveIcon}
                activeIcon={item.activeIcon}
                hasChildren={item.hasChildren}
                children={item.children}
                onNavigate={handleNavigation}
              />
            </div>
          ))}

          <div className="p-0 mt-4 border-t border-gray-100">
            {mobileOtherMenu.map((item, index) => (
              <div
                key={index}
                className="flex flex-col"
                onClick={handleNavigation}
              >
                <NavItem
                  href={item.href}
                  activeIcon={item.icon}
                  inactiveIcon={item.icon}
                  label={item.label}
                />
              </div>
            ))}
          </div>
        </List>
        <div className="mt-3 bg-[#F0F2F5] rounded-full w-fit m-auto p-2">
          <div className="flex items-center gap-3">
            <Avatar src={avatar} alt="avatar" radius="md" size={50} />
            <div className="flex flex-col">
              <Text fw={"700"} c="black" size="md">
                Victoria LLC
              </Text>
              <Text>vickyllc@gm..</Text>
            </div>
            <LogoutBlack />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMoreMnu;
