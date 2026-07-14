/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Text,
  Group,
  Card,
  Badge,
  Box,
  Button,
  Menu,
  Modal,
  Stack,
  Paper,
  Skeleton,
  Select,
} from "@mantine/core";
import { Calendar, ChevronDown } from "lucide-react";
import PageContainer from "../../../layout/pageContainer";
import { DateInput } from "@mantine/dates";
import GenericTable from "../../../components/General/genericTable";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  useFetchBilling,
  useFetchInvoice,
  // useExportBilling,
} from "../../../hooks/backendApis/admin/billing";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
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

const BillingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<"current">("current");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeSort, setActiveSort] = useState<string>("");
  const [isViewInvoiceModalOpen, setIsViewInvoiceModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState<string>("This Month");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [filters, setFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(
    Number.parseInt(searchParams.get("page") || "1"),
  );
  const [perPage] = useState(10);
  const brandOrange = "#F16722";

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", currentPage.toString());
      return prev;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number.parseInt(page));
    }
  }, [searchParams]);

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
    limit: perPage,
    transaction_fee_status: statusFilter,
  };

  const { data, isLoading, error } = useFetchBilling(payload);
  console.log("useFetchBilling full data:", data);

  const {
    mutateAsync: fetchInvoice,
    isPending: isInvoiceLoading,
    error: invoiceError,
  } = useFetchInvoice();

  useEffect(() => {
    // 1. Log exactly what we are looking at
    console.log("Modal state:", { isViewInvoiceModalOpen, selectedInvoice });

    // 2. Strict guard: must be open, must have ID, ID must not be the string "undefined"
    if (
      isViewInvoiceModalOpen &&
      selectedInvoice &&
      selectedInvoice !== "undefined"
    ) {
      console.log("CONDITION MET: Calling fetchInvoice...");

      fetchInvoice(selectedInvoice)
        .then((res) => {
          // Set the actual data object from the response
          setInvoiceData(res.data || res);
        })
        .catch((err) => {
          console.error("Effect catch block:", err);
        });
    } else if (!isViewInvoiceModalOpen) {
      setInvoiceData(null);
    }
  }, [isViewInvoiceModalOpen, selectedInvoice, fetchInvoice]);

  const billingHistoryData = data?.data?.data?.data || [];
  console.log("billingHistoryData:", billingHistoryData);

  const paginationData = data?.data?.data?.pagination
    ? {
        current_page: data.data.data.pagination.current_page,
        last_page: data.data.data.pagination.last_page,
        per_page: data.data.data.pagination.per_page,
        total: data.data.data.pagination.total,
      }
    : undefined;

  const columns = [
    {
      key: "period",
      header: "Period",
      render: (row: any) => (
        <Text c="#101828" fw={500}>
          {row.billing_period || row.period}
        </Text>
      ),
    },
    {
      key: "total_orders",
      header: "Total orders",
      render: (row: any) => (
        <Text c="#667085">{row.total_orders || row.totalOrders}</Text>
      ),
    },
    {
      key: "fee_amount",
      header: "Fee Amount",
      render: (row: any) => (
        <Text c="#667085">{row.fee_amount || row.total_amount}</Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => {
        const status = row.status?.toLowerCase();
        const getColor = () => {
          if (status === "paid") return "#12B76A";
          if (status === "invoiced") return "#2E90FA";
          return "#F59E0B";
        };
        return (
          <Group gap={6}>
            <Box
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: getColor(),
              }}
            />
            <Text size="sm" fw={500} c={getColor()}>
              {row.status}
            </Text>
          </Group>
        );
      },
    },
    {
      key: "invoice",
      header: "Invoice",
      render: (row: any) => (
        <Menu position="bottom" shadow="md">
          <Menu.Target>
            <Button
              variant="subtle"
              size="sm"
              className="cursor-pointer font-medium"
              p={0}
              c="#F16722"
              rightSection={<ChevronDown size={14} />}
            >
              View Invoice
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                console.log("--- DEBUGGING ROW DATA ---");
                console.log("Full Row Object:", row);
                console.log("All Row Keys:", Object.keys(row));
                // Try all possible invoice ID fields!
                const invoiceId = row.id || row.invoice_uuid || row.tenant_uuid;
                console.log("Extracted ID:", invoiceId);

                // if (!invoiceId || invoiceId === "undefined") {
                //   alert(
                //     "Error: This row does not have a valid Invoice ID. Check the 'Full Row Object' in the console to see where the ID is.",
                //   );
                //   return;
                // }

                setSelectedInvoice(invoiceId);
                setIsViewInvoiceModalOpen(true);
              }}
            >
              View Invoice
            </Menu.Item>
            <Menu.Item
              onClick={() =>
                navigate(
                  ROUTES.viewBillingPage(
                    String(row.tenant_uuid || row.invoice_uuid),
                  ),
                )
              }
            >
              Transaction Detail
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];

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
  //     link.remove();
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

  const handlePageChange = (page: number) => setCurrentPage(page);

  const subHeaders = [
    <div
      key="1"
      className="py-2.5 flex justify-between items-center flex-wrap gap-3"
    >
      <Group gap="sm">
        <Text fw={600} size="xl" c="black">
          Billing
        </Text>
      </Group>
      <Group gap="sm">
        {/* <Menu>
          <Menu.Target>
            <Button
              variant="filled-primary"
              rightSection={<Download size={16} />}
            >
              Export
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
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
          </Menu.Dropdown>
        </Menu> */}
      </Group>
    </div>,
    <Group gap={6} key="2" className="w-full mt-2">
      <Box
        style={{
          borderBottom: activeTab === "current" ? "2px solid #F16722" : "none",
          paddingBottom: "8px",
        }}
      >
        <Text
          unstyled
          fw={500}
          size="lg"
          className={`cursor-pointer ${
            activeTab === "current" ? "text-[#F16722]" : "text-gray-400"
          }`}
          onClick={() => setActiveTab("current")}
        >
          Current period
        </Text>
      </Box>
      {/* "Billing History" tab removed as requested */}
    </Group>,
  ];

  const hasData =
    billingHistoryData &&
    Array.isArray(billingHistoryData) &&
    billingHistoryData.length > 0;

  return (
    <>
      <PageContainer subHeaders={subHeaders}>
        {activeTab === "current" && (
          <div className="flex flex-col gap-8">
            {/* Transactions Overview */}
            <Card padding="xl" radius="md" withBorder className="shadow-xs">
              <Group justify="space-between" mb="xl" wrap="wrap">
                <div>
                  <Text fw={600} size="lg" c="#101828">
                    Transactions Overview
                  </Text>
                  <Text size="sm" c="#667085">
                    This is an overview summarizing users
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
                        leftSection={<Calendar size={16} />}
                        styles={{ input: { width: 140 } }}
                      />
                      <Text c="#667085">-</Text>
                      <DateInput
                        placeholder="End date"
                        value={endDate}
                        onChange={setEndDate}
                        leftSection={<Calendar size={16} />}
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

              {!isLoading && !error && data?.data && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card p="lg" radius="md" bg="#E6F4EA" withBorder={false}>
                    <Text size="xs" c="#137333" fw={600}>
                      Billing Period
                    </Text>
                    <Text fw={700} size="xl" mt="xs" c="#101828">
                      {data.data.billingPeriod}
                    </Text>
                    <Text size="xs" c="#667085" mt={4}>
                      30-day billing cycle
                    </Text>
                  </Card>

                  <Card p="lg" radius="md" bg="#E8F0FE" withBorder={false}>
                    <Text size="xs" c="#1967D2" fw={600}>
                      Total order Processed
                    </Text>
                    <Text fw={700} size="xl" mt="xs" c="#101828">
                      {data.data.totalOrderProcessed}
                    </Text>
                    <Text size="xs" c="#667085" mt={4}>
                      Orders this period
                    </Text>
                  </Card>

                  <Card p="lg" radius="md" bg="#FEEFF0" withBorder={false}>
                    <Text size="xs" c="#D93025" fw={600}>
                      Fee Acquired
                    </Text>
                    <Text fw={700} size="xl" mt="xs" c="#101828">
                      ₦ {data.data.feeAcquired}
                    </Text>
                    <Text size="xs" c="#667085" mt={4}>
                      {data.data.totalOrderProcessed} orders X ₦ 100
                    </Text>
                  </Card>
                </div>
              )}
            </Card>

            {/* Period Status */}
            {!isLoading && !error && data?.data && (
              <div className="flex flex-col gap-2 p-5 bg-white rounded-lg">
                <Group gap="xs">
                  <Text size="sm" fw={600} c="#344054">
                    Period status
                  </Text>
                  <Badge
                    color="orange"
                    variant="light"
                    size="sm"
                    radius="xl"
                    styles={{
                      label: { textTransform: "capitalize", fontWeight: 600 },
                    }}
                  >
                    • {data.data.periodStatus}
                  </Badge>
                </Group>
                <Text size="sm" c="#667085">
                  ₦ 100 is charged for every order processed on quick retail,
                  your invoice is generated at the end of each billing period
                </Text>
              </div>
            )}

            {/* Billing History Section */}
            {(() => {
              if (isLoading)
                return (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <div className="h-64 flex items-center justify-center">
                      <Text c="dimmed" size="lg">
                        Loading billing data...
                      </Text>
                    </div>
                  </div>
                );
              if (error)
                return (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Text size="lg" c="red" fw={500} mb="sm">
                      Failed to load billing history
                    </Text>
                    <Text size="sm" c="dimmed">
                      {error?.message ||
                        "An error occurred while fetching the billing data"}
                    </Text>
                  </div>
                );
              if (!hasData)
                return (
                  <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <Text size="lg" c="dimmed" fw={500} mb="sm">
                      No billing records found
                    </Text>
                    <Text size="sm" c="dimmed">
                      There are no billing entries to display at this time
                    </Text>
                  </div>
                );
              return (
                <GenericTable
                  enableSearch
                  enableSort
                  data={billingHistoryData}
                  isLoading={isLoading}
                  columns={columns}
                  titleSection={
                    <Group gap="sm">
                      <Text fw={600} size="lg" c="#101828">
                        Billing history
                      </Text>
                      {paginationData && (
                        <Badge
                          color="orange"
                          variant="filled"
                          radius="xl"
                          size="sm"
                          bg="#FEF0E9"
                          c="#F16722"
                        >
                          {paginationData.total}
                        </Badge>
                      )}
                    </Group>
                  }
                  searchTerm={searchTerm}
                  setSearchTerm={(val: string) => {
                    setSearchTerm((prev) => {
                      if (prev !== val) setCurrentPage(1);
                      return val;
                    });
                  }}
                  searchPlaceholder="Search"
                  activeSort={activeSort}
                  onSortChange={(sortBy) => {
                    setActiveSort(sortBy);
                    setCurrentPage(1);
                  }}
                  filters={filters}
                  onFilterChange={setFilters}
                  paginationData={paginationData}
                  onPageChange={handlePageChange}
                />
              );
            })()}
          </div>
        )}
      </PageContainer>

      {/* View Invoice Modal */}
      <Modal
        opened={isViewInvoiceModalOpen}
        onClose={() => {
          setIsViewInvoiceModalOpen(false);
          setSelectedInvoice(null);
        }}
        centered
        size="lg"
        title={null}
        withCloseButton={true}
      >
        <Box bg="#FFFFFF" p="xl" style={{ borderTop: "4px dashed #E4E7EC" }}>
          <Box style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Paper p="xl" radius="md" withBorder={false}>
              <Stack gap="xl" align="stretch">
                <Text ta="center" size="lg" fw={700} c="#1D2739">
                  Welcome to QuickRetail-View your invoice
                </Text>

                {(() => {
                  if (isInvoiceLoading)
                    return (
                      <Stack gap="md">
                        <Skeleton height={20} width="60%" />
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={20} width="100%" />
                        <Skeleton height={20} width="70%" />
                      </Stack>
                    );
                  if (invoiceError)
                    return (
                      <Stack gap="md" ta="center">
                        <Text c="red" size="sm">
                          Failed to load invoice details
                        </Text>
                        <Text c="red" size="xs">
                          Error: {JSON.stringify(invoiceError, null, 2)}
                        </Text>
                      </Stack>
                    );
                  if (!(invoiceData?.data || invoiceData)) return null;
                  const actualData = invoiceData?.data || invoiceData;
                  return (
                    <>
                      <Text size="md" c="#1D2739">
                        Hi, {actualData.company_name}
                      </Text>
                      <Text size="sm" c="#667085">
                        Your invoice from quick retail has been generated and is
                        ready for payment
                      </Text>
                      <Stack gap="xs" mt="md">
                        <Text fw={600} c="#1D2739">
                          Invoice details
                        </Text>
                        <Stack gap="xs" mt="sm">
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Invoice Number :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.invoice_number}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Invoice Date:
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.billing_period_start}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Due Date :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.due_date}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Amount Due :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={700}>
                              ₦ {actualData.total_amount}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Billing Period :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.billing_period}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Total Orders :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.total_orders}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Fee Rate :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              ₦ {actualData.fee_rate}
                            </Text>
                          </Group>
                          <Group justify="space-between">
                            <Text c="#667085" size="sm">
                              Status :
                            </Text>
                            <Text c="#1D2739" size="sm" fw={500}>
                              {actualData.status}
                            </Text>
                          </Group>
                        </Stack>
                      </Stack>
                      <Text size="sm" c="#667085" mt="md">
                        You can review your invoice details and complete your
                        payment securely using the link below
                      </Text>
                      {actualData.can_pay && actualData.status !== "Paid" && (
                        <Button
                          fullWidth
                          bg={brandOrange}
                          mt="xl"
                          size="lg"
                          onClick={() => {
                            globalThis.location.href =
                              // cspell:ignore paystack
                              actualData.paystack_payment_url
                                .replaceAll("`", "")
                                .trim();
                          }}
                        >
                          Pay Now
                        </Button>
                      )}
                    </>
                  );
                })()}
              </Stack>
            </Paper>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BillingPage;
