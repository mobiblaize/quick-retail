import { useState } from "react";
import PageContainer from "../../../../layout/pageContainer";
import RequestTable from "./requestTable";
import BudgetTable from "./budgeTable";

const BudgetTables = () => {
  const [activeTab, setActiveTab] = useState<"requests" | "budget">("requests");

  return (
    <PageContainer>
      <div className="w-full bg-white p-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("requests")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "requests"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Requests
          </button>
          <button
            onClick={() => setActiveTab("budget")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "budget"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Budget
          </button>
        </div>

        {/* Tab Panels */}
        {activeTab === "requests" && <RequestTable />}
        {activeTab === "budget" && <BudgetTable />}
      </div>
    </PageContainer>
  );
};

export default BudgetTables;
