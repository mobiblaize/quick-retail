import { useState } from "react";
import TierOneVendors from "./tierOneVendors";
import TierTwoVendors from "./tierTwoVendor";

const TierTable = () => {
  const [activeTab, setActiveTab] = useState<"tierOne" | "tierTwo">("tierOne");

  return (
    <div className="w-full bg-white p-8">
      {/* Tabs with border-bottom */}
      <div className="flex gap-2 border-b border-gray-200 pb-4 mb-6">
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "tierOne"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("tierOne")}
        >
          Tier 1 Vendors
        </button>
        <button
          className={`text-sm px-4 py-2 rounded-md font-medium ${
            activeTab === "tierTwo"
              ? "bg-[#FFECE5] text-[#D14900]"
              : "text-[#344054]"
          }`}
          onClick={() => setActiveTab("tierTwo")}
        >
          Tier 2 Vendors
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "tierOne" && <TierOneVendors />}
      {activeTab === "tierTwo" && <TierTwoVendors />}
    </div>
  );
};

export default TierTable;
