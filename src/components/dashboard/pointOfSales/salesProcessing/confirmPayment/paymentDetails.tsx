import { Divider, Input, Text } from "@mantine/core";
import FormInput from "../../../../General/formInput";
import { CircleHelp } from "lucide-react";
import Dropdown2 from "../../../../General/dropdown2";
import { useEffect, useState } from "react";
import { useFetchSingleSale } from "../../../../../hooks/backendApis/pos/salesProcessing";
import { formatMoney } from "../../../../../utils/helpers";
import { NumericFormat } from "react-number-format";

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
  orderId?: string | number;
}

const PaymentDetails2: React.FC<PaymentDetailsProps> = ({
  method,
  amount,
  onPaymentChange,
  items,
  total,
  orderId,
}) => {
  const paymentMethodOptions = [
    { label: "Pay with Cash", value: "cash" },
    { label: "Pay with Debit Card", value: "debit_card" },
    { label: "Pay with Credit Card", value: "credit_card" },
    { label: "Pay with Transfer", value: "transfer" },
  ];

  const [balance, setBalance] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>(method);
  const [localAmount, setLocalAmount] = useState<string>(amount);
  const [amountError, setAmountError] = useState<string>("");

  const safeOrderId = orderId ?? "";
  const { data: fetchedOrderData } = useFetchSingleSale(safeOrderId);

  useEffect(() => {
    if (fetchedOrderData) {
      const saleData = fetchedOrderData;
      const normalizedMethod = normalizePaymentMethod(
        saleData.data.payment_method
      );
      setSelectedMethod(normalizedMethod);
    }
  }, [fetchedOrderData]);

  const normalizePaymentMethod = (method: string | undefined) => {
    if (!method) return "";
    const lower = method.toLowerCase();
    if (lower.includes("cash")) return "cash";
    if (lower.includes("debit")) return "debit_card";
    if (lower.includes("credit")) return "credit_card";
    if (lower.includes("transfer")) return "transfer";
    return "";
  };

  const handleMethodChange = (val: string) => {
    setSelectedMethod(val);
    onPaymentChange(val, localAmount);
  };

  const sanitizeAmount = (str: string) => {
    if (!str) return "0";
    return str.replace(/[₦,]/g, "").trim();
  };

  useEffect(() => {
    const numericTotal = parseFloat(sanitizeAmount(total));
    const numericAmount = parseFloat(localAmount || "0");

    if (!isNaN(numericTotal)) {
      const calcBalance = numericAmount - numericTotal;
      if (selectedMethod === "cash") {
        setBalance(calcBalance.toFixed(2));
      } else {
        setBalance("");
      }
    } else {
      setBalance("");
    }
  }, [localAmount, total, selectedMethod]);

  useEffect(() => {
    setLocalAmount(amount);
  }, [amount]);

  useEffect(() => {
    setSelectedMethod(method);
  }, [method]);

  useEffect(() => {}, [localAmount, selectedMethod, total]);

  return (
    <main className="w-full h-auto rounded-lg bg-white">
      <header className="px-6 py-2 cursor-pointer">
        <div className="flex items-center justify-between">
          <Text size="lg" fw={500} c="textSecondary.9" tt={"uppercase"}>
            Payment Details
          </Text>
        </div>
      </header>

      <Divider size="sm" className="mt-3" color="#E4E7EC" />

      <section className="grid grid-cols-1 md:grid-cols-2 pt-8 pb-6 items-center gap-4 md:gap-10 px-3.5">
        <Dropdown2
          label="Payment Method"
          options={paymentMethodOptions}
          placeholder="Select Payment Method"
          value={selectedMethod}
          onChange={handleMethodChange}
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

        {selectedMethod === "cash" && (
          <>
           <div style={{ width: "100%" }}>
  <Input.Wrapper
    label={
      <Text size="sm" fw={500} c="gray.7" mb={4}>
        Amount Collected
      </Text>
    }
    error={amountError && "Collected amount cannot be less than total"}
  >
    <NumericFormat
      value={localAmount}
      onValueChange={(values) => {
        const numericAmount = parseFloat(values.value || "0");
        const numericTotal = parseFloat(sanitizeAmount(total));

        if (numericAmount < numericTotal) {
          setAmountError("Collected amount cannot be less than total");
        } else {
          setAmountError("");
        }

        setLocalAmount(values.value);
        onPaymentChange(selectedMethod, values.value);
      }}
      thousandSeparator
      prefix="₦"
      allowNegative={false}
      decimalScale={2}
      fixedDecimalScale
      allowLeadingZeros={false}
      placeholder="Enter the amount customer paid in cash"
      customInput={Input} // ✅ use Mantine Input for styling
      error={!!amountError}
    />
  </Input.Wrapper>
</div>

            <FormInput
              type="text"
              label="Customer Balance"
              className="w-full"
              value={
                balance !== ""
                  ? `${parseFloat(balance) > 0 ? "+" : ""}${formatMoney(
                      balance
                    )}`
                  : ""
              }
              readOnly
              leftPrefix="₦"
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
    </main>
  );
};

export default PaymentDetails2;
