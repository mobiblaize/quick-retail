import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import TanTable from "../../../General/table";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { TableRowData } from "../../../../types";
import { notifications } from "@mantine/notifications";
import { useFetchSubCategory } from "../../../../hooks/backendApis/pos/categories";
import DeleteProduct from "./modals/deleteProduct";
import { useDeleteProuct } from "../../../../hooks/backendApis/pos/products";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { formatDate } from "../../../../utils/helpers";

interface CategoriesProductTableProps {
  subCategoryId: number | string;
}

const CategoriesProductTable = ({
  subCategoryId,
}: CategoriesProductTableProps) => {
  const { data, refetch } = useFetchSubCategory(subCategoryId, false);

  const products = data?.data?.products || [];


  useEffect(() => {
    if (!products) return;

    const flattenedVariations = products.flatMap((product: any) => {
      if (
        !Array.isArray(product.product_variations) ||
        product.product_variations.length === 0
      ) {
        console.warn(
          "Skipping product due to missing/empty variations:",
          product
        );
        return [];
      }

      return product.product_variations.map((variation: any) => ({
        id: variation.variationID,
        productID: product.productID,
        product_name: variation.name || product.product_name || "Unnamed",
        total_quantity: variation.quantity_available || 0, 
        amount: `₦${Number(variation.selling_price).toLocaleString()}`,
        status: variation.status === "active" ? "Active" : "Inactive",
        updated_at: product.updated_at || "",
      }));
    });

    setTableData(flattenedVariations);
  }, [products]);

  const [tableData, setTableData] = useState<typeof products>([]);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteProuct(selectedId ?? "");


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
      refetch();
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error?.message || "Failed to delete product",
        color: "red",
      });
    }
  };

  const columns: ColumnDef<TableRowData>[] = [
    
    {
      header: "Product Name",
      accessorKey: "productName",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.product_name}
          </Text>
        </div>
      ),
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
      cell: (props) => {
        const quantity = props.row.original.total_quantity;
    
        // @ts-ignore
        const color = quantity < 10 ? "red" : "blue";
    
        return (
          <div className="flex flex-col">
            <Text fw={500} c={color}>
              {quantity} left
            </Text>
          </div>
        );
      },
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (props) => (
        <Text c="#1D2739" fw={500} className="text-sm font-medium">
        {props.row.original.amount}
        </Text>
      ),
    },

    {
      header: "Date Modified",
      accessorKey: "dateCreated",
      cell: (props) => (
        <Text c="#1D2739" fw={500} className="text-sm font-medium">
          {formatDate(String(props.row.original.updated_at))}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Active"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Active" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
   
   

    {
      header: "",
      accessorKey: "action2",
      cell: (props) => (
        <Link
          to={ROUTES.viewProduct}
          state={{ variationID: props.row.original.id }}
        >
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <div>
      <main className="w-full h-auto py-6 rounded-lg bg-white">
        <TanTable
          columnData={columns}
          data={tableData}
          showSearch
          showSortFilter
          searchPlaceholder="Search products"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Products
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{tableData.length}</Text>
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
      </main>
    </div>
  );
};

export default CategoriesProductTable;
