import TanTable from "../../../General/table";
import { productTableData } from "../../../../utils/mockData";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { useFetchAllCustomers } from "../../../../hooks/backendApis/pos/customersManagement";

const CustomerTable = () => {
  const { data } = useFetchAllCustomers();
  const customers = Array.isArray(data?.data?.customers?.data)
    ? data.data.customers.data
    : [];

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.name}
          </Text>
          <Text fw={400} className="text-sm">
            Last Visit:{""} {props.row.original.date}
          </Text>
        </div>
      ),
    },
    {
      header: "Contact",
      accessorKey: "contact",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.contact}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
            Tel:{""}{" "}
            <span className="text-gray-500">{props.row.original.number}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Total Amount Spent",
      accessorKey: "totalAmount",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {props.row.original.totalAmount}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
           Total Trasactions:{""}
            <span className="text-gray-500">
              {props.row.original.totalTransaction}
            </span>
          </Text>
        </div>
      ),
    },
    {
      header: "Timestamp",
      accessorKey: "timeStamp",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.original.timeStamp}
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
  const mappedCustomers: TableRowData[] = customers.map((customer: any) => ({
    name: customer.customer_name,
    date: customer.last_visit
      ? new Date(customer.last_visit).toLocaleDateString()
      : "—",
    contact: customer.customer_email,
    number: customer.customer_phone,
    totalAmount: customer.sales_orders_sum_order_total
      ? `₦${Number(customer.sales_orders_sum_order_total).toLocaleString()}`
      : "₦0",
    totalTransaction: `${customer.sales_orders_count} transaction(s)`,
    timeStamp: new Date(customer.created_at).toLocaleString(),
    status: customer.status === "active" ? "Active" : "Inactive",
  }));

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        columnData={columns}
        data={mappedCustomers}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={5}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Customers
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">{productTableData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CustomerTable;
