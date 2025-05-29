import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Loader, Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { storeTargetOrder } from "../../../../utils/mockData";
import { useState } from "react";
import ViewStoreTarget from "./modals/viewStoreTarget";
import { formatDate } from "../../../../utils/helpers";

const StoreTargetTable = ({ stores = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading stores...
        </Text>
      </div>
    );
  }
  console.log(stores, "stores");
  if (!stores.length) return <p>No stores available.</p>;
  const [isViewTargetOpen, setIsViewTargetOpen] = useState(false);

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Customer Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            Store ID: {props.row.original.storeID}
          </Text>
        </div>
      ),
    },
    {
      header: "Date Created",
      accessorKey: "date",
      //@ts-ignore
      cell: (props) => <Text>{formatDate(props.row.original.created_at)}</Text>,
    },
    {
      header: "Conversion Rate",
      accessorKey: "conversionRate",
      cell: (props) => <Text>{props.row.original.conversion_rate}</Text>,
    },
    {
      header: "ATV",
      accessorKey: "atv",
      cell: ({ row }) => (
        <Text c={"black"} fw={500} className="text-sm font-medium">
          {row.original.avg_transaction_value}
        </Text>
      ),
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <button onClick={() => setIsViewTargetOpen(true)}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </button>
      ),
    },
  ];
  return (
    <div>
      <main className="w-full h-auto py-6 rounded-lg bg-white">
        <TanTable
          columnData={columns}
          data={stores}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Store Target
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{storeTargetOrder.length}</Text>
              </div>
            </div>
          }
        />
      </main>
      <ViewStoreTarget
        opened={isViewTargetOpen}
        onClose={() => setIsViewTargetOpen(false)}
      />
    </div>
  );
};

export default StoreTargetTable;
