import { Divider, Text } from "@mantine/core";
import { X } from "lucide-react";
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
  collapsible?: boolean; // optional if you added this earlier
  showIcon?: boolean; // optional if you added this earlier
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({
  onCustomerSelect,
  initialCustomerId,
  initialCustomerName,
  collapsible = true,
  showIcon,
}) => {
  const { setCustomer, customer: storeCustomer } = useOrderStore();

  // --- collapsing UI (if you kept it)
  const [isExpanded, setIsExpanded] = useState(true);
  const isOpen = collapsible ? isExpanded : true;
  const hasIcon = (showIcon ?? collapsible) && collapsible;
  const toggleExpand = () => collapsible && setIsExpanded(!isExpanded);

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  // Initialize selected customer from props or store
  const getInitialCustomer = (): CustomerData | null => {
    if (initialCustomerId && initialCustomerName) {
      return {
        customerID: initialCustomerId,
        customer_name: initialCustomerName,
        customer_email: "",
        customer_phone: "",
      };
    }
    if (storeCustomer?.id && storeCustomer?.name) {
      return {
        customerID: storeCustomer.id,
        customer_name: storeCustomer.name,
        customer_email: "",
        customer_phone: "",
      };
    }
    return null;
  };

  // Initialize search term from selected customer
  const getInitialSearchTerm = (): string => {
    if (initialCustomerName) return initialCustomerName;
    if (storeCustomer?.name) return storeCustomer.name;
    return "";
  };

  // seed search input from props or store
  const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);

  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const createCustomer = useCreateCustomer();

  // Local "selected" card state (purely visual)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    getInitialCustomer()
  );

  // Update selected customer when initialCustomerId changes (when navigating back to step)
  useEffect(() => {
    if (initialCustomerId && initialCustomerName) {
      // Only update if the selected customer doesn't match the initial customer
      const currentCustomerId = selectedCustomer?.customerID;
      if (currentCustomerId !== initialCustomerId) {
        const customer: CustomerData = {
          customerID: initialCustomerId,
          customer_name: initialCustomerName,
          customer_email: "",
          customer_phone: "",
        };
        setSelectedCustomer(customer);
        setSearchTerm(initialCustomerName);
        // Also update the store to keep it in sync
        if (storeCustomer?.id !== initialCustomerId) {
          setCustomer({ id: initialCustomerId, name: initialCustomerName });
        }
      }
    } else if (!initialCustomerId) {
      // Clear selection if initialCustomerId is cleared (but only if we have a selected customer)
      if (selectedCustomer) {
        setSelectedCustomer(null);
        setSearchTerm("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCustomerId, initialCustomerName]);

  const { data, refetch } = useSearchAllCustomers({ search: searchTerm }, false);
  const customerList: CustomerData[] = Array.isArray(data) ? data : data ? [data] : [];

  useEffect(() => {
    if (searchTerm.length > 2) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Helpers
  const digitsOnly = (s: string) => s.replace(/\D/g, "");
  const clamp11 = (s: string) => digitsOnly(s).slice(0, 11);

  const blockNonNumericKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey) return; // allow copy/paste shortcuts
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  };

  const onPhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const text = e.clipboardData.getData("text");
    if (!/^\d+$/.test(text)) e.preventDefault();
  };

  const handlePhoneChange = (digits: string) => {
    setNewCustomer(prev => ({ ...prev, customer_phone: digits }));
    setPhoneError(digits.length === 11 ? null : "Phone must be 11 digits");
  };

  const handleCreateCustomer = () => {
    const payload = {
      ...newCustomer,
      customer_phone: clamp11(newCustomer.customer_phone),
    };

    if (!/^\d{11}$/.test(payload.customer_phone)) {
      notifications.show({
        title: "Invalid phone",
        message: "Please enter an 11-digit phone number (numbers only).",
        color: "red",
      });
      return;
    }

    createCustomer.mutate(payload, {
      onSuccess: (response) => {
        const customerID = response?.data?.customerID;
        if (customerID) {
          onCustomerSelect(customerID);
          setSearchTerm(newCustomer.customer_name); // Reset search term to new customer name
          setIsAddingCustomer(false);
          setCustomer({ id: customerID, name: newCustomer.customer_name });

          notifications.show({
            title: "Customer Created",
            message: `${newCustomer.customer_name} has been added successfully.`,
            color: "green",
          });
        }
      },
      onError: () => {
        notifications.show({
          title: "Error",
          message: "Failed to create customer. Please try again.",
          color: "red",
        });
      },
    });
  };

  // const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   setSelectedCustomer(null); // Reset selected customer when searching
  // };

  const handleSelectCustomer = (c: CustomerData) => {
    setSelectedCustomer(c);
    setSearchTerm(c.customer_name);

    onCustomerSelect(c.customerID);
    setCustomer({ id: c.customerID, name: c.customer_name });
  };

  return (
    <main className="w-full h-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <header
        className={`px-6 py-2 ${collapsible ? "cursor-pointer" : ""}`}
        onClick={collapsible ? toggleExpand : undefined}
        aria-expanded={isOpen}
      >
        <div className={`flex items-center ${hasIcon ? "justify-between" : "justify-start"}`}>
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            {isAddingCustomer ? "Add New Customer" : "Customer"}
          </Text>
        </div>
      </header>

      {isOpen && (
        <>
          <Divider size="sm" className="mt-3" color="#E4E7EC" />

          <div className="w-full px-6 pb-6 relative">
            {!isAddingCustomer ? (
              <>
                <div className="relative max-w-md">
                  <Text mt="md" mb="1em">
                    SEARCH CUSTOMER
                  </Text>

                  <div className="flex items-center gap-2">
                    {/* <FormInput
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Enter Customer Name"
                      paddingY={"0.7rem"}
                      className="w-full "
                    /> */}
                    <FormInput
                      value={searchTerm}
                      onChange={(val: string) => {
                        setSearchTerm(val);
                        setSelectedCustomer(null);
                      }}
                      placeholder="Enter Customer Name"
                      paddingY={"0.7rem"}
                      className="w-full "
                    />
                    {selectedCustomer && (
                      <button
                        onClick={() => {
                          setSelectedCustomer(null);
                          setSearchTerm(""); // Clear search term when customer is cleared
                          onCustomerSelect(null); // user action
                          setCustomer({ id: null, name: "" }); // Clear from store
                        }}
                        type="button"
                        className="focus:outline-none"
                        aria-label="Clear selected customer"
                      >
                        <X size={18} className="text-gray-400 hover:text-gray-600" />
                      </button>
                    )}
                  </div>

                  {/* dropdown */}
                  {!selectedCustomer && searchTerm.length > 2 && customerList.length > 0 && (
                    <div className="absolute left-0 right-0 border border-gray-300 mt-1 rounded shadow-md max-h-48 overflow-y-auto z-10 bg-white">
                      {customerList.map((c) => (
                        <div
                          key={c.customerID}
                          className="cursor-pointer hover:bg-gray-100 px-4 py-2 border-b last:border-none"
                          onClick={() => handleSelectCustomer(c)}
                        >
                          <Text fw={500} c="dark">
                            {c.customer_name}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {c.customer_phone}
                          </Text>
                          <Text size="sm" c="dimmed">
                            {c.customer_email}
                          </Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Text
                  mt="md"
                  c="#EB5017"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsAddingCustomer(true)}
                >
                  + Add New Customer
                </Text>
              </>
            ) : (
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="grid grid-cols-2 gap-4 ">
                  <FormInput
                    label="Customer Name"
                    value={newCustomer.customer_name}
                    placeholder="Enter customer name"
                    paddingY="0.7rem"
                    onChange={(val: string) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_name: val,
                      })
                    }
                  />

                  <FormInput
                    label="Email"
                    value={newCustomer.customer_email}
                    placeholder="Enter customer email"
                    paddingY="0.7rem"
                    onChange={(val: string) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_email: val,
                      })
                    }
                  />

                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    value={newCustomer.customer_phone}
                    onChange={handlePhoneChange}
                    paddingY="0.7rem"
                    // @ts-expect-error - FormInput may not have all HTML input props in its type definition
                    inputMode="numeric"
                    pattern="\d*"
                    autoComplete="tel"
                    maxLength={11}
                    onKeyDown={blockNonNumericKeys}
                    onPaste={onPhonePaste}
                  />
                  <FormInput
                    label="Address"
                    value={newCustomer.customer_address}
                    placeholder="Enter customer address"
                    paddingY="0.7rem"
                    onChange={(val: string) =>
                      setNewCustomer({
                        ...newCustomer,
                        customer_address: val,
                      })
                    }
                  />
                  {phoneError && <div className="text-sm text-red-600 mt-3">{phoneError}</div>}
                </div>
                <div className="flex gap-4 justify-start text-right items-end">
                  <button
                    className="mt-2 w-[150px] px-2 h-[44px] border border-[#F16722] text-[#F16722] bg-[white] rounded-lg"
                    onClick={() => setIsAddingCustomer(false)}
                  >
                    <Text c="#f16722">Cancel</Text>
                  </button>
                  <button
                    className="mt-4 w-[150px] h-[44px] px-2 rounded-lg text-[white] bg-[#F16722] font-medium"
                    onClick={handleCreateCustomer}
                  >
                    <Text c="#fff">Create Customer</Text>
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

