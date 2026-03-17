/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, Avatar, Group, Badge } from "@mantine/core";
import { Check, X } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import DeleteProduct from "../categories/modals/deleteProduct";
import { useEffect, useState } from "react";
import { useDeleteProuct } from "../../../../hooks/backendApis/pos/products";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { showNotification } from "@mantine/notifications";

interface ApiProduct {
  id: string;
  variationID: string;
  name: string;
  sku: string;
  ean: string;
  code: string;
  cost_price: string;
  selling_price: string;
  quantity: number;
  reorder_level: string;
  image_path: string;
  status: "draft";
  stock_status: string;
  draft: number;

  product: {
    productID: string;
    product_name: string;
    image_path?: string;
    category: { id: string; name: string };
    location: { id: string; name: string; locationID: string };
  };
  variation_attributes: Array<{
    product_variation_id: number;
    option_type: string;
    option_value: string;
  }>;
}

interface DraftTableProps {
  readonly products: ApiProduct[];
  readonly isLoading: boolean;
  readonly paginationData?: PaginationData;
  readonly onPageChange: (page: number) => void;
  readonly searchTerm?: string;
  readonly setSearchTerm?: (value: string) => void;
  readonly activeSort?: string;
  readonly setSort?: (sortBy: string) => void;
  readonly onFilterChange: (filters: FilterValues) => void;
  readonly filters: FilterValues;
}

export default function DraftTable({
  products,
  isLoading,
  paginationData,
  onPageChange,
  searchTerm,
  setSearchTerm,
  activeSort,
  onFilterChange,
  setSort,
  filters,
}: DraftTableProps) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteProuct(selectedId ?? "");
  const[localProducts, setLocalProducts] = useState<ApiProduct[]>(products);

  const locations = Array.from(
    new Set(
      products
        ?.map((p: any) => p.product?.location?.name)
        .filter(
          (name: string | undefined): name is string => typeof name === "string"
        )
    )
  );

  const categories = Array.from(
    new Set(
      products
        ?.map((p: any) => p.product?.category?.name)
        .filter(
          (name: string | undefined): name is string => typeof name === "string"
        )
    )
  );

  useEffect(() => {
    setLocalProducts(products);
  }, [products]);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteMutation.mutateAsync();

      // Remove the deleted draft from the local list immediately
      setLocalProducts((prev) =>
        prev.filter((item) => item.variationID !== selectedId)
      );

      // Close modal
      setIsDeleteOpen(false);

      // Show success toast
      showNotification({
        title: "Draft Deleted",
        message: "The draft product has been removed successfully.",
        color: "green",
        icon: <Check size={16} />,
      });
    } catch (error) {
      console.error(error);
      showNotification({
        title: "Deletion Failed",
        message: "An error occurred while deleting the draft.",
        color: "red",
        icon: <X size={16} />,
      });
    }
  };

  const columns =[
    {
      key: "name",
      header: "Name",
      render: (p: ApiProduct) => (
        <Group gap="sm">
          <Avatar
            src={
              p.image_path
                ? (() => {
                    const images = p.image_path
                      .split(",")
                      .map((url: string) => url.trim())
                      .filter(Boolean);
                    return images[1] ?? images[0] ?? "";
                  })()
                : p.product?.image_path || ""
            }
            size={36}
            radius="sm"
            styles={{
              root: {
                backgroundColor: "#f1f5f9",
                border: "1px solid #e2e8f0",
              },
            }}
          >
            {p.product?.product_name?.charAt(0).toUpperCase() || p.name?.charAt(0).toUpperCase()}
          </Avatar>

          <Text c="#1e293b" fw={500} size="sm">
            {p.product?.product_name || p.name}
          </Text>
        </Group>
      ),
    },
    {
      key: "variants",
      header: "Variants",
      render: (p: ApiProduct) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {p.variation_attributes && p.variation_attributes.length > 0
            ? p.variation_attributes.length
            : "-"}
        </Text>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (p: ApiProduct) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {p.product?.location?.name || "-"}
        </Text>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (p: ApiProduct) => (
        <Badge
          variant="light"
          size="md"
          radius="sm"
          styles={{
            root: {
              backgroundColor: "#f1f5f9",
              color: "#475569",
              fontWeight: 500,
              textTransform: "capitalize",
              border: "none",
            },
          }}
        >
          {p.product?.category?.name || "-"}
        </Badge>
      ),
    },
  ];

  // Using inline text actions to match Figma rather than the menu dropdown
  const actions = (p: ApiProduct) => (
    <Group gap="xl">
      <Text
        component={Link}
        to={`${ROUTES.editProduct}/${p.product?.productID}`}
        fw={600}
        size="sm"
        c="#1e293b"
        style={{ cursor: "pointer" }}
      >
        Edit
      </Text>
      <Text
        fw={600}
        size="sm"
        c="#dc2626"
        style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedId(p.variationID);
          setIsDeleteOpen(true);
        }}
      >
        Delete
      </Text>
    </Group>
  );

  return (
    <>
      <GenericTable
        enableSearch={true}
        enableSort={true}
        data={localProducts}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        columns={columns}
        actions={actions}
        emptyMessage="No drafts found"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        onFilterChange={onFilterChange}
        showFilter={true}
        tableType="draft"
        searchPlaceholder="Search draft"
        filters={filters}
        locations={locations}
        categories={categories}
        titleSection={
          <div className="flex gap-2.5 items-center">
            <Text fw={600} size="xl" c="#1e293b">
              Drafts
            </Text>
            <div className="bg-[#fff3ed] rounded-full flex items-center py-0.5 px-3">
              <Text size="sm" fw={500} c="#f97316">
                {paginationData?.total || 0}
              </Text>
            </div>
          </div>
        }
      />

      <DeleteProduct
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDelete}
        id={selectedId}
      />
    </>
  );
}