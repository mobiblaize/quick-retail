import { Button, Text } from "@mantine/core";
import SearchProduct from "../../../components/dashboard/pointOfSales/updateInventory/searchProduct";
import PageContainer from "../../../layout/pageContainer";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";

const TriggerOrder = () => {
  const navigate = useNavigate();
  const subHeaders = () => {
    const backButton = (
      <button
        className="flex cursor-pointer gap-2 items-center"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft />
        <Text fw={500} c="black">
          Back
        </Text>
      </button>
    );

    return [
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">
          {backButton}
          <div className="flex items-center">
            <Text>Inventory Management</Text>
            <span className="mx-2">/</span>
            <Text c="black" fw={500}>
              Trigger Reorder
            </Text>
          </div>
        </div>

        <div className="flex sm:hidden">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Trigger Reorder
        </Text>
      </div>,
    ];
  };

  const subHeaderButtom = () => {
    return [
      <div key="search-product-buttons" className="flex gap-4 justify-end">
        <Button
          variant="filled"
          style={{
            backgroundColor: "#F0F2F5",
            color: "black",
            borderRadius: "0.4rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
            width: "10rem",
          }}
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          variant="filled"
          style={{
            backgroundColor: "#CB1A14",
            color: "white",
            borderRadius: "0.4rem",
            height: "auto",
            padding: "0.9rem 1.5rem",
            fontWeight: 600,
            fontSize: "16px",
          }}
        >
          Trigger Reorder
        </Button>
      </div>,
    ];
  };
  return (
    <PageContainer
      subHeaders={subHeaders()}
      subHeaderButtom={subHeaderButtom()}
    >
      <SearchProduct />
    </PageContainer>
  );
};

export default TriggerOrder;
