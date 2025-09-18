import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import HistoryTable, {
  Subscription,
} from "../../../components/dashboard/adminPage/vendor/subscriptionHistory";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useFetchAllSub } from "../../../hooks/backendApis/admin/profile";

const SubscriptionHistoryPage = () => {
  const [filters, setFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "active") return "active";
    if (status.toLowerCase() === "inactive") return "inactive";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    per_page: perPage.toString(),
    paginate: true,
    location_name: filters.location ?? "",
    category_name: filters.category ?? "", 
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.paymentStatus),
    // status: filters.status ?? "",
    page: currentPage.toString(),
    role: filters.role ?? "",
    module: filters.module ?? "",
  });

  const payload = {
    ...mapFiltersToPayload(filters),
    page: currentPage,
    per_page: perPage,
    sort_by: activeSort,
    search: searchTerm,
  };

  const { data, isLoading, error } = useFetchAllSub(payload);
  const subscriptions: Subscription[] = data?.data?.data || [];
  const paginationData = data?.data?.data
    ? {
        current_page: data.current_page,
        last_page: data.last_page,
        per_page: data.per_page,
        total: data.total,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const backButton = (
    <button
      onClick={handleBack}
      className="flex cursor-pointer gap-2 items-center"
    >
      <ChevronLeft />
      <Text fw={500} c="black">
        Back
      </Text>
    </button>
  );

  const subHeaders = [
    <div key="1">
      {backButton}
      <div className="flex items-center mt-4">
        <Text fw={500} size="xl" c="#1D2739">
          Subscription History
        </Text>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <HistoryTable
        isLoading={isLoading}
        error={error}
        data={subscriptions}
        onFilterChange={handleFilterChange}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        perPage={perPage}
        paginationData={paginationData}
        filters={filters}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        activeSort={activeSort}
        setSort={handleSortChange}
      />
    </PageContainer>
  );
};

export default SubscriptionHistoryPage;
