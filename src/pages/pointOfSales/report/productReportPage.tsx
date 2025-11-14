import { Box, Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ProductManagementReport from "../../../components/dashboard/pointOfSales/reportsPages/productManagementReport";
import { useState } from "react";
import ProductOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/productOverview";
import ProductCustomerAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/productCustomerAnalysis";
import { notifications } from "@mantine/notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../../../utils/helpers";
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

const csvEscape = (val: any) => {
  if (val === null || val === undefined) return '""';
  const s = String(val).replace(/"/g, '""');
  return `"${s}"`;
};

// Normalize a raw product row from API
const normalizeProduct = (p: any) => ({
  productName: p.product_name ?? p.name ?? p["Product Name"] ?? "",
  sku: p.sku ?? p.SKU ?? "",
  location: p.location ?? p.location_name ?? p["Location"] ?? "",
  category: p.category ?? p.category_name ?? p["Category"] ?? "",
  sellingPrice: asNumber(p.selling_price ?? p.price ?? p["Selling price"] ?? 0),
  stock: asNumber(p.stock ?? p.quantity ?? p["Stock"] ?? 0),
  status: String(p.status ?? p["Status"] ?? "").toUpperCase(),
});

// Consistent file name like: full-product-report_AllStores_2025-08-01_to_2025-08-31
const makeFileName = (
  storeName: string | undefined,
  startDate: string,
  endDate: string,
  ext: "pdf" | "csv"
) => {
  const start = (startDate || "").replace(/\s+/g, "_");
  const end = (endDate || "").replace(/\s+/g, "_");
  const store = (storeName || "AllStores").replace(/[^\w-]+/g, "_");
  return `full-product-report_${store}_${start}_to_${end}.${ext}`;
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
    }, 250); // short delay = more reliable across browsers
  }, 0);
};

const ProductReportPage = () => {
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

  // helper to fetch ALL pages
  const fetchAllProductPages = async () => {
    let allProducts: any[] = [];
    let page = 1;
    let lastPage = 1;

    const PER_PAGE = 100;

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "products",
        paginate: true,
        per_page: PER_PAGE,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      const productData = res?.data?.data?.products;
      const rows = productData?.data || [];
      if (!rows.length) break;

      allProducts = allProducts.concat(rows);
      lastPage = productData.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allProducts.map(normalizeProduct);
  };

  // ---- PDF export with safe column widths (no cut off) ----
  const exportFullPDF = async () => {
    if (downloading) return;
    try {
      setDownloading("pdf");

      const allProducts = await fetchAllProductPages();

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "A4" });
      const marginX = 36;
      const DRAW_PAGE_HEADER = false; // keep header OFF to avoid covering tables
      const topMargin = DRAW_PAGE_HEADER ? 96 : 36;

      const pageWidth = doc.internal.pageSize.getWidth();
      const contentWidth = pageWidth - marginX * 2;
      const cw = (r: number) => Math.floor(contentWidth * r); // r is 0..1 ratio

      const storeName = selectedStore?.name || "All Stores";
      const title = "Product Report";
      const dateLine = `Date: ${formatDate(startDate, false)} - ${formatDate(endDate, false)}`;

      const didDrawPage = (data: any) => {
        if (!DRAW_PAGE_HEADER) return;
        const pageWidth = doc.internal.pageSize.getWidth();
   
        const y1 = 32, y2 = 52, y3 = 72;
             // @ts-ignore
        doc.setFont(undefined, "bold"); doc.setFontSize(16);
        doc.text(title, marginX, y1);
          // @ts-ignore
        doc.setFont(undefined, "normal"); doc.setFontSize(11);
        doc.text(storeName, marginX, y2);
        doc.text(dateLine, marginX, y3);
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber ?? 1}`, pageWidth - marginX, y1, { align: "right" });
      };

      const orangeHead = {
        fillColor: [241, 103, 34] as [number, number, number],
        textColor: [255, 255, 255] as [number, number, number],
      };

      // Stats (2 columns = 50/50)
      autoTable(doc, {
        tableWidth: contentWidth,
        margin: { top: topMargin, left: marginX, right: marginX },
        startY: topMargin,
        head: [["Metric", "Value"]],
        body: [
          ["Total Product Value", formatAmount(reportData?.data?.stats?.total_revenue || 0)],
          ["Active Products", String(reportData?.data?.stats?.active_products ?? "0")],
          ["Inactive Products", String(reportData?.data?.stats?.inactive_products ?? "0")],
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

      // Category Sales (3 columns = 50% / 20% / 30%)
      const categoryRows =
        reportData?.data?.category_sales ||
        reportData?.data?.customer_sales ||
        [];
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Category Name", "Total Quantity Sold", "Total Revenue"]],
        body: (categoryRows || []).map((c: any) => [
          c.category_name,
          String(asNumber(c.total_quantity_sold)),
          formatAmount(c.total_revenue || 0),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.5) },
          1: { cellWidth: cw(0.2), halign: "right" },
          2: { cellWidth: cw(0.3), halign: "right" },
        },
        didDrawPage,
      });

      // Product Sales (3 columns = 50% / 20% / 30%)
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [["Product Name", "Total Sold", "Price"]],
        body: (reportData?.data?.product_sales || []).map((p: any) => [
          p.product_name,
          String(asNumber(p.total_sold)),
          formatAmount(p.price || 0),
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.5) },
          1: { cellWidth: cw(0.2), halign: "right" },
          2: { cellWidth: cw(0.3), halign: "right" },
        },
        didDrawPage,
      });

      // All Products (7 columns = 28% / 13% / 16% / 16% / 13% / 8% / 6%)
      autoTable(doc, {
        tableWidth: contentWidth,
        startY: (doc as any).lastAutoTable.finalY + 14,
        margin: { top: topMargin, left: marginX, right: marginX },
        head: [
          ["Product Name", "SKU", "Location", "Category", "Selling Price", "Stock", "Status"],
        ],
        body: (allProducts || []).map((p) => [
          p.productName,
          p.sku,
          p.location,
          p.category,
          formatAmount(p.sellingPrice),
          String(asNumber(p.stock)),
          p.status,
        ]),
        theme: "grid",
        styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak" },
        headStyles: orangeHead,
        columnStyles: {
          0: { cellWidth: cw(0.28) },
          1: { cellWidth: cw(0.13) },
          2: { cellWidth: cw(0.16) },
          3: { cellWidth: cw(0.16) },
          4: { cellWidth: cw(0.13), halign: "right" },
          5: { cellWidth: cw(0.08), halign: "right" },
          6: { cellWidth: cw(0.06) },
        },
        didDrawPage,
      });

      const blob = doc.output("blob");
      if (!blob || blob.size === 0) throw new Error("Empty PDF blob");

      const fileName = makeFileName(selectedStore?.name, startDate, endDate, "pdf");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full product report PDF exported successfully!",
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

  // ---- CSV export (UTF-8 BOM, safe escaping, normalized keys) ----
  const exportFullCSV = async () => {
    if (downloading) return;
    try {
      setDownloading("csv");

      const allProducts = await fetchAllProductPages();
      const storeName = selectedStore?.name || "All Stores";

      const lines: string[] = [];
      const BOM = "\uFEFF"; // Excel-friendly UTF-8

      // Stats
      lines.push(csvEscape("Metric") + "," + csvEscape("Value"));
      lines.push(csvEscape("Total Product Value") + "," + csvEscape(formatAmount(reportData?.data?.stats?.total_revenue || 0)));
      lines.push(csvEscape("Active Products") + "," + csvEscape(reportData?.data?.stats?.active_products ?? "0"));
      lines.push(csvEscape("Inactive Products") + "," + csvEscape(reportData?.data?.stats?.inactive_products ?? "0"));

      lines.push("");

      // Category Sales
      const categoryRows =
        reportData?.data?.category_sales ||
        reportData?.data?.customer_sales ||
        [];
      lines.push([csvEscape("Category Name"), csvEscape("Total Quantity Sold"), csvEscape("Total Revenue")].join(","));
      (categoryRows || []).forEach((c: any) => {
        lines.push([csvEscape(c.category_name), csvEscape(asNumber(c.total_quantity_sold)), csvEscape(formatAmount(c.total_revenue))].join(","));
      });

      lines.push("");

      // Product Sales
      lines.push([csvEscape("Product Name"), csvEscape("Total Sold"), csvEscape("Price")].join(","));
      (reportData?.data?.product_sales || []).forEach((p: any) => {
        lines.push([csvEscape(p.product_name), csvEscape(asNumber(p.total_sold)), csvEscape(formatAmount(p.price))].join(","));
      });

      lines.push("");

      // All Products
      lines.push([
        csvEscape("Product Name"),
        csvEscape("SKU"),
        csvEscape("Location"),
        csvEscape("Category"),
        csvEscape("Selling Price"),
        csvEscape("Stock"),
        csvEscape("Status"),
      ].join(","));

      (allProducts || []).forEach((p) => {
        lines.push([
          csvEscape(p.productName),
          csvEscape(p.sku),
          csvEscape(p.location),
          csvEscape(p.category),
          csvEscape(formatAmount(p.sellingPrice)),
          csvEscape(asNumber(p.stock)),
          csvEscape(p.status),
        ].join(","));
      });

      const csvBody = lines.join("\n");
      const blob = new Blob([BOM + csvBody], { type: "text/csv;charset=utf-8;" });
      const fileName = makeFileName(storeName, startDate, endDate, "csv");
      downloadBlob(blob, fileName);

      notifications.show({
        title: "Download started",
        message: "Full product report CSV exported successfully!",
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
        <Text fw={500} c="black">
          Back
        </Text>
      </button>
    );

    return [
      <div key="1" className="py-2.5 flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-[3em] items-center">{backButton}</div>
        <div className="flex items-center gap-3 pr-[3em]">
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
          Product Report
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
            {formatDate(startDate, false)} - {formatDate(endDate, false)}
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
      <ProductOverviewReport reportInfo={reportInfo} />
      <ProductCustomerAnalysis reportInfo={reportInfo} />
      <ProductManagementReport reportInfo={reportInfo} />
    </PageContainer>
  );
};

export default ProductReportPage;
