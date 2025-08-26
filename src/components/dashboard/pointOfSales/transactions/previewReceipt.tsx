// import { useLocation } from "react-router";
// import logo from "../../../../assets/images/logo.png";
// import { useFetchSingleSale } from "../../../../hooks/backendApis/pos/salesProcessing";

// const PreviewTransaction = () => {
//   const location = useLocation();
//   const initialOrderId = location.state?.orderId || location.state?.orderID;

//   const { data: orderData, isLoading, isError } = useFetchSingleSale(initialOrderId);

//   if (isLoading) return <p className="text-center py-8">Loading order details...</p>;
//   if (isError || !orderData?.data) return <p className="text-center py-8">No order data available</p>;

//   const actualOrder = orderData.data;

//   let fees = {};
//   try {
//     fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
//   } catch (err) {
//     console.warn("Invalid JSON in order.fees", err);
//   }

//   return (
//     <div className="w-full mx-auto max-w-5xl p-8 bg-white shadow rounded text-sm text-gray-800">

//       {/* Header */}
//       <div className="flex justify-between items-start border-b pb-4 mb-6">
//         <div className="space-y-1">
//           <img src={logo} alt="logo" className="object-contain h-8" />
//           <p className="text-orange-600 font-semibold">{actualOrder.receipt_no}</p>
//         </div>
//         <div className="text-right text-xs leading-5">
//           <p>{actualOrder.location?.address}</p>
//           <p>{actualOrder.location?.email}</p>
//           <p>{actualOrder.location?.phone}</p>
//         </div>
//       </div>

//       {/* Customer & Receipt Details */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div className="space-y-1">
//           <h2 className="font-semibold">Customer Details</h2>
//           <p className="font-semibold">
//             {actualOrder.customer?.customer_name || actualOrder.customer_name}
//           </p>
//           <p className="whitespace-normal">{actualOrder.customer?.customer_address}</p>
//         </div>
//         <div className="space-y-1 md:text-right">
//           <h2 className="font-semibold">Receipt Details</h2>
//           <p className="text-gray-600">
//             Date Issued:{" "}
//             <span className="text-black">
//               {new Date(actualOrder.date_completed).toLocaleDateString()}
//             </span>
//           </p>
//         </div>
//       </div>

//       {/* Items Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-left text-md border border-gray-200">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               <th className="p-3 font-semibold">Item</th>
//               <th className="p-3 text-center font-semibold">Qty</th>
//               <th className="p-3 text-right font-semibold">Unit Price</th>
//               <th className="p-3 text-right font-semibold">Amount</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y">
//             {actualOrder.sale_order_details?.map((detail: any) => {
//               const variationName = detail.product_variation?.name || "N/A";
//               let size = "N/A";
//               let color = "N/A";
//               if (variationName !== "N/A") {
//                 const parts = variationName.split("-");
//                 size = parts[parts.length - 2] || "N/A";
//                 color = parts[parts.length - 1] || "N/A";
//               }
//               return (
//                 <tr key={detail.order_detail_id}>
//                   <td className="p-3">
//                     <span className="font-semibold">{variationName}</span>
//                     <br />
//                     Size: <span className="font-semibold">{size}</span>
//                     <br />
//                     Color: <span className="font-semibold">{color}</span>
//                   </td>
//                   <td className="p-3 text-center">{detail.quantity_ordered}</td>
//                   <td className="p-3 text-right">
//                     ₦{Number(detail.unit_price).toLocaleString()}
//                   </td>
//                   <td className="p-3 text-right">
//                     ₦{Number(detail.total_price).toLocaleString()}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Fees Breakdown */}
//       <div className="mt-6 max-w-xs ml-auto space-y-2">
//         <div className="flex justify-between">
//           <span>Subtotal:</span>
//           {/* @ts-ignore */}
//           <span>₦{fees.sub_total?.toLocaleString() || "0"}</span>
//         </div>
//         <div className="flex justify-between">
//           <span>Discount:</span>
//           {/* @ts-ignore */}
//           <span>₦{fees.discount?.toLocaleString() || "0"}</span>
//         </div>
//         <div className="flex justify-between">
//           {/* @ts-ignore */}
//           <span>Tax ({fees.tax_rate ? `${fees.tax_rate}%` : ""}):</span>
//           {/* @ts-ignore */}
//           <span>₦{fees.tax?.toLocaleString() || "0"}</span>
//         </div>
//         {/* @ts-ignore */}
//         {fees.service_fee && (
//           <div className="flex justify-between">
//             <span>Service Fee:</span>
//             {/* @ts-ignore */}
//             <span>₦{fees.service_fee.toLocaleString()}</span>
//           </div>
//         )}
//       </div>

//       {/* Total Amount */}
//       <div className="mt-8 bg-orange-100 text-center py-6 rounded border-dashed border-2 border-orange-200">
//         <p className="text-lg font-bold">Total</p>
//         <p className="text-4xl text-orange-600 font-bold">
//           ₦{Number(actualOrder.amount_paid).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PreviewTransaction;




import { useLocation } from "react-router";
import { Paper, Group, Stack, Text, Table, Box, SimpleGrid } from "@mantine/core";
import logo from "../../../../assets/images/logo.png";
import { useFetchSingleSale } from "../../../../hooks/backendApis/pos/salesProcessing";

const PreviewTransaction = () => {
  const location = useLocation();
  const initialOrderId = location.state?.orderId || location.state?.orderID;

  const { data: orderData, isLoading, isError } = useFetchSingleSale(initialOrderId);

  if (isLoading) return <p className="text-center py-8">Loading order details...</p>;
  
  if (isLoading) {
    return <Text ta="center" style={{ padding: "2rem" }}>Loading order details...</Text>;
  }

  if (isError || !orderData?.data) {
    return <Text ta="center" style={{ padding: "2rem" }}>No order data available</Text>;
  }

  const actualOrder: any = orderData.data;

  let fees: Record<string, any> = {};
  try {
    fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
  } catch (err) {
    console.warn("Invalid JSON in order.fees", err);
  }

  return (
    <Paper
      shadow="sm"
      radius={4}            // Tailwind rounded (4px)
      p={32}                // p-8 (2rem)
      maw={1024}            // max-w-5xl (64rem)
      mx="auto"
      bg="white"
      withBorder={false}
      // text-sm text-gray-800
      style={{ fontSize: "0.875rem", color: "#1f2937" }}
    >
      {/* Header */}
      <Group
        justify="space-between"
        align="flex-start"
        pb={16}  // pb-4 (1rem)
        mb={24}  // mb-6 (1.5rem)
        style={{ borderBottom: "1px solid #E5E7EB" }} // border-b
      >
        <Stack gap={4 /* space-y-1 (0.25rem) */}>
          <img src={logo} alt="logo" style={{ height: 32, objectFit: "contain" }} />
          <Text style={{ color: "#EA580B", fontWeight: 600 /* font-semibold */ }}>
            {actualOrder.receipt_no}
          </Text>
        </Stack>

        <Stack
          gap={4 /* space-y-1 */}
          // text-right text-xs leading-5
          style={{ textAlign: "right", fontSize: 12, lineHeight: "1.25rem" }}
        >
          <Text>{actualOrder.location?.address}</Text>
          <Text>{actualOrder.location?.email}</Text>
          <Text>{actualOrder.location?.phone}</Text>
        </Stack>
      </Group>

      {/* Customer & Receipt Details */}
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={24 /* gap-6 */} mb={32 /* mb-8 */}>
        <Stack gap={4 /* space-y-1 */}>
          <Text fw={600 /* font-semibold */}>Customer Details</Text>
          <Text fw={600}>
            {actualOrder.customer?.customer_name || actualOrder.customer_name}
          </Text>
          <Text>{actualOrder.customer?.customer_address}</Text>
        </Stack>

        <Stack
          gap={4}
          // md:text-right (always right is visually fine; if you need strictly md+, use a CSS class or media query)
          style={{ textAlign: "right" }}
        >
          <Text fw={600}>Receipt Details</Text>
          <Text c="#4B5563">
            Date Issued:{" "}
            <Text component="span" c="#000000">
              {new Date(actualOrder.date_completed).toLocaleDateString()}
            </Text>
          </Text>
        </Stack>
      </SimpleGrid>

      {/* Items Table */}
      <Box style={{ overflowX: "auto" }}>
        <Table
          // Tailwind equivalents from original:
          // min-w-full text-left text-md border border-gray-200 + header bg + row dividers
          style={{
            minWidth: "100%",
            textAlign: "left",
            fontSize: 16,                       // text-md
            border: "1px solid #E5E7EB",        // outer border
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <thead style={{ background: "#F3F4F6", borderBottom: "1px solid #E5E7EB" }}>
            <tr>
              <th style={{ padding: 12, fontWeight: 600 }}>Item</th>
              <th style={{ padding: 12, fontWeight: 600, textAlign: "center" }}>Qty</th>
              <th style={{ padding: 12, fontWeight: 600, textAlign: "right" }}>Unit Price</th>
              <th style={{ padding: 12, fontWeight: 600, textAlign: "right" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {actualOrder.sale_order_details?.map((detail: any, idx: number, arr: any[]) => {
              const variationName = detail.product_variation?.name || "N/A";
              let size = "N/A";
              let color = "N/A";
              if (variationName !== "N/A") {
                const parts = variationName.split("-");
                size = parts[parts.length - 2] || "N/A";
                color = parts[parts.length - 1] || "N/A";
              }
              const isLast = idx === arr.length - 1;

              return (
                <tr
                  key={detail.order_detail_id}
                  style={{
                    borderBottom: isLast ? "none" : "1px solid #E5E7EB", // divide-y
                  }}
                >
                  <td style={{ padding: 12 }}>
                    <Text fw={600}>{variationName}</Text>
                    <Text>
                      Size: <Text component="span" fw={600}>{size}</Text>
                    </Text>
                    <Text>
                      Color: <Text component="span" fw={600}>{color}</Text>
                    </Text>
                  </td>
                  <td style={{ padding: 12, textAlign: "center" }}>
                    {detail.quantity_ordered}
                  </td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    ₦{Number(detail.unit_price).toLocaleString()}
                  </td>
                  <td style={{ padding: 12, textAlign: "right" }}>
                    ₦{Number(detail.total_price).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>

      {/* Fees Breakdown */}
      <Stack gap={8 /* space-y-2 */} mt={24 /* mt-6 */} maw={320 /* max-w-xs */} ml="auto">
        <Group justify="space-between">
          <Text>Subtotal:</Text>
          <Text>₦{fees?.sub_total?.toLocaleString?.() || "0"}</Text>
        </Group>
        <Group justify="space-between">
          <Text>Discount:</Text>
          <Text>₦{fees?.discount?.toLocaleString?.() || "0"}</Text>
        </Group>
        <Group justify="space-between">
          <Text>
            Tax ({fees?.tax_rate ? `${fees.tax_rate}%` : ""}):
          </Text>
          <Text>₦{fees?.tax?.toLocaleString?.() || "0"}</Text>
        </Group>
        {fees?.service_fee ? (
          <Group justify="space-between">
            <Text>Service Fee:</Text>
            <Text>₦{fees.service_fee.toLocaleString()}</Text>
          </Group>
        ) : null}
      </Stack>

      {/* Total Amount */}
      <Paper
        mt={32 /* mt-8 */}
        p={24 /* py-6 approximated with equal padding */}
        radius="md"
        ta="center"
        style={{
          backgroundColor: "#FFEDD5" /* orange-100 */,
          border: "2px dashed #FED7AA" /* border-orange-200 */,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 700 }}>Total</Text>
        <Text style={{ fontSize: 36, fontWeight: 700, color: "#EA580B" }}>
          ₦{Number(actualOrder.amount_paid).toLocaleString()}
        </Text>
      </Paper>
    </Paper>
  );
};

export default PreviewTransaction;
