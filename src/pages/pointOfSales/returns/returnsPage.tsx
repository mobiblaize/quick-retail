import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import ReturnsAnalytics from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsAnlytics";
import ReturnsTable from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsTable";
import LogComplaints from "../../../components/dashboard/pointOfSales/returnsRefunds/modals/logComplaints";
import { useFetchAllreturns } from "../../../hooks/backendApis/pos/returns";

const ReturnsPage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
  const { data } = useFetchAllreturns();

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Returns and Overview
        </Text>
        <Button
          onClick={() => setIsLogComplaintsOpen(true)}
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
      />
      <ReturnsTable />
      <LogComplaints
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
    </PageContainer>
  );
};

export default ReturnsPage;