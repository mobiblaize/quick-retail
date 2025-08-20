// import TanTable, { PaginationData } from "../../../General/table";
// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Text } from "@mantine/core";
// import { useState } from "react";
// import EditCustomer from "./editCustomer";

// interface CategoriesTableProps {
//   customers: Array<any>;
//   isLoading: boolean;
//   onSortChange: (sortKey: string) => void;
//   paginationData?: PaginationData;
//   onPageChange: (page: number) => void;
//   activeSort?: string;
//   onRefetch: () => void;
//   onSearchChange?: (search: string) => void; 
// }

// const CustomerTable = ({
//   customers,
//   onSortChange,
//   isLoading,
//   paginationData,
//   onPageChange,
//   activeSort,
//   onRefetch ,
//   onSearchChange,
// }: CategoriesTableProps) => {
//   const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

//   const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);

//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Name",
//       accessorKey: "name",
//       enableSorting: false,
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             {props.row.original.name}
//           </Text>
//           <Text fw={400} className="text-sm">
//             Last Visit:{""} {props.row.original.date}
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Contact",
//       accessorKey: "contact",
//       enableSorting: false,
//       cell: (props) => {
//         const contactName = props.row.original.contact || "No contact email";
//         const contactNumber = props.row.original.number || "No number";

//         return (
//           <div className="flex flex-col">
//             <Text fw={500} c={props.row.original.contact ? "black" : "dimmed"}>
//               {contactName}
//             </Text>
//             <Text fw={400} className="text-[#667185] text-sm">
//               Tel: <span className="text-gray-500">{contactNumber}</span>
//             </Text>
//           </div>
//         );
//       },
//     },

//     {
//       header: "Total Amount Spent",
//       accessorKey: "totalAmount",
//       enableSorting: false,
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             {props.row.original.totalAmount}
//           </Text>
//           <Text fw={400} className="text-[#667185] flex gap-2 text-sm">
//             Total Transactions:{""}
//             <span className="text-gray-800">
//               {props.row.original.totalTransaction}
//             </span>
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Date Created",
//       accessorKey: "timeStamp",
//       enableSorting: false,
//       cell: ({ row }) => (
//         <Text className="text-gray-900 text-sm font-medium">
//           {row.original.timeStamp}
//         </Text>
//       ),
//     },

//     {
//       header: "",
//       accessorKey: "action",
//       enableSorting: false,
//       cell: (props) => {
//         const customerData = props.row.original;

//         return (
//           <Text
//             fw={700}
//             c="customPrimary.10"
//             className="cursor-pointer"
//             onClick={() => {
//               setSelectedCustomer(customerData);
//               setIsCreateCategoryOpen(true);
//             }}
//           >
//             Edit
//           </Text>
//         );
//       },
//     },
//   ];
//   const mappedCustomers: TableRowData[] = customers.map((customer: any) => ({
//     id: customer.customerID, // Map the customerID to id
//     name: customer.customer_name,
//     date: customer.last_visit
//       ? new Date(customer.last_visit).toLocaleDateString()
//       : "—",
//     contact: customer.customer_email,
//     number: customer.customer_phone,
//     totalAmount: customer.sales_orders_sum_order_total
//       ? `₦${Number(customer.sales_orders_sum_order_total).toLocaleString()}`
//       : "₦0",
//     totalTransaction: `${customer.sales_orders_count}`,
//     timeStamp: new Date(customer.created_at).toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "2-digit",
//       hour: "numeric",
//       minute: "numeric",
//       second: "numeric",
//       hour12: true,
//     }),
//     status: customer.status === "active" ? "Active" : "Inactive",
//   }));

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Text fw={500} size="md" c="dimmed">
//           Loading customers...
//         </Text>
//       </div>
//     );
//   }

//   return (
//     <main className="w-full h-auto py-6 rounded-lg bg-white">
//       <TanTable
//         columnData={columns}
//         data={mappedCustomers}
//         showSearch
//         showSortFilter
//         searchPlaceholder="Search Customers"
//         length={8}
//         onSortChange={onSortChange}
//         activeSort={activeSort}
//         serverSidePagination={true}
//         paginationData={paginationData}
//         onSearchChange={onSearchChange}
//         onPageChange={onPageChange}
//         tableTitle={
//           <div className="flex gap-2.5">
//             <Text fw={500} size="xl" c="textSecondary.9">
//               All Customers
//             </Text>
//             <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//               {/* <Text c="customPrimary.10">{mappedCustomers.length}</Text> */}
//               <Text c="customPrimary.10">{paginationData?.total}</Text>
//             </div>
//           </div>
//         }
//       />
//       <EditCustomer
//         opened={isCreateCategoryOpen}
//         onClose={() => setIsCreateCategoryOpen(false)}
//         onCreated={() => {
//           setIsCreateCategoryOpen(false);
//           onRefetch();
//         }}
//         customer={selectedCustomer}
//       />
//     </main>
//   );
// };

// export default CustomerTable;


import { useState } from "react";
import { Text } from "@mantine/core";
import GenericTable from "../../../General/genericTable";
import { formatMoney } from "../../../../utils/helpers";
import EditCustomer from "./editCustomer";

interface CustomerTableProps {
  customers: Array<any>;
  isLoading: boolean;
  paginationData?: {
    current_page: number;
    last_page: number;
    total: number;
  };
  onPageChange: (page: number) => void;
  onRefetch: () => void;
}

const CustomerTable = ({
  customers,
  isLoading,
  paginationData,
  onPageChange,
  onRefetch,
}: CustomerTableProps) => {
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const tableData = customers.map((customer: any) => ({
    id: customer.customerID,
    name: customer.customer_name,
    date: customer.last_visit
      ? new Date(customer.last_visit).toLocaleDateString()
      : "—",
    contact: customer.customer_email || "No contact email",
    number: customer.customer_phone || "No number",
    totalAmount: customer.sales_orders_sum_order_total
      ? formatMoney(customer.sales_orders_sum_order_total)
      : "₦0",
    totalTransaction: customer.sales_orders_count || 0,
    timeStamp: new Date(customer.created_at).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    }),
    status: customer.status === "active" ? "Active" : "Inactive",
  }));

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row: any) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.name}
          </Text>
          <Text fw={400} className="text-sm">
            Last Visit: {row.date}
          </Text>
        </div>
      ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (row: any) => (
        <div className="flex flex-col">
          <Text fw={500} c={row.contact !== "No contact email" ? "black" : "dimmed"}>
            {row.contact}
          </Text>
          <Text fw={400} className="text-[#667185] text-sm">
            Tel: <span className="text-gray-500">{row.number}</span>
          </Text>
        </div>
      ),
    },
    {
      key: "totalAmount",
      header: "Total Amount Spent",
      render: (row: any) => (
        <div className="flex flex-col">
          <Text fw={500} c="black">
            {row.totalAmount}
          </Text>
          <Text fw={400} className="text-[#667185] flex gap-2 text-sm">
            Total Transactions:{" "}
            <span className="text-gray-800">{row.totalTransaction}</span>
          </Text>
        </div>
      ),
    },
    {
      key: "timeStamp",
      header: "Date Created",
      render: (row: any) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.timeStamp}
        </Text>
      ),
    },
    {
      key: "action",
      header: "",
      render: (row: any) => (
        <Text
          fw={700}
          c="customPrimary.10"
          className="cursor-pointer"
          onClick={() => {
            setSelectedCustomer(row);
            setIsEditOpen(true);
          }}
        >
          Edit
        </Text>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Text fw={500} size="md" c="dimmed">
          Loading customers...
        </Text>
      </div>
    );
  }

  return (
    <main className="w-full h-auto py-6 rounded-lg bg-white">
      <GenericTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        paginationData={paginationData}
        onPageChange={onPageChange}
        titleSection={
          <div className="flex gap-2.5">
            <Text fw={500} size="xl" c="textSecondary.9">
              All Customers
            </Text>
            <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
              <Text c="customPrimary.10">
                {paginationData?.total || tableData.length}
              </Text>
            </div>
          </div>
        }
      />

      <EditCustomer
        opened={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onCreated={() => {
          setIsEditOpen(false);
          onRefetch();
        }}
        customer={selectedCustomer}
      />
    </main>
  );
};

export default CustomerTable;
