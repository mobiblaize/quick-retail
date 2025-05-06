import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";

const RequestOverviewStatistics = () => {
  return (
    <main className="w-full h-auto overflow-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Overview
          </Text>
          <Text size="sm">An overview of Requests made</Text>
        </div>
        <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
            showIconOnly
          />
        </Group>
      </header>
      <section className="grid gap-4 md:gap-6 mt-6 grid-cols-1  md:grid-cols-4">
        <div className="bg-[#F1672226] px-4 flex flex-col gap-3 rounded-xl py-3">
          <Text size="lg" c="black" fw={"500"}>
            All Request
          </Text>
          <p className="rounded-full text-white w-fit bg-[#E16635] p-2">500</p>
        </div>

        <div className="bg-[#E7F6EC] px-4 flex flex-col gap-3 rounded-xl py-3">
          <Text size="lg" c="black" fw={"500"}>
            Approved Requests
          </Text>
          <p className="rounded-full text-white w-fit bg-[#0F973D] p-2">500</p>
        </div>

        <div className="bg-[#FEF6E7] px-4 flex flex-col gap-3 rounded-xl py-3">
          <Text size="lg" c="black" fw={"500"}>
            Pending Requests
          </Text>
          <p className="rounded-full text-white w-fit bg-[#F3A218] p-2">40</p>
        </div>

        <div className="bg-[#F1672226] px-4 flex flex-col gap-3 rounded-xl py-3">
          <Text size="lg" c="black" fw={"500"}>
            Rejected Requests
          </Text>
          <p className="rounded-full text-white w-fit bg-[#E16635] p-2">20</p>
        </div>
      </section>
    </main>
  );
};

export default RequestOverviewStatistics;
