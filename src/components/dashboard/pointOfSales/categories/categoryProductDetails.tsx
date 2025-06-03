import { Switch, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import {
  useActivateCategories,
  useDeactivateCategories,
  useFetchSubCategory,
} from "../../../../hooks/backendApis/pos/categories";
import ActivateCategory from "./modals/activateCategories";
import DeactivateCategory from "./modals/deactivateCategories";

interface CategoryProductDetailsProps {
  category: {
    id: number | string;
    name: string;
    sub_categories: {
      id: number;
      name: string;
      created_at: string;
      updated_at?: string;
      [key: string]: any;
    }[];
  };
  subCategory: {
    id: number;
    name: string;
    total_products: number;
    in_stock: number;
    user: {
      firstname: string;
      lastname: string;
    };
    created_at: string;
    updated_at?: string;
    [key: string]: any;
  };
}

const CategoryProductDetails = ({
  category,
  subCategory,
}: CategoryProductDetailsProps) => {
  // Use your hooks
  const { mutate: activateCategory } = useActivateCategories(subCategory.id);
  const { mutate: deactivateCategory } = useDeactivateCategories(
    subCategory.id
  );
  const { data, } = useFetchSubCategory(subCategory.id, false);
  // const isoDate = "2025-05-21T10:00:13.000000Z";
  // const date = new Date(isoDate);


  const [tableData, setTableData] = useState([{ status: "Active" }]);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  console.log("Category Data:", category);
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
          title: "Sub Category Activated",
          message: `${category.name} has been activated successfully.`,
          color: "green",
        });
      },
      onError: () => {
        notifications.show({
          title: "Activation Failed",
          message: `Something went wrong while activating ${category.name}.`,
          color: "red",
        });
      },
    });
  };

  const confirmDeactivation = () => {
    deactivateCategory(
      { status: "Inactive" },
      {
        onSuccess: () => {
          setTableData([{ status: "Inactive" }]);
          setIsDeactivateOpen(false);
          notifications.show({
            title: "Sub Category Deactivated",
            message: `${category.name} has been deactivated successfully.`,
            color: "orange",
          });
        },
        onError: () => {
          notifications.show({
            title: "Deactivation Failed",
            message: `Something went wrong while deactivating ${category.name}.`,
            color: "red",
          });
        },
      }
    );
  };
  console.log("User Info:", subCategory.user);

  return (
    <>
      <ActivateCategory
        opened={isActivateOpen}
        onClose={() => setIsActivateOpen(false)}
        onConfirm={confirmActivation}
      />
      <DeactivateCategory
        opened={isDeactivateOpen}
        onClose={() => setIsDeactivateOpen(false)}
        onConfirm={confirmDeactivation}
      />
      <main className="w-full h-auto rounded-lg bg-[#FFF]  px-6 py-8">
        <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full gap-4 md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Sub-category Name</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {subCategory.name}
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Product</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {data?.data?.total_products}
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Date Created</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {new Date(subCategory.created_at)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")}
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Last Modified Date</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {/* @ts-ignore */}
                {new Date(subCategory.updated_at)
                  .toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")}
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full md:max-w-6xl">
            {/* <div className="flex flex-col">
              <Text fw={"500"}>Product Brand</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Puma
              </Text>
            </div> */}
            <div className="flex flex-col">
              <Text fw={"500"}>In Stock</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {data?.data?.in_stock}
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Created By</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                {data?.data?.user?.firstname ?? ""}{" "}
                {data?.data?.user?.lastname ?? ""}
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

                  <div
                    className={
                      tableData[0].status === "Active"
                        ? "text-[#12B76A]"
                        : "text-red-500"
                    }
                  >
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
