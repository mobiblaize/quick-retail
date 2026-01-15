/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";
import { useFetchCurrentSub } from "../../../../hooks/backendApis/admin/profile";
import { List, Text, ThemeIcon, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications"

const defaultFeatures = [
  "Point of sales management system",
  // "Finance management system",
  // "2 admin seats",
  // "Asset management system",
  // "Procurement management system",
];

export default function SubscriptionComponent() {
  const { data, isLoading, error, isError } = useFetchCurrentSub();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState<any>({});

  const [expires, setExpires] = useState<Date>(new Date());
  const [status, setStatus] = useState<string>("Loading...");
  // ✅ Sync state immediately when data changes
  useEffect(() => {
    if (isError) {
      const sub = (error as any)?.response?.data?.data;
      const expiryDate = new Date(sub.expired_at);
      const now = new Date();
      const computedStatus =
        sub.status === "Active" && expiryDate > now ? "Active" : "Expired";

        setExpires(expiryDate)

      setSubscription(sub);

      setStatus(computedStatus);
      console.log(sub);
    }
    if (data?.data) {
      const sub = data?.data;
      const expiryDate = new Date(sub.expires);
      const now = new Date();
      if (sub.status === "Active" && expiryDate > now ) {
        notifications.show({message: data.message, color: "red"})
      }
      const computedStatus =
        sub.status === "Active" && expiryDate > now ? "Active" : "Expired";

        setExpires(expiryDate)
      setSubscription(sub);

      setStatus(computedStatus);
    }
  }, [data, error, isError]);
  

  if (isLoading)
    return (
      <div className="flex items-center justify-center p-6">
        <Loader color="orange" />
      </div>
    );

  const plan = subscription.plan ?? "No";
  const amount = subscription.amount ?? 0;
  // const expiryDate = expires ?? new Date().toISOString();
  console.log(subscription);
  const features =
    status === "Active"
      ? subscription.features ?? defaultFeatures
      : defaultFeatures;

  const formattedAmount = `₦${Number(amount).toLocaleString()}`;
  const formattedExpiry = expires.toLocaleDateString("en-GB", {
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
      <Text size="lg" fw={600} c="secondary.9">
        CURRENT PLAN
      </Text>

      {/* Subscription Card */}
      <div className="border rounded-lg p-4 bg-orange-50 border-orange-700 transition-colors duration-300">
        <div className="flex justify-between items-center mb-2">
          <div>
            <Text size="lg" fw={600} c="secondary.9" className="!capitalize">
              {plan} Plan
            </Text>
            <Text size="xl" fw={500} c="#F56630">
              {formattedAmount}
            </Text>
          </div>

          {/* ✅ Button Styling Fix */}
          <button
            onClick={handleRenewClick}
            disabled={status === "Active"}
            className={`text-sm px-3 py-1 rounded-lg border transition-all duration-300 ${
              status === "Active"
                ? "bg-gray-100 text-white cursor-not-allowed"
                : "bg-orange-600 hover:bg-orange-700 text-white border-transparent"
            }`}
          >
            <Text fw={500}>Renew Plan</Text>
          </button>
        </div>

        {/* Status Badge */}
        <span
          className={`inline-block text-xs px-2 py-1 rounded-full transition-all duration-300 ${
            status === "Active"
              ? "bg-green-100 text-[#40B869]"
              : "bg-red-100 text-[#B42318]"
          }`}
        >
          <Text>{status}</Text>
        </span>

        <Text size="xs" c="dimmed" mt="xs">
          Expires: {formattedExpiry}
        </Text>
      </div>

      {/* Features List */}
      <div className="mt-4">
        <Text size="lg" fw={600} c="secondary.9">
          Subscription Features
        </Text>
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
                {typeof feature === "string"
                  ? feature
                  : feature?.name || "Unnamed Feature"}
              </Text>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
