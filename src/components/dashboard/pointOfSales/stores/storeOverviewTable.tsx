import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import {
  storeOverviewData,
  storeTargetOrder,
} from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const StoreOverviewTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Store Name",
      accessorKey: "storeName",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storeName}
          </Text>
          <Text fw={400} className="text-sm">
            Store ID: {props.row.original.storeId}
          </Text>
        </div>
      ),
    },
    {
      header: "Store Size",
      accessorKey: "store",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storeSizeA}
          </Text>
          <Text fw={400} className="text-sm">
            Store ID: {props.row.original.storeSizeA}
          </Text>
        </div>
      ),
    },
    {
      header: "Store Location",
      accessorKey: "location",
      cell: (props) => <Text>{props.row.original.location}</Text>,
    },
    {
      header: "Date Created",
      accessorKey: "dateCreated",
      cell: ({ row }) => (
        <Text c={"black"} fw={500} className="text-sm font-medium">
          {row.original.dateCreated}
        </Text>
      ),
    },
    {
      header: "Total Customers",
      accessorKey: "totalCustomers",
      cell: ({ row }) => (
        <Text c={"black"} fw={500} className="text-sm font-medium">
          {row.original.dateCreated}
        </Text>
      ),
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewStore}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];
  return (
    <div>
      <main className="w-full h-auto py-6 rounded-lg bg-white">
        <TanTable
          columnData={columns}
          data={storeOverviewData}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Stores Overview
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{storeTargetOrder.length}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default StoreOverviewTable;
