

import { useEffect, useMemo, useState } from "react";
import { Text, Badge } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { formatDate, shortenTransactionId } from "../../../../utils/helpers";
import { TableRowData } from "../../../../types";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import GenericTable from "../../../General/genericTable";

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
  const [loading, setLoading] = useState(false);

  // format rows helper
  const toRows = (list: any[]) =>
    list.map((item: any) => ({
      fullId: item["Order ID"],
      id: shortenTransactionId(item["Order ID"]),
      items: 1,
      timeStamp: item["Date"],
      customer: item["Customer Name"],
      amount: item["Total Amount"],
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

  const columns = [
    {
      key: "id",
      header: "Order ID",
      render: (row: any) => (
        <Text fw={500} c="black">
          {row.fullId}
        </Text>
      ),
    },
    {
      key: "timeStamp",
      header: "Time stamp",
      render: (row: any) => (
        <Text c="dimmed" size="sm">
          {formatDate(row.timeStamp)}
        </Text>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => <Text c="textSecondary.7">{row.customer}</Text>,
    },
    {
      key: "amount",
      header: "Total Amount",
      render: (row: any) => (
    
        <Text c="black" size="sm" fw={500}>
          ₦
          {Number(
            String(row.amount ?? 0).replace(/[^0-9.-]+/g, "") // remove ₦, commas, spaces
          ).toFixed(2)}
        </Text>
      ),
    },
    {
      key: "paymentStatus",
      header: "Status",
      render: (row: any) => {
        const statusRaw = row.paymentStatus || "";
        const isCompleted = statusRaw.toLowerCase() === "completed";

        // Capitalize first letter only
        const capitalizedStatus =
          statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1).toLowerCase();

        return (
          <Badge
            leftSection={isCompleted ? <PaidDot /> : <UnpaidDot />}
            color={isCompleted ? "green" : "red"}
            variant="light"
            radius="lg"
            size="md"
            style={{ textTransform: "none", fontWeight: 500 }}
          >
            {capitalizedStatus}
          </Badge>
        );
      },
    },
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={rows}
        isLoading={loading}
        // serverSidePagination
        paginationData={{
          current_page: paginationData?.current_page,
          last_page: paginationData?.last_page,
          per_page: paginationData?.per_page,
          total: paginationData?.total,
      
        }}
        onPageChange={fetchPage}
       
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">   Sales Processing</Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10"> {paginationData?.total}</Text>
            </div>
          </div>
        }
      />
    </>
  );
};

export default SalesProcessingReport;
