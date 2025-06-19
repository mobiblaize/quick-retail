import { useLocation } from "react-router-dom";
import CustomerDetails from "./customerDetails";
import OrderDetails from "./orderDetails";
import OrderSummary from "./orderSummary";

interface ReturnedProductProps {
  onNext?: () => void;
  onSendMail?: (order: any) => void;
}

const ReturnedProduct: React.FC<ReturnedProductProps> = ({ onSendMail }) => {
  const location = useLocation();
  const returnData = location.state || {};

  if (!returnData.orderId) {
    return <div>No order selected</div>;
  }

  return (
    <>
      <OrderDetails orderId={returnData.orderId} returnData={returnData} returnId={returnData.returnId} />
      <OrderSummary orderId={returnData.orderId} onSendMail={onSendMail}/>
      <CustomerDetails returnId={returnData.returnId} />
    </>
  );
};

export default ReturnedProduct;
