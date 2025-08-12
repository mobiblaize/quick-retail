import { useLocation, useNavigate } from "react-router-dom";
import { SetStateAction, useState } from "react";
import { MantineTheme, Stack, Text } from "@mantine/core";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import Dropdown2 from "../../../General/dropdown2";
import { useFetchStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";
import { ChevronLeft } from "lucide-react";
import { DateInput } from "@mantine/dates";

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

      <div className="flex gap-8 items-center py-[1.5em] ml-3">
        {backButton}

      </div>
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 shadow-md">
        <Text fw={500} size="lg" c="black">
          {/*  */}
          {reportLabel || "Enter the details below to create your report"}
        </Text>
      </div>

      <div className=" flex items-center justify-center bg-[#F2F4F7] px-4 py-6">
        <div className="w-full max-w-md bg-white p-4 sm:p-8 rounded-xl shadow-md">

          <Text
            fw={500}
            c="gray.7"
            mb="md"
            ta="left"
            style={(theme: MantineTheme) => ({
              fontSize: theme.fontSizes.sm,
              [`@media (min-width: ${theme.breakpoints.sm})`]: {
                fontSize: theme.fontSizes.md,
              },
            })}
          >
            Enter the details below to create your report
          </Text>

          <div className="mb-4">
            <Stack gap="sm" w="100%">
              {/* Styled Label */}
              <Text fw={500} size="sm" c="gray.7">
                Stores Filter
              </Text>

              {/* Your Dropdown2 component with placeholder styling */}
              <Dropdown2
                options={storeOptions}
                placeholder={
                  isLoadingStores ? "Loading stores..." : "Select a store"
                }
                value={locationId}
                onChange={(val: SetStateAction<string | null>) => setLocationId(val)}
                required={false}
                // className="w-full"
                // styles={{
                //   placeholder: { color: "#6B7280", fontStyle: "italic" }, // Tailwind gray-500
                //   input: { borderRadius: "0.375rem" }, // Mantine radius-md equivalent
                // }}
              />
            </Stack>
            {storeError && (
              <Text size="sm" c="red" mt={4}>
                Failed to load stores
              </Text>
            )}
          </div>

          <div className="mb-4">
            <Text size="sm" c="gray.6" mb={4}>
              Start Date
            </Text>
            <DateInput
              value={startDate ? new Date(startDate) : null}
              onChange={(date) => setStartDate(date ? date.toISOString().split("T")[0] : "")}
              placeholder="Select date"
              w="100%"
              radius="md"
              withAsterisk={false}
              styles={{
                input: {
                  border: "1px solid #D1D5DB", // Tailwind's border-gray-300
                  padding: "8px",
                  fontSize: "14px",
                  ":focus": {
                    borderColor: "#3B82F6", // Tailwind's blue-500
                    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
                  },
                },
              }}
            />

          </div>

          <div className="mb-6">
            <Text size="sm" c="gray.6" mb={4}>
              End Date
            </Text>
            <DateInput
              value={endDate ? new Date(endDate) : null}
              onChange={(date) => setEndDate(date ? date.toISOString().split("T")[0] : "")}
              placeholder="Select date"
              w="100%"
              radius="md"
              styles={{
                input: {
                  borderColor: "#D1D5DB", // Tailwind gray-300
                  padding: "0.5rem",
                  "&:focus": {
                    borderColor: "#3B82F6", // Tailwind blue-500
                    boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.3)",
                  },
                },
              }}
            />

          </div>

          <button
            disabled={loading || !startDate || !endDate}
            onClick={handleGenerate}
            className={`w-full py-2 sm:py-3 rounded-md font-semibold text-white transition-all cursor-pointer ${startDate && endDate && !loading
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
