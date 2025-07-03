import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { useFetchCurrentSub } from "../../../hooks/backendApis/admin/profile";



const defaultFeatures = [
  "Point of sales management system",
  "Finance management system",
  "2 admin seats",
  "Asset management system",
  "Procurement management system",
];

export default function SubscriptionComponent() {
  const { data, isLoading } = useFetchCurrentSub();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading subscription...</p>;

  const subscription = data?.data ?? {};
  const plan = subscription.plan ?? "No";
  const amount = subscription.amount ?? 0;
  const status = subscription.status ?? "Inactive";
  const expires = subscription.expires ?? new Date().toISOString();
  const features = subscription.features ?? defaultFeatures;

  const formattedAmount = `₦${Number(amount).toLocaleString()}`;
  const formattedExpiry = new Date(expires).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRenewClick = () => {
    if (status !== "Active") {
      navigate(ROUTES.subplan);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 w-full lg:w-1/2">
      <h2 className="text-lg font-medium mb-4">CURRENT PLAN</h2>

      {/* Subscription Card */}
      <div className="border rounded-lg p-4 bg-orange-50 border-orange-200">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm font-semibold text-[#475367] capitalize">{plan} Plan</p>
            <p className="text-2xl font-medium text-[#F56630]">{formattedAmount}</p>
          </div>
          <button
            onClick={handleRenewClick}
            className={`text-sm ${
              status === "Active" ? "text-gray-400 cursor-pointer" : "text-orange-600"
            } border rounded px-3 py-1`}
            disabled={status === "Active"}
          >
            Renew Plan
          </button>
        </div>
        <span className="inline-block bg-green-100 text-[#40B869] text-xs px-2 py-1 rounded-full">
          {status}
        </span>
        <p className="text-xs text-gray-500 mt-1">Expires: {formattedExpiry}</p>
      </div>

      {/* Features List */}
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2 text-gray-600">Subscription Features</h3>
        <ul className="space-y-2">
        {features.map((feature: any, index: number) => (
  <li key={index} className="flex items-center text-sm text-gray-700">
    <CheckCircle className="text-gray-300 mr-2" size={16} />
    {typeof feature === "string" ? feature : feature?.name || "Unnamed Feature"}
  </li>
))}

        </ul>
      </div>
    </div>
  );
}
