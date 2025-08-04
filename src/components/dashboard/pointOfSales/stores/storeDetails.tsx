import { Switch, Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";
import { useEffect, useState } from "react";
import { shortenTransactionId } from "../../../../utils/helpers";
import { useToggleStore } from "../../../../hooks/backendApis/pos/storeManagement";
import { notifications } from "@mantine/notifications";

interface StoreDetailsProps {
  store: {
    storeID: string;
    locationID: string;
    created_at: string;
    gla: string;
    gsa: string;
    state: string;
    lga: string;
    address: string;
    is_active: number;
    staff_no: number;
  };
}

const StoreDetails: React.FC<StoreDetailsProps> = ({ store }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  useEffect(() => {
    if (store && typeof store.is_active !== "undefined") {
      setIsEnabled(store.is_active === 1);
    }
  }, [store?.is_active]);

  if (!store) {
    return <div>Loading store data...</div>;
  }
  const toggleMutation = useToggleStore(store.locationID);
  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
      <section className="md:mt-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Store ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {shortenTransactionId(store.storeID)}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {new Date(store.created_at).toLocaleString()}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Registered Customers</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* 4,232 */}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Total Staff</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {store.staff_no}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
          <div className="flex flex-col ">
            <Text fw={"500"}>Address</Text>
            <Text
              size="lg"
              c={"black"}
              fw={"400"}
              className="whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {store.address}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>State Lagos</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {store.state}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Local Government Area</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {store.lga}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Status</Text>
            <div className="flex gap-2">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm
    ${
      isEnabled ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#B42318]"
    }`}
              >
                {isEnabled ? "Active" : "Inactive"} <PaidDot />
              </div>

              <Switch
                checked={isEnabled}
                onChange={() => {
                  toggleMutation.mutate(undefined, {
                    onSuccess: () => {
                      const newStatus = isEnabled ? 0 : 1;
                      setIsEnabled(!isEnabled);

                      notifications.show({
                        title: "Store status updated",
                        message: `Store ${
                          newStatus === 1 ? "Activated" : "Deactivated"
                        }.`,
                        color: newStatus === 1 ? "green" : "red",
                      });
                    },
                    onError: () => {
                      notifications.show({
                        title: "Error",
                        message: "Failed to update store status.",
                        color: "red",
                      });
                    },
                  });
                }}
                className={`${
                  isEnabled ? "text-orange-600" : "text-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 max-w-6xl"></div>
      </section>
    </main>
  );
};

export default StoreDetails;
