import { Text, Avatar, Group, Badge, Menu, ActionIcon } from "@mantine/core";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import DeleteProduct from "../categories/modals/deleteProduct";
import { useState } from "react";
import { useDeleteProuct } from "../../../../hooks/backendApis/pos/products";
import GenericTable, { PaginationData } from "../../../General/genericTable";
import useStore from "./addProductStore";
import { FilterValues } from "../../../General/table/reuseableFilter";

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
  image_path: string[];
  status: string;
  stock_status: string;

  product: {
    productID: string;
    product_name: string;
    category: { id: string; name: string };
    location: { id: string; name: string; locationID: string };
  };
  variation_attributes: Array<{
    product_variation_id: number;
    option_type: string;
    option_value: string;
  }>;
}

interface ProductTableProps {
  products: ApiProduct[];
  isLoading: boolean;
  paginationData?: PaginationData;
  onPageChange: (page: number) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  activeSort?: string;
  setSort?: (sortBy: string) => void;
  onFilterChange: (filters: FilterValues) => void;
  filters: FilterValues; 
}

export default function ProductTable({
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
}: ProductTableProps) {
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteProuct(selectedId ?? "");

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteMutation.mutateAsync();
    setIsDeleteOpen(false);
  };

  const formatPrice = (price: string) =>
    `₦ ${Number.parseFloat(price).toLocaleString()}`;

  const { updateForm } = useStore();

  const handleProductEdit = (product: any) => {
    updateForm(product);
  };

 

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
  

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (p: ApiProduct) => (
        <Group gap="sm">
          <Avatar
            src={
              Array.isArray(p.image_path) ? p.image_path[0] ?? "" : p.image_path
            }
            size={32}
            radius="sm"
            styles={{
              root: {
                backgroundColor: "#f1f5f9",
                border: "1px solid #e2e8f0",
              },
            }}
          >
            {p.product.product_name.charAt(0).toUpperCase()}
          </Avatar>

          <div>
            <Text size="sm" fw={500}>
              {p.product.product_name}
            </Text>
            <Text size="xs" c="dimmed">
              {p.name}
            </Text>
          </div>
        </Group>
      ),
    },
    {
      key: "code",
      header: "Product Code",
      render: (p: ApiProduct) => (
        <Text size="sm" ff="monospace" style={{ color: "#475569" }}>
          {p.code}
        </Text>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (p: ApiProduct) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {p.product.location.name}
        </Text>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (p: ApiProduct) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {p.product.category.name}
        </Text>
      ),
    },
    {
      key: "price",
      header: "Selling Price",
      render: (p: ApiProduct) => (
        <Text size="sm" fw={500} style={{ color: "#1e293b" }}>
          {formatPrice(p.selling_price)}
        </Text>
      ),
    },
    {
      key: "stock",
      header: "Stock Level",
      render: (p: ApiProduct) => (
        <Text size="sm" style={{ color: "#475569" }}>
          {p.quantity}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p: ApiProduct) => {
        const isActive = (p.quantity ?? 0) > 0;
        const formattedStatus = isActive ? "Active" : "Inactive";

        return (
          <Badge
            color={isActive ? "green" : "red"}
            variant="light"
            size="sm"
            styles={{
              root: {
                backgroundColor: isActive ? "#dcfce7" : "#fee2e2",
                color: isActive ? "#166534" : "#dc2626",
                fontWeight: 500,
                border: "none",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "4px",
                textTransform: "none",
              },
            }}
          >
            {formattedStatus}
          </Badge>
        );
      },
    },
  ];

  const actions = (p: ApiProduct) => (
    <Menu shadow="md" width={160}>
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray" size="sm">
          <MoreVertical size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          component={Link}
          to={ROUTES.viewProduct}
          state={{ variationID: p.variationID }}
        >
          View
        </Menu.Item>
        <Menu.Item
          component={Link}
          to={ROUTES.editProduct}
          state={{ variationID: p.variationID }}
          onClick={() => handleProductEdit(p)}
        >
          Edit
        </Menu.Item>
        <Menu.Item
          color="red"
          onClick={() => {
            setSelectedId(p.variationID);
            setIsDeleteOpen(true);
          }}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );

  return (
    <>
      <GenericTable
        enableSearch ={true}
       enableSort={true}
        data={products}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        columns={columns}
        actions={actions}
        emptyMessage="No products found"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        onSortChange={setSort}
        onFilterChange={onFilterChange}
        showFilter={true}
        tableType="product"
        searchPlaceholder="search products"
        filters={filters}    
        //@ts-ignore
        locations={locations}
        categories={categories}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">Products</Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10"> {paginationData?.total}</Text>
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
