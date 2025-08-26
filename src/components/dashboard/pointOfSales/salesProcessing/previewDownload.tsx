// import logo from "../../../../assets/images/logo.png";

// type ReceiptPreviewProps = {
//   order: any; // You can create a proper type for better typings
// };

// const ReceiptPreview = ({ order }: ReceiptPreviewProps) => {
//   if (!order || Object.keys(order).length === 0 || !order.data) {
//     console.log("No order or empty order object");
//     return <p>No order data available</p>;
//   }

//   const actualOrder = order.data;

//   let fees = {};
//   try {
//     fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
//   } catch (err) {
//     console.warn("Invalid JSON in order.fees", err);
//   }

//   return (
//     <>
//       <div className="w-full mx-auto p-8 bg-white shadow rounded text-sm text-gray-800">
//         {/* Header */}
//         <div className="flex justify-between items-start border-b pb-4 mb-6">
//           <div>
//             <img src={logo} alt="logo" className="object-contain h-8 mb-2" />
//             <p className="text-orange-600 font-semibold">
//               {actualOrder.receipt_no}
//             </p>
//           </div>
//           <div className="text-right text-md">
//           <p className="text-xl text-left font-medium">{actualOrder.cashier ? `${actualOrder.cashier.firstname} ${actualOrder.cashier.lastname}` : ''}</p>
//             <p>{actualOrder.location?.address}</p>
//             <p>{actualOrder.location?.email}</p>
//             <p>{actualOrder.location?.phone}</p>
//           </div>
//         </div>

//         {/* Customer & Receipt Details */}
//         <div className="flex justify-between mb-8">
//           <div>
//             <h2 className="font-normal">Customer Details</h2>
//             <p className="font-medium">
//               {actualOrder.customer?.customer_name || actualOrder.customer_name}
//             </p>

//             <p className="whitespace-normal lg:w-[150px]">
//               {actualOrder.customer?.customer_address}
//             </p>
//           </div>
//           <div className="text-right">
//             <h2 className="font-medium">Receipt Details</h2>
//             <p className="text-[gray] font-normal">
//               Date Issued:{" "}
//               <span className="text-[black] font-normal">
//                 {new Date(actualOrder.date_completed).toLocaleDateString()}
//               </span>
//             </p>
//             {/* No date due in response, so you can omit or add if available */}
//           </div>
//         </div>

//         {/* Table of Sale Order Details */}
//         <div>
//           {/* <h3 className="bg-gray-100 p-3 font-bold text-center">
//             Breakdown of Receipt Payment
//           </h3> */}
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full text-left text-md">
//               <thead className="border-b font-medium  bg-gray-100">
//                 <tr>
//                   <th className="p-2">Item</th>
//                   <th className="p-2">Qty</th>
//                   <th className="p-2">Unit Price</th>
//                   <th className="p-2">Amount</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {actualOrder.sale_order_details?.map((detail: any) => {
//                   const variationName = detail.product_variation?.name || "N/A";

//                   let size = "N/A";
//                   let color = "N/A";

//                   if (variationName !== "N/A") {
//                     const parts = variationName.split("-");
//                     size = parts[parts.length - 2] || "N/A";
//                     color = parts[parts.length - 1] || "N/A";
//                   }

//                   return (
//                     <tr key={detail.order_detail_id}>
//                       <td className="p-2 text-md">
//                         <span className="font-medium"> {variationName} </span>{" "}
//                         <br />
//                         Size: <span className="font-medium">{size} </span>
//                         <br />
//                         Color: <span className="font-medium">{color}</span>
//                       </td>
//                       <td className="p-2">{detail.quantity_ordered}</td>
//                       <td className="p-2">
//                         ₦{Number(detail.unit_price).toLocaleString()}
//                       </td>
//                       <td className="p-2 ">
//                         ₦{Number(detail.total_price).toLocaleString()}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//           {/* Fees Breakdown */}
//           <div className="mt-6 w-full pr-[7em] pl-[1em] mx-auto text-right text-gray-700">
//             <div className="flex justify-between mb-1">
//               <span>Subtotal:</span>
//               {/* @ts-ignore */}
//               <span>₦{fees.sub_total?.toLocaleString() || "0"}</span>
//             </div>
//             <div className="flex justify-between mb-1">
//               <span>Discount:</span>
//                             {/* @ts-ignore */}
//               <span>₦{fees.discount?.toLocaleString() || "0"}</span>
//             </div>
//             <div className="flex justify-between mb-1">
//                               {/* @ts-ignore */}
//                               <span className="whitespace-nowrap">Tax ({fees.tax_rate ? `${fees.tax_rate}%` : ""}):</span>
//                             {/* @ts-ignore */}
//               <span>₦{fees.tax?.toLocaleString() || "0"}</span>
//             </div>
//                           {/* @ts-ignore */}
//             {fees.service_fee && (
//               <div className="flex justify-between mb-1">
//                              <span className="whitespace-nowrap">Service Fee:</span>
//                               {/* @ts-ignore */}
//                 <span>₦{fees.service_fee.toLocaleString()}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Receipt Amount */}
//         <div className="mt-8 bg-[#FDE1D0] text-center py-6 rounded border-dashed border-2 border-orange-200">
//           <p className="text-lg font-bold text-[#F9A578]"> Total</p>
//           <p className="text-4xl text-orange-600 font-bold">
//             ₦{Number(actualOrder.amount_paid).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReceiptPreview;


import {
  Paper,
  Box,
  Flex,
  Text,
  Table,
  Group,
  Image,
  // Divider,
  Stack,
} from "@mantine/core";
import logo from "../../../../assets/images/logo.png";

type ReceiptPreviewProps = {
  order: any; // TODO: replace with proper type
};

const ReceiptPreview = ({ order }: ReceiptPreviewProps) => {
  if (!order || Object.keys(order).length === 0 || !order.data) {
    console.log("No order or empty order object");
    return <Text ta="center">No order data available</Text>;
  }

  const actualOrder = order.data;

  let fees: any = {};
  try {
    fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
  } catch (err) {
    console.warn("Invalid JSON in order.fees", err);
  }

  return (
    <Paper
      shadow="sm"
      radius="md"
      p="xl"
      maw="80rem"
      mx="auto"
      withBorder
      bg="white"
    >
      {/* Header */}
      <Flex justify="space-between" align="flex-start" pb="md" mb="lg" style={{ borderBottom: "1px solid #E5E7EB" }}>
        <Stack gap={4}>
          <Image src={logo} alt="logo" h={32} fit="contain" />
          <Text c="orange" fw={600}>
            {actualOrder.receipt_no}
          </Text>
        </Stack>
        <Stack gap={2} align="flex-end" fz="xs" lh={1.4}>
          <Text>{actualOrder.location?.address}</Text>
          <Text>{actualOrder.location?.email}</Text>
          <Text>{actualOrder.location?.phone}</Text>
        </Stack>
      </Flex>

      {/* Customer & Receipt Details */}
      <Flex direction={{ base: "column", md: "row" }} gap="xl" mb="xl">
        <Stack gap={4}>
          <Text fw={600}>Customer Details</Text>
          <Text fw={600}>
            {actualOrder.customer?.customer_name || actualOrder.customer_name}
          </Text>
          <Text>{actualOrder.customer?.customer_address}</Text>
        </Stack>
        <Stack gap={4} ml="auto" ta={{ base: "left", md: "right" }}>
          <Text fw={600}>Receipt Details</Text>
          <Text c="dimmed">
            Date Issued:{" "}
            <Text span c="black">
              {new Date(actualOrder.date_completed).toLocaleDateString()}
            </Text>
          </Text>
        </Stack>
      </Flex>

      {/* Items Table */}
      <Box style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Item</Table.Th>
              <Table.Th ta="center">Qty</Table.Th>
              <Table.Th ta="center">Unit Price</Table.Th>
              <Table.Th ta="right" style={{ width: "1%" }}>
                Amount
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {actualOrder.sale_order_details?.map((detail: any) => {
              const variationName = detail.product_variation?.name || "N/A";
              let size = "N/A";
              let color = "N/A";
              if (variationName !== "N/A") {
                const parts = variationName.split("-");
                size = parts[parts.length - 2] || "N/A";
                color = parts[parts.length - 1] || "N/A";
              }
              return (
                <Table.Tr key={detail.order_detail_id}>
                  <Table.Td>
                    <Text fw={600}>{variationName}</Text>
                    <div>
                      Size: <Text span fw={600}>{size}</Text>
                    </div>
                    <div>
                      Color: <Text span fw={600}>{color}</Text>
                    </div>
                  </Table.Td>
                  <Table.Td ta="center">{detail.quantity_ordered}</Table.Td>
                  <Table.Td ta="center">
                    ₦{Number(detail.unit_price).toLocaleString()}
                  </Table.Td>
                  <Table.Td ta="right">
                    ₦{Number(detail.total_price).toLocaleString()}
                  </Table.Td>
                </Table.Tr>
              );
            })}
          </Table.Tbody>
        </Table>
      </Box>

      {/* Fees Breakdown */}
      <Stack gap={8} mt="lg" maw={300} ml="auto">
        <Group justify="space-between">
          <Text>Subtotal:</Text>
          <Text>₦{fees.sub_total?.toLocaleString() || "0"}</Text>
        </Group>
        <Group justify="space-between">
          <Text>Discount:</Text>
          <Text>₦{fees.discount?.toLocaleString() || "0"}</Text>
        </Group>
        <Group justify="space-between">
          <Text>
            Tax {fees.tax_rate ? `(${fees.tax_rate}%)` : ""}
          </Text>
          <Text>₦{fees.tax?.toLocaleString() || "0"}</Text>
        </Group>
        {fees.service_fee && (
          <Group justify="space-between">
            <Text>Service Fee:</Text>
            <Text>₦{fees.service_fee.toLocaleString()}</Text>
          </Group>
        )}
      </Stack>

      {/* Total Amount */}
      <Box
        mt="xl"
        p="lg"
        ta="center"
        bg="orange.0"
        style={{ border: "2px dashed #FCD9BD", borderRadius: "8px" }}
      >
        <Text fz="lg" fw={700}>
          Total
        </Text>
        <Text fz="xl" fw={700} c="orange">
          ₦{Number(actualOrder.amount_paid).toLocaleString()}
        </Text>
      </Box>
    </Paper>
  );
};

export default ReceiptPreview;

