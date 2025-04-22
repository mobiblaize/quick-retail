import { Avatar, Divider, Text } from "@mantine/core";
import { PaidDot } from "../../../assets/svg";
import imageSrc from "../../../assets/images/productIMG.png";
import { paymentData } from "../../../utils/mockData";
import { CircleHelp } from "lucide-react";

const productItems = [
  {
    avatar: imageSrc,
    name: "Sleek Sneakers 24",
    size: "40",
    color: "Black",
    price: "#30,000",
    qty: "1",
  },
  {
    avatar: imageSrc,
    name: "Classic Loafers 20",
    size: "42",
    color: "Brown",
    price: "#25,000",
    qty: "2",
  },
  {
    avatar: imageSrc,
    name: "Sporty Runners X1",
    size: "41",
    color: "White",
    price: "#35,000",
    qty: "1",
  },
];

const CustomerReceipt = () => {
  return (
    <main className="md:max-w-[45%] w-full border border-[#E4E7EC] py-6 h-auto rounded-lg bg-white">
      <div className="px-3.5">
        <header>
          <div className="flex gap-2">
            <Text size="xl" c="black" fw={600}>
              Order ID: #23456
            </Text>
            <div className="inline-flex bg-[#ECFDF3] items-center px-3 py-1 rounded-full font-medium text-sm">
              <PaidDot />
              <span className="ml-2">Paid</span>
            </div>
          </div>
          <div className="flex mt-2 gap-5">
            <Text fw={400} className="text-lg">
              Order Date:{" "}
              <span className="ml-2 text-gray-400">June 7, 2024</span>
            </Text>
            <Text fw={400} className="text-lg whitespace-nowrap">
              Payment Method: <span className="ml-2 text-gray-400">Card</span>
            </Text>
          </div>
        </header>
        <Divider size="sm" className="my-8" color="#E4E7EC" />
        <section>
          {productItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-4">
              <div className="flex gap-3">
                <Avatar
                  src={item.avatar}
                  alt={item.name}
                  radius="md"
                  size={50}
                />
                <div className="flex gap-2 flex-col">
                  <Text fw={500} size="xl" c="black">
                    {item.name}
                  </Text>
                  <div className="flex text-lg text-gray-400">
                    <span className="mr-2">{item.size}"</span>|
                    <span className="ml-2">{item.color}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 flex-col">
                <Text fw={500} size="xl" c="black">
                  {item.price}
                </Text>
                <span className="flex text-gray-400 justify-end">
                  Qty: {item.qty}
                </span>
              </div>
            </div>
          ))}
        </section>
        <section>
          <div className="py-5 border-t border-b border-[#E4E7EC] flex justify-between items-center">
            <Text size="xl">Customer Name</Text>
            <div className="flex flex-col">
              <Text size="xl" fw={500} c="black">
                Adekunle Ibrahim
              </Text>
              <Text size="lg" className="flex justify-end">
                +2348073632861
              </Text>
            </div>
          </div>
        </section>

        <section>
          <div className="pt-8 pb-6">
            <div className="flex flex-col gap-2.5">
              {paymentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
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
          </div>
        </section>
        <footer>
          <Text className="text-gray-600" fw={300}>
            Kindly reach out to our customer care{" "}
            <span className="text-orange-500">@victorialchehelpdesk.com</span>{" "}
            for complaints enquiries or feedback. Thank you for your patronage
          </Text>
        </footer>
      </div>
    </main>
  );
};

export default CustomerReceipt;
