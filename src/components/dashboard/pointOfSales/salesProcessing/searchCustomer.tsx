import { Box, Divider, Text, Button, Group, Stack, ActionIcon } from "@mantine/core";
import FormInput from "../../../General/formInput";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";
import { useSearchAllCustomers } from "../../../../hooks/backendApis/pos/products";
import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
import { notifications } from "@mantine/notifications";
import { useOrderStore } from "../../../../hooks/useOrderStore";


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
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({
  onCustomerSelect,
  initialCustomerId,
  initialCustomerName,
}) => {
  const { customer, setCustomer } = useOrderStore();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  // const [searchTerm, setSearchTerm] = useState(initialCustomerName || "");
  const [searchTerm, setSearchTerm] = useState(initialCustomerName || customer?.name || "");


  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });
  const createCustomer = useCreateCustomer();
  useEffect(() => {
    if (initialCustomerId) {
      // You could optionally pre-fetch customer data, or simply set the ID
      onCustomerSelect(initialCustomerId);
    }
  }, [initialCustomerId, onCustomerSelect]);

  useEffect(() => {
    if (initialCustomerName) {
      setSearchTerm(initialCustomerName);
    }
  }, [initialCustomerName]);

  const handleCreateCustomer = () => {
    createCustomer.mutate(newCustomer, {
      onSuccess: (response) => {
        const customerID = response?.data?.customerID;
        if (customerID) {
          onCustomerSelect(customerID);
          setSearchTerm(newCustomer.customer_name);
          setIsAddingCustomer(false);

          setCustomer({
            id: customerID,
            name: newCustomer.customer_name,
          });

          notifications.show({
            title: "Customer Created",
            message: `${newCustomer.customer_name} has been added successfully.`,
            color: "green",
          });
        }
      },
      onError: () => {
        // ✅ Show error notification
        notifications.show({
          title: "Error",
          message: "Failed to create customer. Please try again.",
          color: "red",
        });
      },
    });
  };

  // const [searchTerm, setSearchTerm] = useState("");
  // const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
  //   null
  // );
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    customer?.id
      ? { customerID: customer.id, customer_name: customer.name, customer_email: '', customer_phone: '' }
      : null
  );

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Fetch customers matching searchTerm
  const { data, refetch } = useSearchAllCustomers(
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
    onCustomerSelect(customer.customerID);

    setCustomer({
      id: customer.customerID,
      name: customer.customer_name,
    });
  };
  return (
    <Box
      w="100%"
      h="auto"
      style={(theme) => ({
        borderRadius: theme.radius.lg,
        backgroundColor: "white",
      })}
    >
      <Box
        px="lg"
        py="xs"
        style={{ cursor: "pointer" }}
        onClick={toggleExpand}
      >
        <Group justify="space-between" align="center">
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            {isAddingCustomer ? "Add New Customer" : "Customer"}
          </Text>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </Group>
      </Box>

      {isExpanded && (
        <>
          <Divider size="sm" mt="xs" color="#E4E7EC" />

          <Box px="lg" pb="lg" pos="relative" w="100%">
            {!isAddingCustomer ? (
              <>
                <Box pos="relative" mt="md">
                  <Text size="lg" fw={500} c="textSecondary.9">
                    Search Customer
                  </Text>

                  <Box maw={400}>
                    <FormInput
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Enter Customer Name"
                      leftIcon={<Search color="#667185" />}
                      readOnly={!!selectedCustomer}
                      rightIcon={
                        selectedCustomer ? (
                          <ActionIcon
                            onClick={() => {
                              setSelectedCustomer(null);
                              setSearchTerm("");
                              onCustomerSelect(null);
                            }}
                            variant="subtle"
                            size="sm"
                            color="gray"
                          >
                            <X size={18} />
                          </ActionIcon>
                        ) : null
                      }
                    />
                  </Box>

                  {/* Search dropdown */}
                  {!selectedCustomer &&
                    searchTerm.length > 2 &&
                    customerList.length > 0 && (
                      <Box
                        pos="absolute"
                        left={0}
                        right={0}
                        mt="xs"
                        style={(theme) => ({
                          border: `1px solid ${theme.colors.gray[3]}`,
                          borderRadius: theme.radius.md,
                          boxShadow: theme.shadows.md,
                          maxHeight: 192,
                          overflowY: "auto",
                          zIndex: 10,
                          backgroundColor: theme.white,
                        })}
                      >
                        {customerList.map((customer) => (
                          <Box
                            key={customer.customerID}
                            px="md"
                            py="xs"
                            onClick={() => handleSelectCustomer(customer)}
                            style={(theme) => ({
                              cursor: "pointer",
                              borderBottom: `1px solid ${theme.colors.gray[3]}`,
                              "&:last-of-type": { borderBottom: "none" },
                              "&:hover": {
                                backgroundColor: theme.colors.gray[1],
                              },
                            })}
                          >
                            <Text fw={500} c="dark.9">
                              {customer.customer_name}
                            </Text>
                            <Text size="sm" c="gray.7">
                              {customer.customer_phone}
                            </Text>
                            <Text size="sm" c="gray.7">
                              {customer.customer_email}
                            </Text>
                          </Box>
                        ))}
                      </Box>
                    )}
                </Box>

                <Box mt="md">
                  <Text
                    c="customPrimary.6"
                    fw={600}
                    size="md"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsAddingCustomer(true)}
                  >
                    + Add New Customer
                  </Text>
                </Box>
              </>
            ) : (
              // Add Customer Form
              <Stack gap="md" w="100%" mt="md">
                <Group gap="md" grow>
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
                </Group>
                <Group gap="md" grow>
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
                </Group>


                <div key="search-product-buttons" className="flex gap-4 justify-start">
                  <Button variant="outline-primary"  onClick={() => setIsAddingCustomer(false)}>
                    Cancel
                  </Button>
                  <Button variant="filled-primary" onClick={handleCreateCustomer}>
                  Create Customer
                  </Button>
                </div>


              </Stack>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SearchCustomer;
