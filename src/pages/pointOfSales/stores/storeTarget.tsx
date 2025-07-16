import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/stores/analysisOverview";
import StoreOverviewTable from "../../../components/dashboard/pointOfSales/stores/storeOverviewTable";
import AddNewStore from "../../../components/dashboard/pointOfSales/stores/modals/addNewStore";
import { useState } from "react";
import {  useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { FilterValues } from "../../../components/General/table/reuseableFilter";


const StoreTarget = () => {
  const [, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
  });

  const payload = mapFiltersToPayload(appliedFilters);
  const { data, isLoading } = useFetchStore(payload); 
  
  const stores = Array.isArray(data?.data?.stores?.data) ? data.data.stores.data : [];


  const [isAddNewStoreOpen, setIsAddNewStoreOpen] = useState(false);

  const subHeaders = [
    <div key="1" className="w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <Text fw={500} size="xl"c="#1D2739">
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
      <StoreOverviewTable stores={stores} loading={isLoading} refetchStores={handleRefetchAll}  onSortChange={(sortKey) => {
    const newFilters = { ...appliedFilters, sortBy: sortKey };
    setAppliedFilters(newFilters);
  }} />
      <AddNewStore
        opened={isAddNewStoreOpen}
        onClose={() => setIsAddNewStoreOpen(false)}
        refetchStores={handleRefetchAll}
      />
    </PageContainer>
  );
};


export default StoreTarget;
