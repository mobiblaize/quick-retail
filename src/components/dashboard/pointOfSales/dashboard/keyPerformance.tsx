import { Group, Text } from "@mantine/core";
import DateFilterMenu from "../../../General/filterMenu";

const KeyPerformance = () => {
  const performance = [
    {
      label: "Convert Rate (%)",
      perce: "48%",
    },
    {
      label: "Average Transaction Value",
      perce: "N14, 902, 000.00",
    },
    {
      label: "Units Per Transaction",
      perce: "N14, 902, 000.00",
    },
    {
      label: "Average Sales Price",
      perce: "N84, 902,000.00",
    },
    {
      label: "Multiple Transactions",
      perce: "48",
    },
    {
      label: "Footfall",
      perce: "80",
    },
  ];

  const storeTarget = [
    {
      label: "Avegrage Sales Price",
      perce: "N184,902",
    },
    {
      label: "Transaction Value",
      perce: "N884,902.00",
    },
    {
      label: "Multiple Transactions",
      perce: "4,008",
    },
    {
      label: "Footfall",
      perce: "8,000",
    },
  ];

  return (
    <main className="w-full h-auto px-4 sm:px-6 py-6 sm:py-8 rounded-lg bg-white">
      <header className="flex flex-row justify-between items-start md:mb-3 mb-8 gap-4">
        <div className="flex flex-col">
          <Text size="lg" fw={600} c="textSecondary.9">
            Key Performance Indicator
          </Text>
          <span className="text-gray-400 font-normal text-sm">
            An Overview of sales made
          </span>
        </div>
        <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="sm"
            showIconOnly
          />
        </Group>
      </header>

      <section>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {performance.map((data, index) => (
            <div
              key={index}
              className="rounded-lg gap-2 p-3.5 bg-[#FFECE5] flex flex-col"
            >
              <Text className="text-sm sm:text-md">{data.label}</Text>
              <Text className="text-md sm:text-lg" fw={600} c="textSecondary.9">
                {data.perce}
              </Text>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Text className="text-md sm:text-lg" fw={700} c="textSecondary.7">
            Store Target
          </Text>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
          {storeTarget.map((data, index) => (
            <div
              key={index}
              className="rounded-lg gap-2 p-3.5 bg-[#FFECE5] flex flex-col"
            >
              <Text className="text-sm sm:text-md">{data.label}</Text>
              <Text className="text-md sm:text-lg" fw={600} c="textSecondary.9">
                {data.perce}
              </Text>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default KeyPerformance;
