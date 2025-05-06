import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { allRequestUpdate } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const AllRequestUpdate = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Request ID",
      accessorKey: "phoneNumber",
      cell: ({ row }) => (
        <Text fw={500} c="black">
          {row.original.phoneNumber}
        </Text>
      ),
    },
    {
      header: "Item Name",
      accessorKey: "itemName",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.itemName}</Text>
      ),
    },
    {
      header: "Vendor",
      accessorKey: "vendor",
    },
    {
      header: "Date Created",
      accessorKey: "transactionDate",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.transactionDate}</Text>
      ),
    },
    {
      header: "Store",
      accessorKey: "store",
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Price",
      accessorKey: "Amount",
    },
    {
      header: "Order Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
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
      cell: () => (
        <Link to={ROUTES.requestSummaryPage}>
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
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
        data={allRequestUpdate}
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
              <Text c="customPrimary.10">{allRequestUpdate.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllRequestUpdate;
