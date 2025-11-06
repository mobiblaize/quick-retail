// import { useState } from "react";
import { Text } from "@mantine/core";
import GenericTable, { PaginationData } from "../../../General/genericTable";
// import { useFetchAllSub } from "../../../../hooks/backendApis/admin/profile";
import { FilterValues } from "../../../General/table/reuseableFilter";

export interface Subscription {
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

interface HistoryTableProps {
  data: any;
  isLoading: boolean;
  error?: Error | null;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  onFilterChange?: (filters: FilterValues) => void;
  onPageChange: (page: number) => void;
  currentPage: number;
  perPage: number;
  filters?: FilterValues;
  paginationData?: PaginationData;
}

const HistoryTable = ({
  data,
  isLoading,
  // error,
  paginationData,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
  onFilterChange,
  onPageChange,
  filters,
}: HistoryTableProps) => {
  const columns = [
    {
      key: "subscriptionID",
      header: "Transaction ID",
      render: (s: Subscription) => (
        <Text size="sm" c="#475569">
          {s.subscriptionID}
        </Text>
      ),
    },
    {
      key: "billing_type",
      header: "Plan",
      render: (s: Subscription) => (
        <Text size="sm" c="#475569">
          {s.billing_type} Plan
        </Text>
      ),
    },
    {
      key: "total_amount",
      header: "Amount",
      render: (s: Subscription) => (
        <Text size="sm" fw={500} style={{ color: "#1e293b" }}>
          {s.total_amount}
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
      render: (u: Subscription) => {
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

  return (
    <GenericTable
      columns={columns}
      data={data || []}
      isLoading={isLoading}
      activeSort={activeSort}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSortChange={setSort}
      enableSearch={true}
      enableSort={true}
      showFilter={true}
      tableType="discount"
      searchPlaceholder="Search inventory"
      onFilterChange={onFilterChange}
      onPageChange={onPageChange}
      paginationData={paginationData}
      filters={filters}
      emptyMessage="No subscriptions found"
      titleSection={
        <div className="flex gap-2.5">
          <Text fw={500} size="xl" c="textSecondary.9">
            All Subscriptions
          </Text>
          <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">
              {paginationData?.total || data?.length}
            </Text>
          </div>
        </div>
      }
    />
  );
};

export default HistoryTable;
