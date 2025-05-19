import { Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import AllRemittanceTable from "../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/allRemittanceTable";

const AllRemittancePage = () => {
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
    <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
      <div className="flex flex-col">
        <Text fw={500} size="xl" c="black">
          Remittance Advice Version History
        </Text>
        <Text fw={300} size="sm" c="black">
          View all receipt version history chronologically.
        </Text>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <AllRemittanceTable />
    </PageContainer>
  );
};

export default AllRemittancePage;
