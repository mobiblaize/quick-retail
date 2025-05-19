import logo from "../../../../assets/images/logo.png";
import sign from "../../../../assets/images/sign.png";

const PreviewRemittance = () => {
  const invoices = [
    { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
    { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
    { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
    { id: "#178181", date: "April 18, 2023", amount: 20000, paid: 10000 },
  ];

  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalDue = invoices.reduce(
    (sum, inv) => sum + (inv.amount - inv.paid),
    0
  );

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-md font-sans text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-300 pb-4">
        <div>
          <img src={logo} alt="logo" className="object-contain" />
          <p className="text-orange-500 font-semibold">Receipt #181901</p>
        </div>
        <div className="text-sm text-right">
          <p>Company Address, Street Name, State, Nigeria</p>
          <p>+234 (Phone Number)</p>
          <p>+234 (Phone Number)</p>
        </div>
      </div>

      {/* Customer & Receipt Details */}
      <div className="flex justify-between mt-6 text-sm">
        <div>
          <h3 className="font-normal text-gray-500">Customer Details</h3>
          <p className="font-semibold text-xl">Grateful Onisheokovo</p>
          <p>5, Estate Street, Onosa/Orimedu, Lagos State</p>
          <p>Nigeria</p>
        </div>
        <div>
          <h3 className="font-semibold text-xl">Receipt Details</h3>
          <p className="font-normal text-gray-500">
            Issue Date: <span className="text-black">April 11, 2023</span>
          </p>
          <p className="font-normal text-gray-500">
            Due Date:<span className="text-black">April 11, 2023</span>{" "}
          </p>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="mt-8">
        <h4 className="text-center font-bold mb-3">
          Breakdown of Receipt Payment
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left">
                <th className="p-2">Invoice ID</th>
                <th className="p-2">Invoice Amount</th>
                <th className="p-2">Amount Paid</th>
                <th className="p-2">Amount Due</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => (
                <tr key={index} className="border-t">
                  <div className="flex flex-col">
                    <td className="p-2">{invoice.id}</td>
                    <td className="p-2">{invoice.date}</td>
                  </div>

                  <td className="p-2">₦{invoice.amount.toLocaleString()}</td>
                  <td className="p-2 text-green-600 font-medium">
                    ₦{invoice.paid.toLocaleString()}
                  </td>
                  <td className="p-2 text-red-500">
                    ₦{(invoice.amount - invoice.paid).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-gray-50 p-4 rounded-md">
        <div className="flex justify-between text-sm font-medium">
          <p>No. Of Invoices Selected:</p>
          <p>Four (4)</p>
        </div>
        <div className="flex justify-between text-sm font-medium text-red-600 mt-2">
          <p>Total Outstanding Selected:</p>
          <p>₦{totalDue.toLocaleString()}</p>
        </div>
        <div className="flex justify-between text-sm font-medium text-green-600 mt-1">
          <p>Total Amount Paid:</p>
          <p>₦{totalPaid.toLocaleString()}</p>
        </div>
      </div>

      {/* Total Amount Paid */}
      <div className="mt-8 bg-orange-50 border border-dashed border-orange-300 text-center py-4 rounded-md">
        <h2 className="text-orange-600 text-xl font-bold">Receipt Amount</h2>
        <p className="text-3xl font-bold text-orange-600 mt-2">₦60,000.00</p>
      </div>

      {/* Terms */}
      <div className="mt-6 text-md text-gray-600">
        <p className="text-[#A0A3BD]">Terms and Conditions</p>
        <p>
          Kindly note that this quote is only valid for 30 days before price
          change.
          <br /> Hence, the 30 days validity period starts right after the quote
          has been <br /> sent to the customer.
        </p>
      </div>

      {/* Signature */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-sm text-gray-400">Signature:</p>
        <img src={sign} alt="sign" className="object-contain" />
      </div>
    </div>
  );
};

export default PreviewRemittance;
