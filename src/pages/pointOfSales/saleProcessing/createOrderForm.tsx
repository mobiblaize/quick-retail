import PaymentDetails from "../../../components/dashboard/pointOfSales/salesProcessing/paymentDetails";
import SearchCustomer from "../../../components/dashboard/pointOfSales/salesProcessing/searchCustomer";
import SearchProduct from "../../../components/dashboard/pointOfSales/salesProcessing/searchProduct";

const CreateOrderForm = () => {
  return (
    <main className="flex flex-col gap-8">
      <SearchProduct />
      <SearchCustomer />
      <PaymentDetails />
    </main>
  );
};

export default CreateOrderForm;
