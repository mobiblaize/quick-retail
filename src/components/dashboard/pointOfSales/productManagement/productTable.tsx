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
        searchPlaceholder="search Product"
        //@ts-ignore
        locations={locations}
        categories={categories}
        titleSection={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "16px 24px",
              borderBottom: "1px solid #f1f5f9",
              backgroundColor: "white",
            }}
          >
            {/* Left: Title + Total */}
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
                {paginationData?.total ?? 0}
              </Badge>
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
