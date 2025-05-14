import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";
import TanTable from "../../../General/table";
import { assetUpdate } from "../../../../utils/mockData";

const AssetRequestTable = () => {
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
      header: "Asset Type",
      accessorKey: "vendor",
    },
    {
        header: "Asset Description",
        accessorKey: "itemName",
        cell: ({ row }) => (
          <Text c="textSecondary.7">{row.original.itemName}</Text>
        ),
      },
    {
      header: "Department",
      accessorKey: "store",
    },
     {
      header: "Request Date",
      accessorKey: "transactionDate",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.transactionDate}</Text>
      ),
    },
    {
      header: "Status",
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
                : status === "Declined"
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
        <Link to={ROUTES.assetRequestDetails}>
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
        data={assetUpdate}
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
              <Text c="customPrimary.10">{assetUpdate.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AssetRequestTable;
