import { Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";

const ProcurementSummaryDetails = () => {
  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
      <section className="md:mt-6 mt-4">
        <div className="border-b mb-[3em] border-[#EAECF0]">
          <Text fw={"500"} size="xl" c="black">
            Asset Information
          </Text>
          <Text fw={"300"} size="m" c="textSecondary.7">
            You're viewing asset information below
          </Text>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Request ID</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              34728042
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Request Date</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2024 12:00:21 PM
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Request Status</Text>
            <div className="flex gap-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-[#ECFDF3] text-[#027A48] gap-2">
                <PaidDot /> Active Asset
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Asset Type</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Laptop
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Describe Asset</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              13 Inch Laptop
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Quantity</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              2
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Estimated Cost</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              20
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Requestor</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Victoria Hansel
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Reason For Procurement</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Write here
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Supporting Document</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              write here
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Approvers</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              write here
            </Text>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProcurementSummaryDetails;
