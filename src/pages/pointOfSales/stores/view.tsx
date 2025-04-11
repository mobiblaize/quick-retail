import React from "react";
import { StoreOrderProvider } from "../../../components/General/orderContext/orderCreationContext";
import StoreOrderContent from "./storeOrderContent";

const View: React.FC = () => {
  return (
    <>
      <StoreOrderProvider>
        <StoreOrderContent />
      </StoreOrderProvider>
    </>
  );
};

export default View;
