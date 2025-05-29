import { Button, Text } from "@mantine/core";
import SearchProduct from "../../../components/dashboard/pointOfSales/updateInventory/searchProduct";
import PageContainer from "../../../layout/pageContainer";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useActivateInventory } from "../../../hooks/backendApis/pos/inventory";
import { useFetchAllLocations } from "../../../hooks/backendApis/pos/products";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import NewInventoryDetails from "./newInventoryDetails";

const UpdateInventory = () => {
  const { state } = useLocation();
  const inventories = state?.inventories || {};
  

  const activateInventory = useActivateInventory(inventories.variationID);

  // Form States
  const [current_level, setCurrentLevel] = useState(
    inventories?.quantity_available || 0
  );
  const [new_stock_level, setNewStockLevel] = useState(
    inventories?.quantity_supplied || 0
  );
  const [new_reorder_level, setNewReorderLevel] = useState(
    inventories?.reorder_level || 0
  );
  const [reason_for_update, setReasonForUpdate] = useState(
    inventories?.reason_for_update || ""
  );
  const [locationID, setLocationID] = useState(inventories?.location_id || "");

  const { data: locationsData } = useFetchAllLocations();

  const locations = Array.isArray(locationsData?.data?.stores?.data)
    ? locationsData.data.stores.data
    : [];

  const locationOptions = locations.map(
    (loc: { name: string; locationID: string }) => ({
      label: loc?.name || "Unnamed",
      value: loc?.locationID || "",
    })
  );

  const handleActivateInventory = () => {
    activateInventory.mutate(
      {
        locationID,
        current_level,
        new_stock_level,
        new_reorder_level,
        reason_for_update,
      },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "inventory activated successfully",
            color: "green",
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
        onError: (error: any) => {
          notifications.show({
            title: "Error",
            message:
              error?.response?.data?.message || "Failed to activate inventory",
            color: "red",
          });
        },
      }
    );
  };

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
        <Button
          variant="filled-primary"
          style={{ width: "10rem" }}
          onClick={handleActivateInventory}
        >
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
      <SearchProduct
        onSelect={() => {}}
        onItemsChange={() => {}}
      />
      <NewInventoryDetails
        current_level={current_level}
        setCurrentLevel={setCurrentLevel}
        new_stock_level={new_stock_level}
        setNewStockLevel={setNewStockLevel}
        new_reorder_level={new_reorder_level}
        setNewReorderLevel={setNewReorderLevel}
        reason_for_update={reason_for_update}
        setReasonForUpdate={setReasonForUpdate}
        locationID={locationID}
        setLocationID={setLocationID}
        locationOptions={locationOptions}
        locationsData={locationsData?.data?.stores?.data || []}
      />
    </PageContainer>
  );
};

export default UpdateInventory;
