import PaymentSummary from "./paymentSummary";
import SubscriptionSummary from "./subscriptionSummary";

const Summary = () => {
  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <SubscriptionSummary />
      <PaymentSummary />
    </main>
  );
};

export default Summary;
