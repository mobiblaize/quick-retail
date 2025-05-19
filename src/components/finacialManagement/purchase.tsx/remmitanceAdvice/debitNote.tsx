const DebitRemittanceNote = () => {
    return (
      <div className="w-full max-w-sm bg-white h-[441px] rounded-lg shadow-md p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">
        Debit Note
        </h2>
        <p className="text-xs text-gray-400 mb-8">
        Debit  Note value summary for new invoice.
        </p>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">Number of Purchase Invoice (6)</p>
          <p className="font-semibold text-lg text-black">1617</p>
        </div>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">
          Total Purchase Invoice Amount Outstanding
          </p>
          <p className="text-red font-semibold text-lg">₦ 0</p>
        </div>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">Total Amount Payable Now</p>
          <p className="text-green font-semibold text-lg">₦ 0</p>
        </div>
  
        <div className="mt-9 bg-[#F1672226] rounded-md px-4 py-3 text-center">
          <p className="text-sm text-gray-600 mb-1">Total Remittance Advice Value</p>
          <p className="text-orange-600 text-2xl font-bold">₦0</p>
        </div>
      </div>
    );
  };
  
  export default DebitRemittanceNote;
  