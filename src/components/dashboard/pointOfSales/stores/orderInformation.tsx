import { Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";
import { OrderData } from "../../../../types";
import { formatDate } from "../../../../utils/helpers";

interface InformationTabProps {
  orderData: OrderData;
}

const OrderInformation: React.FC<InformationTabProps> = ({ orderData }) => {
  if (!orderData) return null;
  console.log(orderData, "orderData");

  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 py-8">
      <section className="md:mt-2 mt-1">
        <Text className="border-b text-gray-100" c="black" size="lg" fw={"500"}>
          ORDER DETAILS
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
          <div className="flex flex-col">
            <Text fw={"500"}>Order Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.order_number}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {formatDate(orderData.created_at)}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Total Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.order_total}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Status</Text>
            <div className="inline-flex items-center px-3 py-1 gap-1.5 w-fit rounded-full bg-[#ECFDF3] text-[#027A48]">
              <PaidDot />
              <Text size="lg" c={"black"} fw={"400"}>
                {orderData.payment_status}
              </Text>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.payment_method}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Cashier</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* {orderData.cashier_name} */}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Number of Items</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* @ts-ignore */}
              {orderData.sale_order_details?.[0]?.quantity_ordered}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Discount Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* {orderData.sale_order_details?.[0]?.status} */}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="flex flex-col">
            <Text fw={"500"}>Customer Name</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.customer_name}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Email</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.customer.customer_email}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Phone Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.customer.customer_phone}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Address</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {orderData.customer.customer_address}
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderInformation;
