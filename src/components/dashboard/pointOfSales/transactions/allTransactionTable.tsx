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
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
}

const AllTransactionTable = ({
  transactions,
  data,
  isLoading,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
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

  // Filter table data based on search term
  const filteredData = searchTerm 
    ? tableData.filter(row => 
        Object.values(row).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : tableData;

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
        data={filteredData} // Use filtered data instead of tableData
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        searchPlaceholder="search orders"
        enableSearch={true}
        enableSort={true}
        titleSection={
          <div className="flex gap-2.5 items-center">
            <Text fw={500} size="xl" c="textSecondary.9">All Transactions</Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {paginationData?.total ?? filteredData.length}
              </Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default AllTransactionTable;
