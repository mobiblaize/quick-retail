import logo from "../../../../assets/images/logo.png";

const PurchaseOrderReceipt  = () => {
   
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
      }, {
        name: 'Product Name',
        description: 'Product description here and just enough to show how long the text is',
        quantity: 32,
        price: 10000000,
        discount: '3%',
        vat: '7.5%',
        total: 10000000,
      }, {
        name: 'Product Name',
        description: 'Product description here and just enough to show how long the text is',
        quantity: 32,
        price: 10000000,
        discount: '3%',
        vat: '7.5%',
        total: 10000000,
      }, {
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
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8">
    

      <div className="bg-white shadow rounded-md p-6 space-y-6 text-sm sm:text-base">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
          <img src={logo} alt="logo" className="object-contain" />
            <p className="text-xs text-orange-600">Debit Note #181901</p>
          </div>
          <div className="text-xs text-gray-500 mt-4 sm:mt-0">
            <p>Company Address, Street name, State, Country</p>
            <p>+234 (Phone Number)</p>
            <p>+234 (Phone Number)</p>
          </div>
        </div>

        {/* Customer & Receipt Info */}
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-700">
          <div>
            <p className="font-semibold">Customer Details</p>
            <p>Onuhwechi Onochieokwu</p>
            <p>Street 34, Doveland, Lagos</p>
            <p>lagos</p>
          </div>
          <div className="text-right sm:text-left mt-4 sm:mt-0">
            <p className="font-semibold">Receipt Details</p>
            <p>Date: June 9, 2023</p>
            <p>Receipt Date: June 9, 2023</p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-2 ">Item Name & Description</th>
                <th className="px-4 py-2 ">Quantity</th>
                <th className="px-4 py-2 ">Price/Unit</th>
                <th className="px-4 py-2 ">Discount</th>
                <th className="px-4 py-2 ">Tax</th>
                <th className="px-4 py-2 ">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} className="whitespace-normal">
                  <td className="px-4 py-3 ">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">{item.description}</p>
                  </td>
                  <td className="px-4 py-3 ">{item.quantity}</td>
                  <td className="px-4 py-3 ">₦{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3 ">{item.discount}</td>
                  <td className="px-4 py-3 ">VAT {item.vat}</td>
                  <td className="px-4 py-3 ">₦{item.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* GRN Value */}
        <div className="border border-orange-200 bg-orange-50 text-center py-6 rounded-md">
          <p className="text-gray-500 text-xs sm:text-sm">G.R.N Value</p>
          <p className="text-2xl font-bold text-orange-500">₦{grnValue.toLocaleString()}</p>
        </div>

        {/* Terms and Conditions */}
        <div className="text-gray-400 text-xs">
          <p className="mb-2 font-semibold">Terms and Conditions</p>
          <p>
            Kindly note that this quote is only valid for 30 days before price change.
            Hence, the 30-day validity period starts right after the quote has been
            sent to the customer.
          </p>
        </div>

        {/* Signature */}
        <div className="pt-6">
          <p className="text-xs text-gray-400 italic">Signed by</p>
          <div className="h-12 border-b border-gray-200 w-32 mt-1"></div>
        </div>

       
      </div>
    </div>
  );
};

export default PurchaseOrderReceipt;
