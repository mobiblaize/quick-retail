import StoreDetails from "../../../components/dashboard/pointOfSales/stores/storeDetails";import StoreOrderTable2 from "../../../components/dashboard/pointOfSales/stores/storeOrderTable2";
;
import StoreOverview from "../../../components/dashboard/pointOfSales/stores/storeOverview";
interface AllOrdersProps {
  store: any;
}

const AllOrders2: React.FC<AllOrdersProps> = ({ store }) => {

  return (
    <main className="grid grid-cols-1  gap-6">
      <StoreOverview store={undefined} statData={undefined} />
      <StoreDetails store={store} />
      <StoreOrderTable2 />
    </main>
  );
};

export default AllOrders2;
