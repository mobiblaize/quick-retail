import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import {  useNavigate } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchAllSales } from "../../../../hooks/backendApis/pos/salesProcessing";
import { formatDate, shortenTransactionId } from "../../../../utils/helpers";

const CustomerOrdersTable = () => {
  const { data, } = useFetchAllSales();

  const salesData = data?.data?.sales?.data ?? [];

  // ✅ Mapped data
  const tableData = salesData.map((sale: { sale_order_details: any[]; orderID: any; updated_at: any; customer_name: any; order_total: any; payment_status: any;  cashier: { firstname?: string; lastname?: string }; }) => {
    const totalItems = sale.sale_order_details?.reduce(
      (sum, item) => sum + (item.quantity_ordered || 0),
      0
    );

    const cashierFullName = sale.cashier
    ? `${sale.cashier.firstname || ''} ${sale.cashier.lastname || ''}`.trim()
    : 'Unknown';

    return {
      orderID: sale.orderID,
      date: sale.updated_at,
      customer: sale.customer_name,
      amount: sale.order_total,
      status: sale.payment_status,
      items: totalItems,
      cashier: cashierFullName
    };
  });

  const navigate = useNavigate();

  const handleViewClick = (orderID: string, status: string) => {
    console.log("Navigating with orderID:", orderID);
    if (status === "paid") {
      navigate(ROUTES.viewOrder, { state: { orderID } });
    } else if (status === "pending") {
      navigate(ROUTES.viewOrderdraft, { state: { orderID } });
    } else {
      console.warn("Unhandled order status:", status);
    }
  };
   
  const columns: ColumnDef<any>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      enableSorting: false,
      enableColumnFilter: false,
      size: 10,
    },
    {
      header: "Order ID",
      accessorKey: "orderID",
      cell: (props) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {shortenTransactionId(props.row.original.orderID)}
          </Text>
          <Text fw={500}>
            Total Items:{" "}
            <span className="ml-1 text-black">{props.row.original.items}</span>
          </Text>
        </div>
      ),
    },
    {
      header: "Time stamp",
      accessorKey: "date",
      cell: (props) => (
        <Text c="textSecondary.7">{formatDate(props.row.original.date)}</Text>
      ),
    },
    {
      header: "Cashier Issued",
      accessorKey: "cashier",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.cashier}</Text>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.customer}</Text>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: (props) => (
        <Text c="textSecondary.7">{props.row.original.amount}</Text>
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
              status === "paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{status}</span>
          </div>
        );
      },
    },
   
    {
      header: "",
      accessorKey: "action",
      cell: (props) => {
        const { orderID, status } = props.row.original;
    
        return (
          <Text
            fw={700}
            c="customPrimary.10"
            className="cursor-pointer"
            onClick={() => handleViewClick(orderID, status)}
          >
            View Order
          </Text>
        );
      },
    },
    
  ];

  return (
    <main className="w-full h-auto py-8 rounded-lg bg-white">
      <TanTable
    // @ts-ignore
        columnData={columns}
        data={tableData} 
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        length={8}
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
              <Text c="customPrimary.10">{tableData.length}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default CustomerOrdersTable;

