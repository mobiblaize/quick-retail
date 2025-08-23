import { useNavigate } from "react-router";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";
import { formatDate, formatMoney } from "../../../../utils/helpers";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { FilterValues } from "../../../General/table/reuseableFilter";

export interface SaleRow {
  orderID: string;
  date: string;
  cashier: string;
  customer: string;
  amount: number;
  status: "paid" | "pending" | string;
  items: number;
}

interface CustomerOrdersTableProps {
  salesData: any[];
  onFilterChange?: (filters: FilterValues) => void;
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  onSearchChange?: (search: string) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  filters: FilterValues; 
}

const CustomerOrdersTable = ({
  salesData,
  isLoading,
paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  onFilterChange,
  setSort,
  filters
}: CustomerOrdersTableProps) => {
  // const [sortBy, setSortBy] = useState<string>("");
  const navigate = useNavigate();

  // Map API data to table rows
  const tableData: SaleRow[] = salesData?.map((sale) => {
    const totalItems = sale.sale_order_details?.reduce(
      (sum: number, item: any) => sum + (item.quantity_ordered || 0),
      0
    );

    const cashierFullName = sale.cashier
      ? `${sale.cashier.firstname || ""} ${sale.cashier.lastname || ""}`.trim()
      : "Unknown";

    return {
      orderID: sale.orderID,
      date: sale.updated_at,
      customer: sale.customer_name,
      amount: Number(sale.order_total) || 0,
      status: sale.payment_status,
      items: totalItems || 0,
      cashier: cashierFullName,
    };
  }) || [];

  const handleViewClick = (orderID: string, status: string) => {
    if (status === "paid") navigate(ROUTES.viewOrder, { state: { orderID } });
    else if (status === "pending") navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    else console.warn("Unhandled order status:", status);
  };

  const columns = [
    {
      key: "orderID",
      header: "Order ID",
      render: (row: SaleRow) => (
        <div>
          <Text fw={500} color="black">{row.orderID}</Text>
          <Text size="sm" color="dimmed">
            Total Items: {row.items}
          </Text>
        </div>
      ),
    },
    {
      key: "date",
      header: "Time stamp",
      render: (row: SaleRow) => <Text color="dimmed">{formatDate(row.date)}</Text>,
    },
    {
      key: "cashier",
      header: "Cashier Details",
      render: (row: SaleRow) => <Text color="#1D2739">{row.cashier}</Text>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: SaleRow) => <Text color="#1D2739">{row.customer}</Text>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (row: SaleRow) => <Text color="#1D2739">₦ {formatMoney(row.amount)}</Text>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: SaleRow) => (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 8px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
            backgroundColor: row.status === "paid" ? "#ECFDF3" : "#FFFAEB",
            color: row.status === "paid" ? "#027A48" : "#B54708",
          }}
        >
          {row.status === "paid" ? <PaidDot /> : <UnpaidDot />}
          <span>{row.status}</span>
        </div>
      ),
    },
    {
      key: "action",
      header: "",
      render: (row: SaleRow) => (
        <Text
          fw={700}
          color="customPrimary.10"
          style={{ cursor: "pointer" }}
          onClick={() => handleViewClick(row.orderID, row.status)}
        >
          View Order
        </Text>
      ),
    },
  ];

  return (
     <main className="w-full h-auto">
      <GenericTable
        data={tableData}
        isLoading={isLoading}
        columns={columns}
        paginationData={paginationData}
        onPageChange={onPageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        onFilterChange={onFilterChange}
        showFilter={true}
        tableType="sales"
        searchPlaceholder="search Orders"
        enableSearch ={true}
        enableSort={true}
        filters={filters}   
         titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">Orders</Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10"> {paginationData?.total || tableData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CustomerOrdersTable;
