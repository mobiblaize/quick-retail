
import { OrderCreationProvider } from "../../../components/General/orderContext/orderCreationContext";
import CreateOrderPageContent from "./createOrderPageContent";

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
