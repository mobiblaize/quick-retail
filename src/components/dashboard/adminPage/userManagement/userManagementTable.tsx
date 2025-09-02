import { useEffect, useState, useMemo } from "react";
import { Text } from "@mantine/core";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { useFetchUsers } from "../../../../hooks/backendApis/admin/userManagement";
import * as dayjs from "dayjs";
import { FilterValues } from "../../../General/table/reuseableFilter";

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
  updated_at?: string;
}

export default function UserManagementTable() {
  const [, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState({ page: currentPage });
  const { data, isLoading, isError } = useFetchUsers(queryParams);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const users: UserRowData[] = data?.data?.users?.data || [];
  const paginationData: PaginationData | undefined = data?.data?.users
    ? {
        current_page: data.data.users.current_page,
        last_page: data.data.users.last_page,
        per_page: data.data.users.per_page,
        total: data.data.users.total,
      }
    : undefined;

  const handleFilterChange = (filters: any) => {
    setAppliedFilters(filters);
    setQueryParams({ page: 1 });
  };

  const dayjsInstance = (dayjs as any).default || dayjs;
  const handlePageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    if (users.length > 0) {
      const locationID = users[0]?.locationID;
      if (locationID) {
        localStorage.setItem("viewUserLocationID", locationID);
      }
    }
  }, [users]);

  /** --- Search & Sort Logic --- **/
  const processedUsers = useMemo(() => {
    let filtered = users;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.firstname?.toLowerCase().includes(term) ||
          u.lastname?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.user_uuid?.toLowerCase().includes(term)
      );
    }

    switch (activeSort) {
      case "A-Z":
        filtered = [...filtered].sort((a, b) =>
          `${a.firstname} ${a.lastname}`.localeCompare(`${b.firstname} ${b.lastname}`)
        );
        break;
      case "Z-A":
        filtered = [...filtered].sort((a, b) =>
          `${b.firstname} ${b.lastname}`.localeCompare(`${a.firstname} ${a.lastname}`)
        );
        break;
      case "Recent":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.updated_at || "").getTime() - new Date(a.updated_at || "").getTime()
        );
        break;
      case "Oldest":
        filtered = [...filtered].sort(
          (a, b) => new Date(a.updated_at || "").getTime() - new Date(b.updated_at || "").getTime()
        );
        break;
    }

    return filtered;
  }, [users, searchTerm, activeSort]);

  /** --- Table Columns --- **/
  const columns = [
    {
      key: "fullName",
      header: "User Name",
      render: (u: UserRowData) => (
        <div>
          <Text fw={500} c="black">{`${u.firstname} ${u.lastname}`}</Text>
          <Text fw={500} c="grey">{u.email}</Text>
        </div>
      ),
    },
    {
      key: "user_uuid",
      header: "User ID",
      render: (u: UserRowData) => (
        <Text fw={500} c="black">
          {u.user_uuid}
        </Text>
      ),
    },
    {
      key: "updated_at",
      header: "Time Stamp",
      render: (u: UserRowData) => (
        <Text fw={400} c="dimmed">
          {u.updated_at
            ? dayjsInstance(u.updated_at).format("YYYY-MM-DD HH:mm:ss")
            : "—"}
        </Text>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (u: UserRowData) => {
        const roleName = u.roles?.[0]?.name || "—";
        const capitalized =
          typeof roleName === "string"
            ? roleName.charAt(0).toUpperCase() + roleName.slice(1)
            : roleName;
        return <Text>{capitalized}</Text>;
      },
    },
    {
      key: "status",
      header: "Status",
      render: (u: UserRowData) => {
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

  /** --- Actions --- **/
  const actions = (u: UserRowData) => (
    <Link to={ROUTES.viewUser(u.user_uuid)}>
      <Text fw={600} c="customPrimary.10" className="cursor-pointer">
        View User
      </Text>
    </Link>
  );

  return (
    <GenericTable
      columns={columns}
      data={isLoading || isError ? [] : processedUsers}
      isLoading={isLoading}
      activeSort={activeSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSortChange={setActiveSort}
      enableSearch={true}
      enableSort={true}
      showFilter={true}
      tableType="sales"
      actions={actions}
      searchPlaceholder="search users"
      onFilterChange={handleFilterChange}
      emptyMessage="No users found"
      onPageChange={handlePageChange}
      titleSection={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Text fw={500} size="xl" c="textSecondary.9">
            Users
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">
              {paginationData?.total ?? processedUsers.length}
            </Text>
          </div>
        </div>
      }
    />
  );
}
