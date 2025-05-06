import TanTable from "../../../General/table";
import { goodsRecord } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const AllGoodsTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: " Store Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.original.name}
          </Text>
          <Text fw={500} className="text-sm flex gap-2">
            ID: <Text c="textSecondary.7">{row.original.productCode}</Text>
          </Text>
        </div>
      ),
    },
    {
      header: "Vendor Details",
      accessorKey: "customer",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className=" text-gray-900 text-sm font-medium">
            {row.original.customer}
          </span>
          <Text fw={500} className="text-sm flex gap-2">
            ID: <Text c="textSecondary.7">{row.original.productCode}</Text>
          </Text>
        </div>
      ),
    },
    {
      header: "G.R.N Total Value",
      accessorKey: "orderId",
    },
    {
      header: "Date Created",
      accessorKey: "dateReturned",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.dateReturned}</Text>
      ),
    },
    {
      header: "Total Quantity Received",
      accessorKey: "returnedReason",
    },
    {
      header: "G.R.N Status",
      accessorKey: "complaintStatus",
      cell: ({ row }) => {
        const status = row.original.complaintStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Approved"
              ? "bg-[#ECFDF3] text-[#027A48]"
              : status === "Pending"
              ? "bg-[#FFFAEB] text-[#B54708]" 
              : status === "Rejected"
              ? "bg-red-100 text-red-500" 
              : ""
            }`}
          >
            {status === "Approved" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
        header: "",
        accessorKey: "action",
        cell: ({ row }) => {
          const status = row.original.complaintStatus;
      
          let path = "";
          if (status === "Pending") {
            path = ROUTES.pendingNoteDetails;
          } else if (status === "Approved") {
            path = ROUTES.approvedNoteDetails;
          } else if (status === "Rejected") {
            path = ROUTES.rejectedNoteDetails;
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
      },
      
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={goodsRecord}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Good Received Note
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{goodsRecord.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllGoodsTable;
