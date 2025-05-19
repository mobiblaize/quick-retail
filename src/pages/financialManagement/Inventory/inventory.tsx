import { Button, Text } from "@mantine/core";
import {  ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import InventoryTable from "../../../components/finacialManagement/inventory/inventoryTable";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";

const InventoryPage = () => {

  const navigate = useNavigate();
  const handleStore = () => {
    navigate(ROUTES.storeView);
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
            Ikeja City Mall
            </Text>
            <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
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
               View Store Information
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* desktop */}

        <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
          <div className="flex flex-col">
            <Text fw={500} size="xl" c="black">
            Ikeja City Mall
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
               View Store Information
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
      <InventoryTable />
    </PageContainer>
  );
};

export default InventoryPage;
