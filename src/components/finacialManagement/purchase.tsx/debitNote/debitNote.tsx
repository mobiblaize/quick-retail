const DebitNote = () => {
    return (
      <div className="w-full max-w-sm bg-white h-[441px] rounded-lg shadow-md p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-1">
        Debit Note
        </h2>
        <p className="text-xs text-gray-400 mb-8">
        Debit  Note value summary for new invoice.
        </p>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">Invoice Amount</p>
          <p className="font-semibold text-lg text-black">₦ 80,000,000</p>
        </div>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">
          Purchase Returns Valueding
          </p>
          <p className="text-black font-semibold text-lg">₦ 40,000,000</p>
        </div>
  
        <div className="mb-6">
          <p className="text-sm text-gray-500">Debit Note Value</p>
          <p className="text-black font-semibold text-lg">₦ 40,000,000</p>
        </div>
  
        <div className="mt-9 bg-[#F1672226] rounded-md px-4 py-3 text-center">
          <p className="text-sm text-gray-600 mb-1">Total amount billable</p>
          <p className="text-orange-600 text-2xl font-bold">₦ 40,000,000</p>
        </div>
      </div>
    );
  };
  
  export default DebitNote;
  