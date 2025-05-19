const RecordPaymentPage = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen text-sm text-gray-700">
      {/* Vendor Information */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h2 className="font-semibold mb-2 text-[#101928]">
          Vendor Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <p className="text-[#667085]">Registered Company Name:</p>
            <p className="text-[#101828]">Dario Enterprise</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Vendor ID:</p>
            <p className="text-[#101828]">167911</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Vendor Category:</p>
            <p className="text-[#101828]">Category 01</p>
          </div>
        </div>
      </div>

      {/* Bank Information */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 mt-[2em]">
        <h2 className="font-semibold mb-2 text-[#101928]">
          Payment Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <p className="text-[#667085]">Bank Name:</p>
            <p className="text-[#101828]">Dario Enterprise</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Bank Code:</p>
            <p className="text-[#101828]">167911</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Account Name:</p>
            <p className="text-[#101828]">Category 01</p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#667085]">IBAN:</p>
            <p className="text-[#101828]">24785</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Account Number</p>
            <p className="text-[#101828]">24789618732</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Swift Code</p>
            <p className="text-[#101828]">5465</p>
          </div>
        </div>
      </div>

      {/* Transaction Info */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 mt-[2em]">
        <h2 className="font-semibold mb-2">Payment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <p className="text-[#667085]">Transaction ID:</p>
            <p className="text-[#101828]">2478523</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Transaction Date</p>
            <p className="text-[#101828]">February 3rd, 2024</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Payment Processor</p>
            <p className="text-[#101828]">Paystack</p>
          </div>

          <div className="flex flex-col">
            <p className="text-[#667085]">Payment Status:</p>
            <p className="text-green-600 font-medium">Successful</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Amount Paid</p>
            <p className="text-[#101828]">₦60,000.00</p>
          </div>
          <div className="flex flex-col">
            <p className="text-[#667085]">Card Details</p>
            <p className="text-[#101828]">1671********</p>
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 overflow-auto">
        <h2 className="font-semibold mb-2">Purchase Invoice Details</h2>
        <table className="w-full table-auto ">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 ">Invoice ID</th>
              <th className="p-2 ">Invoice Amount</th>
              <th className="p-2 ">Amount Paid</th>
              <th className="p-2 ">Amount Due</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["47893", "₦20,000.00", "₦20,000.00", "₦0.00"],
              ["47894", "₦20,000.00", "₦18,000.00", "₦2,000.00"],
              ["47895", "₦20,000.00", "₦18,000.00", "₦2,000.00"],
              ["47896", "₦20,000.00", "₦18,000.00", "₦2,000.00"],
            ].map(([id, amount, paid, due], i) => (
              <tr key={i}>
                <td className="p-2 ">{id}</td>
                <td className="p-2 ">{amount}</td>
                <td className="p-2 text-green-600 font-medium">{paid}</td>
                <td className="p-2  text-red-600 font-medium">{due}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary Row */}
        <div className="mt-4 w-full flex flex-col items-center text-sm text-center">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-300 pb-4 w-full max-w-xl">
    <div className="flex flex-col items-center justify-center">
      <span>No. of Invoices Selected:</span>
      <span>Total Outstanding Selected:</span>
    </div>
    <div className="flex flex-col items-center justify-center">
      <strong>5</strong>
      <strong className="text-red-600">₦6,000.00</strong>
    </div>
  </div>

  <div className="mt-4 font-semibold text-center gap-[12em] flex">
    Total Amount Paid: <span className="text-green-600">₦60,000.00</span>
  </div>
</div>

      </div>

      {/* Proof of Payment */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h2 className="font-semibold mb-2">Proof Of Payment</h2>
        <div className="mb-2">
          <input type="file" className="border p-2 rounded w-full" />
        </div>
        <button className="text-red-600 mt-2 text-sm ">+ Add new</button>
      </div>

      {/* Note & Button */}
      <div className="mt-4">
        <p className="text-xs text-gray-600 mb-4">
          Kindly note that upon payment, this transaction (via card) hasn’t
          reflected on the Vendor Purchase invoice, so to sync, kindly record
          transaction with the necessary details by first downloading this
          transaction card and proceed to use it to “Record Payment” on each
          specific purchase invoice.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded">
          Record Payment
        </button>
      </div>
    </div>
  );
};

export default RecordPaymentPage;
