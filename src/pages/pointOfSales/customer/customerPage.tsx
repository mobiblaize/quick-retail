import { Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import CustomerTable from "../../../components/dashboard/pointOfSales/customer/customerTable";

const CustomerPage = () => {
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
      <CustomerTable />
    </PageContainer>
  );
};

export default CustomerPage;
