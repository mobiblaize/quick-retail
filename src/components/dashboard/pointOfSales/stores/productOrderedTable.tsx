import TanTable from "../../../General/table";
import { productOrdered } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const ProductOrderedTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
      accessorKey: "productName",
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
            <Text fw={600} className="text-[#667185] text-sm">
              {props.row.original.items}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Brand",
      accessorKey: "brand",
      cell: (props) => (
        <Text fw={500} c="#1D2939">
          {props.row.original.brand}{" "}
        </Text>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (props) => (
        <div className="flex bg-[#F2F4F7] p-2 w-fit rounded-full flex-col">
          <Text fw={600} c="#101928">
            {props.row.original.category}
          </Text>
        </div>
      ),
    },
    {
      header: "Subcategory",
      accessorKey: "subCategory",
      cell: ({ row }) => (
        <div className="flex bg-[#EFF4FF] p-2 w-fit rounded-full flex-col">
          <Text c="#004EEB" fw="600">
            {row.original.subCategory}
          </Text>
        </div>
      ),
    },
    {
      header: "Selling Price",
      accessorKey: "sellingPrice",
      cell: (props) => (
        <Text fw={600} c="black" className="text-sm">
          {props.row.original.sellingPrice}
        </Text>
      ),
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      cell: (props) => (
        <Text fw={600} c="#1D2739" className="text-[#667185] text-sm">
          {props.row.original.stockLevel}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.discountStatus;
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
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.aboutProduct}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={productOrdered}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Products Ordered
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{productOrdered.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default ProductOrderedTable;
