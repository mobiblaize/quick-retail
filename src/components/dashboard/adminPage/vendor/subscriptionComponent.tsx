import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCurrentSub } from "../../../../hooks/backendApis/admin/profile";
import { List, Text, ThemeIcon } from "@mantine/core";



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
      <Text size="lg" fw={600} c="secondary.9">CURRENT PLAN</Text>

      {/* Subscription Card */}
      <div className="border rounded-lg p-4 bg-orange-50 border-orange-700">
        <div className="flex justify-between items-center mb-2">
          <div>
            <Text size="lg" fw={600} c="secondary.9" className="!capitalize">{plan} Plan</Text>
            <Text size="xl" fw={500} c="#F56630">
              {formattedAmount}
            </Text>
          </div>
          <button
            onClick={handleRenewClick}
            className={`text-sm ${status === "Active" ? "text-gray-400 cursor-pointer bg-white" : "text-orange-600"
              } border border-gray-200 rounded-lg px-3 py-1`}
            disabled={status === "Active"}
          >
            <Text>Renew Plan</Text>
          </button>
        </div>
        <span className="inline-block bg-green-100 text-[#40B869] text-xs px-2 py-1 rounded-full">
          <Text>{status}</Text>
        </span>
        <Text size="xs" c="dimmed" mt="xs">
          Expires: {formattedExpiry}
        </Text>
      </div>

      {/* Features List */}
      <div className="mt-4">
        <Text size="lg" fw={600} c="secondary.9">Subscription Features</Text>
        <List spacing="xs">
          {features.map((feature: any, index: number) => (
            <List.Item
              key={index}
              icon={
                <ThemeIcon color="gray" variant="light" radius="xl" size={20}>
                  <CheckCircle size={14} />
                </ThemeIcon>
              }
            >
              <Text size="sm" color="dark">
                {typeof feature === "string" ? feature : feature?.name || "Unnamed Feature"}
              </Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
