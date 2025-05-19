
import { Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import PageContainer from "../../../../../layout/pageContainer";
import VendorSearch from "../../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/AllocateRemittance/vendorSearch";



const AllocateRemittancePage= () => {
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

      <div className="flex sm:hidden">{backButton}</div>
    </div>,
    <div key="1">
      <div className="flex flex-col items-left justify-start">
        <Text fw={500} size="xl" c="black">
        Allocate Remittance Advice
        </Text>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <VendorSearch/>
    </PageContainer>
  );
};

export default AllocateRemittancePage;
