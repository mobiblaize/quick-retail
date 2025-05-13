import PageContainer from "../../../../layout/pageContainer";
import {  Text } from "@mantine/core";
import {  useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import AllReceiptTable from "../../../../components/finacialManagement/salesManagement/receipts/allReceipt";
import ReceiptMetricsOverview from "../../../../components/finacialManagement/salesManagement/receipts/receiptOverview";

const AllReceiptPage = () => {
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
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Receipt Version History
          </Text>
          <Text fw={300} size="md" className="text-[#667085]">
            View all receipt version history chronologically.
          </Text>
        </div>
      </div>
      <div className=" text-sm flex justify-end text-right gap-6 mt-[3em]">
        <p className="text-sm">Status:</p>
        <p className="text-[#4E4B66] bg-[#D0D5DD] py-1 px-3 rounded-md">
          Draft
        </p>{" "}
        |
        <p className="text-[#B54708] bg-[#F7D394] py-1 px-3 rounded-md">
          Approved
        </p>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <ReceiptMetricsOverview />
      <AllReceiptTable />
    </PageContainer>
  );
};

export default AllReceiptPage;
