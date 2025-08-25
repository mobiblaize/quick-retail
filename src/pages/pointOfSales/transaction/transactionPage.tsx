import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";
import { useFetchAllTransactions } from "../../../hooks/backendApis/pos/transactions";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";
import { Loader } from "@mantine/core";

const TransactionPage = () => {
  const [tempDateRange, setTempDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>(
    {} as FilterValues
  );
  // const [sortBy, setSortBy] = useState<string>(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSort, setActiveSort] = useState("");

  const [perPage] = useState(10);
  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
    page: currentPage.toString(),
    per_page: perPage.toString(),
    search: filters.search ?? "",
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
  const { data, isLoading } = useFetchAllTransactions(payload) || {};
  const transactionsArray = data?.data?.transactions?.data ?? [];

  const paginationData = data?.data?.transactions
    ? {
        current_page: data.data.transactions.current_page,
        last_page: data.data.transactions.last_page,
        per_page: data.data.transactions.per_page,
        total: data.data.transactions.total,
        from: data.data.transactions.from,
        to: data.data.transactions.to,
        next_page_url: data.data.transactions.next_page_url,
        prev_page_url: data.data.transactions.prev_page_url,
      }
    : undefined;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
     Transactions
        </Text>
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
        
      <TransactionOverview
  data={data?.data}
  isLoading={isLoading}
  onDateRangeChange={({ startDate, endDate }) => {
    const updatedRange = {
      startDate: startDate || tempDateRange.startDate,
      endDate: endDate || tempDateRange.endDate,
    };

    setTempDateRange(updatedRange);

    // Only apply filter when both are set
    if (updatedRange.startDate && updatedRange.endDate) {
      const newFilters = {
        ...appliedFilters,
        startDate: updatedRange.startDate,
        endDate: updatedRange.endDate,
      };
      setAppliedFilters(newFilters);
      setCurrentPage(1);
    }
  }}
/>

      <AllTransactionTable
        data={transactionsArray}
        isLoading={isLoading}
       
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
        paginationData={paginationData}
        onPageChange={handlePageChange}
     
      />
      {!isLoading && (!data?.data || data.data.length === 0) && (
        <div>No transactions to display</div>
      )}
    </PageContainer>
  );
};

export default TransactionPage;
