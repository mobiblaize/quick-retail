

const PurchaseInvoice = () => {
  const items = [
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
    {
      name: 'Product Name',
      description: 'Product description here and just enough to show how long the text is',
      quantity: 32,
      price: 10000000,
      discount: '3%',
      vat: '7.5%',
      total: 10000000,
    },
  ];

  const grnValue = 60000;

  return (
    <div className="w-[25%] min-w-[400px] bg-[#f9fafb] p-6">
      <h1 className="text-2xl font-semibold mb-1">Purchase Invoice</h1>
      <p className="text-gray-500 mb-4 text-sm">A live preview of your purchase order.</p>

      <div className="bg-white shadow rounded-lg p-6 text-sm space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start text-[8px] ">
          <div>
            <p className="text-orange-500 font-semibold">QUICK RETAIL</p>
            <p className="text-gray-400 mt-1">Receipt #189301</p>
          </div>
          <div className="text-right text-gray-500">
            <p>Company Address, Street name, State,</p>
            <p>Country</p>
            <p>+234 (Phone Number)</p>
            <p>+234 (Phone Number)</p>
          </div>
        </div>

        {/* Customer & Receipt Info */}
        <div className="flex justify-between text-[8px] text-gray-700">
          <div>
            <p className="font-bold">Customer Details</p>
            <p>Onuhwechi Onochieokwu</p>
            <p>Street 34, Doveland, Lagos</p>
            <p>Lagos</p>
          </div>
          <div className="text-right">
            <p className="font-bold">Receipt Details</p>
            <p>Date: June 9, 2023</p>
            <p>Receipt Date: June 9, 2023</p>
          </div>
        </div>

        {/* Table */}
        <div className=''>
          <table className="w-full text-left  text-[5px] ">
            <thead className="bg-gray-50  text-gray-600">
              <tr>
                <th className="p-2 ">Item Name & Description</th>
                <th className="p-2 ">Quantity</th>
                <th className="p-2 ">Price/Unit</th>
                <th className="p-2 ">Discount</th>
                <th className="p-2 ">Tax</th>
                <th className="p-2 ">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className=" ">
                  <td className="p-2 ">
                    <p className="font-semibold whitespace-nowrap">{item.name}</p>
                    <p className="text-gray-500 ">{item.description}</p>
                  </td>
                  <td className="p-2 ">{item.quantity}</td>
                  <td className="p-2 ">₦{item.price.toLocaleString()}</td>
                  <td className="p-2 ">{item.discount}</td>
                  <td className="p-2 ">VAT {item.vat}</td>
                  <td className="p-2">₦{item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GRN Value */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg text-center py-6">
          <p className="text-[8px] text-gray-500 mb-1">G.R.N Value</p>
          <p className="text-2xl font-bold text-orange-500">₦{grnValue.toLocaleString()}</p>
        </div>

        {/* Terms */}
        <div className="text-gray-400 text-[8px] leading-relaxed">
          <p className="font-semibold mb-1">Terms and Conditions</p>
          <p>
            Kindly note that this quote is only valid for 30 days before price change.
            Hence, the 30-day validity period starts right after the quote has been
            sent to the customer.
          </p>
        </div>

        {/* Signature */}
        <div>
          <p className="text-xs text-gray-400 italic">Signed by</p>
          <div className="h-12 w-32 border-b border-gray-300 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInvoice;
