import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { useLocation,} from "react-router";
import { useEffect, useState } from "react";
import { shortenTransactionId } from "../../../../utils/helpers";
import { useGenerateReportExport } from "../../../../hooks/backendApis/pos/reports";
import Dropdown from "../../../General/dropdown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { notifications } from "@mantine/notifications";


const SalesProcessingReport = () => {
  const location = useLocation();
  const { reportData, startDate, endDate } = location.state || {};
  const [data, setData] = useState<TableRowData[]>([]);
  const { mutateAsync: exportReport,  } =
    useGenerateReportExport();

  function formatDate(dateStr: string | Date | undefined) {
    if (!dateStr) return "";
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB");
  }

  useEffect(() => {
    if (Array.isArray(reportData?.data)) {
      const formattedData = reportData.data.map((item: any) => ({
        fullId: item["Order ID"],
        id: shortenTransactionId(item["Order ID"]),
        items: 1,
        timeStamp: item["Date"],
        customer: item["Customer Name"],
        Amount: item["Total Amount"],
        paymentStatus: item["Status"] === "Completed" ? "Completed" : "Draft",
      }));
      setData(formattedData);
    } else {
    }
  }, [reportData]);

  // const handleViewClick = (fullId: string, paymentStatus: string) => {
  //   console.log("Navigating to:", fullId, paymentStatus);

  //   if (paymentStatus === "Completed") {
  //     navigate(ROUTES.viewOrder, { state: { orderID: fullId } });
  //   } else if (paymentStatus === "Draft") {
  //     navigate(ROUTES.viewOrderdraft, { state: { orderID: fullId } });
  //   } else {
  //     console.warn("Unhandled order status:", paymentStatus);
  //   }
  // };

  const exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
  ];

  function shortenText(text: string, maxLength = 10) {
    if (!text) return "";
    return text.length > maxLength ? text.slice(0, maxLength - 3) + "..." : text;
  }
  

const exportToPDF = (data: TableRowData[], startDate: string, endDate: string) => {
  const doc = new jsPDF();

  doc.text("Sales Processing Report", 14, 10);
  doc.text(`Date: ${startDate} - ${endDate}`, 14, 18);

  autoTable(doc, {
    startY: 25,
    head: [["Order ID", "Time Stamp", "Customer", "Total Amount", "Status"]],
    //@ts-ignore
    body: data.map((row) => [
        //@ts-ignore
      shortenText(row.id, 12),   
      row.timeStamp,
      row.customer,
      row.Amount,
      row.paymentStatus,
    ]),
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [241, 103, 34],
      textColor: [255, 255, 255],
    },
    theme: "grid",
    margin: { top: 25 },
  });

  doc.save("sales-report.pdf");
};


  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | null>(null);
  
  const handleExport = async (format: 'csv' | 'pdf') => {
    if (format === 'pdf') {
      exportToPDF(data, formatDate(startDate), formatDate(endDate));
      notifications.show({
        title: 'Download Successful',
        message: 'PDF report exported successfully!',
        color: 'green',
      });
      return;
    }
  
    const exportPayload = {
      start_date: startDate || '',
      end_date: endDate || '',
      report_type: 'sales',
      export_format: format,
    };
  
    try {
      const blob = await exportReport(exportPayload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `sales-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
  
      notifications.show({
        title: 'Download Successful',
        message: `${format.toUpperCase()} report exported successfully!`,
        color: 'green',
      });
    } catch (error) {
      console.error('Failed to export report:', error);
      notifications.show({
        title: 'Export Failed',
        message: 'There was an error exporting the report. Please try again.',
        color: 'red',
      });
    }
  };
  
  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
          {/* <Text fw={500}>
            Total Items:
            <span className="ml-1 text-black">{props.row.original.items}</span>
          </Text> */}
        </div>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.timeStamp}</Text>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.customer}</Text>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "Amount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.Amount}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "paymentStatus",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Completed"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FEF3F2] text-[#B42318]"
            }`}
          >
            {status === "Completed" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    // {
    //   header: "",
    //   accessorKey: "action",
    //   cell: (props) => {
    //     const { fullId, paymentStatus } = props.row.original;

    //     console.log("Rendering action cell with:", { fullId, paymentStatus }); // log on render

    //     return (
    //       <Text
    //         fw={700}
    //         c="customPrimary.10"
    //         className="cursor-pointer"
    //         onClick={() => {
    //           console.log("Clicked View Order with:", {
    //             fullId,
    //             paymentStatus,
    //           }); // log on click
    //           if (typeof fullId === "string") {
    //             // @ts-ignore
    //             handleViewClick(fullId, paymentStatus);
    //           } else {
    //             console.warn("Invalid ID for navigation:", fullId);
    //           }
    //         }}
    //       >
    //         View Order
    //       </Text>
    //     );
    //   },
    // },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={data}
        showSearch={false}
        showSortFilter={false}
        length={8}
        tableTitle={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Sales Processing
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10" size="sm">
                  {reportData.length}
                </Text>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="border border-[#E0E0E0] rounded-lg px-4 py-2 flex items-center text-sm text-[#344054] min-w-[230px]">
                {formatDate(startDate)} – {formatDate(endDate)}
              </div>

              <Dropdown
                //@ts-ignore
                options={exportOptions}
                value={exportFormat}
                onChange={(val) => {
                  setExportFormat(val as "csv" | "pdf");
                  handleExport(val as "csv" | "pdf");
                }}
                placeholder="Export"
                inputSizeClass="py-1"
                bgColorClass="bg-[#F16722]"
                textColorClass="text-white"
                required={false}
              />
            </div>
          </div>
        }
      />
    </main>
  );
};

export default SalesProcessingReport;
