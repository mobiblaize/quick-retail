import AnalyticVendorOverview from "./AnalyticOverview";
import Header from "./header";
import VendorPaymentOverview from "./overviewVendorPayment";

const PaymentOverview = () => {
  return (
    <div>
      <Header />
      <AnalyticVendorOverview />
      <VendorPaymentOverview />
    </div>
  );
};

export default PaymentOverview;
