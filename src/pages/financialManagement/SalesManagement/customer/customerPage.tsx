import { Text } from "@mantine/core";
import PageContainer from "../../../../layout/pageContainer";
import CustomerSalesTable from "../../../../components/finacialManagement/salesManagement/customer/customerTable";

const CustomerSalesPage = () => {
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
      <CustomerSalesTable />
    </PageContainer>
  );
};

export default CustomerSalesPage;
