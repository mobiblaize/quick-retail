import { Text } from "@mantine/core";

const InformationTab = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text className="" c="black" size="xl" fw={"500"}>
        Billing Information
      </Text>
      <Text>You're viewing product information below</Text>
      <hr className="text-gray-200 mt-3" />
      <section className="mt-6">
        <div className="grid grid-cols-4 gap-x-8 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Customer Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Victoria Francis
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              victoriafrancis@gmail.com
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Phone Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              +234 701 526 9954
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Delivery Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              142, Obafemi Awolowo Street, Ikeja Aluasa Lagos
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-8 mt-6 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>State</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Lagos
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Country</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Nigeria
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              #32,000.00
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Cash
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InformationTab;
