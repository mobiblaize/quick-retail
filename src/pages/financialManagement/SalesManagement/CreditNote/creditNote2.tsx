import PageContainer from "../../../../layout/pageContainer";
import { Text } from "@mantine/core";
import {  useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "../../../../constants/routes";
import CreditNoteOverview from "../../../../components/finacialManagement/salesManagement/creditNote/creditNoteOverview";
import CreditNoteTable from "../../../../components/finacialManagement/salesManagement/creditNote/creditNoteTable";

const CreditNotePage2 = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };  const handleClick = () => {
    navigate(ROUTES.creditNote);
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
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
          Credit Note
          </Text>
          <div className=" text-sm flex justify-start  gap-6 mt-[1em] cursor-pointer">
        <p className="text-[#4E4B66] py-1 px-3 rounded-md" onClick={handleClick}>
          In Store 0
        </p>{" "}
        <p className="text-[#344054] bg-[#F1672226]  py-1 px-3 rounded-md">
       Finance 0
        </p>
        </div>,
        </div>
      </div>
  
      
      </div>

  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <CreditNoteOverview/>
      <CreditNoteTable/>
    </PageContainer>
  );
};

export default CreditNotePage2;
