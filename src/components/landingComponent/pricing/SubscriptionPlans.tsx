import { Checkbox, Card, Group, Text, Box, Button, Tooltip } from "@mantine/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { HelpCircle } from 'lucide-react';
import { useEffect, useState } from "react";
// import { Modal } from "@mantine/core";
import {
  billingTypeStore,
  totalPrice,
  selectedSubs,
} from "../../../store/subscriptionStore";
import { notifications } from "@mantine/notifications";

const SubscriptionPlans = ({ data }: any) => {

  const setSelectedSub = useSetAtom(selectedSubs);
  const setTotal = useSetAtom(totalPrice);
  const selected = useAtomValue(selectedSubs);


  console.log(data);

  // 👉 Auto-select POS on mount if available
  useEffect(() => {
    if (!data) return;
    const posApp = data.find(
      (item: any) =>
        item?.application?.name === "Point of Sales Management System"
    );
    if (posApp && !selected.some((s: any) => s.id === posApp.id)) {
      const updated = [
        ...selected,
        { ...posApp, additional_user_seat_number: 0 },
      ];
      setSelectedSub(updated);
      const total = updated.reduce(
        (sum: number, item: any) =>
          sum +
          (Number(item.amount || 0) +
            Number(item.additional_user_seat_number || 0) *
              Number(item.price_per_seat || 0)),
        0
      );
      setTotal(total);
    }
  }, [data, selected, setSelectedSub, setTotal]); // Added dependencies for useEffect

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
            <SubscriptionPlanCard data={item} /> {/* billingType is read from Jotai inside the card */}
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
  const [seatInfoOpen, setSeatInfoOpen] = useState(false);


  const isChecked = selectedSub.some((item: any) => item.id === data.id);
  const posIsSelected = selectedSub.some(
    (item: any) =>
      item?.application?.name === "Point of Sales Management System"
  );
  const thisIsPOS =
    data?.application?.name === "Point of Sales Management System";
  const shouldBeDisabled = posIsSelected && !thisIsPOS;

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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Added type for event
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

  useEffect(() => {
    recalcTotal(selectedSub);
  }, [billingType, selectedSub, recalcTotal]); // Added dependencies for useEffect

  return (
    <Card
      radius="md"
      p="lg"
      mb="md"
      shadow="0"
      style={{
        opacity: shouldBeDisabled ? 0.5 : 1,
        pointerEvents: shouldBeDisabled ? "none" : "auto",
      }}
    >
      <div className="flex items-center py-5 lg:justify-between flex-wrap gap-5 justify-center">
        {/* Left: Checkbox and App Info */}
        <div className="min-w-[220px] flex items-center gap-5">
          <Checkbox
            color="#E16635"
            checked={isChecked}
            variant="outline"
            onChange={handleCheckboxChange}
            mt={2}
            disabled={shouldBeDisabled}
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
        {/* Billing Info */}
        <Box style={{ minWidth: 120, textAlign: "center" }}>
          <Text size="sm" c="#6C6975" mb={2}>
            Billed /{" "}
            {billingType === "trial"
              ? "Days"
              : billingType === "monthly"
              ? "Month"
              : "Year"}
            <Tooltip label="This indicates how often you will be billed for this subscription.">
            <HelpCircle
            size={16}
             style={{ display: "inline", verticalAlign: "middle", cursor: "pointer" }}
              onClick={() => setSeatInfoOpen(true)}
             />
            </Tooltip>
          </Text>
          {billingType === "trial" ? (
            <Text fw={500} c="#48464E">
              {data?.trial_days} Days Free
            </Text>
          ) : (
            <Text fw={400} c="#48464E">
              ( N{" "}
              {billingType === "monthly"
                ? Number(data?.total_monthly_amount || 0).toLocaleString()
                : Number(data?.total_yearly_amount || 0).toLocaleString()
              })
            </Text>
          )}
        </Box>
        {/* Free Seats */}
        <Box style={{ minWidth: 120, textAlign: "center" }}>
          <Text size="sm" c="#6C6975" mb={2}>
          User Seat (Free){" "}
           <Tooltip label="This refers to the number of users that can access the application at no extra cost under your current plan.">
  <HelpCircle
    size={16}
    style={{ display: "inline", verticalAlign: "middle", cursor: "pointer" }}
    onClick={() => setSeatInfoOpen(true)}
  />
</Tooltip>

</Text>

          <Text fw={600} c="#48464E">
            {data?.application?.free_access_users} Seats
          </Text>
        </Box>
        {/* Additional Seats */}
        <Box
          style={{ minWidth: 180, textAlign: "center" }}
          className="space-y-2"
        >
          <Text size="sm" c="#6C6975" mb={2}>
            Additional User Seat{" "}
            <Tooltip label="These are extra user slots beyond the free seats provided. You can purchase these for a fee to allow more users access.">
            <HelpCircle
            size={16}
             style={{ display: "inline", verticalAlign: "middle", cursor: "pointer" }}
              onClick={() => setSeatInfoOpen(true)}
             />
</Tooltip>

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
              disabled={shouldBeDisabled}
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
              onClick={() => {
                if (adminSeat >= data?.additional_user_seat_limit) {
                  notifications.show({
                    title: "Maximum additional user seat limit reached",
                    message:
                      "You have reached the maximum additional user seat limit",
                  });
                  return;
                }
                handleSeatChange(adminSeat + 1);
              }}
              style={{ width: 32, height: 32, padding: 0 }}
              disabled={shouldBeDisabled}
            >
              +
            </Button>
          </Group>
        </Box>
      </div>

    </Card>
  );
};
