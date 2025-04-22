import { Text } from "@mantine/core";
import { useReturns } from "../../../General/orderContext/orderCreationContext";

const CustomerDetails = () => {
  const { nextStep } = useReturns();

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <div className="flex justify-between items-center">
        <Text className="" c="black" size="xl" fw={"500"}>
          Customer Details
        </Text>
        <Text
          onClick={nextStep}
          fw={"600"}
          c="customPrimary.10"
          className="cursor-pointer"
        >
          Email Customer
        </Text>
      </div>
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-x-8 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Greatful Ehis
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              greatful@sbsc.com
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Phone Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              +234 7269 4829 282
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              -
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerDetails;
