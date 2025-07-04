import { Info } from "lucide-react";
import { useState } from "react";
import PermissionsTab from "./permissionTab";
import PointOfSalesPermissions from "./pointofSalesPermision";

// Individual permission screens
// import FinancePermissions from "./FinancePermissions";
// import ProcurementPermissions from "./ProcurementPermissions";
// import AssetPermissions from "./AssetPermissions";
// import ReportsPermissions from "./ReportsPermissions";

export default function PermissionsPanel() {
  const [activeTab, setActiveTab] = useState("Point of Sales");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Point of Sales":
        return <PointOfSalesPermissions />;
    //   case "Finance Management":
    //     return <FinancePermissions />;
    //   case "Procurement":
    //     return <ProcurementPermissions />;
    //   case "Asset Management":
    //     return <AssetPermissions />;
    //   case "Reports":
    //     return <ReportsPermissions />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <PermissionsTab active={activeTab} onChange={setActiveTab} />

      {activeTab === "Point of Sales" && (
        <div className="mt-4 flex items-start gap-2 text-[16px] text-[#48464E]">
          <Info size={16} className="mt-0.5 text-blue-600" />
          Features with heavy and important data should be restricted to administrative roles
        </div>
      )}

      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
