import { Modal, Button } from "@mantine/core";
import { CheckCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface PaymentSuccessModalProps {
  opened: boolean;
  onClose: () => void;
  reference?: string;
  email?: string;
  loading?: boolean;
}

export default function PaymentSuccessModal({
  opened,
  onClose,
  reference,
}: PaymentSuccessModalProps) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    // Invalidate the current subscription query to refetch the latest data
    queryClient.invalidateQueries({ queryKey: ["profile/current-subscription"] });
    onClose();
  };
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      centered
      radius="md"
      size="sm"
      padding={0}
    >
      <div className="bg-white p-6 rounded-lg flex flex-col items-center text-center">
        <CheckCircle className="text-green-500 w-12 h-12 mb-4 animate-pulse" />
        <h2 className="text-lg font-semibold">Subscription Successful</h2>
        <p className="text-sm text-gray-500 mt-2 mb-4">
          You have successfully updated your <b/> subscription plan. You can choose to renew<b/> or change your plan anytime later.
        </p>

        {reference && (
          <div className=" text-gray-700 text-sm p-2 rounded mb-6 w-full">
            {/* <strong>Reference:</strong> {reference} */}
          </div>
        )}

        <Button
          fullWidth
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-base"
          radius="md"
          onClick={handleClose}
        >
          Okay
        </Button>
      </div>
    </Modal>
  );
}
