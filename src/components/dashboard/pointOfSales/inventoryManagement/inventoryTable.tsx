import { useState } from "react";
import { Text, Avatar, Group } from "@mantine/core";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { formatDate } from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/inventory";
import GenericTable from "../../../General/genericTable";

type StatusKey = "available" | "low stock" | "sold out";

const InventoryTable = () => {
  const [, setCurrentPage] = useState(1);

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(
    {} as FilterValues
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  // ✅ Fixed: normalized filters now dynamic, not hardcoded
  const normalizeFilters = (filters: FilterValues) => {
    const result: Record<string, any> = {};

    if (filters.startDate) result.start_date = filters.startDate;
    if (filters.endDate) result.end_date = filters.endDate;
    if (filters.stockFrom !== undefined && filters.stockFrom !== "")
      result.stock_level_from = Number(filters.stockFrom);
    if (filters.stockTo !== undefined && filters.stockTo !== "")
      result.stock_level_to = Number(filters.stockTo);
    if (filters.orderStatus) result.stock_status = filters.orderStatus;
    if (filters.location) result.location_name = filters.location;

    return result;
  };

  const payload = {
    page: "1",
    per_page: "10",
    search: searchTerm,
    sort_by: activeSort,
    ...normalizeFilters(appliedFilters),
  };

  const { data, isLoading } = useFetchAllProducts(payload);

  const products = Array.isArray(data?.data?.products?.data)
    ? data.data.products.data
    : [];

  // ✅ no more double-filtering (backend already handles it)
  const mappedProducts = products.map((product: any) => ({
    name: product.name,
    sku: product.sku,
    location: product.product?.location?.name ?? "N/A",
    stockLevel: product.quantity_available ?? 0,
    quantitySupplied: product.quantity_supplied ?? 0,
    date: product.created_at,
    status: product.stock_status,
    image: product.image_path,
    variationID: product.variationID,
    price: product.selling_price,
    original: product,
  }));

  const paginationData = data?.data?.products
    ? {
        current_page: data.data.products.current_page,
        last_page: data.data.products.last_page,
        total: data.data.products.total,
        per_page: data.data.products.per_page,
      }
    : undefined;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
  };

  const locations = Array.from(
    new Set(
      products
        ?.map((p: any) => p.product?.location?.name)
        .filter(
          (name: string | undefined): name is string => typeof name === "string"
        )
    )
  );

  const columns = [
    {
      key: "product",
      header: "Product",
      render: (row: any) => (
        <Group gap="sm" align="center">
          <Avatar src={row.image || ""} alt={row.name} radius="md" size={40} />
          <Text fw={500} c="black">
            {row.name}
          </Text>
        </Group>
      ),
    },
    {
      key: "sku",
      header: "SKU",
      render: (row: any) => <Text>{row.sku}</Text>,
    },
    {
      key: "location",
      header: "Location",
      render: (row: any) => <Text>{row.location}</Text>,
    },
    {
      key: "stock",
      header: "Stock Level",
      render: (row: any) => {
        const available = row.stockLevel;
        const supplied = row.quantitySupplied;
        const originalQty = supplied || available;

        return (
          <Text fw={500}>
            <span className={available < 10 ? "text-red-600" : "text-black"}>
              {available}
            </span>{" "}
            of {originalQty}
          </Text>
        );
      },
    },
    {
      key: "price",
      header: "Price",
      render: (row: any) => (
        <Text fw={500}>₦{Number(row.price).toLocaleString()}</Text>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (row: any) => <Text>{formatDate(row.date)}</Text>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => {
        const status = row.status?.toLowerCase();
        const statusStyles: Record<
          StatusKey,
          { bg: string; text: string; dot: any }
        > = {
          available: {
            bg: "bg-[#ECFDF3]",
            text: "text-[#027A48]",
            dot: <PaidDot />,
          },
          "low stock": {
            bg: "bg-[#FFFAEB]",
            text: "text-[#B54708]",
            dot: <UnpaidDot />,
          },
          "sold out": {
            bg: "bg-[#FEF3F2]",
            text: "text-[#B42318]",
            dot: <UnpaidDot />,
          },
        };

        const key = (status as StatusKey) ?? "available";
        const { bg, text, dot } = statusStyles[key] || {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: <UnpaidDot />,
        };

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bg} ${text}`}
          >
            {dot} <span className="ml-2 capitalize">{status || "N/A"}</span>
          </div>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Link to={ROUTES.updateInventory} state={{ inventories: row.original }}>
          <Text fw={700} c="customPrimary.10" className="cursor-pointer">
            Update
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <main className="relative w-full h-auto">
      <GenericTable
        columns={columns}
        data={mappedProducts}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        onFilterChange={handleFilterChange}
        activeSort={activeSort}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSortChange={setActiveSort}
        filters={appliedFilters}
        enableSearch={true}
        enableSort={true}
        showFilter={true}
        tableType="inventory"
        searchPlaceholder="Search Inventory"
        //@ts-ignore
        locations={locations}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Inventory
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {paginationData?.total ?? mappedProducts.length}
              </Text>
            </div>
          </div>
        }
        emptyStateMessage="No products found matching your filters."
      />
    </main>
  );
};

export default InventoryTable;
