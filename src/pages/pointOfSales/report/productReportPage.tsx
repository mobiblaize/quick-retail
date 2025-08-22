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
// import Dropdown from "../../../components/General/dropdown";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";

const ProductReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, locationId, reportData } = location.state || {};

  const [reportInfo] = useState({
    startDate,
    endDate,
    locationId,
    reportData,
  });

  // const exportOptions = [
  //   { label: "CSV", value: "csv" },
  //   { label: "PDF", value: "pdf" },
  // ];

  const { data: storeData, isLoading: isLoadingStores } = useFetchStore();
  const generateReport = useGenerateReport();
  const selectedStore = storeData?.data?.stores?.data?.find(
    (store: any) => store.locationID === locationId
  );

  const handleBack = () => {
    navigate(-1);
  };

  // helper to fetch ALL pages
  const fetchAllProductPages = async () => {
    let allProducts: any[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "products",
        paginate: true,
        per_page: 50,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      const productData = res?.data?.data?.products;
      if (!productData?.data) break;

      allProducts = [...allProducts, ...productData.data];
      lastPage = productData.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allProducts;
  };


  const exportFullPDF = async () => {
    const allProducts = await fetchAllProductPages();

    const doc = new jsPDF();
    const orangeHeaderStyle = {
      fillColor: [241, 103, 34] as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
    };

    doc.text("Product Report", 14, 10);
    doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);

    autoTable(doc, {
      startY: 25,
      head: [["Metric", "Value"]],
      body: [
        ["Total Product Value", reportData?.data?.stats?.total_revenue || "0"],
        ["Active Products", reportData?.data?.stats?.active_products || "0"],
        ["Inactive Products", reportData?.data?.stats?.inactive_products || "0"],
      ],
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      startY: 25,
      head: [["Category Name", "Total Quantity Sold", "Total Revenue"]],
      body: (reportData?.data?.customer_sales || []).map((c: any) => [
        c.category_name,
        c.total_quantity_sold,
        c.total_revenue,
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Product Name", "Total Sold", "Price"]],
      body: (reportData?.data?.product_sales || []).map((p: any) => [
        p.product_name,
        p.total_sold,
        p.price,
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          "Product Name",
          "SKU",
          "Location",
          "Category",
          "Selling price",
          "Stock",
          "Status",
        ],
      ],
      body: allProducts.map((s: any) => [
        s["Product Name"],
        s["SKU"],
        s["Location"],
        s["Category"],
        s["Selling price"],
        s["Stock"],
        s["Status"],
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    doc.save("full-product-report.pdf");

    notifications.show({
      title: "Download Successful",
      message: "Full product report PDF exported successfully!",
      color: "green",
    });
  };

  const exportFullCSV = async () => {
    const allProducts = await fetchAllProductPages();

    const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`;

    const rows = [
      ["Metric", "Value"],
      ["Total Product Value", reportData?.data?.stats?.total_revenue || "0"],
      ["Active Products", reportData?.data?.stats?.active_products || "0"],
      ["Inactive Products", reportData?.data?.stats?.inactive_products || "0"],
      [],
      ["Category Name", "Total Quantity Sold", "Total Revenue"],
      ...(reportData?.data?.customer_sales || []).map((c: any) => [
        c.category_name,
        c.total_quantity_sold,
        c.total_revenue,
      ]),
      [],
      ["Product Name", "Total Sold", "Price"],
      ...(reportData?.data?.product_sales || []).map((p: any) => [
        p.product_name,
        p.total_sold,
        p.price,
      ]),
      [],
      [
        "Product Name",
        "SKU",
        "Location",
        "Category",
        "Selling price",
        "Stock",
        "Status",
      ],
      ...allProducts.map((s: any) => [
        s["Product Name"],
        s["SKU"],
        s["Location"],
        s["Category"],
        s["Selling price"],
        s["Stock"],
        s["Status"],
      ]),
    ];

    const csvContent = rows.map((r) => r.map(escapeValue).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const formattedStart = formatDate(startDate).replace(/\s+/g, "_");
    const formattedEnd = formatDate(endDate).replace(/\s+/g, "_");
    const fileName = `full-product-report_${formattedStart}_to_${formattedEnd}.csv`;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    notifications.show({
      title: "Download Successful",
      message: "Full product report CSV exported successfully!",
      color: "green",
    });
  };

  const handleExport = (val: "csv" | "pdf") => {
    if (val === "pdf") {
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
      <div key="1" className="py-2.5 flex flex-wrap justify-between items-center gap-3">
        <div className="flex gap-[3em] items-center">{backButton}</div>
        <div className="flex items-center gap-3 pr-[3em]">
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
      <ProductOverviewReport reportInfo={reportInfo} />
      <ProductCustomerAnalysis reportInfo={reportInfo} />
      <ProductManagementReport reportInfo={reportInfo} />
    </PageContainer>
  );
};

export default ProductReportPage;

