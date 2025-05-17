import { Button, Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import AllPaymentTable from "../../../components/finacialManagement/payment/allPaymentTable";
import AllPaymentOverview from "../../../components/finacialManagement/payment/overview";
import { ROUTES } from "../../../constants/routes";
import PageContainer from "../../../layout/pageContainer";

const AllPaymentOverviewPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const handlePayment = () => {
    navigate(ROUTES.initiatePayment);
  };

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
      <div className="flex">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>

        <div className="flex sm:hidden">{backButton}</div>
      </div>
    </div>,
    <div>
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 lg:hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Payment
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] lg:hidden">
            <Button
              variant="filled-primary"
              onClick={handlePayment}
              style={{
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.5rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "20%",
              }}
            >
              Innitiate Payment
            </Button>
          </div>
        </div>
      </div>

      {/* desktop */}

      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0  md:block hidden">
        <div className="flex flex-col">
          <Text fw={500} size="xl" c="black">
            Payment
          </Text>
          <div className=" text-sm flex justify-end text-right gap-6 pb-4 mt-[-2em] ">
            <Button
              variant="filled-primary"
              onClick={handlePayment}
              style={{
                color: "white",
                borderRadius: "0.4rem",
                height: "auto",
                padding: "0.9rem 1.5rem",
                fontWeight: 600,
                fontSize: "16px",
                width: "20%",
              }}
            >
              Innitiate Payment
            </Button>
          </div>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
        <AllPaymentOverview/>
      <AllPaymentTable />
    </PageContainer>
  );
};

export default AllPaymentOverviewPage;
