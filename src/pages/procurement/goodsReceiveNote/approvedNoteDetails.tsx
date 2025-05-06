import React from "react";
import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import RejectedNoteForm from "../../../components/dashboard/procurement/goodsReceiveNote/rejectedNoteForm";

const ApprovedNoteDetails: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const getSubHeaders = () => {
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
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
          <div className="flex items-center">
            <Text>Good Receive Note</Text>
            <>
              <span className="mx-2">/</span>
              <Text c="black" fw={500}>
              Good Receive Note
              </Text>
            </>
          </div>
        </div>

        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex justify-between items-center w-full">
        <Text fw={500} size="xl" c="black">
        View Approved Good Received Note Details
        </Text>

        <div className="inline-flex items-center bg-[#ECFDF3] text-[#027A48] px-3 py-1 rounded-full font-medium text-sm">
          <div className="w-2 h-2 bg-[#027A48] rounded-full" />
          <span className="ml-2">Approved</span>
        </div>
      </div>,
    ];

    return subHeaders;
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <RejectedNoteForm />
    </PageContainer>
  );
};

export default ApprovedNoteDetails;
