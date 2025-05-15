import { Button, Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import ViewNonInventory2 from "../../../../components/finacialManagement/purchase.tsx/nonInventory/viewNonInventory2";

const ViewNonInventoryPage2 = () => {
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

    <div key="1">
      <div className="flex justify-between">
        <Text fw={500} size="xl" c="black">
          Non Inventory Purchase Details
        </Text>
        <Button
          variant="filled-primary"
          //   onClick={() => setShowAllocatedModal(true)}
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
          Generate Purchase Invoice
        </Button>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <ViewNonInventory2 />
    </PageContainer>
  );
};

export default ViewNonInventoryPage2;
