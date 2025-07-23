import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable, { PaginationData } from "../../../General/table";
import {
  formatDate,
  shortenTransactionId,
  toSentenceCase,
} from "../../../../utils/helpers";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";

interface AllTransactionTableProps {
  data?: TableRowData[];
  isLoading?: boolean;
  onSortChange: (sortKey: string) => void;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  activeSort?: string;

}

const AllTransactionTable: React.FC<AllTransactionTableProps> = ({
  data = [],
  isLoading = false,
  onSortChange,
  paginationData ,   
  onPageChange,
  activeSort
}) => {
  const navigate = useNavigate();

  const handleViewClick = (orderID: string, payment_status: string) => {
    // console.log("Navigating with orderID:", orderID);
    if (payment_status === "paid") {
      navigate(ROUTES. viewTransaction, { state: { orderID } });
    } else if (payment_status === "pending") {
      navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    } else {
      console.warn("Unhandled order status:", payment_status);
    }
  };

  const columns: ColumnDef<TableRowData>[] = [
   
    {
      header: "Transaction ID",
      accessorKey: "transactionID",
      enableSorting: false, 
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
      enableSorting: false, 
      cell: ({ row }) => (
        <Text fw={400} className="text-sm">
          {/* @ts-ignore */}
          {formatDate(row.original.created_at)}
        </Text>
      ),
    },
    {
      header: "Order ID",
      enableSorting: false, 
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
      enableSorting: false, 
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
      enableSorting: false, 
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.amount}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      enableSorting: false, 
      cell: ({ row }) => {
        const status =
          // @ts-ignore
          row.original.sales_order.payment_status?.toLowerCase() || "";

        const isPaid = status === "paid";

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isPaid
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {isPaid ? <PaidDot /> : <UnpaidDot />}

            <span className="ml-2">
              {/* @ts-ignore */}
              {toSentenceCase(row.original.sales_order.payment_status)}
            </span>
          </div>
        );
      },
    },

    {
      header: "",
      accessorKey: "action",
      enableSorting: false, 
      cell: ({ row }) => {
        //@ts-ignore
        const orderID = row.original.sales_order?.orderID;
                //@ts-ignore
        const payment_status = row.original.sales_order?.payment_status;

        return (
          <Text
            fw={700}
            c="customPrimary.10"
            className="cursor-pointer"
            onClick={() => orderID && handleViewClick(orderID, payment_status)}
          >
            View
          </Text>
        );
      },
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={data}
        loadingState={isLoading} 
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
        tableType="transaction"
        onSortChange={onSortChange}
        activeSort={activeSort} 
        serverSidePagination={true}
        paginationData={paginationData}
        onPageChange={onPageChange}
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
