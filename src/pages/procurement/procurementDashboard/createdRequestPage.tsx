import { useState } from "react";
import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../constants/routes";

import AllRequestTable from "../../../components/dashboard/procurement/dashboard/allRequestTable";
import TotalApproveRequestTable from "../../../components/dashboard/procurement/dashboard/totalApproveRequestTable";
import TotalCancelledRequestTable from "../../../components/dashboard/procurement/dashboard/totalCancelledRequestTable";
import TotalPendingRequestTable from "../../../components/dashboard/procurement/dashboard/totalPendingRequestTable";

const CreatedRequestPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "approved" | "pending" | "cancelled">("all");

  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <Text fw={500} size="xl" c="black">
        Dashboard
      </Text>
      <div className="flex flex-row gap-2 md:gap-4 items-center">
        <Link to={ROUTES.happyDiscountAnalytics}>
          <Button
            variant="outline-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Budget Request</span>
          </Button>
        </Link>
        <Link to={ROUTES.newRequest}>
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center justify-center"
            style={{ padding: "0.8rem 1rem" }}
          >
            <span className="whitespace-nowrap">Add New Request</span>
            <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <div className="w-full bg-white p-8">
        {/* Tab headers */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "all"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            All Requests (0)
          </button>
          <button
            onClick={() => setActiveTab("approved")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "approved"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Total Approved Requests (0)
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "pending"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Total Pending Requests (0)
          </button>
          <button
            onClick={() => setActiveTab("cancelled")}
            className={`text-sm px-4 py-2 rounded-md font-medium ${
              activeTab === "cancelled"
                ? "bg-[#FFECE5] text-[#D14900]"
                : "text-[#344054]"
            }`}
          >
            Total Cancelled Requests (0)
          </button>
        </div>

        {/* Tab panels */}
        {activeTab === "all" && <AllRequestTable />}
        {activeTab === "approved" && <TotalApproveRequestTable />}
        {activeTab === "pending" && <TotalPendingRequestTable />}
        {activeTab === "cancelled" && <TotalCancelledRequestTable />}
      </div>
    </PageContainer>
  );
};

export default CreatedRequestPage;
