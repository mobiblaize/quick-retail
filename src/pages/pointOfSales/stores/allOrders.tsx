
import StoreDetails from "../../../components/dashboard/pointOfSales/stores/storeDetails";
import StoreOrderTable from "../../../components/dashboard/pointOfSales/stores/storeOrderTable";
import StoreOverview from "../../../components/dashboard/pointOfSales/stores/storeOverview";
import { useSingleStoreStat } from "../../../hooks/backendApis/pos/storeManagement";
import { Loader } from "@mantine/core";
import { useState } from "react";

interface AllOrdersProps {
  store: any;
}

const AllOrders: React.FC<AllOrdersProps> = ({ store }) => {
  const start = new Date();
  start.setMonth(start.getMonth() - 1);
const [isLoading,]= useState();
  // const end = new Date();

  const { data: statData } = useSingleStoreStat(store?.locationID, {
    // start_date: start.toISOString().split("T")[0],
    // end_date: end.toISOString().split("T")[0],
  });
// console.log(data)

  return (
    <main className="grid grid-cols-1 gap-6">
       {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
     <StoreOverview store={store} statData={statData?.data?.stats} />
     <StoreDetails store={{ ...store, locationID: store?.locationID }} />
      <StoreOrderTable
        locationId={store?.locationID}
        // startDate={start.toISOString().split("T")[0]}
        // endDate={end.toISOString().split("T")[0]}
      />
    </main>
  );
};

export default AllOrders;
