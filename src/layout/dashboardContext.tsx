import React, { createContext, useState, useContext, ReactNode } from "react";

type DashboardSection =
  | "Overview"
  | "Point of Sales"
  | "Financial Management"
  | "Reports"
  | "Admin";

interface DashboardContextType {
  activeSection: DashboardSection;
  setActiveSection: (section: DashboardSection) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeSection, setActiveSection] =
    useState<DashboardSection>("Point of Sales");

  return (
    <DashboardContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
