import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
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
import Dropdown from "../../../components/General/dropdown";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";

const SalesProcessingReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, locationId, reportData } = location.state || {};

  const [reportInfo] = useState({
    startDate,
    endDate,
    locationId,
    reportData,
  });

  const exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
  ];

  const { data: storeData, isLoading: isLoadingStores } = useFetchStore();

  const selectedStore = storeData?.data?.stores?.data?.find(
    (store: any) => store.locationID === locationId
  );

  const handleBack = () => {
    navigate(-1);
  };

  const exportFullPDF = () => {
    const doc = new jsPDF();
    const orangeHeaderStyle = {
      fillColor: [241, 103, 34] as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
    };

    doc.text("Sales Report", 14, 10);
    doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);

    autoTable(doc, {
      startY: 25,
      head: [["Metric", "Value"]],
      body: [
        ["Total Sales Value", reportData?.data?.stats?.totalSalesValue || "0"],
        ["Completed Orders", reportData?.data?.stats?.completedOrders || "0"],
        ["Pending Orders", reportData?.data?.stats?.pendingOrders || "0"],
      ],
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Customer Name", "Total Orders", "Order Value"]],
      body: (reportData?.data?.customer_sales || []).map((c: any) => [
        c.customer_name,
        c.total_orders,
        c.total_order_value,
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
      head: [["Order ID", "Date", "Customer", "Amount", "Status"]],
      body: (reportData?.data?.sales?.data || []).map((s: any) => [
        s["Order ID"],
        s["Date"],
        s["Customer Name"],
        s["Total Amount"],
        s["Status"],
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    doc.save("full-sales-report.pdf");

    notifications.show({
      title: "Download Successful",
      message: "Full sales report PDF exported successfully!",
      color: "green",
    });
  };

  const exportFullCSV = () => {
    const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`; // handles quotes inside values too

    const rows = [
      ["Metric", "Value"],
      ["Total Sales Value", reportData?.data?.stats?.totalSalesValue || "0"],
      ["Completed Orders", reportData?.data?.stats?.completedOrders || "0"],
      ["Pending Orders", reportData?.data?.stats?.pendingOrders || "0"],
      [],
      ["Customer Name", "Total Orders", "Order Value"],
      ...(reportData?.data?.customer_sales || []).map((c: any) => [
        c.customer_name,
        c.total_orders,
        c.total_order_value,
      ]),
      [],
      ["Product Name", "Total Sold", "Price"],
      ...(reportData?.data?.product_sales || []).map((p: any) => [
        p.product_name,
        p.total_sold,
        p.price,
      ]),
      [],
      ["Order ID", "Date", "Customer", "Amount", "Status"],
      ...(reportData?.data?.sales?.data || []).map((s: any) => [
        s["Order ID"],
        s["Date"],
        s["Customer Name"],
        s["Total Amount"],
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
    const fileName = `full-sales-report_${formattedStart}_to_${formattedEnd}.csv`;
    
    link.setAttribute("download", fileName);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    notifications.show({
      title: "Download Successful",
      message: "Full sales report CSV exported successfully!",
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
      <button
        onClick={handleBack}
        className="flex cursor-pointer gap-2 items-center"
      >
        <ChevronLeft />
        <Text fw={500} c="black">
          Back
        </Text>
      </button>
    );

    return [
      <div
        key="1"
        className="py-2.5 flex justify-between items-center flex-wrap gap-3"
      >
        <div className="flex gap-8 items-center">
          {backButton}
          {/* <div className="flex items-center">
            <Text>Reports</Text>
            <span className="mx-2">/</span>
            <Text c="black" fw={500}>
              Sales Report
            </Text>
          </div> */}
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
      <div key="2" className="flex justify-between">
        <Text fw={500} size="xl" c="black">
          Sales Report
        </Text>
        <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
          {formatDate(startDate)} – {formatDate(endDate)}
        </div>
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
            Showing Report For:
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


