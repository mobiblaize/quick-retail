import StoreDetails from "../../../components/dashboard/pointOfSales/stores/storeDetails";
import StoreOrderTable from "../../../components/dashboard/pointOfSales/stores/storeOrderTable";
import StoreOverview from "../../../components/dashboard/pointOfSales/stores/storeOverview";

const AllOrders = () => {
  return (
    <main className="grid grid-cols-1  gap-6">
      <StoreOverview />
      <StoreDetails />
      <StoreOrderTable />
    </main>
  );
};

export default AllOrders;
