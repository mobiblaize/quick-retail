import PageContainer from "../../../layout/pageContainer";
import ProductTable from "../../../components/dashboard/pointOfSales/productManagement/productTable";
import AddProduct from "../../../components/dashboard/pointOfSales/productManagement/modal/addProductModal";
import { useState } from "react";
import ProductOverview from "../../../components/dashboard/pointOfSales/productManagement/productOverview";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { useFetchAllProducts } from "../../../hooks/backendApis/pos/inventory";
import { Menu, Button, Text } from "@mantine/core";
import { ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { Loader } from "@mantine/core";

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
;const [searchTerm, setSearchTerm] = useState("");


  const handleAddBulkProducts = () => {
    navigate("/dashboard/product-management/add-bulk-product");
  };
//@ts-ignore
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});

  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 

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
  const [activeSort, setActiveSort] = useState("");

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

  const products = Array.isArray(data?.data?.products?.data)
    ? data.data.products.data
    : [];

  
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

  const handleFilterChange = (filters: FilterValues) => {
    setAppliedFilters(filters);  
  };

  
  const subHeaders = [
    <div className="justify-between flex items-center">
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
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={() => setIsLogComplaintsOpen(true)}
              >
                Add a product
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddBulkProducts}
              >
                Add bulk products
              </Menu.Item>
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
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={() => setIsLogComplaintsOpen(true)}
              >
                Add a product
              </Menu.Item>
              <Menu.Item
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
                onClick={handleAddBulkProducts}
              >
                Add bulk products
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
        {isLoading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70">
        <Loader size="xl" color="orange" />
      </div>
    )}
          {!isLoading && data ? (
        <main className="">
       
      <ProductOverview
        data={data?.data}
        isLoading={isLoading}
        setDateRange={setDateRange}
      />
      <ProductTable
        products={products}
        isLoading={isLoading}
        // @ts-ignore
        paginationData={paginationData}
        onPageChange={handlePageChange}
        searchTerm={searchTerm} 
        setSearchTerm={(val: string) => {
          setSearchTerm(prev => {
            if (prev !== val) {
              setCurrentPage(1); 
            }
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
      <AddProduct
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
        </main>
      ) : null}
    </PageContainer>
  );
};

export default ProductManagementPage;



