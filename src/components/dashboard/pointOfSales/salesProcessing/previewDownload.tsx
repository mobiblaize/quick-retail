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
    <>
      <div className="w-full mx-auto p-8 bg-white shadow rounded text-sm text-gray-800">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-4 mb-6">
          <div>
            <img src={logo} alt="logo" className="object-contain h-8 mb-2" />
            <p className="text-orange-600 font-semibold">
              {actualOrder.receipt_no}
            </p>
          </div>
          <div className="text-right text-md">
          <p className="text-xl text-left font-medium">{actualOrder.cashier ? `${actualOrder.cashier.firstname} ${actualOrder.cashier.lastname}` : ''}</p>
            <p>{actualOrder.location?.address}</p>
            <p>{actualOrder.location?.email}</p>
            <p>{actualOrder.location?.phone}</p>
          </div>
        </div>

        {/* Customer & Receipt Details */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="font-medium">Customer Details</h2>
            <p className="font-bold">
              {actualOrder.customer?.customer_name || actualOrder.customer_name}
            </p>

            <p className="whitespace-normal lg:w-[150px]">
              {actualOrder.customer?.customer_address}
            </p>
          </div>
          <div className="text-right">
            <h2 className="font-bold">Receipt Details</h2>
            <p className="text-[gray] font-normal">
              Date Issued:{" "}
              <span className="text-[black] font-normal">
                {new Date(actualOrder.date_completed).toLocaleDateString()}
              </span>
            </p>
            {/* No date due in response, so you can omit or add if available */}
          </div>
        </div>

        {/* Table of Sale Order Details */}
        <div>
          {/* <h3 className="bg-gray-100 p-3 font-bold text-center">
            Breakdown of Receipt Payment
          </h3> */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left text-md">
              <thead className="border-b font-bold  bg-gray-100">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Unit Price</th>
                  <th className="p-2">Amount</th>
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
                      <td className="p-2 text-md">
                        <span className="font-semibold"> {variationName} </span>{" "}
                        <br />
                        Size: <span className="font-semibold">{size} </span>
                        <br />
                        Color: <span className="font-semibold">{color}</span>
                      </td>
                      <td className="p-2">{detail.quantity_ordered}</td>
                      <td className="p-2">
                        ₦{Number(detail.unit_price).toLocaleString()}
                      </td>
                      <td className="p-2 ">
                        ₦{Number(detail.total_price).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Fees Breakdown */}
          <div className="mt-6 w-full pr-[7em] pl-[1em] mx-auto text-right text-gray-700">
            <div className="flex justify-between mb-1">
              <span>Subtotal:</span>
              {/* @ts-ignore */}
              <span>₦{fees.sub_total?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Discount:</span>
                            {/* @ts-ignore */}
              <span>₦{fees.discount?.toLocaleString() || "0"}</span>
            </div>
            <div className="flex justify-between mb-1">
                              {/* @ts-ignore */}
                              <span className="whitespace-nowrap">Tax ({fees.tax_rate ? `${fees.tax_rate}%` : ""}):</span>
                            {/* @ts-ignore */}
              <span>₦{fees.tax?.toLocaleString() || "0"}</span>
            </div>
                          {/* @ts-ignore */}
            {fees.service_fee && (
              <div className="flex justify-between mb-1">
                             <span className="whitespace-nowrap">Service Fee:</span>
                              {/* @ts-ignore */}
                <span>₦{fees.service_fee.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Receipt Amount */}
        <div className="mt-8 bg-orange-100 text-center py-6 rounded border-dashed border-2 border-orange-200">
          <p className="text-lg font-bold"> Total</p>
          <p className="text-4xl text-orange-600 font-bold">
            ₦{Number(actualOrder.amount_paid).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReceiptPreview;
