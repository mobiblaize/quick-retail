import { Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import {  useNavigate } from "react-router";
import AllNonInventoryTable from "../../../../components/finacialManagement/purchase.tsx/nonInventory/allNonInventoryTable";
import NonInventoryOverview from "../../../../components/finacialManagement/purchase.tsx/nonInventory/overview";
import CustomDropdown from "../../../../components/General/customDropdown";
import { ROUTES } from "../../../../constants/routes";
import PageContainer from "../../../../layout/pageContainer";

const NonInventoryOverviewPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handleClick = () => {
    navigate(ROUTES.allPurchaseInvoice);
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
        Purchase
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
            Purchase Invoice
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
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
          <div className="flex gap-[3em] cursor-pointer">
          <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
              onClick={handleClick}
            >
              All Inventory Purchase Invoice
            </Text>
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-2 px-2"
            >
              All non-inventory Purchase Invoice
            </Text>
          </div>
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Purchase Invoice
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
          <div className="flex gap-[3em] cursor-pointer">
          <Text
              fw={300}
              size="md"
              c="#1D2939"
              className="text-[#667085] cursor-pointer"
              onClick={handleClick}
            >
              All Inventory Purchase Invoice
            </Text>
            <Text
              fw={300}
              size="md"
              c="#F56630"
              className="text-[#667085] bg-[#F1672226] py-2 px-2"
            >
              All non-inventory Purchase Invoice
            </Text>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <NonInventoryOverview />
      <AllNonInventoryTable />
    </PageContainer>
  );
};

export default NonInventoryOverviewPage;
