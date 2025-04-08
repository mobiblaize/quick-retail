import React from "react";
import CustomerDetails from "./customerDetails";
import OrderDetails from "./orderDetails";
import OrderSummary from "./orderSummary";

interface ReturnedProductProps {
  onNext?: () => void;
}

const ReturnedProduct: React.FC<ReturnedProductProps> = () => {
  return (
    <>
      <OrderDetails />
      <OrderSummary />
      <CustomerDetails />
    </>
  );
};

export default ReturnedProduct;
