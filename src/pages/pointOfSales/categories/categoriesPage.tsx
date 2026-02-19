
import { useEffect, useState } from "react";
import CreateSubCategory from "../../../components/dashboard/pointOfSales/categories/modals/createSubCategory";
import { useFetchAllCategories } from "../../../hooks/backendApis/pos/categories";
import PageContainer from "../../../layout/pageContainer";
import CategoriesTable from "../../../components/dashboard/pointOfSales/categories/categoriesTable";
import { Text, Button, Menu, Skeleton } from "@mantine/core";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "react-router";
import CreateNewCategory from "../../../components/dashboard/pointOfSales/categories/modals/createNewCategory";

/* --- Lightweight table skeleton --- */
const CategoriesTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* top controls (search / filters) */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
    </div>

    {/* table head */}
    <div className="grid grid-cols-5 gap-4 border-b py-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>

    {/* table rows */}
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-5 gap-4 py-3 border-b">
        {Array.from({ length: 5 }).map((_, c) => (
          <Skeleton key={c} height={16} width={c === 1 ? "80%" : "60%"} />
        ))}
      </div>
    ))}

    {/* pagination */}
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

const CategoriesPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [isCreateSubCategoryOpen, setIsSubCreateCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");
  const [searchParams] = useSearchParams();
  const create = searchParams.get("create");

  const payload = {
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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

  const handlePageChange = (page: number) => setCurrentPage(page);

  const categoryOptions =
    Array.isArray(categories) && categories.length > 0
      ? categories.map((cat: { name: string; id: number }) => ({
          label: cat.name,
          value: cat.id,
        }))
      : [];

      useEffect(() => {
    if (create==='true') setIsCreateCategoryOpen(true);
  }, [create]);

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
                style={{ fontSize: "14px", padding: "8px 16px", color: "#333" }}
              >
                New Category
              </Menu.Item>
              <Menu.Item
                onClick={() => setIsSubCreateCategoryOpen(true)}
                style={{ fontSize: "14px", padding: "8px 16px", color: "#333" }}
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
      {isLoading ? (
        <CategoriesTableSkeleton />
      ) : (
        <CategoriesTable
          categories={categories}
          isLoading={isLoading}
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
        />
      )}

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
