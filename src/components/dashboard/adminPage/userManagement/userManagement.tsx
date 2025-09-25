import { useState } from "react";
import { Group, Text, UnstyledButton, Loader } from "@mantine/core";
// import { useSearchParams } from "react-router";
import UserManagementTable, { UserRowData } from "./userManagementTable";
import RoleGrid from "./roleGrid";
import UserAnalyticsOverview from "./userAnalyticsOverview";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useFetchUsers } from "../../../../hooks/backendApis/admin/userManagement";

type Props = {
  activeTab: "userManage" | "roleGrid";
  onTabChange: (tab: "userManage" | "roleGrid") => void;
  users?: UserRowData;
  filters?: FilterValues | null;
};

const UserManagementComp = ({ activeTab, onTabChange }: Props) => {
  // const [searchParams, setSearchParams] = useSearchParams();

  // --- State ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [filters, setFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [dateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  // --- Handlers ---

  const handleFilterChange = (filters: FilterValues) => setFilters(filters);

  // Update URL query params like AuditTrailPage
  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "active") return "active";
    if (status.toLowerCase() === "inactive") return "inactive";
    if (status.toLowerCase() === "expired") return "expired";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    per_page: "",
    paginate: true,
    location_name: filters.location ?? "",
    category_name: filters.category ?? "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.userStatus),
    page: currentPage.toString(),
    role: filters.role ?? "",
  });

  const startDate = dateRange.startDate || filters?.startDate || "";
  const endDate = dateRange.endDate || filters?.endDate || "";

  const payload = {
    ...(filters ? mapFiltersToPayload(filters) : {}),
    ...(startDate ? { start_date: startDate } : {}),
    ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  const { data, isLoading } = useFetchUsers(payload);
  const users = data?.data?.users?.data || [];
  const paginationData = data?.data?.users
    ? {
        current_page: data.data.users.current_page,
        last_page: data.data.users.last_page,
        per_page: data.data.users.per_page,
        total: data.data.users.total,
      }
    : undefined;

  return (
    <div className="w-full bg-white p-8">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
          <Loader size="xl" color="orange" />
        </div>
      )}

      {/* Tabs */}
      <Group
        gap="sm"
        pb="md"
        mb="lg"
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <UnstyledButton
          onClick={() => onTabChange("userManage")}
          style={(theme) => ({
            padding: "6px 16px",
            borderRadius: theme.radius.md,
            fontWeight: 500,
            backgroundColor:
              activeTab === "userManage"
                ? theme.colors.orange[0]
                : "transparent",
            color:
              activeTab === "userManage"
                ? theme.colors.orange[9]
                : theme.colors.gray[7],
            transition: "color 150ms ease, background-color 150ms ease",
            "&:hover": { color: theme.colors.orange[9] },
          })}
        >
          <Text size="sm">User Management</Text>
        </UnstyledButton>

        <UnstyledButton
          onClick={() => onTabChange("roleGrid")}
          style={(theme) => ({
            padding: "6px 16px",
            borderRadius: theme.radius.md,
            fontWeight: 500,
            backgroundColor:
              activeTab === "roleGrid" ? theme.colors.orange[0] : "transparent",
            color:
              activeTab === "roleGrid"
                ? theme.colors.orange[9]
                : theme.colors.gray[7],
            transition: "color 150ms ease, background-color 150ms ease",
            "&:hover": { color: theme.colors.orange[9] },
          })}
        >
          <Text size="sm">User Role</Text>
        </UnstyledButton>
      </Group>

      {activeTab === "userManage" && (
        <>
          <UserAnalyticsOverview />
          <UserManagementTable
            users={users}
            isLoading={isLoading}
            paginationData={paginationData}
            onPageChange={setCurrentPage}
            searchTerm={searchTerm}
            setSearchTerm={(val: string) => {
              setSearchTerm((prev) => {
                if (prev !== val) setCurrentPage(1);
                return val;
              });
            }}
            activeSort={activeSort}
            setSort={(sortBy) => {
              setActiveSort(sortBy);
              setCurrentPage(1);
            }}
            onFilterChange={handleFilterChange}
            filters={filters}
          />
        </>
      )}
      {activeTab === "roleGrid" && <RoleGrid />}
    </div>
  );
};

export default UserManagementComp;
