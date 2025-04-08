import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { allTransaction, discountProduct } from "../../../../utils/mockData";

const AllTransactionTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Transaction ID",
      accessorKey: "phoneNumber",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.original.phoneNumber}
          </Text>
          <Text fw={400} className="text-sm">
            {row.original.transactionId}
          </Text>
        </div>
      ),
    },
    {
      header: "Transaction Date",
      accessorKey: "transactionDate",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.transactionDate}</Text>
      ),
    },
    {
      header: "Order ID",
      accessorKey: "orderId",
    },
    {
      header: "Amount",
      accessorKey: "Amount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.Amount}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Successful"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {status === "Successful" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Text fw={700} c="customPrimary.10" className="cursor-pointer">
          Download
        </Text>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allTransaction}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Transaction
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{discountProduct.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllTransactionTable;
