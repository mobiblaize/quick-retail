import { Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import CustomDropdown from "../../../../components/General/customDropdown";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import OrderHistoryTable from "../../../../components/finacialManagement/purchase.tsx/purchaseOrder/historyTable";

const PurchaseOrderHistoryPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Purchase Order Version History
        </Text>
        <div className="flex flex-row gap-2 md:gap-4 cursor-pointer">
          <CustomDropdown
            options={["PDF", "CSV "]}
            value={selectedType}
            onChange={(val) => setSelectedType(val)}
            optional
            placeholder="Export"
            textColorClass="text-white"
            fieldColorClass="bg-[#F16722]"
            IconComponent={<ChevronDown size={16} color="white" />}
          />
        </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <OrderHistoryTable />
    </PageContainer>
  );
};

export default PurchaseOrderHistoryPage;
