import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useGenerateReportExport } from "../../../../hooks/backendApis/pos/reports";
import { useEffect, useState } from "react";
import { shortenTransactionId, truncateText } from "../../../../utils/helpers";
import Dropdown from "../../../General/dropdown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { notifications } from "@mantine/notifications";

type ReturnsReportProps = {
  reportData: any;
  startDate: string;
  endDate: string;
};

const ReturnsRefundsReport = ({
  reportData,
  startDate,
  endDate,
}: ReturnsReportProps) => {
  const [data, setData] = useState<TableRowData[]>([]);
  const { mutateAsync: exportReport } = useGenerateReportExport();

  function formatDate(dateStr: string | Date | undefined) {
    if (!dateStr) return "";
    const date = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
    if (isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-GB");
  }

  useEffect(() => {
    if (Array.isArray(reportData?.data)) {
      const formattedData = reportData.data.map((item: any) => ({
        fullOrderId: item["Order ID"],
        id: shortenTransactionId(item["Order ID"]),
        productId: shortenTransactionId(item["Product ID"]),
        items: 1,
        dateReturned: item["Date Returned"],
        customer: item["Customer Name"],
        product: item["Product name"],
        returnedReason: item["Reason"],
        imageUrl: item["Image"],
        complaintStatus:
          item["Status"] === "Approved"
            ? "Resolved"
            : item["Status"] === "Pending"
            ? "Pending"
            : "Declined",
      }));
      setData(formattedData);
    } else {
    }
  }, [reportData]);

  const exportOptions = [
    { label: "CSV", value: "csv" },
    { label: "PDF", value: "pdf" },
  ];

  const [exportFormat, setExportFormat] = useState<"csv" | "pdf" | null>(null);

  const generateReturnsPdf = (
    data: TableRowData[],
    startDate: string,
    endDate: string
  ) => {
    const doc = new jsPDF();

    doc.text("Returns Report", 14, 20);
    doc.text(`From: ${startDate} To: ${endDate}`, 14, 28);

    // Define columns for the PDF table (exclude imageUrl)
    const columns = [
      { header: "Order ID", dataKey: "id" },
      { header: "Product ID", dataKey: "productId" },
      { header: "Product", dataKey: "product" },
      { header: "Date Returned", dataKey: "dateReturned" },
      { header: "Customer", dataKey: "customer" },
      { header: "Returned Reason", dataKey: "returnedReason" },
      { header: "Complaint Status", dataKey: "complaintStatus" },
    ];

    // Prepare rows — make sure no imageUrl is included
    const rows = data.map((item) => ({
      id: item.id,
      productId: item.productId,
      product: item.product,
      dateReturned: item.dateReturned,
      customer: item.customer,
      returnedReason: item.returnedReason,
      complaintStatus: item.complaintStatus,
    }));

    autoTable(doc, {
      startY: 35,
      head: [columns.map((col) => col.header)],
      //@ts-ignore
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
      styles: { fontSize: 8 },
      headStyles: { fillColor: "#F16722" },
    });

    doc.save(`returns-report_${startDate}_to_${endDate}.pdf`);
  };


  const handleExport = async (format: "csv" | "pdf") => {
    if (format === "pdf") {
      try {
        generateReturnsPdf(data, startDate, endDate);
        notifications.show({
          title: "Download Successful",
          message: "Returns report exported as PDF.",
          color: "green",
        });
      } catch (err) {
        notifications.show({
          title: "Export Failed",
          message: "An error occurred while exporting PDF.",
          color: "red",
        });
      }
      return;
    }
  
    const exportPayload = {
      start_date: startDate || "",
      end_date: endDate || "",
      report_type: "returns",
      export_format: format,
      export: true,
    };
  
    try {
      const blob = await exportReport(exportPayload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `returns-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
  
      notifications.show({
        title: "Download Successful",
        message: `Returns report exported as ${format.toUpperCase()}.`,
        color: "green",
      });
    } catch (error) {
      console.error("Failed to export report:", error);
      notifications.show({
        title: "Export Failed",
        message: `Could not export report as ${format.toUpperCase()}.`,
        color: "red",
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
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
            //@ts-ignore
            src={row.original.imageUrl ?? undefined}
            alt={row.original.name as string}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black" title={String(row.original.product ?? "")}>
              {truncateText(String(row.original.product ?? ""))}
            </Text>

            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">{row.original.productId}</span>
            </Text>
          </div>
        </div>
      ),
    },

    {
      header: "Date Returned",
      accessorKey: "dateReturned",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.dateReturned}</Text>
      ),
    },
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.id}
          </Text>
        </div>
      ),
    },

    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.customer}
        </span>
      ),
    },
    {
      header: "Returned Reason",
      accessorKey: "returnedReason",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.returnedReason}
        </span>
      ),
    },
    {
      header: "Complaint Status",
      accessorKey: "complaintStatus",
      cell: ({ row }) => {
        const status = row.original.complaintStatus;
        let bgClass = "";
        let textClass = "";
        let icon = null;

        if (status === "Resolved") {
          bgClass = "bg-[#ECFDF3]";
          textClass = "text-[#027A48]";
          icon = <PaidDot />;
        } else if (status === "Pending") {
          bgClass = "bg-[#E0F2FE]";
          textClass = "text-[#0369A1]";
          icon = <UnpaidDot />;
        } else {
          // Declined
          bgClass = "bg-[#FFFAEB]";
          textClass = "text-[#B54708]";
          icon = <UnpaidDot />;
        }

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgClass} ${textClass}`}
          >
            {icon}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
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
                Logged Returns
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{data.length}</Text>
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

export default ReturnsRefundsReport;
