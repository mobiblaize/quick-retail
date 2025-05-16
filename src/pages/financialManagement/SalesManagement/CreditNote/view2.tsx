import PageContainer from "../../../../layout/pageContainer";
import {  Text } from "@mantine/core";
import {  useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import CustomDropdown from "../../../../components/General/customDropdown";
import { useState } from "react";
import ViewCreditNoteReceipt from "../../../../components/finacialManagement/salesManagement/creditNote/viewCreditNote";

const ViewCreditNoteReceiptPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("");
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
            View Credit Note
          </Text>
          <Text fw={300} size="md" className="text-[#667085]">
            Credit Note of sold items and/or services.
          </Text>
        </div>
        <div className="flex flex-row gap-2 md:gap-4">
          {/* <Link to={ROUTES.viewReceipt}> */}
            <CustomDropdown
              options={[
                "Preview Credit Note",
                "Send Credit note to Customer ",
                "Download Credit Note",
              ]}
              value={selectedType}
              onChange={(val) => setSelectedType(val)}
              optional
              placeholder="Quick Action"
              textColorClass="text-white"
              fieldColorClass="bg-[#F16722]"
             
            />
          {/* </Link> */}
        </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewCreditNoteReceipt />
    </PageContainer>
  );
};

export default ViewCreditNoteReceiptPage;
