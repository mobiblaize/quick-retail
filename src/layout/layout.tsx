import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/layout/dashboardSidebar";
import { DashboardHeader } from "../components/dashboard/layout/dashboardHeader";
import MobileDashboardHeader from "../components/dashboard/layout/mobile/mobileDashboardHeader";
import { DashboardProvider } from "./dashboardContext";
import { useEffect, useState } from "react";
import MobileMoreMnu from "../components/dashboard/layout/mobile/mobileMoreMenu";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        {!isMobile && (
          <div
            className={`fixed top-0 left-0 h-full w-[20rem] z-30 transform transition-transform duration-300 md:relative ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
          >
            <DashboardSidebar toggleSidebar={toggleSidebar} />
          </div>
        )}

        <div className="flex-1 flex flex-col w-full">
          <div className="sticky top-0 z-20 w-full">
            {isMobile ? (
              <MobileDashboardHeader />
            ) : (
              <DashboardHeader toggleSidebar={toggleSidebar} />
            )}
          </div>

          <div
            className={`flex-1 overflow-y-auto overflow-hidden ${
              isMobile ? "pb-16" : ""
            }`}
          >
            <Outlet />
          </div>

          {isMobile && <MobileMoreMnu />}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
