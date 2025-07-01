import SubscriptionCard from "./SubscriptionCard"
import { CheckCircle } from "lucide-react"

const features = [
  "Point of sales management system",
  "Finance management system",
  "2 admin seats",
  "Asset management system",
  "Procurement management system",
]

export default function CurrentPlan() {
  return (
    <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2">
      <h2 className="text-lg font-semibold mb-4">CURRENT PLAN</h2>
      <SubscriptionCard />
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
  )
}
