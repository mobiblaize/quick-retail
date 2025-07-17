import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchUsers } from "../../../../hooks/backendApis/admin/userManagement";
import { useEffect } from "react";

export interface UserRowData {
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

const UserManagementTable = () => {
  const { data, isLoading, isError } = useFetchUsers();

  const users: UserRowData[] = data?.data?.users?.data || [];

  useEffect(() => {
    if (users.length > 0) {
      const locationID = users[0]?.locationID;
      if (locationID) {
        localStorage.setItem("viewUserLocationID", locationID);
      }
    }
  }, [users]);

  const columns: ColumnDef<UserRowData>[] = [
    {
      header: "User Name",
      id: "fullName",
      cell: ({ row }) => (
        <Text fw={500} c="black">
          {`${row.original.firstname} ${row.original.lastname}`}
        </Text>
      ),
    },
    {
      header: "User ID",
      accessorKey: "email",
      cell: ({ row }) => (
        <Text fw={500} c="black">
          {row.original.userID}
        </Text>
      ),
    },
    {
      header: "Time Stamp",
      accessorKey: "updated_at",
      cell: ({ row }) => (
        <Text fw={400} c="dimmed">
          {row.original.updated_at || "—"}
        </Text>
      ),
    },
    {
      header: "Role",
      id: "role",
      cell: ({ row }) => (
        <Text>{row.original.roles?.[0]?.name || "—"}</Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
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
      cell: ({ row }) => (
        <Link to={ROUTES.viewUser(row.original.userID)}>
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
        length={5}
        loadingState={isLoading}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Users
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{users.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default UserManagementTable;
