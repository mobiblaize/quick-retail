import { Button, Menu, Skeleton, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TrailTable from "../../../components/dashboard/adminPage/auditTrail/trailTable";
import { useFetchAuditTrails } from "../../../hooks/backendApis/admin/auditTrail";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DiscountTableSkeleton = () => (
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
    data = {},
    isLoading = false,
    error,
  } = useFetchAuditTrails(payload) || {};

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

  // const { data, isLoading = false, error } = useFetchAuditTrails(payload);

  const handleExport = (format: string) => {
    const logs = data?.data?.data || [];
    if (!logs.length) return;

    const tableData = logs.map((log: any) => {
      let roleDisplay = "N/A";
      const roles = log.causer?.roles;
      if (Array.isArray(roles))
        roleDisplay = roles.map((r: any) => r.name || r).join(", ");
      else if (typeof roles === "object") roleDisplay = roles.name || "N/A";
      else if (typeof roles === "string") roleDisplay = roles;

      return {
        timestamp: new Date(log.created_at).toLocaleString(),
        name: `${log.causer?.firstname || ""} ${log.causer?.lastname || ""}`,
        email: log.causer?.email || "N/A",
        role: roleDisplay,
        activity: log.log_name || "",
        module: log.action_type?.split("\\").pop() || "",
        ipAddress: log.ip_address || "",
      };
    });

    if (format === "csv") {
      const csv = tableData
        .map((row: any) => Object.values(row).join(","))
        .join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "audit_trail.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (format === "pdf") {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [
          [
            "Timestamp",
            "Name",
            "Email",
            "Role",
            "Activity",
            "Module",
            "IP Address",
          ],
        ],
        body: tableData.map(
          (row: {
            timestamp: any;
            name: any;
            email: any;
            role: any;
            activity: any;
            module: any;
            ipAddress: any;
          }) => [
            row.timestamp,
            row.name,
            row.email,
            row.role,
            row.activity,
            row.module,
            row.ipAddress,
          ]
        ),
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: {
          fillColor: [241, 103, 34],
          textColor: 255,
          fontStyle: "bold",
        },
        margin: { top: 20 },
      });
      doc.save("audit_trail.pdf");
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
              onClick={() => handleExport("csv")}
            >
              Export CSV
            </Menu.Item>
            <Menu.Item
              style={{ fontSize: 14, color: "#333" }}
              onClick={() => handleExport("pdf")}
            >
              Export PDF
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {isLoading ? (
        <DiscountTableSkeleton />
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
