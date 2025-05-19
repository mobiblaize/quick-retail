import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AssetAnalyticsOverview from "../../../components/dashboard/assetManagement/assetDashboard/assetAnalyticsOverview";
import AssetTable from "../../../components/dashboard/assetManagement/assetDashboard/assetTable";
import { AssetsChart } from "../../../components/dashboard/assetManagement/assetDashboard/assetsChart";
import { AssetCategoryBreakdown } from "../../../components/dashboard/assetManagement/assetDashboard/assetCategoryBreakdown";

const AssetDashboard = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div>
        <Text fw={500} size="xl" c="black">
          Welcome to your Dashboard
        </Text>
        <Text c="dimmed" size="sm" fw={400}>
          Here’s an overview of what’s happening.
        </Text>
      </div>
     
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AssetAnalyticsOverview />
      <AssetTable />
      <AssetsChart />
      <AssetCategoryBreakdown />
    </PageContainer>
  );
};

export default AssetDashboard;
