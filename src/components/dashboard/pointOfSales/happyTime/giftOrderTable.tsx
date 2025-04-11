import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { giftOrders } from "../../../../utils/mockData";

const GiftOrderTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Customer Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            {props.row.original.email}
          </Text>
        </div>
      ),
    },
    {
      header: "Date & Time",
      accessorKey: "date",
      cell: (props) => <Text>{props.row.original.date}</Text>,
    },
    {
      header: "Recipient Information",
      accessorKey: "recipientName",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.recipientName}
          </Text>
          <Text fw={400} className="text-sm">
            {props.row.original.recipientEmail}
          </Text>
        </div>
      ),
    },
    {
      header: "Card Value",
      accessorKey: "cardValue",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.cardValue}
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
  ];
  return (
    <div>
      <main className="w-full h-auto py-6 rounded-lg bg-white">
        <TanTable
          columnData={columns}
          data={giftOrders}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                Recent Orders
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{giftOrders.length}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default GiftOrderTable;
