import { Divider, Group, Switch, Text } from "@mantine/core";
import { useState } from "react";

type PaymentItem = {
  label: string;
  amount: string;
};

interface PaymentDetailsProps {
  items: PaymentItem[];
  total: string;
  vat_inclusive: boolean;
  onTaxToggle: (val: boolean) => void;
}

const PaymentDetails1: React.FC<PaymentDetailsProps> = ({
  items,
  total,
  vat_inclusive,
  onTaxToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <main className="w-full h-auto bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <header className="px-6 py-2">
        <div className="flex items-center justify-between">
          <Text
            size="lg"
            fw={500}
            c="textSecondary.9"
            tt="uppercase"
            className="cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Payment Detail
          </Text>

          <Group gap="xs">
            <Text size="sm" fw={500} c="dimmed">
              VAT (7.5%)
            </Text>

            <Switch
              checked={vat_inclusive}
              onChange={(event) =>
                onTaxToggle(event.currentTarget.checked)
              }
              color="blue"
              size="sm"
            />
          </Group>
        </div>
      </header>

      {isExpanded && (
        <>
          <Divider mt="md" color="#E4E7EC" />

          <div className="pt-8 pb-6 max-w-md px-6">
            <div className="flex flex-col gap-2.5">
              {items.map((item, index) => {
                const isTaxRow = item.label.toLowerCase().includes("tax");

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <Text
                      fw={500}
                      c={
                        isTaxRow && !vat_inclusive
                          ? "dimmed"
                          : "black"
                      }
                    >
                      {item.label}
                    </Text>

                    <Text
                      fw={500}
                      c={
                        isTaxRow && !vat_inclusive
                          ? "dimmed"
                          : "black"
                      }
                    >
                      {item.amount}
                    </Text>
                  </div>
                );
              })}

              <Divider my="sm" variant="dashed" />

              <div className="flex items-center justify-between">
                <Text fw={700} size="lg">
                  Total
                </Text>

                <Text fw={700} size="lg">
                  {total}
                </Text>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default PaymentDetails1;