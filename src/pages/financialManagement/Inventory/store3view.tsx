import { StoreOrderProvider } from "../../../components/General/orderContext/orderCreationContext";
import StoreOrderContent2 from "../../pointOfSales/stores/storeOrderContent2";


const ViewStore: React.FC = () => {
  return (
    <>
      <StoreOrderProvider>
        <StoreOrderContent2 />
      </StoreOrderProvider>
    </>
  );
};

export default ViewStore;
