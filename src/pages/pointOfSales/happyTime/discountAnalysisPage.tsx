import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/happyTime/analysisOverview";
import DiscountAnalytics from "../../../components/dashboard/pointOfSales/happyTime/discountAnalytics";

const DiscountAnalysisPage = () => {
  const subHeaders = [
    <Text fw={500} size="xl" c="black">
      Discount Analytics
    </Text>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AnalysisOverview />
      <DiscountAnalytics />
    </PageContainer>
  );
};

export default DiscountAnalysisPage;
