import TanTable from "../../../General/table";
import { ColumnDef } from "@tanstack/react-table";
import { TableRowData } from "../../../../types";
import { Avatar, Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/inventory";
import { formatDate, truncateText } from "../../../../utils/helpers";
import { FilterValues } from "../../../General/table/reuseableFilter";
import { useState } from "react";

const InventoryTable = () => {
  // const { data, isLoading } = useFetchAllProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [sortBy, setSortBy] = useState<string>("");
  const mapOrderStatus = (status: string | undefined) => {
    if (!status) return undefined;
    if (status === "Paid") return "paid";
    if (status === "Unpaid") return "unpaid";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    start_date: filters.startDate,
    end_date: filters.endDate,
    location_name: filters.location,
    price_from: filters.stockFrom,
    price_to: filters.stockTo,
    order_status: mapOrderStatus(filters.orderStatus),
    //@ts-ignore
    search: filters.search ?? "",
    //@ts-ignore
    sort_by: filters.sortBy ?? "",
    paginate: true,
    page: currentPage.toString(),
    per_page: perPage.toString(),
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(
    null
  );

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    page: currentPage.toString(),
    per_page: perPage.toString(),
  };

  const { data, isLoading } = useFetchAllProducts(payload);

  const products = Array.isArray(data?.data?.products?.data)
    ? data.data.products.data
    : [];

  const mappedProducts: TableRowData[] = products.map((product: any) => ({
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
    ...product,
  }));

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);
    // setShowFilter(false);
  };

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

  const locations = Array.from(
    new Set(
      data?.data?.products?.data
        ?.map((p: any) => p.product?.location?.name)
        ?.filter((name: any) => typeof name === "string")
    )
  );

  const columns: ColumnDef<TableRowData>[] = [
    {
      header: "Product",
      accessorKey: "name",
      enableSorting: false,
      cell: (props) => (
        <div className="flex items-center gap-3">
          <Avatar
            src={
              typeof props.row.original.image === "string"
                ? props.row.original.image
                : imageSrc
            }
            alt={props.row.original.name as string}
            radius="md"
            size={40}
          />
          <Text fw={500} c="black">
            {/* @ts-ignore  */}
            {truncateText(String(props.row.original.name))}
          </Text>
        </div>
      ),
    },
    {
      header: "SKU",
      accessorKey: "sku",
      enableSorting: false,
    },
    {
      header: "Location",
      accessorKey: "location",
      enableSorting: false,
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      enableSorting: false,
      cell: (props) => {
        const available = props.row.original.stockLevel;
        const supplied = props.row.original.quantitySupplied;

        // Fallback in case quantitySupplied is missing
        const originalQty = supplied || available;

        return (
          <Text fw={500}>
            {/* @ts-ignore  */}
            <span className={available < 10 ? "text-red-600" : "text-black"}>
              {available}
            </span>
            <span className="text-black"> of {originalQty}</span>
          </Text>
        );
      },
    },
    {
      header: "Price",
      accessorKey: "price",
      enableSorting: false,
      cell: (props) => (
        <Text fw={500}>
          ₦{Number(props.row.original.price).toLocaleString()}
        </Text>
      ),
    },

    {
      header: "Date",
      accessorKey: "date",
      enableSorting: false,
      cell: (props) => (
        <div className="text-gray-600 whitespace-nowrap break-words ">
          {/* @ts-ignore */}
          {formatDate(props.row.original.date)}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "stock_status", // ✅ Correct key
      enableSorting: false,
      cell: (props) => {
        // @ts-ignore
        const status = props.row.original.stock_status?.toLowerCase();

        const statusStyles = {
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
        // @ts-ignore
        const { bg, text, dot } = statusStyles[status] || {
          bg: "bg-gray-100",
          text: "text-gray-600",
          dot: <UnpaidDot />,
        };

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${bg} ${text}`}
          >
            {dot}
            <span className="ml-2 capitalize">{status || "N/A"}</span>
          </div>
        );
      },
    },

    {
      header: "",
      accessorKey: "action",
      enableSorting: false,
      cell: (props) => {
        return (
          <Link
            to={ROUTES.updateInventory}
            state={{ inventories: props.row.original }}
          >
            <Text fw={700} c="customPrimary.10" className="cursor-pointer">
              Reorder
            </Text>
          </Link>
        );
      },
    },
  ];

  return (
    <main className="relative w-full h-auto py-6 rounded-lg bg-white">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-60 flex items-center justify-center z-50">
          <Loader color="orange" size="lg" />
        </div>
      )}

      <TanTable
        columnData={columns}
        data={mappedProducts}
        showSearch
        showFilter
        showSortFilter
        searchPlaceholder="Search inventory"
        length={8}
        activeSort={sortBy}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        serverSidePagination={true}
        tableType="inventory"
        //@ts-ignore
        locations={locations}
        tableTitle={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              Inventory
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {paginationData?.total} <span className="ml-2"></span>
              </Text>
            </div>
          </div>
        }
      />
    </main>
  );
};

export default InventoryTable;
