import TanTable from "../../../General/table";
import { customerOrders } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchAllSales } from "../../../../hooks/backendApis/pos/salesProcessing";
import { formatDate, shortenTransactionId } from "../../../../utils/helpers";

const CustomerOrdersTable = () => {
  const { data, isLoading, error } = useFetchAllSales();
  const salesData = data?.data?.sales?.data ?? [];

  const tableData = salesData.map(
    (sale: {
      sale_order_details: any[];
      orderID: any;
      date_completed: any;
      customer_name: any;
      order_total: any;
      payment_status: string;
    }) => {
      // Sum total quantity of items
      const totalItems = sale.sale_order_details.reduce(
        (sum, item) => sum + item.quantity_ordered,
        0
      );

      return {
        id: sale.orderID, // or sale.order_number
        timestamp: sale.date_completed,
        customer: sale.customer_name,
        amount: sale.order_total,
        status: sale.payment_status === "paid" ? "Paid" : "Unpaid",
        items: totalItems,
      };
    }
  );
  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Order ID",
      accessorKey: "id",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {/*@ts-ignore  */}
            {shortenTransactionId(props.row.original.orderID)}
          </Text>
          <Text fw={500}>
            Total Items:
            {/* /*/}
            <span className="ml-1 text-black">
              {/* {props.row.original.sale_order_detail.quantity_ordered} */}
            </span>
          </Text>
        </div>
      ),
    },
    {
      header: "Date & Time",
      accessorFn: (row) => row.date_completed,
      // cell: (row) => (
      //   // <Text c="textSecondary.7"> {formatDate(row.original.date_completed)}</Text>
      // ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.customer_name}</Text>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.amount_paid}</Text>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.payment_status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
  
    {
      header: "",
      accessorKey: "action",
      cell: () => (
        <Link to={ROUTES.viewOrder}>
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
            View Order
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="w-full h-auto  py-8 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={salesData}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        showFilter
        sortOptions={[
          {
            key: "products",
            label: "Sort By Recently Uploaded",
          },
          {
            key: "added_on",
            label: "Sort by Date Added",
          },
        ]}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Recent Orders
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{salesData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CustomerOrdersTable;
