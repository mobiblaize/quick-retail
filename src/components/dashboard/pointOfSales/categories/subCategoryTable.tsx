import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Center, Loader, Text } from "@mantine/core";
import { useState } from "react";
import DeleteSubCategory from "./modals/deleteSubCategory";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { notifications } from "@mantine/notifications";
import { useDeleteSubCategory } from "../../../../hooks/backendApis/pos/categories";

interface SubCategoriesTableProps {
  subCategories: Array<any>;
  category: Array<any>;
  isLoading?: boolean;
  onDeleteSuccess?: () => void;
}

const SubCategoryTable = ({ subCategories, category, isLoading, onDeleteSuccess }: SubCategoriesTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const deleteMutation = useDeleteSubCategory(selectedId ?? "");

  const handleOpenDelete = (id: string | number) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };
  const enhancedSubCategories = subCategories.map((subCat) => ({
    ...subCat,
    category, 
  }));

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteMutation.mutateAsync();
      notifications.show({
        title: "Sub-category Deleted!",
        message: "This product sub-category has been deleted!",
        color: "red",
      });
      setIsDeleteOpen(false);
      setSelectedId(null);

      // Tell parent to refetch
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to delete sub-category",
        color: "red",
      });
    }
  };
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
      header: "Division",
      accessorKey: "name",
      cell: ({ row }) => (
        <Text fw={700} c="#101928">
          {row.original.name}
        </Text>
      ),
    },
    {
      header: "Total Product",
      accessorKey: "totalProduct",
      cell: ({ row }) => (
        <Text fw={300} c="#101928">
          {row.original.total_quantity}
        </Text>
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
      header: "",
      accessorKey: "action",
      cell: ({ row }) => (
        //@ts-ignore
        <button onClick={() => handleOpenDelete(row.original.id)}>
          <Text fw={600} c="#1D2939" className="cursor-pointer">
            Delete
          </Text>
        </button>
      ),
    },
 
    {
      header: "",
      accessorKey: "action",
      cell: ({ row }) => (
        
        <Link
          to={ROUTES.categoryCollection}
          state={{
            category: row.original?.category,
            subCategory: row.original,
          }}
        >
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    }
  ]
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <Center className="h-64">
          <Loader color="customPrimary.10" size="lg" />
        </Center>
      ) : (
        <TanTable
          columnData={columns}
          data={enhancedSubCategories}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Sub-categories
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{subCategories.length}</Text>
              </div>
            </div>
          }
        />
      )}

      <DeleteSubCategory
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDelete}
        subCategoryId={selectedId}
      />
    </main>
  );
};


export default SubCategoryTable;
