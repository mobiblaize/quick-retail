import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import VendorOverview from "../../../../components/finacialManagement/purchase.tsx/vendor/overview";
import VendorProfile from "../../../../components/finacialManagement/purchase.tsx/vendor/vendorDetails";
import PageContainer from "../../../../layout/pageContainer";

const VendorOverviewPage = () => {
  const navigate = useNavigate();
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
  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="hidden sm:flex gap-8 items-center">{backButton}</div>

      <div className="flex">
        <div className="flex sm:hidden">{backButton}</div>
      </div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Vendor Details
          </Text>
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Vendor Details
          </Text>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <VendorOverview />
      <VendorProfile />
    </PageContainer>
  );
};

export default VendorOverviewPage;
