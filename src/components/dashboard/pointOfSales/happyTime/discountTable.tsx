import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import {  Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import TanTable, { PaginationData } from "../../../General/table";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useState } from "react";


// type DiscountTableProps = {
//   data: any;
//   isLoading: boolean;
//   refresh: () => void;
//   onFilterChange: (filters: FilterValues) => void;
// };


type DiscountTableProps = {
  rawDiscounts: any[];
  isLoading: boolean;
  onFilterChange: (filters: FilterValues) => void;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  onSearchChange?: (search: string) => void;
};

const DiscountTable = ({
  rawDiscounts,
  isLoading,
  onFilterChange,
  paginationData,
  onPageChange,
  onSearchChange,
}: DiscountTableProps) => {

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

  const discounts = rawDiscounts.map((item: any) => {
    const apiStatus = typeof item?.status === "string" 
      ? item.status.toLowerCase() 
      : "";
    
    // Prefer `to`, fallback to `initial_end_date`
    const dateToString =
      item?.to?.split("T")[0] ||
      (item?.initial_end_date ? item.initial_end_date.split(" ")[0] : null);
    
    const dateTo = dateToString ? new Date(dateToString) : null;
    const today = new Date();
    const isActiveFlag = item.is_active === 1 || item.is_active === true;
  
    let status = "Inactive";
  
    // 1. API says expired
    if (apiStatus === "expired") {
      status = "Expired";
    }
    // 2. API says active or is_active flag true
    else if (apiStatus === "active" || isActiveFlag) {
      if (dateTo && dateTo < today) {
        status = "Expired";
      } else {
        status = "Active";
      }
    }
    // 3. API says inactive
    else if (apiStatus === "inactive") {
      status = "Inactive";
    }
    // 4. Fallback to date expiry
    else {
      if (dateTo && dateTo < today) {
        status = "Expired";
      } else {
        status = "Inactive";
      }
    }
  
    return {
      name: item.name || "Unnamed",
      discountCode: item.code || "-",
      discountType: item.type || "-",
      value: item.value || 0,
      redemption: item.redemption_count || 0,
      dateFrom: item.from?.split("T")[0] || "-",
      dateTo: dateToString || "-",
      status,
      image: imageSrc,
    };
  });
  
  const columns: ColumnDef<TableRowData>[] = [
   
    {
      header: "Discount Name",
      accessorKey: "name",
      enableSorting: false, 
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {/* <Avatar
           // @ts-ignore
            src={row.original.image || imageSrc}
            alt={row.original.name as string}
            radius="md"
            size={40}
          /> */}
          <Text fw={500} c="black">
            {row.original.name}
          </Text>
        </div>
      ),
    },
   
    {
      header: "Percent Off",
      accessorKey: "percent",
      enableSorting: false, 
      cell: ({ row }) => 
        row.original.discountType === "percentage"
          ? `${row.original.value}%`
          : "-"
    },
    {
      header: "Price Off",
      accessorKey: "price",
      enableSorting: false, 
      cell: ({ row }) => 
        row.original.discountType === "amount"
          ? `₦${row.original.value}`
          : "-"
    },    
    {
      header: "Date From",
      accessorKey: "dateFrom",
      enableSorting: false, 
    },
    {
      header: "Date To",
      accessorKey: "dateTo",
      enableSorting: false, 
    },
    {
      header: "Redemption",
      accessorKey: "redemption",
      enableSorting: false, 
    },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   enableSorting: false, 
    //   cell: ({ row }) => {
    //     const status = row.original.status;
    //     return (
    //       <div
    //         className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
    //           status === "Active"
    //             ? "bg-[#ECFDF3] text-[#027A48]"
    //             : "bg-[#FFFAEB] text-[#B54708]"
    //         }`}
    //       >
    //         {status === "Active" ? <PaidDot /> : <UnpaidDot />}
    //         <span className="ml-2">{status}</span>
    //       </div>
    //     );
    //   },
    // },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.original.status;
    
        let bgColor = "";
        let textColor = "";
        let Icon = UnpaidDot;
    
        if (status === "Active") {
          bgColor = "bg-[#ECFDF3]";
          textColor = "text-[#027A48]";
          Icon = PaidDot;
        } else if (status === "Expired") {
          bgColor = "bg-[#FEE2E2]";      // light red background
          textColor = "text-[#B91C1C]";  // dark red text
          Icon = UnpaidDot;
        } else {
          bgColor = "bg-[#FFFAEB]";
          textColor = "text-[#B54708]";
          Icon = UnpaidDot;
        }
    
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bgColor} ${textColor}`}
          >
            <Icon />
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    }
,    
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading Discount Table
        </Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={discounts}
        showSearch
        showFilter
        showSortFilter
        onSortChange={handleSortChange}
        activeSort={sortBy} 
        searchPlaceholder="Search orders"
        length={8}
           //@ts-ignore
        tableType="discount"
        // types={types}
        onFilterChange={onFilterChange}
        onSearchChange={onSearchChange}
        serverSidePagination={true}
        paginationData={paginationData}
        onPageChange={onPageChange}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Discounted Products
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">


              <Text c="customPrimary.10">{paginationData?.total}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default DiscountTable;
