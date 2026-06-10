/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Card, Group, Loader, Text, Title } from "@mantine/core";
import { useAtomValue, useAtom, useSetAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router";
import { useFetchData } from "../../../hooks/useApis";
import { ArrowUpRight } from "lucide-react";
import { formatMoney } from "../../../utils/helpers";
import SubscriptionPlans from "./SubscriptionPlans";
import {
  billingTypeStore,
  selectedSubs,
  totalPrice,
  selectedApp,
  billingType,
} from "../../../store/subscriptionStore";

const subscriptionPlan = [
  { id: 1, name: "Free Trial", slug: "trial" },
  // { id: 2, name: "Billed Monthly", slug: "monthly" },
  // { id: 3, name: "Billed Annually", slug: "yearly" },
];

const SubDetails = () => {
  const [activePlan, setActivePlan] = useAtom(billingTypeStore);
  const [selectedApps, setSelectedApps] = useAtom(selectedApp);
  const totalPriceValue = useAtomValue(totalPrice);
  const setTotalPriceValue = useSetAtom(totalPrice);
  const [selectedSub, setSelectedSub] = useAtom(selectedSubs);

  const payableAmount = activePlan === "trial" ? 0 : Number(totalPriceValue);

  const { data: subscriptionPlans, isPending: subscriptionPlansLoading } =
    useFetchData(`applications/allSubscription?billing_type=${activePlan}`);

  

  // Update total price when billing type changes
  useEffect(() => {
    if (activePlan === "trial") {
      setTotalPriceValue(0);
      return;
    }

    if (subscriptionPlans?.data?.plans) {
      // Recalculate total based on new billing type for selected apps
      const newTotal = selectedApps.reduce((sum: number, app: any) => {
        const plan = subscriptionPlans.data.plans.find(
          (p: any) => p.application_id === app.id,
        );
        if (!plan) return sum;

        // Get base amount based on billing type
        const baseAmount =
          activePlan === "yearly"
            ? plan.amount
            : activePlan === "monthly"
              ? plan.amount
              : 0; // trial is free

        // Calculate additional seats cost
        const additionalSeatsCost = plan.additional_user_seat_number
          ? plan.additional_user_seat_number * (plan.price_per_seat || 0)
          : 0;

        // For yearly billing, multiply additional seats cost by 12
        const totalSeatsCost =
          activePlan === "yearly"
            ? additionalSeatsCost * 12
            : additionalSeatsCost;

        return sum + (baseAmount || 0) + totalSeatsCost;
      }, 0);

      // Update the total price atom
      setTotalPriceValue(newTotal);
    }
  }, [activePlan, subscriptionPlans, selectedApps, setTotalPriceValue]);

  useEffect(() => {
    setSelectedApps([]);
    setSelectedSub([]);

   
  }, [activePlan]);


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
            shadow="sm"
            radius="lg"
            p={32}
            withBorder
            style={{ borderColor: "#D0D5DD" }}
          >
            <div className="flex items-center justify-between flex-col lg:flex-row gap-4 mb-8 lg:mb-0">
              <Title order={2} size="h3" fw={600} mb={24}>
                Your Subscription Details
                <Text
                  size="sm"
                  c="#6C6975"
                  className="lg:max-w-[400px]"
                  mt={10}
                >
                  Subscribe to the point of sales business to effectively manage
                  your retail business. You can add more seats if you need more
                  that the given seats available for your plan.
                </Text>
              </Title>

              {/* Tabs for subscription type */}
              <div className="">
                <Group
                  gap={8}
                  className="bg-[#f7f6fb] max-w-[580px] mx-auto p-2 rounded-lg"
                >
                  {subscriptionPlansLoading
                    ? null
                    : subscriptionPlan.map((plan) => (
                        <Button
                          key={plan.id}
                          radius="xs"
                          size="md"
                          styles={{
                            root: {
                              backgroundColor:
                                activePlan === plan.slug ? "white" : "#f7f6fb",
                              "&:hover": {
                                backgroundColor:
                                  activePlan === plan.slug
                                    ? "white"
                                    : "#f7f6fb",
                                opacity: activePlan === plan.slug ? 0.8 : 1,
                              },
                            },
                            inner: {
                              color:
                                activePlan === plan.slug ? "black" : "#6C6975",
                              fontSize: "14px",
                              fontWeight: 400,
                            },
                          }}
                          onClick={() => {
                            setActivePlan(plan.slug as billingType);
                          }}
                        >
                          <Text>{plan.name}</Text>
                        </Button>
                      ))}
                </Group>
              </div>
            </div>
            {subscriptionPlansLoading && (
              <div className="flex justify-center items-center h-[20vh] w-full bg-white rounded-lg">
                <Loader size={40} />
              </div>
            )}
            {/* Subscription plans section */}
            <SubscriptionPlans data={subscriptionPlans?.data?.plans} />

            <Group
              justify="space-between"
              align="center"
              mt={32}
              className="shadow-xs border border-gray-200 p-4 rounded-lg"
            >
              <Box>
                <Text fw={700} size="lg" c="#48464E">
                  Total Price
                </Text>
                <Text size="sm" c="#6C6975">
                  Excluding V.A.T or related tax
                </Text>
              </Box>
              <Text fw={700} size="xl" className="text-[#F56630]">
                ₦ {formatMoney(payableAmount)}
              </Text>
            </Group>
            <Group justify="right" mt={32}>
              <Link to="/payment-summary">
                <Button
                  radius="xl"
                  color="#F56630"
                  size="md"
                  disabled={selectedSub.length === 0}
                  rightSection={<ArrowUpRight size={16} />}
                >
                  Continue
                </Button>
              </Link>
            </Group>
          </Card>
        </div>
      </div>
    </Box>
  );
};

export default SubDetails;
