// import { Divider, Text } from "@mantine/core";
// import FormInput from "../../../General/formInput";
// import { Search, X } from "lucide-react";
// import { useState, useEffect, ReactNode } from "react";
// import { useSearchAllCustomers } from "../../../../hooks/backendApis/pos/products";
// import { useCreateCustomer } from "../../../../hooks/backendApis/pos/customer";
// import { notifications } from "@mantine/notifications";
// import { useOrderStore } from "../../../../hooks/useOrderStore";


// interface CustomerData {
//   customer_phone: ReactNode;
//   customerID: string;
//   customer_name: string;
//   customer_email: string;
// }

// interface SearchCustomerProps {
//   onCustomerSelect: (customerID: string | null) => void;
//   initialCustomerId?: string | null;
//   initialCustomerName?: string;
// }

// const SearchCustomer: React.FC<SearchCustomerProps> = ({
//   onCustomerSelect,
//   initialCustomerId,
//   initialCustomerName,
// }) => {
//   const { customer, setCustomer } = useOrderStore();
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [isAddingCustomer, setIsAddingCustomer] = useState(false);
//   // const [searchTerm, setSearchTerm] = useState(initialCustomerName || "");
//   const [searchTerm, setSearchTerm] = useState(initialCustomerName || customer?.name || "");


//   const [newCustomer, setNewCustomer] = useState({
//     customer_name: "",
//     customer_email: "",
//     customer_phone: "",
//     customer_address: "",
//   });
//   const createCustomer = useCreateCustomer();
//   useEffect(() => {
//     if (initialCustomerId) {
//       // You could optionally pre-fetch customer data, or simply set the ID
//       onCustomerSelect(initialCustomerId);
//     }
//   }, [initialCustomerId, onCustomerSelect]);

//   useEffect(() => {
//     if (initialCustomerName) {
//       setSearchTerm(initialCustomerName);
//     }
//   }, [initialCustomerName]);

//   const handleCreateCustomer = () => {
//     createCustomer.mutate(newCustomer, {
//       onSuccess: (response) => {
//         const customerID = response?.data?.customerID;
//         if (customerID) {
//           onCustomerSelect(customerID);
//           setSearchTerm(newCustomer.customer_name);
//           setIsAddingCustomer(false);

//           setCustomer({
//             id: customerID,
//             name: newCustomer.customer_name,
//           });

//           notifications.show({
//             title: "Customer Created",
//             message: `${newCustomer.customer_name} has been added successfully.`,
//             color: "green",
//           });
//         }
//       },
//       onError: () => {
//         // ✅ Show error notification
//         notifications.show({
//           title: "Error",
//           message: "Failed to create customer. Please try again.",
//           color: "red",
//         });
//       },
//     });
//   };

//   // const [searchTerm, setSearchTerm] = useState("");
//   // const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
//   //   null
//   // );
//   const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
//     customer?.id
//       ? { customerID: customer.id, customer_name: customer.name, customer_email: '', customer_phone: '' }
//       : null
//   );

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   // Fetch customers matching searchTerm
//   const { data, refetch } = useSearchAllCustomers(
//     { search: searchTerm },
//     false
//   );

//   const customerList: CustomerData[] = data
//     ? Array.isArray(data)
//       ? data
//       : [data]
//     : [];

//   useEffect(() => {
//     if (searchTerm.length > 2) {
//       refetch();
//     }
//   }, [searchTerm, refetch]);

//   // When user types:
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//     setSelectedCustomer(null);
//   };

//   // When user selects from dropdown:
//   const handleSelectCustomer = (customer: CustomerData) => {
//     setSelectedCustomer(customer);
//     setSearchTerm(customer.customer_name);
//     onCustomerSelect(customer.customerID);

//     setCustomer({
//       id: customer.customerID,
//       name: customer.customer_name,
//     });
//   };
//   return (
//     <main className="w-full h-auto rounded-lg bg-white shadow-sm">
//       <header className="px-6 py-2 cursor-pointer" onClick={toggleExpand}>
//         <div className="flex items-center justify-between">
//           <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
//             {isAddingCustomer ? "Add New Customer" : "Customer"}
//           </Text>
//           {/* {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */}
//         </div>
//       </header>

//       {isExpanded && (
//         <>
//           <Divider size="sm" className="mt-3" color="#E4E7EC" />

//           <div className="w-full px-6 pb-6 relative">
//             {!isAddingCustomer ? (
//               <>
//                 <div className="relative max-w-md">
//                   <h1 className="mt-[1em]">SEARCH CUSTOMER</h1>

//                   <FormInput
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Enter Customer Name"
//                     leftIcon={<Search color="#667185" />}
//                     readOnly={!!selectedCustomer}
//                     rightIcon={
//                       selectedCustomer ? (
//                         <button
//                           onClick={() => {
//                             setSelectedCustomer(null);
//                             setSearchTerm("");
//                             onCustomerSelect(null);
//                           }}
//                           type="button"
//                           className="focus:outline-none"
//                         >
//                           <X
//                             size={18}
//                             className="text-gray-400 hover:text-gray-600"
//                           />
//                         </button>
//                       ) : null
//                     }
//                   />

//                   {/* Search dropdown */}
//                   {!selectedCustomer &&
//                     searchTerm.length > 2 &&
//                     customerList.length > 0 && (
//                       <div className="absolute left-0 right-0 border border-gray-300 mt-1 rounded shadow-md max-h-48 overflow-y-auto z-10 bg-white">
//                         {customerList.map((customer) => (
//                           <div
//                             key={customer.customerID}
//                             className="cursor-pointer hover:bg-gray-100 px-4 py-2 border-b last:border-none"
//                             onClick={() => handleSelectCustomer(customer)}
//                           >
//                             <p className="font-medium text-gray-900">
//                               {customer.customer_name}
//                             </p>
//                             <p className="text-sm text-gray-700">
//                               {customer.customer_phone}
//                             </p>
//                             <p className="text-sm text-gray-700">
//                               {customer.customer_email}
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                 </div>

//                 <div className="mt-[1em] text-[#EB5017] cursor-pointer">
//                   <span onClick={() => setIsAddingCustomer(true)}>
//                     + Add New Customer
//                   </span>
//                 </div>
//               </>
//             ) : (
//               // Add Customer Form
//               <div className="flex flex-col gap-4 w-full mt-4">
//                 <div className="grid grid-cols-2 gap-4 ">
//                   <FormInput
//                     label="Customer Name"
//                     value={newCustomer.customer_name}
//                     onChange={(e: { target: { value: any } }) =>
//                       setNewCustomer({
//                         ...newCustomer,
//                         customer_name: e.target.value,
//                       })
//                     }
//                   />
//                   <FormInput
//                     label="Email"
//                     value={newCustomer.customer_email}
//                     onChange={(e: { target: { value: any } }) =>
//                       setNewCustomer({
//                         ...newCustomer,
//                         customer_email: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <FormInput
//                     label="Phone"
//                     value={newCustomer.customer_phone}
//                     onChange={(e: { target: { value: any } }) =>
//                       setNewCustomer({
//                         ...newCustomer,
//                         customer_phone: e.target.value,
//                       })
//                     }
//                   />
//                   <FormInput
//                     label="Address"
//                     value={newCustomer.customer_address}
//                     onChange={(e: { target: { value: any } }) =>
//                       setNewCustomer({
//                         ...newCustomer,
//                         customer_address: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="flex gap-4 justify-start text-right items-end">
//                   <button
//                     className="mt-2  w-[150px] px-2 h-[44px]  border border-[#F16722] text-[#F16722] bg-[white]  rounded-lg"
//                     onClick={() => setIsAddingCustomer(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     className="mt-4  w-[150px] h-[44px] px-2 rounded-lg text-[white] bg-[#F16722] font-medium "
//                     onClick={handleCreateCustomer}
//                   >
//                     Create Customer
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </main>
//   );
// };

// export default SearchCustomer;

import { Divider, Text } from "@mantine/core";
import { ChevronDown, ChevronUp, Search, X } from "lucide-react";
import { useState, useEffect, useRef, ReactNode } from "react";
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
  collapsible?: boolean;   // optional if you added this earlier
  showIcon?: boolean;      // optional if you added this earlier
}

const SearchCustomer: React.FC<SearchCustomerProps> = ({
  onCustomerSelect,
  initialCustomerId,
  initialCustomerName,
  collapsible = true,
  showIcon,
}) => {
  const { customer, setCustomer } = useOrderStore();

  // --- collapsing UI (if you kept it)
  const [isExpanded, setIsExpanded] = useState(true);
  const isOpen = collapsible ? isExpanded : true;
  const hasIcon = (showIcon ?? collapsible) && collapsible;
  const toggleExpand = () => collapsible && setIsExpanded(!isExpanded);

  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  // seed search input from props or store
  const [searchTerm, setSearchTerm] = useState(
    initialCustomerName || customer?.name || ""
  );

  const [newCustomer, setNewCustomer] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    customer_address: "",
  });

  const createCustomer = useCreateCustomer();

  // ✅ IMPORTANT: do NOT call onCustomerSelect in an effect.
  // Only seed local UI once so we don't bounce state with parent.
  const seededRef = useRef(false);
  useEffect(() => {
    if (seededRef.current) return;
    // set local input only, don't call parent
    if (initialCustomerName) setSearchTerm(initialCustomerName);
    seededRef.current = true;
  }, [initialCustomerName]);

  // Local "selected" card state (purely visual)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerData | null>(
    customer?.id
      ? {
          customerID: customer.id,
          customer_name: customer.name,
          customer_email: "",
          customer_phone: "",
        }
      : null
  );

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

  const handleCreateCustomer = () => {
    createCustomer.mutate(newCustomer, {
      onSuccess: (response) => {
        const customerID = response?.data?.customerID;
        if (customerID) {
          // ✅ this is a user action; it's fine to notify parent here
          onCustomerSelect(customerID);
          setSearchTerm(newCustomer.customer_name);
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSelectedCustomer(null);
  };

  const handleSelectCustomer = (c: CustomerData) => {
    setSelectedCustomer(c);
    setSearchTerm(c.customer_name);

    // ✅ user action → tell parent
    onCustomerSelect(c.customerID);

    setCustomer({ id: c.customerID, name: c.customer_name });
  };

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <header
        className={`px-6 py-2 ${collapsible ? "cursor-pointer" : ""}`}
        onClick={collapsible ? toggleExpand : undefined}
        aria-expanded={isOpen}
      >
        <div className={`flex items-center ${hasIcon ? "justify-between" : "justify-start"}`}>
          <Text size="lg" fw={500} c="textSecondary.9" tt="uppercase">
            {isAddingCustomer ? "Add New Customer" : "Customer"}
          </Text>
          {hasIcon && (isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />)}
        </div>
      </header>

      {isOpen && (
        <>
          <Divider size="sm" className="mt-3" color="#E4E7EC" />

          <div className="w-full px-6 pb-6 relative">
            {!isAddingCustomer ? (
              <>
                <div className="relative max-w-md">
                  <h1 className="mt-[1em]">SEARCH CUSTOMER</h1>

                  <div className="flex items-center gap-2">
                    <input
                      value={searchTerm}
                      onChange={handleSearchChange}
                      placeholder="Enter Customer Name"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {selectedCustomer && (
                      <button
                        onClick={() => {
                          setSelectedCustomer(null);
                          setSearchTerm("");
                          onCustomerSelect(null); // user action
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
                  {!selectedCustomer &&
                    searchTerm.length > 2 &&
                    customerList.length > 0 && (
                      <div className="absolute left-0 right-0 border border-gray-300 mt-1 rounded shadow-md max-h-48 overflow-y-auto z-10 bg-white">
                        {customerList.map((c) => (
                          <div
                            key={c.customerID}
                            className="cursor-pointer hover:bg-gray-100 px-4 py-2 border-b last:border-none"
                            onClick={() => handleSelectCustomer(c)}
                          >
                            <p className="font-medium text-gray-900">{c.customer_name}</p>
                            <p className="text-sm text-gray-700">{c.customer_phone}</p>
                            <p className="text-sm text-gray-700">{c.customer_email}</p>
                          </div>
                        ))}
                      </div>
                    )}
                </div>

                <div className="mt-[1em] text-[#EB5017] cursor-pointer">
                  <span onClick={() => setIsAddingCustomer(true)}>+ Add New Customer</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 w-full mt-4">
                <div className="grid grid-cols-2 gap-4 ">
                  {/* your FormInput fields here (unchanged) */}
                </div>

                <div className="flex gap-4 justify-start text-right items-end">
                  <button
                    className="mt-2  w-[150px] px-2 h-[44px]  border border-[#F16722] text-[#F16722] bg-[white]  rounded-lg"
                    onClick={() => setIsAddingCustomer(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-4  w-[150px] h-[44px] px-2 rounded-lg text-[white] bg-[#F16722] font-medium "
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

