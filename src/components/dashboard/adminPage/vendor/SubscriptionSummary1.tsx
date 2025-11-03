import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

interface SubscriptionSummaryProps {
  items: {
    title: string;
    price: number;
    seats: number;
    additionalSeats: number;
    price_per_seat: number;
  }[];
  billingType: string;
  billingStart: string;
  billingEnd: string;
  totalPrice: number;
  onContinue: () => void;
}

export default function SubscriptionSummary1({
  items,
  billingType,
  billingStart,
  billingEnd,
  totalPrice,
  onContinue,
}: SubscriptionSummaryProps) {
  return (
    <div className="p-6 space-y-6 mt-[2em] bg-white">
      <Stack gap={4}>
        <Title order={2} fz="lg" fw={500} c="gray.7">
          Subscription Summary
        </Title>
        <Text fz="sm" c="gray.5">
          Manage sales transactions, inventory tracking, customer engagement,
          and reporting analytics with instant updates.
        </Text>
      </Stack>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-4 gap-6 w-full">
        {/* Selected Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 flex items-center justify-between"
            >
              <Stack gap={4}>
                <Title order={4} fw={500} c="gray.9">
                  {item.title}
                </Title>
                <Text fz="sm" c="gray.5">
                  {item.seats} Admin Seat (Free) | {item.additionalSeats}{" "}
                  Additional Seat
                </Text>
              </Stack>

              <Text c="#F16722" fw={600}>
                ₦
                {(
                  item.price +
                  item.additionalSeats * item.price_per_seat
                ).toLocaleString()}
              </Text>
            </div>
          ))}
        </div>

        {/* Other Details */}
        <Box
          style={{
            borderLeft: "1px solid var(--mantine-color-gray-3)",
            paddingLeft: "3em",
          }}
          w="100%"
        >
          <Title order={4} fw={500} c="gray.8" mb="sm">
            Other Details
          </Title>

          <Stack gap="md" fz="sm" maw="100%">
            <Group justify="space-between" align="center">
              <Text c="gray.5">Billing Type</Text>
              <Text c="gray.8">
                <span className="capitalize">
                  {billingType} (
                  {billingType === "monthly"
                    ? "1 Month"
                    : billingType === "yearly"
                    ? "12 Months"
                    : "60 Days"}
                  )
                </span>
              </Text>
            </Group>

            <Group justify="space-between" align="center">
              <Text c="gray.5">Billing Start</Text>
              <Text c="gray.8">{billingStart}</Text>
            </Group>

            <Group justify="space-between" align="center">
              <Text c="gray.5">Billing Ends</Text>
              <Text c="gray.8">{billingEnd}</Text>
            </Group>
          </Stack>
        </Box>
      </div>

      {/* Price Summary + Continue */}
      <Card withBorder radius="lg" p="xl">
        <Group justify="space-between" align="center">
          <Stack gap={2}>
            <Text fz="sm" c="gray.5">
              Total Price
            </Text>
            <Text fz="xs" c="gray.4">
              Excluding V.A.T or related tax
            </Text>
          </Stack>

          <Text fz="xl" fw={700} c="#F16722">
            ₦{totalPrice.toLocaleString()}
          </Text>
        </Group>
      </Card>
      <Flex justify="flex-end">
        <Button onClick={onContinue} color="orange" radius="md" px="lg" py="sm">
          Continue
        </Button>
      </Flex>
    </div>
  );
}
