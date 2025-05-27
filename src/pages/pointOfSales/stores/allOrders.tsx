
import StoreDetails from "../../../components/dashboard/pointOfSales/stores/storeDetails";
import StoreOrderTable from "../../../components/dashboard/pointOfSales/stores/storeOrderTable";
import StoreOverview from "../../../components/dashboard/pointOfSales/stores/storeOverview";
import { useSingleStoreStat } from "../../../hooks/backendApis/pos/storeManagement";

interface AllOrdersProps {
  store: any;
}

const AllOrders: React.FC<AllOrdersProps> = ({ store }) => {
  const start = new Date();
  start.setMonth(start.getMonth() - 1);

  const end = new Date();

  const { data: statData } = useSingleStoreStat(store?.locationID, {
    start_date: start.toISOString().split("T")[0],
    end_date: end.toISOString().split("T")[0],
  });


  return (
    <main className="grid grid-cols-1 gap-6">
     <StoreOverview store={store} statData={statData?.data?.stats} />
      <StoreDetails store={store} />
      <StoreOrderTable
        locationId={store?.locationID}
        startDate={start.toISOString().split("T")[0]}
        endDate={end.toISOString().split("T")[0]}
      />
    </main>
  );
};

export default AllOrders;
