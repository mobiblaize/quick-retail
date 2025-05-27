import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { formatDate, shortenTransactionId, toSentenceCase } from "../../../../utils/helpers";

interface AllTransactionTableProps {
  data?: TableRowData[];
  isLoading?: boolean;
}

const AllTransactionTable: React.FC<AllTransactionTableProps> = ({
  data = [],
  // isLoading = false,
}) => {


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
      header: "Transaction ID",
      accessorKey: "transactionID",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {/* @ts-ignore */}
            {shortenTransactionId(row.original.transactionID)}
          </Text>
        </div>
      ),
    },
    {
      header: "Transaction Date",
      accessorFn: (row) => row.created_at,
      cell: ({ row }) => (
        <Text fw={400} className="text-sm">
                    {/* @ts-ignore */}
          {formatDate(row.original.created_at)}
        </Text>
      ),
    },
    {
      header: "Order ID",
      // @ts-ignore
      accessorFn: (row) => row.sales_order?.orderID ?? "",
      cell: ({ row }) => (
        <Text fw={500} c="black">
           {/* @ts-ignore */}
          {shortenTransactionId(row.original.sales_order?.orderID)}
        </Text>
      ),
    },
    {
      header: "Customer Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <span className="text-gray-900 text-sm font-medium">
           {/* @ts-ignore */}
          {row.original.sales_order?.customer_name}
        </span>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.amount}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        // @ts-ignore
        const status = row.original.sales_order.payment_status?.toLowerCase() || "";
    
        const isPaid = status === "paid";
    
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isPaid ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {isPaid ? <PaidDot /> : <UnpaidDot />}
            {/* @ts-ignore */}
            <span className="ml-2">{toSentenceCase(row.original.sales_order.payment_status)}</span>
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
        data={data}
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
              <Text c="customPrimary.10">{data.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllTransactionTable;
