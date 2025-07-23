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
import {  useState } from "react";

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

  const { data, isLoading,  } = useFetchAllProducts(payload);

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
    status:
      product.quantity_available === 0
        ? "Sold Out"
        : parseInt(product.reorder_level) >= product.quantity_available
        ? "Low Stock"
        : "Available",
    image: product.image_path,
    variationID: product.variationID,
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
    },
    {
      header: "Location",
      accessorKey: "location",
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
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
      header: "Date",
      accessorKey: "date",
      cell: (props) => (
        <div className="text-gray-600 whitespace-nowrap break-words ">
          {/* @ts-ignore */}
          {formatDate(props.row.original.date)}
        </div>
      ),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: (props) => {
        const status = props.row.original.status;
        const isActive =
          typeof status === "string" && status.toLowerCase() === "active";

        return (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
              isActive
                ? "bg-[#ECFDF3] text-[#027A48]"
                : "bg-[#FFFAEB] text-[#B54708]"
            }`}
          >
            {isActive ? <PaidDot /> : <UnpaidDot />}
            <span className="ml-2 capitalize">{String(status)}</span>
          </div>
        );
      },
    },
    {
      header: "",
      accessorKey: "action",
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
                {mappedProducts.length}
                <span className="ml-2">Product</span>
              </Text>
            </div>
          </div>
        } 
      />
    </main>
  );
};

export default InventoryTable;
