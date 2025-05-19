import { Button, Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import ViewPurchaseReturn from "../../../../components/finacialManagement/purchase.tsx/purchaseReturns/viewPurchaseReturn";
import { useState } from "react";
import DebitModal2 from "../../../../components/finacialManagement/purchase.tsx/purchaseReturns/debitNote2Modal";


const ViewPurchaseReturnPage = () => {
    const navigate = useNavigate();
    const [showAllocatedModal, setShowAllocatedModal] = useState(false);
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
    <div key="1">
      <div className="flex justify-between ">
        <Text fw={500} size="xl" c="black">
        View Purchase Return
        </Text>
        <Button
            variant="filled-primary"
            onClick={() => setShowAllocatedModal(true)} 
            style={{
              color: "white",
              borderRadius: "0.4rem",
              height: "auto",
              padding: "0.9rem 1.5rem",
              fontWeight: 600,
              fontSize: "16px",
              width: "20%",
            }}
          >
      Issue Debit Note
          </Button>
      </div>
    </div>,
  ];
  return (
    <>
    {showAllocatedModal && (
      <DebitModal2 
        opened={showAllocatedModal}
        onClose={() => setShowAllocatedModal(false)}
      />
    )}
    <PageContainer subHeaders={subHeaders}>
      <ViewPurchaseReturn />
    </PageContainer>
    </>
  );
};

export default ViewPurchaseReturnPage;
