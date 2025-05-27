import { useLocation } from "react-router-dom";
import CustomerDetails from "./customerDetails";
import OrderDetails from "./orderDetails";
import OrderSummary from "./orderSummary";

interface ReturnedProductProps {
  onNext?: () => void;
}

const ReturnedProduct: React.FC<ReturnedProductProps> = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;


  if (!orderId) {
    return <div>No order selected</div>;
  }

  return (
    <>
      <OrderDetails orderId={orderId} />
      <OrderSummary orderId={orderId} />
      <CustomerDetails orderId={orderId}/>
    </>
  );
};

export default ReturnedProduct;
