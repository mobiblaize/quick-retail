import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import {
  allSalesCustomers,
  productTableData,
} from "../../../../utils/mockData";
import { Link, useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const CustomerSalesTable = () => {
  const navigate = useNavigate();
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
      cell: ({ row }) => {
        const isSelected = row.getIsSelected();
        const toggleSelect = row.getToggleSelectedHandler();

        return (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              toggleSelect(e);
              navigate(ROUTES.viewCustomer);
            }}
          />
        );
      },
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Customer name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            Last Visit:{""} {props.row.original.date}
          </Text>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.contact}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
            Tel:{""}{" "}
            <span className="text-gray-500">{props.row.original.number}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Total Amount Spent",
      accessorKey: "totalAmount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
            Total Transactions:{""}
            <span className="text-gray-500">
              {props.row.original.totalTransaction}
            </span>
          </Text>
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.timeStamp}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Active" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewCustomer}>
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
        data={allSalesCustomers}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Customers
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

export default CustomerSalesTable;
