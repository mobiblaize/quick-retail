import { Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { useState, useMemo } from "react";

interface TrailTableProps {
  logs: any[];
  isLoading: boolean;
  error: any;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  onFilterChange?: (filters: any) => void;
  filters?: any;
}

export default function TrailTable({
  logs,
  isLoading,
  paginationData,
  onPageChange,
  onFilterChange,
  filters
}: TrailTableProps) {
  const navigate = useNavigate();
  const [activeSort, setActiveSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (filters: any) => {
    if (onFilterChange) onFilterChange(filters);
  };

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const handleViewClick = (uuid: string) => {
    navigate(ROUTES.viewTrail, { state: { uuid } });
  };

  const formatTime = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(date);
  };

  // Filter and Sort Logic
  const processedLogs = useMemo(() => {
    let filtered = logs;

    if (searchTerm) {
      filtered = filtered.filter((log) =>
        log.log_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.causer?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.causer?.lastname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.causer?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (activeSort) {
      case "A-Z":
        filtered = [...filtered].sort((a, b) => a.log_name.localeCompare(b.log_name));
        break;
      case "Z-A":
        filtered = [...filtered].sort((a, b) => b.log_name.localeCompare(a.log_name));
        break;
      case "Recent":
        filtered = [...filtered].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "Oldest":
        filtered = [...filtered].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        break;
    }

    return filtered;
  }, [logs, searchTerm, activeSort]);

  const columns = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {formatTime(row.created_at)}
        </Text>
      ),
    },
    {
      key: "user",
      header: "User Details",
      render: (row: any) => {
        const causer = row.causer;
        const name = causer ? `${causer.firstname} ${causer.lastname}` : "N/A";
        const email = causer?.email || "N/A";
        return (
          <div>
            <Text size="sm" fw={500}>{name}</Text>
            <Text size="xs" c="dimmed">{email}</Text>
          </div>
        );
      },
    },
    {
      key: "role",
      header: "Role",
      render: (row: any) => {
        const causer = row.causer;
        let roleDisplay = "N/A";
        if (Array.isArray(causer?.roles)) {
          roleDisplay = causer.roles.map((r: any) => r.name || r).join(", ");
        } else if (typeof causer?.roles === "object") {
          roleDisplay = causer.roles.name || "N/A";
        } else if (typeof causer?.roles === "string") {
          roleDisplay = causer.roles;
        }
        return <Text size="sm" c="dimmed">{roleDisplay}</Text>;
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
      render: (row: any) => {
        const modulePath = row.action_type || "";
        const moduleName = modulePath.split("\\").pop();
        return <Text size="sm" style={{ color: "#667185" }}>{moduleName}</Text>;
      },
    },
    {
      key: "ip",
      header: "IP Address",
      render: (row: any) => (
        <Text size="sm" style={{ color: "#667185" }}>{row.ip_address}</Text>
      ),
    },
  ];

  const actions = (row: any) => (
    <button
      onClick={() => handleViewClick(row.uuid)}
      className="text-[#F16722] hover:underline cursor-pointer text-sm"
    >
      View
    </button>
  );

  return (
    <GenericTable
      enableSearch={true}
      enableSort={true}
      data={processedLogs}
      isLoading={isLoading}
      paginationData={paginationData}
      onPageChange={handlePageChange}
      columns={columns}
      actions={actions}
      emptyMessage="No user trails found"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      activeSort={activeSort}
      onSortChange={setActiveSort}
      onFilterChange={handleFilterChange}
      showFilter={true}
      tableType="audit"
      searchPlaceholder="Search trails"
      filters={filters}
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All User Trails
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">{paginationData?.total || processedLogs.length}</Text>
          </div>
        </div>
      }
    />
  );
}

