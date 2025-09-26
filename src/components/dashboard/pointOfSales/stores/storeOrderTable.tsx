import { useState } from "react";
import { Loader, Text, Group, Badge, Stack } from "@mantine/core";
import { Link } from "react-router-dom";

import GenericTable, { PaginationData } from "../../../General/genericTable";
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
  const [, setSortBy] = useState<string>("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);

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

  const paginationData: PaginationData | undefined = data?.data?.orders
    ? {
        current_page: data.data.orders.current_page,
        last_page: data.data.orders.last_page,
        per_page: data.data.orders.per_page,
        total: data.data.orders.total,
        // from: data.data.orders.from,
        // to: data.data.orders.to,
        // next_page_url: data.data.orders.next_page_url,
        // prev_page_url: data.data.orders.prev_page_url,
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

  const columns = [
    {
      key: "order_number",
      header: "Order ID",
      render: (row: any) => (
        <Stack gap="sm">
          <Text fw={500} c="black">
            {row.orderID}
          </Text>
          <Text fz="sm" c="dimmed">
            Total Item:{" "}
            {row.fees ? JSON.parse(row.fees).item_count : "N/A"}
          </Text>
        </Stack>
      ),
    },
    {
      key: "created_at",
      header: "Time Stamp",
      render: (row: any) => (
        <Text fz="sm" fw={500} c="gray.9">
          {formatDate(row.created_at)}
        </Text>
      ),
    },
    {
      key: "customer_name",
      header: "Customer Information",
      render: (row: any) => (
        <Text fw={500} c="black">
          {row.customer?.customer_name}
        </Text>
      ),
    },
    {
      key: "amount_paid",
      header: "Amount",
      render: (row: any) => (
        <Text fw={500} c="dark">
          ₦{row.amount_paid}
        </Text>
      ),
    },
    {
      key: "payment_status",
      header: "Status",
      render: (row: any) => {
        const status = row.payment_status;
        const neat =
          status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
        const isPaid = status === "paid";

        return (
          <Badge
            leftSection={isPaid ? <PaidDot /> : <UnpaidDot />}
            color={isPaid ? "green" : "red"}
            variant="light"
            radius="lg"
            size="md"
            className='!text-lg'
            style={{ textTransform: "none" }}
          >
            {neat}
          </Badge>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Link
          to={ROUTES.storeBillingInformation}
          state={{ orderData: row }}
        >
          <Text fw={600} c="orange" className="cursor-pointer">
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
        <Text ml={10} size="md" c="dimmed">
          Loading Orders...
        </Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto">
      <GenericTable
        columns={columns}
        data={orders}
        isLoading={isLoading}
        // showSearch
        // showSortFilter
        searchPlaceholder="Search orders"
        onSortChange={handleSortChange}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        // serverSidePagination
        titleSection={
          <Group gap="sm">
            <Text fw={500} size="xl" c="gray.9">
              All Store Orders
            </Text>
            <Badge
              variant="light"
              color="orange"
              radius="xl"
              size="lg"
              style={{ textTransform: "none" }}
            >
              {totalOrders}
            </Badge>
          </Group>
        }
      />
    </main>
  );
};

export default StoreOrderTable;