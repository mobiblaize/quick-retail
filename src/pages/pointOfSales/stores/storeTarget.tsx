import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/stores/analysisOverview";
import StoreOverviewTable from "../../../components/dashboard/pointOfSales/stores/storeOverviewTable";
import AddNewStore from "../../../components/dashboard/pointOfSales/stores/modals/addNewStore";
import { useState } from "react";
import {  useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";


const StoreTarget = () => {
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const { data, isLoading } = useFetchStore(dateRange.startDate && dateRange.endDate ? {
    start_date: dateRange.startDate,
    end_date: dateRange.endDate
  } : undefined);

  const stores = Array.isArray(data?.data?.stores?.data) ? data.data.stores.data : [];

  console.log("Fetched data:", data);

  const [isAddNewStoreOpen, setIsAddNewStoreOpen] = useState(false);
  console.log("Total stores:", data?.data?.stats?.total_stores);
  console.log("Active stores:", data?.data?.stats?.active_stores);
  console.log("Inactive stores:", data?.data?.stats?.inactive_stores);
  const subHeaders = [
    <div key="1" className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <Text fw={500} size="xl" c="black">
          Stores
        </Text>
        <div className="flex gap-4 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <Button
            variant="filled-primary"
            className="flex gap-1.5 items-center whitespace-nowrap"
            style={{ padding: "0.8rem 1rem" }}
            onClick={() => setIsAddNewStoreOpen(true)}
          >
            Add New Store
            <Plus />
          </Button>
        </div>
      </div>
    </div>,
  ];

  // Unified refetch handler (optional)
  const handleRefetchAll = async () => {
    // await refetchStores();
    // await refetchStats();
  };

  return (
    <PageContainer subHeaders={subHeaders}>
    <AnalysisOverview
        data={data?.data?.stats}
        isLoading={isLoading}
        setDateRange={setDateRange}
      />
      <StoreOverviewTable stores={stores} loading={isLoading} refetchStores={handleRefetchAll} />
      <AddNewStore
        opened={isAddNewStoreOpen}
        onClose={() => setIsAddNewStoreOpen(false)}
        refetchStores={handleRefetchAll}
      />
    </PageContainer>
  );
};


export default StoreTarget;
