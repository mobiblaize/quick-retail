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

const ProductManagementPage = () => {
  const navigate = useNavigate();
  const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);
;

  const handleAddBulkProducts = () => {
    navigate("/dashboard/product-management/add-bulk-product");
  };

  const [appliedFilters] = useState<FilterValues | null>(
    null
  );
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  // const [searchTerm, setSearchTerm] = useState("");
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
    per_page: "",
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
    // search: searchTerm,
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
  
  const subHeaders = [
    <div className="justify-between flex items-center">
      <Text fw={500} size="xl" c="black">
        Product Management
      </Text>

      {/* <div>
        <div className="hidden sm:block">
          <Button
            onClick={() => setIsLogComplaintsOpen(true)}
            variant="filled-primary"
            className="flex gap-1.5"
          >
            Add a product
          </Button>
        </div>

        <div className="block sm:hidden">
          <Button
            onClick={() => setIsLogComplaintsOpen(true)}
            variant="filled-primary"
            className="flex gap-1.5"
          >
            Add a product
          </Button>
        </div>
      </div> */}

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
      />
      <AddProduct
        opened={isLogComplaintsOpen}
        onClose={() => setIsLogComplaintsOpen(false)}
      />
    </PageContainer>
  );
};

export default ProductManagementPage;




// import { useState, useEffect } from "react";
// import { Menu, Button, Text } from "@mantine/core";
// import { ChevronDown, Plus } from "lucide-react";
// import { useNavigate } from "react-router";
// import PageContainer from "../../../layout/pageContainer";
// import ProductTable from "../../../components/dashboard/pointOfSales/productManagement/productTable";
// import AddProduct from "../../../components/dashboard/pointOfSales/productManagement/modal/addProductModal";
// import ProductOverview from "../../../components/dashboard/pointOfSales/productManagement/productOverview";
// import { useFetchAllProducts } from "../../../hooks/backendApis/pos/inventory";
// import useStore from "../../../components/dashboard/pointOfSales/productManagement/addProductStore";
// import ProductFilters from "../../../components/dashboard/pointOfSales/productManagement/productFilters";

// // ✅ Inline types
// interface ApiProduct {
//   id: number;
//   variationID: string;
//   name: string;
//   sku: string;
//   ean: string;
//   code: string;
//   cost_price: string;
//   selling_price: string;
//   stock_level: number;
//   category?: { id: number; name: string };
//   location?: { id: number; name: string };
//   status?: string;
// }

// interface PaginationData {
//   current_page: number;
//   last_page: number;
//   per_page: number;
//   total: number;
//   from: number;
//   to: number;
// }

// interface TransactionData {
//   totalItems: number;
//   total_revenue: number;
//   active: number;
//   inactive: number;
// }

// interface FilterValues {
//   search?: string;
//   sortBy?: string;
//   location?: string;
//   category?: string;
//   startDate?: string;
//   endDate?: string;
//   productStatus?: string;
//   priceFrom?: number;
//   priceTo?: number;
// }

// const ProductManagementPage = () => {
//   const navigate = useNavigate();
//   const [isLogComplaintsOpen, setIsLogComplaintsOpen] = useState(false);

//   // ✅ Store state
//   const { 
//     apiProducts,
//     paginationData,
//     overviewData,
//     isLoading: storeLoading,
//     setApiProducts,
//     setPaginationInfo,
//     setOverviewData,
//     setIsLoading,
//   } = useStore();

//   const handleAddBulkProducts = () => {
//     navigate("/dashboard/product-management/add-bulk-product");
//   };

//   const [appliedFilters, setAppliedFilters] = useState<FilterValues | null>(null);
//   const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
//     startDate: "",
//     endDate: "",
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [perPage] = useState(10);

//   const mapOrderStatus = (status: string | undefined): string => {
//     if (!status || status.toLowerCase() === "all") return "";
//     if (status.toLowerCase() === "active") return "active";
//     if (status.toLowerCase() === "inactive") return "inactive";
//     return status.toLowerCase();
//   };

//   const mapFiltersToPayload = (filters: FilterValues) => ({
//     search: filters.search ?? "",
//     sort_by: filters.sortBy ?? "",
//     paginate: true,
//     location_name: filters.location ?? "",
//     category_name: filters.category ?? "",
//     start_date: filters.startDate ?? "",
//     end_date: filters.endDate ?? "",
//     status: mapOrderStatus(filters.productStatus),
//     price_from: filters.priceFrom ? String(filters.priceFrom) : "",
//     price_to: filters.priceTo ? String(filters.priceTo) : "",
//     page: String(currentPage),
//     per_page: String(perPage),
//   });

//   const startDate = dateRange.startDate || appliedFilters?.startDate || "";
//   const endDate = dateRange.endDate || appliedFilters?.endDate || "";

//   const payload = {
//     ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
//     ...(startDate ? { start_date: startDate } : {}),
//     ...(endDate ? { end_date: endDate } : {}),
//     page: String(currentPage),
//     per_page: String(perPage),
//   };

//   // ✅ Fetch data from API
//   const { data, isLoading: apiLoading } = useFetchAllProducts(payload) || {};

//   // ✅ Sync store with API response
//   useEffect(() => {
//     if (data?.data?.products?.data) {
//       setApiProducts(data.data.products.data as ApiProduct[]);

//       // pagination
//       const pagination: PaginationData = {
//         current_page: data.data.products.current_page,
//         last_page: data.data.products.last_page,
//         per_page: data.data.products.per_page,
//         total: data.data.products.total,
//         from: data.data.products.from,
//         to: data.data.products.to,
//       };
//       setPaginationInfo(pagination);

//       // overview
//       const overview: TransactionData = {
//         totalItems: data.data.totalItems,
//         total_revenue: data.data.total_revenue,
//         active: data.data.active,
//         inactive: data.data.inactive,
//       };
//       setOverviewData(overview);
//     }
//     setIsLoading(apiLoading || false);
//   }, [data, apiLoading, setApiProducts, setPaginationInfo, setOverviewData, setIsLoading]);

//   const handlePageChange = (page: number) => setCurrentPage(page);

//   const subHeaders = [
//     <div className="justify-between flex items-center" key="header">
//       <Text fw={500} size="xl" c="black">
//         Product Management
//       </Text>

//       <div>
//         <div className="hidden sm:block">
//           <Menu>
//             <Menu.Target>
//               <Button variant="filled-primary">
//                 Add New Product
//                 <ChevronDown className="ml-2" />
//               </Button>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item onClick={() => setIsLogComplaintsOpen(true)}>Add a product</Menu.Item>
//               <Menu.Item onClick={handleAddBulkProducts}>Add bulk products</Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
//         <div className="block sm:hidden">
//           <Menu>
//             <Menu.Target>
//               <Button
//                 variant="filled-primary"
//                 style={{ width: "40px", height: "40px", padding: 0, borderRadius: "20%" }}
//               >
//                 <Plus size={20} />
//               </Button>
//             </Menu.Target>
//             <Menu.Dropdown>
//               <Menu.Item onClick={() => setIsLogComplaintsOpen(true)}>Add a product</Menu.Item>
//               <Menu.Item onClick={handleAddBulkProducts}>Add bulk products</Menu.Item>
//             </Menu.Dropdown>
//           </Menu>
//         </div>
//       </div>
//     </div>,
//   ];

//   return (
//     <PageContainer subHeaders={subHeaders}>
//       <ProductOverview
//         data={overviewData ?? { totalItems: 0, total_revenue: 0, active: 0, inactive: 0 }} // ✅ no nulls
//         isLoading={storeLoading}
//         setDateRange={setDateRange}
//       />

//       <ProductFilters onFilterChange={setAppliedFilters} />

//       <ProductTable
//         products={apiProducts ?? []} // ✅ fallback
//         isLoading={storeLoading}
//         page={paginationData?.current_page || 1}
//         totalPages={paginationData?.last_page || 1}
//         paginationData={paginationData ?? undefined} // ✅ no nulls
//         onPageChange={handlePageChange}
//       />

//       <AddProduct opened={isLogComplaintsOpen} onClose={() => setIsLogComplaintsOpen(false)} />
//     </PageContainer>
//   );
// };

// export default ProductManagementPage;


