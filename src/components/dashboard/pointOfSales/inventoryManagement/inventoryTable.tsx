import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Button, Menu, Text } from "@mantine/core";
import { LowDot, PaidDot, SoldoutDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { InventoryTableData } from "../../../../utils/mockData";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const InventoryTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={imageSrc}
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
    {
      header: "Discount Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Available"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : status === "Sold Out"
                ? "bg-[#FEE2E2] text-[#D92D20]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Available" ? (
              <PaidDot />
            ) : status === "Sold Out" ? (
              <SoldoutDot />
            ) : (
              <LowDot />
            )}
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
              Update
            </Menu.Item>
            <Link to={ROUTES.triggerOrder}>
              <Menu.Item color="red">Trigger Reorder</Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ];
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={InventoryTableData}
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
                {InventoryTableData.length}
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
