import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { GreyDot, PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  productTableData, salesInvoice } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const SalesInvoiceTable = () => {
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
      header: "Customer name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            {""} {props.row.original.date}
          </Text>
        </div>
      ),
    },
    {
      header: "Customer Details",
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
      header: "Invoice Amount",
      accessorKey: "totalAmount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
     
            <span className="text-gray-500">
              {props.row.original.totalTransaction}
            </span>
          </Text>
        </div>
      ),
    },
    {
      header: "Due Date",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.timeStamp}
        </Text>
      ),
    },
    {
        header: "Share Status",
        accessorKey: "status",
        cell: (props) => {
          const status = props.row.original.status;
      
          let bgColor = "";
          let textColor = "";
          let DotIcon = null;
      
          if (status === "Sent") {
            bgColor = "bg-[#ECFDF3]";
            textColor = "text-[#027A48]";
            DotIcon = <PaidDot />;
          } else if (status === "Pending") {
            bgColor = "bg-[#FFFAEB]";
            textColor = "text-[#B54708]";
            DotIcon = <UnpaidDot />;
          } else if (status === "Draft") {
            bgColor = "bg-[#F2F4F7]";
            textColor = "text-[#667085]";
            DotIcon = <GreyDot />;
          }
      
          return (
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgColor} ${textColor}`}
            >
              {DotIcon}
              <span className="ml-2">{status}</span>
            </div>
          );
        },
      },
      
        
      {
        header: " Amount Due",
        accessorKey: "totalAmount",
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
          <Link to={ROUTES.previewInvoice}>
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
        data={salesInvoice}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Invoice
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

export default SalesInvoiceTable;
