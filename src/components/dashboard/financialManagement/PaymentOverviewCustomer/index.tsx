import AnalyticCustomerOverview from "./AnalyticOverview";
import Header from "./header";
import CustomerPaymentOverview from "./OverviewCustomerPayment";

const PaymentOverview = () => {
  return (
    <div>
      <Header />
      <AnalyticCustomerOverview />
      <CustomerPaymentOverview />
    </div>
  );
};

export default PaymentOverview;
