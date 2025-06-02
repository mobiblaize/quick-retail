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

//   let fees = {};
//   try {
//     fees = actualOrder.fees ? JSON.parse(actualOrder.fees) : {};
//   } catch (err) {
//     console.warn("Invalid JSON in order.fees", err);
//   }

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
          {/* <div className="text-right text-xs">
            <p>{actualOrder.customer?.customer_address}</p>
            <p>+234 (Phone Number)</p>
            <p>+234 (Phone Number)</p>
          </div> */}
        </div>

        {/* Customer & Receipt Details */}
        <div className="flex justify-between mb-8">
          <div>
            <h2 className="font-bold">Customer Details</h2>
            <p className="font-semibold">
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
          <h3 className="bg-gray-100 p-3 font-bold text-center">
            Breakdown of Receipt Payment
          </h3>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b font-bold bg-[#FCFCFC]">
                <tr>
                  <th className="p-2">Item</th>
                  <th className="p-2">Unit Price</th>
                  <th className="p-2">Quantity</th>
                  <th className="p-2">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {actualOrder.sale_order_details?.map((detail: any) => (
                  <tr key={detail.order_detail_id}>
                    <td className="p-2">
                      {detail.product_variation?.name || "N/A"}
                    </td>
                    <td className="p-2">
                      ₦{Number(detail.unit_price).toLocaleString()}
                    </td>
                    <td className="p-2">{detail.quantity_ordered}</td>
                    <td className="p-2">
                      ₦{Number(detail.total_price).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between text-xs">
            <p>
              No. of Items:{" "}
              <strong>{actualOrder.sale_order_details?.length}</strong>
            </p>
          </div>

          <div className="text-center mt-4 text-base font-semibold bg-[#F2F4F7] py-[2em]">
            <p>
              Total:{" "}
              <span className="text-black font-bold">
                ₦{Number(actualOrder.order_total).toLocaleString()}
              </span>
            </p>
            Balance :{" "}
            <span className="text-green-600 font-bold">
              ₦{Number(actualOrder.balance).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Receipt Amount */}
        <div className="mt-8 bg-orange-100 text-center py-6 rounded border-dashed border-2 border-orange-200">
          <p className="text-lg font-bold"> Amount Paid</p>
          <p className="text-2xl text-orange-600 font-bold">
            ₦{Number(actualOrder.amount_paid).toLocaleString()}
          </p>
        </div>

        {/* Terms & Signature */}
        <div className="flex justify-between items-end mt-8 text-xs">
          <div className="flex flex-col items-start mt-8 text-xs">
            <p className="text-[gray] font-normal">Terms and Conditions</p>
            <p className="max-w-md">
              Kindly note that this quote is only valid for 30days before price
              change. Hence, the 30days validity period start right after the
              quote has been sent to the customer.
            </p>
          </div>
          <div className="text-right">
            <p className="mb-1">Signature</p>
            {/* <img src="/signature.png" alt="Signature" className="h-10" /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceiptPreview;
