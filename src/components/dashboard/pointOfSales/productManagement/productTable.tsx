// import TanTable, { PaginationData } from "../../../General/table";
// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Avatar, Text, Menu, Button, Loader } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import imageSrc from "../../../../assets/images/productIMG.png";
// import { MoreVertical } from "lucide-react";
// import {
//   useDeleteProuct,
// } from "../../../../hooks/backendApis/pos/products";
// import { Link } from "react-router";
// import { ROUTES } from "../../../../constants/routes";
// import useStore from "./addProductStore";
// import DeleteProduct from "../categories/modals/deleteProduct";
// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import { FilterValues } from "../../../General/table/reuseableFilter";
// interface ProductTableProps {
//   products: any[];
//   isLoading: boolean;
//   onFilterChange: (filters: FilterValues) => void;
//   paginationData: PaginationData;
//   onPageChange: (page: number) => void;
// }

// const ProductTable = ({
//   products,
//   isLoading,
//   onFilterChange,
//   paginationData,
//   onPageChange,
// }: ProductTableProps) => {

//   const [sortBy, setSortBy] = useState<string>("");
//   const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);


//   const handleSortChange = (sortKey: string) => {
//     setSortBy(sortKey);

//     const updatedFilters = {
//       ...appliedFilters,
//       sortBy: sortKey,
//     };

//     setAppliedFilters(updatedFilters);
//     onFilterChange(updatedFilters);
//   };

//   const [selectedId, setSelectedId] = useState<string | number | null>(null);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
//   const deleteMutation = useDeleteProuct(selectedId ?? "");

//   // console.log(products)
//   const locations = Array.from(
//     new Set(
//       products
//         ?.map((p: any) => p.product?.location?.name)
//         ?.filter((name: any) => typeof name === "string")
//     )
//   );


//   const categories = Array.from(
//     new Set(
//       products
//         ?.map((p: any) => p.product?.category?.name)
//         ?.filter((name: any) => typeof name === "string")
//     )
//   );


//   const handleDelete = async () => {
//     if (!selectedId) return;

//     try {
//       await deleteMutation.mutateAsync();
//       notifications.show({
//         title: "Product Deleted!",
//         message: "This product has been successfully deleted!",
//         color: "red",
//       });
//       setIsDeleteOpen(false);
//       setSelectedId(null);
//       // refetch(); // <--- Refresh data
//     } catch (error) {
//       notifications.show({
//         title: "Error",
//         message:
//           (error && typeof error === "object" && "message" in error
//             ? (error as any).message
//             : "Failed to delete product"),
//         color: "red",
//       });
//     }
//   };

//   // const products = Array.isArray(data?.data?.products?.data)
//   //   ? data.data.products.data
//   //   : [];


//   const mappedProducts: TableRowData[] = products.map((product: any) => {
//     const stockStatus = product?.stock_status?.toLowerCase() ?? "";

//     const isOutOfStock = ["sold out", "sold_out", "out_of_stock", "unavailable"].includes(stockStatus);
//     const frontendStatus = isOutOfStock ? "Inactive" : "Active";


//     return {
//       name: product.name,
//       productCode: product.code,
//       // location: product.location?.name || "—",
//       // category: product.category?.name || "—",
//       location: product.product?.location?.name || "—",
//       category: product.product?.category?.name || "—",
//       sellingPrice: `₦${Number(product.selling_price).toLocaleString()}`,
//       stockLevel: product.quantity_available,
//       status: frontendStatus,
//       image: product.image_path,
//       items: product.items ?? "",
//       variationID: product.variationID,
//       ...product,
//       originalStatus: stockStatus, // for debugging
//     };
//   });





//   const { updateForm } = useStore();

//   const handleProductEdit = (product: any) => {
//     updateForm(product);
//   };

//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Name",
//       accessorKey: "name",
//       enableSorting: false,
//       cell: (props) => (
//         <div className="flex items-center gap-3">
//           <Avatar
//             src={
//               typeof props.row.original.image === "string"
//                 ? props.row.original.image
//                 : imageSrc
//             }
//             alt={props.row.original.name as string}
//             radius="md"
//             size={40}
//           />
//           <div className="flex flex-col">
//             <Text fw={500} c="black">
//               {props.row.original.name}
//             </Text>
//             <Text fw={500} className="text-[#667185] text-sm">
//               {props.row.original.items}
//             </Text>
//           </div>
//         </div>
//       ),
//     },
//     {
//       header: "Product Code",
//       accessorKey: "productCode",
//       enableSorting: false,
//       cell: (props) => (
//         <Text c="textSecondary.7">{props.row.original.productCode}</Text>
//       ),
//     },
//     {
//       header: "Location",
//       accessorKey: "location",
//       enableSorting: false,
//     },
//     {
//       header: "Category",
//       accessorKey: "category",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
//           {row.original.category}
//         </span>
//       ),
//     },
//     {
//       header: "Selling Price",
//       accessorKey: "sellingPrice",
//       enableSorting: false,
//     },
//     {
//       header: "Stock Level",
//       accessorKey: "stockLevel",
//       enableSorting: false,
//       cell: (props) => (
//         <span className="font-medium text-center">
//           {props.row.original.stockLevel}
//         </span>
//       ),
//     },
//     {
//       header: "Status",
//       accessorKey: "status",
//       enableSorting: false,
//       cell: (props) => {
//         const originalStatus = props.row.original.originalStatus;
//         const normalizedStatus =
//           typeof originalStatus === "string" ? originalStatus.toLowerCase() : "";

//         const isInactive = ["sold out", "sold_out", "out_of_stock", "unavailable"].includes(normalizedStatus);
//         const frontendStatus = isInactive ? "Inactive" : "Active";

//         const statusStyles = isInactive
//           ? "bg-red-100 text-red-700"
//           : "bg-green-100 text-green-700";

//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${statusStyles}`}
//           >
//             {isInactive ? <UnpaidDot /> : <PaidDot />}
//             <span className="ml-2">{frontendStatus}</span>
//           </div>
//         );
//       },
//     },




//     {
//       header: "",
//       accessorKey: "action",
//       enableSorting: false,
//       cell: (props) => (

//         <Menu shadow="md" width={150} position="bottom-end">
//           <Menu.Target>
//             <Button variant="subtle" size="xs" p={1}>
//               <MoreVertical size={20} className="cursor-pointer" />
//             </Button>
//           </Menu.Target>

//           <Menu.Dropdown>
//             <Menu.Item
//               component={Link}
//               to={ROUTES.viewProduct}
//               state={{ variationID: props.row.original.variationID }}
//             >
//               View
//             </Menu.Item>

//             <Menu.Item
//               component={Link}
//               to={ROUTES.editProduct}
//               state={{ variationID: props.row.original.variationID }}
//               onClick={() => handleProductEdit(props.row.original)}
//             >
//               Edit
//             </Menu.Item>

//             <Menu.Item
//               color="red"
//               onClick={() => {
//                 setSelectedId(
//                   typeof props.row.original.variationID === "string" || typeof props.row.original.variationID === "number"
//                     ? props.row.original.variationID
//                     : null
//                 );
//                 setIsDeleteOpen(true);
//               }}
//             >
//               Delete
//             </Menu.Item>
//           </Menu.Dropdown>
//         </Menu>

//       ),
//     },
//   ];

//   return (
//     <main className="relative w-full h-auto py-6 rounded-lg bg-white mt-[2em]">
//       {isLoading && (
//         <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
//           <Loader color="orange" size="lg" />
//         </div>
//       )}

//             <TanTable
//               columnData={columns}
//               data={mappedProducts}
//               showSearch
//               showSortFilter
//               showFilter
//               searchPlaceholder="Search Product Management"
//               onSortChange={handleSortChange}
//               activeSort={sortBy}
//               length={8}
//               locations={locations}
//               categories={categories}
//               tableType="product"
//               onFilterChange={onFilterChange}
//               serverSidePagination={true}
//               paginationData={paginationData}
//               onPageChange={onPageChange}
//               tableTitle={
//                 <div className="flex gap-2.5 flex-wrap items-center">
//                   <Text
//                     fw={500}
//                     size="xl"
//                     c="textSecondary.9"
//                     className="text-sm sm:text-base md:text-xl"
//                   >
//                     Products
//                   </Text>
//                   <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-2 sm:px-3">
//                     <Text c="customPrimary.10" className="text-xs sm:text-sm">
//                       {paginationData?.total}
//                     </Text>
//                   </div>
//                 </div>
//               }
//             />



//       <DeleteProduct
//         opened={isDeleteOpen}
//         onClose={() => setIsDeleteOpen(false)}
//         handleDelete={handleDelete}
//         id={selectedId}
//       />
//     </main>
//   );
// };

// export default ProductTable;


import {
  Table,
  Pagination,
  Loader,
  Text,
  Box,
  Badge,
  ActionIcon,
  Menu,
  Avatar,
  Group,
} from "@mantine/core"
import { MoreVertical } from "lucide-react"
import { useState } from "react"
import useStore from "./addProductStore"
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { notifications } from "@mantine/notifications";
import { useDeleteProuct } from "../../../../hooks/backendApis/pos/products";
import DeleteProduct from "../categories/modals/deleteProduct";
import ProductFilters from "./productFilters";

interface ApiProduct {
  id: string
  variationID: string
  name: string
  sku: string
  ean: string
  code: string
  cost_price: string
  selling_price: string
  quantity: number
  reorder_level: string
  image_path: string
  status: string
  stock_status: string
  product: {
    productID: string
    product_name: string
    category: {
      id: string
      name: string
    }
    location: {
      id: string
      name: string
      locationID: string
    }
  }
  variation_attributes: Array<{
    product_variation_id: number
    option_type: string
    option_value: string
  }>
}

interface PaginationData {
  current_page: number
  last_page: number
  per_page?: number
  total?: number
}

interface ProductTableProps {
  products: ApiProduct[]
  isLoading: boolean
  page?: number
  totalPages?: number
  paginationData?: PaginationData
  onPageChange: (page: number) => void
  totalProducts?: number
}

// type Filters = {
//   searchTerm: string;
//   sortBy: string;
// };

export default function ProductTable({
  products,
  isLoading,
  paginationData,
  onPageChange,
  totalProducts = 0,
}: ProductTableProps) {
  const { updateForm } = useStore()
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteProuct(selectedId ?? "");

  const handleFilterChange = (filters: any) => {
    console.log("Updated filters:", filters);
    // call API or update table here
  };

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      await deleteMutation.mutateAsync();
      notifications.show({
        title: "Product Deleted!",
        message: "This product has been successfully deleted!",
        color: "red",
      });
      setIsDeleteOpen(false);
      setSelectedId(null);
      // refetch(); // <--- Refresh data
    } catch (error) {
      notifications.show({
        title: "Error",
        message:
          (error && typeof error === "object" && "message" in error
            ? (error as any).message
            : "Failed to delete product"),
        color: "red",
      });
    }
  };

  // Helper function to format price
  const formatPrice = (price: string): string => {
    const numPrice = Number.parseFloat(price)
    return numPrice > 0 ? `₦ ${numPrice.toLocaleString()}` : "₦ 0"
  }

  // --- STATUS HELPERS ---
  const normalizeStatus = (s?: string) =>
    (s ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_")

  const OUT_OF_STOCK_STATUSES = new Set([
    "sold_out",
    "out_of_stock",
    "unavailable",
  ])

  const computeFrontendStatus = (p: ApiProduct) => {
    const normalized = normalizeStatus(p.stock_status)
    const outByFlag = OUT_OF_STOCK_STATUSES.has(normalized)
    const outByQty = (p.quantity ?? 0) <= 0
    return outByFlag || outByQty ? "Inactive" : "Active"
  }


  const getStatusBadge = (product: ApiProduct) => {
    const raw = computeFrontendStatus(product)
    const formattedStatus =
      raw && raw.length > 0
        ? raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
        : raw

    const isActive = formattedStatus.toLowerCase() === "active"

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
            flexDirection: "row", // ensure icon + text are side-by-side
            alignItems: "center",
            gap: "4px",
            textTransform: "none", // IMPORTANT: prevent uppercase transform
          },
          // inner: {
          //   display: "flex",
          //   flexDirection: "row",
          //   alignItems: "center",
          //   gap: "4px",
          //   textTransform: "none",
          // },
        }}
      >
        {/* If you want icons, uncomment and import PaidDot/UnpaidDot */}
        {/* {isActive ? <PaidDot /> : <UnpaidDot />} */}
        {formattedStatus}
      </Badge>
    )
  }

  const handleProductEdit = (product: ApiProduct) => {
    updateForm({
      id: product.id,
      variationID: product.variationID,
      name: product.name,
      sku: product.sku,
      ean: product.ean,
      code: product.code,
      cost_price: product.cost_price,
      selling_price: product.selling_price,
      quantity: product.quantity.toString(),
      reorder_level: product.reorder_level,
      image_path: product.image_path,
      status: computeFrontendStatus(product), // use derived status
      stock_status: product.stock_status,
      productID: product.product.productID,
      product_name: product.product.product_name,
      category_id: product.product.category.id,
      location_id: product.product.location.id,
      variation_attributes: product.variation_attributes,
      category: product.product.category.name,
      sub_category_id: "",
      short_description: "",
      long_description: "",
      has_variations: 0,
      tags: "",
      promotional_price: "",
      promotional_start_date: "",
      promotional_end_date: "",
      safety_instructions: "",
      certificates: "",
      image: null,
      variations: [],
      updated_at: "",
      location: product.product.location.name,
    })
  }

  if (isLoading) {
    return (
      <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <Loader size="lg" />
      </Box>
    )
  }

  if (!products || products.length === 0) {
    return (
      <Box style={{ textAlign: "center", padding: "2rem" }}>
        <Text size="lg" c="dimmed">
          No products found
        </Text>
      </Box>
    )
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
        marginTop: "2em",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Text size="xl" fw={600} style={{ color: "#1e293b" }}>
            Products
          </Text>
          <Badge
            variant="filled"
            styles={{
              root: {
                backgroundColor: "#fed7aa",
                color: "#ea580c",
                fontWeight: 600,
                fontSize: "12px",
                height: "20px",
                minHeight: "20px",
                paddingLeft: "8px",
                paddingRight: "8px",
                textTransform: "none",
              },
            }}
          >
            {totalProducts}
          </Badge>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* <TextInput
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftSection={<Search size={16} style={{ color: "#94a3b8" }} />}
            styles={{
              root: { width: "280px" },
              input: {
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "14px",
                height: "36px",
                "&:focus": {
                  borderColor: "#f97316",
                  boxShadow: "0 0 0 1px #f97316",
                },
              },
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Text
              size="sm"
              fw={500}
              style={{ color: "#64748b", whiteSpace: "nowrap" }}
            >
              Sort By
            </Text>
            <Select
              value={sortBy}
              onChange={(value) => setSortBy(value || "all")}
              data={[
                { value: "all", label: "All" },
                { value: "name", label: "Name" },
                { value: "price", label: "Price" },
                { value: "stock", label: "Stock" },
              ]}
              styles={{
                root: { width: "80px" },
                input: {
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  fontSize: "14px",
                  height: "36px",
                  "&:focus": {
                    borderColor: "#f97316",
                    boxShadow: "0 0 0 1px #f97316",
                  },
                },
              }}
            />
          </div>

          <Button
            leftSection={<Plus size={16} />}
            styles={{
              root: {
                backgroundColor: "#f97316",
                border: "none",
                borderRadius: "6px",
                height: "36px",
                fontSize: "14px",
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#ea580c",
                },
              },
            }}
          >
            Add
          </Button> */}
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>
      </div>

      <Box>
        <Table.ScrollContainer minWidth={800}>
          <Table striped={false} highlightOnHover withTableBorder={false}>
            <Table.Thead>
              <Table.Tr style={{ backgroundColor: "#f8fafc" }}>
                <Table.Th
                  style={{
                    fontWeight: 500,
                    color: "#64748b",
                    padding: "12px 16px",
                    fontSize: "13px",
                  }}
                >
                  Name
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Product Code
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Location
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Category
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Selling Price
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Stock Level
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Status
                </Table.Th>
                <Table.Th style={{ fontWeight: 500, color: "#64748b", fontSize: "13px" }}>
                  Action
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((product) => (
                <Table.Tr
                  key={product.id}
                  styles={{
                    tr: {
                      "&:hover": { backgroundColor: "#f8fafc" },
                      borderBottom: "1px solid #f1f5f9",
                    },
                  }}
                >
                  <Table.Td style={{ padding: "12px 16px" }}>
                    <Group gap="sm">
                      <Avatar
                        src={product.image_path}
                        size={32}
                        radius="sm"
                        styles={{
                          root: {
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #e2e8f0",
                          },
                        }}
                      >
                        {product.product.product_name.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>
                        <Text
                          size="sm"
                          fw={500}
                          lineClamp={1}
                          style={{ color: "#1e293b" }}
                        >
                          {product.product.product_name}
                        </Text>
                        <Text size="xs" c="dimmed" lineClamp={1}>
                          {product.name !== product.product.product_name
                            ? product.name
                            : product.variation_attributes.length > 0
                              ? product.variation_attributes
                                .map((attr) => attr.option_value)
                                .join(" | ")
                              : "Green | Small"}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" ff="monospace" style={{ color: "#475569" }}>
                      {product.code}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ color: "#475569" }}>
                      {product.product.location.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ color: "#475569" }}>
                      {product.product.category.name}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" fw={500} style={{ color: "#1e293b" }}>
                      {formatPrice(product.selling_price)}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ color: "#475569" }}>
                      {product.quantity}
                    </Text>
                  </Table.Td>
                  <Table.Td>{getStatusBadge(product)}</Table.Td>
                  <Table.Td>
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
                          state={{ variationID: product.variationID }}
                        >
                          View
                        </Menu.Item>
                        <Menu.Item
                          component={Link}
                          to={ROUTES.editProduct}
                          state={{ variationID: product.variationID }}
                          onClick={() => handleProductEdit(product)}
                        >
                          Edit
                        </Menu.Item>
                        <Menu.Item
                          color="red"
                          onClick={() => {
                            setSelectedId(
                              typeof product.variationID === "string" || typeof product.variationID === "number"
                                ? product.variationID
                                : null
                            );
                            setIsDeleteOpen(true);
                          }}
                        >
                          Delete
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {paginationData && paginationData.last_page > 1 && (
          <Box
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "16px 24px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <Pagination
              total={paginationData.last_page}
              value={paginationData.current_page}
              onChange={onPageChange}
              size="sm"
              styles={{
                control: {
                  "&[data-active]": {
                    backgroundColor: "#f97316",
                    borderColor: "#f97316",
                    color: "white",
                  },
                  "&:hover:not([data-active])": {
                    backgroundColor: "#f8fafc",
                  },
                },
              }}
            />
          </Box>
        )}
      </Box>
      <DeleteProduct
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDelete}
        id={selectedId}
      />
    </div>
  )
}

