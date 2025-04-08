import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { allCategories } from "../../../../utils/mockData";

const CategoriesTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <Text c="textSecondary.9" fw={500}>
          {row.original.category}
        </Text>
      ),
    },
    {
      header: "Total Product",
      accessorKey: "totalProduct",
    },
    {
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.totalAmount}
        </span>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "dateModified",
    },
    {
      header: "Status",
      accessorKey: "action",
      cell: () => (
        <Text fw={600} c="customPrimary.10" className="cursor-pointer">
          View Order
        </Text>
      ),
    },
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={allCategories}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Category
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{allCategories.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CategoriesTable;
