import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import HistoryTable from "../../../components/vendor/subscriptionHistory";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import SubscriptionSummary1 from "../../../components/vendor/SubscriptionSummary1";

const SubscriptionChangePage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
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
    <div key="1">
      {backButton}
      <div className="flex items-center mt-4">
        <Text fw={500} size="xl" c="#1D2739">
        Change Subscription plan
        </Text>
      </div>
    </div>,
  ];

  return (
    <>
      <PageContainer subHeaders={subHeaders}>
      <SubscriptionSummary1
  items={[
    { title: "Point of Sales Management System", price: 10000, seats: 3, additionalSeats: 2 },
    { title: "Finance Management System", price: 10000, seats: 3, additionalSeats: 2 },
    { title: "Asset Management System", price: 10000, seats: 3, additionalSeats: 2 },
    { title: "Reports System", price: 10000, seats: 3, additionalSeats: 2 },
  ]}
  billingType="Monthly (1 Month)"
  billingStart="April 11, 2025"
  billingEnd="May 11, 2025"
  totalPrice={20000}
  onContinue={() => alert("Continue clicked")}
/>

      </PageContainer>
    </>
  );
};

export default SubscriptionChangePage;
