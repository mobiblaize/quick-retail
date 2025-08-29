interface SubscriptionSummaryProps {
    items: {
      title: string;
      price: number;
      seats: number;
      additionalSeats: number;
    }[];
    billingType: string;
    billingStart: string;
    billingEnd: string;
    totalPrice: number;
    onContinue: () => void;
  }
  
  export default function SubscriptionSummary1({
    items,
    billingType,
    billingStart,
    billingEnd,
    totalPrice,
    onContinue,
  }: SubscriptionSummaryProps) {
    return (
      <div className="p-6 space-y-6 mt-[2em] bg-white">
        <div>
          <h2 className="text-lg font-medium text-gray-700">Subscription Summary</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage sales transactions, inventory tracking, customer engagement, and reporting analytics with instant updates.
          </p>
        </div>
  
        {/* Main Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Selected Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    {item.seats} Admin Seat (Free) | {item.additionalSeats} Additional Seat
                  </p>
                </div>
                <p className="text-[#F16722] font-semibold">₦{item.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
  
          {/* Other Details */}
          <div className="border-l lg:col-span-2 border-gray-300 pl-[3em]  ">
            <h4 className="font-medium text-gray-800 mb-4">Other Details</h4>
            <div className="space-y-4 max-w-full text-sm">
              <div className="flex justify-between  ">
                <p className="text-gray-500">Billing Type</p>
                <p className="text-gray-800 font-normal">{billingType}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Billing Start</p>
                <p className="text-gray-800 font-normal">{billingStart}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-500">Billing Ends</p>
                <p className="text-gray-800 font-normal">{billingEnd}</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Price Summary + Continue */}
        <div className="border border-gray-200 p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Price</p>
              <p className="text-xs text-gray-400">Excluding V.A.T or related tax</p>
            </div>
            <p className="text-[#F16722] text-xl font-bold">₦{totalPrice.toLocaleString()}</p>
          </div>
          
        </div>
        <div className="flex justify-end">
            <button
              onClick={onContinue}
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 cursor-pointer"
            >
              Continue
            </button>
          </div>
      </div>
    );
  }
  