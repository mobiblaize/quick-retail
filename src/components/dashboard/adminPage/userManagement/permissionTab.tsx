import { Lock } from "lucide-react";

const tabs = [
  { label: "Point of Sales", locked: false },
  { label: "Finance Management", locked: true },
  { label: "Procurement", locked: true },
  { label: "Asset Management", locked: true },
  { label: "Reports", locked: true },
];

export default function PermissionsTab({ active, onChange }: { active: string; onChange: (val: string) => void }) {
  return (
    <div className="flex gap-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => onChange(tab.label)}
          className={`py-2 whitespace-nowrap text-sm font-medium border-b-2 ${
            active === tab.label
              ? "border-orange-500 text-orange-600"
              : "border-transparent text-gray-500"
          } flex items-center gap-1`}
        >
          {tab.locked && <Lock size={14} />}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
