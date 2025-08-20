import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import CustomerTable from "../../../components/dashboard/pointOfSales/customer/customerTable";
import CreateNewCustomer from "../../../components/dashboard/pointOfSales/customer/createNewCustomer";
import { useState } from "react";
import { useFetchAllCustomers } from "../../../hooks/backendApis/pos/customersManagement";
import { Plus } from "lucide-react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";

const CustomerPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
 //@ts-ignore
 const [appliedFilters, setAppliedFilters] = useState<FilterValues>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  // const [sortBy, setSortBy] = useState<string>(""); 
  ;const [searchTerm, setSearchTerm] = useState("");
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
  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };




  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Customers
        </Text>
        <Button
          variant="filled-primary"
          onClick={() => setIsCreateCategoryOpen(true)}
        >
          New Customer
          <Plus size={24} />
        </Button>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <CustomerTable
        customers={customers}
        isLoading={isLoading}
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
        onRefetch={refetch}
        // onSearchChange={setSearchTerm}
      />
      <CreateNewCustomer
        opened={isCreateCategoryOpen}
        onClose={() => setIsCreateCategoryOpen(false)}
        onCreated={() => {
          refetch();
          setIsCreateCategoryOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default CustomerPage;
