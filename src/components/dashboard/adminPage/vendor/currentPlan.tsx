
import { CheckCircle } from "lucide-react"
import SubscriptionCard from "./subscriptionCard"
import { List, Text, ThemeIcon } from "@mantine/core"

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
       <Text size="lg" fw={600} c="secondary.9">Subscription Features</Text>
       <List spacing="xs" size="sm" center>
  {features.map((feature) => (
    <List.Item
      key={feature}
      icon={
        <ThemeIcon color="green" size={20} radius="xl">
          <CheckCircle size={14} />
        </ThemeIcon>
      }
    >
      {feature}
    </List.Item>
  ))}
</List>
      </div>
    </div>
  )
}
