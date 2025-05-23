import TanTable from "../../../General/table";
// import { productTableData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Menu, Button } from "@mantine/core";
import { MoreVertical } from "lucide-react";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/products";

const ProductTable = () => {
  const { data,  } = useFetchAllProducts();
  const products = Array.isArray(data?.data?.products?.data)
    ? data.data.products.data
    : [];

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
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
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.productCode}</Text>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
          {row.original.category}
        </span>
      ),
    },
    {
      header: "Selling Price",
      accessorKey: "sellingPrice",
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      cell: (props) => (
        <span className="font-medium text-center">
          {props.row.original.stockLevel}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        const isActive = status === "Active";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {isActive ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Menu shadow="md" width={150} position="bottom-end">
          <Menu.Target>
            <Button variant="subtle" size="xs" p={1}>
              <MoreVertical size={20} className="cursor-pointer" />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={() => alert("View Order Clicked!")}>
              View
            </Menu.Item>
            <Menu.Item onClick={() => alert("View Order Clicked!")}>
              Edit
            </Menu.Item>
            <Menu.Item
              color="red"
              onClick={() => alert("Delete Order Clicked!")}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];
  const mappedProducts: TableRowData[] = products.map((product: any) => {
    const statusRaw = product.status?.toLowerCase?.();
    const isActive = statusRaw === "active";

    return {
      name: product.name,
      productCode: product.code,
      location: product.product?.location?.name || "—",
      category: product.product?.category?.name || "—",
      sellingPrice: `₦${Number(product.selling_price).toLocaleString()}`,
      stockLevel: product.quantity_available,
      status: isActive ? "Active" : "Inactive",
    };
  });

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
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
              Products
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{products.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ProductTable;
