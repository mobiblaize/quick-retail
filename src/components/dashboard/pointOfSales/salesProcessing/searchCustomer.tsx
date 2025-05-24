import { Divider, Text } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchAllCustomers } from "../../../../hooks/backendApis/pos/products";

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
  const [isAddingCustomer] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    null
  );

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Fetch customers matching searchTerm
  const { data, refetch, isFetching } = useSearchAllCustomers(
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
          <div className="w-full mt-[2em] px-6 pb-6 relative">
  {/* Flex row only if email is shown */}
  <div
    className={`flex gap-4 items-end ${
      selectedCustomer ? "w-full" : "max-w-md"
    }`}
  >
    <div className={`${selectedCustomer ? "w-1/2" : "w-full"}`}>
      <FormInput
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter Customer Name"
        leftIcon={<Search color="#667185" />}
        readOnly={!!selectedCustomer}
      />
    </div>

    {selectedCustomer && (
      <div className="w-1/2">
        <FormInput
          label="Email"
          value={selectedCustomer.customer_email}
          readOnly
        />
      </div>
    )}
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
            {customer.customer_name} ({customer.customer_email})
          </div>
        ))}
      </div>
    )}

  {/* Loading */}
  {isFetching && (
    <div className="absolute mt-1 text-sm text-gray-500 bg-white border rounded shadow p-2 max-w-lg z-10">
      Loading...
    </div>
  )}

  {/* Clear button */}
  {selectedCustomer && (
    <button
      className="mt-2 text-red-600 underline"
      onClick={() => {
        setSelectedCustomer(null);
        setSearchTerm("");
        onCustomerSelect(null);
      }}
    >
      Clear selection
    </button>
  )}
</div>

        </>
      )}
    </main>
  );
};

export default SearchCustomer;
