import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";
import { useFetchAllTransactions } from "../../../hooks/backendApis/pos/transactions";
import { useState } from "react";


const TransactionPage = () => {
  const [dateRange, setDateRange] = useState<{
    startDate: string;
    endDate: string;
  }>({
    startDate: "",
    endDate: "",
  });
  const { data, isLoading, } = useFetchAllTransactions({
    start_date: dateRange.startDate,
    end_date: dateRange.endDate,
  });
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
      <AllTransactionTable data={transactionsArray} isLoading={isLoading} />
      {!isLoading && (!data?.data || data.data.length === 0) && (
  <div>No transactions to display</div>
)}
    </PageContainer>
  );
};

export default TransactionPage;
