import { Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import ViewCreditNote from "../../../../components/finacialManagement/salesManagement/creditNote/view";


const ViewCreditNotePage = () => {
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
        View Credit Note
        </Text>
        <Text fw={300} size="sm" c="dimmed">
        Credit Note of sold items and/or services.
        </Text>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewCreditNote />
    </PageContainer>
  );
};

export default ViewCreditNotePage;
