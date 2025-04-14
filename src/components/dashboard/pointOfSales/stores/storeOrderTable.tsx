import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { allStoreOrders } from "../../../../utils/mockData";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const StoreOrderTable = () => {
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Order Information",
      accessorKey: "information",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            Order No: {props.row.original.orderNo}
          </Text>
          <Text fw={400} className="text-sm">
            Total Item: {props.row.original.totalItem}
          </Text>
        </div>
      ),
    },
    {
      header: "Customer Information",
      accessorKey: "customerInformation",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.customerName}
          </Text>
          <Text fw={400} className="text-sm">
            {props.row.original.customerEmail}
          </Text>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (props) => (
        <Text c="#1D2739" fw={500}>
          {props.row.original.amount}
        </Text>
      ),
    },

    {
      header: "Date Created",
      accessorKey: "dateCreated",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.dateCreated}
        </Text>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      cell: (props) => {
        const status = props.row.original.paymentStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Success"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FBEAE9] text-[#9E0A05]"
            }`}
          >
            {status === "Success" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "Order Status",
      accessorKey: "orderStatus",
      cell: (props) => {
        const status = props.row.original.orderStatus;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "Completed"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "Completed" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.storeBillingInformation}>
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
          data={allStoreOrders}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={5}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Store Orders
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{allStoreOrders.length}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};

export default StoreOrderTable;
