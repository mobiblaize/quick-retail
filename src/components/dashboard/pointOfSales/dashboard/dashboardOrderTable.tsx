import { useState } from "react";
import { Button, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { formatDate, formatMoney } from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useFetchDashbordOrders } from "../../../../hooks/backendApis/pos/dashboard";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import GenericTable from "../../../General/genericTable";

const DashboardOrdersTable = () => {
  const navigate = useNavigate();
    //@ts-ignore
    const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [dateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    per_page: perPage.toString(),
    paginate: true,
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.paymentStatus),
    price_from: filters.priceFrom ?? 100,
    price_to: filters.priceTo ?? "",
    page: currentPage.toString(),
  });

  const startDate = dateRange.startDate || appliedFilters.startDate || "";
  const endDate = dateRange.endDate || appliedFilters.endDate || "";

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    ...(startDate ? { start_date: startDate } : {}),
    ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage,
      sort_by: activeSort,
      search: searchTerm,
  };

  // @ts-ignore
  const { data = {}, isLoading = false } = useFetchDashbordOrders(payload);
  const salesData = data?.data?.sales?.data ?? [];

 
  const handlePageChange = (page: number) => setCurrentPage(page);

  const tableData = Array.isArray(salesData)
    ? salesData.map((sale) => {
      const totalItems = sale.sale_order_details?.reduce(
        //@ts-ignore
        (sum, item) => sum + (item.quantity_ordered || 0),
        0
      );

      const cashierFullName = sale.cashier
        ? `${sale.cashier.firstname || ""} ${sale.cashier.lastname || ""}`.trim()
        : "Unknown";

      return {
        orderID: sale.orderID,
        date: sale.updated_at,
        customer: sale.customer_name,
        amount: sale.order_total,
        status: sale.payment_status,
        items: totalItems,
        cashier: cashierFullName,
      };
    })
    : [];

  const handleViewClick = (orderID: string, status: string) => {
    if (status === "paid") navigate(ROUTES.viewOrder, { state: { orderID } });
    else if (status === "pending") navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    else console.warn("Unhandled order status:", status);
  };

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const columns = [
    {
      key: "orderID",
      header: "Order ID",
      render: (row: any) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">{row.orderID}</Text>
          <Text fw={500}>Total Items: <span className="ml-1 text-black">{row.items}</span></Text>
        </div>
      ),
    },
    {
      key: "date",
      header: "Time stamp",
      render: (row: any) => <Text c="#667085">{formatDate(row.date)}</Text>,
    },
    {
      key: "cashier",
      header: "Cashier Details",
      render: (row: any) => <Text c="#1D2739">{row.cashier}</Text>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => <Text c="#1D2739">{row.customer}</Text>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (row: any) => <Text c="#1D2739">₦ {formatMoney(row.amount)}</Text>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => {
        const status = row.status;
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${status === "paid" ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FFFAEB] text-[#B54708]"}`}>
            {status === "paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{status}</span>
          </div>
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
          onClick={() => handleViewClick(row.orderID, row.status)}
        >
          View Order
        </Text>
      ),
    },
  ];


  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Text fw={500} size="md" c="dimmed">Loading orders...</Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto">
    

      <GenericTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        activeSort={activeSort}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSortChange={setActiveSort}
        enableSearch={true}
        enableSort={true}
        showFilter={true}
        tableType="sales"
        searchPlaceholder="search orders"
        onFilterChange={handleFilterChange}
       
        onPageChange={handlePageChange}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">Orders</Text>
            {/* <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3"> */}
              {/* <Text c="customPrimary.10">{data?.data?.sales?.total || tableData.length}</Text> */}
            {/* </div> */}
            <div className="flex justify-center mt">
      <Button
        variant="outline"
        radius="xl"
        onClick={() => navigate(ROUTES.sales)}
      >
        View More
      </Button>
    </div>
          </div>
        }
      />
    </main>
  );
};

export default DashboardOrdersTable;
