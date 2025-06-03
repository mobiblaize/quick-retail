import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useLocation } from "react-router";
import { useGenerateReportExport } from "../../../../hooks/backendApis/pos/reports";
import { useEffect, useState } from "react";
import Dropdown from "../../../General/dropdown";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { notifications } from "@mantine/notifications";

const ProductManagementReport = () => {
  const location = useLocation();
  const { reportData, startDate, endDate } = location.state || {};
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
        category: item["Category"],
        productCode: item["SKU"],
        product: item["Product Name"],
        stockLevel: item["Stock"],
        Amount: item["Price"],
        location: item["Location"],
        discountStatus: item["Status"] === "Active" ? "Active" : "Inactive",
        imageUrl: item["Image"],
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

  const generateProductsPdf = (
    data: TableRowData[],
    startDate: string | undefined,
    endDate: string | undefined
  ) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Product Management Report", 14, 20);

    doc.setFontSize(11);
    doc.text(`From: ${startDate || ""} To: ${endDate || ""}`, 14, 28);

    const columns = [
      { header: "Name", dataKey: "product" },
      { header: "Product Code", dataKey: "productCode" },
      { header: "Location", dataKey: "location" },
      { header: "Category", dataKey: "category" },
      { header: "Selling Price", dataKey: "Amount" },
      { header: "Stock Level", dataKey: "stockLevel" },
      { header: "Discount Status", dataKey: "discountStatus" },
    ];

    // Prepare rows
    const rows = data.map((item) => ({
      product: item.product,
      productCode: item.productCode,
      location: item.location,
      category: item.category,
      Amount: item.Amount,
      stockLevel: item.stockLevel,
      discountStatus: item.discountStatus,
    }));

    autoTable(doc, {
      startY: 35,
      head: [columns.map((col) => col.header)],
      //@ts-ignore
      body: rows.map((row) => columns.map((col) => row[col.dataKey])),
      styles: { fontSize: 8 },
      headStyles: { fillColor: "#F16722" },
    });

    doc.save(
      `product-report_${startDate || "start"}_to_${endDate || "end"}.pdf`
    );
  };

  const handleExport = async (format: "csv" | "pdf") => {
    if (format === "pdf") {
      generateProductsPdf(data, startDate, endDate);
      notifications.show({
        title: "Download Successful",
        message: "Product report exported as PDF.",
        color: "green",
      });
      return;
    }
  
    const exportPayload = {
      start_date: startDate || "",
      end_date: endDate || "",
      report_type: "products",
      export: true,
      export_format: format,
    };
  
    try {
      const blob = await exportReport(exportPayload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `product-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
  
      notifications.show({
        title: "Download Successful",
        message: `Product report exported as ${format.toUpperCase()}.`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Export Failed",
        message: "There was an error exporting the report.",
        color: "red",
      });
      console.error("Failed to export report:", error);
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
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            //@ts-ignore
            src={props.row.original.imageUrl ?? undefined}
            alt={props.row.original.product as string}
            radius="md"
            size={40}
          />

          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.product}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Product Code",
      accessorKey: "productCode",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.productCode}</Text>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.location}</Text>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.category}
        </span>
      ),
    },
    {
      header: "Selling Price",
      accessorKey: "Amount",
      cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.Amount}
        </span>
      ),
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      cell: (props) => (
        <span className="font-medium text-center">
          {props.row.original.stockLevel}
        </span>
      ),
    },
    {
      header: "Discount Status",
      accessorKey: "discountStatus",
      cell: (props) => {
        const status = props.row.original.discountStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Active" ? <PaidDot /> : <UnpaidDot />}
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
                Products
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

export default ProductManagementReport;
