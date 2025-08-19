import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import SubscriptionSummary1 from "../../../components/dashboard/adminPage/vendor/SubscriptionSummary1";
import PaymentSummaryModal from "../../../components/dashboard/adminPage/vendor/paymentSummaryModal";
import PaymentSuccessModal from "../../../components/dashboard/adminPage/vendor/paymentSuccessfulModal";
import { useEffect,  useState } from "react";
import { useFetchPaymentSummary } from "../../../hooks/backendApis/authentication/signupAuth";
import {
  useSubmitSubscription,
  useFetchVerifyPayment,
} from "../../../hooks/backendApis/admin/profile";
import { ROUTES } from "../../../constants/routes";

const SubscriptionChangePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const paymentRef = searchParams.get("reference");
  let storedData: any = {};
  try {
    storedData = JSON.parse(sessionStorage.getItem("subscriptionData") || "{}");
  } catch (e) {
    storedData = {};
  }

  const { items, billingType, totalPrice, billingStart, billingEnd, amount } =
    location.state || storedData;

  const [modalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [paymentSummary, setPaymentSummary] = useState();
  const { mutate: fetchPaymentSummary } = useFetchPaymentSummary();
  const { mutate: renewSubscription } = useSubmitSubscription();
  const verifyPayment = useFetchVerifyPayment();
  const [verifiedRef, setVerifiedRef] = useState<string>();
  const [hasVerified, setHasVerified] = useState(false);

  const handleBack = () => navigate(-1);
  console.log(location.state || storedData, "location state or stored data");

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

    // ✅ Save data to sessionStorage before redirection
    sessionStorage.setItem(
      "subscriptionData",
      JSON.stringify({
        items,
        billingType,
        totalPrice,
        billingStart,
        billingEnd,
        amount,
      })
    );

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
      // paystack_complete_callback: "http://localhost:5173/dashboard/change-plan",
      paystack_complete_callback: "https://quickretail-application.vercel.app/dashboard/change-plan",
      paystack_reference: ref,
      applications: items.map((item: any) => ({
        subscription_id: item.subscription_id,
        application_id: item.application_id,
        amount: String(item.price || 0),
        additional_seat: String(item.additionalSeats || 0),
      })),
    };

    renewSubscription(payload, {
      onSuccess: (res: any) => {
        if (!res.error && res.data?.auth_url) {
          // ✅ Redirect to Paystack
          window.location.href = res.data.auth_url;
        } else {
          console.error("No auth_url returned:", res);
        }
      },
      onError: (err) => {
        console.error("Renew failed:", err);
      },
    });
  };

  const [isVerifying, setIsVerifying] = useState(false);


  useEffect(() => {
    if (!paymentRef || hasVerified) return;

    const verify = async () => {
      setIsVerifying(true);

      try {
        const res = await verifyPayment(paymentRef);
        if (!res.error) {
          setVerifiedRef(paymentRef);
          sessionStorage.setItem("registerEmail", res.email || "");
          sessionStorage.removeItem("subscriptionData");
          setHasVerified(true);
          setSuccessOpen(true);
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
                // Optionally, open summary modal here
              }
            },
            onError: (error) => {
              console.error("Failed to fetch payment summary:", error);
            },
          });
          setHasVerified(true);
        } else {
          console.error("Payment verification failed:", res);
          setSuccessOpen(false);
          setHasVerified(true);
        }
      } catch (err) {
        setIsVerifying(false);
        console.error("Verification error:", err);
        setSuccessOpen(false);
        setHasVerified(true);
      }
    };

    verify();
  }, [paymentRef]);


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
      {items ? (
        <SubscriptionSummary1
          items={items}
          billingType={billingType}
          billingStart={billingStart}
          billingEnd={billingEnd}
          totalPrice={totalPrice}
          onContinue={handleContinue}
        />
      ) : (
        <p className="text-center text-sm text-gray-500 mt-10">
          {/* No subscription details found. */}
        </p>
      )}

      <PaymentSummaryModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        onPaymentSuccess={handlePaySuccess}
        summaryData={paymentSummary}
      />
      <PaymentSuccessModal
        opened={successOpen && !!verifiedRef}
        onClose={() => {
          setSuccessOpen(false);
          navigate(ROUTES.vendorpage);
        }}
        reference={verifiedRef}
        email={sessionStorage.getItem("registerEmail") || undefined}
        loading={isVerifying}
      />
    </PageContainer>
  );
};

export default SubscriptionChangePage;
