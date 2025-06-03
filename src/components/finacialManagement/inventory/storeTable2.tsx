import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { TableRowData } from "../../../types";
import { PaidDot, UnpaidDot } from "../../../assets/svg";
import { ROUTES } from "../../../constants/routes";
import TanTable from "../../General/table";
import { productTableData, storeOrders } from "../../../utils/mockData";

const StoreTable = () => {
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
      header: "Store Name",
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
      header: "Store Size",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.storesize}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.storesize}
          </Text>
        </div>
      ),
    },
    {
      header: "Store Location",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.location}
          </Text>
        </div>
      ),
    },
    {
      header: "Date Created",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.timestamp}
          </Text>
        </div>
      ),
    },
    {
      header: "Total Customers",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.customer}
          </Text>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        const isActive = status === "Active";
    
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#F2F4F7] text-[gray]"
            }`}
          >
            {isActive ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
            <span className="ml-2">
              {isActive ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 40 22">
                  <rect width="40" height="22" rx="11" fill="#FFA500"/>
                  <circle cx="29" cy="11" r="9" fill="#ffffff"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="18" viewBox="0 0 40 22">
                  <rect width="40" height="22" rx="11" fill="#CCCCCC"/>
                  <circle cx="11" cy="11" r="9" fill="#ffffff"/>
                </svg>
              )}
            </span>
          </div>
        );
      },
    }
    ,

    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.singularInventory}>
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
        data={storeOrders}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Purchase Invoice
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

export default StoreTable;
