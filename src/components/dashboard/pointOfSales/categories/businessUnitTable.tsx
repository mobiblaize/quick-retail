import TanTable from "../../../General/table";
import { businessUnitData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Menu, Button } from "@mantine/core";
import { MoreVertical } from "lucide-react";

const BusinessUnitTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product & Product NO",
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
              {props.row.original.productName}
            </Text>
            <Text
              fw={600}
              c="customPrimary.10"
              className="text-[#667185] text-sm"
            >
              {props.row.original.productNo}
            </Text>
          </div>
        </div>
      ),
    },
    {
      header: "Brand & category",
      accessorKey: "brand",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="#1D2939">
            {props.row.original.brand}{" "}
          </Text>
          <Text fw={600} c="#667085" className="text-[#667185] text-sm">
            {props.row.original.category}
          </Text>
        </div>
      ),
    },
    {
      header: "Sub-category",
      accessorKey: "total",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="#004EEB">
            Shoes
          </Text>
          <Text fw={600} c="#004EEB" className="text-[#667185] text-sm">
            {props.row.original.total}{" "}
            <span className="text-gray-800">left</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Date Modified",
      accessorKey: "dateModified",
      cell: ({ row }) => <Text>{row.original.dateModified}</Text>,
    },
    {
      header: "Amount Per Product",
      accessorKey: "amount",
      cell: (props) => (
        <Text fw={600} c="#1D2739" className="text-[#667185] text-sm">
          {props.row.original.amount}
        </Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
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
  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={businessUnitData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Business Unit
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{businessUnitData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default BusinessUnitTable;
