/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Text, Loader, Menu, ActionIcon, Group } from "@mantine/core";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import GenericTable from "../../../General/genericTable";
import { MoreVertical, Eye, Pencil, Trash } from "lucide-react";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

// Ensure this matches your API response structure
interface CategoryRow {
  id: string | number;
  name: string;
  total_products: number;
  total_amount: number;
  created_at: string | number;
}

interface CategoriesTableProps {
  categories: CategoryRow[];
  isLoading: boolean;
  paginationData?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
}

const CategoriesTable = ({
  categories,
  isLoading,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  setSort,
}: CategoriesTableProps) => {
  const navigate = useNavigate();

  // --- Modal State Management ---
  const [selectedCategory, setSelectedCategory] = useState<CategoryRow | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Helper to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const columns = [
    {
      key: "name",
      header: "Category",
      render: (row: CategoryRow) => (
        <Text c="black" fw={500} size="sm">
          {row.name}
        </Text>
      ),
    },
    {
      key: "total_products",
      header: "Total Products",
      render: (row: CategoryRow) => (
        <Text c="black" fw={400} size="sm">
          {row.total_products}
        </Text>
      ),
    },
    {
      key: "total_amount",
      header: "Total Amount",
      render: (row: CategoryRow) => (
        <Text c="black" size="sm" fw={600}>
          {formatCurrency(row.total_amount ?? 0)}
        </Text>
      ),
    },
    {
      key: "created_at",
      header: "Date Modified",
      render: (row: CategoryRow) => {
        const createdAt = row.created_at;

        if (typeof createdAt === "string" || typeof createdAt === "number") {
          const dateObj = new Date(createdAt);
          const datePart = new Intl.DateTimeFormat("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }).format(dateObj);

          const timePart = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }).format(dateObj);

          return (
            <Text c="dimmed" size="sm">
              {`${datePart} ${timePart}`}
            </Text>
          );
        }
        return <Text c="dimmed" size="sm">-</Text>;
      },
    },
    {
      key: "action",
      header: "Action",
      render: (row: CategoryRow) => (
        <Group gap={0} justify="flex-start">
          <Menu shadow="md" width={150} position="bottom-end">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray">
                <MoreVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<Eye size={16} />}
                onClick={() =>
                  navigate(ROUTES.subCategory, { state: { category: row } })
                }
              >
                View
              </Menu.Item>

              <Menu.Item
                leftSection={<Pencil size={16} />}
                onClick={() => {
                  setSelectedCategory(row);
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Menu.Item>

              <Menu.Item
                color="red"
                leftSection={<Trash size={16} />}
                onClick={() => {
                  setSelectedCategory(row);
                  setIsDeleteOpen(true);
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10 min-h-[300px]">
        <Loader size="lg" color="orange" variant="dots" />
        <Text ml={10} size="md" c="dimmed">
          Loading categories...
        </Text>
      </div>
    );
  }

  return (
    <>
      <GenericTable<CategoryRow>
        columns={columns}
        data={categories}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        enableSearch={true}
        enableSort={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        searchPlaceholder="Search categories"
        titleSection={
          <div className="flex gap-2.5 items-center">
            <Text fw={600} size="xl" c="black">
              All Categories
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center justify-center px-3 py-1">
              <Text c="#FF6B00" size="xs" fw={700}>
                {paginationData?.total ?? 0}
              </Text>
            </div>
          </div>
        }
      />

      {/* --- Modals Integration --- */}
      <EditCategoryModal
        opened={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        category={selectedCategory}
      />
    </>
  );
};

export default CategoriesTable;