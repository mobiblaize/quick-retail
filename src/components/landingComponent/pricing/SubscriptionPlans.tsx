/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox,
  Group,
  Text,
  Box,
  Button,
  Tooltip,
  Modal,
} from "@mantine/core"; // Import Modal
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { HelpCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import {
  billingTypeStore,
  totalPrice,
  selectedSubs,
  seatCount,
} from "../../../store/subscriptionStore";
// import { notifications } from "@mantine/notifications";

const SubscriptionPlanCard = ({ data }: any) => {
  const [adminSeat, 
    // setAdminSeat
  ] = useAtom(seatCount);
  const [selectedSub, setSelectedSub] = useAtom(selectedSubs);
  const setTotalPrice = useSetAtom(totalPrice);
  const billingType = useAtomValue(billingTypeStore);
  const [seatInfoOpen, setSeatInfoOpen] = useState(false); // This state will now be used

  const isChecked = selectedSub.some((item: any) => item.id === data.id);
  const posIsSelected = selectedSub.some(
    (item: any) =>
      item?.application?.name === "Point of Sales Management System",
  );
  const thisIsPOS =
    data?.application?.name === "Point of Sales Management System";
  const shouldBeDisabled = posIsSelected && !thisIsPOS;

  const recalcTotal = useCallback(
    (subs: any[]) => {
      const total = subs.reduce(
        (sum, item) =>
          sum +
          (Number(item.amount || 0) +
            Number(adminSeat || 0) * Number(item.price_per_seat || 0)),
        0,
      );
      setTotalPrice(total);
    },
    [adminSeat, setTotalPrice],
  );

  useEffect(() => {
    validateSeatChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminSeat]);

  // const handleSeatChange = (newSeat: number) => {
  //   setAdminSeat(newSeat);
  // };

  const validateSeatChange = () => {
    if (isChecked) {
      const updated = selectedSub.map((item: any) =>
        item.id === data.id
          ? { ...item, additional_user_seat_number: adminSeat }
          : item,
      );
      setSelectedSub(updated);
      recalcTotal(updated);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, [billingType, selectedSub, recalcTotal]);

  return (
    <Box
      py="xl"
      style={{
        opacity: shouldBeDisabled ? 0.5 : 1,
        pointerEvents: shouldBeDisabled ? "none" : "auto",
        borderBottom: "1px solid #EAECF0",
      }}
    >
      <div className="flex items-start lg:justify-between flex-wrap gap-5">
        {/* Left: Checkbox and App Info */}
        <div className="flex items-start gap-5 flex-1 min-w-[300px]">
          <Checkbox
            color="#E16635"
            checked={isChecked}
            variant="outline"
            onChange={handleCheckboxChange}
            mt={4}
            disabled={shouldBeDisabled}
            styles={{
              input: {
                cursor: "pointer",
                borderColor: "#D0D5DD",
                "&:checked": {
                  backgroundColor: "#E16635",
                  borderColor: "#E16635",
                },
              },
            }}
          />
          <Box>
            <Text fw={600} size="xl" c="#48464E" mb={8}>
              {data?.application?.name}
            </Text>
            <Text size="sm" c="#6C6975" className="max-w-[480px]" lh={1.6}>
              {data?.application?.description}
            </Text>
          </Box>
        </div>

        {/* Right: Billing Info and Trial Badge */}
        <div className="flex flex-col items-end gap-4 min-w-[240px]">
          <div className="flex flex-col items-end">
            <Group gap={6} align="center" mb={4}>
              <Text size="sm" c="#6C6975" fw={400}>
                {billingType === "yearly"
                  ? "Annual fee"
                  : billingType === "monthly"
                    ? "Monthly fee"
                    : "Trial Period"}
              </Text>
              <Tooltip label="This indicates how often you will be billed for this subscription.">
                <HelpCircle
                  size={16}
                  color="#98A2B3"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSeatInfoOpen(true)}
                />
              </Tooltip>
            </Group>

            <Text
              fw={700}
              style={{ fontSize: "32px", color: "#F56630", lineHeight: 1 }}
            >
              ₦{" "}
              {billingType === "monthly"
                ? Number(data?.total_monthly_amount || 0).toLocaleString()
                : Number(data?.total_yearly_amount || 0).toLocaleString()}
            </Text>

            <Text size="xs" c="#6C6975" mt={8}>
              {billingType === "yearly"
                ? "Annual billing-renewal every 12 months"
                : billingType === "monthly"
                  ? "Monthly billing-renewal every month"
                  : "Free trial for 30 days"}
            </Text>
          </div>

          {/* Trial Badge */}
          <div className="bg-[#FEF0E9] px-6 py-2.5 rounded-full">
            <Text size="sm" fw={500} c="#F56630">
              30 day free trial included
            </Text>
          </div>

          {/* Additional Seats Section */}
          {/* {billingType !== "trial" && (
            <Box mt={8} className="flex flex-col items-end gap-2">
              <Text size="xs" c="#6C6975" mb={4}>
                Additional User Seat (₦ {data?.price_per_seat} per seat)
              </Text>
              <Group gap={8} justify="flex-end">
                <Button
                  variant="outline"
                  color="#F56630"
                  radius="xl"
                  size="xs"
                  onClick={() =>
                    handleSeatChange(adminSeat > 0 ? adminSeat - 1 : 0)
                  }
                  style={{
                    width: 28,
                    height: 28,
                    padding: 0,
                    borderColor: "#D0D5DD",
                  }}
                  disabled={shouldBeDisabled}
                >
                  -
                </Button>
                <Text
                  fw={600}
                  c="#48464E"
                  style={{
                    minWidth: 40,
                    textAlign: "center",
                    background: "#F9FAFB",
                    borderRadius: 6,
                    padding: "4px 12px",
                    border: "1px solid #D0D5DD",
                    fontSize: "14px",
                  }}
                >
                  {adminSeat}
                </Text>
                <Button
                  variant="outline"
                  color="#F56630"
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
                  style={{
                    width: 28,
                    height: 28,
                    padding: 0,
                    borderColor: "#D0D5DD",
                  }}
                  disabled={shouldBeDisabled}
                >
                  +
                </Button>
              </Group>
            </Box>
          )} */}
        </div>
      </div>

      {/* Seat Info Modal */}
      <Modal
        opened={seatInfoOpen}
        onClose={() => setSeatInfoOpen(false)}
        title={
          <Text fw={600} c="gray.8">
            Seat Information
          </Text>
        }
        centered
        radius="md"
      >
        <div className="space-y-4">
          <Text size="sm" c="gray.8">
            This modal provides detailed information about user seats.
          </Text>
          <Text size="sm" c="gray.8">
            <Text component="span" fw={700}>
              Free Seats:
            </Text>{" "}
            These are included with your base subscription plan and allow a
            certain number of users to access the application without additional
            charges.
          </Text>
          <Text size="sm" c="gray.8">
            <Text component="span" fw={700}>
              Additional User Seats:
            </Text>{" "}
            If you need more users to access the application beyond your free
            allocation, you can purchase additional seats at the specified price
            per seat.
          </Text>
        </div>
        <Group justify="flex-end" mt="xl">
          <Button
            variant="light"
            color="gray"
            onClick={() => setSeatInfoOpen(false)}
          >
            Close
          </Button>
        </Group>
      </Modal>
    </Box>
  );
};

// The SubscriptionPlans component remains unchanged
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
        item?.application?.name === "Point of Sales Management System",
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
        0,
      );
      setTotal(total);
    }
  }, [data, selected, setSelectedSub, setTotal]); // Added dependencies for useEffect
  return (
    <Box w="100%">
      <div className="flex flex-col w-full">
        {data?.map((item: any) => (
          <Box key={item?.id} w="100%">
            <SubscriptionPlanCard data={item} />
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default SubscriptionPlans;
