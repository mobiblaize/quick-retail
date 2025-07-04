interface BillingToggleProps {
    billingType: "monthly" | "annually"
    onToggle: (value: "monthly" | "annually") => void
  }
  
  export default function BillingToggle({
    billingType,
    onToggle,
  }: BillingToggleProps) {
    return (
      <div className="flex bg-gray-100 rounded-lg w-max p-1 mb-6">
        {["monthly", "annually"].map((type) => {
          const active = billingType === type;
          return (
            <button
              key={type}
              onClick={() => onToggle(type as "monthly" | "annually")}
              className={`px-4 py-2 rounded-lg text-sm transition-all ${
                active
                  ? "bg-white text-gray-900 shadow font-semibold"
                  : "text-gray-500"
              }`}
            >
              Billed {type === "monthly" ? "Monthly" : "Annually"}
            </button>
          );
        })}
      </div>
    );
  }
  