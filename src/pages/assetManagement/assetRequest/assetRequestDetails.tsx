import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ApproversTable from "../../../components/dashboard/assetManagement/procurement/approversTable";
import AssetRequestSummary from "../../../components/dashboard/assetManagement/assetRequest/assetRequestSummary";

const AssetRequestDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const getSubHeaders = () => {
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

    const subHeaders = [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
          <div className="flex items-center">
            <Text>Asset Request</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
                Request Details
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="justify-between flex items-center">
        <Text fw={500} size="xl" c="black">
          Request Details for #635578KL
        </Text>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <>
      <PageContainer subHeaders={getSubHeaders()}>
        <AssetRequestSummary />
        <ApproversTable />
      </PageContainer>
    </>
  );
};

export default AssetRequestDetails;
