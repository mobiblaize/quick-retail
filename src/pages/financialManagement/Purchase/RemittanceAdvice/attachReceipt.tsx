import { Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import PageContainer from "../../../../layout/pageContainer";
import AttachRemittance from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/attachRemittance";


const AttachRemittancePage = () => {
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
            Select recipient
            </Text>
            <Text fw={500} size="sm" c="#667085" className="text-[#667085]">
            Contact information are synced from the CRM. Can add new email to share receipt with.
            </Text>
          </div>
        </div>,
      ];
      return (
        <PageContainer subHeaders={subHeaders}>
          <AttachRemittance/>
        </PageContainer>
      );
    };
    

export default AttachRemittancePage;
