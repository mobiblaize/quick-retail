import { useEffect, useState } from "react";

type PlanType = {
  name: string;
  description: string;
  freeDays?: string;
  price?: string;
  userSeats: string;
  additionalSeatsCost: string;
  additionalSeats: number;
};

type PlanTabKey = "trial" | "monthly" | "yearly";

type SubscriptionSelections = {
  selectedType: PlanTabKey;
  plans: Record<PlanTabKey, PlanType[]>;
};

const SubscriptionSummary = () => {
  const [summary, setSummary] = useState<
    { label: string; description: string; amount: string }[]
  >([]);
  const [selectedType, setSelectedType] = useState<PlanTabKey | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("subscriptionSelections");
    if (!stored) return;

    const { selectedType, plans }: SubscriptionSelections = JSON.parse(stored);

    if (!selectedType || !plans[selectedType]) return;

    const typeDisplay = {
      trial: "Free Trial",
      monthly: "Monthly",
      yearly: "Yearly",
    }[selectedType];

    const summaryList: {
      label: string;
      description: string;
      amount: string;
    }[] = [];

    plans[selectedType].forEach((plan) => {
      const basePrice = plan.price
        ? parseFloat(plan.price.replace(/[₦,]/g, ""))
        : 0;
      const perSeatCost = parseFloat(
        plan.additionalSeatsCost.replace(/[₦,]/g, "")
      );
      const extraSeats = plan.additionalSeats || 0;
      const extraCost = extraSeats * perSeatCost;
      const total = basePrice + extraCost;

      const shouldInclude =
        selectedType === "trial" || basePrice > 0 || extraSeats > 0;

      if (shouldInclude) {
        summaryList.push({
          label: plan.name,
          description: `${plan.userSeats} (${typeDisplay}) | ${extraSeats} Additional Seat(s)`,
          amount:
            selectedType === "trial" ? "FREE" : `₦${total.toLocaleString()}`,
        });
      }
    });

    setSelectedType(selectedType);
    setSummary(summaryList);
  }, []);

  if (!selectedType) {
    return (
      <div className="p-4 text-center text-gray-500 font-medium">
        No subscription type selected.
      </div>
    );
  }

  if (summary.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 font-medium">
        No subscription selected yet.
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#D0D5DD] rounded-lg p-4 sm:p-6">
      <p className="text-sm font-semibold text-[#48464E]">
        Subscription Summary
      </p>

      <div className="grid mt-4 gap-4">
        {summary.map((item, index) => (
          <div key={index} className="border border-[#D0D5DD] rounded-lg p-3">
            <div className="flex justify-between items-center">
              <p className="text-[#48464E] font-semibold">{item.label}</p>
              <p className="text-[#F16722] font-semibold">{item.amount}</p>
            </div>
            <p className="text-[#6C6975] text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Static Footer Section */}
      <hr className="text-gray-200 mt-3 sm:mt-4" />
      <p className="text-[#48464E] font-semibold my-6 sm:my-8 text-lg sm:text-xl">
        Other Details
      </p>
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing Type
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              Subscription Billing Type
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            Monthly (1 Month)
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing Start
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              Billing Start
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            April 11, 2025
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-[#48464E] font-medium text-base sm:text-xl">
              Billing End
            </h2>
            <p className="text-[#908C9C] font-normal text-xs sm:text-sm">
              When this plan would end
            </p>
          </div>
          <p className="text-[#48464E] font-medium text-sm sm:text-base">
            May 11, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSummary;
