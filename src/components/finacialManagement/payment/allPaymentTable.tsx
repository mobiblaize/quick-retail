import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { TableRowData } from "../../../types";
import { PaidDot, UnpaidDot } from "../../../assets/svg";
import { ROUTES } from "../../../constants/routes";
import TanTable from "../../General/table";
import { allPaymentOrder, productTableData } from "../../../utils/mockData";

const AllPaymentTable = () => {
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
      header: "Transaction ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex">
          <Text fw={400} className="text-sm">
            {""} {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.timeStamp}
          </Text>
        </div>
      ),
    },
    {
      header: "Recipient",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "Initiated By",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.name}
          </Text>
        </div>
      ),
    },

    {
      header: "Amount",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.totalAmount}
          </Text>
        </div>
      ),
    },
    {
      header: "Payment Processor",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={400} c="gray">
            {props.row.original.paystack}
          </Text>
        </div>
      ),
    },
    {
      header: "Journal Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Successful"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Processing"
                ? "bg-[#FFFAEB] text-[#B54708]"
                : status === "Failed"
                ? "bg-red-100 text-red-500"
                : ""
            }`}
          >
            {status === "Successful" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },

    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewAllPayment}>
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
        data={allPaymentOrder}
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

export default AllPaymentTable;
