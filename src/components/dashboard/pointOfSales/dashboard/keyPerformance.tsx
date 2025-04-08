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
    <main className="w-full h-auto px-6 py-8 rounded-lg bg-white">
      <header className="flex mb-8 justify-between items-center">
        <div className="flex flex-col">
          <Text size="xl" fw={600} c="textSecondary.9">
            Key Performance Indicator
          </Text>
          <span className="text-gray-400 font-normal">
            An Overview of sales made
          </span>
        </div>
        <Group>
          <DateFilterMenu
            defaultFilter="This Month"
            buttonVariant="subtle"
            buttonSize="md"
          />
        </Group>
      </header>
      <section>
        <div className="grid gap-6 grid-cols-3">
          {performance.map((data, index) => (
            <div
              key={index}
              className="rounded-lg gap-2 p-3.5 bg-[#FFECE5] flex flex-col"
            >
              <Text>{data.label}</Text>
              <Text size="lg" fw={600} c="textSecondary.9">
                {data.perce}
              </Text>
            </div>
          ))}
        </div>

        <div className="mt-2.5">
          <Text size="lg" fw={700} c="textSecondary.7">
            Store Traget
          </Text>
        </div>
        <div className="grid gap-4 grid-cols-4">
          {storeTarget.map((data, index) => (
            <div
              key={index}
              className="rounded-lg gap-2 p-3.5 bg-[#FFECE5] flex flex-col"
            >
              <Text>{data.label}</Text>
              <Text size="lg" fw={600} c="textSecondary.9">
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
