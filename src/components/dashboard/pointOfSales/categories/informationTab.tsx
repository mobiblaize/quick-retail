import { Text } from "@mantine/core";
import { OrderData } from "../../../../types";

interface InformationTabProps {
  orderData: OrderData;
}

const InformationTab: React.FC<InformationTabProps> = ({ orderData }) => {
  if (!orderData) return null;

  const customer = orderData.customer || {};
  const addressParts = (customer.customer_address || "").split(",").map(s => s.trim());

  const state = addressParts.length > 0 ? addressParts[addressParts.length - 1] : "";
  // const state = addressParts.length > 1 ? addressParts[addressParts.length - 2] : "";
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text className="" c="black" size="xl" fw={"500"}>
        Billing Information
      </Text>
      <Text>You're viewing product information below</Text>
      <hr className="text-gray-200 mt-3" />
      <section className="mt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-x-8 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Customer Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {customer.customer_name}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {customer.customer_email}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Phone Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {customer.customer_phone}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Delivery Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {customer.customer_address}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-x-8 mt-4 md:mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>State</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {state}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Country</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            Nigeria
            </Text>
          </div>
          {/* <div className="flex flex-col">
            <Text fw={"500"}>Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {orderData.amount_paid}
            </Text>
          </div> */}
          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {orderData.payment_method}
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InformationTab;
