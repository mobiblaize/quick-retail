import { Text } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ProductManagementReport from "../../../components/dashboard/pointOfSales/reportsPages/productManagementReport";
import { useEffect, useState } from "react";
import ProductOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/productOverview";
import ProductCustomerAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/productCustomerAnalysis";
import { notifications } from "@mantine/notifications";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate } from "../../../utils/helpers";
import Dropdown from "../../../components/General/dropdown";


const ProductReportPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
  const { startDate, endDate, locationId, reportData } = location.state || {};

  const [reportInfo, setReportInfo] = useState({
    startDate,
    endDate,
    locationId,
    reportData,
  });



  const exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
  ];


     const handleBack = () => {
       navigate(-2);
     };

     const exportFullPDF = () => {
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
          ["Active Products", reportData?.data?.stats?. active_products || "0"],
          ["Inactive Products", reportData?.data?.stats?.inactive_products || "0"],
        ],
        theme: "grid",
        headStyles: orangeHeaderStyle,
      });
  
      autoTable(doc, {
        //@ts-ignore
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Category Name", "Total Quantity Sold", "Total Revenue"]],
        body: (reportData?.data?.customer_sales || []).map((c: any) => [
          c. category_name,
          c. total_quantity_sold,
          c. total_revenue,
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
        head: [["Product Name", "SKU", "Location", "Category", "Selling price", "Stock", "Status"]],
        body: (reportData?.data?.products?.data || []).map((s: any) => [
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
  
    const exportFullCSV = () => {
      const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`; // handles quotes inside values too
  
      const rows = [
        ["Metric", "Value"],
        ["Total Product Value", reportData?.data?.stats?.total_revenue || "0"],
        ["Active Products", reportData?.data?.stats?. active_products || "0"],
        ["Inactive Products", reportData?.data?.stats?.inactive_products || "0"],
        [],

 ["Category Name", "Total Quantity Sold", "Total Revenue"],
 ...(reportData?.data?.customer_sales || []).map((c: any) => [
          c. category_name,
          c. total_quantity_sold,
          c. total_revenue,
        ]),
        [],
        ["Product Name", "Total Sold", "Price"],
        ...(reportData?.data?.product_sales || []).map((p: any) => [
          p.product_name,
          p.total_sold,
          p.price,
        ]),
        [],

    ["Product Name", "SKU", "Location", "Category", "Selling price", "Stock", "Status"],
... (reportData?.data?.products?.data || []).map((s: any) => [
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
      link.setAttribute("download", "full-product-report.csv");
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
          <div className="flex items-center">
            <Text>Reports</Text>
            <span className="mx-2">/</span>
            <Text c="black" fw={500}>
            Products Report
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
      <div key="2" className="flex justify-between">
        <Text fw={500} size="xl" c="black">
   Product Report
        </Text>
        <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
          {formatDate(startDate)} – {formatDate(endDate)}
        </div>
      </div>,
    ];
  };
 
   
     return (
       <PageContainer
         subHeaders={getSubHeaders()}
       >
            <ProductOverviewReport reportInfo={reportInfo} />
            <ProductCustomerAnalysis reportInfo={reportInfo} />
         <ProductManagementReport reportInfo={reportInfo}/>
       </PageContainer>
     );
   };

export default ProductReportPage