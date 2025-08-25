// import TanTable from "../../../General/table";
// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Text } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import { useEffect, useMemo, useState } from "react";
// import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";


// const DiscountReportTable = ({ reportInfo }: { reportInfo: any }) => {
//   const { reportData, startDate, endDate, locationId, reportType,  per_page = 10  } = reportInfo || {};
//   const generateReport = useGenerateReport();

//   const [data, setData] = useState<TableRowData[]>([]);
//   const [paginationData, setPaginationData] = useState(reportData?.data?.discounts);
//   const [, setLoading] = useState(false);

//   const getProductsSection = (obj: any) =>
//   obj?.data?.data?.data?.discounts ??
//   obj?.data?.data?.discounts ??
//   obj?.data?.discounts;


// const initialSection = useMemo(
//   () => getProductsSection(reportData),
//   [reportData]
// );

// // const [data, setData] = useState<TableRowData[]>([]);
// // const [paginationData, setPaginationData] = useState<any>(initialSection);
// // const [, setLoading] = useState(false);


// const formatProducts = (list: any[]) =>
//   list.map((item: any) => ({
//     discountName: item["Discount name"],
//     dateFrom: item["Date From"],
//     dateTo: item["Date To"],
//     priceOff: item["Price Off"],
//     percentOff: item["Percent Off"],
//     redemption: item["Redemption"],
//     status: item["Status"],
//   }));

// // Load page 1 from passed-in data
// useEffect(() => {
//   if (Array.isArray(initialSection?.data)) {
//     setData(formatProducts(initialSection.data));
//     setPaginationData(initialSection);
//   }
// }, [initialSection]);

//   const fetchPage = async (page: number) => {
//     setLoading(true);
//     try {
//       const payload = {
//         start_date: startDate,
//         end_date: endDate,
//         report_type: reportType || "discounts",
//         locationId,
//         paginate: true,
//         per_page,
//         page,
//       };

//       const response = await generateReport.mutateAsync(payload);
//       const discountsArray = response.data.data.discounts.data;

//       setPaginationData(response.data.data.discounts);

//       if (Array.isArray(discountsArray)) {
//         setData(
//           discountsArray.map((item: any) => ({
//             discountName: item["Discount name"],
//             dateFrom: item["Date From"],
//             dateTo: item["Date To"],
//             priceOff: item["Price Off"],
//             percentOff: item["Percent Off"],
//             redemption: item["Redemption"],
//             status: item["Status"],
//           }))
//         );
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };



//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Discount Name",
//       accessorKey: "discountName",
//       cell: (props) => <Text fw={500} c="black">{props.getValue() as string}</Text>,
//     },
//     {
//       header: "Percent Off",
//       accessorKey: "percentOff",
//       cell: (props) => <Text>{props.getValue() as string}</Text>,
//     },
//     {
//       header: "Price Off",
//       accessorKey: "priceOff",
//       cell: (props) => {
//         const priceOff = props.getValue() as string;
//         return (
//           <Text>
//             {priceOff !== "-" && !isNaN(Number(priceOff))
//               ? `₦${Number(priceOff).toLocaleString()}`
//               : "-"}
//           </Text>
//         );
//       },
//     },
//     {
//       header: "Date From",
//       accessorKey: "dateFrom",
//       cell: (props) => <Text c="textSecondary.7">{new Date(props.getValue() as string).toLocaleDateString()}</Text>,
//     },
//     {
//       header: "Date To",
//       accessorKey: "dateTo",
//       cell: (props) => <Text c="textSecondary.7">{new Date(props.getValue() as string).toLocaleDateString()}</Text>,
//     },
//     {
//       header: "Status",
//       accessorKey: "status",
//       cell: (props) => {
//         const status = props.getValue() as string;
//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//               status === "active"
//                 ? "bg-[#ECFDF3] text-[#027A48]"
//                 : "bg-[#FFFAEB] text-[#B54708]"
//             }`}
//           >
//             {status === "active" ? <PaidDot /> : <UnpaidDot />}
//             <span className="ml-2">{status}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Redemption",
//       accessorKey: "redemption",
//       cell: (props) => <Text>{props.getValue() as string}</Text>,
//     },
//   ];

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       <TanTable
//         columnData={columns}
//         data={data}
//         showSearch={false}
//         showSortFilter={false}
//         serverSidePagination
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
//               <Text fw={500} size="xl" c="textSecondary.9">
//                 Discounted Products
//               </Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//               <Text c="customPrimary.10">{paginationData?.total}</Text>
//               </div>
//             </div>
//           </div>
//         }
//         tableType="discount"
//       />
//     </main>
//   );
// };

// export default DiscountReportTable;



import { useEffect, useMemo, useState } from "react";
import { Text, Badge } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";
import { useGenerateReport } from "../../../../hooks/backendApis/pos/reports";
import GenericTable from "../../../General/genericTable";

const DiscountReportTable = ({ reportInfo }: { reportInfo: any }) => {
  const { reportData, startDate, endDate, locationId, reportType, per_page = 10 } =
    reportInfo || {};
  const generateReport = useGenerateReport();

  const [rows, setRows] = useState<TableRowData[]>([]);
  const [paginationData, setPaginationData] = useState(
    reportData?.data?.discounts
  );
  const [loading, setLoading] = useState(false);

  const getProductsSection = (obj: any) =>
    obj?.data?.data?.data?.discounts ??
    obj?.data?.data?.discounts ??
    obj?.data?.discounts;

  const initialSection = useMemo(() => getProductsSection(reportData), [reportData]);

  const formatProducts = (list: any[]) =>
    list.map((item: any) => ({
      discountName: item["Discount name"],
      dateFrom: item["Date From"],
      dateTo: item["Date To"],
      priceOff: item["Price Off"],
      percentOff: item["Percent Off"],
      redemption: item["Redemption"],
      status: item["Status"],
    }));

  // Initial load
  useEffect(() => {
    if (Array.isArray(initialSection?.data)) {
      setRows(formatProducts(initialSection.data));
      setPaginationData(initialSection);
    }
  }, [initialSection]);

  const fetchPage = async (page: number) => {
    setLoading(true);
    try {
      const payload = {
        start_date: startDate,
        end_date: endDate,
        report_type: reportType || "discounts",
        locationId,
        paginate: true,
        per_page,
        page,
      };

      const response = await generateReport.mutateAsync(payload);
      const discountsArray = response.data.data.discounts.data;

      setPaginationData(response.data.data.discounts);

      if (Array.isArray(discountsArray)) {
        setRows(formatProducts(discountsArray));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: "discountName",
      header: "Discount Name",
      render: (row: any) => (
        <Text fw={500} c="black">
          {row.discountName}
        </Text>
      ),
    },
    {
      key: "percentOff",
      header: "Percent Off",
      render: (row: any) => <Text>{row.percentOff}</Text>,
    },
    {
      key: "priceOff",
      header: "Price Off",
      render: (row: any) => {
        const priceOff = row.priceOff;
        return (
          <Text>
            {priceOff !== "-" && !isNaN(Number(priceOff))
              ? `₦${Number(priceOff).toLocaleString()}`
              : "-"}
          </Text>
        );
      },
    },
    {
      key: "dateFrom",
      header: "Date From",
      render: (row: any) => (
        <Text c="textSecondary.7">
          {new Date(row.dateFrom).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: "dateTo",
      header: "Date To",
      render: (row: any) => (
        <Text c="textSecondary.7">
          {new Date(row.dateTo).toLocaleDateString()}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => {
        const statusRaw = row.status || "";
        const status =
          statusRaw.charAt(0).toUpperCase() +
          statusRaw.slice(1).toLowerCase();

        return (
          <Badge
            leftSection={status.toLowerCase() === "active" ? <PaidDot /> : <UnpaidDot />}
            color={status.toLowerCase() === "active" ? "green" : "orange"}
            variant="light"
            radius="lg"
            style={{ textTransform: "none" }}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      key: "redemption",
      header: "Redemption",
      render: (row: any) => <Text>{row.redemption}</Text>,
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
                Discounted Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{paginationData?.total}</Text>
              </div>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default DiscountReportTable;
