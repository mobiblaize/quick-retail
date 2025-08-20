// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Text } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import TanTable, { PaginationData } from "../../../General/table";
// import {
//   formatDate,
//   shortenTransactionId,
//   toSentenceCase,
// } from "../../../../utils/helpers";
// import { useNavigate } from "react-router";
// import { ROUTES } from "../../../../constants/routes";

// interface AllTransactionTableProps {
//   data?: TableRowData[];
//   isLoading?: boolean;
//   onSortChange: (sortKey: string) => void;
//   paginationData?: PaginationData;
//   onPageChange: (page: number) => void;
//   activeSort?: string;
//   onSearchChange?: (search: string) => void; 
// }

// const AllTransactionTable: React.FC<AllTransactionTableProps> = ({
//   data = [],
//   isLoading = false,
//   onSortChange,
//   paginationData ,   
//   onPageChange,
//   activeSort,
//   onSearchChange,
// }) => {
//   const navigate = useNavigate();

//   const handleViewClick = (orderID: string, payment_status: string) => {
//     // console.log("Navigating with orderID:", orderID);
//     if (payment_status === "paid") {
//       navigate(ROUTES. previewTransaction, { state: { orderID } });
//     } else if (payment_status === "pending") {
//       navigate(ROUTES.viewOrderdraft, { state: { orderID } });
//     } else {
//       console.warn("Unhandled order status:", payment_status);
//     }
//   };

//   const columns: ColumnDef<TableRowData>[] = [

//     {
//       header: "Transaction ID",
//       accessorKey: "transactionID",
//       enableSorting: false, 
//       cell: ({ row }) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             {/* @ts-ignore */}
//             {shortenTransactionId(row.original.transactionID)}
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Transaction Date",
//       accessorFn: (row) => row.created_at,
//       enableSorting: false, 
//       cell: ({ row }) => (
//         <Text fw={400} className="text-sm">
//           {/* @ts-ignore */}
//           {formatDate(row.original.created_at)}
//         </Text>
//       ),
//     },
//     {
//       header: "Order ID",
//       enableSorting: false, 
//       // @ts-ignore
//       accessorFn: (row) => row.sales_order?.orderID ?? "",
//       cell: ({ row }) => (
//         <Text fw={500} c="black">
//           {/* @ts-ignore */}
//           {row.original.sales_order?.orderID}
//         </Text>
//       ),
//     },
//     {
//       header: "Customer Name",
//       accessorKey: "name",
//       enableSorting: false, 
//       cell: ({ row }) => (
//         <span className="text-gray-900 text-sm font-medium">
//           {/* @ts-ignore */}
//           {row.original.sales_order?.customer_name}
//         </span>
//       ),
//     },
//     {
//       header: "Amount",
//       accessorKey: "amount",
//       enableSorting: false, 
//       cell: ({ row }) => (
//         <span className=" text-gray-900 text-sm font-medium">
//                ₦ {row.original.amount}
//         </span>
//       ),
//     },
//     {
//       header: "Payment Status",
//       accessorKey: "paymentStatus",
//       enableSorting: false, 
//       cell: ({ row }) => {
//         const status =
//           // @ts-ignore
//           row.original.sales_order.payment_status?.toLowerCase() || "";

//         const isPaid = status === "paid";

//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//               isPaid
//                 ? "bg-[#ECFDF3] text-[#027A48]"
//                 : "bg-[#FEF3F2] text-[#B42318]"
//             }`}
//           >
//             {isPaid ? <PaidDot /> : <UnpaidDot />}

//             <span className="ml-2">
//               {/* @ts-ignore */}
//               {toSentenceCase(row.original.sales_order.payment_status)}
//             </span>
//           </div>
//         );
//       },
//     },

//     {
//       header: "",
//       accessorKey: "action",
//       enableSorting: false, 
//       cell: ({ row }) => {
//         //@ts-ignore
//         const orderID = row.original.sales_order?.orderID;
//                 //@ts-ignore
//         const payment_status = row.original.sales_order?.payment_status;

//         return (
//           <Text
//             fw={700}
//             c="customPrimary.10"
//             className="cursor-pointer"
//             onClick={() => orderID && handleViewClick(orderID, payment_status)}
//           >
//             View
//           </Text>
//         );
//       },
//     },
//   ];

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       <TanTable
//         columnData={columns}
//         data={data}
//         loadingState={isLoading} 
//         showSearch
//         showSortFilter
//         searchPlaceholder="Search orders"
//         length={8}
//         tableType="transaction"
//         onSortChange={onSortChange}
//         activeSort={activeSort} 
//         serverSidePagination={true}
//         paginationData={paginationData}
//         onPageChange={onPageChange}
//         onSearchChange={onSearchChange}
//         tableTitle={
//           <div className="flex gap-2.5">
//             <Text fw={500} size="xl" c="textSecondary.9">
//              All Transactions
//             </Text>
//             <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//               <Text c="customPrimary.10">{data.length}</Text>
//             </div>
//           </div>
//         }
//       />
//     </main>
//   );
// };

// export default AllTransactionTable;




import { useNavigate } from "react-router";
import { Text, Badge } from "@mantine/core";
import GenericTable from "../../../General/genericTable";
import {
  formatDate,
  shortenTransactionId,
  // toSentenceCase,
  formatMoney,
} from "../../../../utils/helpers";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";

interface AllTransactionTableProps {
  // Support both prop names so it's backward compatible with the old usage
  transactions?: Array<any>;
  data?: Array<any>;
  isLoading: boolean;
  paginationData?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
}

const AllTransactionTable = ({
  transactions,
  data,
  isLoading,
  paginationData,
  onPageChange,
}: AllTransactionTableProps) => {
  const navigate = useNavigate();

  const capitalizeFirstLetter = (text: string) => {
    if (!text) return "";
    const lower = text.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  const handleViewClick = (orderID: string, payment_status: string) => {
    const status = payment_status?.toLowerCase();
    if (status === "paid") {
      navigate(ROUTES.previewTransaction, { state: { orderID } });
    } else if (status === "pending") {
      navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    } else {
      console.warn("Unhandled order status:", payment_status);
    }
  };

  // Use whichever prop is populated (new: transactions, old: data)
  const source = Array.isArray(transactions) && transactions.length > 0
    ? transactions
    : Array.isArray(data)
      ? data
      : [];

  // Flatten rows for the table
  const tableData = source.map((tx: any) => ({
    id: tx.transactionID,
    transactionIDShort: shortenTransactionId(tx.transactionID),
    transactionDate: formatDate(tx.created_at),
    orderID: tx?.sales_order?.orderID || "—",
    customerName: tx?.sales_order?.customer_name || "—",
    amountDisplay: formatMoney(tx?.amount ?? 0),
    paymentStatus: tx?.sales_order?.payment_status || "",
  }));

  const columns = [
    {
      key: "transactionIDShort",
      header: "Transaction ID",
      render: (row: any) => <Text fw={500} c="black">{row.transactionIDShort}</Text>,
    },
    {
      key: "transactionDate",
      header: "Transaction Date",
      render: (row: any) => <Text fw={400} size="sm" c="dimmed">{row.transactionDate}</Text>,
    },
    {
      key: "orderID",
      header: "Order ID",
      render: (row: any) => <Text fw={500} c="black">{row.orderID}</Text>,
    },
    {
      key: "customerName",
      header: "Customer Name",
      render: (row: any) => <Text fw={500} size="sm" c="black">{row.customerName}</Text>,
    },
    {
      key: "amountDisplay",
      header: "Amount",
      render: (row: any) => <Text fw={500} c="black">{row.amountDisplay}</Text>,
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (row: any) => {
        const normalized = row.paymentStatus || "Unknown";
        const isPaid = normalized.toLowerCase() === "paid";
        return (
          <Badge
            leftSection={isPaid ? <PaidDot /> : <UnpaidDot />}
            color={isPaid ? "green" : "red"}
            variant="light"
            radius="lg"
            size="md"
            style={{ textTransform: "none", fontWeight: 500 }}
          >
            {capitalizeFirstLetter(normalized)}
          </Badge>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Text
          fw={700}
          c="customPrimary.10"
          className="cursor-pointer"
          onClick={() => row.orderID !== "—" && handleViewClick(row.orderID, row.paymentStatus)}
        >
          View
        </Text>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text fw={500} size="md" c="dimmed">Loading transactions...</Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto ">
      <GenericTable
        columns={columns}
        data={tableData} // pass the flattened rows
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        titleSection={
          <div className="flex gap-2.5 items-center">
            <Text fw={500} size="xl" c="textSecondary.9">All Transactions</Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {paginationData?.total ?? tableData.length}
              </Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllTransactionTable;
