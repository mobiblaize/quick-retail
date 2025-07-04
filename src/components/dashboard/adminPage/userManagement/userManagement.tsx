import UserManagementTable from "./userManagementTable";
import RoleGrid from "./roleGrid";

type Props = {
  activeTab: "userManage" | "roleGrid";
  onTabChange: (tab: "userManage" | "roleGrid") => void;
};

const UserManagementComp = ({ activeTab, onTabChange }: Props) => {
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
          onClick={() => onTabChange("userManage")}
        >
          User Management 
        </button>
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "roleGrid"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => onTabChange("roleGrid")}
        >
          User Role
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "userManage" && <UserManagementTable />}
      {activeTab === "roleGrid" && <RoleGrid />}
    </div>
  );
};

export default UserManagementComp;
