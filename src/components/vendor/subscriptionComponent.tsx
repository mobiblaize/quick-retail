import { CheckCircle } from "lucide-react";

const features = [
  "Point of sales management system",
  "Finance management system",
  "2 admin seats",
  "Asset management system",
  "Procurement management system",
];

export default function SubscriptionComponent() {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2">
      <h2 className="text-lg font-semibold mb-4">CURRENT PLAN</h2>

      {/* Subscription Card */}
      <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm font-semibold text-[#F56630]">Free Plan</p>
            <p className="text-2xl font-bold text-[#F56630]">₦0</p>
          </div>
          <button className="text-sm text-gray-400 cursor-not-allowed border rounded px-3 py-1">
            Renew Plan
          </button>
        </div>
        <span className="inline-block bg-green-100 text-[#40B869] text-xs px-2 py-1 rounded-full">
          Active
        </span>
        <p className="text-xs text-gray-500 mt-1">Expires: May 12, 2025</p>
      </div>

      {/* Features List */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2 text-gray-600">Subscription Features</h3>
        <ul className="space-y-2">
          {features.map((feature) => (
            <li key={feature} className="flex items-center text-sm text-gray-700">
              <CheckCircle className="text-green-500 mr-2" size={16} />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
