import TanTable, { PaginationData } from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text, Menu, Button, Loader } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { MoreVertical } from "lucide-react";
import {
  useDeleteProuct,
} from "../../../../hooks/backendApis/pos/products";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import useStore from "./addProductStore";
import DeleteProduct from "../categories/modals/deleteProduct";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { FilterValues } from "../../../General/table/reuseableFilter";
interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  onFilterChange: (filters: FilterValues) => void;
  paginationData: PaginationData;
  onPageChange: (page: number) => void;
}

const ProductTable = ({
  products,
  isLoading,
  onFilterChange,
  paginationData,
  onPageChange,
}: ProductTableProps) => {

  const [ sortBy, setSortBy] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);


  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);

    const updatedFilters = {
      ...appliedFilters,
      sortBy: sortKey,
    };

    setAppliedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteProuct(selectedId ?? "");

  // console.log(products)
  const locations = Array.from(
    new Set(
      products
        ?.map((p: any) => p.product?.location?.name)
        ?.filter((name: any) => typeof name === "string")
    )
  );


  const categories = Array.from(
    new Set(
      products
        ?.map((p: any) => p.product?.category?.name)
        ?.filter((name: any) => typeof name === "string")
    )
  );


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

  // const products = Array.isArray(data?.data?.products?.data)
  //   ? data.data.products.data
  //   : [];


  const mappedProducts: TableRowData[] = products.map((product: any) => {
    const stockStatus = product?.stock_status?.toLowerCase() ?? "";

    const isOutOfStock = ["sold out", "sold_out", "out_of_stock", "unavailable"].includes(stockStatus);
    const frontendStatus = isOutOfStock ? "Inactive" : "Active";


    return {
      name: product.name,
      productCode: product.code,
      // location: product.location?.name || "—",
      // category: product.category?.name || "—",
      location: product.product?.location?.name || "—",
      category: product.product?.category?.name || "—",
      sellingPrice: `₦${Number(product.selling_price).toLocaleString()}`,
      stockLevel: product.quantity_available,
      status: frontendStatus,
      image: product.image_path,
      items: product.items ?? "",
      variationID: product.variationID,
      ...product,
      originalStatus: stockStatus, // for debugging
    };
  });




  const { updateForm } = useStore();

  const handleProductEdit = (product: any) => {
    updateForm(product);
  };

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
      accessorKey: "name",
      enableSorting: false, 
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={
              typeof props.row.original.image === "string"
                ? props.row.original.image
                : imageSrc
            }
            alt={props.row.original.name as string}
            radius="md"
            size={40}
          />
          <div className="flex flex-col">
            <Text fw={500} c="black">
              {props.row.original.name}
            </Text>
            <Text fw={500} className="text-[#667185] text-sm">
              {props.row.original.items}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Product Code",
      accessorKey: "productCode",
      enableSorting: false, 
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.productCode}</Text>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      enableSorting: false, 
    },
    {
      header: "Category",
      accessorKey: "category",
      enableSorting: false, 
      cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.category}
        </span>
      ),
    },
    {
      header: "Selling Price",
      accessorKey: "sellingPrice",
      enableSorting: false, 
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      enableSorting: false, 
      cell: (props) => (
        <span className="font-medium text-center">
          {props.row.original.stockLevel}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      enableSorting: false, 
      cell: (props) => {
        const originalStatus = props.row.original.originalStatus;
        const normalizedStatus =
          typeof originalStatus === "string" ? originalStatus.toLowerCase() : "";

        const isInactive = ["sold out", "sold_out", "out_of_stock", "unavailable"].includes(normalizedStatus);
        const frontendStatus = isInactive ? "Inactive" : "Active";

        const statusStyles = isInactive
          ? "bg-red-100 text-red-700"
          : "bg-green-100 text-green-700";

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${statusStyles}`}
          >
            {isInactive ? <UnpaidDot /> : <PaidDot />}
            <span className="ml-2">{frontendStatus}</span>
          </div>
        );
      },
    },




    {
      header: "",
      accessorKey: "action",
      enableSorting: false, 
      cell: (props) => (
        // <Menu shadow="md" width={150} position="bottom-end">
        //   <Menu.Target>
        //     <Button variant="subtle" size="xs" p={1}>
        //       <MoreVertical size={20} className="cursor-pointer" />
        //     </Button>
        //   </Menu.Target>

        //   <Menu.Dropdown>
        //     <Menu.Item>
        //       <Link
        //         to={ROUTES.viewProduct}
        //         state={{ variationID: props.row.original.variationID }}
        //       >
        //         View
        //       </Link>
        //     </Menu.Item>
        //     <Menu.Item>
        //       <Link
        //         to={ROUTES.editProduct}
        //         state={{ variationID: props.row.original.variationID }}
        //         onClick={() => handleProductEdit(props.row.original)}
        //       >
        //         Edit
        //       </Link>
        //     </Menu.Item>
        //     <Menu.Item
        //       color="red"
        //       onClick={() => {
        //         //@ts-ignore
        //         setSelectedId(props.row.original.variationID); // Ensure the correct product is selected
        //         setIsDeleteOpen(true);
        //       }}
        //     >
        //       Delete
        //     </Menu.Item>
        //   </Menu.Dropdown>
        // </Menu>
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <Button variant="subtle" size="xs" p={1}>
              <MoreVertical size={20} className="cursor-pointer" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              to={ROUTES.viewProduct}
              state={{ variationID: props.row.original.variationID }}
            >
              View
            </Menu.Item>

            <Menu.Item
              component={Link}
              to={ROUTES.editProduct}
              state={{ variationID: props.row.original.variationID }}
              onClick={() => handleProductEdit(props.row.original)}
            >
              Edit
            </Menu.Item>

            <Menu.Item
              color="red"
              onClick={() => {
                setSelectedId(
                  typeof props.row.original.variationID === "string" || typeof props.row.original.variationID === "number"
                    ? props.row.original.variationID
                    : null
                );
                setIsDeleteOpen(true);
              }}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

      ),
    },
  ];

  return (
    <main className="relative w-full h-auto py-6 rounded-lg bg-white">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <Loader color="orange" size="lg" />
        </div>
      )}

      <div className="w-full overflow-x-auto">
        <div className="min-w-[1000px]">
          <TanTable
            columnData={columns}
            data={mappedProducts}
            showSearch
            showSortFilter
            showFilter
            searchPlaceholder="Search Product Management"
            onSortChange={handleSortChange}
            activeSort={sortBy}
            length={8}
            //@ts-ignore
            locations={locations}
            //@ts-ignore
            categories={categories}
            tableType="product"
            onFilterChange={onFilterChange}
            serverSidePagination={true}
            paginationData={paginationData}
            onPageChange={onPageChange}
            tableTitle={
              <div className="flex gap-2.5">
                <Text fw={500} size="xl" c="textSecondary.9">
                  Products
                </Text>
                <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                  <Text c="customPrimary.10">{products.length}</Text>
                </div>
              </div>
            }
          />
        </div>
      </div>
      <DeleteProduct
        opened={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDelete}
        id={selectedId}
      />
    </main>
  );
};

export default ProductTable;
