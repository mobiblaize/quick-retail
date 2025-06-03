import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { TableRowData } from "../../../../types";
import {
  allRemittance,
  productTableData,
} from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { ArrowIcon, PaidDot, UnpaidDot } from "../../../../assets/svg";


const AllRemittanceTable = () => {
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
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
          {/* <Text fw={400} className="text-sm">
            {""} {props.row.original.id}
          </Text> */}
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
        header: "Created by",
        accessorKey: "location",
        cell: (props) => (
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.contact}
            </Text>
          </div>
        ),
      },
      {
        header: "Remittance Advice",
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
        <Link to={ROUTES.viewRemittance}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            < ArrowIcon />
          </Text>
        </Link>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allRemittance}
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

export default AllRemittanceTable;
