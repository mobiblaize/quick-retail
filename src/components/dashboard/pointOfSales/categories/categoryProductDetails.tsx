import { Switch, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import { useActivateCategories, useDeactivateCategories } from "../../../../hooks/backendApis/pos/categories";
import ActivateCategory from "./modals/activateCategories";
import DeactivateCategory from "./modals/deactivateCategories";



interface CategoryProductDetailsProps {
  category: {
    id: number | string;
    name: string;
    // add any other fields you need
  };
}

const CategoryProductDetails = ({ category }: CategoryProductDetailsProps) => {
  // Use your hooks
  const { mutate: activateCategory } = useActivateCategories(category.id);
  const { mutate: deactivateCategory } = useDeactivateCategories(category.id);

  const [tableData, setTableData] = useState([{ status: "Active" }]);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);

  const handleToggle = () => {
    const currentStatus = tableData[0].status;
    if (currentStatus === "Active") {
      setIsDeactivateOpen(true); 
    } else {
      setIsActivateOpen(true); 
    }
  };

  const confirmActivation = () => {
    activateCategory(undefined, {
      onSuccess: () => {
        setTableData([{ status: "Active" }]);
        setIsActivateOpen(false);
        notifications.show({
          title: 'Category Activated',
          message: `${category.name} has been activated successfully.`,
          color: 'green',
   
        });
      },
      onError: () => {
        notifications.show({
          title: 'Activation Failed',
          message: `Something went wrong while activating ${category.name}.`,
          color: 'red',
     
        });
      }
    });
  };
  
  
  const confirmDeactivation = () => {
    deactivateCategory({ status: "Inactive" }, {
      onSuccess: () => {
        setTableData([{ status: "Inactive" }]);
        setIsDeactivateOpen(false);
        notifications.show({
          title: 'Category Deactivated',
          message: `${category.name} has been deactivated successfully.`,
          color: 'orange',

        });
      },
      onError: () => {
        notifications.show({
          title: 'Deactivation Failed',
          message: `Something went wrong while deactivating ${category.name}.`,
          color: 'red',

        });
      }
    });
  };

  return (
    <>
      <ActivateCategory opened={isActivateOpen} onClose={() => setIsActivateOpen(false)} onConfirm={confirmActivation} />
      <DeactivateCategory opened={isDeactivateOpen} onClose={() => setIsDeactivateOpen(false)} onConfirm={confirmDeactivation} />
    <main className="w-full h-auto rounded-lg bg-[#FFF]  px-6 py-8">
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full gap-4 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Sub-category Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma Bag
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Product</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              42
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Last Modified Date</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Product Brand</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>In Stock</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              110 Items
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Created By</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Xavier Ayeni
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              <div className="flex items-center gap-2">
              <Switch
  checked={tableData[0].status === "Active"}
  onChange={() => handleToggle()}
  color="orange"
  size="md"
/>

<div className={tableData[0].status === "Active" ? "text-[#12B76A]" : "text-red-500"}>
  {tableData[0].status}
</div>

              </div>
            </Text>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default CategoryProductDetails;
