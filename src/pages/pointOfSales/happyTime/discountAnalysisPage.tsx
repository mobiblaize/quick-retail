import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/happyTime/analysisOverview";
import DiscountAnalytics from "../../../components/dashboard/pointOfSales/happyTime/discountAnalytics";
import { useNavigate } from "react-router";

const DiscountAnalysisPage = () => {

  const navigate = useNavigate();
  const subHeaders = [
    <div key="1" className="py-2.5">
    <div className="flex gap-8 items-center">
      <button onClick={() => navigate(-1)} className="cursor-pointer">
        Back
      </button>
    </div>
  </div>,
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
