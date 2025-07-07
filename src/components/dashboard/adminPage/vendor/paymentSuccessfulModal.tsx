import { Modal, Button } from '@mantine/core';
import { CheckCircle } from 'lucide-react';


interface PaymentSuccessModalProps {
    opened: boolean;
    onClose: () => void;

  }

export default function PaymentSuccessModal({ opened, onClose }: PaymentSuccessModalProps) {
  return (
    <Modal opened={opened} onClose={onClose} withCloseButton={false} centered radius="md" size="sm" padding={0}>
      <div className="bg-white p-6 rounded-lg flex flex-col items-center text-center">
        <CheckCircle className="text-green-500 w-12 h-12 mb-4 animate-pulse" />
        <h2 className="text-lg font-semibold">Subscription Successful</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">
          You have successfully changed your subscription plan. You can choose to renew this plan or change plan later.
        </p>

        <Button
          fullWidth
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-base"
          radius="md"
          onClick={onClose}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
}
