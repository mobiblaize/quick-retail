import {  Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import SingleRemmittanceCreate from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/singleInvoice";


const SingleRemittancePage = () => {
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
      <div className="flex  flex-col ">
        <Text fw={500} size="xl" c="black">
        Create a Remittance Advice
        </Text>
      
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <SingleRemmittanceCreate/>
    </PageContainer>
  );
};

export default SingleRemittancePage;
