import { Text } from "@mantine/core";

const UnitDetails = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-[#F2E6E2] px-6 py-8">
      <section className="mt-6">
        <div className="grid grid-cols-4 gap-x-8 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Subcategory</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma Bag
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Parent Category</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Women's Fashion
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Last Modified Date</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-8 mt-6 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Product Brand</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Created By</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Xavier Ayeni
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default UnitDetails;
