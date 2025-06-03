import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { TableRowData } from "../../../types";
import { ROUTES } from "../../../constants/routes";
import TanTable from "../../General/table";
import { allWarehouse, productTableData } from "../../../utils/mockData";

const WarehouseTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Name & ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Address",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="#667185">
            {props.row.original.address}
          </Text>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="#667185">
            {props.row.original.timeStamp}
          </Text>
        </div>
      ),
    },
    {
      header: "Inventory",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.inventory}
          </Text>
        </div>
      ),
    },

    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.inventoryWarehouseDetails}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allWarehouse}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Warehouse
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{productTableData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default WarehouseTable;
