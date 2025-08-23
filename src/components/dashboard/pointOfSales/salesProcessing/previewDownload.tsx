import logo from "../../../../assets/images/logo.png";

type ReceiptPreviewProps = {
  order: any; // You can create a proper type for better typings
};

const ReceiptPreview = ({ order }: ReceiptPreviewProps) => {
  if (!order || Object.keys(order).length === 0 || !order.data) {
    console.log("No order or empty order object");
    return <p>No order data available</p>;
  }

  const actualOrder = order.data;

  let fees = {};
  try {
    fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
  } catch (err) {
    console.warn("Invalid JSON in order.fees", err);
  }

    return (
    <div className="w-full mx-auto max-w-5xl p-8 bg-white shadow rounded text-sm text-gray-800">
      
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div className="space-y-1">
          <img src={logo} alt="logo" className="object-contain h-8" />
          <p className="text-orange-600 font-semibold">{actualOrder.receipt_no}</p>
        </div>
        <div className="text-right text-xs leading-5">
          <p>{actualOrder.location?.address}</p>
          <p>{actualOrder.location?.email}</p>
          <p>{actualOrder.location?.phone}</p>
        </div>
      </div>

      {/* Customer & Receipt Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-1">
          <h2 className="font-semibold">Customer Details</h2>
          <p className="font-semibold">
            {actualOrder.customer?.customer_name || actualOrder.customer_name}
          </p>
          <p className="whitespace-normal">{actualOrder.customer?.customer_address}</p>
        </div>
        <div className="space-y-1 md:text-right">
          <h2 className="font-semibold">Receipt Details</h2>
          <p className="text-gray-600">
            Date Issued:{" "}
            <span className="text-black">
              {new Date(actualOrder.date_completed).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto">
      <table className="min-w-full table-fixed text-left text-md border border-gray-200">
  <thead className="bg-gray-100 border-b">
    <tr>
      <th className="p-3 font-semibold">Item</th>
      <th className="p-3 text-center font-semibold">Qty</th>
      <th className="p-3 text-center font-semibold">Unit Price</th>
      <th className="p-3 text-right font-semibold w-[1%]">Amount</th>
    </tr>
  </thead>
          <tbody className="divide-y">
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
                <tr key={detail.order_detail_id}>
                  <td className="p-3">
                    <span className="font-semibold">{variationName}</span>
                    <br />
                    Size: <span className="font-semibold">{size}</span>
                    <br />
                    Color: <span className="font-semibold">{color}</span>
                  </td>
                  <td className="p-3 text-center">{detail.quantity_ordered}</td>
                  <td className="p-3 text-center">
                    ₦{Number(detail.unit_price).toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    ₦{Number(detail.total_price).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Fees Breakdown */}
      <div className="mt-6 max-w-xs ml-auto space-y-2">
  <div className="flex justify-between">
    <span className="flex text-left">Subtotal:</span>
    {/* @ts-ignore */}
    <span className="text-right">₦{fees.sub_total?.toLocaleString() || "0"}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-left">Discount:</span>
    {/* @ts-ignore */}
    <span className="text-right">₦{fees.discount?.toLocaleString() || "0"}</span>
  </div>

  <div className="flex justify-between">
    {/* @ts-ignore */}
    <span className="text-left">Tax ({fees.tax_rate ? `${fees.tax_rate}%` : ""}):</span>
    {/* @ts-ignore */}
    <span className="text-right">₦{fees.tax?.toLocaleString() || "0"}</span>
  </div>

  {/* @ts-ignore */}
  {fees.service_fee && (
    <div className="flex justify-between">
      <span className="text-left">Service Fee:</span>
      {/* @ts-ignore */}
      <span className="text-right">₦{fees.service_fee.toLocaleString()}</span>
    </div>
  )}
</div>


      {/* Total Amount */}
      <div className="mt-8 bg-orange-100 text-center py-6 rounded border-dashed border-2 border-orange-200">
        <p className="text-lg font-bold">Total</p>
        <p className="text-4xl text-orange-600 font-bold">
          ₦{Number(actualOrder.amount_paid).toLocaleString()}
        </p>
      </div>
    </div>
  );
};


export default ReceiptPreview;
