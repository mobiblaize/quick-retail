import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import ReturnsAnalytics from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsAnlytics";
import ReturnsTable from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsTable";
import { useFetchAllreturns } from "../../../hooks/backendApis/pos/returns";
import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router";

const ReturnsPage = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  // const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
  const navigate = useNavigate();
  // Only pass params if both dates are selected
  const fetchParams =
    dateRange.startDate && dateRange.endDate
      ? {
          start_date: dateRange.startDate,
          end_date: dateRange.endDate,
        }
      : undefined;

  const { data, isLoading } = useFetchAllreturns(fetchParams);

  const returns = Array.isArray(data?.data?.returns?.data)
    ? data.data.returns.data
    : [];

    const handleLogPage = () => {
     navigate(ROUTES.logReturns);
      } 
  
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Returns and Overview
        </Text>
        <Button
          onClick={handleLogPage}
          variant="filled-primary"
          className="flex gap-1.5"
        >
          New Return Log
          <Plus size={24} />
        </Button>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <ReturnsAnalytics
        data={{
          totalReturns: data?.data?.totalReturns ?? 0,
          pending_complaints: data?.data?.pending_complaints ?? 0,
          resolved_complaints: data?.data?.resolved_complaints ?? 0,
          declined_complaints: data?.data?.declined_complaints ?? 0,
        }}
        setDateRange={setDateRange}
      />
      <ReturnsTable returns={returns} isLoading={isLoading} />
      {/* <LogComplaints
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      /> */}
    </PageContainer>
  );
};

export default ReturnsPage;
