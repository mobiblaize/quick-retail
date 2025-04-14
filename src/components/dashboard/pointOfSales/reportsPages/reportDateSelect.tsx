import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Text } from "@mantine/core";

const ReportDateSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reportType, reportLabel } = location.state || {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerate = () => {
    if (!reportType || !startDate || !endDate) return;

    navigate(
      `/dashboard/reports/${reportType}?from=${startDate}&to=${endDate}`
    );
  };

  if (!reportType) {
    return (
      <div className="text-red-600">
        Invalid access. Please select a report first.
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between bg-white p-6 shadow-md">
        <Text fw={500} size="xl" c="black">
          Reports Module
        </Text>
      </div>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F2F4F7]">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md ">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
            {reportLabel || "Enter the details below to create your report"}
          </h2>

          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            disabled={!startDate || !endDate}
            onClick={handleGenerate}
            className={`w-full py-3 rounded-md font-semibold text-white transition-all cursor-pointer ${
              startDate && endDate
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                : "bg-orange-200 cursor-not-allowed"
            }`}
          >
            Generate Report
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportDateSelect;
