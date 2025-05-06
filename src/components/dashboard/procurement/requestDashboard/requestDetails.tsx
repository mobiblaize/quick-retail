import { Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";


const RequestDetails = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
      <section className="md:mt-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Request ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              34728042
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Date Created</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2024 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Quantity</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              9
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Unit Price</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              31,000.00
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Reason for Requests</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Asset Replacement
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Vendor</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Puma
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Department</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Product Department
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Total Cost</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              31,000.00
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 max-w-6xl">
          <div className="flex flex-col col-span-2">
            <Text fw={"500"}>Status</Text>
            <div className="flex gap-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-[#ECFDF3] text-[#027A48] gap-2">
              <PaidDot /> Approved 
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RequestDetails;
