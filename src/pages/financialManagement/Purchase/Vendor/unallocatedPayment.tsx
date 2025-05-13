import PageContainer from "../../../../layout/pageContainer";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "../../../../constants/routes";
import { useState } from "react";
import AllocatedModal from "../../../../components/finacialManagement/purchase.tsx/vendor/allocatedModal";
import UnallocatedPaymentTable from "../../../../components/finacialManagement/purchase.tsx/vendor/unallocatedPayment";


const UnallocatedPaymentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate(ROUTES.unsettledVendor);
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
      </div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Allocate Multiple Payment
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
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
                Allocate Reciept
              </Button>
            </div>
          </div>
          <div className="flex gap-[3em] cursor-pointer">
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-2 px-2"
              onClick={handleClick}
            >
              List of Unsettled Vendors Purchase Invoice
            </Text>
            <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
             
            >
              List of Unallocated Payment
            </Text>
          </div>
        </div>
      </div>
      
      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Allocate Multiple Payment
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
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
                Allocate Reciept
              </Button>
            </div>
          </div>
          <div className="flex gap-[3em] cursor-pointer">
            <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
              onClick={handleClick}
            >
              List of Unsettled Vendors Purchase Invoice
            </Text>
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-2 px-2"
            >
              List of Unallocated Payment
            </Text>
          </div>
        </div>
      </div>
    </div>,
  ];
  return (
    <>
      {showAllocatedModal && (
        <AllocatedModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}

      <PageContainer subHeaders={subHeaders}>
        <UnallocatedPaymentTable />
      </PageContainer>
    </>
  );
};

export default UnallocatedPaymentPage;
