/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Card, Group, Loader, Text, Title } from "@mantine/core";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router";
import { useFetchData } from "../../../hooks/useApis";
// import { ArrowUpRight } from "lucide-react";
import { formatMoney } from "../../../utils/helpers";
import {
  billingTypeStore,
  selectedSubs,
  totalPrice,
  selectedApp,
  // billingType,
} from "../../../store/subscriptionStore";

// const subscriptionPlan = [{ id: 3, name: "Billed Annually", slug: "yearly" }];

import { Check } from "lucide-react";

const features = [
  "Unlimited stores",
  "Unlimited users",
  "All Growth features",
  "Advanced inventory, audits, shrinkage tracking",
  "Loyalty programmes, advanced customer insights",
  "Full financial management, multi-currency, tax",
  "Custom reports, exports",
  "Advanced analytics & KPIs",
  "2FA, advanced security, system controls",
  "APIs, third-party integrations",
  "Dedicated account support + SLA (Service Level Agreement)",
];

const SubDetails = () => {
  const [activePlan, setActivePlan] = useAtom(billingTypeStore);
  const setSelectedApps = useSetAtom(selectedApp);
  const totalPriceValue = useAtomValue(totalPrice);
  const setTotalPriceValue = useSetAtom(totalPrice);
  const [selectedSub, setSelectedSub] = useAtom(selectedSubs);

  // Set default to yearly on mount
  useEffect(() => {
    setActivePlan("yearly");
  }, [setActivePlan]);

  const { data: subscriptionPlans, isPending: subscriptionPlansLoading } =
    useFetchData(`applications/allSubscription?billing_type=${activePlan}`);

  // Auto-select POS on mount if available
  useEffect(() => {
    if (!subscriptionPlans?.data) return;
    const posApp = subscriptionPlans.data.find(
      (item: any) =>
        item?.application?.name === "Point of Sales Management System",
    );
    if (posApp && !selectedSub.some((s: any) => s.id === posApp.id)) {
      const updated = [
        ...selectedSub,
        { ...posApp, additional_user_seat_number: 0 },
      ];
      setSelectedSub(updated);
    }
  }, [subscriptionPlans, setSelectedSub, selectedSub]);

  // Update total price for annual billing
  useEffect(() => {
    if (subscriptionPlans?.data) {
      const newTotal = selectedSub.reduce((sum: number, item: any) => {
        const plan = subscriptionPlans.data.find((p: any) => p.id === item.id);
        if (!plan) return sum;

        const baseAmount = plan.total_yearly_amount;

        const additionalSeatsCost = item.additional_user_seat_number
          ? item.additional_user_seat_number * (plan.price_per_seat || 0)
          : 0;

        // For yearly billing, multiply additional seats cost by 12
        const totalSeatsCost = additionalSeatsCost * 12;

        return sum + (Number(baseAmount) || 0) + totalSeatsCost;
      }, 0);

      setTotalPriceValue(newTotal);
    }
  }, [subscriptionPlans, selectedSub, setTotalPriceValue]);

  useEffect(() => {
    setSelectedApps([]);
  }, [activePlan, setSelectedApps]);

  if (subscriptionPlansLoading) {
    return (
      <Box
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader size={50} color="#F56630" />
      </Box>
    );
  }

  return (
    <Box
      style={{
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",
      }}
      className=""
    >
      <div className="max-w-[1008px] mx-auto px-5 w-full">
        <div className=" my-14 ">
          <Card
            shadow="xs"
            radius="lg"
            p={0}
            withBorder
            style={{ borderColor: "#FA9874", backgroundColor: "#F9FAFB" }}
          >
            {/* Header and Tabs */}
            <div className="p-8 pb-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                <Box>
                  <Title order={2} size="h2" fw={700} c="#101828" mb={8}>
                    Basic plan
                  </Title>
                  <Text size="md" c="#475467" className="max-w-[720px]">
                    Manage sales and transactions, inventory tracking, customer
                    engagement and reporting analytics with instant updates
                  </Text>
                </Box>
              </div>

              {/* Price */}
              <div className="mb-8">
                <Text
                  fw={700}
                  style={{
                    fontSize: "48px",
                    color: "#F56630",
                    lineHeight: "1.2",
                    display: "flex",
                    alignItems: "baseline",
                  }}
                >
                  ₦{formatMoney(Number(totalPriceValue))}
                  <Text component="span" size="xl" c="#667085" fw={500} ml={4}>
                    /year
                  </Text>
                </Text>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-4 mb-8">
                {features.map((feature, index) => (
                  <Group key={index} gap={12} align="start">
                    <div className="mt-1 bg-[#FEF0E9] rounded-full p-0.5">
                      <Check size={14} color="#F56630" strokeWidth={3} />
                    </div>
                    <Text size="md" c="#475467" fw={400}>
                      {feature}
                    </Text>
                  </Group>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 px-8 bg-white border-t border-[#EAECF0] rounded-b-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <Text size="md" c="#475467">
                Subscribe to get full access to the platform and start managing
                your business effectively
              </Text>

              <Link to="/payment-summary" className="w-full md:w-auto">
                <Button
                  radius="md"
                  color="#F56630"
                  size="lg"
                  px={40}
                  className="w-full md:w-auto"
                  disabled={selectedSub.length === 0}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default SubDetails;
