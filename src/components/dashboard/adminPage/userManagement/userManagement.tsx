import { useState } from "react";
import TierTwoVendors from "../../procurement/vendorManagement/tierTwoVendor";
import UserManagementTable from "./userManagementTable";

const UserManagementComp = () => {
  const [activeTab, setActiveTab] = useState<"userManage" | "tierTwo">("userManage");

  return (
    <div className="w-full bg-white p-8">
      {/* Tabs with border-bottom */}
      <div className="flex gap-2 border-b border-gray-200 pb-4 mb-6">
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "userManage"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("userManage")}
        >
          User Management 
        </button>
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "tierTwo"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("tierTwo")}
        >
          User Role
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "userManage" && <UserManagementTable />}
      {activeTab === "tierTwo" && <TierTwoVendors />}
    </div>
  );
};

export default UserManagementComp;
