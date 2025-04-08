import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/layout/dashboardSidebar";
import { DashboardHeader } from "../components/dashboard/layout/dashboardHeader";
import { DashboardProvider } from "./dashboardContext";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DashboardProvider>
      <div className="flex h-screen overflow-hidden">
        <div className="fixed top-0 left-0 h-full w-[20rem] z-30 transform transition-transform duration-300 md:relative md:translate-x-0">
          <DashboardSidebar toggleSidebar={toggleSidebar} />
        </div>
        <div className="flex-1 flex flex-col w-full">
          <div className="sticky top-0 z-20 w-full">
            <DashboardHeader toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex-1 overflow-y-auto overflow-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
