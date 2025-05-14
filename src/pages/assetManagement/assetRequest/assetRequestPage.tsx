import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import AssetRequestTable from "../../../components/dashboard/assetManagement/assetRequest/assetRequestTable";

const AssetRequestPage = () => {
  const subHeaders = [
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div>
        <Text fw={500} size="xl" c="black">
          Asset Request
        </Text>
      </div>
     
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AssetRequestTable />
    </PageContainer>
  );
};

export default AssetRequestPage;
