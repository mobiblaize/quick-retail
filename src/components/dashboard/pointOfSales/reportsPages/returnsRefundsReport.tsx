// import TanTable from "../../../General/table";
// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Avatar, Text } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import { useEffect, useState } from "react";
// import { truncateText } from "../../../../utils/helpers";
// import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";

// const ReturnsRefundsReport = ({ reportInfo }: { reportInfo: any }) => {
//   const { reportData, startDate, endDate, locationId, reportType, per_page = 10 } = reportInfo || {};
//   const generateReport = useGenerateReport();

//   const [data, setData] = useState<TableRowData[]>([]);
//   const [paginationData, setPaginationData] = useState(reportData?.data?.returns);
//   const [, setLoading] = useState(false);

//   const formatData = (returnsArray: any[], storeName: string) =>
//     returnsArray.map((item: any) => ({
//       fullOrderId: item["Order ID"],
//       id: item["Order ID"],
//       productId: item["Product ID"],
//       items: 1,
//       dateReturned: item["Date Returned"],
//       customer: item["Customer Name"],
//       product: item["Product name"],
//       returnedReason: item["Reason"],
//       imageUrl: item["Image"],
//       store: storeName,
//       complaintStatus:
//         item["Status"] === "Approved"
//           ? "Resolved"
//           : item["Status"] === "Pending"
//           ? "Pending"
//           : "Declined",
//     }));

//   // Initial load
//   useEffect(() => {
//     const returnsArray = reportData?.data?.returns?.data;
//     const storeName = reportData?.data?.location_status?.[0]?.location_name || "N/A";
//     if (Array.isArray(returnsArray)) {
//       setData(formatData(returnsArray, storeName));
//       setPaginationData(reportData?.data?.returns);
//     }
//   }, [reportData]);

//   const fetchPage = async (page: number) => {
//     setLoading(true);
//     try {
//       const payload = {
//         start_date: startDate,
//         end_date: endDate,
//         report_type: reportType || "returns",
//         locationId,
//         paginate: true,
//         per_page,
//         page,
//       };

//       const response = await generateReport.mutateAsync(payload);
//       const returnsObj = response.data.data.returns;
//       const storeName = response.data.data.location_status?.[0]?.location_name || "N/A";

//       if (Array.isArray(returnsObj.data)) {
//         setData(formatData(returnsObj.data, storeName));
//         setPaginationData(returnsObj);
//       }
//     } catch (err) {
//       console.error("Pagination fetch failed:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Product Returned",
//       accessorKey: "name",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <div className="flex items-center gap-3">
//           {/* @ts-ignore */}
//           <Avatar src={row.original.imageUrl ?? undefined} alt={row.original.name as string} radius="md" size={40} />
//           <div className="flex flex-col">
//             <Text fw={500} c="black" title={String(row.original.product ?? "")}>
//               {truncateText(String(row.original.product ?? ""))}
//             </Text>
//             <Text fw={500} className="text-sm">
//               ID: <span className="text-[#F16722]">{row.original.productId}</span>
//             </Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       header: "Store",
//       accessorKey: "store",
//       cell: ({ row }) => <Text c="textSecondary.7">{row.original.store}</Text>,
//     },
//     {
//       header: "Date Returned",
//       accessorKey: "dateReturned",
//       cell: ({ row }) => <Text c="textSecondary.7">{row.original.dateReturned}</Text>,
//     },
//     {
//       header: "Order ID",
//       accessorKey: "id",
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">{props.row.original.id}</Text>
//         </div>
//       ),
//     },
//     {
//       header: "Customer",
//       accessorKey: "customer",
//       cell: ({ row }) => <span className=" text-gray-900 text-sm font-medium">{row.original.customer}</span>,
//     },
//     {
//       header: "Returned Reason",
//       accessorKey: "returnedReason",
//       cell: ({ row }) => <span className=" text-gray-900 text-sm font-medium">{row.original.returnedReason}</span>,
//     },
//     {
//       header: "Complaint Status",
//       accessorKey: "complaintStatus",
//       cell: ({ row }) => {
//         const status = row.original.complaintStatus;
//         let bgClass = "", textClass = "", icon = null;

//         if (status === "Resolved") {
//           bgClass = "bg-[#ECFDF3]";
//           textClass = "text-[#027A48]";
//           icon = <PaidDot />;
//         } else if (status === "Pending") {
//           bgClass = "bg-[#E0F2FE]";
//           textClass = "text-[#0369A1]";
//           icon = <UnpaidDot />;
//         } else {
//           bgClass = "bg-[#FFFAEB]";
//           textClass = "text-[#B54708]";
//           icon = <UnpaidDot />;
//         }

//         return (
//           <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgClass} ${textClass}`}>
//             {icon}
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
//         data={data}
//         showSearch={false}
//         showSortFilter={false}
//         length={8}
//         serverSidePagination
//         // loading={loading}
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
//         tableTitle={
//           <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
//             <div className="flex gap-2.5 items-center">
//               <Text fw={500} size="xl" c="textSecondary.9">Logged Returns</Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//                 <Text c="customPrimary.10">{paginationData?.total || 0}</Text>
//               </div>
//             </div>
//           </div>
//         }
//         tableType="returns"
//       />
//     </main>
//   );
// };

// export default ReturnsRefundsReport;


import { useEffect, useState } from "react";
import { Avatar, Text, Badge } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";
import { truncateText } from "../../../../utils/helpers";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import GenericTable from "../../../General/genericTable";

const ReturnsRefundsReport = ({ reportInfo }: { reportInfo: any }) => {
  const { reportData, startDate, endDate, locationId, reportType, per_page = 10 } =
    reportInfo || {};
  const generateReport = useGenerateReport();

  const [rows, setRows] = useState<TableRowData[]>([]);
  const [paginationData, setPaginationData] = useState(reportData?.data?.returns);
  const [loading, setLoading] = useState(false);

  const formatData = (returnsArray: any[], storeName: string) =>
    returnsArray.map((item: any) => ({
      fullOrderId: item["Order ID"],
      id: item["Order ID"],
      productId: item["Product ID"],
      items: 1,
      dateReturned: item["Date Returned"],
      customer: item["Customer Name"],
      product: item["Product name"],
      returnedReason: item["Reason"],
      imageUrl: item["Image"],
      store: storeName,
      complaintStatus:
        item["Status"] === "Approved"
          ? "Resolved"
          : item["Status"] === "Pending"
          ? "Pending"
          : "Declined",
    }));

  // Initial load
  useEffect(() => {
    const returnsArray = reportData?.data?.returns?.data;
    const storeName =
      reportData?.data?.location_status?.[0]?.location_name || "N/A";
    if (Array.isArray(returnsArray)) {
      setRows(formatData(returnsArray, storeName));
      setPaginationData(reportData?.data?.returns);
    }
  }, [reportData]);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        report_type: reportType || "returns",
        locationId,
        paginate: true,
        per_page,
        page,
      };

      const response = await generateReport.mutateAsync(payload);
      const returnsObj = response.data.data.returns;
      const storeName =
        response.data.data.location_status?.[0]?.location_name || "N/A";

      if (Array.isArray(returnsObj.data)) {
        setRows(formatData(returnsObj.data, storeName));
        setPaginationData(returnsObj);
      }
    } catch (err) {
      console.error("Pagination fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "product",
      header: "Product Returned",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={row.imageUrl ?? undefined}
            alt={row.product}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black" title={row.product ?? ""}>
              {truncateText(String(row.product ?? ""))}
            </Text>
            <Text fw={500} className="text-sm">
              ID: <span className="text-[#F16722]">{row.productId}</span>
            </Text>
          </div>
        </div>
      ),
    },
    {
      key: "store",
      header: "Store",
      render: (row: any) => <Text c="textSecondary.7">{row.store}</Text>,
    },
    {
      key: "dateReturned",
      header: "Date Returned",
      render: (row: any) => (
        <Text c="textSecondary.7">{row.dateReturned}</Text>
      ),
    },
    {
      key: "id",
      header: "Order ID",
      render: (row: any) => (
        <Text fw={500} c="black">
          {row.id}
        </Text>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => (
        <span className="text-gray-900 text-sm font-medium">
          {row.customer}
        </span>
      ),
    },
    {
      key: "returnedReason",
      header: "Returned Reason",
      render: (row: any) => (
        <span className="text-gray-900 text-sm font-medium">
          {row.returnedReason}
        </span>
      ),
    },
    {
      key: "complaintStatus",
      header: "Complaint Status",
      render: (row: any) => {
        const status = row.complaintStatus;
        if (status === "Resolved") {
          return (
            <Badge
              leftSection={<PaidDot />}
              color="green"
              variant="light"
              radius="lg"
              style={{ textTransform: "none" }}
            >
              Resolved
            </Badge>
          );
        } else if (status === "Pending") {
          return (
            <Badge
              leftSection={<UnpaidDot />}
              color="blue"
              variant="light"
              radius="lg"
              style={{ textTransform: "none" }}
            >
              Pending
            </Badge>
          );
        } else {
          return (
            <Badge
              leftSection={<UnpaidDot />}
              color="orange"
              variant="light"
              radius="lg"
              style={{ textTransform: "none" }}
            >
              Declined
            </Badge>
          );
        }
      },
    },
  ];

  return (
    <main className="w-full h-auto">
      <GenericTable
        columns={columns}
        data={rows}
        isLoading={loading}
        paginationData={{
          current_page: paginationData?.current_page,
          last_page: paginationData?.last_page,
          per_page: paginationData?.per_page,
          total: paginationData?.total,
        }}
        onPageChange={fetchPage}
        titleSection={
          <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex gap-2.5 items-center">
              <Text fw={500} size="xl" c="textSecondary.9">
                Logged Returns
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">
                  {paginationData?.total || 0}
                </Text>
              </div>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ReturnsRefundsReport;
