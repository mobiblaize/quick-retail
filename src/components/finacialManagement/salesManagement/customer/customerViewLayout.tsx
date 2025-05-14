import { Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../../layout/pageContainer";
import CustomDropdown from "../../../General/customDropdown";

const CustomerViewLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedType, setSelectedType] = useState("");
  const tabs = [
    {
      label: "Basic information",
      path: "/dashboard/sales-management/customer/view",
    },
    {
      label: "Orders",
      path: "/dashboard/sales-management/customer/view/order",
    },
    {
      label: "Returns",
      path: "/dashboard/sales-management/customer/view/returns",
    },
    {
      label: "Payment method",
      path: "/dashboard/sales-management/customer/view/payment-method",
    },
  ];

  const getSubHeaders = () => {
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

    const tabLinks = (
      <div className="mt-2 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 sm:gap-8 whitespace-nowrap min-w-max">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.label}
                onClick={() => navigate(tab.path)}
                className={`px-3 py-1 rounded ${
                  isActive ? "bg-[#FFECE5] text-[#F56630]" : "text-black"
                }`}
              >
                <Text
                  fw={isActive ? 500 : 300}
                  size="md"
                  className={isActive ? "text-[#F56630]" : "text-black"}
                >
                  {tab.label}
                </Text>
              </button>
            );
          })}
        </div>
      </div>
    );

    return [
      <div key="1" className="py-2.5">
        <div className="flex gap-2 items-center">{backButton}</div>
      </div>,
      <div className="flex flex-col">
      <div key="2" className="flex justify-between w-full">
        <Text fw={500} size="xl" c="black">
          Customer Information
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
        {tabLinks}
       
      </div>,
    ];
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <Outlet />
    </PageContainer>
  );
};

export default CustomerViewLayout;
