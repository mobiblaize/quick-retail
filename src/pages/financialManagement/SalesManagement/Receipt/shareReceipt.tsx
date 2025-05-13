import PageContainer from "../../../../layout/pageContainer";
import { Text } from "@mantine/core";
import { Link, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import ShareReceipt from "../../../../components/finacialManagement/salesManagement/receipts/shareReceipt";
import CustomDropdown from "../../../../components/General/customDropdown";
import { ROUTES } from "../../../../constants/routes";
import { useState } from "react";
import { SentBadge } from "../../../../assets/svg";

const ShareReceiptPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
      const handleClick = () => {
      navigate(ROUTES.createMobileReceipt);
    };
  const [selectedType, setSelectedType] = useState("");
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
      <div className="flex flex-col  items-left justify-between">
        <Text fw={500} size="xl" c="black">
          Receipt Preview (#112354)
        </Text>
        
        <div className="flex gap-8 mt-[1em]">
        <span className="mt-4"><SentBadge/></span>  
        <div className="h-[30px]">
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
              inputSizeClass="py-2 rounded-md" 
            />
          </Link>
          </div>
        </div>
        <div className="flex gap-[3em] cursor-pointer lg:hidden mt-[2em]">
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
      <ShareReceipt />
    </PageContainer>
  );
};

export default ShareReceiptPage;
