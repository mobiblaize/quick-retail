import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Loader, Text } from "@mantine/core";
import { Link } from "react-router";

import TanTable from "../../../General/table";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useStoreOrders } from "../../../../hooks/backendApis/pos/storeManagement";
import { ROUTES } from "../../../../constants/routes";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { formatDate } from "../../../../utils/helpers";

interface StoreOrderTableProps {
  locationId: string;
}

const StoreOrderTable: React.FC<StoreOrderTableProps> = ({ locationId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [ ,setSortBy] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

  // Helper to transform filters into API payload
  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
  });

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    page: currentPage.toString(),
    per_page: perPage.toString(),
  };

  const { data, isLoading } = useStoreOrders(locationId, payload);
  const orders = data?.data?.orders?.data ?? [];

  const paginationData = data?.data?.products
    ? {
        current_page: data.data.products.current_page,
        last_page: data.data.products.last_page,
        per_page: data.data.products.per_page,
        total: data.data.products.total,
        from: data.data.products.from,
        to: data.data.products.to,
        next_page_url: data.data.products.next_page_url,
        prev_page_url: data.data.products.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);
    const updatedFilters = {
      ...appliedFilters,
      sortBy: sortKey,
    };
    // @ts-ignore
    setAppliedFilters(updatedFilters);
  };
  const totalOrders = data?.data?.orders?.total ?? 0;

  const columns: ColumnDef<any>[] = [
    {
      header: "Order ID",
      accessorKey: "order_number",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">{row.original.orderID}</Text>
          <Text fw={400} className="text-sm">
            Total Item:{" "}
            {row.original.fees
              ? JSON.parse(row.original.fees).sub_total
              : "N/A"}
          </Text>
        </div>
      ),
    },
    {
      header: "Time Stamp",
      accessorKey: "created_at",
      cell: ({ row }) => (
        <Text className="text-gray-900 text-sm font-medium">
          {formatDate(row.original.created_at)}
        </Text>
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
      header: "Status",
      accessorKey: "payment_status",
      cell: ({ row }) => {
        const status = row.original.payment_status;
        const isPaid = status === "paid";
        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isPaid
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FBEAE9] text-[#9E0A05]"
            }`}
          >
            {isPaid ? <PaidDot /> : <UnpaidDot />}
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
            View Order
          </Text>
        </Link>
      ),
    },
  ];

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

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <TanTable
        //@ts-ignore
        columnData={columns}
        data={orders}
        showSearch
        showSortFilter
        searchPlaceholder="Search orders"
        onSortChange={handleSortChange}
        length={8}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        serverSidePagination={true}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Store Orders
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
            <Text c="customPrimary.10">{totalOrders}</Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default StoreOrderTable;
