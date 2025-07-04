interface SubscriptionSummaryProps {
    totalPrice: number
    onContinue: () => void
  }
  
  export default function SubscriptionSummary({ totalPrice, onContinue }: SubscriptionSummaryProps) {
    return (
      <div className="border-t mt-6 pt-4 items-center px-2 pb-4">
        <div className="border border-gray-300 p-6 w-full rounded-lg flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Price</p>
            <p className="text-xs text-gray-400">Excluding V.A.T or related tax</p>
          </div>
          <div>
            <p className="text-xl font-bold text-orange-600">₦{totalPrice.toLocaleString()}</p>
          </div>
        </div>
  
        <div className="mt-3 flex justify-end">
          <button
            onClick={onContinue}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 font-medium cursor-pointer"
          >
            Continue
          </button>
        </div>
      </div>
    )
  }
  