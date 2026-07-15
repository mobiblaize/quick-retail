/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Text,
  Card,
  Group,
  Select,
  Skeleton,
  Menu,
  Button,
} from "@mantine/core";
import { ChevronLeft, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import GenericTable from "../../../components/General/genericTable";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import {
  useFetchBillingShow,
  // useExportBilling,
} from "../../../hooks/backendApis/admin/billing";
import { DateInput } from "@mantine/dates";
// import { notifications } from "@mantine/notifications";

const dateFilterOptions = [
  { value: "Today", label: "Today" },
  { value: "Yesterday", label: "Yesterday" },
  { value: "This Week", label: "This Week" },
  { value: "Last Week", label: "Last Week" },
  { value: "This Month", label: "This Month" },
  { value: "Last Month", label: "Last Month" },
  { value: "This Year", label: "This Year" },
  { value: "Last Year", label: "Last Year" },
  { value: "All Time", label: "All Time" },
  { value: "3 days", label: "Last 3 Days" },
  { value: "7 days", label: "Last 7 Days" },
  { value: "14 days", label: "Last 14 Days" },
  { value: "30 days", label: "Last 30 Days" },
  { value: "custom date", label: "Custom Date" },
];

const statusOptions = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "invoiced", label: "Invoiced" },
  { value: "paid", label: "Paid" },
];

const ViewBilling = () => {
  const navigate = useNavigate();
  const { billingId } = useParams<{ billingId: string }>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("");
  const [filters, setFilters] = useState<FilterValues>({} as FilterValues);
  const [dateFilter, setDateFilter] = useState<string>("This Month");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  const payload = {
    date_filter: dateFilter,
    start_date: dateFilter === "custom date" ? formatDate(startDate) : "",
    end_date: dateFilter === "custom date" ? formatDate(endDate) : "",
    paginate: true,
    page: currentPage,
    limit: 10,
    transaction_fee_status: statusFilter,
  };

  const { data, isLoading, error } = useFetchBillingShow(
    billingId || null,
    payload,
  );

  // const exportMutation = useExportBilling();

  // const handleExport = async (format: "pdf" | "excel") => {
  //   try {
  //     notifications.show({
  //       title: "Exporting...",
  //       message: `Generating ${format.toUpperCase()} file. Please wait...`,
  //       color: "blue",
  //       loading: true,
  //       autoClose: false,
  //       id: "export-notification",
  //     });

  //     const blob = await exportMutation.mutateAsync({
  //       format,
  //       ...payload,
  //     });

  //     // Create download link
  //     const url = URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute(
  //       "download",
  //       `billing_history_${new Date().toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : "pdf"}`,
  //     );
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url);

  //     notifications.update({
  //       id: "export-notification",
  //       title: "Export Successful",
  //       message: `${format.toUpperCase()} file downloaded successfully`,
  //       color: "green",
  //       loading: false,
  //       autoClose: 3000,
  //     });
  //   } catch (error) {
  //     notifications.update({
  //       id: "export-notification",
  //       title: "Export Failed",
  //       message:
  //         (error as Error)?.message ||
  //         `Failed to export ${format.toUpperCase()}`,
  //       color: "red",
  //       loading: false,
  //       autoClose: 5000,
  //     });
  //   }
  // };

  const handleBack = () => {
    navigate(-1);
  };

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

  const columns = [
    {
      key: "orderID",
      header: "Order ID",
      render: (row: any) => (
        <Text c="#101828" fw={600}>
          {row.orderID}
        </Text>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (row: any) => (
        <Text c="#667085" size="sm">
          {row.date}
        </Text>
      ),
    },
    {
      key: "items_count",
      header: "Items",
      render: (row: any) => (
        <Text c="#667085" size="sm">
          {row.items_count} item{row.items_count !== 1 ? "s" : ""}
        </Text>
      ),
    },
    {
      key: "order_value",
      header: "Order Value",
      render: (row: any) => (
        <Text c="#101828" size="sm">
          ₦ {parseFloat(row.order_value).toLocaleString()}
        </Text>
      ),
    },
    {
      key: "fee_charges",
      header: "Fee charges",
      render: (row: any) => (
        <Text c="#F16722" size="sm" fw={600}>
          ₦ {row.fee_charges}
        </Text>
      ),
    },
  ];

  const ordersData = data?.data?.orders?.data || [];
  const paginationData = data?.data?.orders?.pagination
    ? {
        current_page: data.data.orders.pagination.current_page,
        last_page: data.data.orders.pagination.last_page,
        per_page: data.data.orders.pagination.per_page,
        total: data.data.orders.pagination.total,
      }
    : undefined;

  const subHeaders = [
    <>
      <div key="1" className="py-2.5">
        <div className="hidden sm:flex gap-8 items-center">{backButton}</div>
        <div className="flex sm:hidden gap-2 items-center">{backButton}</div>
      </div>
    </>,
    <div key="2" className="flex justify-end">
      <Group gap="sm">
        <Menu>
          <Menu.Target>
            <Button
              variant="filled-primary"
              rightSection={<Download size={16} />}
            >
              Export
            </Button>
          </Menu.Target>
          {/* <Menu.Dropdown>
            <Menu.Item
              onClick={() => handleExport("excel")}
              disabled={exportMutation.isPending}
            >
              Export Excel
            </Menu.Item>
            <Menu.Item
              onClick={() => handleExport("pdf")}
              disabled={exportMutation.isPending}
            >
              Export PDF
            </Menu.Item>
          </Menu.Dropdown> */}
        </Menu>
      </Group>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {/* Summary Cards */}
      <Card padding="xl" radius="md" withBorder className=" shadow-xs">
        <Group justify="space-between" mb="xl" wrap="wrap">
          <div>
            <Text fw={600} size="lg" c="#101828">
              Transactions Overview
            </Text>
            <Text size="sm" c="#667085">
              This is an overview summarizing orders
            </Text>
          </div>
          <Group gap="sm" wrap="wrap">
            <Select
              placeholder="Select Date Filter"
              data={dateFilterOptions}
              value={dateFilter}
              onChange={(val) => setDateFilter(val ?? "This Month")}
              styles={{ input: { width: 180 } }}
            />
            {dateFilter === "custom date" && (
              <>
                <DateInput
                  placeholder="Start date"
                  value={startDate}
                  onChange={setStartDate}
                  leftSection={<ChevronLeft size={16} />}
                  styles={{ input: { width: 140 } }}
                />
                <Text c="#667085">-</Text>
                <DateInput
                  placeholder="End date"
                  value={endDate}
                  onChange={setEndDate}
                  leftSection={<ChevronLeft size={16} />}
                  styles={{ input: { width: 140 } }}
                />
              </>
            )}
            <Select
              placeholder="Status"
              data={statusOptions}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val ?? "")}
              styles={{ input: { width: 150 } }}
            />
          </Group>
        </Group>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-1">
                <Skeleton height={16} width="60%" />
                <Skeleton height={28} width="40%" />
              </div>
            ))}
          </div>
        ) : error ? (
          <Text c="red" size="sm" ta="center">
            Failed to load billing summary
          </Text>
        ) : data?.data?.summary ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1">
              <Text size="xs" c="#667085" fw={500}>
                Total orders
              </Text>
              <Text size="lg" c="#101828" fw={700}>
                {data.data.summary.total_orders}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="xs" c="#667085" fw={500}>
                Fee Rate
              </Text>
              <Text size="lg" c="#101828" fw={700}>
                {data.data.summary.fee_rate} / order
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="xs" c="#667085" fw={500}>
                Total Fee
              </Text>
              <Text size="lg" c="#101828" fw={700}>
                {data.data.summary.total_fee}
              </Text>
            </div>
            <div className="flex flex-col gap-1">
              <Text size="xs" c="#667085" fw={500}>
                Period
              </Text>
              <Text size="lg" c="#101828" fw={700}>
                {data.data.summary.period}
              </Text>
            </div>
          </div>
        ) : null}
      </Card>

      {/* Orders Table */}
      <GenericTable
        enableSort
        enableSearch
        emptyMessage="No billing history found"
        searchTerm={searchTerm}
        data={ordersData}
        isLoading={isLoading}
        columns={columns}
        activeSort={activeSort}
        onSortChange={setActiveSort}
        searchPlaceholder="Search billing history"
        filters={filters}
        onFilterChange={setFilters}
        setSearchTerm={setSearchTerm}
        paginationData={paginationData}
        onPageChange={setCurrentPage}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="#101828">
              Billing History
            </Text>
            {data?.data?.tenant?.name && (
              <div className="bg-[#FEF0E9] rounded-full flex items-center py-0.5 px-3">
                <Text c="#F16722">
                  {data.data.tenant.name} • Order Break down
                </Text>
              </div>
            )}
          </div>
        }
      />
    </PageContainer>
  );
};

export default ViewBilling;
