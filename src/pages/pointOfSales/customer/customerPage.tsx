import { Button, Text } from "@mantine/core";
import PageContainer from "../../../layout/pageContainer";
import CustomerTable from "../../../components/dashboard/pointOfSales/customer/customerTable";
import CreateNewCustomer from "../../../components/dashboard/pointOfSales/customer/createNewCustomer";
import { useState } from "react";
import { useFetchAllCustomers } from "../../../hooks/backendApis/pos/customersManagement";

const CustomerPage = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const { data, isLoading, refetch } = useFetchAllCustomers();
  const customers = Array.isArray(data?.data?.customers?.data)
    ? data.data.customers.data
    : [];

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
        </Button>
      </div>
    </div>,
  ];
  return (
    <PageContainer subHeaders={subHeaders}>
      <CustomerTable customers={customers} isLoading={isLoading} />
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
