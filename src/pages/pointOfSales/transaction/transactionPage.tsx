import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import TransactionOverview from "../../../components/dashboard/pointOfSales/transactions/transactionOverview";
import AllTransactionTable from "../../../components/dashboard/pointOfSales/transactions/allTransactionTable";

const TransactionPage = () => {
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
      <TransactionOverview />
      <AllTransactionTable />
    </PageContainer>
  );
};

export default TransactionPage;
