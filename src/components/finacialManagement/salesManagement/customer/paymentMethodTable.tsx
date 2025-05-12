

export default function PaymentMethod() {
  return (
    <div className="bg-white p-[2em]">
         <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-separate border-spacing-y-4">
  <thead>
    <tr className="text-gray-500 text-sm bg-[#D0D5DD] shadow-sm rounded-lg">
    <td className="py-4 px-4 font-medium">Paymentethod</td>
    <td className="py-4 px-4 ">Time Stamp</td>

    <td className="py-4 px-4 ">Card Details</td>
    <td className="py-4 px-4 ">Amount Paid</td>
    <td className="py-4 px-4 ">Order ID</td>
    
    </tr>
  </thead>
  <tbody>
    {/* Repeat for each row */}
    <tr className="bg-white">
      <td className="py-3 px-4 font-medium">Card</td>
      <td className="py-3 px-4">13 Jun, 2024 4:20 PM</td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <img src="/visaCard.png" className="w-6 h-6" />
          <div>
            <div>Visa ending in 1234</div>
            <div className="text-sm text-gray-500">Expiry 06/2024</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 ">₦20,000</td>

      <td className="py-3 px-4">#2626816</td>
    </tr>
  </tbody>
  <thead>
    <tr className="text-gray-500 text-sm bg-[#D0D5DD] shadow-sm rounded-lg">
    <td className="py-4 px-4 font-medium">Paymentethod</td>
    <td className="py-4 px-4 ">Time Stamp</td>

    <td className="py-4 px-4 ">Card Details</td>
    <td className="py-4 px-4 ">Amount Paid</td>
    <td className="py-4 px-4 ">Order ID</td>
    
    </tr>
  </thead>
  <tbody>
    {/* Repeat for each row */}
    <tr className="bg-white">
      <td className="py-3 px-4 font-medium">Transfer</td>
      <td className="py-3 px-4">13 Jun, 2024 4:20 PM</td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <img src="/visa.png" className="w-6 h-6" />
          <div>
            <div>Bank transfer</div>
            <div className="text-sm text-gray-500">#27359271299373</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 ">₦20,000</td>

      <td className="py-3 px-4">#2626816</td>
    </tr>
  </tbody>
  <thead>
    <tr className="text-gray-500 text-sm bg-[#D0D5DD] shadow-sm rounded-lg">
    <td className="py-4 px-4 font-medium">Paymentethod</td>
    <td className="py-4 px-4 ">Time Stamp</td>

    <td className="py-4 px-4 ">Card Details</td>
    <td className="py-4 px-4 ">Amount Paid</td>
    <td className="py-4 px-4 ">Order ID</td>
    
    </tr>
  </thead>
  <tbody>
    {/* Repeat for each row */}
    <tr className="bg-white">
      <td className="py-3 px-4 font-medium">Cash</td>
      <td className="py-3 px-4">13 Jun, 2024 4:20 PM</td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-2">
          <div>
            <div>₦20,000</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 ">₦20,000</td>

      <td className="py-3 px-4">#2626816</td>
    </tr>
  </tbody>
</table>
</div>
    </div>


  );
}
