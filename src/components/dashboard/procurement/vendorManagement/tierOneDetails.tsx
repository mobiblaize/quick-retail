import { Text } from "@mantine/core";

const TierOneDetails = () => {
  return (
    <>
      <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
        <section className="md:mt-6 mt-4">
          <div className="text-[20px] mb-8 text-[#000]">
            Company Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Registered Company Name</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Dairo Enterprise
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Vendor ID</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                19876546
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Vendor Category</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Category 01
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>RC Number</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                8788976
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Company Size</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                20 - 30 Employees
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Tax Identification Number (TIN)</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                2478
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Company Address</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Lagos
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>State/City</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Lagos
              </Text>
            </div>
          </div>
        </section>
      </main>

      <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
        <section className="md:mt-6 mt-4">
          <div className="text-[20px] mb-8 text-[#000]">
            Contact Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Company Website</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Dairo Enterprise
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Company Role</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                19876546
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Email Address</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                Category 01
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Account Manager Name</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                wisdom
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Mobile Number</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                247888987678
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Other Numbers</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                9899
              </Text>
            </div>
          </div>
        </section>
      </main>

      
      <main className="w-full h-auto rounded-lg bg-[#F9FAFB] px-6 md:py-8">
        <section className="md:mt-6 mt-4">
          <div className="text-[20px] mb-8 text-[#000]">
            Payment Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 space-y-5 md:gap-x-8 md:gap-y-10 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Currency Preference</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                 GBP (Pounds)
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Discount Structure</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                10%
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Account Number</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                0990998999
              </Text>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 gap-x-8 mt-6 w-full md:max-w-6xl">
            <div className="flex flex-col">
              <Text fw={"500"}>Receiving Bank</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                wise
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Min. Order Qty</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                100
              </Text>
            </div>
            <div className="flex flex-col">
              <Text fw={"500"}>Max. Order Quantity</Text>
              <Text size="lg" c={"black"} fw={"400"}>
                10000
              </Text>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default TierOneDetails;
