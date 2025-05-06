import TanTable from "../../../General/table";
import { allCancelledRequest  } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import {  UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const TotalCancelledRequestTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Request Details",
      accessorKey: "requestDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Vendor Details",
      accessorKey: "vendorDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Requestor Details",
      accessorKey: "requestorDetails",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {row.original.name}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productCode}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Request Value",
      accessorKey: "requestValue",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.requestValue}
        </span>
      ),
    },
    {
      header: "Number of Items",
      accessorKey: "numberOfItems",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.numberOfItems}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const isCancelled = status === "Cancelled";
    
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isCancelled ? "bg-red-100 text-red-500" : ""
            }`}
          >
            <UnpaidDot /> 
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewCancelledRequest}>
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
        data={allCancelledRequest }
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Total Approve Requests
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{allCancelledRequest.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default TotalCancelledRequestTable;
