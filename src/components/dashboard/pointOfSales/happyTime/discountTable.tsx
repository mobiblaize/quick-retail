import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import TanTable from "../../../General/table";
import { FilterValues } from "../../../General/table/reuseableFilter";


// type DiscountTableProps = {
//   data: any;
//   isLoading: boolean;
//   refresh: () => void;
//   onFilterChange: (filters: FilterValues) => void;
// };


const DiscountTable = ({ rawDiscounts, isLoading,   onFilterChange }: { rawDiscounts: any[], isLoading:any,  onFilterChange: (filters: FilterValues) => void; }) => {



console.log (rawDiscounts)
  const discounts = rawDiscounts.map((item: any) => ({
    name: item.name || "Unnamed",
    discountCode: item.code || "-",
    discountType: item.type || "-",
    value: item.value || 0,
    dateFrom: item.from?.split("T")[0] || "-",
    dateTo: item.to?.split("T")[0] || "-",
    status: item.status === "active" ? "Active" : "Inactive",
    image: imageSrc,  
  }));
  

  const columns: ColumnDef<TableRowData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Product",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
           // @ts-ignore
            src={row.original.image || imageSrc}
            alt={row.original.name as string}
            radius="md"
            size={40}
          />
          <Text fw={500} c="black">
            {row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "Discount Code",
      accessorKey: "discountCode",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.discountCode}</Text>
      ),
    },
    {
      header: "Percent Off",
      accessorKey: "percent",
      cell: ({ row }) => 
        row.original.discountType === "percentage"
          ? `${row.original.value}%`
          : "-"
    },
    {
      header: "Price Off",
      accessorKey: "price",
      cell: ({ row }) => 
        row.original.discountType === "amount"
          ? `₦${row.original.value}`
          : "-"
    },    
    {
      header: "Date From",
      accessorKey: "dateFrom",
    },
    {
      header: "Date To",
      accessorKey: "dateTo",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Active" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
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
        searchPlaceholder="Search orders"
        length={8}
           //@ts-ignore
        tableType="discount"
        // types={types}
        onFilterChange={onFilterChange}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Discount Product
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{discounts.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default DiscountTable;
