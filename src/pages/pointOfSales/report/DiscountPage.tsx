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

const DiscountReportPage = () => {
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

    doc.text("Discount Report", 14, 10);
    doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);

    autoTable(doc, {
      startY: 25,
      head: [["Metric", "Value"]],
      body: [
        [
          "Total Discount Value",
          reportData?.data?.stats?.total_actual_discount_value || "0",
        ],
        ["Total Discounts", reportData?.data?.stats?.total_discounts || "0"],
        [
          "Redemption (Used Discount",
          reportData?.data?.stats?.total_redemptions || "0",
        ],
      ],
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          "Product Name",
          "Selling Price",
          "Total Discount Value",
          "Total Redemptions",
        ],
      ],
      body: Object.values(reportData?.data?.top_discounted_products || []).map(
        (c: any) => [
          c.product_name,
          c.selling_price,
          c.total_discount_value,
          c.total_redemptions,
        ]
      ),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [
        [
          "Discount name",
          "Percent Off",
          "Price Off",
          "Date From",
          "Date To",
          "Redemption",
          "Status",
        ],
      ],
      body: (reportData?.data?.discounts?.data || []).map((s: any) => [
        s["Discount name"],
        s["Percent Off"],
        s["Price Off"],
        formatDate(s["Date From"]),
        formatDate(s["Date To"]),
        s["Redemption"],
        s["Status"],
      ]),

      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    doc.save("full-discount-report.pdf");

    notifications.show({
      title: "Download Successful",
      message: "Full discount report PDF exported successfully!",
      color: "green",
    });
  };

  const exportFullCSV = () => {
    const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`; // handles quotes inside values too

    const rows = [
      ["Metric", "Value"],
      [
        "Total Discount Value",
        reportData?.data?.stats?.total_actual_discount_value || "0",
      ],
      ["Total Discounts", reportData?.data?.stats?.total_discounts || "0"],
      [
        "Redemption (Used Discount",
        reportData?.data?.stats?.total_redemptions || "0",
      ],
      [],

      [
        "Product Name",
        "Selling Price",
        "Total Discount Value",
        "Total Redemptions",
      ],
      ...Object.values(reportData?.data?.top_discounted_products || []).map(
        (c: any) => [
          c.product_name,
          c.selling_price,
          c.total_discount_value,
          c.total_redemptions,
        ]
      ),

      [
        "Discount name",
        "Percent Off",
        "Price Off",
        "Date From",
        "Date To",
        "Redemption",
        "Status",
      ],
      ...(reportData?.data?.discounts?.data || []).map((s: any) => [
        s["Discount Name"],
        s["Percent Off"],
        s["Price Off"],
        formatDate(s["Date From"]),
        formatDate(s["Date To"]),
        s["Redemption"],
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
    const fileName = `full-discount-report_${formattedStart}_to_${formattedEnd}.csv`;
    
    link.setAttribute("download", fileName);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    notifications.show({
      title: "Download Successful",
      message: "Full discount report CSV exported successfully!",
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
            Products Report
            </Text>
          </div> */}
        </div>
        <div className="flex items-center gap-3">
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
                   {formatDate(startDate)} – {formatDate(endDate)}
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
            Showing Report For:
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


// import { Text } from "@mantine/core";
// import { ChevronLeft } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PageContainer from "../../../layout/pageContainer";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { formatDate } from "../../../utils/helpers";
// import Dropdown from "../../../components/General/dropdown";
// import DiscountOverviewReport from "../../../components/dashboard/pointOfSales/reportsPages/discountOverview";
// import DiscountAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/DiscountManagement";
// import DiscountReportTable from "../../../components/dashboard/pointOfSales/reportsPages/DiscountReportTable";
// import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
// import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";

// const DiscountReportPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { startDate, endDate, locationId, reportData } = location.state || {};

//   const [reportInfo] = useState({
//     startDate,
//     endDate,
//     locationId,
//     reportData,
//   });

//   const exportOptions = [
//     { label: "CSV", value: "csv" },
//     { label: "PDF", value: "pdf" },
//   ];

//   const { data: storeData, isLoading: isLoadingStores } = useFetchStore();
//   const generateReport = useGenerateReport();
//   const selectedStore = storeData?.data?.stores?.data?.find(
//     (store: any) => store.locationID === locationId
//   );

//   const handleBack = () => {
//     navigate(-1);
//   };

//   const fetchAllDiscountPages = async () => {
//     let allDiscounts: any[] = [];
//     let page = 1;
//     let lastPage = 1;
  
//     do {
//       const payload = {
//         start_date: startDate,
//         end_date: endDate,
//         locationId,
//         report_type: "discounts",
//         paginate: true,
//         per_page: 50,
//         page,
//       };
  
//       const res: any = await generateReport.mutateAsync(payload);
//       const discountData = res?.data?.data?.discounts;
//       if (!discountData?.data) break;
  
//       allDiscounts = [...allDiscounts, ...discountData.data];
//       lastPage = discountData.last_page || 1;
//       page++;
//     } while (page <= lastPage);
  
//     return allDiscounts;
//   };
  
//   const exportFullPDF = async () => {
//     const allDiscounts = await fetchAllDiscountPages();
  
//     const doc = new jsPDF();
//     const orangeHeaderStyle = {
//       fillColor: [241, 103, 34] as [number, number, number],
//       textColor: [255, 255, 255] as [number, number, number],
//     };
  
//     doc.text("Discount Report", 14, 10);
//     doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);
  
//     autoTable(doc, {
//       startY: 25,
//       head: [["Metric", "Value"]],
//       body: [
//         ["Total Discount Value", reportData?.data?.stats?.total_actual_discount_value || "0"],
//         ["Total Discounts", reportData?.data?.stats?.total_discounts || "0"],
//         ["Redemption (Used Discount)", reportData?.data?.stats?.total_redemptions || "0"],
//       ],
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });
  
//     autoTable(doc, {
//       //@ts-ignore
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Discount name", "Percent Off", "Price Off", "Date From", "Date To", "Redemption", "Status"]],
//       body: allDiscounts.map((s) => [
//         s["Discount name"],
//         s["Percent Off"],
//         s["Price Off"],
//         formatDate(s["Date From"]),
//         formatDate(s["Date To"]),
//         s["Redemption"],
//         s["Status"],
//       ]),
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });
  
//     doc.save("full-discount-report.pdf");
  
//     notifications.show({
//       title: "Download Successful",
//       message: "Full discount report PDF exported successfully!",
//       color: "green",
//     });
//   };
  
//   const exportFullCSV = async () => {
//     const allDiscounts = await fetchAllDiscountPages();
  
//     const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`;
  
//     const rows = [
//       ["Metric", "Value"],
//       ["Total Discount Value", reportData?.data?.stats?.total_actual_discount_value || "0"],
//       ["Total Discounts", reportData?.data?.stats?.total_discounts || "0"],
//       ["Redemption (Used Discount)", reportData?.data?.stats?.total_redemptions || "0"],
//       [],
//       ["Discount name", "Percent Off", "Price Off", "Date From", "Date To", "Redemption", "Status"],
//       ...allDiscounts.map((s) => [
//         s["Discount name"],
//         s["Percent Off"],
//         s["Price Off"],
//         formatDate(s["Date From"]),
//         formatDate(s["Date To"]),
//         s["Redemption"],
//         s["Status"],
//       ]),
//     ];
  
//     const csvContent = rows.map((r) => r.map(escapeValue).join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `full-discount-report_${formatDate(startDate)}_to_${formatDate(endDate)}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);
  
//     notifications.show({
//       title: "Download Successful",
//       message: "Full discount report CSV exported successfully!",
//       color: "green",
//     });
//   };
  
//   const handleExport = (val: "csv" | "pdf") => {
//     if (val === "pdf") {
//       exportFullPDF();
//     } else {
//       exportFullCSV();
//     }
//   };

//   const getSubHeaders = () => {
//     const backButton = (
//       <button
//         onClick={handleBack}
//         className="flex cursor-pointer gap-2 items-center"
//       >
//         <ChevronLeft />
//         <Text fw={500} c="black">
//           Back
//         </Text>
//       </button>
//     );

//     return [
//       <div
//         key="1"
//         className="py-2.5 flex justify-between items-center flex-wrap gap-3"
//       >
//         <div className="flex gap-8 items-center">
//           {backButton}
         
//         </div>
//         <div className="flex items-center gap-3">
//           <Dropdown
//             //@ts-ignore
//             options={exportOptions}
//             //@ts-ignore
//             onChange={(val) => handleExport(val)}
//             placeholder="Export"
//             inputSizeClass="py-1"
//             bgColorClass="bg-[#F16722]"
//             textColorClass="text-white"
//           />
//         </div>
//       </div>,
//       <div key="2" className="flex justify-between">
//         <Text fw={500} size="xl" c="black">
//           Discount Report
//         </Text>
//         <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
//           {formatDate(startDate)} – {formatDate(endDate)}
//         </div>
//       </div>,
//     ];
//   };

//   return (
//     <PageContainer subHeaders={getSubHeaders()}>
//       <div className=" rounded-lg px-4 py-2 mb-2">
//         {isLoadingStores ? (
//           <Text>Loading store info...</Text>
//         ) : (
//           <Text>
//             Showing Report For:
//             <span className="font-semibold text-lg">
//               {selectedStore?.name || "All Stores"}
//             </span>
//           </Text>
//         )}
//       </div>
//       <DiscountOverviewReport reportInfo={reportInfo} />
//       <DiscountAnalysis reportInfo={reportInfo} />
//       <DiscountReportTable reportInfo={reportInfo} />
//     </PageContainer>
//   );
// };

// export default DiscountReportPage;
