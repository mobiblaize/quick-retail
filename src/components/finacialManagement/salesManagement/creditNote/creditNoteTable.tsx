import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import {  PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  creditNoteData, productTableData } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const CreditNoteTable = () => {
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
      header: "Customer Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={500} c="gray-300">
            Tel:{props.row.original.id}
          </Text>
        </div>
      ),
    },
    {
        header: "Customer Details",
        accessorKey: "id",
        cell: (props) => (
          <div className="flex flex-col gap-1">
            <Text fw={500} c="black">
              {props.row.original.contact}
            </Text>
            <Text fw={500} c="gray-300">
              Tel:{props.row.original.number}
            </Text>
          </div>
        ),
      },
    {
        header: "Invoice Amount",
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
        header: "Returned Value",
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
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Credit Note"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Credit Note" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
        header: "Store Name",
        accessorKey: "store",
        cell: (props) => (
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.store}
            </Text>
          
          </div>
        ),
      },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <div className="text-[#F16722]">
        <Link to={ROUTES.viewCreditNote}>
          View
        </Link>
        </div>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={creditNoteData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
            Credit Note Overview
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

export default CreditNoteTable;
