import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { storeTargetOrder } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const StoreTargetTable = () => {
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
            Store ID: {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Date Created",
      accessorKey: "date",
      cell: (props) => <Text>{props.row.original.date}</Text>,
    },
    {
      header: "Conversion Rate",
      accessorKey: "conversionRate",
      cell: (props) => <Text>{props.row.original.conversionRate}</Text>,
    },
    {
      header: "ATV",
      accessorKey: "atv",
      cell: ({ row }) => (
        <Text c={"black"} fw={500} className="text-sm font-medium">
          {row.original.atv}
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
          data={storeTargetOrder}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
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
    </div>
  );
};

export default StoreTargetTable;
