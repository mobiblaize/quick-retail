import { useState } from "react";
import NonInventoryTable from "./nonInventoryTable";
import InventoryTable from "./InventoryTable";

const AllPurchaseTable = () => {
  const [activeTab, setActiveTab] = useState<"noninventory" | "inventory">("noninventory");

  return (
    <div className="w-full bg-white p-8">
      {/* Tabs with border-bottom */}
      <div className="flex gap-2 border-b border-gray-200 pb-4 mb-6">
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "noninventory"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("noninventory")}
        >
          Non-Inventory Purchase
        </button>
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "inventory"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("inventory")}
        >
          Inventory Purchase
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "noninventory" && <NonInventoryTable />}
      {activeTab === "inventory" && <InventoryTable />}
    </div>
  );
};

export default AllPurchaseTable;
