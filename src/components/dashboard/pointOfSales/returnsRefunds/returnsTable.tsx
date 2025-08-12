import TanTable, { PaginationData } from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import {  Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import {
  formatDate,
  shortenTransactionId,
  truncateText,
} from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useState } from "react";

interface ReturnsTableProps {
  returns: any[];
  isLoading: boolean;
  onFilterChange: (filters: FilterValues) => void;
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
}

const ReturnsTable = ({
  returns,
  isLoading,
  onFilterChange,
  paginationData,
  onPageChange,
}: ReturnsTableProps) => {
  const [sortBy, setSortBy] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);


  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);

    const updatedFilters = {
      ...appliedFilters,
      sortBy: sortKey,
    };

    setAppliedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const statusMap: Record<string, string> = {
    approved: "Resolved",
    pending: "Pending",
    declined: "Declined",
  };

  const mappedReturns: TableRowData[] = returns.map((item: any) => ({
    name: item.product_variation?.name || "N/A",
    productCode: item.product_variation?.sku || "N/A",
    dateReturned: item.date_returned || "N/A",
    orderId: item.sales_order?.orderID || "N/A",
    customer: item.customer?.customer_name || "N/A",
    returnedReason: item.return_reason || "N/A",
    complaintStatus: statusMap[item.status] || "Unknown",
    returnId: item.returnID || "N/A",
    imagePath: item.product_variation?.image_path || "Unknown",
  }));
  

  const locations = Array.from(
    new Set(
      returns
        ?.map((p: any) => p.product?.location?.name)
        ?.filter((name: any) => typeof name === "string")
    )
  );

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Return ID",
      accessorKey: "returnId",
        enableSorting: false,
      cell: ({ row }) => (
        <span className="text-sm text-gray-900 font-medium">
          {row.original.returnId}
        </span>
      ),
    }, 
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
         <img
    
  src={row.original.imagePath || imageSrc} 
  alt={row.original.name as string}
  className="w-10 h-10 rounded-md object-cover"
/>

          <div className="flex flex-col">
            <Text fw={500} c="black">
              {truncateText(String(row.original.name ?? ""))}
            </Text>
            <Text fw={500} className="text-sm">
              ID:{" "}
              <span className="text-[#F16722]">
                {/* @ts-ignore  */}
                {shortenTransactionId(row.original.productCode)}
              </span>
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
        <Text c="textSecondary.7">
          {" "}
          {/* @ts-ignore */}
          {formatDate(row.original.dateReturned)}
        </Text>
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
    },
    {
      header: "Complaint Status",
      accessorKey: "complaintStatus",
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.original.complaintStatus;
        let bgColor = "";
        let textColor = "";
        let Dot = null;
      
        if (status === "Resolved") {
          bgColor = "bg-[#ECFDF3]";
          textColor = "text-[#027A48]";
          Dot = <PaidDot />;
        } else if (status === "Declined") {
          bgColor = "bg-[#FEF3F2]";
          textColor = "text-[#B42318]";
          Dot = <UnpaidDot />;
        } else {
          // Pending
          bgColor = "bg-[#FFFAEB]";
          textColor = "text-[#B54708]";
          Dot = <UnpaidDot />;
        }
      
        return (
          <div className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgColor} ${textColor}`}>
            {Dot}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
      
    },
    {
      header: "",
      accessorKey: "action",
      enableSorting: false,
      cell: ({ row }: any) => (
        <Link
          to={ROUTES.viewReturns}
          state={{
            ...row.original,
          }}
        >
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader size="lg" />
        </div>
      ) : (
        <TanTable
          columnData={columns}
          data={mappedReturns}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={8}
          //@ts-ignore
          locations={locations}
          showFilter
          tableType="returns"
          onFilterChange={onFilterChange}
          onSortChange={handleSortChange}
          activeSort={sortBy}
          serverSidePagination={true}
          paginationData={paginationData}
          onPageChange={onPageChange}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Logged Returns
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{paginationData?.total}</Text>
      
              </div>
            </div>
          }
        />
      )}
    </main>
  );
};

export default ReturnsTable;
