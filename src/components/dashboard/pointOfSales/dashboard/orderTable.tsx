import TanTable, { PaginationData } from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { formatDate,formatMoney  } from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useState } from "react";
import { TableRowData } from "../../../../types";

interface CustomerOrdersTableProps {
  salesData: any[]; 
  onFilterChange: (filters: FilterValues) => void;
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  
}

const CustomerOrdersTable = ({
  salesData,
  onFilterChange,
  isLoading,
  paginationData,
  onPageChange,
}: CustomerOrdersTableProps) => {
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

  

  const tableData: TableRowData[] = Array.isArray(salesData)
  ? salesData.map((sale) => {
      const totalItems = sale.sale_order_details?.reduce(
        //@ts-ignore
        (sum, item) => sum + (item.quantity_ordered || 0),
        0
      );

      const cashierFullName = sale.cashier
        ? `${sale.cashier.firstname || ''} ${sale.cashier.lastname || ''}`.trim()
        : 'Unknown';

      return {
        orderID: sale.orderID,
        date: sale.updated_at,
        customer: sale.customer_name,
        amount: sale.order_total,
        status: sale.payment_status,
        items: totalItems,
        cashier: cashierFullName
      };
    })
  : [];
  

  const navigate = useNavigate();

  const handleViewClick = (orderID: string, status: string) => {
    if (status === "paid") {
      navigate(ROUTES.viewOrder, { state: { orderID } });
    } else if (status === "pending") {
      navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    } else {
      console.warn("Unhandled order status:", status);
    }
  };
   
  const columns: ColumnDef<any>[] = [
   
    {
      header: "Order ID",
      accessorKey: "orderID",
      enableSorting: false, 
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {/* {shortenTransactionId(props.row.original.orderID)} */}
            {props.row.original.orderID}
          </Text>
          <Text fw={500}>
            Total Items:{" "}
            <span className="ml-1 text-black">{props.row.original.items}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "date",
      enableSorting: false, 
      cell: (props) => (
        <div className="text-gray-600 whitespace-nowrap break-words ">
          {formatDate(props.row.original.date)}
        </div>
      ),
    },
    
    {
      header: "Cashier Details",
      accessorKey: "cashier",
      enableSorting: false, 
      cell: (props) => (
        <Text c="#1D2739">{props.row.original.cashier}</Text>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      enableSorting: false, 
      cell: (props) => (
        <Text c="#1D2739">{props.row.original.customer}</Text>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      enableSorting: false, 
      cell: (props) => (
        <Text c="#1D2739">₦ {formatMoney(props.row.original.amount)}</Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false, 
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{status}</span>
          </div>
        );
      },
    },
   
    {
      header: "",
      accessorKey: "action",
      enableSorting: false, 
      cell: (props) => {
        const { orderID, status } = props.row.original;
    
        return (
          <Text
            fw={700}
            c="customPrimary.10"
            className="cursor-pointer"
            onClick={() => handleViewClick(orderID, status)}
          >
            View Order
          </Text>
        );
      },
    },
    
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Text fw={500} size="md" c="dimmed">
          Loading orders...
        </Text>
      </div>
    );
  }
  

  return (
    <main className="w-full h-auto py-8 rounded-lg bg-white">
        <div className="overflow-auto max-w-full">
      <TanTable
        columnData={columns}
        data={tableData} 
        showSearch
        showSortFilter
        showFilter= {true}
        searchPlaceholder="Search orders"
        onSortChange={handleSortChange}
        activeSort={sortBy} 
        length={8}   
        tableType="sales"
        onFilterChange={onFilterChange}
        serverSidePagination={true}
        paginationData={paginationData}
        onPageChange={onPageChange}
                     
        // sortOptions={[
        //   {
        //     key: "products",
        //     label: "Sort By Recently Uploaded",
        //   },
        //   {
        //     key: "added_on",
        //     label: "Sort by Date Added",
        //   },
        // ]}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Orders
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{tableData.length}</Text>
            </div>
          </div>
        }
        
      />
      </div>
    </main>
  );
};

export default CustomerOrdersTable;

