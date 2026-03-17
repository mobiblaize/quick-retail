/* eslint-disable @typescript-eslint/no-explicit-any */
import{ useState } from "react";
import { useFetchAllProducts } from "../../../../hooks/backendApis/pos/products";
import { FilterValues } from "../../../General/table/reuseableFilter";
import DraftTable from "./DraftTable";

export default function ProductDraftsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const[activeSort, setActiveSort] = useState("recent");
  const [filters, setFilters] = useState<FilterValues>({
    startDate: "",
    endDate: "",
    location: "",
    category: "",
    stockFrom: "",
    stockTo: "",
    orderStatus: "",
    role: "",
    module: "",
    status: "",
  });

  
  const { data, isLoading } = useFetchAllProducts({
    search: searchTerm,
    sort_by: activeSort,
    draft: 1, // << FETCH DRAFTS ONLY
    location_name: filters.location || "",
    category_name: filters.category || "",
    per_page: "10",
    paginate: true,
    status: "draft", 
  });

  // Extract products array and pagination based on the response format
  const productsList = data?.data?.products?.data ||[];
  
  const paginationData = {
    total: data?.data?.products?.total || 0,
    per_page: data?.data?.products?.per_page || 10,
    current_page: data?.data?.products?.current_page || 1,
    last_page: data?.data?.products?.last_page || 1,
  };

  const handlePageChange = (page: number) => {
    // Page changes are handled by the backend through the API
    // You may need to add page support to the API or handle it differently
    console.log("Page changed to:", page);
  };

  return (
    <div>
      <DraftTable
        products={productsList}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={handlePageChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeSort={activeSort}
        setSort={setActiveSort}
        onFilterChange={setFilters}
        filters={filters}
      />
    </div>
  );
}