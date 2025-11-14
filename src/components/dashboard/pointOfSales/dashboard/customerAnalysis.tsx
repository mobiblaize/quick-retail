/* eslint-disable @typescript-eslint/no-explicit-any */
import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import DivisionSaleChart from "../../../General/divisionSalesChart";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCustomerAnalysis } from "../../../../hooks/backendApis/pos/dashboard";
import { useFetchDashboardCustomers } from "../../../../hooks/backendApis/pos/dashboard";
import { useState } from "react";
import UniversalEmptyState from "./UniversalEmptyState";


interface Customer {
  customer_name: string;
  customer_email: string;
  sales_orders_count: number;
}


const CustomerAnalysis = () => {
  const [dateRange, setDateRange] = useState<{
    start_date: string;
    end_date: string;
  }>({
    start_date: "",
    end_date: "",
  });
  const { data } = useFetchCustomerAnalysis(dateRange);
  const { data: allCustomersData } = useFetchDashboardCustomers();

  const customers: any[] =
    allCustomersData?.data?.customers?.data?.sort(
      (a: { sales_orders_count: number }, b: { sales_orders_count: number }) =>
        b.sales_orders_count - a.sales_orders_count
    ) ?? [];
  const stats = data?.data;


  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-[65%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex flex-col mb-3 sm:mb-0">
            <Text size="xl" fw={600} c="textSecondary.9">
              Customer Analytics
            </Text>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Group className="w-auto">
              <DateFilterMenu
                onDateFilterChange={({ startDate, endDate }) =>
                  setDateRange({
                    start_date: (startDate as Date).toISOString().split("T")[0],
                    end_date: (endDate as Date).toISOString().split("T")[0],
                  })
                }
              />
            </Group>
          </div>
        </div>

        {stats ? (
          <DivisionSaleChart
            newCustomers={stats.new_customers ?? 0}
            existingCustomers={stats.existing_customers ?? 0}
            new_customers_percentage={stats.new_customers_percentage ?? 0}
            existing_customers_percentage={
              stats.existing_customers_percentage ?? 0
            }
          />
        ) : (
          <UniversalEmptyState />
        )}
      </div>

      <div className="w-full lg:w-[35%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Recent Customers
          </Text>
          <Text c="gray.6" fw={400}>
            An overview of sales made
          </Text>
        </div>
        <div className="flex mt-4 flex-col gap-2">
          {customers.length > 0 ? (
            customers
              .slice(0, 3)
              .map((data: Customer, index: number) => (
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
                </div>
              ))
          ) : (
            <UniversalEmptyState />
          )}
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
