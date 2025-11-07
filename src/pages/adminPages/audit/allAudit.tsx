import { Button, Menu, Skeleton, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TrailTable from "../../../components/dashboard/adminPage/auditTrail/trailTable";
import { useFetchAuditTrails, useExportAuditTrail } from "../../../hooks/backendApis/admin/auditTrail";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { notifications } from "@mantine/notifications";

export const DiscountTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* top controls */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
      <Skeleton height={36} width={220} />
    </div>
    {/* table head */}
    <div className="grid grid-cols-6 gap-4 border-b py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>
    {/* rows */}
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
        {Array.from({ length: 6 }).map((_, c) => (
          <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
        ))}
      </div>
    ))}
    {/* pagination */}
    <div className="flex items-center justify-between mt-4">
      <Skeleton height={28} width={180} />
      <div className="flex gap-2">
        <Skeleton height={28} width={32} />
        <Skeleton height={28} width={32} />
        <Skeleton height={28} width={32} />
      </div>
    </div>
  </section>
);

const AuditTrailPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [filters, setFilters] = useState<FilterValues>({} as FilterValues);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [perPage] = useState(10);

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("page", currentPage.toString());
      return prev;
    });
  }, [currentPage, setSearchParams]);

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [searchParams]);

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "active") return "active";
    if (status.toLowerCase() === "inactive") return "inactive";
    if (status.toLowerCase() === "expired") return "expired";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    search: filters.search ?? "",
    sort_by: filters.sortBy ?? "",
    per_page: "",
    paginate: true,
    location_name: filters.location ?? "",
    category_name: filters.category ?? "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.auditStatus),
    page: currentPage.toString(),
    role: filters.role ?? "",
    model: filters.module ?? "",
  });

  const payload = {
    ...mapFiltersToPayload(filters),
    page: currentPage,
    per_page: perPage.toString(),
    sort_by: activeSort,
    search: searchTerm,
  };

  const {
    data,
    isLoading,
    error,
  } = useFetchAuditTrails(payload);
  console.log(isLoading);

  const handleFilterChange = (filters: FilterValues) => setFilters(filters);
  const paginationData = data?.data
    ? {
        current_page: data.data.current_page,
        last_page: data.data.last_page,
        per_page: data.data.per_page,
        total: data.data.total,
        from: data.data.from,
        to: data.data.to,
        next_page_url: data.data.next_page_url,
        prev_page_url: data.data.prev_page_url,
      }
    : undefined;
  console.log(data);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const exportPdf = useExportAuditTrail("pdf");
  const exportExcel = useExportAuditTrail("excel");

  const handleExport = async (format: "pdf" | "excel") => {
    try {
      const exportMutation = format === "pdf" ? exportPdf : exportExcel;
      
      notifications.show({
        title: "Exporting...",
        message: `Generating ${format.toUpperCase()} file. Please wait...`,
        color: "blue",
        loading: true,
        autoClose: false,
        id: "export-notification",
      });

      const blob = await exportMutation.mutateAsync();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `audit_trail_${new Date().toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : "pdf"}`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      notifications.update({
        id: "export-notification",
        title: "Export Successful",
        message: `${format.toUpperCase()} file downloaded successfully`,
        color: "green",
        loading: false,
        autoClose: 3000,
      });
    } catch (error) {
      notifications.update({
        id: "export-notification",
        title: "Export Failed",
        message: (error as Error)?.message || `Failed to export ${format.toUpperCase()}`,
        color: "red",
        loading: false,
        autoClose: 5000,
      });
    }
  };

  const subHeaders = [
    <div
      key="1"
      className="py-2.5 flex justify-between items-center flex-wrap gap-3"
    >
      <div className="flex gap-8 items-center">
        <Text c="black" fw={500}>
          Audit Trail
        </Text>
      </div>
      <div className="flex items-center gap-3">
        <Menu>
          <Menu.Target>
            <Button variant="filled-primary">
              Export
              <ChevronDown className="ml-2" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "6px 0",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Menu.Item
              style={{ fontSize: 14, color: "#333" }}
              onClick={() => handleExport("excel")}
              disabled={exportExcel.isPending || exportPdf.isPending}
            >
              Export Excel
            </Menu.Item>
            <Menu.Item
              style={{ fontSize: 14, color: "#333" }}
              onClick={() => handleExport("pdf")}
              disabled={exportExcel.isPending || exportPdf.isPending}
            >
              Export PDF
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>,
  ];

  const hasData = data?.data?.data && Array.isArray(data.data.data) && data.data.data.length > 0;

  return (
    <PageContainer subHeaders={subHeaders}>
      {isLoading ? (
        <DiscountTableSkeleton />
      ) : error ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Text size="lg" c="red" fw={500} mb="sm">
            Failed to load audit trail
          </Text>
          <Text size="sm" c="dimmed">
            {error?.message || "An error occurred while fetching the audit trail data"}
          </Text>
        </div>
      ) : !hasData ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <Text size="lg" c="dimmed" fw={500} mb="sm">
            No audit trail records found
          </Text>
          <Text size="sm" c="dimmed">
            There are no audit trail entries to display at this time
          </Text>
        </div>
      ) : (
        <TrailTable
          isLoading={isLoading}
          error={error}
          logs={data?.data?.data || []}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          searchTerm={searchTerm}
          setSearchTerm={(val: string) => {
            setSearchTerm((prev) => {
              if (prev !== val) setCurrentPage(1);
              return val;
            });
          }}
          activeSort={activeSort}
          setSort={(sortBy) => {
            setActiveSort(sortBy);
            setCurrentPage(1);
          }}
          filters={filters}
          paginationData={paginationData}
        />
      )}
    </PageContainer>
  );
};

export default AuditTrailPage;
