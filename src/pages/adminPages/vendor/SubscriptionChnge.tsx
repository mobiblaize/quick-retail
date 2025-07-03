import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import SubscriptionSummary1 from "../../../components/vendor/SubscriptionSummary1";
import PaymentSummaryModal from "../../../components/vendor/paymentSummaryModal";
import PaymentSuccessModal from "../../../components/vendor/paymentSuccessfulModal";
import { useState } from "react";
import { useFetchPaymentSummary } from "../../../hooks/backendApis/authentication/signupAuth";
import {
  useSubmitSubscription,
  // useFetchVerifyPayment,
} from "../../../hooks/backendApis/admin/profile";

const SubscriptionChangePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items, billingType, totalPrice, billingStart, billingEnd } =
    location.state || {};

  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState();
  const { mutate: fetchPaymentSummary } = useFetchPaymentSummary();
  const { mutate: renewSubscription } = useSubmitSubscription();
  // const verifyPayment = useFetchVerifyPayment();
  const [verifiedRef, setVerifiedRef] = useState<string>();

  const handleBack = () => navigate(-1);

  const handleContinue = () => {
    const payload = {
      billing_type: billingType?.toLowerCase(),
      applications: items.map((item: any) => ({
        subscription_id: item.subscription_id,
        application_id: item.application_id,
        amount: String(item.price || 0),
        additional_seat: String(item.additionalSeats || 0),
      })),
    };

    fetchPaymentSummary(payload, {
      onSuccess: (res: any) => {
        if (!res.error) {
          setPaymentSummary(res.data);
          setModalOpen(true);
        }
      },
    });
  };


  
  const handlePaySuccess = async (ref: string) => {
    const payload = {
      billing_type: billingType?.toLowerCase(),
      paystack_complete_callback: "https://api-quick-retail.sbscuk.co.uk/public",
      paystack_reference: ref,
      applications: items.map((item: any) => ({
        subscription_id: item.subscription_id,
        application_id: item.application_id,
        amount: String(item.price || 0),
        additional_seat: String(item.additionalSeats || 0),
      })),
    };
  
    renewSubscription(payload, {
      // onSuccess: async () => {
      //   try {
      //     const data = await verifyPayment(ref);
      //     if (data?.success) {
      //       setModalOpen(false);
      //       sessionStorage.setItem("registerEmail", data?.email || ""); // save if needed
      //       setSuccessOpen(true);
      //       setVerifiedRef(ref); // optional
      //     }
      //   } catch (err) {
      //     console.error("Verification failed:", err);
      //   }
      // },
      onSuccess: () => {
        setModalOpen(false);
        setSuccessOpen(true);
        setVerifiedRef(ref); // just save the ref for display
      },
      
      onError: (err) => console.error("Renew failed:", err),
    });
  };
  

  const subHeaders = [
    <div key="1">
      <button onClick={handleBack} className="flex items-center gap-2">
        <ChevronLeft />
        <Text fw={500}>Back</Text>
      </button>
      <div className="mt-4">
        <Text fw={400} size="xl">
          Change Subscription Plan
        </Text>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <SubscriptionSummary1
        items={items}
        billingType={billingType}
        billingStart={billingStart}
        billingEnd={billingEnd}
        totalPrice={totalPrice}
        onContinue={handleContinue}
      />

      <PaymentSummaryModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onPaymentSuccess={handlePaySuccess}
        summaryData={paymentSummary}
      />

      {/* <PaymentSuccessModal
        opened={successOpen}
        onClose={() => setSuccessOpen(false)}
      /> */}

<PaymentSuccessModal
  opened={successOpen}
  onClose={() => setSuccessOpen(false)}
     // @ts-ignore
  reference={verifiedRef}
  email={sessionStorage.getItem("registerEmail") || undefined}
/>


    </PageContainer>
  );
};

export default SubscriptionChangePage;
