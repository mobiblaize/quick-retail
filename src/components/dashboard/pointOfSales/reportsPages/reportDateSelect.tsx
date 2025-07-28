import { useLocation, useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { Text } from "@mantine/core";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import Dropdown2 from "../../../General/dropdown2";
import { useFetchStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";
import { ChevronLeft } from "lucide-react";

const ReportDateSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reportType, reportLabel } = location.state || {};
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const generateReport = useGenerateReport();
  const [loading, setLoading] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);

  const {
    data: storeData,
    isLoading: isLoadingStores,
    error: storeError,
  } = useFetchStore();

  const mapReportType = (path: string) => {
    switch (path) {
      case "sales-processing":
        return "sales";
      case "product-management":
        return "products";
      case "returns-refunds":
        return "returns";
        case "discounts":
          return "discounts";
      default:
        return path;
    }
  };

  const handleGenerate = async () => {
    if (!reportType) {
      notifications.show({
        title: "Missing Report Type",
        message: "Please select a report type.",
        color: "red",
      });
      return;
    }

    if (!startDate || !endDate) {
      notifications.show({
        title: "Missing Dates",
        message: "Please select both start and end dates.",
        color: "red",
      });
      return;
    }


    setLoading(true);

    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        report_type: mapReportType(reportType),
        locationId,
      };

      const response = await generateReport.mutateAsync(payload);

      navigate(`/dashboard/reports/${reportType}`, {
        state: {
          reportData: response.data,
          startDate,
          endDate,
          locationId,
        },
      });

      notifications.show({
        title: "Success",
        message: "Report generated successfully!",
        color: "green",
      });
    } catch (error) {
      console.error("Report generation failed", error);
      notifications.show({
        title: "Error",
        message: "Failed to generate report. Please try again.",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const storeOptions = [
    { label: "All Stores", value: null },
    ...(Array.isArray(storeData?.data?.stores?.data)
      ? storeData.data.stores.data.map((store: any) => ({
          label: store.name,
          value: store.locationID,
        }))
      : [])
  ];
  

  if (!reportType) {
    return (
      <div className="text-red-600 p-4 text-center">
        Invalid access. Please select a report first.
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const backButton = (
    <button
      onClick={handleBack}
      className="flex cursor-pointer gap-2 items-center"
    >
      <ChevronLeft />
      <Text fw={500} c="black">
        Back
      </Text>
    </button>
  );

  

  return (
    <>

<div className="flex gap-8 items-center">
          {backButton}
         
        </div>
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 shadow-md">
        <Text fw={500} size="lg" c="black">
          {/*  */}
          {reportLabel || "Enter the details below to create your report"}
        </Text>
      </div>

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-[#F2F4F7] px-4 py-6">
        <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-base sm:text-md font-medium text-gray-700 mb-4 text-left">
          Enter the details below to create your report
          </h2>

          <div className="mb-4">
            <Dropdown2
              options={storeOptions}
              label="Stores Filter"
              placeholder={
                isLoadingStores ? "Loading stores..." : "Select a store"
              }
              value={locationId}
              onChange={(val: SetStateAction<string | null>) =>
                setLocationId(val)
              }
              required={false}
            />
            {storeError && (
              <p className="text-sm text-red-600 mt-1">Failed to load stores</p>
            )}
          </div>

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
            disabled={loading || !startDate || !endDate}
            onClick={handleGenerate}
            className={`w-full py-2 sm:py-3 rounded-md font-semibold text-white transition-all cursor-pointer ${
              startDate && endDate && !loading
                ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                : "bg-orange-200 cursor-not-allowed"
            }`}
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportDateSelect;
