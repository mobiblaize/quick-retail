import { Avatar, Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";

type SaleOrderDetails = {
  product_variation?: {
    image_path?: string;
    name?: string;
    sku?: string;
    code?: string;
  };
  unit_price: number;
  quantity_ordered: number;
  total_price: number;
};

type Customer = {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
};



export interface SaleData {
  data: {
    order_number: string;
    payment_status: string;
    date_completed: string;
    payment_method: string;
    customer: Customer;
    sale_order_details: SaleOrderDetails[];
    order_total: number;
    amount_paid: number;
    fees: string; // JSON string you parse
  };
}


interface ViewOrderReceiptDraftProps {
  saleData: SaleData;
  isLoading: boolean;
  isError: boolean;
}

const ViewOrderReceiptDraft = ({ saleData, isLoading, isError }: ViewOrderReceiptDraftProps) =>
{

  if (isLoading) return <div>Loading receipt...</div>;
  if (isError || !saleData) return <div>Failed to load receipt data.</div>;


  

  const order = saleData.data;

  // Parse fees
  const fees = JSON.parse(order.fees || '{}');
  const items = order.sale_order_details || [];

  return (
    <main className="w-full border border-[#E4E7EC] py-6 h-auto rounded-lg bg-white">
      <div className="px-7 flex flex-col gap-4">
        <header className="w-full md:max-w-[45%]">
          <div className="flex flex-wrap gap-2 items-center">
            <Text size="2rem" c="black" fw={600}>
              Order ID: {order.order_number}
            </Text>
            <div className="inline-flex bg-[#ECFDF3] items-center px-3 py-1 rounded-full font-medium text-sm">
              <PaidDot />
              <span className="ml-2 capitalize">{order.payment_status}</span>
            </div>
          </div>
          <div className="flex flex-wrap mt-2 gap-5">
            <Text fw={400} className="text-xl">
              Order Date:
              <span className="ml-2 text-gray-400">{new Date(order.date_completed).toDateString()}</span>
            </Text>
            <Text fw={400} className="text-xl">
              Payment Method:
              <span className="ml-2 text-gray-400 capitalize">{order.payment_method}</span>
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

        <section className="md:py-4 py-2 md:max-w-6xl w-full">
          <Text fw="400" size="lg">Items</Text>
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
                    <Text size="lg" fw={400}>SKU:</Text>
                    <Text c="#101928" fw={600}>
                      {item.product_variation?.sku}
                    </Text>
                  </div>
                  <div className="flex justify-between">
                    <Text size="lg" fw={400}>Code:</Text>
                    <Text c="#101928" fw={600}>
                      {item.product_variation?.code}
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>Unit Price</Text>
                <Text c="#344054" size="lg">₦{item.unit_price}</Text>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>Quantity</Text>
                <Text c="#344054" size="lg">{item.quantity_ordered}</Text>
              </div>
              <div className="flex gap-2 flex-col">
                <Text c="#101928" size="lg" fw={500}>Total Price</Text>
                <Text c="#2E90FA" size="lg">₦{item.total_price}</Text>
              </div>
            </div>
          ))}
        </section>

        <section className="pt-8 pb-6 md:max-w-6xl w-full">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <Text fw={500}>Subtotal</Text>
              <Text>₦{order.order_total}</Text>
            </div>
            <div className="flex items-center justify-between">
              <Text fw={500}>Tax ({fees.tax_rate}%)</Text>
              <Text>₦{fees.tax}</Text>
            </div>
            {/* <div className="flex items-center justify-between">
              <Text fw={500}>Service Fee <CircleHelp size={16} className="inline-block ml-2 text-[#2E90FA]" /></Text>
              <Text>₦{fees.service_fee}</Text>
            </div> */}
            <div className="flex items-center justify-between">
              <Text fw={500}>Discount</Text>
              <Text>₦{fees.discount}</Text>
            </div>
            <div className="flex items-center justify-between font-bold text-lg mt-4">
              <Text>Total Paid</Text>
              <Text>₦{order.amount_paid}</Text>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewOrderReceiptDraft;
