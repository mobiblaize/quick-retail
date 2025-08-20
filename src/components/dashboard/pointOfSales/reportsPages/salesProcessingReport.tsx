// import { ColumnDef } from "@tanstack/react-table";
// import { Text } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import TanTable from "../../../General/table";
// import { useEffect, useMemo, useState } from "react";
// import { formatDate, shortenTransactionId } from "../../../../utils/helpers";
// import { TableRowData } from "../../../../types";
// import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";

// const SalesProcessingReport = ({ reportInfo }: { reportInfo: any }) => {
//   const {
//     reportData,
//     startDate,
//     endDate,
//     locationId,
//     reportType,
//     per_page = 10,
//   } = reportInfo || {};
//   const generateReport = useGenerateReport();

//   const getSection = (obj: any, key: string) =>
//     obj?.data?.data?.data?.[key] ?? obj?.data?.data?.[key] ?? obj?.data?.[key];

//   const initialSection = useMemo(
//     () => getSection(reportData, reportType || "sales"),
//     [reportData, reportType]
//   );

//   const [rows, setRows] = useState<TableRowData[]>([]);
//   const [paginationData, setPaginationData] = useState<any>(initialSection);
//   const [, setLoading] = useState(false);

//   // format rows helper
//   const toRows = (list: any[]) =>
//     list.map((item: any) => ({
//       fullId: item["Order ID"],
//       id: shortenTransactionId(item["Order ID"]),
//       items: 1,
//       timeStamp: item["Date"],
//       customer: item["Customer Name"],
//       Amount: item["Total Amount"],
//       paymentStatus: item["Status"] === "Completed" ? "Completed" : "Draft",
//     }));

//   useEffect(() => {
//     if (Array.isArray(initialSection?.data)) {
//       setRows(toRows(initialSection.data));
//       setPaginationData(initialSection);
//     }
//   }, [initialSection]);

//   // fetch a specific page
//   const fetchPage = async (page: number) => {
//     setLoading(true);
//     try {
//       const payload = {
//         start_date: startDate,
//         end_date: endDate,
//         report_type: reportType || "sales",
//         locationId,
//         paginate: true,
//         per_page,
//         page,
//       };

//       const res = await generateReport.mutateAsync(payload);
//       const section = getSection(res, reportType || "sales");

//       setPaginationData(section);
//       setRows(Array.isArray(section?.data) ? toRows(section.data) : []);
//     } catch (e) {
//       console.error("Pagination fetch failed:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Order ID",
//       accessorKey: "id",
//       enableSorting: false,
//       cell: (props) => (
//         <Text fw={500} c="black">
//           {props.row.original.fullId}
//         </Text>
//       ),
//     },
//     {
//       header: "Time stamp",
//       accessorKey: "timeStamp",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <div className="text-gray-600 whitespace-nowrap break-words ">
//      {/* @ts-ignore */}
//           {formatDate(row.original.timeStamp)}
//         </div>
//       ),
//     },
//     {
//       header: "Customer",
//       accessorKey: "customer",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <Text c="textSecondary.7">{row.original.customer}</Text>
//       ),
//     },
//     {
//       header: "Total Amount",
//       accessorKey: "Amount",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <span className="text-gray-900 text-sm font-medium">
//           ₦ {row.original.Amount}
//         </span>
//       ),
//     },
//     {
//       header: "Status",
//       accessorKey: "paymentStatus",
//       enableSorting: false,
//       cell: ({ row }) => {
//         const status = row.original.paymentStatus;
//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//               status === "Completed"
//                 ? "bg-[#ECFDF3] text-[#027A48]"
//                 : "bg-[#FEF3F2] text-[#B42318]"
//             }`}
//           >
//             {status === "Completed" ? <PaidDot /> : <UnpaidDot />}
//             <span className="ml-2">{status}</span>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       <TanTable
//         columnData={columns}
//         data={rows}
//         showSearch={false}
//         showSortFilter={false}
//         length={8}
//         serverSidePagination={true}
//         paginationData={{
//           current_page: paginationData?.current_page,
//           last_page: paginationData?.last_page,
//           per_page: paginationData?.per_page,
//           total: paginationData?.total,
//           from: paginationData?.from,
//           to: paginationData?.to,
//           next_page_url: paginationData?.next_page_url,
//           prev_page_url: paginationData?.prev_page_url,
//         }}
//         onPageChange={fetchPage}
//         // loading={loading}
//         tableTitle={
//           <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//             <div className="flex gap-2.5 items-center">
//               <Text fw={500} size="xl" c="textSecondary.9">
//                 Sales Processing
//               </Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//                 <Text c="customPrimary.10" size="sm">
//                 {paginationData?.total}
//                 </Text>
//               </div>
//             </div>
//           </div>
//         }
//         tableType="sales"
//       />
//     </main>
//   );
// };

// export default SalesProcessingReport;


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
      render: (row: any) => (
        <Text c="textSecondary.7">{row.customer}</Text>
      ),
    },
    {
      key: "amount",
      header: "Total Amount",
      render: (row: any) => (
        <Text c="black" size="sm" fw={500}>
          ₦{Number(row.amount ?? 0).toFixed(2)}
        </Text>
      ),
    },
    {
      key: "paymentStatus",
      header: "Status",
      render: (row: any) => {
        const isCompleted = row.paymentStatus?.toLowerCase() === "completed";
        return (
          <Badge
            leftSection={isCompleted ? <PaidDot /> : <UnpaidDot />}
            color={isCompleted ? "green" : "red"}
            variant="light"
            radius="lg"
            size="md"
          >
            {row.paymentStatus?.charAt(0).toUpperCase() +
              row.paymentStatus?.slice(1).toLowerCase()}
          </Badge>
        );
      },
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
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
          // from: paginationData?.from,
          // to: paginationData?.to,
          // next_page_url: paginationData?.next_page_url,
          // prev_page_url: paginationData?.prev_page_url,
        }}
        onPageChange={fetchPage}
         titleSection={
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

        // ={
        //             <div className="flex gap-2.5">
        //               <Text fw={500} size="xl" c="textSecondary.9">
        //                 Stores Overview
        //               </Text>
        //               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
        //                 <Text c="customPrimary.10">{paginationData?.total ?? stores.length}</Text>
        //               </div>
        //             </div>
        //           }
      />
    </main>
  );
};

export default SalesProcessingReport;
