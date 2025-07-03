
import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TrailTable from "../../../components/admin/auditTrail/trailTable";
import { useFetchAuditTrails } from "../../../hooks/backendApis/admin/auditTrail";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
// import { useState } from "react";
import Dropdown from "../../../components/General/dropdown";
// @ts-ignore
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



const AuditTrailPage = () => {
//   const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
//   const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
//     startDate: "",
//     endDate: "",
//   });

//   const mapOrderStatus = (status: string | undefined) => {
//     if (!status || status.toLowerCase() === "all") return "";
//     if (status.toLowerCase() === "paid") return "paid";
//     if (status.toLowerCase() === "pending") return "pending";
//     return status.toLowerCase();
//   };
  

// const mapFiltersToPayload = (filters: FilterValues) => ({
//   // @ts-ignore
//   search: filters.search ?? "",
//   // @ts-ignore
//   sort_by: filters.sortBy ?? "",
//   per_page: "500",
//   paginate: true,
//   start_date: filters.startDate ?? "",
//   end_date: filters.endDate ?? "",
//   status: mapOrderStatus(filters.paymentStatus),
//   price_from: filters.priceFrom ?? 100,
//   price_to: filters.priceTo ?? ""
// });
const handleFilterChange = (filters: FilterValues) => {
    // setAppliedFilters(filters);
  };


const exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
  ];


  const { data, isLoading, error } = useFetchAuditTrails();
  const handleExport = (format: string) => {
    const logs = data?.data?.data || [];
  
    if (!logs || logs.length === 0) return;
  
    const tableData = logs.map((log: any) => ({
      timestamp: new Date(log.created_at).toLocaleString(),
      name: `${log.causer?.firstname || ''} ${log.causer?.lastname || ''}`,
      email: log.causer?.email || 'N/A',
      role: log.causer?.roles || 'N/A',
      activity: log.log_name || '',
      module: log.action_module || '',
      ipAddress: log.ip_address || '',
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
        head: [[
          "Timestamp",
          "Name",
          "Email",
          "Role",
          "Activity",
          "Module",
          "IP Address"
        ]],
        body: tableData.map((row: { timestamp: any; name: any; email: any; role: any; activity: any; module: any; ipAddress: any; }) => [
          row.timestamp,
          row.name,
          row.email,
          row.role,
          row.activity,
          row.module,
          row.ipAddress
        ]),
        styles: {
          fontSize: 8,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [241, 103, 34], // orange: #F16722
          textColor: 255,
          fontStyle: 'bold',
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
  
      <div className="flex items-center mt-2">
        <Text c="black" fw={500}>
        Audit Trail
        </Text>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Dropdown
        //@ts-ignore
        options={exportOptions}
        //@ts-ignore
        onChange={(val) => handleExport(val)}
        placeholder="Export"
        inputSizeClass="py-1"
        bgColorClass="bg-[#F16722]"
        textColorClass="text-white"
      />
    </div>
  </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <TrailTable
        isLoading={isLoading}
        error={error}
        logs={data?.data?.data || []} 
        onFilterChange={handleFilterChange}
   
      />
    </PageContainer>
  );
};

export default AuditTrailPage;
