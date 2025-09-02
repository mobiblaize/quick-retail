import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ReturnsRefundsReport from "../../../components/dashboard/pointOfSales/reportsPages/returnsRefundsReport";
import ReturnsReportAnalytics from "../../../components/dashboard/pointOfSales/reportsPages/returnsReportAnlytics";
import { useState } from "react";
import RefundAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/returnsAnalysis";
import { notifications } from "@mantine/notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../../../utils/helpers";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";

const asNumber = (v: any) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

// No currency symbol, 2dp, thousands
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

// Normalize a returns row from API (keys often vary)
const normalizeReturn = (r: any) => ({
  orderId: r.order_id ?? r["Order ID"] ?? r.orderId ?? "",
  productId: r.product_id ?? r["Product ID"] ?? r.productId ?? "",
  dateReturned:
    r.date_returned ?? r["Date Returned"] ?? r.returned_at ?? r.created_at ?? "",
  customerName: r.customer_name ?? r["Customer Name"] ?? r.customer ?? "",
  productName: r.product_name ?? r["Product name"] ?? r["Product Name"] ?? "",
  reason: r.reason ?? r["Reason"] ?? "",
  status: String(r.status ?? r["Status"] ?? "").toUpperCase(),
});

// Consistent filename like: full-returns-report_AllStores_2025-08-01_to_2025-08-31.pdf
const makeFileName = (
  storeName: string | undefined,
  startDate: string,
  endDate: string,
  ext: "pdf" | "csv"
) => {
  const start = (startDate || "").replace(/\s+/g, "_");
  const end = (endDate || "").replace(/\s+/g, "_");
  const store = (storeName || "AllStores").replace(/[^\w-]+/g, "_");
  return `full-returns-report_${store}_${start}_to_${end}.${ext}`;
};

// Shared, robust downloader for both CSV & PDF
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

const RetunsRefundsReportPage = () => {
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

  // Fetch ALL pages for the selected range
  const fetchAllReturnsPages = async () => {
    let allReturns: any[] = [];
    let page = 1;
    let lastPage = 1;
    const PER_PAGE = 100;

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "returns",
        paginate: true,
        per_page: PER_PAGE,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      const returnsData = res?.data?.data?.returns;
      const rows = returnsData?.data || [];
      if (!rows.length) break;

      allReturns = allReturns.concat(rows);
      lastPage = returnsData.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allReturns.map(normalizeReturn);
  };

  // ---- PDF export: header shows store + date range, safe width ratios ----
  const exportFullPDF = async () => {
    if (downloading) return;
    try {
      setDownloading("pdf");

      const allReturns = await fetchAllReturnsPages();

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
      const marginX = 36;
      const DRAW_PAGE_HEADER = true; // show date range in exported PDF
      const topMargin = DRAW_PAGE_HEADER ? 96 : 36;

      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - marginX * 2;
      const cw = (r: number) => Math.floor(contentWidth * r); // r is 0..1

      const storeName = selectedStore?.name || "All Stores";
      const title = "Returns & Refunds Report";
      const dateLine = `Date: ${formatDate(startDate)} - ${formatDate(endDate)}`;
      const storeLine = `Store: ${storeName}`;

      const didDrawPage = (data: any) => {
        if (!DRAW_PAGE_HEADER) return;
        const y1 = 32, y2 = 52, y3 = 72;
        // @ts-ignore
        doc.setFont(undefined, "bold"); doc.setFontSize(16);
        doc.text(title, marginX, y1);
                // @ts-ignore
        doc.setFont(undefined, "normal"); doc.setFontSize(11);
        doc.text(storeLine, marginX, y2);
        doc.text(dateLine, marginX, y3);
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber ?? 1}`, pageWidth - marginX, y1, { align: "right" });
      };

      const orangeHead = {
        fillColor: [241, 103, 34] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
      };

      // Stats
      const refundVal = asNumber(reportData?.data?.stats?.total_refund_value);
      const pendingVal = asNumber(reportData?.data?.stats?.total_pending_complaints);
      const resolvedVal = asNumber(reportData?.data?.stats?.total_resolved_complaints);
      const declinedVal = asNumber(reportData?.data?.stats?.total_declined_complaints);
      const totalComplaints = pendingVal + resolvedVal + declinedVal;
      const pct = (v: number) =>
        totalComplaints > 0
          ? `${(v * 100 / totalComplaints).toFixed(1)}%`
          : "0%";

      autoTable(doc, {
        tableWidth: contentWidth,
        margin: { top: topMargin, left: marginX, right: marginX },
        startY: topMargin,
        head: [["Metric", "Value (Count)", "Percentage"]],
        body: [
          ["Total Returned Value", formatAmount(refundVal), "-"],
          ["Pending Complaints", String(pendingVal), pct(pendingVal)],
          ["Resolved Complaints", String(resolvedVal), pct(resolvedVal)],
          ["Complaints Declined", String(declinedVal), pct(declinedVal)],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.5) },
          1: { cellWidth: cw(0.25), halign: "right" },
          2: { cellWidth: cw(0.25), halign: "right" },
        },
        didDrawPage,
      });

      // Product Returns summary (from reportData)
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Product Name", "Product Price", "Return Count"]],
        body: (reportData?.data?.product_returns || []).map((c: any) => [
          c.product_name,
          formatAmount(c.product_price),
          String(asNumber(c.return_count)),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.6) },
          1: { cellWidth: cw(0.2), halign: "right" },
          2: { cellWidth: cw(0.2), halign: "right" },
        },
        didDrawPage,
      });

      // Location status (approved/store/refunded)
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Approved", "Store", "Total Refunded"]],
        body: (reportData?.data?.location_status || []).map((p: any) => [
          String(p.approved),
          p.location_name,
          formatAmount(p.total_refunded),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.2) },
          1: { cellWidth: cw(0.5) },
          2: { cellWidth: cw(0.3), halign: "right" },
        },
        didDrawPage,
      });

      // Full returns table (7 columns = 14/12/14/18/22/12/8)
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Order ID", "Product ID", "Date Returned", "Customer Name", "Product Name", "Reason", "Status"]],
        body: (allReturns || []).map((s) => [
          s.orderId,
          s.productId,
          s.dateReturned ? formatDate(s.dateReturned) : "",
          s.customerName,
          s.productName,
          s.reason,
          s.status,
        ]),
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.14) },
          1: { cellWidth: cw(0.12) },
          2: { cellWidth: cw(0.14) },
          3: { cellWidth: cw(0.18) },
          4: { cellWidth: cw(0.22) },
          5: { cellWidth: cw(0.12) },
          6: { cellWidth: cw(0.08) },
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

  // ---- CSV export: header rows include report/store/date range; UTF-8 BOM ----
  const exportFullCSV = async () => {
    if (downloading) return;
    try {
      setDownloading("csv");

      const allReturns = await fetchAllReturnsPages();
      const storeName = selectedStore?.name || "All Stores";

      const lines: string[] = [];
      const BOM = "\uFEFF";

      // Header block
      lines.push([csvEscape("Report"), csvEscape("Returns & Refunds Report")].join(","));
      lines.push([csvEscape("Store"), csvEscape(storeName)].join(","));
      lines.push([csvEscape("Date Range"), csvEscape(`${formatDate(startDate)} - ${formatDate(endDate)}`)].join(","));
      lines.push("");

      // Stats
      const refundVal = asNumber(reportData?.data?.stats?.total_refund_value);
      const pendingVal = asNumber(reportData?.data?.stats?.total_pending_complaints);
      const resolvedVal = asNumber(reportData?.data?.stats?.total_resolved_complaints);
      const declinedVal = asNumber(reportData?.data?.stats?.total_declined_complaints);
      const totalComplaints = pendingVal + resolvedVal + declinedVal;
      const pct = (v: number) =>
        totalComplaints > 0
          ? `${(v * 100 / totalComplaints).toFixed(1)}%`
          : "0%";

      lines.push([csvEscape("Metric"), csvEscape("Value (Count)"), csvEscape("Percentage")].join(","));
      lines.push([csvEscape("Total Returned Value"), csvEscape(formatAmount(refundVal)), csvEscape("-")].join(","));
      lines.push([csvEscape("Pending Complaints"), csvEscape(pendingVal), csvEscape(pct(pendingVal))].join(","));
      lines.push([csvEscape("Resolved Complaints"), csvEscape(resolvedVal), csvEscape(pct(resolvedVal))].join(","));
      lines.push([csvEscape("Complaints Declined"), csvEscape(declinedVal), csvEscape(pct(declinedVal))].join(","));
      lines.push("");

      // Product returns summary
      lines.push([csvEscape("Product Name"), csvEscape("Product Price"), csvEscape("Return Count")].join(","));
      (reportData?.data?.product_returns || []).forEach((c: any) => {
        lines.push([csvEscape(c.product_name), csvEscape(formatAmount(c.product_price)), csvEscape(asNumber(c.return_count))].join(","));
      });
      lines.push("");

      // Location status
      lines.push([csvEscape("Approved"), csvEscape("Store"), csvEscape("Total Refunded")].join(","));
      (reportData?.data?.location_status || []).forEach((p: any) => {
        lines.push([csvEscape(String(p.approved)), csvEscape(p.location_name), csvEscape(formatAmount(p.total_refunded))].join(","));
      });
      lines.push("");

      // Full returns
      lines.push([csvEscape("Order ID"), csvEscape("Product ID"), csvEscape("Date Returned"), csvEscape("Customer Name"), csvEscape("Product Name"), csvEscape("Reason"), csvEscape("Status")].join(","));
      (allReturns || []).forEach((r) => {
        lines.push([
          csvEscape(r.orderId),
          csvEscape(r.productId),
          csvEscape(r.dateReturned ? formatDate(r.dateReturned) : ""),
          csvEscape(r.customerName),
          csvEscape(r.productName),
          csvEscape(r.reason),
          csvEscape(r.status),
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
        <div className="flex gap-8 items-center">
          {backButton}
        </div>
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
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Reports: Returns and Refunds
        </Text>
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
      <ReturnsReportAnalytics reportInfo={reportInfo} />
      <RefundAnalysis reportInfo={reportInfo} />
      <ReturnsRefundsReport reportInfo={reportInfo} />
    </PageContainer>
  );
};

export default RetunsRefundsReportPage;
