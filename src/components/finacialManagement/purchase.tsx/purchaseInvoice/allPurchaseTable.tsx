import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import {  PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  allPurchaseInvoice, productTableData, } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const AllPurchaseTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
        id: 'select',
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
      header: "Date Issued & ID",
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
      header: "Vendor Details",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
            Tel:{""}{" "}
            <span className="text-gray-500">{props.row.original.number}</span>
          </Text>
        </div>
      ),
    },
    {
        header: "Payment Status",
        accessorKey: "status",
        cell: (props) => {
          const status = props.row.original.status;
          return (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Full Payment"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FFFAEB] text-[#B54708]"
              }`}
            >
              {/* {status === "Full Payment" ? <PaidDot /> : <UnpaidDot />} */}
              <span className="ml-2">{status}</span>
            </div>
          );
        },
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
        header: "Amount Paid",
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
            <Text fw={500} c="black">
              {props.row.original.amountDue}
            </Text>
          
          </div>
        ),
      },
      {
        header: "Finance Status",
        accessorKey: "finStatus",
        cell: (props) => {
          const status = props.row.original.finStatus;
          return (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
                status === "Impact"
                  ? "bg-[#ECFDF3] text-[#027A48]"
                  : "bg-[#FFFAEB] text-[#B54708]"
              }`}
            >
              {status === "Impact" ? <PaidDot /> : <UnpaidDot />}
              <span className="ml-2">{status}</span>
            </div>
          );
        },
      },
    
    {
        header: "",
        accessorKey: "action",
        cell: () => (
          <Link to={ROUTES.viewPurchaseInvoice}>
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
        data={allPurchaseInvoice}
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

export default AllPurchaseTable;
