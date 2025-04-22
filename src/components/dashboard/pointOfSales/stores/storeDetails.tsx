import { Switch, Text } from "@mantine/core";
import { PaidDot } from "../../../../assets/svg";
import { useState } from "react";

const StoreDetails = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  return (
    <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
      <section className="md:mt-6 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Store ID</Text>
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
            <Text fw={"500"}>GLA</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              7420 Sqm
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>GSA</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              April 29, 2025 12:00:21 PM
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
          <div className="flex flex-col">
            <Text fw={"500"}>Registered Customers</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              4,232
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Total Staff</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              247
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>State Lagos</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Lagos
            </Text>
          </div>
          <div className="flex flex-col">
            <Text fw={"500"}>Local Government Area</Text>
            <Text size="lg" c={"black"} fw={"400"}>
              Ikeja
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-8 mt-6 max-w-6xl">
          <div className="flex flex-col col-span-2">
            <Text fw={"500"}>Address</Text>
            <Text
              size="lg"
              c={"black"}
              fw={"400"}
              className="whitespace-nowrap overflow-hidden text-ellipsis"
            >
              142, Obafemi Awolowo Stree, Ikeja Alausa Lagos
            </Text>
          </div>
          <div className="flex flex-col col-span-2">
            <Text fw={"500"}>Status</Text>
            <div className="flex gap-2">
              <div className="inline-flex items-center px-3 py-1 rounded-full font-medium text-sm bg-[#ECFDF3] text-[#027A48]">
                Active <PaidDot />
              </div>
              <Switch
                checked={isEnabled}
                onChange={(event) => setIsEnabled(event.target.checked)}
                className={`${
                  isEnabled ? "text-orange-600" : "text-gray-300"
                } relative inline-flex h-6 w-12 items-center rounded-full transition`}
                size="md"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StoreDetails;
