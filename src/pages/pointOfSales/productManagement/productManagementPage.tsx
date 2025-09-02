import PageContainer from "../../../layout/pageContainer";
import ProductTable from "../../../components/dashboard/pointOfSales/productManagement/productTable";
import AddProduct from "../../../components/dashboard/pointOfSales/productManagement/modal/addProductModal";
import { useState } from "react";
import ProductOverview from "../../../components/dashboard/pointOfSales/productManagement/productOverview";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useFetchAllProducts } from "../../../hooks/backendApis/pos/inventory";
import { Menu, Button, Text, Skeleton } from "@mantine/core";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";

// --- Simple skeletons (in-file; you can move them out later) ---
const OverviewSkeleton = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-sm p-4">
        <Skeleton height={16} width="40%" mb="sm" />
        <Skeleton height={28} width="60%" />
        <Skeleton height={10} mt="sm" width="30%" />
      </div>
    ))}
  </section>
);

const TableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* header (filters/search) */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
      <Skeleton height={36} width={220} />
    </div>
    {/* table head */}
    <div className="grid grid-cols-6 gap-4 border-b py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>
    {/* table rows */}
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
        {Array.from({ length: 6 }).map((_, c) => (
          <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
        ))}
      </div>
    ))}
    {/* pagination skeleton */}
    <div className="flex items-center justify-between mt-4">
      <Skeleton height={28} width={180} />
      <div className="flex gap-2">
        <Skeleton height={28} width={32} />
        <Skeleton height={28} width={32} />
        <Skeleton height={28} width={32} />
      </div>
    </div>
  </section>
);

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // @ts-ignore
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [activeSort, setActiveSort] = useState("");

  const handleAddBulkProducts = () => navigate("/dashboard/product-management/add-bulk-product");

  const mapOrderStatus = (status: string | undefined) => {
    if (!status || status.toLowerCase() === "all") return "";
    if (status.toLowerCase() === "active") return "active";
    if (status.toLowerCase() === "inactive") return "inactive";
    return status.toLowerCase();
  };

  const mapFiltersToPayload = (filters: FilterValues) => ({
    // @ts-ignore
    search: filters.search ?? "",
    // search: searchTerm,
    // @ts-ignore
    sort_by: filters.sortBy ?? "",
    per_page: perPage.toString(),
    paginate: true,
    location_name: filters.location,
    category_name: filters.category,
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    status: mapOrderStatus(filters.productStatus),
    price_from: filters.priceFrom ?? 100,
    price_to: filters.priceTo ?? "",
    page: currentPage.toString(),
  });

  const startDate = dateRange.startDate || appliedFilters?.startDate || "";
  const endDate = dateRange.endDate || appliedFilters?.endDate || "";

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    ...(startDate ? { start_date: startDate } : {}),
    ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  // @ts-ignore
  const { data = {}, isLoading = false } = useFetchAllProducts(payload) || {};
  const products = Array.isArray(data?.data?.products?.data) ? data.data.products.data : [];
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

  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleFilterChange = (filters: FilterValues) => setAppliedFilters(filters);

  const subHeaders = [
    <div className="justify-between flex items-center" key="hdr">
      <Text fw={500} size="xl" c="black">
        Product Management
      </Text>

      <div>
        <div className="hidden sm:block">
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Add New Product
                <ChevronDown className="ml-2" />
              </Button>
            </Menu.Target>
            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item onClick={() => setIsLogComplaintsOpen(true)}>Add a product</Menu.Item>
              <Menu.Item onClick={handleAddBulkProducts}>Add bulk products</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>

        <div className="block sm:hidden">
          <Menu>
            <Menu.Target>
              <Button
                variant="filled-primary"
                style={{
                  width: "40px",
                  height: "40px",
                  padding: "0",
                  borderRadius: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={20} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Menu.Item onClick={() => setIsLogComplaintsOpen(true)}>Add a product</Menu.Item>
              <Menu.Item onClick={handleAddBulkProducts}>Add bulk products</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <main>
        {isLoading ? (
          <>
            <OverviewSkeleton />
            <TableSkeleton />
          </>
        ) : (
          <>
            <ProductOverview data={data?.data} isLoading={isLoading} setDateRange={setDateRange} />
            <ProductTable
              products={products}
              isLoading={isLoading}
              // @ts-ignore
              paginationData={paginationData}
              onPageChange={handlePageChange}
              searchTerm={searchTerm}
              setSearchTerm={(val: string) => {
                setSearchTerm((prev) => {
                  if (prev !== val) setCurrentPage(1);
                  return val;
                });
              }}
              activeSort={activeSort}
              setSort={(sortBy) => {
                setActiveSort(sortBy);
                setCurrentPage(1);
              }}
              onFilterChange={handleFilterChange}
              filters={appliedFilters}
            />
          </>
        )}

        <AddProduct opened={isLogComplaintsOpen} onClose={() => setIsLogComplaintsOpen(false)} />
      </main>
    </PageContainer>
  );
};

export default ProductManagementPage;
