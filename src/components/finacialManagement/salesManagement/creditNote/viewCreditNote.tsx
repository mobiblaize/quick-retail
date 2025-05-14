import logo from "../../../../assets/images/logo.png";
import sign from "../../../../assets/images/sign.png";

const ViewCreditNoteReceipt = () => {
  // const invoices = [
  //   { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
  //   { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
  //   { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
  //   { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
  // ];



return (
    <div className="w-full mx-auto bg-white p-6 shadow-md text-sm font-sans text-[#1A1A1A]">
      {/* Header */}
      <div className="flex justify-between items-start border-b pb-4 mb-4">
        <div>

          <img src={logo} alt="logo" className="object-contain" />
          <p className="text-sm text-orange-500 mt-1">Receipt #181901</p>
        </div>
        <div className="text-right text-xs">
          <p>Company Address, Street Name, State, Nigeria</p>
          <p>+234 (Phone Number)</p>
        </div>
      </div>

      {/* Customer & Receipt Details */}
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="font-semibold mb-1">Customer Details</h2>
          <p>Grateful Enahoroede</p>
          <p>45 Street, Onowanwaka</p>
          <p>Lagos State</p>
          <p>Nigeria</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Receipt Details</h2>
          <p>Date: April 1, 2023</p>
          <p>Issue Date: April 1, 2023</p>
          <p>Due Date: April 1, 2023</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2">Item Name & Description</th>
              <th className="px-3 py-2">Quantity</th>
              <th className="px-3 py-2">Price/Rate</th>
              <th className="px-3 py-2">Discount</th>
              <th className="px-3 py-2">Tax</th>
              <th className="px-3 py-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {Array(6).fill(0).map((_, i) => (
              <tr key={i} className="border-b">
                <td className="px-3 py-2">
                  <p className="font-medium">Product Name</p>
                  <p className="text-gray-500">Product description in two and just drawing one line long text.</p>
                </td>
                <td className="px-3 py-2">32</td>
                <td className="px-3 py-2">₦ 10,000.00</td>
                <td className="px-3 py-2">3%</td>
                <td className="px-3 py-2">VAT 7.5%</td>
                <td className="px-3 py-2">₦ 10,000.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Credit Note Value */}
      <div className="my-8 border border-dashed border-orange-200 bg-orange-50 text-center p-6 rounded-md">
        <p className="text-xs">Credit Note Value</p>
        <p className="text-2xl font-bold text-orange-600">₦ 60,000.00</p>
      </div>

      {/* Reason */}
      <div className="mb-6">
        <p className="text-xs font-semibold mb-1">Reason for action</p>
        <p className="text-xs text-gray-700">This return is because of a faulty product.</p>
      </div>

      {/* Signature */}
      <div>
        <p className="text-xs mb-2 font-semibold">Signature</p>
        <img src={sign} alt="sign" className="object-contain" />
        <div className="w-32 h-12 border-b border-gray-300" />
      </div>
    </div>
  );
};

export default ViewCreditNoteReceipt;
