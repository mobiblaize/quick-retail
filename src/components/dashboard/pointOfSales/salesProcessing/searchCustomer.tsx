import { Divider, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { ChevronDown, ChevronUp, Plus, Search, X } from "lucide-react";
import { useState } from "react";

const SearchCustomer = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleAddCustomer = () => {
    setIsAddingCustomer(!isAddingCustomer);
  };

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <header className="px-6 py-2 cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center justify-between">
          <Text size="lg" fw={500} c="textSecondary.9" tt={"uppercase"}>
            {isAddingCustomer ? "add new customer" : "customer"}
          </Text>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </header>

      {isExpanded && (
        <>
          <Divider size="sm" className="mt-3" color="#E4E7EC" />
          <div className="pt-8 pb-6  px-6 transition-all duration-300">
            {!isAddingCustomer ? (
              <>
                <div className="max-w-xl">
                  <FormInput
                    type="text"
                    placeholder="Enter Customer Name"
                    leftIcon={<Search color="#667185" />}
                  />
                </div>
                <footer
                  className="flex mt-5 items-center gap-2.5 cursor-pointer"
                  onClick={toggleAddCustomer}
                >
                  <Plus color="#CC400C" />
                  <Text c="customPrimary.10" fw={500}>
                    Add New Customer
                  </Text>
                </footer>
              </>
            ) : (
              <>
                <div>
                  <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormInput
                      type="text"
                      label="Name"
                      placeholder="Enter Customer Name"
                    />
                    <FormInput
                      type="text"
                      label="Email"
                      placeholder="Enter Customer Email"
                      optional
                    />
                    <FormInput
                      type="number"
                      label="Phone Number"
                      placeholder="Enter customer Phone Number"
                      optional
                    />
                    <FormInput
                      type="text"
                      label="Address"
                      placeholder="Enter Customer Address"
                      optional
                    />
                  </section>
                  <Text
                    fw={500}
                    c="#CB1A14"
                    className="flex cursor-pointer gap-2"
                    onClick={toggleAddCustomer}
                    mt={20}
                  >
                    <X />
                    Remove Customer
                  </Text>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default SearchCustomer;
