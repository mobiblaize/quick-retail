import { Button, Menu, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import { ChevronDown } from "lucide-react";
import CategoriesTable from "../../../components/dashboard/pointOfSales/categories/categoriesTable";
import { useState } from "react";
import CreateNewCategory from "../../../components/dashboard/pointOfSales/categories/modals/createNewCategory";
import CreateSubCategory from "../../../components/dashboard/pointOfSales/categories/modals/createSubCategory";
import { useFetchAllCategories } from "../../../hooks/backendApis/pos/categories";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

const CategoriesPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isCreateSubCategoryOpen, setIsSubCreateCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10); 
  const [, setSortBy] = useState<string>(""); 
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(
    {} as FilterValues
  );
  const [activeSort, setActiveSort] = useState("");
  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
  });
  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    // ...(startDate ? { start_date: startDate } : {}),
    // ...(endDate ? { end_date: endDate } : {}),
    page: currentPage,
    per_page: perPage, 
    search: searchTerm,
    sort_by: activeSort,
  };
  // @ts-ignore
  const { data, isLoading, refetch } = useFetchAllCategories(payload) || {};
  const categories = Array.isArray(data?.data?.data) ? data.data.data : [];
  const paginationData = data?.data
  ? {
      current_page: data.data.current_page,
      last_page: data.data.last_page,
      per_page: data.data.per_page,
      total: data.data.total,
      from: data.data.from,
      to: data.data.to,
      next_page_url: data.data.next_page_url,
      prev_page_url: data.data.prev_page_url,
    }
  : undefined;

const handlePageChange = (page: number) => {
  setCurrentPage(page);
};
  const categoryOptions =
    Array.isArray(categories) && categories.length > 0
      ? categories.map((cat: { name: string; id: number }) => ({
          label: cat.name,
          value: cat.id,
        }))
      : [];

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Categories
        </Text>
        <div>
          <Menu>
            <Menu.Target>
              <Button variant="filled-primary">
                Create New
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
                onClick={() => setIsCreateCategoryOpen(true)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
              >
                New Category
              </Menu.Item>
              <Menu.Item
                onClick={() => setIsSubCreateCategoryOpen(true)}
                style={{
                  fontSize: "14px",
                  padding: "8px 16px",
                  color: "#333",
                }}
              >
                New Sub-category
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      <CategoriesTable
        categories={categories}
        isLoading={isLoading}
        onSortChange={(sortKey) => {
          const newFilters = { ...appliedFilters, sortBy: sortKey };
          setAppliedFilters(newFilters);
          setSortBy(sortKey);
          setCurrentPage(1);
        }}
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
      />
      <CreateNewCategory
        opened={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        onCreated={() => {
          refetch();
          setIsCreateCategoryOpen(false);
        }}
      />
      <CreateSubCategory
        opened={isCreateSubCategoryOpen}
        onClose={() => setIsSubCreateCategoryOpen(false)}
        categories={categoryOptions}
      />
    </PageContainer>
  );
};

export default CategoriesPage;
