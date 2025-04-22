import { Text } from "@mantine/core";

const OrderSummary = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text className="" c="black" size="xl" fw={"500"}>
        Order Details
      </Text>
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Cashier</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Ngozi Iwunze
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Discount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              None
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Reason For Returned</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Damaged
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Refund Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              7420 Sqm
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderSummary;
