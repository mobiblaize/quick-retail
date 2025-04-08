import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import TanTable from "../../../General/table";
import { discountProduct } from "../../../../utils/mockData";

const DiscountTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
            alt={row.original.name as string}
            radius="md"
            size={40}
          />
          <Text fw={500} c="black">
            {row.original.name}
          </Text>
        </div>
      ),
    },
    {
      header: "Discount Code",
      accessorKey: "discountCode",
      cell: ({ row }) => (
        <Text c="textSecondary.7">{row.original.discountCode}</Text>
      ),
    },
    {
      header: "Percent",
      accessorKey: "percent",
    },
    {
      header: "Price",
      accessorKey: "price",
      cell: ({ row }) => (
        <span className=" text-gray-900 text-sm font-medium">
          {row.original.price}
        </span>
      ),
    },
    {
      header: "Date From",
      accessorKey: "dateFrom",
    },
    {
      header: "Date To",
      accessorKey: "dateTo",
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
  ];

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={discountProduct}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Discount Product
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{discountProduct.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default DiscountTable;
