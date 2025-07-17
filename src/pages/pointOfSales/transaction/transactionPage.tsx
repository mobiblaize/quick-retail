import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";
import { useFetchAllTransactions } from "../../../hooks/backendApis/pos/transactions";
import { useState } from "react";
import { FilterValues } from "../../../components/General/table/reuseableFilter";


const TransactionPage = () => {
  const [, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });

  const [appliedFilters, setAppliedFilters] = useState<FilterValues>({} as FilterValues);
  const mapFiltersToPayload = (filters: FilterValues) => ({
    sort_by: filters.sortBy || "",
    start_date: filters.startDate ?? "",
    end_date: filters.endDate ?? "",
  });
  
  const { data, isLoading, } = useFetchAllTransactions(mapFiltersToPayload(appliedFilters));
  const transactionsArray = data?.data?.transactions?.data ?? [];
  const subHeaders = [
    <div key="1">
      <div className="flex items-center justify-between">
        <Text fw={500} size="xl" c="black">
          Transaction
        </Text>
      </div>
    </div>,
  ];


  return (
    <PageContainer subHeaders={subHeaders}>
  <TransactionOverview data={data?.data}  isLoading={isLoading} 
         setDateRange={setDateRange}/>
      <AllTransactionTable data={transactionsArray} isLoading={isLoading}  onSortChange={(sortKey) => {
    const newFilters = { ...appliedFilters, sortBy: sortKey };
    setAppliedFilters(newFilters);
  }} />
      {!isLoading && (!data?.data || data.data.length === 0) && (
  <div>No transactions to display</div>
)}
    </PageContainer>
  );
};

export default TransactionPage;
