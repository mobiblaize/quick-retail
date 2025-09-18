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
  const [filters, setFilters] =useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);

  // --- Handlers ---
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

    // Update URL query params like AuditTrailPage
    const queryObj: Record<string, string> = {
      ...(newFilters.role && { role: newFilters.role }),
      ...(newFilters.status && { status: newFilters.status }),
      ...(newFilters.location && { location: newFilters.location }),
      ...(newFilters.startDate && { start_date: newFilters.startDate }),
      ...(newFilters.endDate && { end_date: newFilters.endDate }),
      paginate: "true",
    };

    setSearchTerm(queryObj.role || queryObj.status || queryObj.location || "");
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
    status: filters.status ?? "",
    page: currentPage.toString(),
    role: filters.role ?? ""
  });

  const payload = {
    ...(filters ? mapFiltersToPayload(filters) : {}),
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
      <Group gap="sm" pb="md" mb="lg" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <UnstyledButton
          onClick={() => onTabChange("userManage")}
          style={(theme) => ({
            padding: "6px 16px",
            borderRadius: theme.radius.md,
            fontWeight: 500,
            backgroundColor: activeTab === "userManage" ? theme.colors.orange[0] : "transparent",
            color: activeTab === "userManage" ? theme.colors.orange[9] : theme.colors.gray[7],
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
            backgroundColor: activeTab === "roleGrid" ? theme.colors.orange[0] : "transparent",
            color: activeTab === "roleGrid" ? theme.colors.orange[9] : theme.colors.gray[7],
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
      setSearchTerm={handleSearchChange}
      activeSort={activeSort}
      setSort={handleSortChange}
      onFilterChange={handleFilterChange}
      filters={filters}
    />
  </>
)}
{activeTab === "roleGrid" && <RoleGrid />}
</div>  );
};

export default UserManagementComp;
