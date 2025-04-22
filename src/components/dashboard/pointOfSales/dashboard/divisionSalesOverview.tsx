import { Button, Divider, Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { salesCustomer } from "../../../../utils/mockData";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import DivisionSaleChart from "../../../General/divisionSalesChart";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";
import { useMediaQuery } from "@mantine/hooks";

const DivisionSalesOverview = () => {
  const isSmallScreen = useMediaQuery("(max-width: 640px)");

  return (
    <main className="flex flex-col lg:flex-row gap-6">
      <section className="w-full lg:w-[35%] h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Popular Products
          </Text>
          <Text className="secondary font-normal">
            An overview of sales made
          </Text>
        </div>
        <div className="flex mt-4 flex-col gap-2">
          {salesCustomer.map((data, index) => (
            <div key={index}>
              <div className="flex px-2 justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="flex-shrink-0">{<data.usericon />}</span>
                  <div className="flex flex-col">
                    <Text
                      size="lg"
                      fw={600}
                      c="textSecondary.9"
                      className="break-all sm:break-normal"
                    >
                      {data.customerName}
                    </Text>
                    <Text className="secondary font-normal text-sm sm:text-base break-all sm:break-normal">
                      {data.email}
                    </Text>
                  </div>
                </div>
                <ArrowUpRight color="#003399" className="flex-shrink-0" />
              </div>

              <Divider size="sm" className="mt-3" color="#E4E7EC" />
            </div>
          ))}
        </div>
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
                showIconOnly
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

        <DivisionSaleChart />
      </section>
    </main>
  );
};

export default DivisionSalesOverview;
