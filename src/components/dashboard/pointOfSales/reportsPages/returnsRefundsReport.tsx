import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useEffect, useState } from "react";
import { shortenTransactionId, truncateText } from "../../../../utils/helpers";


const ReturnsRefundsReport = ({ reportInfo }: { reportInfo: any }) => {

  const { reportData} = reportInfo || {};
  const [data, setData] = useState<TableRowData[]>([]);

  const [, setCurrentPage] = useState(reportData?.data?.returns?.current_page || 1);

  useEffect(() => {
    const returnsArray = reportData?.data?.returns?.data;

    if (Array.isArray(returnsArray)) {
      const formattedData = returnsArray.map((item: any) => ({
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
    }
  }, [reportData]);  


  
  const paginationData = {
    current_page: reportData?.data?.returns?.current_page,
    last_page: reportData?.data?.returns?.last_page,
    per_page: reportData?.data?.returns?.per_page,
    total: reportData?.data?.returns?.total,
    from: reportData?.data?.returns?.from,
    to: reportData?.data?.returns?.to,
    next_page_url: reportData?.data?.returns?.next_page_url,
    prev_page_url: reportData?.data?.returns?.prev_page_url,
  };  
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

  };

  const columns: ColumnDef<TableRowData>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <input
    //       type="checkbox"
    //       checked={table.getIsAllRowsSelected()}
    //       onChange={table.getToggleAllRowsSelectedHandler()}
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <input
    //       type="checkbox"
    //       checked={row.getIsSelected()}
    //       onChange={row.getToggleSelectedHandler()}
    //     />
    //   ),
    //   enableSorting: false,
    //   enableColumnFilter: false,
    //   size: 10,
    // },
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: false, 
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
      enableSorting: false, 
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.dateReturned}</Text>
      ),
    },
    {
      header: "Order ID",
      accessorKey: "id",
      enableSorting: false, 
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
      enableSorting: false, 
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.customer}
        </span>
      ),
    },
    {
      header: "Returned Reason",
      accessorKey: "returnedReason",
      enableSorting: false, 
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.returnedReason}
        </span>
      ),
    },
    {
      header: "Complaint Status",
      accessorKey: "complaintStatus",
      enableSorting: false, 
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
        serverSidePagination
        paginationData={paginationData}
        onPageChange={handlePageChange}
        tableTitle={<div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex gap-2.5 items-center">
            <Text fw={500} size="xl" c="textSecondary.9">
              Logged Returns
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{data.length}</Text>
            </div>
          </div>


        </div>} tableType={"returns"}      />
    </main>
  );
};

export default ReturnsRefundsReport;
