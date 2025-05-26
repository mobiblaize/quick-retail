import { Text } from "@mantine/core";
import { useReturns } from "../../../General/orderContext/orderCreationContext";
import { useFetchSaleOrderById } from "../../../../hooks/backendApis/pos/returns";

interface CustomerDetailsProps {
  orderId: string;
}

const CustomerDetails = ({ orderId }: CustomerDetailsProps) => {
  const { nextStep } = useReturns();
  const { data, error, isLoading } = useFetchSaleOrderById(orderId || "");

  const customerInfo = data?.data?.customer || {};

  if (error) return <Text>Error loading customer details.</Text>;
  if (isLoading) return <Text>Loading customer details...</Text>;

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <div className="flex justify-between items-center">
        <Text c="black" size="xl" fw={"500"}>
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
          {/* Customer Name */}
          <div className="flex flex-col">
            <Text fw={"500"}>Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {customerInfo.customer_name || "N/A"}
            </Text>
          </div>

          {/* Customer Email */}
          <div className="flex flex-col">
            <Text fw={"500"}>Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {customerInfo.customer_email || "N/A"}
            </Text>
          </div>

          {/* Customer Phone */}
          <div className="flex flex-col">
            <Text fw={"500"}>Phone Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {customerInfo.customer_phone || "N/A"}
            </Text>
          </div>

          {/* Customer Address */}
          <div className="flex flex-col">
            <Text fw={"500"}>Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {customerInfo.customer_address || "N/A"}
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CustomerDetails;
