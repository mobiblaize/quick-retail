import { Text } from "@mantine/core";
import product from "../../../../assets/images/Image.png";
import { useFetchSaleOrderById } from "../../../../hooks/backendApis/pos/returns";

interface OrderDetailsProps {
  orderId?: string;
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const { data, error } = useFetchSaleOrderById(orderId || "");

  if (error) return <Text>Error loading order details</Text>;
  if (!data) return <Text>No order found</Text>;

  const order = data?.data || {};
  const parsedFees = order.fees ? JSON.parse(order.fees) : {};

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text c="black" size="xl" fw={"500"}>
        Order Details 
      </Text>

      {/* Order Info */}
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Order ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.orderID || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Order Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.order_number || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Date Completed</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.date_completed || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.payment_method || "N/A"}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Order Total</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.order_total ? `₦${order.order_total}` : "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Amount Paid</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.amount_paid ? `₦${order.amount_paid}` : "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Balance</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.balance ? `₦${order.balance}` : "₦0.00"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Payment Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.payment_status || "N/A"}
            </Text>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Customer Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.customer?.customer_name || order.customer_name || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Customer Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.customer?.customer_email || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Customer Phone</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.customer?.customer_phone || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Customer Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.customer?.customer_address || "N/A"}
            </Text>
          </div>
        </div>

        {/* Cashier */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Cashier</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.cashier
                ? `${order.cashier.firstname} ${order.cashier.lastname}`
                : "N/A"}
            </Text>
          </div>
        </div>

        {/* Fees */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Tax</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {parsedFees.tax ? `₦${parsedFees.tax}` : "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Service Fee</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {parsedFees.service_fee ? `₦${parsedFees.service_fee}` : "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Item Count</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {parsedFees.item_count || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Tax Rate (%)</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {parsedFees.tax_rate || "N/A"}
            </Text>
          </div>
        </div>
      </section>

      {/* Product Images */}
      <section className="mt-[1.5em]">
        <Text fw={"500"} size="xl">
          Product Images
        </Text>
        <div className="flex md:flex-row flex-col w-full mt-3 gap-3">
          {/* Replace with actual images if available in the API */}
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
