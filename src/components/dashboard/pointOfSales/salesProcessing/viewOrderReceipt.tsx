import { Avatar, Center, Loader, Text } from "@mantine/core";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/emptyillustration.png"; // fallback
import { useLocation } from "react-router";
import { useFetchSingleSale } from "../../../../hooks/backendApis/pos/salesProcessing";
import { formatMoney } from "../../../../utils/helpers";

const ViewOrderReceipt = () => {
  const location = useLocation();
  const orderId = location.state?.orderID;
  const { data: saleData, isLoading, isError } = useFetchSingleSale(orderId);

  if (!orderId)
    return (
      <Center>
        <Text c="gray.6" size="sm" fw={500}>
          Preparing receipt...
        </Text>
      </Center>
    );

  if (isLoading)
    return (
      <Center>
        <Loader size="sm" color="orange" />
        <Text c="gray.6" size="sm" fw={500} ml="sm">
          Loading receipt...
        </Text>
      </Center>
    );

  if (isError || !saleData?.data)
    return (
      <Center>
        <Text c="red" size="sm" fw={500}>
          {/* Failed to load receipt data. */}
          Loading receipt...
        </Text>
      </Center>
    );

  const order = saleData.data;


  // Parse fees
  const fees = JSON.parse(order.fees || "{}");
  const items = order.sale_order_details || [];


  return (
    <main className="w-full border border-[#E4E7EC] py-6 h-auto rounded-lg bg-white">
      <div className="px-7 flex flex-col gap-4">
        <header className="w-full md:max-w-[45%]">
          <div className="flex flex-wrap gap-2 items-center">
            <Text size="2rem" c="black" fw={600}>
              Order ID: {order.order_number}
            </Text>
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${order.payment_status?.toLowerCase() === "pending"
                  ? "bg-yellow-100 text-[#B54708]"
                  : "bg-green-100 text-green-800"
                }`}
            >
              {order.payment_status?.toLowerCase() === "pending" ? <UnpaidDot /> : <PaidDot />}
              <span className="ml-2 capitalize">{order.payment_status}</span>
            </div>
          </div>
          <div className="flex flex-wrap mt-2 gap-5">
            <Text fw={400} className="text-xl">
              Order Date:
              <span className="ml-2 text-gray-400">
                {new Date(order.date_completed).toDateString()}
              </span>
            </Text>
            <Text fw={400} className="text-xl">
              Payment Method:
              <span className="ml-2 text-gray-400 capitalize">
                {order.payment_method}
              </span>
            </Text>
          </div>
        </header>

        <section className="border-t py-2 mt-3 border-b border-[#E4E7EC]">
          <div className="md:max-w-5xl w-full md:flex-row flex-col col gap-4 flex justify-between py-4">
            <Text size="lg">
              Customer Name:
              <span className="ml-3 text-[#101928] text-lg">
                {order.customer?.customer_name}
              </span>
            </Text>
            <Text size="lg">
              Phone Number:
              <span className="ml-3 text-[#101928] text-lg">
                {order.customer?.customer_phone}
              </span>
            </Text>
            <Text className="text-lg" size="lg">
              Email:
              <span className="ml-3 text-[#101928] text-lg">
                {order.customer?.customer_email}
              </span>
            </Text>
          </div>
        </section>

        <section className="md:py-4 py-2 md:max-w-6xl w-full border-b border-[#E4E7EC]">
          <Text fw="400" size="lg">
            Items
          </Text>
          {/* @ts-ignore */}
          {items.map((item, index) => (
            <div
              key={index}
              className="md:flex md:flex-row flex-col mt-4 md:mt-8 justify-between"
            >
              <div className="flex gap-6 text-sm text-[12px]">
                <Avatar
                  src={item.product_variation?.image_path || imageSrc}
                  alt={item.product_variation?.name}
                  radius="md"
                  size={60}
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <Text c="#101928" size="xl" fw={600}>
                    {item.product_variation?.name}
                  </Text>
                  <div className="flex justify-between">
                    <Text size="lg" fw={400}>
                      SKU:
                    </Text>
                    <Text c="#101928" fw={600}>
                      {item.product_variation?.sku}
                    </Text>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <Text size="lg" fw={400}>
                      Code:
                    </Text>
                    <Text c="#101928" fw={600}>
                      {item.product_variation?.code || "-"}
                    </Text>
                  </div>

                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>
                  Unit Price
                </Text>
                <Text c="#344054" size="lg">
                  ₦{formatMoney(item.unit_price)}
                </Text>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>
                  Quantity
                </Text>
                <Text c="#344054" size="lg">
                  {item.quantity_ordered}
                </Text>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>
                  Total Price
                </Text>
                <Text c="#2E90FA" size="lg">
                  ₦{formatMoney(item.total_price)}
                </Text>
              </div>
            </div>
          ))}
        </section>

        <section className="pt-8 pb-6 md:max-w-6xl w-full border-b border-[#E4E7EC]">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Text fw={400}>Subtotal</Text>
              <Text c="#101928">₦{formatMoney(fees.sub_total)}</Text>
            </div>
            <div className="flex items-center justify-between">
              <Text fw={400} c="#101928">Discount</Text>
              <Text c="#101928">₦{formatMoney(fees.discount)}</Text>
            </div>
            <div className="flex items-center justify-between">
              <Text fw={400} c="#101928">Tax {fees.tax_rate}%</Text>
              <Text c="#101928">₦{formatMoney(fees.tax)}</Text>
            </div>

            <div className=" border-t border-[#E4E7EC]">
              <div className="flex items-center justify-between text-black font-bold text-xl mt-[1em] ">
                <Text fw={700} c="#101928">
                  Total
                </Text>
                <Text fw={500} c="#101928">
                  ₦{formatMoney(order.order_total)}
                </Text>
              </div>
            </div>
            <div className="border-t border-[#E4E7EC]">
              <div className="flex items-center justify-between font-bold text-lg mt-[3em]  ">
                <Text>Cashier</Text>
                <Text>{`${order.cashier.firstname} ${order.cashier.lastname}`}</Text>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewOrderReceipt;
