import TanTable from "../../../General/table";
import { allRequest } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const AllRequestTable = () => {
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
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Success"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Pending"
                ? "bg-[#FFFAEB] text-[#B54708]" 
                : status === "Cancelled"
                ? "bg-red-100 text-red-500" 
                : ""
            }`}
          >
            {status === "Success" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => {
          const status = row.original.status;
      
          // Define the path based on status
          let path = "";
      
          if (status === "Pending") {
            path = ROUTES. viewPendingRequest;
          } else if (status === "Success") {
            path = ROUTES.viewApproveRequest;
          } else if (status === "Cancelled") {
            path = ROUTES. viewCancelledRequest;
          } else {
            path = ROUTES.newRequest; 
          }
      
          return (
            <Link to={path}>
              <Text fw={600} c="customPrimary.10" className="cursor-pointer">
                View
              </Text>
            </Link>
          );
        },
      }      
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allRequest}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Requests
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{allRequest.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllRequestTable;
