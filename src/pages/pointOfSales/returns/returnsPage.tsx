import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import { useState } from "react";
import PageContainer from "../../../layout/pageContainer";
import ReturnsAnalytics from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsAnlytics";
import ReturnsTable from "../../../components/dashboard/pointOfSales/returnsRefunds/returnsTable";
import LogComplaints from "../../../components/dashboard/pointOfSales/returnsRefunds/modals/logComplaints";

const ReturnsPage = () => {
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);

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
      <ReturnsAnalytics />
      <ReturnsTable />
      <LogComplaints
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
    </PageContainer>
  );
};

export default ReturnsPage;
