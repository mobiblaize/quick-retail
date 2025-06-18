import { Checkbox, Card, Group, Text, Box, Button } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  billingTypeStore,
  totalPrice,
  selectedSubs,
} from "./subscriptionDetails";

const SubscriptionPlans = ({ data }: any) => {
  return (
    <Box
      w="100%"
      style={{
        borderBottom: "2px solid #EAECF0",
        paddingBottom: 32,
        width: "100%",
      }}
    >
      <Group
        align="flex-start"
        gap={4}
        w="100%"
        className="divide-y divide-gray-200"
      >
        {data?.map((item: any) => (
          <Box key={item?.id} w="100%">
            <SubscriptionPlanCard data={item} />
          </Box>
        ))}
      </Group>
    </Box>
  );
};

export default SubscriptionPlans;

const SubscriptionPlanCard = ({ data }: any) => {
  const [adminSeat, setAdminSeat] = useState(0);
  const [selectedSub, setSelectedSub] = useAtom(selectedSubs);
  const setTotalPrice = useSetAtom(totalPrice);
  const billingType = useAtomValue(billingTypeStore);
  const isChecked = selectedSub.some((item: any) => item.id === data.id);

  // Helper to recalculate total price
  const recalcTotal = (subs: any[]) => {
    const total = subs.reduce(
      (sum, item) =>
        sum +
        (Number(item.amount || 0) +
          Number(item.additional_user_seat_number || 0) *
            Number(item.price_per_seat || 0)),
      0
    );
    setTotalPrice(total);
  };

  const handleSeatChange = (newSeat: number) => {
    setAdminSeat(newSeat);
    if (isChecked) {
      const updated = selectedSub.map((item: any) =>
        item.id === data.id
          ? { ...item, additional_user_seat_number: newSeat }
          : item
      );
      setSelectedSub(updated);
      recalcTotal(updated);
    }
  };

  const handleCheckboxChange = (e: any) => {
    let updated;
    if (e.target.checked) {
      updated = [
        ...selectedSub.filter((item: any) => item.id !== data.id),
        { ...data, additional_user_seat_number: adminSeat },
      ];
    } else {
      updated = selectedSub.filter((item: any) => item.id !== data.id);
    }
    setSelectedSub(updated);
    recalcTotal(updated);
  };

  // any time the billing type changes, recalculate the total price
  useEffect(() => {
    recalcTotal(selectedSub);
  }, [billingType]);

  return (
    <Card radius="md" p="lg" mb="md" shadow="0">
      <div className="flex items-center py-5 lg:justify-between flex-wrap gap-5 justify-center">
        {/* Left: Checkbox and App Info */}
        <div className="min-w-[220px] flex items-center gap-5">
          <Checkbox
            color="#E16635"
            checked={isChecked}
            variant="outline"
            onChange={handleCheckboxChange}
            mt={2}
          />
          <Box>
            <Text fw={600} size="md" c="#48464E" mb={2}>
              {data?.application?.name}
            </Text>
            <Text size="sm" c="#6C6975" className="max-w-[30ch]">
              {data?.application?.description}
            </Text>
          </Box>
        </div>
        {/* Center: Billing Info */}
        <Box style={{ minWidth: 120, textAlign: "center" }}>
          <Text size="sm" c="#6C6975" mb={2}>
            Billed /{" "}
            {billingType === "trial"
              ? "Days"
              : billingType === "monthly"
              ? "Month"
              : "Year"}
            <HelpCircle
              size={16}
              style={{ display: "inline", verticalAlign: "middle" }}
            />
          </Text>
          {billingType === "trial" ? (
            <Text fw={500} c="#48464E">
              {data?.trial_days} Days Free
            </Text>
          ) : (
            <Text fw={400} c="#48464E">
              ( N {data?.amount?.toLocaleString()})
            </Text>
          )}
        </Box>
        {/* Center: Free Seats */}
        <Box style={{ minWidth: 120, textAlign: "center" }}>
          <Text size="sm" c="#6C6975" mb={2}>
            User Seat (Free){" "}
            <HelpCircle
              size={16}
              style={{ display: "inline", verticalAlign: "middle" }}
            />
          </Text>
          <Text fw={600} c="#48464E">
            {data?.application?.free_user_access} Seats
          </Text>
        </Box>
        {/* Right: Additional Seat Controls */}
        <Box
          style={{ minWidth: 180, textAlign: "center" }}
          className="space-y-2"
        >
          <Text size="sm" c="#6C6975" mb={2}>
            Additional User Seat{" "}
            <HelpCircle
              size={16}
              style={{ display: "inline", verticalAlign: "middle" }}
            />
          </Text>
          <Text fw={500} c="#48464E">
            (N {data?.price_per_seat} per seat)
          </Text>
          <Group gap={8} justify="center">
            <Button
              variant="outline"
              color="#F56630"
              radius="xl"
              size="xs"
              onClick={() =>
                handleSeatChange(adminSeat > 0 ? adminSeat - 1 : 0)
              }
              style={{ width: 32, height: 32, padding: 0 }}
            >
              -
            </Button>
            <Text
              fw={600}
              c="#F56630"
              style={{
                minWidth: 32,
                textAlign: "center",
                background: "#e9eaec",
                borderRadius: 8,
                padding: "6px 16px",
                border: "1px solid #D0D5DD",
              }}
            >
              {adminSeat}
            </Text>
            <Button
              variant="outline"
              color="gray"
              radius="xl"
              size="xs"
              onClick={() => handleSeatChange(adminSeat + 1)}
              style={{ width: 32, height: 32, padding: 0 }}
            >
              +
            </Button>
          </Group>
        </Box>
      </div>
    </Card>
  );
};
