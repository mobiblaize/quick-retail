import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import SubscriptionPlan from "../../../components/admin/vendor/SubscriptionPlan";

const SubscriptionPage = () => {
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
        <SubscriptionPlan/>
      </PageContainer>
    </>
  );
};

export default SubscriptionPage;
