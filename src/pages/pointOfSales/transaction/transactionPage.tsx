import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";
import { useFetchAllTransactions } from "../../../hooks/backendApis/pos/transactions";

const TransactionPage = () => {

  const { data, isLoading, } = useFetchAllTransactions()
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
  console.log('isLoading:', isLoading);
console.log('data?.data:', data?.data);
console.log('show empty message:', !isLoading && (!data?.data || data.data.length === 0));

  return (
    <PageContainer subHeaders={subHeaders}>
  <TransactionOverview data={data?.data}  isLoading={isLoading} />
      <AllTransactionTable data={transactionsArray} isLoading={isLoading} />
      {!isLoading && (!data?.data || data.data.length === 0) && (
  <div>No transactions to display</div>
)}
    </PageContainer>
  );
};

export default TransactionPage;
