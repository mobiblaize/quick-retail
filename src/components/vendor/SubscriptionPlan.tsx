'use client'

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../constants/routes"
import BillingToggle from "./BillingToggle"
import SubscriptionItem from "./SubscriptionItem"
import SubscriptionSummary from "./SubscriptionSummary"


const services = [
  {
    title: "Point of Sales Management System",
    description:
      "Manage sales transactions, inventory tracking, customer engagement, and reporting analytics with instant updates.",
    price: 10000,
  },
  {
    title: "Finance Management System",
    description:
      "Manage, evaluate, and control your business finance on the finance management system.",
    price: 10000,
  },
  {
    title: "Purchase and Supplier Management",
    description:
      "Track inventory and product restocking on the procurement system.",
    price: 10000,
  },
]

export default function SubscriptionPlan() {
  const [billing, setBilling] = useState<"monthly" | "annually">("monthly")
  const [selections, setSelections] = useState(
    services.map(() => ({ checked: false, seats: 0 }))
  )

  const handleToggle = (index: number, checked: boolean) => {
    setSelections((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked } : item
      )
    )
  }

  const navigate = useNavigate()

  const handleContinue = () => {
    navigate(ROUTES.changeplan)
  }

  const handleSeatChange = (index: number, seats: number) => {
    setSelections((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, seats } : item
      )
    )
  }

  const totalPrice = selections.reduce((total, { checked, seats }, i) => {
    const base = checked ? services[i].price : 0
    const additional = seats * 1000 // assume ₦1000 per extra seat
    return total + base + additional
  }, 0)

  return (
<div className="w-full max-w-5xl px-6 mx-auto bg-white shadow rounded-lg mt-10 pb-8">
      <h2 className="text-lg font-medium text-gray-800 mb-2 pt-[2em]">Subscription Details</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage sales transactions, inventory tracking, customer engagement, and reporting analytics with instant updates.
      </p>

      <BillingToggle billingType={billing} onToggle={setBilling} />

      <div className="">
        {services.map((service, index) => (
          <SubscriptionItem
            key={service.title}
            title={service.title}
            description={service.description}
            price={service.price}
            checked={selections[index].checked}
            onChecked={(checked) => handleToggle(index, checked)}
            seatCount={selections[index].seats}
            onSeatChange={(count) => handleSeatChange(index, count)}
          />
        ))}
      </div>

      <SubscriptionSummary totalPrice={totalPrice} onContinue={handleContinue}/>
    </div>
  )
}
