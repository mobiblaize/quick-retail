

import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { useEffect, useState } from "react";
import { shortenTransactionId } from "../../../../utils/helpers";
import { TableRowData } from "../../../../types";

const SalesProcessingReport = ({ reportInfo }: { reportInfo: any }) => {
  const { reportData} = reportInfo || {};
  const salesData = reportData?.data?.sales?.data ?? [];

  const [data, setData] = useState<TableRowData[]>([]);

  const [, setCurrentPage] = useState(reportData?.data?.sales?.current_page || 1);

  useEffect(() => {
    if (Array.isArray(salesData)) {
      const formattedData = salesData.map((item: any) => ({
        fullId: item["Order ID"],
        id: shortenTransactionId(item["Order ID"]),
        items: 1,
        timeStamp: item["Date"],
        customer: item["Customer Name"],
        Amount: item["Total Amount"],
        paymentStatus: item["Status"] === "Completed" ? "Completed" : "Draft",
      }));
      setData(formattedData);
    }
  }, [salesData]);


  const paginationData = {
    current_page: reportData?.data?.sales?.current_page,
    last_page: reportData?.data?.sales?.last_page,
    per_page: reportData?.data?.sales?.per_page,
    total: reportData?.data?.sales?.total,
    from: reportData?.data?.sales?.from,
    to: reportData?.data?.sales?.to,
    next_page_url: reportData?.data?.sales?.next_page_url,
    prev_page_url: reportData?.data?.sales?.prev_page_url,
  };  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

  };
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (props) => (
        <Text fw={500} c="black">
          {props.row.original.id}
        </Text>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => <Text c="textSecondary.7">{row.original.timeStamp}</Text>,
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }) => <Text c="textSecondary.7">{row.original.customer}</Text>,
    },
    {
      header: "Total Amount",
      accessorKey: "Amount",
      cell: ({ row }) => (
        <span className="text-gray-900 text-sm font-medium">
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
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={data}
        showSearch={false}
        showSortFilter={false}
        length={8}
        serverSidePagination
        paginationData={paginationData}
        onPageChange={handlePageChange}
        tableTitle={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Sales Processing
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10" size="sm">
                  {salesData.length}
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

