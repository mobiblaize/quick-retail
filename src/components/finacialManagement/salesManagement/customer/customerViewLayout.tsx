import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../../layout/pageContainer";

const CustomerViewLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { label: "Basic information", path: "/dashboard/sales-management/customer/view" },
    { label: "Orders", path: "/dashboard/sales-management/customer/view/order" },
    { label: "Returns", path: "/dashboard/sales-management/customer/view/returns" },
    { label: "Payment method", path: "/dashboard/sales-management/customer/view/payment-method" },
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
      <div className="flex gap-8 mt-2">
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
    );

    return [
      <div key="1" className="py-2.5">
        <div className="flex gap-2 items-center">{backButton}</div>
      </div>,
      <div key="2" className="flex flex-col justify-start w-full">
        <Text fw={500} size="xl" c="black">
          Customer Information
        </Text>
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
