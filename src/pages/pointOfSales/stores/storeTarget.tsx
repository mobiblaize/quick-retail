import { Button, Text } from "@mantine/core";
import { Plus } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import AnalysisOverview from "../../../components/dashboard/pointOfSales/stores/analysisOverview";
import StoreOverviewTable from "../../../components/dashboard/pointOfSales/stores/storeOverviewTable";
import AddNewStore from "../../../components/dashboard/pointOfSales/stores/modals/addNewStore";
import { useState } from "react";
import { useFetchStat, useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import house from "../../../assets/images/house.png";
import activeStore from "../../../assets/images/activeStore.png";
import inactiveStore from "../../../assets/images/inactiveStore.png";

const StoreTarget = () => {
  const [isAddNewStoreOpen, setIsAddNewStoreOpen] = useState(false);
  const { data, isPending, refetch: refetchStores } = useFetchStore({ paginate: true });

  const { data: statData, refetch: refetchStats } = useFetchStat();

  const stores = Array.isArray(data?.data?.stores?.data) ? data.data.stores.data : [];

  const stats = statData?.data
    ? [
        {
          title: "Total Stores",
          value: statData.data.totalStores,
          icon: house,
          altText: "Total Stores",
          iconColor: "#E17036",
          textColor: "#000",
          cardBgColor: "linear-gradient(to bottom, #F16722, #B63D00)",
          percentageValue: 0.5,
          borderColor: "#b3d8ff",
        },
        {
          title: "Active Stores",
          value: statData.data.activeStores,
          icon: activeStore,
          altText: "Active Stores",
          iconColor: "#E17036",
          textColor: "#000",
          cardBgColor: "#EFF8FF",
          percentageValue: 0.5,
          borderColor: "#98A2B3",
        },
        {
          title: "Inactive Stores",
          value: statData.data.inActiveStores,
          icon: inactiveStore,
          altText: "Inactive Stores",
          iconColor: "#E17036",
          textColor: "#000",
          cardBgColor: "#F4F3FF",
          percentageValue: 0.5,
          borderColor: "#98A2B3",
        },
      ]
    : [];

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
    await refetchStores();
    await refetchStats();
  };

  return (
    <PageContainer subHeaders={subHeaders}>
      <AnalysisOverview stats={stats} />
      <StoreOverviewTable stores={stores} loading={isPending} refetchStores={handleRefetchAll} />
      <AddNewStore
        opened={isAddNewStoreOpen}
        onClose={() => setIsAddNewStoreOpen(false)}
        refetchStores={handleRefetchAll}
      />
    </PageContainer>
  );
};


export default StoreTarget;
