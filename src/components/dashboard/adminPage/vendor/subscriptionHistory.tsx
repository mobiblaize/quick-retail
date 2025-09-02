import { useState, useEffect } from "react";
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
        //@ts-ignore
  
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: searchTerm,
    sort_by: activeSort,
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
    status: mapOrderStatus(filters.paymentStatus),
    paginate: true,
    price_from: filters.priceFrom ?? "",
    price_to: filters.priceTo ?? "",
  });

  const payload = { ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}) };
        //@ts-ignore

  const { data = {}, isLoading = false, refetch } = useFetchAllSub(payload);
  const subscriptions: Subscription[] = data?.data?.data || [];

  const paginationData = data?.data
    ? {
        current_page: data.data.current_page || currentPage,
        last_page: data.data.last_page || 1,
        per_page: data.data.per_page || perPage,
        total: data.data.total || subscriptions.length,
        from: data.data.from || 1,
        to: data.data.to || subscriptions.length,
      }
    : undefined;

  useEffect(() => {
    refetch();
  }, [searchTerm, activeSort, currentPage, appliedFilters]);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortBy: string) => {
    setActiveSort(sortBy);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

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
        <Text size="sm" c="#475569">{new Date(s.billing_start).toLocaleDateString()}</Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (s: Subscription) => {
        const isActive = s.status?.toLowerCase() === "active";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive ? "bg-[#ECFDF3] text-[#027A48]" : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            <span className="ml-2 capitalize">{s.status}</span>
          </div>
        );
      },
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={subscriptions}
      isLoading={isLoading}
      paginationData={paginationData}
      activeSort={activeSort}
      searchTerm={searchTerm}
      setSearchTerm={handleSearchChange}
      onSortChange={handleSortChange}
      enableSearch
      enableSort
      showFilter
      tableType="transaction"
      searchPlaceholder="Search subscriptions"
      onFilterChange={handleFilterChange}
      onPageChange={handlePageChange}
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All Subscriptions
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">{paginationData?.total || subscriptions.length}</Text>
          </div>
        </div>
      }
    />
  );
};

export default HistoryTable;
