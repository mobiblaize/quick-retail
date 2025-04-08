import React from "react";
import CreateOrderPageContent from "./createOrderPageContent";
import { OrderCreationProvider } from "../../../components/General/orderContext/orderCreationContext";

const CreateOrderPage: React.FC = () => {
  return (
    <>
      <OrderCreationProvider>
        <CreateOrderPageContent />
      </OrderCreationProvider>
    </>
  );
};

export default CreateOrderPage;
