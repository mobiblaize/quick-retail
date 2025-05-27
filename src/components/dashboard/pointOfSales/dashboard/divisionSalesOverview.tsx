import { Button, Divider, Group, Text, Loader } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { ChevronRight } from "lucide-react";
import DivisionSaleChart from "../../../General/divisionSalesChart";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useMediaQuery } from "@mantine/hooks";
import { useFetchCustomerAnalysis } from "../../../../hooks/backendApis/pos/dashboard";


const DivisionSalesOverview = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");
  const { data, isLoading, error } = useFetchCustomerAnalysis();

  const stats = data?.data;

  return (
    <main className="flex flex-col lg:flex-row gap-6">
      {/* Left Section */}
      <section className="w-full lg:w-[35%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Customer Summary
          </Text>
          <Text className="secondary font-normal">
            Overview of new and returning customers
          </Text>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader size="sm" />
          </div>
        ) : error ? (
          <Text c="red" className="mt-4">
            Failed to load customer stats
          </Text>
        ) : (
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <Text fw={500} size="lg" c="textSecondary.9">
                New Customers
              </Text>
              <Text fw={700} size="lg" c="customPrimary.10">
                {stats?.new_customers ?? 0}
              </Text>
            </div>
            <Divider />
            <div className="flex justify-between items-center px-2">
              <Text fw={500} size="lg" c="textSecondary.9">
                Existing Customers
              </Text>
              <Text fw={700} size="lg" c="customPrimary.10">
                {stats?.existing_customers ?? 0}
              </Text>
            </div>
            <Divider />
          </div>
        )}

        <Link to={ROUTES.productManagement}>
          <Text
            className="text-center cursor-pointer"
            c="customPrimary.10"
            fw={600}
            mt={6}
          >
            View All
          </Text>
        </Link>
      </section>

      {/* Right Section */}
      <section className="w-full lg:w-[65%] h-auto px-3 sm:px-4 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <Text size="xl" fw={600} c="textSecondary.9">
              Division Sale Overview
            </Text>
            <span className="text-gray-400 font-normal">
              An overview of sales made
            </span>
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
            {!isSmallScreen && (
              <Button
                rightSection={<ChevronRight />}
                variant="default"
                px={6}
                py={2}
                className="rounded-lg"
              >
                <Text fw={500}>View Report</Text>
              </Button>
            )}
          </div>
        </div>

        <DivisionSaleChart
  newCustomers={stats?.new_customers ?? 0}
  existingCustomers={stats?.existing_customers ?? 0}
  new_customers_percentage={stats?.new_customers_percentage ?? 0}
  existing_customers_percentage={stats?.existing_customers_percentage ?? 0}
/>

      </section>
    </main>
  );
};

export default DivisionSalesOverview;
