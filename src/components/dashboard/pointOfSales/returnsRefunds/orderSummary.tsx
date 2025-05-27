import { Text } from "@mantine/core";
import { useFetchSaleOrderById } from "../../../../hooks/backendApis/pos/returns";

interface OrderDetailsProps {
  orderId: string;
}

const OrderSummary = ({ orderId }: OrderDetailsProps) => {
  const { data, error } = useFetchSaleOrderById(orderId || "");

  if (error) return <Text>Error loading order summary</Text>;
  if (!data) return <Text>Loading...</Text>;

  const order = data?.data || {};
  const parsedFees = order.fees ? JSON.parse(order.fees) : {};

  const cashierName = order.cashier
    ? `${order.cashier.firstname} ${order.cashier.lastname}`
    : "N/A";

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text c="black" size="xl" fw={"500"}>
        Order Summary
      </Text>

      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8 w-full gap-3 md:max-w-6xl">
          {/* Cashier */}
          <div className="flex flex-col">
            <Text fw={"500"}>Cashier</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {cashierName}
            </Text>
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <Text fw={"500"}>Discount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {parsedFees.discount ? `₦${parsedFees.discount}` : "None"}
            </Text>
          </div>

          {/* Reason for Return (hardcoded or dynamic) */}
          <div className="flex flex-col">
            <Text fw={"500"}>Reason For Return</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.return_reason || "Not specified"}
            </Text>
          </div>

          {/* Refund Status */}
          <div className="flex flex-col">
            <Text fw={"500"}>Refund Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.refund_status || "Pending"}
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderSummary;
