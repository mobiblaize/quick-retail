import { Text } from "@mantine/core";
import product from "../../../../assets/images/Image.png"
;
const OrderDetails = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-white px-6 py-8">
      <Text className="" c="black" size="xl" fw={"500"}>
        Order Details
      </Text>
      <section className="mt-6">
        <div className="grid grid-cols-4 gap-x-8 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Product ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              34728042
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Returned</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2024 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Bought</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Order ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              7420 Sqm
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-8 mt-6 max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Product</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Sleek Sneakers'22
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Store/Warehouse</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Store 5
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              #32,000.00
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Payment Method</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Cash
            </Text>
          </div>
        </div>
      </section>
      <section className="mt-[1.5em]">
        <Text fw={"500"} size="xl">
          Product ID
        </Text>
        <div className="flex mt-3 gap-3">
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
          <img src={product} alt="product" width={200} />
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
