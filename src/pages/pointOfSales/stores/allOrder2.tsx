import StoreDetails from "../../../components/dashboard/pointOfSales/stores/storeDetails";import StoreOrderTable2 from "../../../components/dashboard/pointOfSales/stores/storeOrderTable2";
;
import StoreOverview from "../../../components/dashboard/pointOfSales/stores/storeOverview";

const AllOrders2 = () => {
  return (
    <main className="grid grid-cols-1  gap-6">
      <StoreOverview store={undefined} statData={undefined} />
      <StoreDetails store={{
        storeID: "",
        created_at: "",
        gla: "",
        gsa: "",
        state: "",
        lga: "",
        address: "",
        is_active: 0
      }} />
      <StoreOrderTable2 />
    </main>
  );
};

export default AllOrders2;
