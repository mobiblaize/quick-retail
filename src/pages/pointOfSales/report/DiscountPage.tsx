import { Box, Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../../../utils/helpers";
import DiscountOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/discountOverview";
import DiscountAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/DiscountManagement";
import DiscountReportTable from "../../../components/dashboard/pointOfSales/reportsPages/DiscountReportTable";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";

// ---------- helpers ----------
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

// Percent with up to 2 dp and a % sign
const formatPercent = (v: any) =>
  `${new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(asNumber(v))}%`;

const csvEscape = (val: any) => {
  if (val === null || val === undefined) return '""';
  const s = String(val).replace(/"/g, '""');
  return `"${s}"`;
};

// Normalize discount row coming from API (keys often vary)
const normalizeDiscount = (d: any) => ({
  name: d.discount_name ?? d.name ?? d["Discount name"] ?? d["Discount Name"] ?? "",
  percentOff: asNumber(d.percent_off ?? d["Percent Off"] ?? d.percentage ?? 0),
  priceOff: asNumber(d.price_off ?? d["Price Off"] ?? d.amount_off ?? 0),
  dateFrom: d.date_from ?? d["Date From"] ?? d.start_date ?? d.valid_from ?? "",
  dateTo: d.date_to ?? d["Date To"] ?? d.end_date ?? d.valid_to ?? "",
  redemption: asNumber(d.redemption ?? d["Redemption"] ?? d.used_count ?? 0),
  status: String(d.status ?? d["Status"] ?? "").toUpperCase(),
});

// File name like: full-discount-report_AllStores_2025-08-01_to_2025-08-31.pdf
const makeFileName = (
  storeName: string | undefined,
  startDate: string,
  endDate: string,
  ext: "pdf" | "csv"
) => {
  const start = (startDate || "").replace(/\s+/g, "_");
  const end = (endDate || "").replace(/\s+/g, "_");
  const store = (storeName || "AllStores").replace(/[^\w-]+/g, "_");
  return `full-discount-report_${store}_${start}_to_${end}.${ext}`;
};

// One robust downloader used by both PDF and CSV
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

const DiscountReportPage = () => {
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

  // Pull ALL pages for the selected range
  const fetchAllDiscountPages = async () => {
    let allRows: any[] = [];
    let page = 1;
    let lastPage = 1;
    const PER_PAGE = 100;

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "discounts",
        paginate: true,
        per_page: PER_PAGE,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      // Some backends return "discounts", others (as in your code) used "products"
      const list = res?.data?.data?.discounts ?? res?.data?.data?.products;
      const rows = list?.data || [];
      if (!rows.length) break;

      allRows = allRows.concat(rows);
      lastPage = list.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allRows.map(normalizeDiscount);
  };

  // ---- PDF export (shows date range + store in header, safe widths) ----
  const exportFullPDF = async () => {
    if (downloading) return;
    try {
      setDownloading("pdf");

      const allDiscounts = await fetchAllDiscountPages();

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
      const marginX = 36;
      const DRAW_PAGE_HEADER = true; // show date range in the export
      const topMargin = DRAW_PAGE_HEADER ? 96 : 36;

      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - marginX * 2;
      const cw = (r: number) => Math.floor(contentWidth * r); // r is 0..1 ratio

      const storeName = selectedStore?.name || "All Stores";
      const title = "Discount Report";
      const dateLine = `Date: ${formatDate(startDate, false)} - ${formatDate(endDate, false)}`;
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

      // --- Stats (50/50) ---
      autoTable(doc, {
        tableWidth: contentWidth,
        margin: { top: topMargin, left: marginX, right: marginX },
        startY: topMargin,
        head: [["Metric", "Value"]],
        body: [
          ["Total Discount Value", formatAmount(reportData?.data?.stats?.total_actual_discount_value || 0)],
          ["Total Discounts", String(reportData?.data?.stats?.total_discounts ?? "0")],
          ["Redemptions (Used Discount)", String(reportData?.data?.stats?.total_redemptions ?? "0")],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.5) },
          1: { cellWidth: cw(0.5), halign: "right" },
        },
        didDrawPage,
      });

      // --- Top Discounted Products (40/20/20/20) ---
      const topProducts = Object.values(reportData?.data?.top_discounted_products || {});
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Product Name", "Selling Price", "Total Discount Value", "Total Redemptions"]],
        body: (topProducts as any[]).map((c: any) => [
          c.product_name,
          formatAmount(c.selling_price),
          formatAmount(c.total_discount_value),
          String(asNumber(c.total_redemptions)),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.4) },
          1: { cellWidth: cw(0.2), halign: "right" },
          2: { cellWidth: cw(0.2), halign: "right" },
          3: { cellWidth: cw(0.2), halign: "right" },
        },
        didDrawPage,
      });

      // --- All Discounts (7 cols = 24/10/12/14/14/12/14) ---
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Discount Name", "Percent Off", "Price Off", "Date From", "Date To", "Redemptions", "Status"]],
        body: (allDiscounts || []).map((d) => [
          d.name,
          formatPercent(d.percentOff),
          formatAmount(d.priceOff),
          d.dateFrom ? formatDate(d.dateFrom, false) : "",
          d.dateTo ? formatDate(d.dateTo, false) : "",
          String(asNumber(d.redemption)),
          d.status,
        ]),
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.24) },
          1: { cellWidth: cw(0.10), halign: "right" },
          2: { cellWidth: cw(0.12), halign: "right" },
          3: { cellWidth: cw(0.14) },
          4: { cellWidth: cw(0.14) },
          5: { cellWidth: cw(0.12), halign: "right" },
          6: { cellWidth: cw(0.14) },
        },
        didDrawPage,
      });

      // ---- Download ----
      const blob = doc.output("blob");
      if (!blob || blob.size === 0) throw new Error("Empty PDF blob");
      const fileName = makeFileName(selectedStore?.name, startDate, endDate, "pdf");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full discount report PDF exported successfully!",
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

  // ---- CSV export (adds date range/store header, UTF-8 BOM, normalized keys) ----
  const exportFullCSV = async () => {
    if (downloading) return;
    try {
      setDownloading("csv");

      const allDiscounts = await fetchAllDiscountPages();
      const storeName = selectedStore?.name || "All Stores";

      const lines: string[] = [];
      const BOM = "\uFEFF"; // Excel-friendly UTF-8

      // Header block with report title, store, and date range
      lines.push([csvEscape("Report"), csvEscape("Discount Report")].join(","));
      lines.push([csvEscape("Store"), csvEscape(storeName)].join(","));
      lines.push([csvEscape("Date Range"), csvEscape(`${formatDate(startDate, false)} - ${formatDate(endDate, false)}`)].join(","));
      lines.push(""); // blank line

      // Stats
      lines.push([csvEscape("Metric"), csvEscape("Value")].join(","));
      lines.push([csvEscape("Total Discount Value"), csvEscape(formatAmount(reportData?.data?.stats?.total_actual_discount_value || 0))].join(","));
      lines.push([csvEscape("Total Discounts"), csvEscape(reportData?.data?.stats?.total_discounts ?? "0")].join(","));
      lines.push([csvEscape("Redemptions (Used Discount)"), csvEscape(reportData?.data?.stats?.total_redemptions ?? "0")].join(","));
      lines.push("");

      // Top Discounted Products
      const topProducts = Object.values(reportData?.data?.top_discounted_products || {});
      lines.push([csvEscape("Product Name"), csvEscape("Selling Price"), csvEscape("Total Discount Value"), csvEscape("Total Redemptions")].join(","));
      (topProducts as any[]).forEach((c: any) => {
        lines.push([csvEscape(c.product_name), csvEscape(formatAmount(c.selling_price)), csvEscape(formatAmount(c.total_discount_value)), csvEscape(asNumber(c.total_redemptions))].join(","));
      });
      lines.push("");

      // All Discounts
      lines.push([csvEscape("Discount Name"), csvEscape("Percent Off"), csvEscape("Price Off"), csvEscape("Date From"), csvEscape("Date To"), csvEscape("Redemptions"), csvEscape("Status")].join(","));
      (allDiscounts || []).forEach((d) => {
        lines.push([
          csvEscape(d.name),
          csvEscape(formatPercent(d.percentOff)),
          csvEscape(formatAmount(d.priceOff)),
          csvEscape(d.dateFrom ? formatDate(d.dateFrom, false) : ""),
          csvEscape(d.dateTo ? formatDate(d.dateTo, false) : ""),
          csvEscape(asNumber(d.redemption)),
          csvEscape(d.status),
        ].join(","));
      });

      const csvBody = lines.join("\n");
      const blob = new Blob([BOM + csvBody], { type: "text/csv;charset=utf-8;" });
      const fileName = makeFileName(storeName, startDate, endDate, "csv");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full discount report CSV exported successfully!",
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
    } else if (!reportData?.data) {
      notifications.show({
        title: "No Report Data",
        message: "Generate a report for the date range first.",
        color: "red",
      });
    } else if (val === "pdf") {
      exportFullPDF();
    } else {
      exportFullCSV();
    }
  };

  const getSubHeaders = () => {
    const backButton = (
      <button onClick={handleBack} className="flex cursor-pointer gap-2 items-center">
        <ChevronLeft />
        <Text fw={500} c="black">
          Back
        </Text>
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
      <div key="2" className="flex justify-between">
        <Text fw={500} size="xl" c="black">
          Discount Report
        </Text>
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
            {formatDate(startDate, false)} – {formatDate(endDate, false)}
          </Text>
        </Box>
      </div>,
    ];
  };

  return (
    <PageContainer subHeaders={getSubHeaders()}>
      <div className=" rounded-lg px-4 py-2 mb-2">
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
      <DiscountOverviewReport reportInfo={reportInfo} />
      <DiscountAnalysis reportInfo={reportInfo} />
      <DiscountReportTable reportInfo={reportInfo} />
    </PageContainer>
  );
};

export default DiscountReportPage;

