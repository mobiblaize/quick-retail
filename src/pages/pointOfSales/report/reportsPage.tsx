import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import ReportSelection from "../../../components/dashboard/pointOfSales/reportsPages/reportSelection";


const ReportsPage = () => {
 const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Reports Module
        </Text>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <ReportSelection />
    </PageContainer>
  );
}

export default ReportsPage;
