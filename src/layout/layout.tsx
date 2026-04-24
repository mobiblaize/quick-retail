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
      // md breakpoint is 768px in Tailwind
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, we usually want the sidebar open by default
      if (!mobile) setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DashboardProvider>
      {/* 1. Main Wrapper: Prevents body scroll, sets background */}
      <div className="flex h-screen w-full overflow-hidden bg-[#F9FAFB]">
        
        {/* 2. Sidebar: 
            - Fixed on mobile/tablet (absolute/fixed)
            - Relative on Desktop
            - Width scales slightly based on screen size
        */}
        {!isMobile && (
          <aside
            className={`
              fixed top-0 left-0 z-30 h-full overflow-y-auto border-r border-gray-200 bg-white
              transition-all duration-300 ease-in-out
              md:relative 
              ${isSidebarOpen ? "w-[18rem] lg:w-[20rem]" : "w-0 md:w-20"} 
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
            `}
          >
            <DashboardSidebar toggleSidebar={toggleSidebar}/>
          </aside>
        )}

        {/* 3. Main Content Area */}
        <div className="flex flex-1 flex-col min-w-0 h-full relative">
          
          {/* Header: Sticky at the top */}
          <header className="sticky top-0 z-20 w-full flex-shrink-0">
            {isMobile ? (
              <MobileDashboardHeader />
            ) : (
              <DashboardHeader toggleSidebar={toggleSidebar} />
            )}
          </header>
          <main
            className={`
              flex-1 overflow-y-auto overflow-x-hidden 
              ${isMobile ? "pb-24" : ""}
            `}
          >
            {/* Inner container to center content on huge screens */}
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </main>

          {/* 5. Mobile Bottom Navigation */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 z-40 w-full border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <MobileMoreMnu />
            </div>
          )}
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;