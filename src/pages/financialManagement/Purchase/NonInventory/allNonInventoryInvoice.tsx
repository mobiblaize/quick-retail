import { Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import {  useNavigate } from "react-router";
import AllNonInventoryTable from "../../../../components/finacialManagement/purchase.tsx/nonInventory/allNonInventoryTable";
import CustomDropdown from "../../../../components/General/customDropdown";
import PageContainer from "../../../../layout/pageContainer";

const AllNonInventoryPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const [, setShowAllocatedModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");
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
          Non-Inventory Purchase
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
              <CustomDropdown
                label=""
                options={["PDF", "CSV", ]}
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
          Non-Inventory Purchase
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
              <CustomDropdown
                label=""
                options={["PDF", "CSV", ]}
                placeholder="Export"
                value={selectedType}
                onChange={(val) => setSelectedType(val)}
                fieldColorClass="bg-[#F16722]"
                IconComponent={<ChevronDown size={16} color="white" />}
                textColorClass="#F16722"
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <AllNonInventoryTable />
    </PageContainer>
  );
};

export default AllNonInventoryPage;
