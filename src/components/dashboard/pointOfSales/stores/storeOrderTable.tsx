import { ColumnDef } from "@tanstack/react-table";
import { Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import TanTable from "../../../General/table";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useStoreOrders } from "../../../../hooks/backendApis/pos/storeManagement";


interface StoreOrderTableProps {
  locationId: string;
  startDate: string;
  endDate: string;
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({
  locationId,
  startDate,
  endDate,
}) => {
  const { data, isLoading } = useStoreOrders(locationId, {
    start_date: startDate,
    end_date: endDate,
  });

  const orders = data?.data?.orders?.data ?? [];


  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <Loader size="lg" variant="dots" />
        <Text ml={10} size="md" color="dimmed">
          Loading orders...
        </Text>
      </div>
    );
  }

 

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
      header: "Order Information",
      accessorKey: "order_number",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            Order No: {row.original.order_number}
          </Text>
          <Text fw={400} className="text-sm">
            Total Item: 
            {row.original.fees
              ? JSON.parse(row.original.fees).sub_total
              : "N/A"}
          </Text>
        </div>
      ),
    },
    {
      header: "Customer Information",
      accessorKey: "customer_name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.original.customer?.customer_name}
          </Text>
          <Text fw={400} className="text-sm">
            {row.original.customer?.customer_email}
          </Text>
        </div>
      ),
    },
    {
      header: "Amount",
      accessorKey: "amount_paid",
      cell: ({ row }) => (
        <Text c="#1D2739" fw={500}>
          ₦{row.original.amount_paid}
        </Text>
      ),
    },
    {
      header: "Date Created",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {new Date(row.original.created_at).toLocaleDateString()}
        </Text>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "payment_status",
      cell: ({ row }) => {
        const status = row.original.payment_status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "paid"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FBEAE9] text-[#9E0A05]"
            }`}
          >
            {status === "paid" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              status === "completed"
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {status === "completed" ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2">{status}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
      cell: ({ row }) => (
        <Link
          to={ROUTES.storeBillingInformation}
          state={{ orderData: row.original }}
        >
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
        //@ts-ignore
          columnData={columns}
          data={orders}
          isLoading={isLoading}
          showSearch
          showSortFilter
          searchPlaceholder="Search orders"
          length={8}
          tableTitle={
            <div className="flex gap-2.5">
              <Text fw={500} size="xl" c="textSecondary.9">
                All Store Orders
              </Text>
              <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
                <Text c="customPrimary.10">{orders.length}</Text>
              </div>
            </div>
          }
        />
      </main>
    </div>
  );
};
export default StoreOrderTable;
