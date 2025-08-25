// import { Text } from "@mantine/core";
// import { ChevronLeft } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import PageContainer from "../../../layout/pageContainer";
// import ReturnsRefundsReport from "../../../components/dashboard/pointOfSales/reportsPages/returnsRefundsReport";
// import ReturnsReportAnalytics from "../../../components/dashboard/pointOfSales/reportsPages/returnsReportAnlytics";
// import { useState } from "react";
// import RefundAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/returnsAnalysis";
// import { notifications } from "@mantine/notifications";
// import Dropdown from "../../../components/General/dropdown";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";
// import { formatDate, truncateText } from "../../../utils/helpers";
// import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";




// const RetunsRefundsReportPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { startDate, endDate, locationId, reportData } = location.state || {};

//     const [reportInfo, ] = useState({
//       startDate,
//       endDate,
//       locationId,
//       reportData,
//     });



//     const exportOptions = [
//       { label: "CSV", value: "csv" },
//       { label: "PDF", value: "pdf" },
//     ];

//     const { data: storeData, isLoading: isLoadingStores } = useFetchStore();
//     const selectedStore = storeData?.data?.stores?.data?.find(
//       (store: any) => store.locationID === locationId
//     );

//      const handleBack = () => {
//        navigate(-1);
//      };


//   const exportFullPDF = () => {
//     const doc = new jsPDF();
//     const orangeHeaderStyle = {
//       fillColor: [241, 103, 34] as [number, number, number],
//       textColor: [255, 255, 255] as [number, number, number],
//     };

//     doc.text("Return&Refund Report", 14, 10);
//     doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);

//     const refundVal = Number(reportData?.data?.stats?.total_refund_value || 0);
//     const pendingVal = Number(reportData?.data?.stats?.total_pending_complaints || 0);
//     const resolvedVal = Number(reportData?.data?.stats?.total_resolved_complaints || 0);
//     const declinedVal = Number(reportData?.data?.stats?.total_declined_complaints || 0);
//     const totalComplaints = pendingVal + resolvedVal + declinedVal;

//     const getPercent = (val: number) =>
//       totalComplaints > 0 ? `${((val / totalComplaints) * 100).toFixed(1)}%` : "0%";

//     autoTable(doc, {
//       startY: 25,
//       head: [["Metric", "Value (Count)", "Percentage"]],
//       body: [
//         ["Total Returned Value", refundVal.toLocaleString(), "-"],
//         ["Pending Complaints", pendingVal.toString(), getPercent(pendingVal)],
//         ["Resolved Complaints", resolvedVal.toString(), getPercent(resolvedVal)],
//         ["Complaints Declined", declinedVal.toString(), getPercent(declinedVal)],
//       ],
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });

//     autoTable(doc, {
//       //@ts-ignore
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Product Name", "Product Price", "Return Count"]],
//       body: (reportData?.data?.product_returns || []).map((c: any) => [
//         c.product_name,
//         c.product_price,
//         c.return_count,
//       ]),
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });

//     autoTable(doc, {
//       //@ts-ignore
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Approved", "Store", "Total Refunded"]],
//       body: (reportData?.data?.location_status || []).map((p: any) => [
//         p.approved,
//         p.location_name,
//         p.total_refunded,
//       ]),
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });

//     autoTable(doc, {
//       //@ts-ignore
//       startY: doc.lastAutoTable.finalY + 10,
//       head: [["Order ID", "Product ID", "Date Returned", "Customer Name", "Product name", "Reason", "Status"]],
//       body: (reportData?.data?.returns?.data || []).map((s: any) => [
//         truncateText(s["Order ID"], 6),
//         s["Product ID"],
//         s["Date Returned"],
//         s["Customer Name"],
//         s["Product name"],
//         s["Reason"],
//         s["Status"],
//       ]),
//       theme: "grid",
//       headStyles: orangeHeaderStyle,
//     });

//     doc.save("full-returns-report.pdf");

//     notifications.show({
//       title: "Download Successful",
//       message: "Full Returns report PDF exported successfully!",
//       color: "green",
//     });
//   };

//   const exportFullCSV = () => {
//     const escapeValue = (val: any) => `"${String(val).replace(/"/g, '""')}"`;

//     const refundVal = Number(reportData?.data?.stats?.total_refund_value || 0);
//     const pendingVal = Number(reportData?.data?.stats?.total_pending_complaints || 0);
//     const resolvedVal = Number(reportData?.data?.stats?.total_resolved_complaints || 0);
//     const declinedVal = Number(reportData?.data?.stats?.total_declined_complaints || 0);
//     const totalComplaints = pendingVal + resolvedVal + declinedVal;

//     const getPercent = (val: number) =>
//       totalComplaints > 0 ? `${((val / totalComplaints) * 100).toFixed(1)}%` : "0%";

//     const rows = [
//       ["Metric", "Value (Count)", "Percentage"],
//       ["Total Returned Value", refundVal.toLocaleString(), "-"],
//       ["Pending Complaints", pendingVal.toString(), getPercent(pendingVal)],
//       ["Resolved Complaints", resolvedVal.toString(), getPercent(resolvedVal)],
//       ["Complaints Declined", declinedVal.toString(), getPercent(declinedVal)],
//       [],
//       ["Product Name", "Product Price", "Return Count"],
//       ...(reportData?.data?.product_returns || []).map((c: any) => [
//         c.product_name,
//         c.product_price,
//         c.return_count,
//       ]),
//       [],
//       ["Approved", "Store", "Total Refunded"],
//       ...(reportData?.data?.location_status || []).map((p: any) => [
//         p.approved,
//         p.location_name,
//         p.total_refunded,
//       ]),
//       [],
//       ["Order ID", "Product ID", "Date Returned", "Customer Name", "Product Name", "Reason", "Status"],
//       ...(reportData?.data?.returns?.data || []).map((s: any) => [
//         s["Order ID"],
//         s["Product ID"],
//         s["Date Returned"],
//         s["Customer Name"],
//         s["Product name"],
//         s["Reason"],
//         s["Status"],
//       ]),
//     ]
//     const csvContent = rows.map((r) => r.map(escapeValue).join(",")).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     const formattedStart = formatDate(startDate).replace(/\s+/g, "_");
// const formattedEnd = formatDate(endDate).replace(/\s+/g, "_");
// const fileName = `full-returns-report_${formattedStart}_to_${formattedEnd}.csv`;

// link.setAttribute("download", fileName);

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     window.URL.revokeObjectURL(url);

//     notifications.show({
//       title: "Download Successful",
//       message: "Full sales report CSV exported successfully!",
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


//      const getSubHeaders = () => {
//        const backButton = (
//          <button
//            onClick={handleBack}
//            className="flex cursor-pointer gap-2 items-center"
//          >
//            <ChevronLeft />
//            <Text fw={500} c="black">
//              Back
//            </Text>
//          </button>
//        );

//        const subHeaders = [
//          <div key="1"   className="py-2.5 flex justify-between items-center flex-wrap gap-3">
//            <div className="flex gap-8 items-center">
//              {backButton}
//              {/* <div className="flex items-center">
//                <Text>Reports</Text>
//                  <>
//                    <span className="mx-2">/</span>
//                    <Text c="black" fw={500}>
//                       Returns and refunds
//                    </Text>
//                  </>
//              </div> */}
//            </div>
//            <div className="flex items-center gap-3">
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
//          </div>,
//          <div key="2">
//            <Text fw={500} size="xl" c="black">
//              Reports: Returns and Refunds
//            </Text>
//          </div>,
//        ];

//        return subHeaders;
//      };



//      return (
//       <PageContainer subHeaders={getSubHeaders()}>
//           <div className=" rounded-lg px-4 py-2 mb-2">
//     {isLoadingStores ? (
//       <Text>Loading store info...</Text>
//     ) : (
//       <Text>
// Showing Report For: 
//         <span className="font-semibold text-lg">
//           {selectedStore?.name || "All Stores"}
//         </span>
//       </Text>
//     )}
//   </div>
//       <ReturnsReportAnalytics
//       reportInfo={reportInfo} 
//       />
//       <RefundAnalysis   reportInfo={reportInfo} />
//       <ReturnsRefundsReport
//  reportInfo={reportInfo} 
//       />
//     </PageContainer>

//      );
//    };

// export default RetunsRefundsReportPage


import { Button, Menu, Text } from "@mantine/core";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContainer from "../../../layout/pageContainer";
import ReturnsRefundsReport from "../../../components/dashboard/pointOfSales/reportsPages/returnsRefundsReport";
import ReturnsReportAnalytics from "../../../components/dashboard/pointOfSales/reportsPages/returnsReportAnlytics";
import { useState } from "react";
import RefundAnalysis from "../../../components/dashboard/pointOfSales/reportsPages/returnsAnalysis";
import { notifications } from "@mantine/notifications";
// import Dropdown from "../../../components/General/dropdown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatDate, truncateText2 } from "../../../utils/helpers";
import { useFetchStore } from "../../../hooks/backendApis/pos/storeManagement";
import { useGenerateReport } from "../../../hooks/backendApis/pos/reports";




const RetunsRefundsReportPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { startDate, endDate, locationId, reportData } = location.state || {};

  const [reportInfo,] = useState({
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

  // Keep your helper function
  const fetchAllReturnsPages = async () => {
    let allReturns: any[] = [];
    let page = 1;
    let lastPage = 1;

    do {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        locationId,
        report_type: "returns",
        paginate: true,
        per_page: 10,
        page,
      };

      const res: any = await generateReport.mutateAsync(payload);
      const returnsData = res?.data?.data?.returns;
      if (!returnsData?.data) break;

      allReturns = [...allReturns, ...returnsData.data];
      lastPage = returnsData.last_page || 1;
      page++;
    } while (page <= lastPage);

    return allReturns;
  };

  // ✅ make async
  const exportFullPDF = async () => {
    const allReturns = await fetchAllReturnsPages();

    const doc = new jsPDF();
    const orangeHeaderStyle = {
      fillColor: [241, 103, 34] as [number, number, number],
      textColor: [255, 255, 255] as [number, number, number],
    };

    doc.text("Return & Refund Report", 14, 10);
    doc.text(`Date: ${formatDate(startDate)} - ${formatDate(endDate)}`, 14, 18);

    const refundVal = Number(reportData?.data?.stats?.total_refund_value || 0);
    const pendingVal = Number(reportData?.data?.stats?.total_pending_complaints || 0);
    const resolvedVal = Number(reportData?.data?.stats?.total_resolved_complaints || 0);
    const declinedVal = Number(reportData?.data?.stats?.total_declined_complaints || 0);
    const totalComplaints = pendingVal + resolvedVal + declinedVal;

    const getPercent = (val: number) =>
      totalComplaints > 0 ? `${((val / totalComplaints) * 100).toFixed(1)}%` : "0%";

    autoTable(doc, {
      startY: 25,
      head: [["Metric", "Value (Count)", "Percentage"]],
      body: [
        ["Total Returned Value", refundVal.toLocaleString(), "-"],
        ["Pending Complaints", pendingVal.toString(), getPercent(pendingVal)],
        ["Resolved Complaints", resolvedVal.toString(), getPercent(resolvedVal)],
        ["Complaints Declined", declinedVal.toString(), getPercent(declinedVal)],
      ],
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Product Name", "Product Price", "Return Count"]],
      body: (reportData?.data?.product_returns || []).map((c: any) => [
        c.product_name,
        c.product_price,
        c.return_count,
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Approved", "Store", "Total Refunded"]],
      body: (reportData?.data?.location_status || []).map((p: any) => [
        p.approved,
        p.location_name,
        p.total_refunded,
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    autoTable(doc, {
      //@ts-ignore
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Order ID", "Product ID", "Date Returned", "Customer Name", "Product Name", "Reason", "Status"]],
      body: allReturns.map((s: any) => [
        truncateText2(s["Order ID"], 6),
        s["Product ID"],
        s["Date Returned"],
        s["Customer Name"],
        s["Product name"],
        s["Reason"],
        s["Status"],
      ]),
      theme: "grid",
      headStyles: orangeHeaderStyle,
    });

    doc.save("full-returns-report.pdf");

    notifications.show({
      title: "Download Successful",
      message: "Full Returns report PDF exported successfully!",
      color: "green",
    });
  };

  // ✅ make async
  const exportFullCSV = async () => {
    const allReturns = await fetchAllReturnsPages();
  
    const safe = (val: any) =>
      val !== null && val !== undefined
        ? `"${String(val).replace(/"/g, '""')}"`
        : '""';
  
    const refundVal = Number(reportData?.data?.stats?.total_refund_value || 0);
    const pendingVal = Number(reportData?.data?.stats?.total_pending_complaints || 0);
    const resolvedVal = Number(reportData?.data?.stats?.total_resolved_complaints || 0);
    const declinedVal = Number(reportData?.data?.stats?.total_declined_complaints || 0);
    const totalComplaints = pendingVal + resolvedVal + declinedVal;
  
    const getPercent = (val: number) =>
      totalComplaints > 0 ? `${((val / totalComplaints) * 100).toFixed(1)}%` : "0%";
  
    const rows: any[] = [
      ["Metric", "Value (Count)", "Percentage"],
      ["Total Returned Value", refundVal.toLocaleString(), "-"],
      ["Pending Complaints", pendingVal, getPercent(pendingVal)],
      ["Resolved Complaints", resolvedVal, getPercent(resolvedVal)],
      ["Complaints Declined", declinedVal, getPercent(declinedVal)],
      [],
      ["Product Name", "Product Price", "Return Count"],
      ...(reportData?.data?.product_returns || []).map((c: any) => [
        c.product_name,
        c.product_price,
        c.return_count,
      ]),
      [],
      ["Approved", "Store", "Total Refunded"],
      ...(reportData?.data?.location_status || []).map((p: any) => [
        p.approved,
        p.location_name,
        p.total_refunded,
      ]),
      [],
      ["Order ID", "Product ID", "Date Returned", "Customer Name", "Product Name", "Reason", "Status"],
      ...allReturns.map((s: any) => [
        s.order_id,
        s.product_id,
        s.date_returned,
        s.customer_name,
        s.product_name,
        s.reason,
        s.status,
      ]),
    ];
  
    const csvContent = rows.map((r) => r.map(safe).join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
  
    const formattedStart = formatDate(startDate).replace(/[^a-zA-Z0-9]/g, "_");
    const formattedEnd = formatDate(endDate).replace(/[^a-zA-Z0-9]/g, "_");
    link.setAttribute(
      "download",
      `full-returns-report_${formattedStart}_to_${formattedEnd}.csv`
    );
  
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  
    notifications.show({
      title: "Download Successful",
      message: "Full Returns report CSV exported successfully!",
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

    const subHeaders = [
      <div key="1" className="py-2.5 flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-8 items-center">
          {backButton}
          {/* <div className="flex items-center">
               <Text>Reports</Text>
                 <>
                   <span className="mx-2">/</span>
                   <Text c="black" fw={500}>
                      Returns and refunds
                   </Text>
                 </>
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
      <div key="2">
        <Text fw={500} size="xl" c="black">
          Reports: Returns and Refunds
        </Text>
      </div>,
    ];

    return subHeaders;
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
      <ReturnsReportAnalytics
        reportInfo={reportInfo}
      />
      <RefundAnalysis reportInfo={reportInfo} />
      <ReturnsRefundsReport
        reportInfo={reportInfo}
      />
    </PageContainer>

  );
};

export default RetunsRefundsReportPage