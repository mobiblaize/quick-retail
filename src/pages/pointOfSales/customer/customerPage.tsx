import { Text, Skeleton } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import CustomerTable from "../../../components/dashboard/pointOfSales/customer/customerTable";
import CreateNewCustomer from "../../../components/dashboard/pointOfSales/customer/createNewCustomer";
import { useState } from "react";
import { useFetchAllCustomers } from "../../../hooks/backendApis/pos/customersManagement";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

/* --- Table skeleton --- */
const CustomersTableSkeleton = () => (
  <section className="bg-white rounded-lg shadow-sm p-4">
    {/* top controls (search / filters) */}
    <div className="flex flex-wrap gap-3 mb-4">
      <Skeleton height={36} width={220} />
      <Skeleton height={36} width={160} />
      <Skeleton height={36} width={140} />
      <Skeleton height={36} width={120} />
    </div>

    {/* table head */}
    <div className="grid grid-cols-6 gap-4 border-b py-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} height={14} width="60%" />
      ))}
    </div>

    {/* rows */}
    {Array.from({ length: 8 }).map((_, r) => (
      <div key={r} className="grid grid-cols-6 gap-4 py-3 border-b">
        {Array.from({ length: 6 }).map((_, c) => (
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

const CustomerPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  // @ts-ignore
  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
  });

  const payload = {
    ...(appliedFilters ? mapFiltersToPayload(appliedFilters) : {}),
    page: currentPage,
    per_page: perPage,
    search: searchTerm,
    sort_by: activeSort,
  };

  // @ts-ignore
  const { data, isLoading, refetch } = useFetchAllCustomers(payload) || {};
  const customers = Array.isArray(data?.data?.customers?.data)
    ? data.data.customers.data
    : [];

  const paginationData = data?.data?.customers
    ? {
        current_page: data.data.customers.current_page,
        last_page: data.data.customers.last_page,
        per_page: data.data.customers.per_page,
        total: data.data.customers.total,
        from: data.data.customers.from,
        to: data.data.customers.to,
        next_page_url: data.data.customers.next_page_url,
        prev_page_url: data.data.customers.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => setCurrentPage(page);

  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Customers
        </Text>
      </div>
    </div>,
  ];

  return (
    <PageContainer subHeaders={subHeaders}>
      {isLoading ? (
        <CustomersTableSkeleton />
      ) : (
        <>
          <CustomerTable
            customers={customers}
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
            onRefetch={refetch}
          />
          <CreateNewCustomer
            opened={isCreateCategoryOpen}
            onClose={() => setIsCreateCategoryOpen(false)}
            onCreated={() => {
              refetch();
              setIsCreateCategoryOpen(false);
            }}
          />
        </>
      )}
    </PageContainer>
  );
};

export default CustomerPage;
