

export default function SubscriptionCard() {
  return (
    <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
      <div className="flex justify-between items-center mb-2">
        <div>
          <p className="text-sm font-semibold text-orange-700">Free Plan</p>
          <p className="text-2xl font-bold text-orange-700">₦0</p>
        </div>
        <button className="text-sm text-gray-400 cursor-not-allowed border rounded px-3 py-1">
          Renew Plan
        </button>
      </div>
      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
        Active
      </span>
      <p className="text-xs text-gray-500 mt-1">Expires: May 12, 2025</p>
    </div>
  )
}
