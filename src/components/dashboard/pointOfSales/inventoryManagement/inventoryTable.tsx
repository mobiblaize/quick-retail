import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Button, Loader, Menu, Text } from "@mantine/core";
import {  PaidDot,  UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/inventory";

const InventoryTable = () => {
  const { data, isLoading } = useFetchAllProducts();

  const products = Array.isArray(data?.data?.products?.data)
    ? data.data.products.data
    : [];

  const mappedProducts: TableRowData[] = products.map((product: any) => ({
    name: product.name,
    sku: product.sku,
    location: product.product?.location?.name ?? "N/A",
    stockLevel: product.quantity_available ?? 0,
    date: new Date(product.created_at).toLocaleDateString(),
    status:
      product.quantity_available === 0
        ? "Sold Out"
        : parseInt(product.reorder_level) >= product.quantity_available
        ? "Low Stock"
        : "Available",
    image: product.image_path,
    variationID: product.variationID,
    ...product, 
  }));

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product",
      accessorKey: "name",
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
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "SKU",
      accessorKey: "sku",
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    // {
    //   header: "Discount Status",
    //   accessorKey: "status",
    //   cell: (props) => {
    //     const status = props.row.original.status;
    //     return (
    //       <div
    //         className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
    //           status === "Available"
    //             ? "bg-[#ECFDF3] text-[#027A48]"
    //             : status === "Sold Out"
    //             ? "bg-[#FEE2E2] text-[#D92D20]"
    //             : "bg-[#FFFAEB] text-[#B54708]"
    //         }`}
    //       >
    //         {status === "Available" ? (
    //           <PaidDot />
    //         ) : status === "Sold Out" ? (
    //           <SoldoutDot />
    //         ) : (
    //           <LowDot />
    //         )}
    //         <span className="ml-2">{status}</span>
    //       </div>
    //     );
    //   },
    // },

    {
      header: "Discount Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        const isActive = typeof status === "string" && status.toLowerCase() === "active";
    
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {isActive ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{String(status)}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: (props) => (
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <Button variant="subtle" size="xs" p={1}>
              <MoreVertical size={20} className="cursor-pointer" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Link
              to={ROUTES.updateInventory}
              state={{ inventories: props.row.original }}
            >
              <Menu.Item>Update</Menu.Item>
            </Link>
            <Link to={ROUTES.triggerOrder}>
              <Menu.Item color="red">Trigger Reorder</Menu.Item>
            </Link>
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

      <TanTable
        columnData={columns}
        data={mappedProducts}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Inventory
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {mappedProducts.length}
                <span className="ml-2">Product</span>
              </Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default InventoryTable;
