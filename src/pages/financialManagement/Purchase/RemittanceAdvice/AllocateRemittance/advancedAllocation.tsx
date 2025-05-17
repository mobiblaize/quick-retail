import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "../../../../../constants/routes";
import PageContainer from "../../../../../layout/pageContainer";
import MatchRemittanceModal from "../../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/AllocateRemittance/matchModal";
import FiledRemittanceTable from "../../../../../components/finacialManagement/purchase.tsx/remmitanceAdvice/AllocateRemittance/filledAllocatedTable";

const AdvancedPaymentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate(ROUTES.unallocatedRemittance);
  };

  const [showAllocatedModal, setShowAllocatedModal] = useState(false);
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
        {/* <p>Sales</p>
      <p>Receipt Allocation</p> */}
      </div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
          Allocate Remittance Advice
          </Text>
          <div className="flex gap-[3em] cursor-pointer">
            <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
              onClick={handleClick}
            >
List of Unallocated / Unpaid / Partially Remittance<br/> Advice(s)
            </Text>
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-2 px-2"
            >
List of Unallocated / Unpaid / Advanced Payment <br/> Remittance Advice(s)
            </Text>
          </div>
        </div>
      </div>
      <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em]">
        <div className="curor-pointer"  onClick={() => setShowAllocatedModal(true)}>
          <Button
            variant="filled"
            style={{
              backgroundColor: "#F16722",
              color: "white",
              borderRadius: "0.8rem",
              height: "auto",
              padding: "0.9rem 1.1rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "100%",
            }}
          >
      Allocate Remittance Advice
          </Button>
        </div>
      </div>
    </div>,
  ];
  return (
    <>
      {showAllocatedModal && (
        <MatchRemittanceModal 
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      <PageContainer subHeaders={subHeaders}>
        <FiledRemittanceTable />
      </PageContainer>
    </>
  );
};

export default AdvancedPaymentPage;
