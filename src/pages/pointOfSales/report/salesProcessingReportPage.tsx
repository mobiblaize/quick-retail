import { Box, Text, Menu, Button } from "@mantine/core";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import SalesProcessingReport from "../../../components/dashboard/pointOfSales/reportsPages/salesProcessingReport";
import SalesOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/overviewSales";
import SalesCustomerAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/salesCustomerAnalysis";
import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { notifications } from "@mantine/notifications";
import { formatDate } from "../../../utils/helpers";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";

// ---------- helpers ----------
const asNumber = (v: any) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// 2-decimal, thousands, **no currency symbol**
const formatAmount = (v: any) =>
  new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(asNumber(v));

const csvEscape = (val: any) => {
  if (val === null || val === undefined) return '""';
  const s = String(val).replace(/"/g, '""');
  return `"${s}"`;
};

// Normalize a raw sales row from API into a single shape.
const normalizeSale = (s: any) => ({
  orderId: s.order_id ?? s.orderID ?? s.OrderId ?? s.id ?? "",
  date: s.date ?? s.created_at ?? s.createdAt ?? s.Date ?? "",
  customerName:
    s.customer_name ??
    s.customerName ??
    s.customer?.name ??
    s["Customer Name"] ??
    "",
  totalAmount:
    asNumber(s.total_amount ?? s.totalAmount ?? s["Total Amount"] ?? s.amount),
  status: String(s.status ?? s.Status ?? "").toUpperCase(),
});

// Consistent file name like: full-sales-report_AllStores_2025-08-01_to_2025-08-31
const makeFileName = (
  storeName: string | undefined,
  startDate: string,
  endDate: string,
  ext: "pdf" | "csv"
) => {
  const start = (startDate || "").replace(/\s+/g, "_");
  const end = (endDate || "").replace(/\s+/g, "_");
  const store = (storeName || "AllStores").replace(/[^\w-]+/g, "_");
  return `full-sales-report_${store}_${start}_to_${end}.${ext}`;
};

// Single robust downloader used by both PDF and CSV
const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  setTimeout(() => {
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 250);
  }, 0);
};

const SalesProcessingReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, locationId, reportData } = (location.state as any) || {};

  const [reportInfo] = useState({
    startDate,
    endDate,
    locationId,
    reportData,
  });

  const { data: storeData, isLoading: isLoadingStores } = useFetchStore();
  const generateReport = useGenerateReport();

  const selectedStore = storeData?.data?.stores?.data?.find(
    (store: any) => store.locationID === locationId
  );

  const [downloading, setDownloading] = useState<null | "pdf" | "csv">(null);

  const handleBack = () => navigate(-1);

  // Pull the entire date range (all pages)
  const fetchAllSalesPages = async () => {
    let allSales: any[] = [];
    let page = 1;
    let lastPage = 1;

    const PER_PAGE = 100; // bigger page size = fewer roundtrips (if backend allows)

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "sales",
        paginate: true,
        per_page: PER_PAGE,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      const salesData = res?.data?.data?.sales;
      if (!salesData?.data?.length) break;

      allSales = allSales.concat(salesData.data);
      lastPage = salesData.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allSales.map(normalizeSale);
  };

  // ---- PDF export (no ₦, clear amounts, right-aligned, no header overlap) ----
  const exportFullPDF = async () => {
    if (downloading) return;
    try {
      setDownloading("pdf");

      const allSales = await fetchAllSalesPages();

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
      const marginX = 36;
      const DRAW_PAGE_HEADER = false; // keep header OFF as requested
      const topMargin = DRAW_PAGE_HEADER ? 96 : 36;

      const storeName = selectedStore?.name || "All Stores";
      const title = "Sales Report";
      const dateLine = `Date: ${formatDate(startDate)} - ${formatDate(endDate)}`;

      const didDrawPage = (data: any) => {
        if (!DRAW_PAGE_HEADER) return;
        const pageWidth = doc.internal.pageSize.getWidth();
        const headerY1 = 32, headerY2 = 52, headerY3 = 72;
        // @ts-ignore
        doc.setFont(undefined, "bold"); doc.setFontSize(16);
        doc.text(title, marginX, headerY1);
         // @ts-ignore
        doc.setFont(undefined, "normal"); doc.setFontSize(11);
        doc.text(storeName, marginX, headerY2);
        doc.text(dateLine, marginX, headerY3);
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber ?? 1}`, pageWidth - marginX, headerY1, { align: "right" });
      };

      const orangeHead = {
        fillColor: [241, 103, 34] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
      };

      // Summary (no currency symbol)
      autoTable(doc, {
        margin: { top: topMargin, left: marginX, right: marginX },
        startY: topMargin,
        head: [["Metric", "Value"]],
        body: [
          ["Total Sales Value", formatAmount(reportData?.data?.stats?.totalSalesValue || 0)],
          ["Completed Orders", String(reportData?.data?.stats?.completedOrders ?? "0")],
          ["Pending Orders", String(reportData?.data?.stats?.pendingOrders ?? "0")],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "visible" },
        bodyStyles: { halign: "left" },
        headStyles: orangeHead,
        didDrawPage,
      });

      // Customer analysis (no ₦)
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Customer Name", "Total Orders", "Order Value"]],
        body: (reportData?.data?.customer_sales || []).map((c: any) => [
          c.customer_name,
          String(c.total_orders),
          formatAmount(c.total_order_value || 0),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "visible" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: 320 },
          1: { halign: "right" },
          2: { halign: "right" },
        },
        didDrawPage,
      });

      // Product analysis (no ₦)
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Product Name", "Total Sold", "Price"]],
        body: (reportData?.data?.product_sales || []).map((p: any) => [
          p.product_name,
          String(asNumber(p.total_sold || 0)),
          formatAmount(p.price || 0),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "visible" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: 320 },
          1: { halign: "right" },
          2: { halign: "right" },
        },
        didDrawPage,
      });

      // Full sales table (no ₦, wide amount col, right align, no wrap)
      autoTable(doc, {
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Order ID", "Date", "Customer", "Total Amount", "Status"]],
        body: allSales.map((s) => [
          s.orderId,
          formatDate(s.date),
          s.customerName,
          formatAmount(s.totalAmount), // **no Naira sign**
          s.status,
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "visible" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: 120 },
          1: { cellWidth: 120 },
          2: { cellWidth: 320 },
          3: { halign: "right", cellWidth: 170 }, // more space for amounts
          4: { cellWidth: 90 },
        },
        didDrawPage,
      });

      const blob = doc.output("blob");
      if (!blob || blob.size === 0) throw new Error("Empty PDF blob");
      const fileName = makeFileName(selectedStore?.name, startDate, endDate, "pdf");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full sales report PDF exported successfully!",
        color: "green",
      });
    } catch (e) {
      notifications.show({
        title: "Export Failed",
        message: "Could not export PDF. Please try again.",
        color: "red",
      });
      console.error(e);
    } finally {
      setTimeout(() => setDownloading(null), 400);
    }
  };

  // ---- CSV export (also remove currency sign for consistency) ----
  const exportFullCSV = async () => {
    if (downloading) return;
    try {
      setDownloading("csv");

      const allSales = await fetchAllSalesPages();
      const storeName = selectedStore?.name || "All Stores";

      const lines: string[] = [];
      const BOM = "\uFEFF"; // Excel-friendly UTF-8

      // Summary (no currency symbol)
      lines.push(csvEscape("Metric") + "," + csvEscape("Value"));
      lines.push(csvEscape("Total Sales Value") + "," + csvEscape(formatAmount(reportData?.data?.stats?.totalSalesValue)));
      lines.push(csvEscape("Completed Orders") + "," + csvEscape(reportData?.data?.stats?.completedOrders ?? "0"));
      lines.push(csvEscape("Pending Orders") + "," + csvEscape(reportData?.data?.stats?.pendingOrders ?? "0"));

      lines.push("");

      // Customer analysis
      lines.push([csvEscape("Customer Name"), csvEscape("Total Orders"), csvEscape("Order Value")].join(","));
      (reportData?.data?.customer_sales || []).forEach((c: any) => {
        lines.push([csvEscape(c.customer_name), csvEscape(c.total_orders), csvEscape(formatAmount(c.total_order_value))].join(","));
      });

      lines.push("");

      // Product analysis
      lines.push([csvEscape("Product Name"), csvEscape("Total Sold"), csvEscape("Price")].join(","));
      (reportData?.data?.product_sales || []).forEach((p: any) => {
        lines.push([csvEscape(p.product_name), csvEscape(formatAmount(p.total_sold)), csvEscape(formatAmount(p.price))].join(","));
      });

      lines.push("");

      // Full sales rows (normalized)
      lines.push([
        csvEscape("Order ID"),
        csvEscape("Date"),
        csvEscape("Customer"),
        csvEscape("Total Amount"),
        csvEscape("Status"),
      ].join(","));

      allSales.forEach((s) => {
        lines.push([
          csvEscape(s.orderId),
          csvEscape(formatDate(s.date)),
          csvEscape(s.customerName),
          csvEscape(formatAmount(s.totalAmount)),
          csvEscape(s.status),
        ].join(","));
      });

      const csvBody = lines.join("\n");
      const blob = new Blob([BOM + csvBody], { type: "text/csv;charset=utf-8;" });
      const fileName = makeFileName(storeName, startDate, endDate, "csv");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full sales report CSV exported successfully!",
        color: "green",
      });
    } catch (e) {
      notifications.show({
        title: "Export Failed",
        message: "Could not export CSV. Please try again.",
        color: "red",
      });
      console.error(e);
    } finally {
      setTimeout(() => setDownloading(null), 400);
    }
  };

  const handleExport = (val: "csv" | "pdf") => {
    if (downloading) {
      notifications.show({
        title: "Please wait",
        message: "Another download is starting—try again in a moment.",
        color: "yellow",
      });
      return;
    }
    if (!reportData?.data) {
      notifications.show({
        title: "No Report Data",
        message: "Generate a report for the date range first.",
        color: "red",
      });
      return;
    }
    if (val === "pdf") exportFullPDF();
    else exportFullCSV();
  };

  const getSubHeaders = () => {
    const backButton = (
      <button onClick={handleBack} className="flex cursor-pointer gap-2 items-center">
        <ChevronLeft />
        <Text fw={500} c="black">Back</Text>
      </button>
    );

    return [
      <div key="1" className="py-2.5 flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-8 items-center">{backButton}</div>

        <div className="flex items-center gap-3">
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary" disabled={!!downloading}>
                {downloading ? "Exporting..." : "Export"}
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
                disabled={!!downloading}
                style={{ fontSize: 14, color: downloading ? "#ccc" : "#333" }}
                onClick={() => handleExport("csv")}
              >
                {downloading === "csv" ? "Exporting CSV..." : "Export CSV"}
              </Menu.Item>
              <Menu.Item
                disabled={!!downloading}
                style={{ fontSize: 14, color: downloading ? "#ccc" : "#333" }}
                onClick={() => handleExport("pdf")}
              >
                {downloading === "pdf" ? "Exporting PDF..." : "Export PDF"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>,

      <div key="2" className="flex justify-between">
        <Text fw={500} size="xl" c="black">Sales Report</Text>
        <Box
          style={{
            border: "1px solid #E0E0E0",
            borderRadius: "8px",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            fontSize: "0.875rem",
            color: "#344054",
            minWidth: 230,
          }}
        >
          <Text fw={500} size="sm" c="black">
            {formatDate(startDate)} – {formatDate(endDate)}
          </Text>
        </Box>
      </div>,
    ];
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <div className="rounded-lg px-4 py-2 mb-2">
        {isLoadingStores ? (
          <Text>Loading store info...</Text>
        ) : (
          <Text>
            Showing Report For:{" "}
            <span className="font-semibold text-lg">
              {selectedStore?.name || "All Stores"}
            </span>
          </Text>
        )}
      </div>

      <SalesOverviewReport reportInfo={reportInfo} />
      <SalesCustomerAnalysis reportInfo={reportInfo} />
      <SalesProcessingReport reportInfo={reportInfo} />
    </PageContainer>
  );
};

export default SalesProcessingReportPage;
