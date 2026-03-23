import { Divider, Text, Button } from "@mantine/core"; // Added Button for better UI
import { X, User } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { useSearchAllCustomers } from "../../../../hooks/backendApis/pos/products";
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import { notifications } from "@mantine/notifications";
import { useOrderStore } from "../../../../hooks/useOrderStore";
import FormInput from "../../../General/formInput";

interface CustomerData {
  customer_phone: ReactNode;
  customerID: string;
  customer_name: string;
  customer_email: string;
}

interface SearchCustomerProps {
  onCustomerSelect: (customerID: string | null) => void;
  initialCustomerId?: string | null;
  initialCustomerName?: string;
  collapsible?: boolean;
  showIcon?: boolean;
  allowGuest?: boolean; // New prop to make customer optional
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({
  onCustomerSelect,
  initialCustomerId,
  initialCustomerName,
  collapsible = true,
  // allowGuest = true, 
}) => {
  const { setCustomer, customer: storeCustomer } = useOrderStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const isOpen = collapsible ? isExpanded : true;
  const toggleExpand = () => collapsible && setIsExpanded(!isExpanded);

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  const getInitialCustomer = (): CustomerData | null => {
    if (initialCustomerId && initialCustomerName) {
      return { customerID: initialCustomerId, customer_name: initialCustomerName, customer_email: "", customer_phone: "" };
    }
    if (storeCustomer?.id && storeCustomer?.name) {
      return { customerID: storeCustomer.id, customer_name: storeCustomer.name, customer_email: "", customer_phone: "" };
    }
    return null;
  };

  const [searchTerm, setSearchTerm] = useState(() => initialCustomerName || storeCustomer?.name || "");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(getInitialCustomer());
  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const createCustomer = useCreateCustomer();

  // Sync with external props
  useEffect(() => {
    if (initialCustomerId && initialCustomerName) {
      if (selectedCustomer?.customerID !== initialCustomerId) {
        const customer = { customerID: initialCustomerId, customer_name: initialCustomerName, customer_email: "", customer_phone: "" };
        setSelectedCustomer(customer);
        setSearchTerm(initialCustomerName);
      }
    }
  }, [initialCustomerId, initialCustomerName, selectedCustomer?.customerID]);

  const { data, refetch } = useSearchAllCustomers({ search: searchTerm }, false);
  const dataArray = Array.isArray(data) ? data : [data];
  const customerList: CustomerData[] = data ? dataArray : [];

  useEffect(() => {
    if (searchTerm.length > 2 && !selectedCustomer) {
      refetch();
    }
  }, [searchTerm, refetch, selectedCustomer]);

  const handleSelectCustomer = (c: CustomerData) => {
    setSelectedCustomer(c);
    setSearchTerm(c.customer_name);
    onCustomerSelect(c.customerID);
    setCustomer({ id: c.customerID, name: c.customer_name });
  };

  // const handleSetGuest = () => {
  //   setSelectedCustomer(null);
  //   setSearchTerm("");
  //   onCustomerSelect(null);
  //   setCustomer({ id: null, name: "Guest Customer" });
  //   notifications.show({
  //     title: "Guest Mode",
  //     message: "Proceeding without a registered customer.",
  //     color: "blue",
  //   });
  // };

  // Helper for creation
  const handleCreateCustomer = () => {
    if (newCustomer.customer_phone.length !== 11) {
      notifications.show({ title: "Invalid phone", message: "Enter an 11-digit phone number.", color: "red" });
      return;
    }

    createCustomer.mutate(newCustomer, {
      onSuccess: (response) => {
        const id = response?.data?.customerID;
        if (id) {
          onCustomerSelect(id);
          setSearchTerm(newCustomer.customer_name);
          setIsAddingCustomer(false);
          setCustomer({ id, name: newCustomer.customer_name });
          setSelectedCustomer({ ...newCustomer, customerID: id, customer_phone: newCustomer.customer_phone });
        }
      },
    });
  };

  return (
    <main className="w-full h-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {collapsible ? (
        <button
          type="button"
          className="w-full text-left px-6 py-2 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex items-center justify-between">
            <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
              {isAddingCustomer ? "Add New Customer" : "Customer Selection"}
            </Text>
            {selectedCustomer && (
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <User size={14} className="text-orange-600" />
                <Text size="xs" fw={600} className="text-orange-700">{selectedCustomer.customer_name}</Text>
              </div>
            )}
            {!selectedCustomer && !isAddingCustomer && (
              <Text size="xs" c="dimmed">Optional</Text>
            )}
          </div>
        </button>
      ) : (
        <div className="px-6 py-2">
          <div className="flex items-center justify-between">
            <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
              {isAddingCustomer ? "Add New Customer" : "Customer Selection"}
            </Text>
            {selectedCustomer && (
              <div className="flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                <User size={14} className="text-orange-600" />
                <Text size="xs" fw={600} className="text-orange-700">{selectedCustomer.customer_name}</Text>
              </div>
            )}
            {!selectedCustomer && !isAddingCustomer && (
              <Text size="xs" c="dimmed">Optional</Text>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <>
          <Divider size="sm" className="my-3" color="#E4E7EC" />

          <div className="w-full px-6 pb-6 relative">
            {!isAddingCustomer ? (
              <>
                <div className="relative max-w-md">
                  <Text size="xs" fw={700} mb="xs" c="dimmed">SEARCH EXISTING CUSTOMER</Text>

                  <div className="flex items-center gap-2">
                    <FormInput
                      value={searchTerm}
                      onChange={(val: string) => {
                        setSearchTerm(val);
                        if (selectedCustomer) setSelectedCustomer(null);
                      }}
                      placeholder="Enter Name or Phone..."
                      paddingY={"0.7rem"}
                      className="w-full "
                    />
                    {(selectedCustomer || searchTerm) && (
                      <button
                        onClick={() => {
                          setSelectedCustomer(null);
                          setSearchTerm("");
                          onCustomerSelect(null);
                          setCustomer({ id: null, name: "" });
                        }}
                        className="p-2 hover:bg-gray-100 rounded-full"
                      >
                        <X size={18} className="text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Results */}
                  {!selectedCustomer && searchTerm.length > 2 && customerList.length > 0 && (
                    <div className="absolute left-0 right-0 border border-gray-300 mt-1 rounded shadow-lg max-h-48 overflow-y-auto z-50 bg-white">
                      {customerList.map((c) => (
                        <button
                          key={c.customerID}
                          type="button"
                          className="w-full text-left cursor-pointer hover:bg-orange-50 px-4 py-2 border-b last:border-none transition-colors"
                          onClick={() => handleSelectCustomer(c)}
                        >
                          <Text fw={500} size="sm">{c.customer_name}</Text>
                          <Text size="xs" c="dimmed">{c.customer_phone}</Text>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 mt-6">
                  <Text
                    size="sm"
                    fw={600}
                    c="#EB5017"
                    className="cursor-pointer hover:underline"
                    onClick={() => setIsAddingCustomer(true)}
                  >
                    + Add New Customer
                  </Text>

                  {/* {allowGuest && !selectedCustomer && (
                    <Button 
                        variant="subtle" 
                        color="gray" 
                        size="xs" 
                        onClick={handleSetGuest}
                        leftSection={<User size={14} />}
                    >
                        Continue as Guest
                    </Button>
                  )} */}
                </div>
              </>
            ) : (
              /* Create Customer Form */
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Customer Name"
                    value={newCustomer.customer_name}
                    placeholder="Full Name"
                    onChange={(val: string) => setNewCustomer({ ...newCustomer, customer_name: val })}
                  />
                  <FormInput
                    label="Email"
                    value={newCustomer.customer_email}
                    placeholder="Email Address"
                    onChange={(val: string) => setNewCustomer({ ...newCustomer, customer_email: val })}
                  />
                  <FormInput
                    label="Phone Number"
                    value={newCustomer.customer_phone}
                    placeholder="080..."
                    maxLength={11}
                    onChange={(val: string) => setNewCustomer({ ...newCustomer, customer_phone: val.replaceAll(/\D/g, "") })}
                  />
                  <FormInput
                    label="Address"
                    value={newCustomer.customer_address}
                    placeholder="Delivery Address"
                    onChange={(val: string) => setNewCustomer({ ...newCustomer, customer_address: val })}
                  />
                </div>
                
                <div className="flex gap-3 mt-2">
                  <Button 
                    variant="outline" 
                    color="orange" 
                    onClick={() => setIsAddingCustomer(false)}
                    className="flex-1 md:flex-none md:w-[140px]"
                  >
                    Cancel
                  </Button>
                  <Button 
                    color="orange" 
                    onClick={handleCreateCustomer}
                    className="flex-1 md:flex-none md:w-[180px]"
                    loading={createCustomer.isPending}
                  >
                    Create & Select
                  </Button>
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