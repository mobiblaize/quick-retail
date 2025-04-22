import { Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";

const OrderInformation = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 py-8">
      <section className="md:mt-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4  gap-3 gap-x-8 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Order Number</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              3478042
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Total Amount</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              #389,000.00
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Delivery Date & Time</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-4  mt-6">
          <div className="flex flex-col">
            <Text fw={"500"}>Status</Text>
            <div className="inline-flex items-center px-3 py-1 gap-1.5 w-fit rounded-full bg-[#ECFDF3] text-[#027A48]">
              <Text size="lg" c={"black"} fw={"400"}>
                Success
              </Text>
              <PaidDot />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderInformation;
