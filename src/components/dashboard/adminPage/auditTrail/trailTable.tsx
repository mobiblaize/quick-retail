/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { ROUTES } from "../../../../constants/routes";
import { FilterValues } from "../../../General/table/reuseableFilter";
import TableSkeleton from "../../../../pages/TableSkeleton";

interface TrailTableProps {
  logs: any[];
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  searchTerm?: string;
  error?: Error | null;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
  filters?: FilterValues;
}

export default function TrailTable({
  logs,
  isLoading,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
  onFilterChange,
  filters,
}: // error,
TrailTableProps) {
  const navigate = useNavigate();
  // const formatTime = (dateStr: string) =>
  //   dateStr
  //     ? new Intl.DateTimeFormat("en-US", {
  //         dateStyle: "long",
  //         timeStyle: "short",
  //       }).format(new Date(dateStr))
  //     : "";

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {new Date(row.created_at).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true, // or false for 24-hour
          })}
        </Text>
      ),
    },
    {
      key: "user",
      header: "User Details",
      render: (row: any) => {
        const name = row.causer
          ? `${row.causer.firstname} ${row.causer.lastname}`
          : "N/A";
        return (
          <div>
            <Text size="sm" fw={500}>
              {name}
            </Text>
            <Text size="xs" c="dimmed">
              {row.causer?.email || "N/A"}
            </Text>
          </div>
        );
      },
    },
    {
      key: "role",
      header: "Role",
      render: (row: any) => {
        let roleDisplay = "N/A";
        const roles = row.causer?.roles;
        if (Array.isArray(roles))
          roleDisplay = roles.map((r: any) => r.name || r).join(", ");
        else if (typeof roles === "object") roleDisplay = roles.name || "N/A";
        else if (typeof roles === "string") roleDisplay = roles;
        return (
          <Text size="sm" c="dimmed" className="!capitalize">
            {roleDisplay}
          </Text>
        );
      },
    },
    {
      key: "activity",
      header: "Activity",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>
          {row.log_name}
        </Text>
      ),
    },
    {
      key: "module",
      header: "Module",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>
          {row.action_type?.split("\\").pop() || ""}
        </Text>
      ),
    },
    {
      key: "ip",
      header: "IP Address",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>
          {row.ip_address}
        </Text>
      ),
    },
  ];
  
  // Compute unique roles and modules for filters
  const roles = Array.from(
    new Set(
      logs.flatMap((log) => {
        const r = log.causer?.roles;
        if (Array.isArray(r)) return r.map((rr: any) => rr.name || rr);
        else if (typeof r === "object" && r) return [r.name || "N/A"];
        else if (typeof r === "string") return [r];
        return [];
      })
    )
  );

  const modules = Array.from(
    new Set(
      logs
        .map((log) => log.action_type?.split("\\").pop() || "")
        .filter(Boolean)
    )
  );

  const actions = (row: any) => (
    <button
      onClick={() => navigate(ROUTES.viewTrail, { state: { uuid: row.uuid } })}
      className="text-[#F16722] hover:underline cursor-pointer text-sm"
    >
      <Text size="sm" fw={800} c="#F16722">
        View
      </Text>
    </button>
  );

  if (isLoading) {
    return (
      <TableSkeleton />
    );
  }

  return (
    <GenericTable
      enableSearch={true}
      enableSort={true}
      data={logs}
      isLoading={isLoading}
      paginationData={paginationData}
      onPageChange={onPageChange}
      columns={columns}
      actions={actions}
      emptyMessage="No user trails found"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeSort={activeSort}
      onSortChange={setSort}
      onFilterChange={onFilterChange}
      showFilter={true}
      tableType="audit"
      roles={roles}
      modules={modules}
      searchPlaceholder="Search trails"
      filters={filters}
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All User Trails
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">
              {paginationData?.total || logs.length}
            </Text>
          </div>
        </div>
      }
    />
  );
}
