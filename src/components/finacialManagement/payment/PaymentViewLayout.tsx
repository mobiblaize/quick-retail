import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";

const PaymentViewLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tabs = [
    {
      label: "Payment Category",
      path: "/dashboard/payment/initiate-payment",
    },
    {
      label: "Select Processor",
      path: "/dashboard/payment/initiate-payment/processor",
    },
    {
      label: "Make Payment",
      path: "/dashboard/payment/initiate-payment/make-payment",
    },
    {
      label: "Payment Receipt",
      path: "/dashboard/payment/initiate-payment/payment-receipt",
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
            Initiate Payment
          </Text>

          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <Menu>
                <Menu.Target>
                  <Button variant="filled-primary">
                    Quick Actions
                    <ChevronDown className="ml-2" />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                    Initiate new Payment
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    //   onClick={handleHistory}
                  >
                    Download Transaction / Payment Slip
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddBulkProducts}
                  >
                    Record Payment for Purchase Invoice
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <div className="block sm:hidden">
              <Menu>
                <Menu.Target>
                  <Button
                    variant="filled-primary"
                    style={{
                      width: "40px",
                      height: "40px",
                      padding: "0",
                      borderRadius: "20%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Plus size={20} />
                  </Button>
                </Menu.Target>

                <Menu.Dropdown
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    // onClick={handleAddProduct}
                  >
                    Initiate new Payment
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                    //   onClick={handleHistory}
                  >
                    Download Transaction / Payment Slip
                  </Menu.Item>
                  <Menu.Item
                    style={{
                      fontSize: "14px",
                      padding: "8px 16px",
                      color: "#333",
                    }}
                  >
                    Record Payment for Purchase Invoice
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
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

export default PaymentViewLayout;
