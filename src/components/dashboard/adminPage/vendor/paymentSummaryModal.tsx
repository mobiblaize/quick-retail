import { Button, Modal } from "@mantine/core";
import { X } from "lucide-react";

// Simulate Paystack popup result for now
const simulatePaystackPopup = async (): Promise<string> => {
  return new Promise((resolve) =>
    setTimeout(() => resolve("ref-" + Date.now()), 2000)
  );
};

interface PaymentSummaryModalProps {
  opened: boolean;
  onClose: () => void;
  onPaymentSuccess: (reference: string) => void;
  summaryData?: {
    total_app: number;
    total_cost: number;
    vat: number;
    vat_total: number;
    amount_to_charge: number;
  };
}

export default function PaymentSummaryModal({ 
  opened,
  onClose,
  onPaymentSuccess,
  summaryData,
}: PaymentSummaryModalProps) {
  const handlePay = async () => {
    const reference = await simulatePaystackPopup();
    onPaymentSuccess(reference);
  };
  console.log("Payment Summary:", summaryData);

  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} centered>
      <div className="p-6 bg-white rounded-lg">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Payment Summary</h2>
            <p className="text-sm text-gray-500 mt-1">
              View subscription payment summary below
            </p>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-black" />
          </button>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Number of Apps</span>
            <span className="font-semibold">{summaryData?.total_app || 0}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Cost</span>
            <span className="font-semibold">₦ {summaryData?.total_cost?.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>V.A.T (7.5%)</span>
            <span className="font-semibold">₦ {summaryData?.vat?.toLocaleString()}</span>
          </div>
        </div>

        <Button
          fullWidth
          className="mt-6 bg-orange-500"
          radius="md"
          onClick={handlePay}
        >
          Pay ₦ {summaryData?.amount_to_charge?.toLocaleString()} Now
        </Button>
      </div>
    </Modal>
  );
}
