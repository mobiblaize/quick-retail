
import PageContainer from "../../../../layout/pageContainer";
import { Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import CreateReceipt from "../../../../components/finacialManagement/salesManagement/receipts/createReceipt";
import { ROUTES } from "../../../../constants/routes";

const CreateReceiptPage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
      navigate(-1);
    };
    const handleClick = () => {
      navigate(ROUTES.createMobileReceipt);
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
            Create a Receipt
            </Text>
            <Text fw={300} size="md" className="text-[#667085]">
            Issued a receipt for multiples sales invoices.
            </Text>
            <div className="flex gap-[3em] cursor-pointer lg:hidden">
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-4 px-4"
          
            >
      Receipt
            </Text>
            <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
              onClick={handleClick}
            >
            Preview
            </Text>
          </div>
          </div>
        </div>,
      ];
      return (
        <PageContainer subHeaders={subHeaders}>
          <CreateReceipt />
        </PageContainer>
      );
    };
    

export default CreateReceiptPage;
