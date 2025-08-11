import TanTable, { PaginationData } from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchUsers } from "../../../../hooks/backendApis/admin/userManagement";
import { useEffect, useState } from "react";
import { FilterValues } from "../../../General/table/reuseableFilter";
import * as dayjs from "dayjs"; // <--- Changed import to namespace import

export interface UserRowData {
  user_uuid: string;
  userID: string;
  firstname: string;
  lastname: string;
  email: string;
  last_login: string | null;
  status: string;
  roles: {
    id: number;
    name: string;
    display_name: string;
    description: string;
    created_at: string;
    updated_at: string;
  }[];
  locationID?: string;
  updated_at?: string; // This is correctly optional
  onFilterChange: (filters: FilterValues) => void;
}

const UserManagementTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({ page: currentPage });
  const { data, isLoading, isError } = useFetchUsers(queryParams);
  const [sortBy, setSortBy] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);

  const users: UserRowData[] = data?.data?.users?.data || [];
  const paginationData: PaginationData | undefined = data?.data?.users ? {
    current_page: data.data.users.current_page,
    last_page: data.data.users.last_page,
    per_page: data.data.users.per_page,
    total: data.data.users.total,
    from: data.data.users.from,
    to: data.data.users.to,
    next_page_url: data.data.users.next_page_url,
    prev_page_url: data.data.users.prev_page_url,
  } : undefined;

  const handleFilterChange = (filters: FilterValues) => {
    const backendFilters = {
      search: filters.searchText, // Backend expects 'search'
    };
    setAppliedFilters(filters);
    setQueryParams(prev => ({
      ...prev,
      ...backendFilters,
      page: 1,
    }));
  };

  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);
    const backendSort = {
      sort: sortKey, // Backend expects 'sort'
      order: "asc", // or "desc" if needed
    };
    const updatedFilters = {
      ...appliedFilters,
      ...backendSort,
    };
    setAppliedFilters(updatedFilters);
    setQueryParams(prev => ({
      ...prev,
      ...backendSort,
      page: 1,
    }));
  };

  // Extract stats for display
  const stats = data?.data?.stats;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQueryParams({ ...queryParams, page });
  };

  useEffect(() => {
    if (users.length > 0) {
      const locationID = users[0]?.locationID;
      if (locationID) {
        localStorage.setItem("viewUserLocationID", locationID);
      }
    }
  }, [users]);

  // Ensure dayjs is callable, handling potential .default export
  const dayjsInstance = (dayjs as any).default || dayjs; // <--- ADDED THIS LINE

  const columns: ColumnDef<UserRowData>[] = [
    {
      header: "User Name",
      id: "fullName",
      enableSorting: false,
      cell: ({ row }) => (
        <div>
          <Text fw={500} c="black">
            {`${row.original.firstname} ${row.original.lastname}`}
          </Text>
          <Text fw={500} c="grey">
            {row.original.email}
          </Text>
        </div>
      ),
    },
    {
      header: "User ID",
      accessorKey: "email",
      enableSorting: false,
      cell: ({ row }) => (
        <Text fw={500} c="black">
          {row.original.user_uuid}
        </Text>
      ),
    },
    {
      header: "Time Stamp",
      accessorKey: "updated_at",
      enableSorting: false,
      // Simplified cell parameter type to directly use UserRowData
      cell: ({ row }) => ( // <--- SIMPLIFIED CELL PARAMETER TYPE
        <Text fw={400} c="dimmed">
          {row.original.updated_at
            ? dayjsInstance(row.original.updated_at).format('YYYY-MM-DD HH:mm:ss') // <--- USED dayjsInstance
            : "—"}
        </Text>
      ),
    },
    {
      header: "Role",
      id: "role",
      enableSorting: false,
      cell: ({ row }) => {
        const roleName = row.original.roles?.[0]?.name || "—";
        const capitalized =
          typeof roleName === "string"
            ? roleName.charAt(0).toUpperCase() + roleName.slice(1)
            : roleName;
        return <Text>{capitalized}</Text>;
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.original.status;
        const isActive = status?.toLowerCase() === "active";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${isActive
              ? "bg-[#ECFDF3] text-[#027A48]"
              : "bg-[#FEF3F2] text-[#B42318]"
              }`}
          >
            {isActive ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      enableSorting: false,
      cell: ({ row }) => (
        <Link to={ROUTES.viewUser(row.original.user_uuid)}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View User
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable<UserRowData>
        columnData={columns}
        data={isLoading || isError ? [] : users}
        showSearch
        showSortFilter
        searchPlaceholder="Search users"
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        activeSort={sortBy}
        length={10}
        loadingState={isLoading}
        serverSidePagination={true}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Users
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{stats?.totalUsers}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default UserManagementTable;
