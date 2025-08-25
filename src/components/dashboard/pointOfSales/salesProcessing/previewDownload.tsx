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


import { Paper, Box, Flex, Text, Table, Group, Image } from "@mantine/core";
import logo from "../../../../assets/images/logo.png";

type ReceiptPreviewProps = {
  order: any; // consider adding a proper type later
};

const ReceiptPreview = ({ order }: ReceiptPreviewProps) => {
  if (!order || Object.keys(order).length === 0 || !order.data) {
    console.log("No order or empty order object");
    return <Text>No order data available</Text>;
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
      radius="sm"
      withBorder={false}
      p={32} // Tailwind p-8 (32px)
      style={{
        width: "100%",
        margin: "0 auto",
        backgroundColor: "#FFFFFF",          // bg-white
        borderRadius: 4,                     // rounded
        color: "#1F2937",                    // text-gray-800
        fontSize: 14,                        // text-sm
      }}
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="flex-start"
        pb={16}   // pb-4
        mb={24}   // mb-6
        style={{ borderBottom: "1px solid #E5E7EB" }} // border-b gray-200
      >
        <Box>
          <Image
            src={logo}
            alt="logo"
            height={32}
            fit="contain"
            mb={8}
            classNames={{
              root: "w-full h-[50px] rounded-lg overflow-hidden object-cover" 
            }}
          />
          <Text fw={600} c="#EA580C">  
            {actualOrder.receipt_no}
          </Text>
        </Box>

        <Box ta="right" style={{ fontSize: 16 /* text-md */ }}>
          <Text size="xl" fw={500} ta="left">
            {/* text-xl font-medium text-left */}
            {actualOrder.cashier ? `${actualOrder.cashier.firstname} ${actualOrder.cashier.lastname}` : ""}
          </Text>
          <Text>{actualOrder.location?.address}</Text>
          <Text>{actualOrder.location?.email}</Text>
          <Text>{actualOrder.location?.phone}</Text>
        </Box>
      </Flex>

      {/* Customer & Receipt Details */}
      <Flex justify="space-between" mb={32 /* mb-8 */}>
        <Box>
          <Text fw={400 /* font-normal */}>Customer Details</Text>
          <Text fw={500 /* font-medium */}>
            {actualOrder.customer?.customer_name || actualOrder.customer_name}
          </Text>
          <Text
            style={{
              whiteSpace: "normal", // whitespace-normal
              "@media (min-width: 1024px)": { width: 150 }, // lg:w-[150px]
            }}
          >
            {actualOrder.customer?.customer_address}
          </Text>
        </Box>

        <Box ta="right">
          <Text fw={500}>Receipt Details</Text>
          <Text style={{ color: "gray", fontWeight: 400  }}>
            Date Issued:{" "}
            <Text span style={{ color: "black", fontWeight: 400 }}>
              {new Date(actualOrder.date_completed).toLocaleDateString()}
            </Text>
          </Text>
        </Box>
      </Flex>

      {/* Table of Sale Order Details */}
      <Box style={{ overflowX: "auto", marginTop: 16 /* mt-4 */ }}>

        <Table
          style={{
            minWidth: "100%",
            textAlign: "left",
            fontSize: 16,
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#F3F4F6",       
              fontWeight: 500,
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <tr>
              <th style={{ padding: 8 }}>Item</th>
              <th style={{ padding: 8 }}>Qty</th>
              <th style={{ padding: 8 }}>Unit Price</th>
              <th style={{ padding: 8 }}>Amount</th>
            </tr>
          </thead>

          <tbody>
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
                <tr
                  key={detail.order_detail_id}
                  style={{ borderBottom: "1px solid #E5E7EB" }} // divide-y
                >
                  <td style={{ padding: 8 }}>
                    <Text fw={500}>{variationName}</Text>
                    <Text size="sm">
                      Size: <Text span fw={500}>{size}</Text>
                    </Text>
                    <Text size="sm">
                      Color: <Text span fw={500}>{color}</Text>
                    </Text>
                  </td>
                  <td style={{ padding: 8 }}>{detail.quantity_ordered}</td>
                  <td style={{ padding: 8 }}>
                    ₦{Number(detail.unit_price).toLocaleString()}
                  </td>
                  <td style={{ padding: 8 }}>
                    ₦{Number(detail.total_price).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>

      {/* Fees Breakdown */}
      <Box
        mt={24}
        w="100%"
        mx="auto"
        ta="right"
        style={{
          color: "#374151",
          paddingRight: "7em", 
          paddingLeft: "1em",  
        }}
      >
        <Group justify="space-between" mb={4}>
          <Text>Subtotal:</Text>
          <Text>₦{fees?.sub_total?.toLocaleString?.() || "0"}</Text>
        </Group>
        <Group justify="space-between" mb={4}>
          <Text>Discount:</Text>
          <Text>₦{fees?.discount?.toLocaleString?.() || "0"}</Text>
        </Group>
        <Group justify="space-between" mb={4}>
          <Text style={{ whiteSpace: "nowrap" }}>
            Tax ({fees?.tax_rate ? `${fees.tax_rate}%` : ""}):
          </Text>
          <Text>₦{fees?.tax?.toLocaleString?.() || "0"}</Text>
        </Group>

        {fees?.service_fee ? (
          <Group justify="space-between" mb={4}>
            <Text style={{ whiteSpace: "nowrap" }}>Service Fee:</Text>
            <Text>₦{fees.service_fee.toLocaleString()}</Text>
          </Group>
        ) : null}
      </Box>

      {/* Receipt Amount */}
      <Paper
        mt={32}
        p={24}
        radius={4}
        withBorder
        style={{
          textAlign: "center",         
          background: "#FDE1D0",       
          borderWidth: 2,              
          borderStyle: "dashed",       
          borderColor: "#FED7AA",     
        }}
      >
        <Text
          fw={700}
          style={{
            fontSize: 18,         
            color: "#F9A578",      
          }}
        >
          Total
        </Text>
        <Text
          fw={700}
          style={{
            fontSize: 36,         
            color: "#EA580C",     
            lineHeight: 1.2,
          }}
        >
          ₦{Number(actualOrder.amount_paid).toLocaleString()}
        </Text>
      </Paper>
    </Paper>
  );
};

export default ReceiptPreview;
