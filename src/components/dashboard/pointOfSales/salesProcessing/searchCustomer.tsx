import { Divider, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchAllCustomers } from "../../../../hooks/backendApis/pos/products";
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import { notifications } from "@mantine/notifications";



interface CustomerData {
  customerID: string;
  customer_name: string;
  customer_email: string;
}

interface SearchCustomerProps {
  onCustomerSelect: (customerID: string | null) => void;
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({
  onCustomerSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });
  const createCustomer = useCreateCustomer();
  
  const handleCreateCustomer = () => {
    createCustomer.mutate(newCustomer, {
      onSuccess: (response) => {
        const customerID = response?.data?.customerID;
        if (customerID) {
          onCustomerSelect(customerID);
          setSearchTerm(newCustomer.customer_name);
          setIsAddingCustomer(false);
  
          // ✅ Show success notification
          notifications.show({
            title: 'Customer Created',
            message: `${newCustomer.customer_name} has been added successfully.`,
            color: 'green',
          });
        }
      },
      onError: () => {
        // ✅ Show error notification
        notifications.show({
          title: 'Error',
          message: 'Failed to create customer. Please try again.',
          color: 'red',
        });
      },
    });
  };

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Fetch customers matching searchTerm
  const { data, refetch, } = useSearchAllCustomers(
    { search: searchTerm },
    false
  );

  const customerList: CustomerData[] = data
    ? Array.isArray(data)
      ? data
      : [data]
    : [];

  useEffect(() => {
    if (searchTerm.length > 2) {
      refetch();
    }
  }, [searchTerm, refetch]);

  // When user types:
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCustomer(null);
  };

  // When user selects from dropdown:
  const handleSelectCustomer = (customer: CustomerData) => {
    setSelectedCustomer(customer);
    setSearchTerm(customer.customer_name);
    onCustomerSelect(customer.customerID); // <-- Pass customerID to parent here
  };
  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <header className="px-6 py-2 cursor-pointer" onClick={toggleExpand}>
        <div className="flex items-center justify-between">
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            {isAddingCustomer ? "Add New Customer" : "Customer"}
          </Text>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </header>

      {isExpanded && (
        <>
          <Divider size="sm" className="mt-3" color="#E4E7EC" />

          <div className="w-full px-6 pb-6 relative">
            {!isAddingCustomer ? (
              <>
                <div className="max-w-md">
                  <h1 className=" mt-[1em] ">SEARCH CUSTOMER</h1>
                  <FormInput
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Enter Customer Name"
                    leftIcon={<Search color="#667185" />}
                    readOnly={!!selectedCustomer}
                  />
                </div>
                {/* Dropdown results */}
                {!selectedCustomer &&
                  searchTerm.length > 2 &&
                  customerList.length > 0 && (
                    <div className="absolute bg-white border mt-[1em] rounded shadow-md max-h-48 overflow-y-auto max-w-md z-10">
                      {customerList.map((customer) => (
                        <div
                          key={customer.customerID}
                          className="cursor-pointer hover:bg-gray-100 p-2 rounded"
                          onClick={() => handleSelectCustomer(customer)}
                        >
                          {customer.customer_name}
                        </div>
                      ))}
                    </div>
                  )}

                <div className="mt-[1em] text-[#EB5017] cursor-pointer">
                  <span onClick={() => setIsAddingCustomer(true)}>
                    + Add Customer
                  </span>
                </div>

                {/* Clear selection */}
                {selectedCustomer && (
  <button
    className="mt-2 text-red-600 flex items-center gap-1"
    onClick={() => {
      setSelectedCustomer(null);
      setSearchTerm("");
      onCustomerSelect(null);
    }}
  >
    <X size={16} />
    Remove Customer
  </button>
)}

              </>
            ) : (
              // Add Customer Form
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="grid grid-cols-2 gap-4 ">
                  <FormInput
                    label="Customer Name"
                    value={newCustomer.customer_name}
                    onChange={(e: { target: { value: any } }) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_name: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    label="Email"
                    value={newCustomer.customer_email}
                    onChange={(e: { target: { value: any } }) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Phone"
                    value={newCustomer.customer_phone}
                    onChange={(e: { target: { value: any } }) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_phone: e.target.value,
                      })
                    }
                  />
                  <FormInput
                    label="Address"
                    value={newCustomer.customer_address}
                    onChange={(e: { target: { value: any } }) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-4 justify-end text-right items-end">
                  <button
                    className="mt-2  w-[150px] px-2 h-[44px]  border border-[#F16722] text-[#F16722] bg-[white]  rounded-lg"
                    onClick={() => setIsAddingCustomer(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-4  w-[150px] h-[44px] px-2 rounded-lg text-[white] bg-[#F16722] "
                    onClick={handleCreateCustomer}
                  >
                    Create Customer
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
};

export default SearchCustomer;
