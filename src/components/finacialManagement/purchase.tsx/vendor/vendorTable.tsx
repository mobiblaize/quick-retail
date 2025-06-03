import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  allVendors, productTableData } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const VendorTable = () => {
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
      header: "Vendor Name & ID",
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
      header: "Total Bills",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
          
        </div>
      ),
    },
    {
        header: "Paid Bills",
        accessorKey: "contact",
        cell: (props) => (
          <div className="flex flex-col">
            <Text fw={500} c="green">
              {props.row.original.amountDue}
            </Text>
            
          </div>
        ),
      },
      {
        header: "Outstanding Bills",
        accessorKey: "contact",
        cell: (props) => (
          <div className="flex flex-col">
            <Text fw={500} c="red">
              {props.row.original. outstandingbill}
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
        <Link to={ROUTES.viewPurchaseOrder}>
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
        data={allVendors}
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

export default VendorTable;
