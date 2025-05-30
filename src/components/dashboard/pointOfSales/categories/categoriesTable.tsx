import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Loader, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";

interface CategoriesTableProps {
  categories: Array<any>;
  isLoading: boolean;
}

const CategoriesTable = ({ categories, isLoading }: CategoriesTableProps) => {
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
      header: "Category",
      accessorKey: "name",
      cell: ({ row }) => (
        <Text c="textSecondary.9" fw={500}>
          {row.original.name}
        </Text>
      ),
    },
    {
      header: "Total Product",
      accessorKey: "totalProduct",
      cell: ({ row }) => (
        <Text c="textSecondary.9" fw={500}>
          {row.original.total_products}
        </Text>
      ),
    },
    {
      header: "Total Amount",
      accessorKey: "totalAmount",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
   {row.original.total_amount ?? 0}
        </span>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "created_at",
      cell: ({ row }) => {
        const createdAt = row.original.created_at;

        if (typeof createdAt === "string" || typeof createdAt === "number") {
          const dateObj = new Date(createdAt);
          const optionsDate = {
            day: "2-digit",
            month: "short",
            year: "numeric",
          } as const;
          const optionsTime = {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          } as const;

          const datePart = new Intl.DateTimeFormat("en-GB", optionsDate).format(
            dateObj
          );
          const timePart = new Intl.DateTimeFormat("en-GB", optionsTime).format(
            dateObj
          );

          return <Text>{`${datePart}  ${timePart}`}</Text>;
        }

        return <Text>Invalid date</Text>;
      },
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => (
        <Text fw={600} c="" className="cursor-pointer">
          {row.original.is_active ? "Active" : "Inactive"}
        </Text>
      ),
    },
    {
      header: "",
      accessorKey: "action",

      cell: ({ row }) => {
        const navigate = useNavigate();
        const category = row.original;

        return (
          <Text
            fw={600}
            c="customPrimary.10"
            className="cursor-pointer"
            onClick={() =>
              navigate(ROUTES.subCategory, { state: { category } })
            }
          >
            View
          </Text>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading categories...
        </Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={categories}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
         tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Category
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{categories.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CategoriesTable;
