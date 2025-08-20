import { Text } from "@mantine/core";
import { useFetchSaleOrderById } from "../../../../hooks/backendApis/pos/returns";
import { useReturns } from "../../../General/orderContext/orderCreationContext";

interface OrderDetailsProps {
  orderId: string;
  onSendMail?: (order: any) => void;
}

const OrderSummary = ({ orderId, onSendMail }: OrderDetailsProps) => {
  const { data, error } = useFetchSaleOrderById(orderId || "");
  if (error) return <Text>Error loading order summary</Text>;
  if (!data) return <Text>Loading...</Text>;
  const { nextStep } = useReturns();
  const order = data?.data || {};

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text c="black" size="xl" fw={"500"}>
       Customer Details
      </Text>

      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-x-8 w-full gap-3 md:max-w-6xl">
          {/* Customer */}
          <div className="flex flex-col">
          <Text fw={"500"}> Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {order.customer?.customer_name || order.customer_name || "N/A"}
            </Text>
          </div>

          {/* Discount */}
          <div className="flex flex-col">
          <Text fw={"500"}> Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* {parsedFees.discount ? `₦${parsedFees.discount}` : "None"} */}
              {order.customer?.customer_email || "N/A"}
            </Text>
          </div>

          {/* Reason for Return (hardcoded or dynamic) */}
          <div className="flex flex-col">
          <Text fw={"500"}>Phone</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {order.customer?.customer_phone || "N/A"}
            </Text>
          </div>

          {/* Refund Status */}
          <div className="flex flex-col">
          <Text fw={"500"}>Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
            {order.customer?.customer_address || "N/A"}
            </Text>
          </div>
        </div>
        <Text
        onClick={() => {
          if (onSendMail) {
            onSendMail(order);
          }
          nextStep();
        }}
          fw={"600"}
          c="customPrimary.10"
          className="cursor-pointer"
        >
          Email Customer
        </Text>
      </section>
    </main>
  );
};

export default OrderSummary;
