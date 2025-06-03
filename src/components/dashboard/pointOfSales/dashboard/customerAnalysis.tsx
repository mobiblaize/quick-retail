import { Divider, Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import DivisionSaleChart from "../../../General/divisionSalesChart";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCustomerAnalysis } from "../../../../hooks/backendApis/pos/dashboard";
import { useFetchAllCustomers } from "../../../../hooks/backendApis/pos/customersManagement";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react";
import { JSX } from "react/jsx-runtime";

const CustomerAnalysis = () => {
 
  const { data,} = useFetchCustomerAnalysis();
  const { data: allCustomersData } = useFetchAllCustomers();

  const customers =
    allCustomersData?.data?.customers?.data?.sort(
      (a: { sales_orders_count: number; }, b: { sales_orders_count: number; }) => b.sales_orders_count - a.sales_orders_count
    ) ?? [];
  const stats = data?.data;
  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[65%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <Text size="xl" fw={600} c="textSecondary.9">
            Customer Analysis 
            </Text>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Group className="w-auto">
              <DateFilterMenu
                defaultFilter="This Month"
                buttonVariant="subtle"
                buttonSize="md"
                showIconOnly="sm"
              />
            </Group>
          
          </div>
        </div>
        <DivisionSaleChart
  newCustomers={stats?.new_customers ?? 0}
  existingCustomers={stats?.existing_customers ?? 0}
  new_customers_percentage={stats?.new_customers_percentage ?? 0}
  existing_customers_percentage={stats?.existing_customers_percentage ?? 0}
/>
      </div>

      <div className="w-full lg:w-[35%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
           Recent Customers
          </Text>
          <span className="text-gray-400 font-normal">
            An overview of sales made
          </span>
        </div>
        <div className="flex mt-4 flex-col gap-2">
        {customers.slice(0, 3).map((data: { usericon: JSX.IntrinsicAttributes; customer_name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; customer_email: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }, index: Key | null | undefined) => (
            <div key={index}>
              <div className="flex px-2 justify-between items-center">
                <div className="flex items-center gap-2.5">
                  {/* <span className="flex-shrink-0">{<data.usericon />}</span> */}
                  <div className="flex flex-col">
                    <Text
                      size="lg"
                      fw={600}
                      c="textSecondary.9"
                      className="break-all sm:break-normal"
                    >
                {data.customer_name}
                    </Text>
                    <Text className="secondary font-normal text-sm sm:text-base break-all sm:break-normal">
                    {data.customer_email}
                    </Text>
                  </div>
                </div>
                {/* <ArrowUpRight color="#003399" className="flex-shrink-0" /> */}
              </div>

              <Divider size="sm" className="mt-3" color="#E4E7EC" />
            </div>
          ))}
        </div>
        <Link to={ROUTES.customer}>
          <Text
            className="text-center cursor-pointer"
            c="customPrimary.10"
            fw={600}
            mt={6}
          >
            View All
          </Text>
        </Link>
      </div>
    </main>
  );
};

export default CustomerAnalysis;
