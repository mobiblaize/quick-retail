import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useGenerateReportExport } from "../../../../hooks/backendApis/pos/reports";
import { useEffect, useState } from "react";
import { shortenTransactionId } from "../../../../utils/helpers";

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
  const { mutateAsync: exportReport, isPending: isExporting } =
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

  const handleExport = async () => {
    const exportPayload = {
      start_date: startDate || "",
      end_date: endDate || "",
      report_type: "returns",
      export_format: "csv",
    };

    try {
      const blob = await exportReport(exportPayload);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `sales-report.${exportPayload.export_format}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
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
            <Text fw={500} c="black">
              {row.original.product}
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
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewReturns}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={data}
        showSearch={false}
        showSortFilter={false}
        length={5}
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
              <button
                onClick={handleExport}
                disabled={isExporting}
                className={`bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-4 py-2 rounded-md font-medium text-sm ${
                  isExporting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isExporting ? "Exporting..." : "Export"}
              </button>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ReturnsRefundsReport;
