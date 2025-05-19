import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import InboxView from "../../../../components/finacialManagement/purchase.tsx/debitNote/sendContent";
import PageContainer from "../../../../layout/pageContainer";

const SendDebitPage = () => {
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

    <div key="2" className="flex justify-between items-center">
      <Text fw={500} size="xl" c="black">
        Share Debit Note via Email
      </Text>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <InboxView />
    </PageContainer>
  );
};

export default SendDebitPage;
