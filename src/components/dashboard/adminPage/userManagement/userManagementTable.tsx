/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { ROUTES } from "../../../../constants/routes";
import { FilterValues } from "../../../General/table/reuseableFilter";
import * as dayjs from "dayjs";
import { useFetchAllRoles } from "../../../../hooks/backendApis/admin/userManagement";

export interface UserRowData {
  user_uuid: string;
  firstname: string;
  lastname: string;
  email: string;
  updated_at?: string;
  status: string;
  roles: { name: string }[];
}

interface UserManagementTableProps {
  users: UserRowData[];
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  activeSort: string;
  setSort: (value: string) => void;
  filters?: FilterValues;
  onFilterChange?: (filters: FilterValues) => void;
}

export default function UserManagementTable({
  users,
  isLoading,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
  filters,
  onFilterChange,
}: UserManagementTableProps) {
  const { data: roleData } = useFetchAllRoles();
  
  const roles: any[] = Array.isArray(roleData?.data)
    ? roleData.data.map(
        (role: { display_name: string; id: string | number }) => ({
          label: role.display_name,
          value: String(role.id),
        })
      )
    : [];
  const dayjsInstance = (dayjs as any).default || dayjs;

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
      render: (u: UserRowData) => <Text fw={500}>{u.user_uuid}</Text>,
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
      enableSearch ={true}
      enableSort ={true}
      showFilter={true}
      tableType="userManagement"
      data={users}
      isLoading={isLoading}
      paginationData={paginationData}
      onPageChange={onPageChange}
      columns={columns}
      actions={actions}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeSort={activeSort}
      roles={roles}
      onSortChange={setSort}
      onFilterChange={onFilterChange}
      filters={filters}
      searchPlaceholder="Search users"
      emptyMessage="No users found"
      titleSection={
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Text fw={500} size="xl" c="textSecondary.9">
            Users
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">
              {paginationData?.total ?? users.length}
            </Text>
          </div>
        </div>
      }
    />
  );
}
