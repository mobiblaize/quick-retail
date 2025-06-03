import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { allPurchaseReturnInvoice, productTableData } from "../../../../utils/mockData";

const AllDebitNoteTable = () => {
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
      header: "Transaction Date & ID",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.date}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
      header: "Vendor Name",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.timeStamp}
          </Text>
        </div>
      ),
    },
    {
      header: "Invoice Amount",
      accessorKey: "totalAmount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="gray">
            {props.row.original.totalAmount}
          </Text>
        </div>
      ),
    },
    {
      header: "Returned Amount",
      accessorKey: "amountPaid",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.amountPaid}
          </Text>
        </div>
      ),
    },
    {
      header: "Amount Due",
      accessorKey: "amountDue",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="red">
            {props.row.original.amountDue}
          </Text>
        </div>
      ),
    },

    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewDebitNote}>
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
        data={allPurchaseReturnInvoice}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Debit Note
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

export default AllDebitNoteTable;
