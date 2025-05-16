import { Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import StoresOverview from "../../../components/finacialManagement/inventory/storeOverview";
import StoreTable2 from "../../../components/finacialManagement/inventory/storeTable2";
import CustomDropdown from "../../../components/General/customDropdown";
import PageContainer from "../../../layout/pageContainer";

const InventoryStoresPage = () => {
  const [, setShowAllocatedModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();
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
      <><div className="hidden sm:flex gap-8 items-center">
            {backButton}
        </div><div key="1" className="py-2.5">
                <div className="flex"></div>
            </div></>
        ,
        <div>
          <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
            <div className="flex flex-col">
              <Text fw={500} size="xl" c="black">
                Stores
              </Text>
              <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
                <div
                  className="curor-pointer"
                  onClick={() => setShowAllocatedModal(true)}
                >
                  <CustomDropdown
                    label=""
                    options={["PDF"]}
                    placeholder="Export"
                    value={selectedType}
                    onChange={(val) => setSelectedType(val)}
                    IconComponent={<ChevronDown size={16} color="white" />}
                    textColorClass="text-white"
                    fieldColorClass="bg-[#F16722]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* desktop */}

          <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
            <div className="flex flex-col">
              <Text fw={500} size="xl" c="black">
                Stores
              </Text>
              <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
                <div
                  className="curor-pointer"
                  onClick={() => setShowAllocatedModal(true)}
                >
                  <CustomDropdown
                    label=""
                    options={["PDF"]}
                    placeholder="Export"
                    value={selectedType}
                    onChange={(val) => setSelectedType(val)}
                    IconComponent={<ChevronDown size={16} color="white" />}
                    textColorClass="text-white"
                    fieldColorClass="bg-[#F16722]"
                  />
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
      <StoresOverview />
      <StoreTable2 />
    </PageContainer>
  );
};

export default InventoryStoresPage;
