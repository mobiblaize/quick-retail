import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import AddPaymentModal from "../../../../components/finacialManagement/purchase.tsx/AddPayment/addModal";
import VendorInvoiceSettleTable from "../../../../components/finacialManagement/purchase.tsx/AddPayment/settleVendor";
import PageContainer from "../../../../layout/pageContainer";

const SettleVendorPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
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
            Pay / Settle Vendor Purchase Invoice (s).
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
            Record Payment
          </Button>
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex justify-between">
          <Text fw={500} size="xl" c="black">
            Pay / Settle Vendor Purchase Invoice (s).
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
            Record Payment
          </Button>
        </div>
      </div>
    </div>,
  ];

  return (
    <>
      {showAllocatedModal && (
        <AddPaymentModal
          opened={showAllocatedModal}
          onClose={() => setShowAllocatedModal(false)}
        />
      )}
      <PageContainer subHeaders={subHeaders}>
        <VendorInvoiceSettleTable />
      </PageContainer>
    </>
  );
};

export default SettleVendorPage;
