// import { ColumnDef } from "@tanstack/react-table";
// import { TableRowData } from "../../../../types";
// import { Text } from "@mantine/core";
// import { PaidDot, UnpaidDot } from "../../../../assets/svg";
// import TanTable from "../../../General/table";
// import { allStoreOrders } from "../../../../utils/mockData";
// import { Link } from "react-router";
// import { ROUTES } from "../../../../constants/routes";

// const StoreOrderTable2 = () => {
//   const columns: ColumnDef<TableRowData>[] = [
//     {
//       header: "Order Information",
//       accessorKey: "information",
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             Order No: {props.row.original.orderNo}
//           </Text>
//           <Text fw={400} className="text-sm">
//             Total Item: {props.row.original.totalItem}
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Customer Information",
//       accessorKey: "customerInformation",
//       cell: (props) => (
//         <div className="flex flex-col">
//           <Text fw={500} c="black">
//             {props.row.original.customerName}
//           </Text>
//           <Text fw={400} className="text-sm">
//             {props.row.original.customerEmail}
//           </Text>
//         </div>
//       ),
//     },
//     {
//       header: "Amount",
//       accessorKey: "amount",
//       cell: (props) => (
//         <Text c="#1D2739" fw={500}>
//           {props.row.original.amount}
//         </Text>
//       ),
//     },

//     {
//       header: "Date Created",
//       accessorKey: "dateCreated",
//       cell: ({ row }) => (
//         <Text className="text-gray-900 text-sm font-medium">
//           {row.original.dateCreated}
//         </Text>
//       ),
//     },
//     {
//       header: "Payment Status",
//       accessorKey: "paymentStatus",
//       cell: (props) => {
//         const status = props.row.original.paymentStatus;
//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//               status === "Success"
//                 ? "bg-[#ECFDF3] text-[#027A48]"
//                 : "bg-[#FBEAE9] text-[#9E0A05]"
//             }`}
//           >
//             {status === "Success" ? <PaidDot /> : <UnpaidDot />}
//             <span className="ml-2">{status}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "Order Status",
//       accessorKey: "orderStatus",
//       cell: (props) => {
//         const status = props.row.original.orderStatus;
//         return (
//           <div
//             className={`inline-flex items-center px-3 py-1 rounded-full font-medium text-sm ${
//               status === "Completed"
//                 ? "bg-[#ECFDF3] text-[#027A48]"
//                 : "bg-[#FFFAEB] text-[#B54708]"
//             }`}
//           >
//             {status === "Completed" ? <PaidDot /> : <UnpaidDot />}
//             <span className="ml-2">{status}</span>
//           </div>
//         );
//       },
//     },
//     {
//       header: "",
//       accessorKey: "action",
//       cell: () => (
//         <Link to={ROUTES.aboutProduct}>
//           <Text fw={600} c="customPrimary.10" className="cursor-pointer">
//             View
//           </Text>
//         </Link>
//       ),
//     },
//   ];
//   return (
//     <div>
//       <main className="w-full h-auto py-6 rounded-lg bg-white">
//         <TanTable
//           columnData={columns}
//           data={allStoreOrders}
//           showSearch
//           showSortFilter
//           searchPlaceholder="Search orders"
//           length={8}
//           tableTitle={
//             <div className="flex gap-2.5">
//               <Text fw={500} size="xl" c="textSecondary.9">
//                 All Store Orders
//               </Text>
//               <div className="bg-[#FFEADF] rounded-full flex items-center py-0.5 px-3">
//                 <Text c="customPrimary.10">{allStoreOrders.length}</Text>
//               </div>
//             </div>
//           }
//         />
//       </main>
//     </div>
//   );
// };

// export default StoreOrderTable2;



import { Text, Badge, Group, Table, Box, Paper } from "@mantine/core";
import { Link } from "react-router";
import { PaidDot, UnpaidDot } from "../../../../assets/svg";
import { ROUTES } from "../../../../constants/routes";
import { allStoreOrders } from "../../../../utils/mockData";
import { TableRowData } from "../../../../types";

// 🔹 Generic Table Types
interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  tableTitle?: React.ReactNode;
}

// 🔹 Reusable GenericTable with Mantine styles
function GenericTable<T>({ columns, data, tableTitle }: GenericTableProps<T>) {
  return (
    <Paper bg="white" p="md" radius="lg" shadow="xs">
      {tableTitle && <Box mb="md">{tableTitle}</Box>}

      <Table striped highlightOnHover withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            {columns.map((col) => (
              <Table.Th key={col.key}>{col.header}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data.map((row, i) => (
            <Table.Tr key={i}>
              {columns.map((col) => (
                <Table.Td key={col.key}>
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
}

// 🔹 StoreOrderTable2 migrated to Mantine + GenericTable
const StoreOrderTable2 = () => {
  const columns: Column<TableRowData>[] = [
    {
      key: "information",
      header: "Order Information",
      render: (row) => (
        <div>
          <Text fw={500} c="black">
            Order No: {row.orderNo}
          </Text>
          <Text fw={400} size="sm">
            Total Item: {row.totalItem}
          </Text>
        </div>
      ),
    },
    {
      key: "customerInformation",
      header: "Customer Information",
      render: (row) => (
        <div>
          <Text fw={500} c="black">
            {row.customerName}
          </Text>
          <Text fw={400} size="sm">
            {row.customerEmail}
          </Text>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (row) => (
        <Text c="#1D2739" fw={500}>
          {row.amount}
        </Text>
      ),
    },
    {
      key: "dateCreated",
      header: "Date Created",
      render: (row) => (
        <Text className="text-gray-900 text-sm font-medium">
          {row.dateCreated}
        </Text>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment Status",
      render: (row) => {
        const isSuccess = row.paymentStatus === "Success";
        return (
          <Group gap="xs">
            <Badge
              leftSection={isSuccess ? <PaidDot /> : <UnpaidDot />}
              color={isSuccess ? "green" : "red"}
              variant="light"
              radius="lg"
              size="md"
            >
              {row.paymentStatus}
            </Badge>
          </Group>
        );
      },
    },
    {
      key: "orderStatus",
      header: "Order Status",
      render: (row) => {
        const isCompleted = row.orderStatus === "Completed";
        return (
          <Group gap="xs">
            <Badge
              leftSection={isCompleted ? <PaidDot /> : <UnpaidDot />}
              color={isCompleted ? "green" : "yellow"}
              variant="light"
              radius="lg"
              size="md"
            >
              {row.orderStatus}
            </Badge>
          </Group>
        );
      },
    },
    {
      key: "action",
      header: "",
      render: () => (
        <Link to={ROUTES.aboutProduct}>
          <Text fw={600} c="customPrimary.10" className="cursor-pointer">
            View
          </Text>
        </Link>
      ),
    },
  ];

  return (
    <GenericTable
      columns={columns}
      data={allStoreOrders}
      tableTitle={
        <Group gap="sm">
          <Text fw={500} size="xl" c="textSecondary.9">
            All Store Orders
          </Text>
          <Badge color="orange" radius="xl" variant="light">
            {allStoreOrders.length}
          </Badge>
        </Group>
      }
    />
  );
};

export default StoreOrderTable2;
