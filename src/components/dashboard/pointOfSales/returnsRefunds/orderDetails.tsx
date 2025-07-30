import { Text } from "@mantine/core";
import {
  useFetchRetrun,
  useFetchSaleOrderById,
} from "../../../../hooks/backendApis/pos/returns";
import { formatDate, shortenTransactionId } from "../../../../utils/helpers";

interface OrderDetailsProps {
  orderId?: string;
  returnData?: string;
  returnId?: string;
}

const OrderDetails = ({ orderId, returnData, returnId }: OrderDetailsProps) => {
  const { data, error } = useFetchSaleOrderById(orderId || "");

  const { data: returnedData } = useFetchRetrun(returnId || "");

  if (error) return <Text>Error loading order details</Text>;
  if (!data) return <Text>No order found</Text>;

  const order = data?.data || {};

  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text c="black" size="xl" fw={"500"}>
        RETURN DETAILS
      </Text>

      {/* Order Info */}
      <section className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Return ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* @ts-ignore */}
              {shortenTransactionId(returnData?.returnId || "N/A")}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Order ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {shortenTransactionId(order.orderID || "N/A")}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Date Returned</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* @ts-ignore */}
              {formatDate(returnData?.dateReturned || "N/A")}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Order Date</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {formatDate(order.created_at || "N/A")}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.payment_method || "N/A"}
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Store/Warehouse</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {order.location.name || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Reason for Return</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* @ts-ignore */}
              {returnData?.returnedReason || "N/A"}
            </Text>
          </div>

          <div className="flex flex-col">
            <Text fw={"500"}>Refund Status</Text>
            <Text
              size="lg"
              fw={"400"}
              style={{
                color:
                // @ts-ignore 
                  {
                    // @ts-ignore 
                    resolved: "#099137", 
                    // @ts-ignore 
                    declined: "#CB1A14",
                    // @ts-ignore 
                    pending: "#B54708", 
                    // @ts-ignore 
                  }[returnData?.complaintStatus?.toLowerCase()] || "#6B7280",
              }}
            >
              {/* @ts-ignore  */}
              {returnData?.complaintStatus || "N/A"}
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 w-full gap-3 md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Discount Status</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {/* {order.payment_status || "N/A"} */}
              None
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Returned Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              <Text size="lg" c={"black"} fw={"400"}>
                <Text size="lg" c={"black"} fw={"400"}>
                  ₦{returnedData?.data?.total_amount_refunded || "N/A"}
                </Text>
              </Text>
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Returned Type</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              <Text size="lg" c={"black"} fw={"400"}>
                <Text size="lg" c={"black"} fw={"400"}>
                  {returnedData?.data?.refund_type || "N/A"}
                </Text>
              </Text>
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Cashier</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              {returnedData?.data?.staff?.firstname &&
              returnedData?.data?.staff?.lastname
                ? `${returnedData.data.staff.firstname} ${returnedData.data.staff.lastname}`
                : "N/A"}
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
          <img
            src={
              returnedData?.data?.product_variation?.image_path ||
              "/placeholder.png"
            }
            alt="product"
            width={200}
            height={200}
          />
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
