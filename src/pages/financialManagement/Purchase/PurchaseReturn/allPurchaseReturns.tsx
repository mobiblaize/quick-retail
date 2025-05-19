import { Text } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import AllPurchaseReturnTable from "../../../../components/finacialManagement/purchase.tsx/purchaseReturns/allPurchaseReturnTable";
import AllPurchaseReturnsOverview from "../../../../components/finacialManagement/purchase.tsx/purchaseReturns/overview";
import CustomDropdown from "../../../../components/General/customDropdown";
import PageContainer from "../../../../layout/pageContainer";

const AllPurchaseReturnsOverviewPage = () => {
  const [, setShowAllocatedModal] = useState(false);
  const [selectedType, setSelectedType] = useState("");

  const subHeaders = [
    <div key="1" className="py-2.5">
      <div className="flex"></div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Purchase Returns
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
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Purchase Returns
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <div
              className="curor-pointer"
              onClick={() => setShowAllocatedModal(true)}
            >
              <CustomDropdown
                label=""
                options={["PDF", "CSV"]}
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
      <AllPurchaseReturnsOverview />
      <AllPurchaseReturnTable />
    </PageContainer>
  );
};

export default AllPurchaseReturnsOverviewPage;
