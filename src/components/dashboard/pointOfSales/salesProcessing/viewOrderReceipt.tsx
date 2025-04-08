import { Avatar, Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";
import imageSrc from "../../../../assets/images/productIMG.png";
import { paymentData } from "../../../../utils/mockData";
import { CircleHelp } from "lucide-react";

const ViewOrderReceipt = () => {
  const productItems = [
    {
      name: "Sleek Sneakers 24",
      size: "40",
      color: "Black",
      pc: "AD 12345 FG",
      unitPrice: "#30,000",
      quantity: 1,
      totalPrice: "#30,000",
    },
    {
      name: "Classic Loafers 10",
      size: "42",
      color: "Brown",
      pc: "CL 56789 XY",
      unitPrice: "#25,000",
      quantity: 2,
      totalPrice: "#50,000",
    },
  ];

  return (
    <main className="w-full border border-[#E4E7EC] py-6 h-auto rounded-lg bg-white">
      <div className="px-7 flex flex-col gap-4">
        <header className="max-w-[45%]">
          <div className="flex gap-2">
            <Text size="2rem" c="black" fw={600}>
              Order ID: #23456
            </Text>
            <div className="inline-flex bg-[#ECFDF3] items-center px-3 py-1 rounded-full font-medium text-sm">
              <PaidDot />
              <span className="ml-2">Paid</span>
            </div>
          </div>
          <div className="flex mt-2 gap-5">
            <Text fw={400} className="text-xl">
              Order Date:{" "}
              <span className="ml-2 text-gray-400">June 7, 2024</span>
            </Text>
            <Text fw={400} className="text-xl">
              Payment Method: <span className="ml-2 text-gray-400">Card</span>
            </Text>
          </div>
        </header>
        <section className="border-t py-2 mt-3 border-b border-[#E4E7EC]">
          <div className="max-w-5xl flex justify-between py-4">
            <Text size="lg">
              Customer Name:
              <span className="ml-3 text-[#101928] text-lg">
                Adekunle Ibrahim
              </span>
            </Text>
            <Text size="lg">
              Phone Number:
              <span className="ml-3 text-[#101928] text-lg">
                +234 378 727 8189
              </span>
            </Text>
            <Text className="text-lg" size="lg">
              Email:
              <span className="ml-3 text-[#101928] text-lg">
                adekunleibraim@gmail.com
              </span>
            </Text>
          </div>
        </section>
        <div className="max-w-6xl">
          <section className="py-4">
            <Text fw="400" size="lg">
              Items
            </Text>
            {productItems.map((item, index) => (
              <div key={index} className="flex mt-8 justify-between">
                <div className="flex gap-6">
                  <Avatar
                    src={imageSrc}
                    alt={item.name}
                    radius="md"
                    size={60}
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <Text c="#101928" size="xl" fw={600}>
                      {item.name}
                    </Text>
                    <div className="flex justify-between">
                      <Text size="lg" fw={400}>
                        Size:
                      </Text>
                      <Text c="#101928" fw={600}>
                        {item.size}
                      </Text>
                    </div>
                    <div className="flex justify-between">
                      <Text size="lg" fw={400}>
                        Color:
                      </Text>
                      <Text c="#101928" fw={600}>
                        {item.color}
                      </Text>
                    </div>
                    <div className="flex justify-between">
                      <Text size="lg" fw={400}>
                        PC:
                      </Text>
                      <Text c="#101928" fw={600}>
                        {item.pc}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-col">
                  <Text c="#101928" size="lg" fw={500}>
                    Unit Price
                  </Text>
                  <Text c="#344054" size="lg">
                    {item.unitPrice}
                  </Text>
                </div>
                <div className="flex gap-2 flex-col">
                  <Text c="#101928" size="lg" fw={500}>
                    Quantity
                  </Text>
                  <Text c="#344054" size="lg">
                    {item.quantity}
                  </Text>
                </div>
                <div className="flex gap-2 flex-col">
                  <Text c="#101928" size="lg" fw={500}>
                    Total Price
                  </Text>
                  <Text c="#2E90FA" size="lg">
                    {item.totalPrice}
                  </Text>
                </div>
              </div>
            ))}
          </section>
          <section>
            <div className="pt-8 pb-6">
              <div className="flex flex-col gap-6">
                {paymentData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <Text fw={500}>
                        {item.label}
                        {item.label === "Service fee" && (
                          <CircleHelp
                            size={16}
                            className="inline-block ml-2 text-[#2E90FA]"
                          />
                        )}
                      </Text>
                    </div>
                    <Text fw={500}>{item.amount}</Text>
                  </div>
                ))}
              </div>
              <div className="flex items-center border-[#E4E7EC] border-t border-b my-10 py-3.5 justify-between">
                <Text c="black" size="xl" fw={600}>
                  Total
                </Text>
                <Text c="black" size="xl" fw={600}>
                  ₦ 33,250
                </Text>
              </div>
              <div className="flex items-center border-[#E4E7EC] border-b pb-3 justify-between">
                <Text size="lg" fw={400}>
                  Cashier
                </Text>
                <Text c="black" size="lg" fw={400}>
                  Ibukun Lawal
                </Text>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ViewOrderReceipt;
