import { Button, Divider, Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";
import { salesCustomer } from "../../../../utils/mockData";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import DivisionSaleChart from "../../../General/divisionSalesChart";
import { Link } from "react-router";
import { ROUTES } from "../../../../constants/routes";

const CustomerAnalysis = () => {
  return (
    <main className="flex gap-6">
      <div className="w-[65%] h-auto px-4 py-8 rounded-lg bg-white">
        <div className="flex justify-between items-center">
          <div className="flex-col ">
            <Text size="xl" fw={600} c="textSecondary.9">
              Recent Customers
            </Text>
            <span className="text-gray-400 font-normal">
              An overview of sales made
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Group>
              <DateFilterMenu
                defaultFilter="This Month"
                buttonVariant="subtle"
                buttonSize="md"
              />
            </Group>
            <Button
              rightSection={<ChevronRight />}
              variant="default"
              px={10}
              py={2}
              className="rounded-lg"
            >
              <Text c="textSecondary.8" fw={500}>
                View Report
              </Text>
            </Button>
          </div>
        </div>
        <DivisionSaleChart />
      </div>
      <div className="w-[35%] h-auto px-4 py-8 rounded-lg bg-white">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Customer Analysis
          </Text>
          <span className="text-gray-400 font-normal">
            An overview of sales made
          </span>
        </div>
        <div className="flex mt-4 flex-col gap-2">
          {salesCustomer.map((data, index) => (
            <div key={index}>
              <div className="flex px-2 justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span>{<data.usericon />}</span>
                  <div className="flex flex-col">
                    <Text size="lg" fw={600} c="textSecondary.9">
                      {data.customerName}
                    </Text>
                    <Text className="secondary font-normal">{data.email}</Text>
                  </div>
                </div>
                <ArrowUpRight color="#003399" />
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
            mt={32}
          >
            View All
          </Text>
        </Link>
      </div>
    </main>
  );
};

export default CustomerAnalysis;
