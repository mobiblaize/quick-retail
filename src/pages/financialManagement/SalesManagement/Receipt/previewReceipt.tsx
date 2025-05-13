import PageContainer from "../../../../layout/pageContainer";
import { Text } from "@mantine/core";
import { Link, useNavigate } from "react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { ROUTES } from "../../../../constants/routes";
import Receipt from "../../../../components/finacialManagement/salesManagement/receipts/receipt";
import CustomDropdown from "../../../../components/General/customDropdown";
import { useState } from "react";

const PreviewReceiptPage = () => {
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
          Preview Receipt
        </Text>
        <Text fw={300} size="md" className="text-[#667085]">
          Preview Receipt Information and Details
        </Text>
      </div>
      <div className="flex flex-row gap-2 md:gap-4 cursor-pointer">
      <Link to={ROUTES.viewReceipt}>
            <CustomDropdown
                    
                        options={[
                          "Create New",
                          "Edit Receipt ",
                          "Void Receipt",
                          "Send to Customer",
                          "Share via Email",
                          "Get Shareable Link",
                          "Download as PDF",
                          "Allocate receipt to Invoice",
                        ]}
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        optional
                        placeholder="Quick Action"
                        textColorClass="text-white"
                        fieldColorClass="bg-[#F16722]"
                        IconComponent={<ChevronDown size={16} color="white" />}
                      />
                       </Link>
      </div>
      
    </div>
    <div className=" text-sm flex justify-end text-right gap-6 mt-[3em]">
        <p className="text-sm">Status:</p>
        <p className="text-[#4E4B66] bg-[#D0D5DD] py-1 px-3 rounded-md">Draft</p> |
        <p className="text-[#B54708] bg-[#F7D394] py-1 px-3 rounded-md">Approved</p>
    </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <Receipt />
    </PageContainer>
  );
};

export default PreviewReceiptPage;
