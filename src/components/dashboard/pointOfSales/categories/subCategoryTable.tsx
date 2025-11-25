/* eslint-disable @typescript-eslint/no-explicit-any */
import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { SortOption, TableRowData } from "../../../../types";
import { Button, Loader, Text } from "@mantine/core";
import { useEffect, useState, useMemo } from "react";
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
  refetch: () => void;
}

const sortOptions: SortOption[] = [
  { label: "All", key: "" },
  { label: "Recent", key: "recent" },
  { label: "Oldest", key: "oldest" },
  { label: "A-Z", key: "a-z" },
  { label: "Z-A", key: "z-a" }
];

const SubCategoryTable = ({ subCategories, category, isLoading, refetch }: SubCategoriesTableProps) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState("");
  const deleteMutation = useDeleteSubCategory(selectedId ?? "");
  
  const [localSubCategories, setLocalSubCategories] = useState(() =>
    subCategories.map((subCat) => ({ ...subCat, category }))
  );

  useEffect(() => {
    setLocalSubCategories(subCategories.map((subCat) => ({ ...subCat, category })));
  }, [subCategories, category]);

  const handleOpenDelete = (id: string | number) => {
    setSelectedId(id);
    setIsDeleteOpen(true);
  };

  // Enhanced subcategories with search and sort applied
  const enhancedSubCategories = useMemo(() => {
    let filtered = localSubCategories.map((subCat) => ({
      ...subCat,
      category,
    }));

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((subCat) =>
        subCat.name?.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortKey) {
          case "recent":
            // Most recent first (newest to oldest)
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          
          case "oldest":
            // Oldest first
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          
          case "a-z":
            // Alphabetical A-Z
            return (a.name || "").localeCompare(b.name || "");
          
          case "z-a":
            // Alphabetical Z-A
            return (b.name || "").localeCompare(a.name || "");
          
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [localSubCategories, category, searchQuery, sortKey]);

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
  };

  const handleSortChange = (sort: string) => {
    setSortKey(sort);
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteMutation.mutateAsync();

      refetch();

      notifications.show({
        title: "Sub-category Deleted!",
        message: "This product sub-category has been deleted!",
        color: "red",
      });

      setIsDeleteOpen(false);
      setSelectedId(null);
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
      header: "Division",
      accessorKey: "name",
      cell: ({ row }) => (
        <Text fw={700} c="#101928">
          {row.original.name}
        </Text>
      ),
    },
    {
      header: "Total Products",
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
      accessorKey: "delete",
      cell: ({ row }) => (
        <Button bg="#FFEADF" onClick={() => handleOpenDelete(row.original.id as any)}>
          <Text fw={500} c="red" className="cursor-pointer">
            Delete
          </Text>
        </Button>
      ),
    },
    {
      header: "",
      accessorKey: "view",
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
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      {isLoading ? (
        <div className="w-full h-[300px] flex items-center justify-center bg-white rounded-lg">
          <Loader color="customPrimary.10" size="lg" />
          <Text ml={10} size="md" c="dimmed">
            Loading sub-categories...
          </Text>
        </div>
      ) : (
        <TanTable
          columnData={columns}
          data={enhancedSubCategories}
          showSearch
          showSortFilter
          sortOptions={sortOptions}
          activeSort={sortKey}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          searchPlaceholder="Search sub categories"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Sub-categories
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{enhancedSubCategories.length}</Text>
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