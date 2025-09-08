import { useState } from "react";
import { Text } from "@mantine/core";
import GenericTable from "../../../General/genericTable";
import { useFetchAllSub } from "../../../../hooks/backendApis/admin/profile";
import { FilterValues } from "../../../General/table/reuseableFilter";

interface Subscription {
  id: string;
  name: string;
  status: string;
  trial: string;
  created_at: string;
  subscriptionID: string;
  billing_type: string;
  total_amount: number;
  billing_start: string;
}

const HistoryTable = () => {
  // States
  const [appliedFilters, setAppliedFilters] = useState<FilterValues| null>(null);
  const [dateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  // Map order status
  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    return status.toLowerCase();
  };

  // Map filters to API payload
  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
    status: mapOrderStatus(filters.paymentStatus),
    paginate: true,
    price_from: filters.priceFrom ?? 100,
    price_to: filters.priceTo ?? "",
    // status: filters.status ?? "",
    // trial: filters.trial ?? "",
  });

  // Merge filters with dateRange
  const startDate = dateRange.startDate || appliedFilters?.startDate || "";
  const endDate = dateRange.endDate || appliedFilters?.endDate || "";

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    ...(startDate ? { start_date: startDate } : {}),
    ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage,
    sort_by: activeSort,
    search: searchTerm,
  };

  // Fetch data
  const { data = {}, isLoading = false } = useFetchAllSub(payload);
  const subscriptions: Subscription[] = data?.data?.data || [];

  // Format price
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  // Handle filter changes
  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  // Handle page change
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Define table columns
  const columns = [
    {
      key: "subscriptionID",
      header: "Transaction ID",
      render: (s: Subscription) => <Text size="sm" c="#475569">{s.subscriptionID}</Text>,
    },
    {
      key: "billing_type",
      header: "Plan",
      render: (s: Subscription) => <Text size="sm" c="#475569">{s.billing_type} Plan</Text>,
    },
    {
      key: "total_amount",
      header: "Amount",
      render: (s: Subscription) => (
        <Text size="sm" fw={500} style={{ color: "#1e293b" }}>
          {formatPrice(s.total_amount)}
        </Text>
      ),
    },
    {
      key: "billing_start",
      header: "Date",
      render: (s: Subscription) => (
        <Text size="sm" c="#475569">
          {new Date(s.billing_start).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (u: Subscription) => {
        const isActive = u.status?.toLowerCase() === "active";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            <span className="ml-2 capitalize">{u.status}</span>
          </div>
        );
      },
    },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Text fw={500} size="md" c="dimmed">
          Loading Subscriptions...
        </Text>
      </div>
    );
  }

  // Render table
  return (
    <GenericTable
      columns={columns}
      data={subscriptions}
      isLoading={isLoading}
      activeSort={activeSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSortChange={setActiveSort}
      enableSearch={true}
      enableSort={true}
      showFilter={true}
      tableType="inventory"
      searchPlaceholder="Search inventory"
      onFilterChange={handleFilterChange}
      onPageChange={handlePageChange}
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All Subscriptions
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">
              {data?.data?.sales?.total || subscriptions.length}
            </Text>
          </div>
        </div>
      }
    />
  );
};

export default HistoryTable;
