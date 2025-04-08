import { ReturnsProvider } from "../../../components/General/orderContext/orderCreationContext";
import ViewReturnsContent from "./viewReturnsContent";

const ViewReturnsPage: React.FC = () => {
  return (
    <ReturnsProvider>
      <ViewReturnsContent />
    </ReturnsProvider>
  );
};

export default ViewReturnsPage;
