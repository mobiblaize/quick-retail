import { Divider, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { CircleHelp } from "lucide-react";
import Dropdown2 from "../../../../General/dropdown2";

type PaymentItem = {
  label: string;
  amount: string;
};

interface PaymentDetailsProps {
  method: string;
  amount: string;
  onPaymentChange: (method: string, amount: string) => void;
  items: PaymentItem[];
  total: string;
}

const PaymentDetails2: React.FC<PaymentDetailsProps> = ({
  method,
  amount,
  onPaymentChange,
  items,
  total,
}) => {
  const paymentMethodOptions = [
    { label: "Pay with Cash", value: "cash" },
    { label: "Pay with Debit Card", value: "debit_card" },
    { label: "Pay with Credit Card", value: "credit_card" },
    { label: "Pay with Transfer", value: "transfer" },
  ];

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <header className="px-6 py-2 cursor-pointer">
        <div className="flex items-center justify-between">
          <Text size="lg" fw={500} c="textSecondary.9" tt={"uppercase"}>
            Payment Details
          </Text>
        </div>
      </header>
      <>
        <Divider size="sm" className="mt-3" color="#E4E7EC" />
        <section className="grid grid-cols-1 md:grid-cols-2 pt-8 pb-6 items-center gap-4 md:gap-10 px-3.5">
          <Dropdown2
            label="Payment Method"
            options={paymentMethodOptions}
            placeholder="Select Payment Method"
            value={method}
            onChange={(val) => onPaymentChange(val, amount)}
            required
            textColorClass="text-gray-800"
          />

          <FormInput
            type="text"
            label="Payment Reference Number"
            optional
            placeholder="Enter Payment Reference Number"
            className="w-full"
          />

          {method === "cash" && (
            <>
              <FormInput
                type="text"
                label="Amount Collected"
                placeholder="Enter the amount customer paid in cash"
                className="w-full"
                value={amount}
                onChange={(e: { target: { value: string } }) =>
                  onPaymentChange(method, e.target.value)
                }
              />

              <FormInput
                type="text"
                label="Customer Balance"
                className="w-full"
              />
            </>
          )}
        </section>

        <Divider size="sm" className="mt-3" color="#E4E7EC" />
        <section>
          <div className="pt-8 pb-6 max-w-md px-6">
            <div className="flex flex-col gap-2.5">
              {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Text fw={500}>
                      {item.label}
                      {item.label === "Service fee" && (
                        <CircleHelp
                          size={16}
                          className="inline-block ml-2 text-[#2E90FA]"
                        />
                      )}
                    </Text>
                  </div>
                  <Text fw={500}>{item.amount}</Text>
                </div>
              ))}
              <div className="flex items-center justify-between">
                <Text c="black" fw={700}>
                  Total
                </Text>
                <Text c="black" fw={700}>
                  {total}
                </Text>
              </div>
            </div>
          </div>
        </section>
      </>
    </main>
  );
};

export default PaymentDetails2;
