import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { useEffect, useMemo, useState } from "react";
import { formatDate, shortenTransactionId } from "../../../../utils/helpers";
import { TableRowData } from "../../../../types";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";

const SalesProcessingReport = ({ reportInfo }: { reportInfo: any }) => {
  const {
    reportData,
    startDate,
    endDate,
    locationId,
    reportType,
    per_page = 10,
  } = reportInfo || {};
  const generateReport = useGenerateReport();

  const getSection = (obj: any, key: string) =>
    obj?.data?.data?.data?.[key] ?? obj?.data?.data?.[key] ?? obj?.data?.[key];

  const initialSection = useMemo(
    () => getSection(reportData, reportType || "sales"),
    [reportData, reportType]
  );

  const [rows, setRows] = useState<TableRowData[]>([]);
  const [paginationData, setPaginationData] = useState<any>(initialSection);
  const [, setLoading] = useState(false);

  // format rows helper
  const toRows = (list: any[]) =>
    list.map((item: any) => ({
      fullId: item["Order ID"],
      id: shortenTransactionId(item["Order ID"]),
      items: 1,
      timeStamp: item["Date"],
      customer: item["Customer Name"],
      Amount: item["Total Amount"],
      paymentStatus: item["Status"] === "Completed" ? "Completed" : "Draft",
    }));

  useEffect(() => {
    if (Array.isArray(initialSection?.data)) {
      setRows(toRows(initialSection.data));
      setPaginationData(initialSection);
    }
  }, [initialSection]);

  // fetch a specific page
  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        report_type: reportType || "sales",
        locationId,
        paginate: true,
        per_page,
        page,
      };

      const res = await generateReport.mutateAsync(payload);
      const section = getSection(res, reportType || "sales");

      setPaginationData(section);
      setRows(Array.isArray(section?.data) ? toRows(section.data) : []);
    } catch (e) {
      console.error("Pagination fetch failed:", e);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Order ID",
      accessorKey: "id",
      enableSorting: false,
      cell: (props) => (
        <Text fw={500} c="black">
          {props.row.original.fullId}
        </Text>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "timeStamp",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-gray-600 whitespace-nowrap break-words ">
     {/* @ts-ignore */}
          {formatDate(row.original.timeStamp)}
        </div>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      enableSorting: false,
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.customer}</Text>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "Amount",
      enableSorting: false,
      cell: ({ row }) => (
        <span className="text-gray-900 text-sm font-medium">
          ₦ {row.original.Amount}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "paymentStatus",
      enableSorting: false,
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
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={rows}
        showSearch={false}
        showSortFilter={false}
        length={8}
        serverSidePagination={true}
        paginationData={{
          current_page: paginationData?.current_page,
          last_page: paginationData?.last_page,
          per_page: paginationData?.per_page,
          total: paginationData?.total,
          from: paginationData?.from,
          to: paginationData?.to,
          next_page_url: paginationData?.next_page_url,
          prev_page_url: paginationData?.prev_page_url,
        }}
        onPageChange={fetchPage}
        // loading={loading}
        tableTitle={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Sales Processing
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10" size="sm">
                {paginationData?.total}
                </Text>
              </div>
            </div>
          </div>
        }
        tableType="sales"
      />
    </main>
  );
};

export default SalesProcessingReport;
