import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TrailTable from "../../../components/dashboard/adminPage/auditTrail/trailTable";
import { useFetchAuditTrails } from "../../../hooks/backendApis/admin/auditTrail";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router";
import { ChevronDown } from "lucide-react";
import { Papa } from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const AuditTrailPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");
        //@ts-ignore
  const [filters, setFilters] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setActiveSort(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const queryObj: Record<string, string> = {
      ...(newFilters.startDate && { start_date: newFilters.startDate }),
      ...(newFilters.endDate && { end_date: newFilters.endDate }),
      ...(newFilters.role && { role: newFilters.role }),
      ...(newFilters.module && { module: newFilters.module }),
      paginate: "true",
    };

    setSearchParams(queryObj);
  };

  const queryParams = useMemo(() => {
    const entries = Object.fromEntries(searchParams.entries());
    return {
      ...entries,
      search: searchTerm,
      sort_by: activeSort,
      page: currentPage,
      per_page: perPage,
      paginate: "true",
    };
  }, [searchParams, searchTerm, activeSort, currentPage, perPage]);

  const { data, isLoading, error } = useFetchAuditTrails(queryParams);

  const handleExport = (format: string) => {
    const logs = data?.data?.data || [];
    if (!logs.length) return;

    const tableData = logs.map((log: any) => ({
      timestamp: new Date(log.created_at).toLocaleString(),
      name: `${log.causer?.firstname || ""} ${log.causer?.lastname || ""}`,
      email: log.causer?.email || "N/A",
      role: log.causer?.roles || "N/A",
      activity: log.log_name || "",
      module: log.action_module || "",
      ipAddress: log.ip_address || "",
    }));

    if (format === "csv") {
      const csv = Papa.unparse(tableData);
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
        head: [["Timestamp", "Name", "Email", "Role", "Activity", "Module", "IP Address"]],
        body: tableData.map((row: any) => [
          row.timestamp,
          row.name,
          row.email,
          row.role,
          row.activity,
          row.module,
          row.ipAddress,
        ]),
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [241, 103, 34], textColor: 255, fontStyle: "bold" },
        margin: { top: 20 },
      });
      doc.save("audit_trail.pdf");
    }
  };

  const subHeaders = [
    <div key="1" className="py-2.5 flex justify-between items-center flex-wrap gap-3">
      <div className="flex gap-8 items-center">
        <Text c="black" fw={500}>Audit Trail</Text>
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
            <Menu.Item style={{ fontSize: 14, color: "#333" }} onClick={() => handleExport("csv")}>
              Export CSV
            </Menu.Item>
            <Menu.Item style={{ fontSize: 14, color: "#333" }} onClick={() => handleExport("pdf")}>
              Export PDF
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <TrailTable
        isLoading={isLoading}
        //@ts-ignore
        error={error}
        logs={data?.data?.data || []}
        onFilterChange={handleFilterChange}
        onPageChange={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={handleSearchChange}
        activeSort={activeSort}
        setSort={handleSortChange}
        filters={filters}
      />
    </PageContainer>
  );
};

export default AuditTrailPage;
