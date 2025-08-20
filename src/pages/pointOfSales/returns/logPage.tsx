
import PageContainer from "../../../layout/pageContainer";
import { Text } from "@mantine/core";
import LogOrder from "../../../components/dashboard/pointOfSales/returnsRefunds/logPage";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

const LogPage: React.FC = () => {

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
        <div key="1">
           <div className="hidden sm:flex gap-8 items-center font-normal">
          {backButton}
        </div>
          <div className="flex items-center justify-between mt-5">
            <Text fw={500} size="xl" c="black">
             Log Returns 
            </Text>
          
          </div>
        </div>,
      ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <LogOrder/>
      </PageContainer >
  );
};

export default LogPage;
