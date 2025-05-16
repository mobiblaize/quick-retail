import { Button, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import InventoryOverview from "../../../components/finacialManagement/inventory/overview";
import InventoryOverviewTop from "../../../components/finacialManagement/inventory/topCards";
import WarehouseDetailsTable from "../../../components/finacialManagement/inventory/warehouseDetailsTable";
import CustomDropdown from "../../../components/General/customDropdown";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";

const InventoryWarehouseDetailsPage = () => {
  const [selectedType, setSelectedType] = useState("");

  const navigate = useNavigate();
  const handleStore = () => {
    navigate(ROUTES.inventoryStores);
  };
  const handleBack = () => {
    navigate(-1);
  };
  const getSubHeaders = () => {
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
      <>
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
        <div key="1" className="py-2.5">
          <div className="flex"></div>
        </div>
      </>,
      <div>
        <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
          <div className="flex flex-col">
            <Text fw={500} size="xl" c="black">
              Warehouse Details
            </Text>
            <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
              <div className="curor-pointer" onClick={handleStore}>
                <CustomDropdown
                  label="Item Name"
                  options={["Product 1", "Product 2", "Product 3"]}
                  placeholder="Export"
                  value={selectedType}
                  onChange={(val) => setSelectedType(val)}
                  IconComponent={<ChevronDown size={16} color="white" />}
                  textColorClass="text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* desktop */}

        <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
          <div className="flex flex-col">
            <Text fw={500} size="xl" c="black">
              Warehouse Details
            </Text>
            <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
              <div className="curor-pointer" onClick={handleStore}>
                <Button
                  variant="outline"
                  style={{
                    color: "#Ffffff",
                    borderRadius: "0.4rem",
                    height: "auto",
                    padding: "0.9rem 1.5rem",
                    fontWeight: 600,
                    fontSize: "16px",
                    width: "100%",
                    border: "1px solid #FFA500",
                    backgroundColor: "#F16722",
                  }}
                >
                  View Stores
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>,
    ];
    return subHeaders;
  };
  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <InventoryOverviewTop />
      <InventoryOverview />
      <WarehouseDetailsTable />
    </PageContainer>
  );
};

export default InventoryWarehouseDetailsPage;
