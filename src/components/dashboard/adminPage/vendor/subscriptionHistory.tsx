import { useState, useEffect, useMemo } from "react";
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
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  // const [dateRange] = useState({ startDate: "", endDate: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    return status.toLowerCaddase();
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

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    page: currentPage,
    per_page: perPage,
  };
// @ts-ignore
  const { data = {}, isLoading = false, refetch } = useFetchAllSub(payload);
  const subscriptions: Subscription[] = data?.data?.data || [];

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

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Local search and sort using useMemo
  const processedSubscriptions = useMemo(() => {
    let filtered = [...subscriptions];

    // Local search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.subscriptionID?.toLowerCase().includes(term) ||
          s.billing_type?.toLowerCase().includes(term) ||
          s.status?.toLowerCase().includes(term)
      );
    }

    // Local sorting
    switch (activeSort) {
      case "A-Z":
        filtered.sort((a, b) =>
          a.billing_type.localeCompare(b.billing_type)
        );
        break;
      case "Z-A":
        filtered.sort((a, b) =>
          b.billing_type.localeCompare(a.billing_type)
        );
        break;
      case "Recent":
        filtered.sort(
          (a, b) =>
            new Date(b.billing_start).getTime() -
            new Date(a.billing_start).getTime()
        );
        break;
      case "Oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.billing_start).getTime() -
            new Date(b.billing_start).getTime()
        );
        break;
    }

    return filtered;
  }, [subscriptions, searchTerm, activeSort]);

  const columns = [
    {
      key: "subscriptionID",
      header: "Transaction ID",
      render: (s: Subscription) => (
        <Text size="sm" c="#475569">{s.subscriptionID}</Text>
      ),
    },
    {
      key: "billing_type",
      header: "Plan",
      render: (s: Subscription) => (
        <Text size="sm" c="#475569">{s.billing_type} Plan</Text>
      ),
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
      render: (s: Subscription) => {
        const isActive = s.status?.toLowerCase() === "active";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
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
      data={processedSubscriptions}
      isLoading={isLoading}
      activeSort={activeSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSortChange={setActiveSort}
      enableSearch={true}
      enableSort={true}
      showFilter={true}
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
