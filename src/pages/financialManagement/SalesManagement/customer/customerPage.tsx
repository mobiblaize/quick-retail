import { Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import CustomerSalesTable from "../../../../components/finacialManagement/salesManagement/customer/customerTable";
import CustomDropdown from "../../../../components/General/customDropdown";
import { ROUTES } from "../../../../constants/routes";
import { Link } from "react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const CustomerSalesPage = () => {
  const [selectedType, setSelectedType] = useState("");
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Customers
        </Text>
        <div className="flex flex-row gap-2 md:gap-4 cursor-pointer">
      {/* <Link to={ROUTES.viewReceipt}> */}
            <CustomDropdown
                    
                        options={[
                          "PDF",
                          "CSV ",
                         
                        ]}
                        value={selectedType}
                        onChange={(val) => setSelectedType(val)}
                        optional
                        placeholder="Export"
                        textColorClass="text-white"
                        fieldColorClass="bg-[#F16722]"
                        IconComponent={<ChevronDown size={16} color="white" />}
                      />
                       {/* </Link> */}
      </div>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <CustomerSalesTable />
    </PageContainer>
  );
};

export default CustomerSalesPage;
