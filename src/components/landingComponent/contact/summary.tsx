"use client";

import { useEffect, useState } from "react";
import { UseFormReturnType } from "@mantine/form";
import PaymentSummary from "./paymentSummary";
import SubscriptionSummary from "./subscriptionSummary";

type Props = {
  form: UseFormReturnType<any>;
};

const Summary = ({ form }: Props) => {
  const [appsCount, setAppsCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("subscriptionSelections");
    if (!stored) return;

    const parsed = JSON.parse(stored);
    const selectedType = parsed?.selectedType;
    const plans = parsed?.plans?.[selectedType] ?? [];

    const uniqueAppNames = new Set();
    let total = 0;

    plans.forEach((plan: any) => {
      const name = plan.name;
      uniqueAppNames.add(name);

      const price = parseInt(plan.price?.replace(/[₦,]/g, "") || "0", 10);
      const seatCost = parseInt(
        plan.additionalSeatsCost?.replace(/[₦,]/g, "").split(" ")[0] || "0",
        10
      );
      const extraSeats = plan.additionalSeats ?? 0;

      total += price + seatCost * extraSeats;
    });

    setAppsCount(uniqueAppNames.size);
    setTotalCost(total);
  }, []);

  return (
    <main className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <SubscriptionSummary />
      <PaymentSummary numberOfApps={appsCount} totalCost={totalCost} form={form} />
    </main>
  );
};

export default Summary;
