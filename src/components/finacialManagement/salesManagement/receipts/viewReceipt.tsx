import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { Arrowup, PaidDot, UnpaidDot } from "../../../../assets/svg";
import { allReceipts, productTableData } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const ViewReceiptTable = () => {
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
      header: "Invoice ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex gap-1">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
          <Text fw={500} c="gray-300">
            {props.row.original.invoice}
          </Text>
          <Text fw={400} c="red" className="text-sm">
            {props.row.original.no}
          </Text>
        </div>
      ),
    },
    {
      header: "Customer Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.location}
          </Text>
        </div>
      ),
    },
    {
      header: "Created By",
      accessorKey: "createdBy",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.createdBy}
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
              status === "Sent"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Sent" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.shareReceiptView}>
          <Arrowup />
        </Link>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allReceipts}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Receipt
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

export default ViewReceiptTable;
