import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import RecordPaymentPage from "../../../components/finacialManagement/payment/view";
import PageContainer from "../../../layout/pageContainer";

const ViewPaymentPage = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

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

  const quickActionMenu = (
    <>
      {/* Desktop Button */}
      <div className="hidden sm:block">
        <Menu>
          <Menu.Target>
            <Button variant="filled-primary">
              Quick Actions <ChevronDown className="ml-2" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="rounded-lg shadow-md p-2 bg-white">
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Initiate new Payment
            </Menu.Item>
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Download Transaction / Payment Slip
            </Menu.Item>
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Record Payment for Purchase Invoice
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>

      {/* Mobile FAB Button */}
      <div className="block sm:hidden">
        <Menu>
          <Menu.Target>
            <Button
              variant="filled-primary"
              style={{
                width: 40,
                height: 40,
                padding: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Plus size={20} />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="rounded-lg shadow-md p-2 bg-white">
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Initiate new Payment
            </Menu.Item>
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Download Transaction / Payment Slip
            </Menu.Item>
            <Menu.Item className="text-sm px-4 py-2 text-[#333]">
              Record Payment for Purchase Invoice
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </>
  );

  const subHeaders = [
    <div key="back" className="py-2.5">
      <div className="flex sm:gap-8 items-center">{backButton}</div>
    </div>,

    <div key="payment-header" className="w-full">
      <div className="flex justify-between items-center flex-wrap gap-4 py-4">
        <Text fw={500} size="xl" c="black">
          Payment
        </Text>
        <div className="flex items-center gap-4">{quickActionMenu}</div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <RecordPaymentPage />
    </PageContainer>
  );
};

export default ViewPaymentPage;
