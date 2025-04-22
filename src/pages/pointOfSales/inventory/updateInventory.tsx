import { Button, Text } from "@mantine/core";
import SearchProduct from "../../../components/dashboard/pointOfSales/updateInventory/searchProduct";
import PageContainer from "../../../layout/pageContainer";
import { ChevronLeft } from "lucide-react";
import NewInventoryDetails from "./newInventoryDetails";
import { useNavigate } from "react-router";

const UpdateInventory = () => {
  const navigate = useNavigate();
  const subHeaders = () => {
    const backButton = (
      <button
        onClick={() => navigate(-1)}
        className="flex cursor-pointer gap-2 items-center"
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
              Update Inventory
            </Text>
          </div>
        </div>

        <div className="flex sm:hidden">{backButton}</div>
      </div>,
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Update Inventory
        </Text>
      </div>,
    ];
  };

  const subHeaderButtom = () => {
    return [
      <div key="search-product-buttons" className="flex gap-4 justify-end">
        <Button variant="outline-primary" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button variant="filled-primary" style={{ width: "10rem" }}>
          Update
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
      <NewInventoryDetails />
    </PageContainer>
  );
};

export default UpdateInventory;
